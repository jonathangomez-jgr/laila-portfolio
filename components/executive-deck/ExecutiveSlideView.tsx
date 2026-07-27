import Link from "next/link";
import type {
  DeckProductLogo,
  ExecutiveSlide,
  SlideAccent,
} from "../../data/executiveDecks";
import DeckBrandDecor, { DeckProductChips } from "./DeckBrandDecor";
import DeckDiagramsSlide from "./DeckDiagramsSlide";
import DeckQRCode from "./DeckQRCode";
import DeckQRExpand from "./DeckQRExpand";

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

const agendaAccent: Record<
  SlideAccent,
  {
    step: string;
    iconBg: string;
    quadrantBorder: string;
    deliverable: string;
  }
> = {
  indigo:  {
    step: "deck-agenda-step-eb50",
    iconBg: "deck-agenda-icon-eb50",
    quadrantBorder: "deck-agenda-quadrant-border-eb50",
    deliverable: "deck-agenda-deliverable-eb50",
  },
  violet:  {
    step: "deck-agenda-step-violet",
    iconBg: "deck-agenda-icon-violet",
    quadrantBorder: "deck-agenda-quadrant-border-violet",
    deliverable: "deck-agenda-deliverable-violet",
  },
  sky:     {
    step: "deck-agenda-step-cb68",
    iconBg: "deck-agenda-icon-cb68",
    quadrantBorder: "deck-agenda-quadrant-border-cb68",
    deliverable: "deck-agenda-deliverable-cb68",
  },
  emerald: {
    step: "deck-agenda-step-teal",
    iconBg: "deck-agenda-icon-teal",
    quadrantBorder: "deck-agenda-quadrant-border-teal",
    deliverable: "deck-agenda-deliverable-teal",
  },
};

function Eyebrow({ children }: { children: string }) {
  return <p className="deck-eyebrow mb-4">{children}</p>;
}

function SlideTitle({ children }: { children: string }) {
  return <h2 className="deck-title">{children}</h2>;
}

export default function ExecutiveSlideView({ slide }: { slide: ExecutiveSlide }) {
  const brandDecor = slide.brand ? <DeckBrandDecor brand={slide.brand} /> : null;
  const productChips =
    "products" in slide && slide.products && slide.products.length > 0 ? (
      <DeckProductChips products={slide.products as DeckProductLogo[]} />
    ) : null;

  switch (slide.layout) {

    /* ── Title (dark) ─────────────────────────────────────────────────── */
    case "title":
      return (
        <div className="deck-slide-inner deck-slide-title deck-hero-layout">
          {brandDecor}
          <div className="deck-hero-top">
            {slide.logo && (
              <img
                src={slide.logo}
                alt="Salesforce"
                className="deck-hero-logo"
              />
            )}
            {slide.eyebrow && <Eyebrow>{slide.eyebrow}</Eyebrow>}
          </div>
          <div className="deck-hero-middle">
            <h1 className="deck-hero-title">{slide.title}</h1>
            {slide.subtitle && (
              <p className="deck-hero-subtitle mt-6 max-w-4xl">{slide.subtitle}</p>
            )}
          </div>
          <div className="deck-hero-bottom">
            {slide.showQr && <DeckQRCode />}
            {slide.footnote && (
              <p className="deck-hero-footer">{slide.footnote}</p>
            )}
          </div>
        </div>
      );

    /* ── Section (dark) ───────────────────────────────────────────────── */
    case "section":
      return (
        <div className="deck-slide-inner deck-slide-section">
          {brandDecor}
          {slide.eyebrow && <Eyebrow>{slide.eyebrow}</Eyebrow>}
          <h2 className="deck-section-title">{slide.title}</h2>
          {slide.subtitle && (
            <p className="deck-section-subtitle mt-6 max-w-3xl">{slide.subtitle}</p>
          )}
          {productChips && <div className="mt-8">{productChips}</div>}
          {slide.deckLink && (
            <div className="deck-section-actions">
              <Link
                href={slide.deckLink.href}
                className={`deck-jump-link ${
                  slide.deckLink.direction === "back"
                    ? "deck-jump-link-back"
                    : "deck-jump-link-forward"
                }`}
              >
                <span className="deck-jump-link-arrow" aria-hidden>
                  {slide.deckLink.direction === "back" ? "←" : "→"}
                </span>
                <span>{slide.deckLink.label}</span>
              </Link>
            </div>
          )}
        </div>
      );

    /* ── Bullets (light) ──────────────────────────────────────────────── */
    case "bullets":
      return (
        <div className="deck-slide-inner">
          {brandDecor}
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
          {brandDecor}
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
          {brandDecor}
          {slide.eyebrow && <Eyebrow>{slide.eyebrow}</Eyebrow>}
          <SlideTitle>{slide.title}</SlideTitle>
          {productChips}
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
          {brandDecor}
          {slide.eyebrow && <Eyebrow>{slide.eyebrow}</Eyebrow>}
          <SlideTitle>{slide.title}</SlideTitle>
          {productChips}
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

    /* ── Diagrams (light) — clickable, opens in-slide lightbox ──────── */
    case "diagrams":
      return (
        <div className="deck-slide-inner">
          {brandDecor}
          {slide.eyebrow && <Eyebrow>{slide.eyebrow}</Eyebrow>}
          <SlideTitle>{slide.title}</SlideTitle>
          {slide.subtitle && (
            <p className="mt-3 max-w-4xl text-base leading-relaxed text-slate-600">
              {slide.subtitle}
            </p>
          )}
          <DeckDiagramsSlide diagrams={slide.diagrams} />
          {slide.footnote && (
            <p className="mt-6 text-sm italic text-slate-500">{slide.footnote}</p>
          )}
        </div>
      );

    /* ── Thanks (dark) ───────────────────────────────────────────────── */
    case "thanks":
      return (
        <div className="deck-slide-inner deck-slide-section">
          {brandDecor}
          {slide.eyebrow && <Eyebrow>{slide.eyebrow}</Eyebrow>}
          <h1 className="deck-thanks-title">{slide.title}</h1>
          {slide.subtitle && (
            <p className="deck-hero-subtitle mt-6 max-w-3xl">{slide.subtitle}</p>
          )}
          {slide.qrSrc && (
            <div className="mt-12 flex flex-col items-center gap-3">
              <div className="rounded-2xl bg-white p-5 shadow-2xl">
                <img
                  src={slide.qrSrc}
                  alt={slide.qrLabel ?? "QR"}
                  width={220}
                  height={220}
                  className="block"
                />
              </div>
              {slide.qrLabel && (
                <p className="text-base font-semibold text-white/90">{slide.qrLabel}</p>
              )}
              {slide.qrCaption && (
                <p className="text-sm text-white/60">{slide.qrCaption}</p>
              )}
            </div>
          )}
        </div>
      );

    /* ── Closing (dark) ───────────────────────────────────────────────── */
    case "closing":
      return (
        <div className="deck-slide-inner deck-slide-closing deck-slide-section"
             style={{ alignItems: "flex-start", textAlign: "left" }}>
          {brandDecor}
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
          {brandDecor}
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
          {brandDecor}
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
          {brandDecor}
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

    /* ── Agenda block · Canvas layout (light) ─────────────────────────── */
    case "agenda-block": {
      const accent = slide.accent ?? "indigo";
      const a = pillarAccent[accent];
      const badge = kpiBadge[accent];
      const g = agendaAccent[accent];
      const stepNumber = slide.eyebrow?.match(/\b(\d+)\b/)?.[1] ?? "•";
      return (
        <div className="deck-slide-inner">
          {brandDecor}
          {slide.eyebrow && <Eyebrow>{slide.eyebrow}</Eyebrow>}
          <div className="deck-agenda-header">
            <div className="deck-agenda-title-wrap">
              <span className={`deck-agenda-step ${g.step}`} aria-hidden>
                {stepNumber}
              </span>
              <h2 className={`deck-title deck-agenda-title ${a.title}`}>{slide.title}</h2>
            </div>
            <span className={`deck-agenda-duration ${badge}`}>{slide.duration}</span>
          </div>

          <div className="deck-agenda-canvas">
            {/* Objective — spans left column */}
            <div className={`deck-agenda-quadrant deck-agenda-objective ${g.quadrantBorder}`}>
              <div className="deck-agenda-quadrant-header">
                <span className={`deck-agenda-quadrant-icon ${g.iconBg}`} aria-hidden>🎯</span>
                <span className="deck-agenda-quadrant-label">Objetivo</span>
              </div>
              <p className="deck-agenda-quadrant-body">{slide.objective}</p>
            </div>

            {/* Content — top right */}
            <div className={`deck-agenda-quadrant deck-agenda-content ${g.quadrantBorder}`}>
              <div className="deck-agenda-quadrant-header">
                <span className={`deck-agenda-quadrant-icon ${g.iconBg}`} aria-hidden>💬</span>
                <span className="deck-agenda-quadrant-label">Contenido</span>
              </div>
              <p className="deck-agenda-quadrant-body">{slide.content}</p>
            </div>

            {/* Exercise — bottom right */}
            <div className={`deck-agenda-quadrant deck-agenda-exercise ${g.quadrantBorder}`}>
              <div className="deck-agenda-quadrant-header">
                <span className={`deck-agenda-quadrant-icon ${g.iconBg}`} aria-hidden>✍️</span>
                <span className="deck-agenda-quadrant-label">Ejercicio</span>
              </div>
              <p className="deck-agenda-quadrant-body">{slide.exercise}</p>
            </div>
          </div>

          {/* Deliverable — full-width gradient band */}
          <div className={`deck-agenda-deliverable ${g.deliverable}`}>
            <span className="deck-agenda-deliverable-icon" aria-hidden>✨</span>
            <div className="deck-agenda-deliverable-body">
              <span className="deck-agenda-deliverable-label">Entregable de este bloque</span>
              <p className="deck-agenda-deliverable-text">{slide.deliverable}</p>
            </div>
          </div>

          {slide.deckLink && (
            <div className="deck-agenda-jump">
              <Link
                href={slide.deckLink.href}
                className={`deck-jump-link ${
                  slide.deckLink.direction === "back"
                    ? "deck-jump-link-back"
                    : "deck-jump-link-forward"
                }`}
              >
                <span className="deck-jump-link-arrow" aria-hidden>
                  {slide.deckLink.direction === "back" ? "←" : "→"}
                </span>
                <span>{slide.deckLink.label}</span>
              </Link>
            </div>
          )}
        </div>
      );
    }

    /* ── Agenda list · slide de agenda con tarjetas ──────────────────── */
    case "agenda-list": {
      const cardAccentClass = (accent?: SlideAccent) => {
        if (accent === "violet") return "deck-agenda-list-card-violet";
        if (accent === "sky") return "deck-agenda-list-card-sky";
        if (accent === "emerald") return "deck-agenda-list-card-emerald";
        return "deck-agenda-list-card-indigo";
      };
      return (
        <div className="deck-slide-inner">
          {brandDecor}
          {slide.eyebrow && <Eyebrow>{slide.eyebrow}</Eyebrow>}
          <SlideTitle>{slide.title}</SlideTitle>
          <div className="deck-agenda-list mt-8">
            {slide.items.map((item) => (
              <div
                key={item.number}
                className={`deck-agenda-list-card ${cardAccentClass(item.accent)}`}
              >
                <span className="deck-agenda-list-number">{item.number}</span>
                <span className="deck-agenda-list-title">{item.title}</span>
                <span className="deck-agenda-list-duration">{item.duration}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    /* ── Agent questionnaire · «Conociendo a nuestro agente» ─────────── */
    case "agent-questionnaire": {
      const accentClass = (accent?: SlideAccent) => {
        if (accent === "violet") return "deck-questionnaire-card-accent-violet";
        if (accent === "sky") return "deck-questionnaire-card-accent-sky";
        if (accent === "emerald") return "deck-questionnaire-card-accent-emerald";
        return "";
      };
      return (
        <div className="deck-slide-inner">
          {brandDecor}
          {slide.eyebrow && <Eyebrow>{slide.eyebrow}</Eyebrow>}
          <SlideTitle>{slide.title}</SlideTitle>
          <div className="deck-questionnaire-intro">{slide.intro}</div>

          <div className="deck-questionnaire-grid">
            {slide.questions.map((q) => (
              <div key={q.number} className={`deck-questionnaire-card ${accentClass(q.accent)}`}>
                <div className="deck-questionnaire-card-header">
                  <span className="deck-questionnaire-number">{q.number}</span>
                  <span className="deck-questionnaire-icon" aria-hidden>{q.icon}</span>
                  <p className="deck-questionnaire-title">{q.title}</p>
                </div>
                <p className="deck-questionnaire-prompt">{q.prompt}</p>
                {q.format === "fill-blanks" && q.template && (
                  <div className="deck-questionnaire-answer">{q.template}</div>
                )}
                {q.format === "list" && (
                  <div className="deck-questionnaire-answer-list">
                    {Array.from({ length: q.listCount ?? 5 }).map((_, i) => (
                      <div key={i} className="deck-questionnaire-answer-list-item" data-num={`${i + 1}.`}>
                        <span className="deck-questionnaire-answer-list-line" />
                      </div>
                    ))}
                  </div>
                )}
                {q.format === "scale" && (
                  <div className="deck-questionnaire-scale">
                    {Array.from({ length: (q.scaleMax ?? 10) + 1 }).map((_, i) => (
                      <div key={i} className="deck-questionnaire-scale-cell">{i}</div>
                    ))}
                  </div>
                )}
                {q.format === "nickname" && (
                  <div className="deck-questionnaire-nickname">Escribe aquí el apodo que le pondrías</div>
                )}
                {q.format === "short" && (
                  <div className="deck-questionnaire-answer">Espacio para tu respuesta</div>
                )}
              </div>
            ))}
          </div>

          {(slide.printUrl || slide.driveUrl || slide.driveQrSrc) && (
            <div className="deck-questionnaire-footer">
              <div className="deck-questionnaire-actions">
                {slide.printUrl && (
                  <a
                    className="deck-questionnaire-print"
                    href={slide.printUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    🖨 Descargar / Imprimir plantilla
                  </a>
                )}
                {slide.driveUrl && (
                  <a
                    className="deck-questionnaire-print deck-questionnaire-print-alt"
                    href={slide.driveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    📄 Abrir en Google Docs
                  </a>
                )}
              </div>
              {slide.driveQrSrc && slide.driveUrl && (
                <DeckQRExpand
                  qrSrc={slide.driveQrSrc}
                  targetUrl={slide.driveUrl}
                  caption="Escanea para responder"
                  overlayTitle="Escanea para abrir la plantilla"
                  overlaySubtitle="Google Docs · Conociendo a nuestro agente"
                />
              )}
            </div>
          )}
        </div>
      );
    }

    /* ── Agent profile · «Meet your agent» (light) ────────────────────── */
    case "agent-profile": {
      return (
        <div className="deck-slide-inner">
          {brandDecor}
          {slide.eyebrow && <Eyebrow>{slide.eyebrow}</Eyebrow>}
          <SlideTitle>{slide.title}</SlideTitle>

          <div className="deck-agent-hero">
            <div className="deck-agent-avatar" aria-hidden>{slide.avatar ?? "🤖"}</div>
            <div className="deck-agent-hero-content">
              <h3 className="deck-agent-name">{slide.agentName}</h3>
              <p className="deck-agent-role">{slide.agentRole}</p>
            </div>
          </div>

          <div className="deck-agent-traits">
            {slide.traits.map((trait) => {
              const accentClass =
                trait.accent === "violet"
                  ? "deck-agent-trait-accent-violet"
                  : trait.accent === "sky"
                    ? "deck-agent-trait-accent-cb68"
                    : trait.accent === "emerald"
                      ? "deck-agent-trait-accent-teal"
                      : "";
              return (
                <div key={trait.label} className={`deck-agent-trait ${accentClass}`}>
                  <div className="deck-agent-trait-header">
                    <span className="deck-agent-trait-icon" aria-hidden>{trait.icon}</span>
                    <span className="deck-agent-trait-label">{trait.label}</span>
                  </div>
                  <p className="deck-agent-trait-value">{trait.value}</p>
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
