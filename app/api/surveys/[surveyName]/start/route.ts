import { NextResponse } from "next/server";
import { startSurvey } from "@/lib/salesforce/feedbackManagement";

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
    return NextResponse.json({
      page: result.page,
      navigationActions: result.navigationActions,
      surveyLabel: result.surveyLabel,
      surveyName: result.surveyName,
      session: result.session,
    });
  } catch (err) {
    console.error("[survey/start]", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 },
    );
  }
}
