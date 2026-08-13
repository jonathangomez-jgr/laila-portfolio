import { NextResponse } from "next/server";
import {
  navigate,
  type QuestionAnswerInput,
  type SurveySession,
} from "@/lib/salesforce/feedbackManagement";

export const dynamic = "force-dynamic";

type Body = {
  action: "Next" | "Back";
  answers: QuestionAnswerInput[];
  session: SurveySession;
};

function isValidSession(s: unknown): s is SurveySession {
  if (!s || typeof s !== "object") return false;
  const o = s as Record<string, unknown>;
  return (
    typeof o.invitationId === "string" &&
    typeof o.invitationUuid === "string" &&
    typeof o.flowInterviewState === "string" &&
    typeof o.responseId === "string" &&
    typeof o.languageCode === "string" &&
    typeof o.currentPageName === "string"
  );
}

export async function PATCH(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  if (body.action !== "Next" && body.action !== "Back") {
    return NextResponse.json(
      { error: "action must be Next or Back" },
      { status: 400 },
    );
  }
  if (!Array.isArray(body.answers)) {
    return NextResponse.json(
      { error: "answers must be an array" },
      { status: 400 },
    );
  }
  if (!isValidSession(body.session)) {
    return NextResponse.json(
      { error: "Missing or invalid session in body" },
      { status: 400 },
    );
  }

  try {
    const result = await navigate(body.session, body.action, body.answers);
    return NextResponse.json({
      page: result.page,
      navigationActions: result.navigationActions,
      session: result.session,
    });
  } catch (err) {
    console.error("[survey/navigate]", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 },
    );
  }
}
