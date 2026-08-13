"use client";

import { useState } from "react";
import type {
  QuestionAnswerInput,
  SurveyPage,
  SurveyQuestion,
} from "@/lib/salesforce/feedbackManagement";
import {
  BooleanYesNo,
  MultiChoice,
  NPS,
  Rating,
  SingleChoice,
  TextArea,
  TextInput,
} from "./QuestionInputs";

type AnswerValue = string | string[] | number | undefined;
type AnswerMap = Record<string, AnswerValue>;

type ApiPageResponse = {
  page: SurveyPage;
  navigationActions: string[];
  surveyLabel?: string;
  surveyName?: string;
};

type Props = {
  surveyName: string;
  intro?: {
    eyebrow?: string;
    title: string;
    body: string;
    startLabel?: string;
  };
};

export default function SurveyRunner({ surveyName, intro }: Props) {
  const [state, setState] = useState<
    | { phase: "idle" }
    | { phase: "loading" }
    | {
        phase: "running";
        page: SurveyPage;
        navigationActions: string[];
        answers: AnswerMap;
        surveyLabel?: string;
        history: string[];
      }
    | { phase: "error"; message: string }
  >({ phase: "idle" });

  async function callApi(
    url: string,
    init: RequestInit,
  ): Promise<ApiPageResponse> {
    const res = await fetch(url, { ...init, credentials: "same-origin" });
    if (!res.ok) {
      const errBody = await res.json().catch(() => ({}));
      throw new Error(
        typeof errBody?.error === "string"
          ? errBody.error
          : `Request failed (${res.status})`,
      );
    }
    return (await res.json()) as ApiPageResponse;
  }

  async function handleStart() {
    setState({ phase: "loading" });
    try {
      const data = await callApi(
        `/api/surveys/${encodeURIComponent(surveyName)}/start`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ languageCode: "es" }),
        },
      );
      setState({
        phase: "running",
        page: data.page,
        navigationActions: data.navigationActions,
        answers: {},
        surveyLabel: data.surveyLabel,
        history: [data.page.name],
      });
    } catch (e) {
      setState({
        phase: "error",
        message: e instanceof Error ? e.message : "Error al iniciar",
      });
    }
  }

  async function handleNavigate(action: "Next" | "Back") {
    if (state.phase !== "running") return;
    if (state.page.kind !== "question") return;

    const answersPayload =
      action === "Next"
        ? buildAnswersPayload(state.page.surveyQuestions, state.answers)
        : [];

    setState({ ...state, navigationActions: [] });
    try {
      const data = await callApi(
        `/api/surveys/${encodeURIComponent(surveyName)}/navigate`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action, answers: answersPayload }),
        },
      );
      setState({
        phase: "running",
        page: data.page,
        navigationActions: data.navigationActions,
        answers: {},
        surveyLabel: state.surveyLabel,
        history:
          action === "Next"
            ? [...state.history, data.page.name]
            : state.history.slice(0, -1),
      });
    } catch (e) {
      setState({
        phase: "error",
        message: e instanceof Error ? e.message : "Error de navegación",
      });
    }
  }

  function setAnswer(name: string, v: AnswerValue) {
    if (state.phase !== "running") return;
    setState({
      ...state,
      answers: { ...state.answers, [name]: v },
    });
  }

  if (state.phase === "idle") {
    return (
      <IntroCard
        intro={intro}
        onStart={handleStart}
        surveyName={surveyName}
      />
    );
  }

  if (state.phase === "loading") {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="animate-pulse text-sm text-gray-500">
          Preparando encuesta…
        </div>
      </div>
    );
  }

  if (state.phase === "error") {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-8 shadow-sm">
        <p className="text-sm font-semibold text-red-800">
          No se pudo continuar
        </p>
        <p className="mt-2 text-sm text-red-700">{state.message}</p>
        <button
          type="button"
          onClick={() => setState({ phase: "idle" })}
          className="mt-4 rounded-md border border-red-300 bg-white px-4 py-2 text-sm font-semibold text-red-800 hover:bg-red-100"
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (state.page.kind === "thankyou") {
    return <ThankYouCard page={state.page} />;
  }

  const canGoNext = state.navigationActions.includes("Next");
  const busy = state.navigationActions.length === 0;
  const requiredMissing = state.page.surveyQuestions
    .filter((q) => q.isResponseRequired)
    .some((q) => !isAnswered(q, state.answers[q.name]));

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
      {state.surveyLabel && (
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
          {state.surveyLabel}
        </p>
      )}
      <h2 className="mt-1 text-xl font-bold text-gray-950 sm:text-2xl">
        {state.page.label}
      </h2>

      <div className="mt-6 flex flex-col gap-8">
        {state.page.surveyQuestions.map((q) => (
          <div key={q.name} className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-900">
              {q.label}
              {q.isResponseRequired && (
                <span className="ml-1 text-red-600">*</span>
              )}
            </label>
            {q.description && (
              <p className="text-xs text-gray-500">{q.description}</p>
            )}
            <QuestionInput
              question={q}
              value={state.answers[q.name]}
              onChange={(v) => setAnswer(q.name, v)}
            />
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-end border-t border-gray-100 pt-6">
        <button
          type="button"
          disabled={!canGoNext || busy || requiredMissing}
          onClick={() => handleNavigate("Next")}
          className="rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Siguiente →
        </button>
      </div>
    </div>
  );
}

function QuestionInput({
  question,
  value,
  onChange,
}: {
  question: SurveyQuestion;
  value: AnswerValue;
  onChange: (v: AnswerValue) => void;
}) {
  switch (question.questionType) {
    case "RadioButton":
      return (
        <SingleChoice
          question={question}
          value={typeof value === "string" ? value : undefined}
          onChange={onChange}
        />
      );
    case "MultiChoice":
      return (
        <MultiChoice
          question={question}
          value={Array.isArray(value) ? value : []}
          onChange={onChange}
        />
      );
    case "Boolean":
      return (
        <BooleanYesNo
          question={question}
          value={typeof value === "string" ? value : undefined}
          onChange={onChange}
        />
      );
    case "Rating":
      return (
        <Rating
          question={question}
          value={typeof value === "string" ? value : undefined}
          onChange={onChange}
        />
      );
    case "NPS":
      return (
        <NPS
          question={question}
          value={typeof value === "number" ? value : undefined}
          onChange={onChange}
        />
      );
    case "ShortText":
      return (
        <TextInput
          question={question}
          value={typeof value === "string" ? value : ""}
          onChange={onChange}
        />
      );
    case "FreeText":
      return (
        <TextArea
          question={question}
          value={typeof value === "string" ? value : ""}
          onChange={onChange}
        />
      );
    default:
      return (
        <div className="rounded-md border border-amber-300 bg-amber-50 p-3 text-xs text-amber-800">
          Tipo de pregunta no soportado en el frontend:{" "}
          <code>{question.questionType}</code>
        </div>
      );
  }
}

function isAnswered(q: SurveyQuestion, value: AnswerValue): boolean {
  switch (q.questionType) {
    case "MultiChoice":
      return Array.isArray(value) && value.length > 0;
    case "NPS":
      return typeof value === "number";
    case "ShortText":
    case "FreeText":
      return typeof value === "string" && value.trim().length > 0;
    default:
      return typeof value === "string" && value.length > 0;
  }
}

// Salesforce requires an entry per question on the current page — including
// unanswered ones. For selection types, `responses: []` marks unanswered.
// For NPS/Text, we omit responseValue.
function buildAnswersPayload(
  questions: SurveyQuestion[],
  answers: AnswerMap,
): QuestionAnswerInput[] {
  const out: QuestionAnswerInput[] = [];
  for (const q of questions) {
    const v = answers[q.name];
    const answered = isAnswered(q, v);
    switch (q.questionType) {
      case "RadioButton":
      case "Boolean":
      case "Rating":
        out.push({
          name: q.name,
          questionType: q.questionType,
          responses: answered ? [{ name: v as string }] : [],
        });
        break;
      case "MultiChoice":
        out.push({
          name: q.name,
          questionType: "MultiChoice",
          responses: answered
            ? (v as string[]).map((n) => ({ name: n }))
            : [],
        });
        break;
      case "NPS":
        out.push(
          answered
            ? {
                name: q.name,
                questionType: "NPS",
                responseValue: v as number,
              }
            : { name: q.name, questionType: "NPS" },
        );
        break;
      case "ShortText":
        out.push(
          answered
            ? {
                name: q.name,
                questionType: "ShortText",
                responseValue: v as string,
              }
            : { name: q.name, questionType: "ShortText" },
        );
        break;
      case "FreeText":
        out.push(
          answered
            ? {
                name: q.name,
                questionType: "FreeText",
                responseValue: v as string,
              }
            : { name: q.name, questionType: "FreeText" },
        );
        break;
    }
  }
  return out;
}

function IntroCard({
  intro,
  onStart,
  surveyName,
}: {
  intro?: Props["intro"];
  onStart: () => void;
  surveyName: string;
}) {
  const startLabel = intro?.startLabel ?? "Comenzar";
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
      {intro?.eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
          {intro.eyebrow}
        </p>
      )}
      <h2 className="mt-2 text-2xl font-bold text-gray-950 sm:text-3xl">
        {intro?.title ?? surveyName}
      </h2>
      {intro?.body && (
        <p className="mt-4 text-base leading-7 text-gray-600">{intro.body}</p>
      )}
      <button
        type="button"
        onClick={onStart}
        className="mt-6 rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700"
      >
        {startLabel} →
      </button>
    </div>
  );
}

function ThankYouCard({
  page,
}: {
  page: Extract<SurveyPage, { kind: "thankyou" }>;
}) {
  return (
    <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-8 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
        {page.label}
      </p>
      {page.thankYouMessage && (
        <h2 className="mt-2 text-2xl font-bold text-emerald-950 sm:text-3xl">
          {page.thankYouMessage}
        </h2>
      )}
      {page.messageDescription && (
        <p className="mt-3 text-base leading-7 text-emerald-800">
          {page.messageDescription}
        </p>
      )}
      {page.urlButtons && page.urlButtons.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-3">
          {page.urlButtons.map((b) => (
            <a
              key={b.url}
              href={b.url}
              className="rounded-md bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700"
            >
              {b.label}
            </a>
          ))}
        </div>
      )}
      {page.redirectUrl && (
        <a
          href={page.redirectUrl}
          className="mt-5 inline-flex rounded-md border border-emerald-300 bg-white px-5 py-2.5 text-sm font-semibold text-emerald-800 hover:bg-emerald-50"
        >
          Continuar →
        </a>
      )}
    </div>
  );
}
