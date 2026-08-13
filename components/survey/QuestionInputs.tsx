"use client";

import { useState } from "react";
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

function StarIcon({
  filled,
  size = 36,
}: {
  filled: boolean;
  size?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className="transition-colors"
      aria-hidden="true"
    >
      <path
        d="M12 2l3.09 6.26 6.91 1.01-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14l-5-4.87 6.91-1.01L12 2z"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={filled ? 0 : 1.4}
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Rating({ question, value, onChange }: BaseProps<string>) {
  const choices = question.questionChoices ?? [];
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const selectedIdx = choices.findIndex((c) => c.name === value);
  const activeIdx = hoverIdx !== null ? hoverIdx : selectedIdx;

  const firstLabel = choices[0]?.label;
  const lastLabel = choices[choices.length - 1]?.label;
  const showEndpointLabels =
    choices.length >= 3 && firstLabel !== undefined && lastLabel !== undefined;

  return (
    <div className="flex flex-col gap-1.5">
      <div
        className="flex gap-1"
        role="radiogroup"
        aria-label={question.label}
        onMouseLeave={() => setHoverIdx(null)}
      >
        {choices.map((c, i) => {
          const filled = i <= activeIdx;
          const isSelected = value === c.name;
          return (
            <button
              key={c.name}
              type="button"
              role="radio"
              aria-checked={isSelected}
              aria-label={c.label}
              title={c.label}
              onMouseEnter={() => setHoverIdx(i)}
              onFocus={() => setHoverIdx(i)}
              onBlur={() => setHoverIdx(null)}
              onClick={() => onChange(c.name)}
              className={
                filled
                  ? "cursor-pointer text-amber-400 hover:text-amber-500"
                  : "cursor-pointer text-gray-300 hover:text-amber-300"
              }
            >
              <StarIcon filled={filled} />
            </button>
          );
        })}
      </div>
      {showEndpointLabels && (
        <div className="flex justify-between px-1 text-xs text-gray-500">
          <span>{firstLabel}</span>
          <span>{lastLabel}</span>
        </div>
      )}
    </div>
  );
}

export function NPS({ question, value, onChange }: BaseProps<number>) {
  const min = question.minScale ?? 0;
  const max = question.maxScale ?? 10;
  const numbers: number[] = [];
  for (let n = min; n <= max; n++) numbers.push(n);

  // Gradiente rojo → verde interpolando el matiz HSL (0 → 120).
  function styleFor(n: number, selected: boolean): React.CSSProperties {
    const t = max === min ? 0 : (n - min) / (max - min);
    const hue = t * 120;
    if (selected) {
      return {
        backgroundColor: `hsl(${hue}, 65%, 42%)`,
        borderColor: `hsl(${hue}, 70%, 34%)`,
        color: "white",
        boxShadow: `0 4px 10px -2px hsla(${hue}, 65%, 40%, 0.45)`,
      };
    }
    return {
      backgroundColor: `hsl(${hue}, 92%, 96%)`,
      borderColor: `hsl(${hue}, 60%, 78%)`,
      color: `hsl(${hue}, 55%, 28%)`,
    };
  }

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
              style={styleFor(n, selected)}
              className={
                selected
                  ? "min-w-[44px] rounded-md border-2 px-3 py-2 text-sm font-bold transition"
                  : "min-w-[44px] rounded-md border-2 px-3 py-2 text-sm font-semibold transition hover:brightness-95"
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
