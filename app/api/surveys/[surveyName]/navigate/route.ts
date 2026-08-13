import { cookies } from "next/headers";
import {
  navigate,
  type QuestionAnswerInput,
} from "@/lib/salesforce/feedbackManagement";
import {
  decodeSession,
  encodeSession,
  SESSION_COOKIE,
} from "@/lib/survey/session";

export const dynamic = "force-dynamic";

type Body = {
  action: "Next" | "Back";
  answers: QuestionAnswerInput[];
};

export async function PATCH(request: Request) {
  const cookieStore = await cookies();
  const raw = cookieStore.get(SESSION_COOKIE.name)?.value;
  if (!raw) {
    return Response.json({ error: "No active session" }, { status: 400 });
  }
  const session = decodeSession(raw);
  if (!session) {
    return Response.json({ error: "Invalid session" }, { status: 400 });
  }

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  if (body.action !== "Next" && body.action !== "Back") {
    return Response.json({ error: "action must be Next or Back" }, { status: 400 });
  }
  if (!Array.isArray(body.answers)) {
    return Response.json({ error: "answers must be an array" }, { status: 400 });
  }

  try {
    const result = await navigate(session, body.action, body.answers);
    cookieStore.set(
      SESSION_COOKIE.name,
      encodeSession(result.session),
      SESSION_COOKIE.options,
    );
    return Response.json({
      page: result.page,
      navigationActions: result.navigationActions,
    });
  } catch (err) {
    console.error("[survey/navigate]", err);
    return Response.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 },
    );
  }
}
