import { cookies } from "next/headers";
import { startSurvey } from "@/lib/salesforce/feedbackManagement";
import { encodeSession, SESSION_COOKIE } from "@/lib/survey/session";

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
    const cookieStore = await cookies();
    cookieStore.set(
      SESSION_COOKIE.name,
      encodeSession(result.session),
      SESSION_COOKIE.options,
    );
    return Response.json({
      page: result.page,
      navigationActions: result.navigationActions,
      surveyLabel: result.surveyLabel,
      surveyName: result.surveyName,
    });
  } catch (err) {
    console.error("[survey/start]", err);
    return Response.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 },
    );
  }
}
