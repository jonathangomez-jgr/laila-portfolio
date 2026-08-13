import { NextResponse, type NextRequest } from "next/server";
import {
  navigate,
  type QuestionAnswerInput,
} from "@/lib/salesforce/feedbackManagement";
import {
  loadSession,
  updateSession,
  SESSION_COOKIE,
} from "@/lib/survey/session";

export const dynamic = "force-dynamic";

type Body = {
  action: "Next" | "Back";
  answers: QuestionAnswerInput[];
};

export async function PATCH(request: NextRequest) {
  const sessionId = request.cookies.get(SESSION_COOKIE.name)?.value;
  if (!sessionId) {
    const allCookieNames = request.cookies
      .getAll()
      .map((c) => c.name)
      .join(", ");
    console.warn(
      `[survey/navigate] session cookie missing. Cookies present: [${allCookieNames || "(none)"}]`,
    );
    return NextResponse.json({ error: "No active session" }, { status: 400 });
  }
  const session = loadSession(sessionId);
  if (!session) {
    return NextResponse.json(
      { error: "Invalid or expired session" },
      { status: 400 },
    );
  }

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

  try {
    const result = await navigate(session, body.action, body.answers);
    updateSession(sessionId, result.session);
    return NextResponse.json({
      page: result.page,
      navigationActions: result.navigationActions,
    });
  } catch (err) {
    console.error("[survey/navigate]", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 },
    );
  }
}
