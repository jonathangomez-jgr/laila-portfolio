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
  statusPill: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  statusPillYes: { color: OK },
  statusPillNo: { color: RISK },

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

  totalsRow: {
    flexDirection: "row",
    marginTop: 6,
    gap: 8,
  },
  totalCard: {
    flex: 1,
    padding: 8,
    borderWidth: 1,
    borderRadius: 4,
  },
  totalCardBlocker: { borderColor: "#FCA5A5", backgroundColor: "#FEF2F2" },
  totalCardCritical: { borderColor: "#FCD34D", backgroundColor: "#FFFBEB" },
  totalCardNice: { borderColor: BORDER, backgroundColor: "#F8FAFC" },
  totalLabel: {
    fontSize: 8,
    letterSpacing: 1,
    textTransform: "uppercase",
    color: INK_MUTE,
    fontFamily: "Helvetica-Bold",
  },
  totalNumber: {
    fontSize: 20,
    fontFamily: "Helvetica-Bold",
    color: INK,
    marginTop: 2,
  },
  totalBreakdown: { fontSize: 8, color: INK_SOFT, marginTop: 2 },

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
    paddingVertical: 4,
    borderBottomWidth: 0.5,
    borderBottomColor: BORDER,
  },
  critIcon: { width: 14, fontSize: 9, fontFamily: "Helvetica-Bold" },
  critText: { flex: 1, fontSize: 9, color: INK, lineHeight: 1.35 },
  critSev: {
    width: 48,
    fontSize: 7,
    textAlign: "right",
    letterSpacing: 0.5,
    textTransform: "uppercase",
    fontFamily: "Helvetica-Bold",
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
              Evaluación de aceptación · firmada
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
            <Text
              style={[
                styles.statusPill,
                evaluation.finalDecision === "Si"
                  ? styles.statusPillYes
                  : styles.statusPillNo,
              ]}
            >
              {decisionLabel}
            </Text>
          </View>
        </View>

        {/* META */}
        <Text style={styles.sectionTitle}>Datos de la firma</Text>
        <View style={styles.metaGrid}>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Evaluador</Text>
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
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Decisión</Text>
            <Text
              style={[
                styles.metaValue,
                {
                  fontFamily: "Helvetica-Bold",
                  color:
                    evaluation.finalDecision === "Si" ? OK : RISK,
                },
              ]}
            >
              {decisionLabel}
            </Text>
          </View>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Confianza</Text>
            <Text style={styles.metaValue}>
              {evaluation.confidenceLevel != null
                ? `${evaluation.confidenceLevel}%`
                : "— (no proporcionada)"}
            </Text>
          </View>
        </View>

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

        {/* TOTALS */}
        <Text style={styles.sectionTitle}>Resumen por severidad</Text>
        <View style={styles.totalsRow}>
          {(["Blocker", "Critical", "Nice-to-have"] as const).map((sev) => {
            const t = totals[sev];
            const cardStyle =
              sev === "Blocker"
                ? styles.totalCardBlocker
                : sev === "Critical"
                  ? styles.totalCardCritical
                  : styles.totalCardNice;
            return (
              <View key={sev} style={[styles.totalCard, cardStyle]}>
                <Text style={styles.totalLabel}>{sev}</Text>
                <Text style={styles.totalNumber}>
                  {t.Pass + t.NA}
                  <Text style={{ fontSize: 11, color: INK_MUTE }}>
                    {" "}
                    / {t.total}
                  </Text>
                </Text>
                <Text style={styles.totalBreakdown}>
                  ✓ {t.Pass} · ✕ {t.Fail} · — {t.NA}
                  {t.Unanswered > 0 ? ` · ○ ${t.Unanswered}` : ""}
                </Text>
              </View>
            );
          })}
        </View>

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
              const icon =
                r?.result === "Pass"
                  ? "✓"
                  : r?.result === "Fail"
                    ? "✕"
                    : r?.result === "NA"
                      ? "—"
                      : "○";
              const iconColor =
                r?.result === "Pass"
                  ? OK
                  : r?.result === "Fail"
                    ? RISK
                    : r?.result === "NA"
                      ? INK_MUTE
                      : INK_MUTE;
              const sevColor =
                c.severity === "Blocker"
                  ? RISK
                  : c.severity === "Critical"
                    ? WARN
                    : INK_MUTE;
              return (
                <View key={c.id} style={styles.criterionRow} wrap={false}>
                  <Text style={[styles.critIcon, { color: iconColor }]}>
                    {icon}
                  </Text>
                  <Text style={styles.critText}>
                    {String(i + 1).padStart(2, "0")}
                    {c.topic ? ` · ${c.topic}` : ""} · {c.givenWhenThen}
                  </Text>
                  <Text style={[styles.critSev, { color: sevColor }]}>
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
