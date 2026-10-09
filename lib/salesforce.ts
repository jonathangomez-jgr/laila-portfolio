const DEFAULT_API_VERSION = "v62.0";

type TokenResponse = {
  access_token: string;
  instance_url: string;
};

function getSalesforceConfig() {
  const instanceUrl = process.env.SALESFORCE_INSTANCE_URL?.replace(/\/$/, "");
  const clientId = process.env.SALESFORCE_CLIENT_ID;
  const clientSecret = process.env.SALESFORCE_CLIENT_SECRET;

  if (!instanceUrl || !clientId || !clientSecret) {
    throw new Error("Salesforce environment variables are not configured.");
  }

  return {
    instanceUrl,
    clientId,
    clientSecret,
    apiVersion: process.env.SALESFORCE_API_VERSION ?? DEFAULT_API_VERSION,
  };
}

async function getAccessToken(): Promise<TokenResponse> {
  const { instanceUrl, clientId, clientSecret } = getSalesforceConfig();

  const body = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: clientId,
    client_secret: clientSecret,
  });

  const response = await fetch(`${instanceUrl}/services/oauth2/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
    cache: "no-store",
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(
      `Salesforce token request failed (${response.status}): ${details}`,
    );
  }

  const data = (await response.json()) as TokenResponse;

  if (!data.access_token || !data.instance_url) {
    throw new Error("Salesforce token response is missing required fields.");
  }

  return data;
}

export async function sfQuery<T = unknown>(soql: string): Promise<T[]> {
  const { apiVersion } = getSalesforceConfig();
  const { access_token, instance_url } = await getAccessToken();

  const url = `${instance_url}/services/data/${apiVersion}/query?q=${encodeURIComponent(soql)}`;
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${access_token}` },
    cache: "no-store",
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Salesforce query failed (${response.status}): ${details}`);
  }

  const data = (await response.json()) as { records: T[] };
  return data.records;
}

export async function sfCreate(
  sobject: string,
  fields: Record<string, unknown>,
): Promise<{ id: string }> {
  const { apiVersion } = getSalesforceConfig();
  const { access_token, instance_url } = await getAccessToken();

  const response = await fetch(
    `${instance_url}/services/data/${apiVersion}/sobjects/${sobject}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fields),
      cache: "no-store",
    },
  );

  if (!response.ok) {
    const details = await response.text();
    throw new Error(
      `Salesforce ${sobject} create failed (${response.status}): ${details}`,
    );
  }

  const data = (await response.json()) as { id: string };
  return data;
}

export async function sfUpdate(
  sobject: string,
  id: string,
  fields: Record<string, unknown>,
): Promise<void> {
  const { apiVersion } = getSalesforceConfig();
  const { access_token, instance_url } = await getAccessToken();

  const response = await fetch(
    `${instance_url}/services/data/${apiVersion}/sobjects/${sobject}/${id}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fields),
      cache: "no-store",
    },
  );

  if (!response.ok) {
    const details = await response.text();
    throw new Error(
      `Salesforce ${sobject} update failed (${response.status}): ${details}`,
    );
  }
}

export async function sfUpsert(
  sobject: string,
  externalIdField: string,
  externalIdValue: string,
  fields: Record<string, unknown>,
): Promise<{ id: string; created: boolean }> {
  const { apiVersion } = getSalesforceConfig();
  const { access_token, instance_url } = await getAccessToken();

  const response = await fetch(
    `${instance_url}/services/data/${apiVersion}/sobjects/${sobject}/${externalIdField}/${encodeURIComponent(
      externalIdValue,
    )}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fields),
      cache: "no-store",
    },
  );

  if (!response.ok) {
    const details = await response.text();
    throw new Error(
      `Salesforce ${sobject} upsert failed (${response.status}): ${details}`,
    );
  }

  // 201 Created with body { id, success, errors } · 204 No Content on update
  if (response.status === 204) {
    return { id: "", created: false };
  }
  const data = (await response.json()) as { id: string };
  return { id: data.id, created: response.status === 201 };
}

export async function sfInvoke(
  apexClassName: string,
  inputs: Record<string, unknown>[],
): Promise<unknown> {
  const { apiVersion } = getSalesforceConfig();
  const { access_token, instance_url } = await getAccessToken();

  const url = `${instance_url}/services/data/${apiVersion}/actions/custom/apex/${apexClassName}`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ inputs }),
    cache: "no-store",
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(
      `Salesforce invoke ${apexClassName} failed (${response.status}): ${details}`,
    );
  }
  return response.json();
}

// ============================================================================
// Files · ContentVersion / ContentDocument helpers
// ============================================================================

export type SfUploadedFile = {
  contentVersionId: string;
  contentDocumentId: string;
  title: string;
};

/**
 * Uploads a file to Salesforce as a ContentVersion and links it to a record
 * via FirstPublishLocationId (which auto-creates the ContentDocumentLink).
 *
 * `fileBytes` is the raw binary; `contentType` is the MIME; `filename` the
 * original name with extension (Salesforce derives FileType from it).
 */
export async function sfUploadFileToRecord(
  linkedEntityId: string,
  filename: string,
  contentType: string,
  fileBytes: Uint8Array,
): Promise<SfUploadedFile> {
  const { apiVersion } = getSalesforceConfig();
  const { access_token, instance_url } = await getAccessToken();

  const boundary = `----sfboundary${Date.now().toString(16)}${Math.random()
    .toString(16)
    .slice(2)}`;
  const metadata = {
    Title: filename.replace(/\.[^.]+$/, "") || filename,
    PathOnClient: filename,
    FirstPublishLocationId: linkedEntityId,
  };

  const encoder = new TextEncoder();
  const preamble = encoder.encode(
    `--${boundary}\r\n` +
      `Content-Disposition: form-data; name="entity_content";\r\n` +
      `Content-Type: application/json\r\n\r\n` +
      JSON.stringify(metadata) +
      `\r\n--${boundary}\r\n` +
      `Content-Disposition: form-data; name="VersionData"; filename="${filename}"\r\n` +
      `Content-Type: ${contentType}\r\n\r\n`,
  );
  const closing = encoder.encode(`\r\n--${boundary}--\r\n`);

  const body = new Uint8Array(
    preamble.length + fileBytes.length + closing.length,
  );
  body.set(preamble, 0);
  body.set(fileBytes, preamble.length);
  body.set(closing, preamble.length + fileBytes.length);

  const response = await fetch(
    `${instance_url}/services/data/${apiVersion}/sobjects/ContentVersion`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": `multipart/form-data; boundary=${boundary}`,
      },
      body,
      cache: "no-store",
    },
  );

  if (!response.ok) {
    const details = await response.text();
    throw new Error(
      `Salesforce ContentVersion upload failed (${response.status}): ${details}`,
    );
  }

  const data = (await response.json()) as { id: string };
  const contentVersionId = data.id;

  // Fetch ContentDocumentId from the newly created ContentVersion
  const docResponse = await fetch(
    `${instance_url}/services/data/${apiVersion}/sobjects/ContentVersion/${contentVersionId}?fields=ContentDocumentId,Title`,
    {
      headers: { Authorization: `Bearer ${access_token}` },
      cache: "no-store",
    },
  );
  if (!docResponse.ok) {
    throw new Error(
      `Could not fetch ContentDocumentId for ${contentVersionId}: ${docResponse.status}`,
    );
  }
  const doc = (await docResponse.json()) as {
    ContentDocumentId: string;
    Title: string;
  };
  return {
    contentVersionId,
    contentDocumentId: doc.ContentDocumentId,
    title: doc.Title,
  };
}

/** Fetch the raw binary data for a ContentVersion. */
export async function sfFetchFileBytes(
  contentVersionId: string,
): Promise<{ bytes: Uint8Array; contentType: string }> {
  const { apiVersion } = getSalesforceConfig();
  const { access_token, instance_url } = await getAccessToken();

  const response = await fetch(
    `${instance_url}/services/data/${apiVersion}/sobjects/ContentVersion/${contentVersionId}/VersionData`,
    {
      headers: { Authorization: `Bearer ${access_token}` },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error(
      `Salesforce ContentVersion fetch failed (${response.status})`,
    );
  }
  const contentType =
    response.headers.get("content-type") ?? "application/octet-stream";
  const arrayBuffer = await response.arrayBuffer();
  return { bytes: new Uint8Array(arrayBuffer), contentType };
}

export async function createPageAccessRecord(email: string, path: string) {
  const { apiVersion } = getSalesforceConfig();
  const { access_token, instance_url } = await getAccessToken();

  const response = await fetch(
    `${instance_url}/services/data/${apiVersion}/sobjects/Page_Access__c`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email__c: email,
        Path__c: path,
      }),
      cache: "no-store",
    },
  );

  if (!response.ok) {
    const details = await response.text();
    throw new Error(
      `Salesforce record creation failed (${response.status}): ${details}`,
    );
  }
}
