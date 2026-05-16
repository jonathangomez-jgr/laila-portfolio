import type { ExecutiveSlide, SlideAccent } from "../../data/executiveDecks";

/* Maps the data accent token → SFDC 2026 brand palette classes */
const pillarAccent: Record<
  SlideAccent,
  { card: string; title: string }
> = {
  indigo:  { card: "deck-pillar-card-eb50",   title: "deck-pillar-title-eb50"   },
  violet:  { card: "deck-pillar-card-violet",  title: "deck-pillar-title-violet" },
  sky:     { card: "deck-pillar-card-cb68",    title: "deck-pillar-title-cb68"   },
  emerald: { card: "deck-pillar-card-teal",    title: "deck-pillar-title-teal"   },
};

const kpiBadge: Record<SlideAccent, string> = {
  indigo:  "deck-badge-eb",
  violet:  "deck-badge-v",
  sky:     "deck-badge-cb",
  emerald: "deck-badge-teal",
};

function Eyebrow({ children }: { children: string }) {
  return <p className="deck-eyebrow mb-4">{children}</p>;
}

function SlideTitle({ children }: { children: string }) {
  return <h2 className="deck-title">{children}</h2>;
}

export default function ExecutiveSlideView({ slide }: { slide: ExecutiveSlide }) {
  switch (slide.layout) {

    /* ── Title (dark) ─────────────────────────────────────────────────── */
    case "title":
      return (
        <div className="deck-slide-inner deck-slide-title">
          {slide.eyebrow && <Eyebrow>{slide.eyebrow}</Eyebrow>}
          <h1 className="deck-hero-title">{slide.title}</h1>
          {slide.subtitle && (
            <p className="deck-hero-subtitle mt-6 max-w-4xl">{slide.subtitle}</p>
          )}
          {slide.footnote && (
            <p className="mt-12 text-sm font-medium tracking-widest uppercase"
               style={{ color: "rgba(255,255,255,0.35)" }}>
              {slide.footnote}
            </p>
          )}
        </div>
      );

    /* ── Section (dark) ───────────────────────────────────────────────── */
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

    /* ── Bullets (light) ──────────────────────────────────────────────── */
    case "bullets":
      return (
        <div className="deck-slide-inner">
          {slide.eyebrow && <Eyebrow>{slide.eyebrow}</Eyebrow>}
          <SlideTitle>{slide.title}</SlideTitle>
          <ul className="deck-bullet-list mt-9">
            {slide.bullets.map((bullet) => (
              <li key={bullet} className="deck-bullet-item">
                <span className="deck-bullet-dot" aria-hidden />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
          {slide.highlight && (
            <p className="deck-highlight mt-9">{slide.highlight}</p>
          )}
        </div>
      );

    /* ── Metrics (light) ──────────────────────────────────────────────── */
    case "metrics":
      return (
        <div className="deck-slide-inner">
          {slide.eyebrow && <Eyebrow>{slide.eyebrow}</Eyebrow>}
          <SlideTitle>{slide.title}</SlideTitle>
          <div className="deck-metrics-grid mt-10">
            {slide.metrics.map((metric) => (
              <div key={metric.label} className="deck-metric-card">
                <p className="deck-metric-value">{metric.value}</p>
                <p className="deck-metric-label">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      );

    /* ── Split (light) ────────────────────────────────────────────────── */
    case "split":
      return (
        <div className="deck-slide-inner">
          {slide.eyebrow && <Eyebrow>{slide.eyebrow}</Eyebrow>}
          <SlideTitle>{slide.title}</SlideTitle>
          <div className="deck-split-grid mt-9">
            {[slide.left, slide.right].map((column) => (
              <div key={column.heading} className="deck-split-panel">
                <h3 className="deck-split-heading">{column.heading}</h3>
                <ul className="mt-4 space-y-2.5">
                  {column.items.map((item) => (
                    <li key={item} className="deck-split-item">
                      <span className="deck-split-dot" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      );

    /* ── Pillars (light) ──────────────────────────────────────────────── */
    case "pillars":
      return (
        <div className="deck-slide-inner">
          {slide.eyebrow && <Eyebrow>{slide.eyebrow}</Eyebrow>}
          <SlideTitle>{slide.title}</SlideTitle>
          <div className="deck-pillars-grid mt-9">
            {slide.pillars.map((pillar) => {
              const a = pillarAccent[pillar.accent ?? "indigo"];
              return (
                <div key={pillar.title} className={`deck-pillar-card ${a.card}`}>
                  <h3 className={`text-base font-bold mb-2.5 ${a.title}`}>
                    {pillar.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#002775" }}>
                    {pillar.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      );

    /* ── Thanks (dark) ───────────────────────────────────────────────── */
    case "thanks":
      return (
        <div className="deck-slide-inner deck-slide-section">
          {slide.eyebrow && <Eyebrow>{slide.eyebrow}</Eyebrow>}
          <h1 className="deck-thanks-title">{slide.title}</h1>
          {slide.subtitle && (
            <p className="deck-hero-subtitle mt-6 max-w-3xl">{slide.subtitle}</p>
          )}
        </div>
      );

    /* ── Closing (dark) ───────────────────────────────────────────────── */
    case "closing":
      return (
        <div className="deck-slide-inner deck-slide-closing deck-slide-section"
             style={{ alignItems: "flex-start", textAlign: "left" }}>
          <h2 className="deck-section-title">{slide.title}</h2>
          {slide.bullets && (
            <ul className="deck-bullet-list mt-10 max-w-2xl">
              {slide.bullets.map((bullet, i) => (
                <li key={bullet} className="deck-bullet-item">
                  <span className="deck-bullet-number">{i + 1}</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          )}
          {slide.cta && <p className="deck-cta mt-12">{slide.cta}</p>}
        </div>
      );

    /* ── Quote (dark) ─────────────────────────────────────────────────── */
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

    /* ── Comparison (light) ───────────────────────────────────────────── */
    case "comparison":
      return (
        <div className="deck-slide-inner">
          {slide.eyebrow && <Eyebrow>{slide.eyebrow}</Eyebrow>}
          <SlideTitle>{slide.title}</SlideTitle>
          <div className="deck-comparison-grid mt-9">
            <div className="deck-comparison-panel deck-comparison-before">
              <div className="deck-comparison-label deck-comparison-label-before">
                {slide.before.heading}
              </div>
              <ul className="mt-4 space-y-2.5">
                {slide.before.items.map((item) => (
                  <li key={item} className="deck-comparison-before-item">
                    <span className="deck-comparison-before-dot" aria-hidden />
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
              <ul className="mt-4 space-y-2.5">
                {slide.after.items.map((item) => (
                  <li key={item} className="deck-comparison-after-item">
                    <span className="deck-comparison-after-dot" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      );

    /* ── KPI Table (light) ────────────────────────────────────────────── */
    case "kpi-table":
      return (
        <div className="deck-slide-inner">
          {slide.eyebrow && <Eyebrow>{slide.eyebrow}</Eyebrow>}
          <SlideTitle>{slide.title}</SlideTitle>
          <div className="deck-kpi-table mt-9">
            <div className="deck-kpi-header">
              <span>KPI</span>
              <span>Línea base</span>
              <span>Meta 6 meses</span>
              <span>Meta 12 meses</span>
            </div>
            {slide.rows.map((row) => {
              const badge = kpiBadge[row.accent ?? "indigo"];
              return (
                <div key={row.label} className="deck-kpi-row">
                  <span className="deck-kpi-label">{row.label}</span>
                  <span className="deck-kpi-baseline">{row.baseline}</span>
                  <span className={`deck-kpi-badge ${badge}`}>{row.goal6m}</span>
                  <span className={`deck-kpi-badge ${badge} font-bold`}>{row.goal12m}</span>
                </div>
              );
            })}
          </div>
        </div>
      );

    default:
      return null;
  }
}
