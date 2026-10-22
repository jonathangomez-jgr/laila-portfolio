import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import type {
  TemplateDTO,
  EvaluationDTO,
  CriterionDTO,
} from "@/lib/salesforce/acceptanceWizard";
import { getPortalProjectMeta } from "@/lib/portalProjectsMeta";

function agentNameFor(slug: string): string {
  return getPortalProjectMeta(slug)?.agentName ?? "el agente";
}

function goLiveLabelFor(slug: string): string {
  return getPortalProjectMeta(slug)?.goLiveLabel ?? "salir a producción";
}

// -----------------------------------------------------------------------------
// Styles — institutional Salesforce FDE look
// -----------------------------------------------------------------------------
const BRAND = "#00AEC7";
const BRAND_DARK = "#008CA3";
const INK = "#0F172A";
const INK_SOFT = "#475569";
const INK_MUTE = "#64748B";
const BORDER = "#E2E8F0";
const OK = "#16A34A";
const WARN = "#D97706";
const RISK = "#DC2626";

const styles = StyleSheet.create({
  page: {
    padding: 32,
    fontSize: 10,
    fontFamily: "Helvetica",
    color: INK,
  },
  topAccent: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 180,
    height: 4,
    backgroundColor: BRAND,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
  },
  headerLeft: { flexDirection: "column", gap: 2 },
  reportTag: {
    fontSize: 8,
    letterSpacing: 1,
    color: BRAND,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
  },
  reportTitle: {
    fontSize: 20,
    fontFamily: "Helvetica-Bold",
    color: INK,
    marginTop: 2,
  },
  reportSub: { fontSize: 9, color: INK_SOFT, marginTop: 2 },
  headerRight: { textAlign: "right" },
  // Decision banner · hero
  decisionBanner: {
    marginTop: 14,
    marginBottom: 2,
    borderWidth: 1.5,
    borderRadius: 6,
    padding: 14,
  },
  decisionBannerYes: { backgroundColor: "#ECFDF5", borderColor: "#10B981" },
  decisionBannerNo: { backgroundColor: "#FFF1F2", borderColor: "#F43F5E" },
  decisionLabel: {
    fontSize: 8,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    fontFamily: "Helvetica-Bold",
  },
  decisionLabelYes: { color: "#047857" },
  decisionLabelNo: { color: "#BE123C" },
  decisionQuestion: {
    fontSize: 13,
    color: INK,
    fontFamily: "Helvetica-Bold",
    marginTop: 2,
    marginBottom: 10,
  },
  decisionRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  decisionIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    textAlign: "center",
    fontSize: 24,
    fontFamily: "Helvetica-Bold",
    color: "#FFFFFF",
    paddingTop: 8,
    marginRight: 14,
  },
  decisionIconYes: { backgroundColor: "#10B981" },
  decisionIconNo: { backgroundColor: "#F43F5E" },
  decisionTitle: {
    fontSize: 18,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 0.5,
  },
  decisionTitleYes: { color: "#047857" },
  decisionTitleNo: { color: "#BE123C" },
  decisionConfidence: {
    fontSize: 9,
    color: INK_SOFT,
    marginTop: 2,
  },
  decisionConfidenceStrong: {
    fontFamily: "Helvetica-Bold",
    color: INK,
  },

  sectionTitle: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 1,
    textTransform: "uppercase",
    color: INK_MUTE,
    marginTop: 16,
    marginBottom: 6,
  },

  metaGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },
  metaItem: { width: "50%", flexDirection: "row", paddingVertical: 2 },
  metaLabel: {
    fontSize: 9,
    color: INK_MUTE,
    width: 110,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  metaValue: { fontSize: 10, color: INK, flex: 1 },

  signatureBox: {
    marginTop: 12,
    padding: 10,
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 4,
  },
  signatureLabel: {
    fontSize: 8,
    letterSpacing: 1,
    textTransform: "uppercase",
    color: BRAND_DARK,
    fontFamily: "Helvetica-Bold",
  },
  signatureBody: { fontSize: 10, color: INK, marginTop: 4, lineHeight: 1.5 },

  // Compliance per severity (neutral · solo colores de barra pass/fail/na)
  complianceRow: { marginTop: 10 },
  complianceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 3,
  },
  complianceLabel: { fontSize: 10, color: INK, fontFamily: "Helvetica-Bold" },
  complianceSub: { fontSize: 9, color: INK_MUTE },
  compliancePct: { fontSize: 11, color: INK, fontFamily: "Helvetica-Bold" },
  bar: {
    height: 7,
    flexDirection: "row",
    backgroundColor: "#F1F5F9",
    borderWidth: 0.5,
    borderColor: BORDER,
    borderRadius: 3,
    overflow: "hidden",
  },
  barPass: { backgroundColor: "#10B981" },
  barFail: { backgroundColor: "#F43F5E" },
  barNA: { backgroundColor: "#94A3B8" },
  breakdown: {
    flexDirection: "row",
    marginTop: 3,
    gap: 12,
    fontSize: 8,
    color: INK_SOFT,
  },
  breakdownDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    marginRight: 3,
  },
  breakdownItem: { flexDirection: "row", alignItems: "center" },

  failedList: {
    marginTop: 6,
    padding: 10,
    backgroundColor: "#FEF2F2",
    borderWidth: 1,
    borderColor: "#FCA5A5",
    borderRadius: 4,
  },
  failedTitle: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: RISK,
  },
  failedItem: { fontSize: 9, color: "#991B1B", marginTop: 3 },

  categorySection: { marginTop: 14 },
  categoryTitle: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: INK,
    marginBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: BRAND,
    paddingBottom: 2,
  },
  criterionRow: {
    flexDirection: "row",
    paddingVertical: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: BORDER,
    alignItems: "flex-start",
  },
  critText: { flex: 1, fontSize: 9, color: INK, lineHeight: 1.35 },
  critResult: {
    width: 70,
    fontSize: 7,
    textAlign: "center",
    letterSpacing: 0.5,
    textTransform: "uppercase",
    fontFamily: "Helvetica-Bold",
    borderRadius: 2,
    paddingVertical: 2,
    marginLeft: 6,
    marginRight: 4,
  },
  critSev: {
    width: 50,
    fontSize: 7,
    textAlign: "right",
    letterSpacing: 0.5,
    textTransform: "uppercase",
    fontFamily: "Helvetica-Bold",
    color: INK_MUTE,
  },

  footer: {
    position: "absolute",
    bottom: 20,
    left: 32,
    right: 32,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: BORDER,
  },
  footerLeft: { fontSize: 8, color: INK_MUTE },
  footerRight: {
    fontSize: 8,
    letterSpacing: 1,
    color: INK,
    fontFamily: "Helvetica-Bold",
  },
});

function fmtDate(iso: string | null): string {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleString("es-MX", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "America/Mexico_City",
  });
}

type Props = {
  template: TemplateDTO;
  evaluation: EvaluationDTO;
};

type SeverityKey = "Blocker" | "Critical" | "Nice-to-have";
type Bucket = { Pass: number; Fail: number; NA: number; Unanswered: number; total: number };

export function AcceptancePdfDocument({ template, evaluation }: Props) {
  // Build totals
  const totals: Record<SeverityKey, Bucket> = {
    Blocker: { Pass: 0, Fail: 0, NA: 0, Unanswered: 0, total: 0 },
    Critical: { Pass: 0, Fail: 0, NA: 0, Unanswered: 0, total: 0 },
    "Nice-to-have": { Pass: 0, Fail: 0, NA: 0, Unanswered: 0, total: 0 },
  };
  const responsesByCrit = new Map(
    evaluation.responses.map((r) => [r.criterionId, r]),
  );
  const failedCriteria: {
    criterion: CriterionDTO;
    comment: string | null;
  }[] = [];

  template.categories.forEach((cat) => {
    cat.criteria.forEach((c) => {
      totals[c.severity].total++;
      const r = responsesByCrit.get(c.id);
      const result = r?.result ?? null;
      if (result === "Pass") totals[c.severity].Pass++;
      else if (result === "Fail") {
        totals[c.severity].Fail++;
        failedCriteria.push({ criterion: c, comment: r?.comment ?? null });
      } else if (result === "NA") totals[c.severity].NA++;
      else totals[c.severity].Unanswered++;
    });
  });

  const decisionLabel =
    evaluation.finalDecision === "Si"
      ? "SÍ · LISTA PARA ARRANCAR"
      : evaluation.finalDecision === "No"
        ? "NO · AÚN NO LISTA"
        : "—";

  const signatureBody = `Yo, ${evaluation.evaluatorName ?? "evaluador"}, confirmo que los resultados mostrados en este reporte reflejan mi evaluación honesta de los ${template.totalCriteria} criterios de aceptación, y asumo responsabilidad por la decisión final registrada. Esta firma queda vinculada al registro ${evaluation.name} con fecha y hora de envío ${fmtDate(evaluation.submittedAt)}.`;

  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        <View style={styles.topAccent} />

        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.reportTag}>
              {evaluation.evaluationType === "Consolidated"
                ? "Firma consolidada · evaluación final"
                : "Evaluación de aceptación · firmada"}
            </Text>
            <Text style={styles.reportTitle}>{template.label}</Text>
            <Text style={styles.reportSub}>
              {template.agentApiName} · {template.totalCriteria} criterios en{" "}
              {template.categories.length} categorías
            </Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.reportTag}>Registro</Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily: "Helvetica-Bold",
                color: INK,
                marginTop: 2,
              }}
            >
              {evaluation.name}
            </Text>
            <Text style={{ fontSize: 8, color: INK_MUTE, marginTop: 2 }}>
              {fmtDate(evaluation.submittedAt)}
            </Text>
          </View>
        </View>

        {/* DECISION BANNER · hero */}
        <View
          style={[
            styles.decisionBanner,
            evaluation.finalDecision === "Si"
              ? styles.decisionBannerYes
              : styles.decisionBannerNo,
          ]}
        >
          <Text
            style={[
              styles.decisionLabel,
              evaluation.finalDecision === "Si"
                ? styles.decisionLabelYes
                : styles.decisionLabelNo,
            ]}
          >
            Decisión final · firmada
          </Text>
          <Text style={styles.decisionQuestion}>
            ¿{agentNameFor(template.projectSlug)} está lista para{" "}
            {goLiveLabelFor(template.projectSlug)}?
          </Text>
          <View style={styles.decisionRow}>
            <Text
              style={[
                styles.decisionIcon,
                evaluation.finalDecision === "Si"
                  ? styles.decisionIconYes
                  : styles.decisionIconNo,
              ]}
            >
              {evaluation.finalDecision === "Si" ? "✓" : "!"}
            </Text>
            <View style={{ flex: 1 }}>
              <Text
                style={[
                  styles.decisionTitle,
                  evaluation.finalDecision === "Si"
                    ? styles.decisionTitleYes
                    : styles.decisionTitleNo,
                ]}
              >
                {decisionLabel}
              </Text>
              <Text style={styles.decisionConfidence}>
                Nivel de confianza para un Go-live al 100% de usuarios:{" "}
                <Text style={styles.decisionConfidenceStrong}>
                  {evaluation.confidenceLevel != null
                    ? `${evaluation.confidenceLevel}%`
                    : "no proporcionado"}
                </Text>
              </Text>
            </View>
          </View>
        </View>

        {/* META */}
        <Text style={styles.sectionTitle}>Datos de la firma</Text>
        <View style={styles.metaGrid}>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Firmante</Text>
            <Text style={styles.metaValue}>
              {evaluation.evaluatorName ?? "—"}
            </Text>
          </View>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Email</Text>
            <Text style={styles.metaValue}>
              {evaluation.evaluatorEmail ?? "—"}
            </Text>
          </View>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Inicio</Text>
            <Text style={styles.metaValue}>{fmtDate(evaluation.startedAt)}</Text>
          </View>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Firmada</Text>
            <Text style={styles.metaValue}>
              {fmtDate(evaluation.submittedAt)}
            </Text>
          </View>
        </View>

        {evaluation.collaborators && evaluation.collaborators.length > 1 && (
          <>
            <Text style={styles.sectionTitle}>Colaboradores de la evaluación</Text>
            <View style={{ flexDirection: "column", gap: 2 }}>
              {evaluation.collaborators.map((c) => (
                <Text
                  key={c.portalAccessId}
                  style={{ fontSize: 9, color: INK_SOFT, lineHeight: 1.4 }}
                >
                  • {c.name}
                  {c.email ? ` (${c.email})` : ""} ·{" "}
                  {c.answeredCount}{" "}
                  {c.answeredCount === 1 ? "respuesta" : "respuestas"}
                </Text>
              ))}
            </View>
          </>
        )}

        {/* SIGNATURE */}
        <View style={styles.signatureBox}>
          <Text style={styles.signatureLabel}>Firma implícita</Text>
          <Text style={styles.signatureBody}>{signatureBody}</Text>
        </View>

        {evaluation.finalComment && (
          <>
            <Text style={styles.sectionTitle}>Comentario del evaluador</Text>
            <Text style={{ fontSize: 10, lineHeight: 1.5, color: INK_SOFT }}>
              {evaluation.finalComment}
            </Text>
          </>
        )}

        {/* COMPLIANCE PER SEVERITY · neutral palette */}
        <Text style={styles.sectionTitle}>Cumplimiento por severidad</Text>
        {(["Blocker", "Critical", "Nice-to-have"] as const).map((sev) => {
          const t = totals[sev];
          const applicable = t.Pass + t.Fail;
          const pct =
            applicable === 0 ? 0 : Math.round((t.Pass / applicable) * 100);
          const passPct = t.total === 0 ? 0 : (t.Pass / t.total) * 100;
          const failPct = t.total === 0 ? 0 : (t.Fail / t.total) * 100;
          const naPct = t.total === 0 ? 0 : (t.NA / t.total) * 100;
          return (
            <View key={sev} style={styles.complianceRow}>
              <View style={styles.complianceHeader}>
                <Text style={styles.complianceLabel}>
                  {sev}
                  <Text style={styles.complianceSub}>
                    {" "}
                    · {t.total} criterios
                  </Text>
                </Text>
                <Text style={styles.compliancePct}>{pct}% cumplimiento</Text>
              </View>
              <View style={styles.bar}>
                <View style={[styles.barPass, { width: `${passPct}%` }]} />
                <View style={[styles.barFail, { width: `${failPct}%` }]} />
                <View style={[styles.barNA, { width: `${naPct}%` }]} />
              </View>
              <View style={styles.breakdown}>
                <View style={styles.breakdownItem}>
                  <View style={[styles.breakdownDot, { backgroundColor: "#10B981" }]} />
                  <Text>{t.Pass} cumple</Text>
                </View>
                <View style={styles.breakdownItem}>
                  <View style={[styles.breakdownDot, { backgroundColor: "#F43F5E" }]} />
                  <Text>{t.Fail} no cumple</Text>
                </View>
                <View style={styles.breakdownItem}>
                  <View style={[styles.breakdownDot, { backgroundColor: "#94A3B8" }]} />
                  <Text>{t.NA} N/A</Text>
                </View>
                {t.Unanswered > 0 && (
                  <View style={styles.breakdownItem}>
                    <Text style={{ color: "#94A3B8" }}>
                      {t.Unanswered} pendiente{t.Unanswered === 1 ? "" : "s"}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          );
        })}

        {/* FAILED CRITERIA */}
        {failedCriteria.length > 0 && (
          <View style={styles.failedList}>
            <Text style={styles.failedTitle}>
              Criterios marcados "no cumple" ({failedCriteria.length})
            </Text>
            {failedCriteria.map(({ criterion, comment }) => (
              <View key={criterion.id} wrap={false}>
                <Text style={styles.failedItem}>
                  · [{criterion.severity}] {criterion.givenWhenThen}
                </Text>
                {comment && (
                  <Text
                    style={{
                      fontSize: 8,
                      color: "#7F1D1D",
                      marginLeft: 10,
                      marginTop: 1,
                      fontStyle: "italic",
                    }}
                  >
                    Comentario: {comment}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* FOOTER */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerLeft}>
            Firmado el {fmtDate(evaluation.submittedAt)} · Registro{" "}
            {evaluation.name}
          </Text>
          <Text style={styles.footerRight}>
            SALESFORCE · FORWARD DEPLOYED ENGINEERS
          </Text>
        </View>
      </Page>

      {/* Page 2+ · all criteria with results */}
      <Page size="LETTER" style={styles.page}>
        <View style={styles.topAccent} />
        <Text style={styles.sectionTitle}>
          Detalle completo · {template.totalCriteria} criterios
        </Text>

        {template.categories.map((cat) => (
          <View key={cat.id} style={styles.categorySection} wrap={true}>
            <Text style={styles.categoryTitle}>{cat.name}</Text>
            {cat.criteria.map((c, i) => {
              const r = responsesByCrit.get(c.id);
              const resultLabel =
                r?.result === "Pass"
                  ? "CUMPLE"
                  : r?.result === "PassWithObservations"
                    ? "CUMPLE C/OBS"
                    : r?.result === "Fail"
                      ? "NO CUMPLE"
                      : r?.result === "NA"
                        ? "N/A"
                        : "SIN RESP.";
              const resultBg =
                r?.result === "Pass"
                  ? "#D1FAE5"
                  : r?.result === "PassWithObservations"
                    ? "#FEF3C7"
                    : r?.result === "Fail"
                      ? "#FFE4E6"
                      : r?.result === "NA"
                        ? "#E2E8F0"
                        : "#F8FAFC";
              const resultColor =
                r?.result === "Pass"
                  ? "#065F46"
                  : r?.result === "PassWithObservations"
                    ? "#92400E"
                    : r?.result === "Fail"
                      ? "#9F1239"
                      : r?.result === "NA"
                        ? "#475569"
                        : "#94A3B8";
              const sourceLabel = r?.sourceEvaluationVersion
                ? r.sourceEvaluationVersion
                : r?.sourceEvaluationName
                  ? r.sourceEvaluationName
                  : null;
              return (
                <View key={c.id} style={styles.criterionRow} wrap={false}>
                  <View style={{ flex: 1, paddingRight: 6 }}>
                    <Text style={styles.critText}>
                      {String(i + 1).padStart(2, "0")}
                      {c.topic ? ` · ${c.topic}` : ""} · {c.givenWhenThen}
                    </Text>
                    {sourceLabel &&
                      evaluation.evaluationType === "Consolidated" && (
                        <Text
                          style={{
                            fontSize: 7,
                            color: "#6366F1",
                            marginTop: 2,
                            fontFamily: "Helvetica-Oblique",
                          }}
                        >
                          ↳ heredado de {sourceLabel}
                          {r?.answeredAt ? ` · ${fmtDate(r.answeredAt)}` : ""}
                        </Text>
                      )}
                  </View>
                  <Text
                    style={[
                      styles.critResult,
                      { backgroundColor: resultBg, color: resultColor },
                    ]}
                  >
                    {resultLabel}
                  </Text>
                  <Text style={styles.critSev}>
                    {c.severity === "Nice-to-have" ? "NTH" : c.severity.toUpperCase().slice(0, 3)}
                  </Text>
                </View>
              );
            })}
          </View>
        ))}

        <View style={styles.footer} fixed>
          <Text style={styles.footerLeft}>
            {template.label} · {evaluation.name}
          </Text>
          <Text style={styles.footerRight}>
            SALESFORCE · FORWARD DEPLOYED ENGINEERS
          </Text>
        </View>
      </Page>
    </Document>
  );
}
