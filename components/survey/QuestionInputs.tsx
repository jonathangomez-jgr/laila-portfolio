"use client";

import type { SurveyQuestion } from "@/lib/salesforce/feedbackManagement";

type BaseProps<T> = {
  question: SurveyQuestion;
  value: T | undefined;
  onChange: (v: T) => void;
};

const baseField =
  "w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500";

const choiceRow =
  "flex cursor-pointer items-start gap-3 rounded-md border border-gray-200 bg-white p-3 hover:border-indigo-400 hover:bg-indigo-50/40";

const choiceRowSelected =
  "flex cursor-pointer items-start gap-3 rounded-md border-2 border-indigo-500 bg-indigo-50 p-3";

export function SingleChoice({
  question,
  value,
  onChange,
}: BaseProps<string>) {
  const choices = question.questionChoices ?? [];
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="sr-only">{question.label}</legend>
      {choices.map((c) => {
        const selected = value === c.name;
        return (
          <label key={c.name} className={selected ? choiceRowSelected : choiceRow}>
            <input
              type="radio"
              name={question.name}
              value={c.name}
              checked={selected}
              onChange={() => onChange(c.name)}
              className="mt-1 h-4 w-4 shrink-0"
            />
            <span className="text-sm text-gray-800">{c.label}</span>
          </label>
        );
      })}
    </fieldset>
  );
}

export function MultiChoice({
  question,
  value,
  onChange,
}: BaseProps<string[]>) {
  const choices = question.questionChoices ?? [];
  const selected = new Set(value ?? []);
  const toggle = (name: string) => {
    const next = new Set(selected);
    if (next.has(name)) next.delete(name);
    else next.add(name);
    onChange(Array.from(next));
  };
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="sr-only">{question.label}</legend>
      {choices.map((c) => {
        const on = selected.has(c.name);
        return (
          <label key={c.name} className={on ? choiceRowSelected : choiceRow}>
            <input
              type="checkbox"
              checked={on}
              onChange={() => toggle(c.name)}
              className="mt-1 h-4 w-4 shrink-0"
            />
            <span className="text-sm text-gray-800">{c.label}</span>
          </label>
        );
      })}
    </fieldset>
  );
}

export function BooleanYesNo({
  question,
  value,
  onChange,
}: BaseProps<string>) {
  const choices = question.questionChoices ?? [
    { name: "Yes", label: "Sí" },
    { name: "No", label: "No" },
  ];
  return (
    <div className="flex flex-wrap gap-3">
      {choices.map((c) => {
        const selected = value === c.name;
        return (
          <button
            key={c.name}
            type="button"
            onClick={() => onChange(c.name)}
            aria-pressed={selected}
            className={
              selected
                ? "rounded-md bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow"
                : "rounded-md border border-gray-300 bg-white px-6 py-2.5 text-sm font-semibold text-gray-800 hover:border-indigo-400"
            }
          >
            {c.label}
          </button>
        );
      })}
    </div>
  );
}

export function Rating({ question, value, onChange }: BaseProps<string>) {
  const choices = question.questionChoices ?? [];
  return (
    <div
      className="flex flex-wrap gap-2"
      role="radiogroup"
      aria-label={question.label}
    >
      {choices.map((c) => {
        const selected = value === c.name;
        return (
          <button
            key={c.name}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(c.name)}
            className={
              selected
                ? "min-w-[52px] rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow"
                : "min-w-[52px] rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-800 hover:border-indigo-400"
            }
          >
            {c.label}
          </button>
        );
      })}
    </div>
  );
}

export function NPS({ question, value, onChange }: BaseProps<number>) {
  const min = question.minScale ?? 0;
  const max = question.maxScale ?? 10;
  const numbers: number[] = [];
  for (let n = min; n <= max; n++) numbers.push(n);
  return (
    <div className="flex flex-col gap-2">
      <div
        className="flex flex-wrap gap-1.5"
        role="radiogroup"
        aria-label={question.label}
      >
        {numbers.map((n) => {
          const selected = value === n;
          return (
            <button
              key={n}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(n)}
              className={
                selected
                  ? "min-w-[42px] rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow"
                  : "min-w-[42px] rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-800 hover:border-indigo-400"
              }
            >
              {n}
            </button>
          );
        })}
      </div>
      <div className="flex justify-between px-1 text-xs text-gray-500">
        <span>Nada probable</span>
        <span>Muy probable</span>
      </div>
    </div>
  );
}

export function TextInput({
  question,
  value,
  onChange,
}: BaseProps<string>) {
  return (
    <input
      type="text"
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      className={baseField}
      placeholder={question.description ?? ""}
      aria-label={question.label}
    />
  );
}

export function TextArea({ question, value, onChange }: BaseProps<string>) {
  return (
    <textarea
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      rows={4}
      className={baseField}
      placeholder={question.description ?? ""}
      aria-label={question.label}
    />
  );
}
