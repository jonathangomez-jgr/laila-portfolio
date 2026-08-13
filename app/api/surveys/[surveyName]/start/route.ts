import { NextResponse } from "next/server";
import { startSurvey } from "@/lib/salesforce/feedbackManagement";
import { saveSession, SESSION_COOKIE } from "@/lib/survey/session";

export const dynamic = "force-dynamic";

type Body = { languageCode?: string };

export async function POST(request: Request) {
  let body: Body = {};
  try {
    body = (await request.json()) as Body;
  } catch {
    body = {};
  }
  const languageCode = body.languageCode ?? "es";

  try {
    const result = await startSurvey(languageCode);
    const sessionId = saveSession(result.session);
    console.log(
      `[survey/start] session stored id=${sessionId.slice(0, 8)}… (cookie carries ${sessionId.length} bytes)`,
    );
    const response = NextResponse.json({
      page: result.page,
      navigationActions: result.navigationActions,
      surveyLabel: result.surveyLabel,
      surveyName: result.surveyName,
    });
    response.cookies.set(
      SESSION_COOKIE.name,
      sessionId,
      SESSION_COOKIE.options,
    );
    return response;
  } catch (err) {
    console.error("[survey/start]", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 },
    );
  }
}
