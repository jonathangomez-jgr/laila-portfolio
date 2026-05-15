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
    throw new Error(`Salesforce token request failed (${response.status}).`);
  }

  const data = (await response.json()) as TokenResponse;

  if (!data.access_token || !data.instance_url) {
    throw new Error("Salesforce token response is missing required fields.");
  }

  return data;
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
    throw new Error(`Salesforce record creation failed (${response.status}).`);
  }
}
