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

function normalizePage(payload: {
  surveyPage?: Record<string, unknown>;
  surveyDetail?: { surveyPage?: Record<string, unknown> };
}): SurveyPage {
  const raw = payload.surveyPage ?? payload.surveyDetail?.surveyPage;
  if (!raw) throw new Error("Response missing surveyPage");

  const label = String(raw.label ?? "");
  const name = String(raw.name ?? "");

  if ("surveyQuestions" in raw && Array.isArray(raw.surveyQuestions)) {
    return {
      kind: "question",
      label,
      name,
      surveyQuestions: raw.surveyQuestions as SurveyQuestion[],
    };
  }

  return {
    kind: "thankyou",
    label,
    name,
    thankYouMessage:
      typeof raw.thankYouMessage === "string" ? raw.thankYouMessage : undefined,
    messageDescription:
      typeof raw.messageDescription === "string"
        ? raw.messageDescription
        : undefined,
    redirectUrl:
      typeof raw.redirectUrl === "string" ? raw.redirectUrl : undefined,
    urlButtons: Array.isArray(raw.urlButtons)
      ? (raw.urlButtons as Array<{ label: string; url: string }>)
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

  const session: SurveySession = {
    invitationId: json.invitationId,
    invitationUuid: json.invitationUuid,
    flowInterviewState: json.flowInterviewState,
    responseId: json.responseId,
    languageCode: json.languageCode ?? languageCode,
  };
  return {
    session,
    page: normalizePage(json),
    navigationActions: json.navigationActions ?? ["Next"],
    surveyLabel: json.surveyDetail.label,
    surveyName: json.surveyDetail.name,
  };
}

export type QuestionAnswerInput =
  | {
      name: string;
      questionType: "RadioButton" | "Boolean" | "Rating";
      responses: [{ name: string }];
    }
  | {
      name: string;
      questionType: "MultiChoice";
      responses: Array<{ name: string }>;
    }
  | {
      name: string;
      questionType: "NPS";
      responseValue: number;
    }
  | {
      name: string;
      questionType: "ShortText" | "FreeText";
      responseValue: string;
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
      questionResponses: answers,
    },
  };

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

  const nextSession: SurveySession = {
    invitationId: json.invitationId ?? session.invitationId,
    invitationUuid: json.invitationUuid ?? session.invitationUuid,
    flowInterviewState: json.flowInterviewState,
    responseId: json.responseId ?? session.responseId,
    languageCode: json.languageCode ?? session.languageCode,
  };

  return {
    session: nextSession,
    page: normalizePage(json),
    navigationActions: json.navigationActions ?? [],
  };
}
