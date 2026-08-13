// Cliente server-side de la Salesforce Feedback Management unAuth Response API.
// Documentación oficial:
//   https://developer.salesforce.com/docs/atlas.en-us.salesforce_feedback_management_dev_guide.meta/salesforce_feedback_management_dev_guide/salesforce_surveys_for_unauthenticated_participants.htm

type EnvConfig = {
  scrtBase: string;
  orgId: string;
  appPrefix: string;
  surveyDeveloperName: string;
  communityId?: string;
};

function readEnv(): EnvConfig {
  const myDomain = process.env.SF_LAILA_MY_DOMAIN;
  const orgId = process.env.SF_LAILA_ORG_ID;
  const surveyDeveloperName = process.env.SF_LAILA_SURVEY_DEV_NAME;
  const appPrefix = process.env.SF_LAILA_UNAUTH_APP_PREFIX ?? "surveys/v1";
  const communityId = process.env.SF_LAILA_COMMUNITY_ID;

  if (!myDomain) throw new Error("SF_LAILA_MY_DOMAIN missing");
  if (!orgId) throw new Error("SF_LAILA_ORG_ID missing");
  if (!surveyDeveloperName) throw new Error("SF_LAILA_SURVEY_DEV_NAME missing");

  const scrtBase = `https://${myDomain.replace(".my.salesforce.com", ".my.salesforce-scrt.com")}`;
  return { scrtBase, orgId, appPrefix, surveyDeveloperName, communityId };
}

let cached: { accessToken: string; expiresAt: number } | null = null;

async function getAccessToken(env: EnvConfig): Promise<string> {
  const now = Date.now();
  if (cached && cached.expiresAt > now + 30_000) return cached.accessToken;

  const url = `${env.scrtBase}/${env.appPrefix}/accessToken`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ orgId: env.orgId }),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`accessToken failed ${res.status}: ${body}`);
  }
  const json = (await res.json()) as {
    accessToken: string;
    expiresIn: number;
    tokenType?: string;
  };
  cached = {
    accessToken: json.accessToken,
    expiresAt: now + json.expiresIn * 1000,
  };
  return json.accessToken;
}

export type QuestionChoice = { name: string; label: string };
export type SurveyQuestion = {
  name: string;
  label: string;
  description?: string;
  questionType:
    | "RadioButton"
    | "MultiChoice"
    | "Boolean"
    | "Rating"
    | "NPS"
    | "ShortText"
    | "FreeText"
    | string;
  responseDataType?: string;
  isResponseRequired: boolean;
  questionChoices?: QuestionChoice[];
  minScale?: number;
  maxScale?: number;
};

export type QuestionPage = {
  kind: "question";
  label: string;
  name: string;
  surveyQuestions: SurveyQuestion[];
};

export type ThankYouPage = {
  kind: "thankyou";
  label: string;
  name: string;
  thankYouMessage?: string;
  messageDescription?: string;
  redirectUrl?: string;
  urlButtons?: Array<{ label: string; url: string }>;
};

export type SurveyPage = QuestionPage | ThankYouPage;

export type SurveySession = {
  invitationId: string;
  invitationUuid: string;
  flowInterviewState: string;
  responseId: string;
  languageCode: string;
  currentPageName: string;
};

export type StartResult = {
  session: SurveySession;
  page: SurveyPage;
  navigationActions: string[];
  surveyLabel: string;
  surveyName: string;
};

export type NavigateResult = {
  session: SurveySession;
  page: SurveyPage;
  navigationActions: string[];
};

// Salesforce Survey Builder guarda labels/choices HTML-encoded (ej: "Tecnolog&iacute;a").
// Los desescapamos server-side para que el cliente no tenga que preocuparse.
const HTML_ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  iacute: "í",
  aacute: "á",
  eacute: "é",
  oacute: "ó",
  uacute: "ú",
  Iacute: "Í",
  Aacute: "Á",
  Eacute: "É",
  Oacute: "Ó",
  Uacute: "Ú",
  ntilde: "ñ",
  Ntilde: "Ñ",
  uuml: "ü",
  Uuml: "Ü",
  iexcl: "¡",
  iquest: "¿",
  ordf: "ª",
  ordm: "º",
  laquo: "«",
  raquo: "»",
  hellip: "…",
  mdash: "—",
  ndash: "–",
  lsquo: "‘",
  rsquo: "’",
  ldquo: "“",
  rdquo: "”",
};

function decodeEntities(input: string): string {
  return input
    .replace(/&#(\d+);/g, (_m, code) => String.fromCharCode(parseInt(code, 10)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_m, code) =>
      String.fromCharCode(parseInt(code, 16)),
    )
    .replace(/&([a-zA-Z]+);/g, (m, name) => HTML_ENTITIES[name] ?? m);
}

function decodeMaybe(v: unknown): string | undefined {
  return typeof v === "string" ? decodeEntities(v) : undefined;
}

function decodeQuestion(q: unknown): SurveyQuestion {
  const raw = q as Record<string, unknown>;
  const rawChoices = Array.isArray(raw.questionChoices)
    ? (raw.questionChoices as Array<Record<string, unknown>>)
    : undefined;
  return {
    ...(raw as SurveyQuestion),
    label: decodeEntities(String(raw.label ?? "")),
    description: decodeMaybe(raw.description),
    questionChoices: rawChoices?.map((c) => ({
      name: String(c.name ?? ""),
      label: decodeEntities(String(c.label ?? "")),
    })),
  };
}

function normalizePage(payload: {
  surveyPage?: Record<string, unknown>;
  surveyDetail?: { surveyPage?: Record<string, unknown> };
}): SurveyPage {
  const raw = payload.surveyPage ?? payload.surveyDetail?.surveyPage;
  if (!raw) throw new Error("Response missing surveyPage");

  const label = decodeEntities(String(raw.label ?? ""));
  const name = String(raw.name ?? "");

  const isThankYou =
    raw.pageType === "ThankYouPage" ||
    ("thankYouMessage" in raw && !("surveyQuestions" in raw));

  if (!isThankYou && Array.isArray(raw.surveyQuestions)) {
    return {
      kind: "question",
      label,
      name,
      surveyQuestions: raw.surveyQuestions.map(decodeQuestion),
    };
  }

  return {
    kind: "thankyou",
    label,
    name,
    thankYouMessage: decodeMaybe(raw.thankYouMessage),
    messageDescription: decodeMaybe(raw.messageDescription),
    redirectUrl:
      typeof raw.redirectUrl === "string" ? raw.redirectUrl : undefined,
    urlButtons: Array.isArray(raw.urlButtons)
      ? (raw.urlButtons as Array<{ label: string; url: string }>).map((b) => ({
          label: decodeEntities(b.label),
          url: b.url,
        }))
      : undefined,
  };
}

export async function startSurvey(languageCode = "es"): Promise<StartResult> {
  const env = readEnv();
  const token = await getAccessToken(env);
  const url = `${env.scrtBase}/${env.appPrefix}/survey-response`;

  const body: Record<string, unknown> = {
    surveyDeveloperName: env.surveyDeveloperName,
    languageCode,
    invitationSettings: {
      collectAnonymousResponse: true,
    },
  };
  if (env.communityId) {
    (body.invitationSettings as Record<string, unknown>).communityId =
      env.communityId;
  }

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const errBody = await res.text().catch(() => "");
    throw new Error(`start failed ${res.status}: ${errBody}`);
  }
  const json = (await res.json()) as {
    status: string;
    responseId: string;
    invitationId: string;
    invitationUuid: string;
    flowInterviewState: string;
    languageCode: string;
    navigationActions?: string[];
    surveyDetail: {
      label: string;
      name: string;
      surveyPage: Record<string, unknown>;
    };
  };

  const page = normalizePage(json);
  const session: SurveySession = {
    invitationId: json.invitationId,
    invitationUuid: json.invitationUuid,
    flowInterviewState: json.flowInterviewState,
    responseId: json.responseId,
    languageCode: json.languageCode ?? languageCode,
    currentPageName: page.name,
  };
  return {
    session,
    page,
    navigationActions: json.navigationActions ?? ["Next"],
    surveyLabel: json.surveyDetail.label,
    surveyName: json.surveyDetail.name,
  };
}

// Salesforce requires an entry in questionResponses[] for every question on the current
// page — including unanswered ones. For selection types, `responses: []` means "not
// answered". For NPS/Text, omitting `responseValue` means "not answered".
export type QuestionAnswerInput =
  | {
      name: string;
      questionType: "RadioButton" | "Boolean" | "Rating" | "MultiChoice";
      responses: Array<{ name: string }>;
    }
  | {
      name: string;
      questionType: "NPS";
      responseValue?: number;
    }
  | {
      name: string;
      questionType: "ShortText" | "FreeText";
      responseValue?: string;
    };

export async function navigate(
  session: SurveySession,
  action: "Next" | "Back",
  answers: QuestionAnswerInput[],
): Promise<NavigateResult> {
  const env = readEnv();
  const token = await getAccessToken(env);
  const url = `${env.scrtBase}/${env.appPrefix}/survey-response`;

  const body = {
    surveyDeveloperName: env.surveyDeveloperName,
    invitationId: session.invitationId,
    invitationUuid: session.invitationUuid,
    flowInterviewState: session.flowInterviewState,
    languageCode: session.languageCode,
    navigationAction: action,
    surveyPageResponses: {
      name: session.currentPageName,
      questionResponses: answers,
    },
  };

  // Diagnostic: log the body we send (elides flowInterviewState which is huge).
  const bodyForLog = {
    ...body,
    flowInterviewState: `${session.flowInterviewState.slice(0, 40)}… (len=${session.flowInterviewState.length})`,
  };
  console.log(
    `[sf/navigate] PATCH body → ${JSON.stringify(bodyForLog, null, 2)}`,
  );

  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const errBody = await res.text().catch(() => "");
    console.error(`[sf/navigate] SF ${res.status} response: ${errBody}`);
    throw new Error(`${action} failed ${res.status}: ${errBody}`);
  }
  const json = (await res.json()) as {
    status: string;
    responseId: string;
    invitationId: string;
    invitationUuid: string;
    flowInterviewState: string;
    languageCode: string;
    navigationActions?: string[];
    surveyPage: Record<string, unknown>;
  };

  const page = normalizePage(json);
  const nextSession: SurveySession = {
    invitationId: json.invitationId ?? session.invitationId,
    invitationUuid: json.invitationUuid ?? session.invitationUuid,
    flowInterviewState: json.flowInterviewState,
    responseId: json.responseId ?? session.responseId,
    languageCode: json.languageCode ?? session.languageCode,
    currentPageName: page.name,
  };

  return {
    session: nextSession,
    page,
    navigationActions: json.navigationActions ?? [],
  };
}
