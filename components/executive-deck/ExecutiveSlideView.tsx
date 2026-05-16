import type { ExecutiveSlide, SlideAccent } from "../../data/executiveDecks";

const accentStyles: Record<
  SlideAccent,
  { border: string; glow: string; text: string }
> = {
  indigo: {
    border: "border-indigo-400/40",
    glow: "from-indigo-500/20",
    text: "text-indigo-300",
  },
  violet: {
    border: "border-violet-400/40",
    glow: "from-violet-500/20",
    text: "text-violet-300",
  },
  sky: {
    border: "border-sky-400/40",
    glow: "from-sky-500/20",
    text: "text-sky-300",
  },
  emerald: {
    border: "border-emerald-400/40",
    glow: "from-emerald-500/20",
    text: "text-emerald-300",
  },
};

function Eyebrow({ children }: { children: string }) {
  return <p className="deck-eyebrow mb-5">{children}</p>;
}

function SlideTitle({ children }: { children: string }) {
  return <h2 className="deck-title">{children}</h2>;
}

export default function ExecutiveSlideView({ slide }: { slide: ExecutiveSlide }) {
  switch (slide.layout) {
    case "title":
      return (
        <div className="deck-slide-inner deck-slide-title">
          {slide.eyebrow && <Eyebrow>{slide.eyebrow}</Eyebrow>}
          <h1 className="deck-hero-title">{slide.title}</h1>
          {slide.subtitle && (
            <p className="deck-hero-subtitle mt-6 max-w-4xl">{slide.subtitle}</p>
          )}
          {slide.footnote && (
            <p className="mt-12 text-sm font-medium tracking-wide text-slate-500">
              {slide.footnote}
            </p>
          )}
        </div>
      );

    case "section":
      return (
        <div className="deck-slide-inner deck-slide-section">
          {slide.eyebrow && <Eyebrow>{slide.eyebrow}</Eyebrow>}
          <h2 className="deck-section-title">{slide.title}</h2>
          {slide.subtitle && (
            <p className="deck-section-subtitle mt-6 max-w-3xl">{slide.subtitle}</p>
          )}
        </div>
      );

    case "bullets":
      return (
        <div className="deck-slide-inner">
          {slide.eyebrow && <Eyebrow>{slide.eyebrow}</Eyebrow>}
          <SlideTitle>{slide.title}</SlideTitle>
          <ul className="deck-bullet-list mt-10">
            {slide.bullets.map((bullet) => (
              <li key={bullet} className="deck-bullet-item">
                <span className="deck-bullet-dot" aria-hidden />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
          {slide.highlight && (
            <p className="deck-highlight mt-10">{slide.highlight}</p>
          )}
        </div>
      );

    case "metrics":
      return (
        <div className="deck-slide-inner">
          {slide.eyebrow && <Eyebrow>{slide.eyebrow}</Eyebrow>}
          <SlideTitle>{slide.title}</SlideTitle>
          <div className="deck-metrics-grid mt-12">
            {slide.metrics.map((metric) => (
              <div key={metric.label} className="deck-metric-card">
                <p className="deck-metric-value">{metric.value}</p>
                <p className="deck-metric-label">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      );

    case "split":
      return (
        <div className="deck-slide-inner">
          {slide.eyebrow && <Eyebrow>{slide.eyebrow}</Eyebrow>}
          <SlideTitle>{slide.title}</SlideTitle>
          <div className="deck-split-grid mt-10">
            {[slide.left, slide.right].map((column) => (
              <div key={column.heading} className="deck-split-panel">
                <h3 className="deck-split-heading">{column.heading}</h3>
                <ul className="mt-5 space-y-3">
                  {column.items.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-base leading-relaxed text-slate-300"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      );

    case "pillars":
      return (
        <div className="deck-slide-inner">
          {slide.eyebrow && <Eyebrow>{slide.eyebrow}</Eyebrow>}
          <SlideTitle>{slide.title}</SlideTitle>
          <div className="deck-pillars-grid mt-10">
            {slide.pillars.map((pillar) => {
              const accent = accentStyles[pillar.accent ?? "indigo"];
              return (
                <div
                  key={pillar.title}
                  className={`deck-pillar-card border ${accent.border} bg-gradient-to-br ${accent.glow} to-transparent`}
                >
                  <h3 className={`text-lg font-semibold ${accent.text}`}>
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">
                    {pillar.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      );

    case "closing":
      return (
        <div className="deck-slide-inner deck-slide-closing">
          <h2 className="deck-section-title">{slide.title}</h2>
          {slide.bullets && (
            <ul className="deck-bullet-list mt-10 max-w-2xl">
              {slide.bullets.map((bullet, index) => (
                <li key={bullet} className="deck-bullet-item">
                  <span className="deck-bullet-number">{index + 1}</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          )}
          {slide.cta && <p className="deck-cta mt-12">{slide.cta}</p>}
        </div>
      );

    case "quote":
      return (
        <div className="deck-slide-inner deck-slide-section">
          <div className="deck-quote-wrapper max-w-4xl">
            <span className="deck-quote-mark" aria-hidden>&#8220;</span>
            <blockquote className="deck-quote-text">{slide.quote}</blockquote>
            <span className="deck-quote-mark deck-quote-mark-close" aria-hidden>&#8221;</span>
            {slide.author && (
              <p className="deck-quote-author mt-8">{slide.author}</p>
            )}
            {slide.context && (
              <p className="deck-quote-context mt-2">{slide.context}</p>
            )}
          </div>
        </div>
      );

    case "comparison": {
      return (
        <div className="deck-slide-inner">
          {slide.eyebrow && <Eyebrow>{slide.eyebrow}</Eyebrow>}
          <SlideTitle>{slide.title}</SlideTitle>
          <div className="deck-comparison-grid mt-10">
            <div className="deck-comparison-panel deck-comparison-before">
              <div className="deck-comparison-label deck-comparison-label-before">
                {slide.before.heading}
              </div>
              <ul className="mt-5 space-y-3">
                {slide.before.items.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-slate-400">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="deck-comparison-arrow" aria-hidden>→</div>
            <div className="deck-comparison-panel deck-comparison-after">
              <div className="deck-comparison-label deck-comparison-label-after">
                {slide.after.heading}
              </div>
              <ul className="mt-5 space-y-3">
                {slide.after.items.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-slate-200">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      );
    }

    case "kpi-table": {
      const rowAccent: Record<
        NonNullable<(typeof slide.rows)[number]["accent"]>,
        { dot: string; badge: string }
      > = {
        indigo: { dot: "bg-indigo-400", badge: "text-indigo-300 bg-indigo-500/15" },
        violet: { dot: "bg-violet-400", badge: "text-violet-300 bg-violet-500/15" },
        sky:    { dot: "bg-sky-400",    badge: "text-sky-300    bg-sky-500/15"    },
        emerald:{ dot: "bg-emerald-400",badge: "text-emerald-300 bg-emerald-500/15"},
      };
      return (
        <div className="deck-slide-inner">
          {slide.eyebrow && <Eyebrow>{slide.eyebrow}</Eyebrow>}
          <SlideTitle>{slide.title}</SlideTitle>
          <div className="deck-kpi-table mt-10">
            <div className="deck-kpi-header">
              <span>KPI</span>
              <span>Línea base</span>
              <span>Meta 6 meses</span>
              <span>Meta 12 meses</span>
            </div>
            {slide.rows.map((row) => {
              const a = rowAccent[row.accent ?? "indigo"];
              return (
                <div key={row.label} className="deck-kpi-row">
                  <div className="flex items-center gap-2.5">
                    <span className={`h-2 w-2 shrink-0 rounded-full ${a.dot}`} />
                    <span className="font-medium text-slate-200 text-sm">{row.label}</span>
                  </div>
                  <span className="text-slate-500 text-sm">{row.baseline}</span>
                  <span className={`deck-kpi-badge ${a.badge}`}>{row.goal6m}</span>
                  <span className={`deck-kpi-badge ${a.badge} font-semibold`}>{row.goal12m}</span>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    default:
      return null;
  }
}
