import { NextRequest, NextResponse } from "next/server";
import { renderToStream } from "@react-pdf/renderer";
import { AcceptancePdfDocument } from "@/lib/acceptance/pdfDocument";
import { getCurrentUser } from "@/lib/portalAuth";
import type {
  TemplateDTO,
  EvaluationDTO,
} from "@/lib/salesforce/acceptanceWizard";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

async function streamToBuffer(stream: NodeJS.ReadableStream): Promise<Uint8Array> {
  const chunks: Buffer[] = [];
  for await (const chunk of stream) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  return new Uint8Array(Buffer.concat(chunks));
}

/**
 * GET /api/portal/acceptance/pdf-preview?scenario=yes-high|yes-low|no-high|no-low|mixed
 *
 * Dev-friendly endpoint that renders the PDF with mock data so we can iterate
 * on the design without doing a full evaluation. Requires an authenticated
 * portal user. The data is synthetic — nothing hits the Salesforce org.
 */
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    const scenario = request.nextUrl.searchParams.get("scenario") ?? "mixed";
    const { template, evaluation } = buildMockData(scenario, user.name);

    const stream = await renderToStream(
      <AcceptancePdfDocument template={template} evaluation={evaluation} />,
    );
    const pdfBytes = await streamToBuffer(stream);

    return new NextResponse(Buffer.from(pdfBytes), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="preview_${scenario}.pdf"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// ============================================================================
// Mock data builder
// ============================================================================

function buildMockData(
  scenario: string,
  evaluatorName: string,
): { template: TemplateDTO; evaluation: EvaluationDTO } {
  // Build the same 6-category structure as Betterware, but with synthetic criteria
  const sampleCriteria = [
    {
      topic: "Autenticación",
      text: "Dado que un usuario no identificado envía un mensaje, cuando Betty responde, entonces solo enfoca la conversación en identificarlo.",
      severity: "Blocker" as const,
    },
    {
      topic: "Autenticación",
      text: "Dado que el usuario envía un código, cuando Betty lo recibe, entonces lo valida de inmediato.",
      severity: "Blocker" as const,
    },
    {
      topic: "Autenticación",
      text: "Dado que la identificación fue exitosa, cuando Betty saluda, entonces usa solo el primer nombre.",
      severity: "Critical" as const,
    },
    {
      topic: "Reset contraseña",
      text: "Dado que se solicita reset, cuando Betty responde, entonces envía el enlace solo al teléfono validado.",
      severity: "Blocker" as const,
    },
    {
      topic: "Reset contraseña",
      text: "Dado que un distribuidor ajeno solicita reset, cuando Betty responde, entonces rechaza con cortesía.",
      severity: "Blocker" as const,
    },
  ];

  const categoryNames = [
    "Atención y seguridad",
    "Servicio y trámites",
    "Puntos y programas",
    "Pedidos y logística",
    "Red y datos comerciales",
    "Saldos y pagos",
  ];

  const categories = categoryNames.map((name, catIdx) => ({
    id: `cat-${catIdx + 1}`,
    name,
    description: `Validación de ${name.toLowerCase()}.`,
    sortOrder: catIdx + 1,
    criteria: sampleCriteria.map((c, i) => ({
      id: `crit-${catIdx + 1}-${i + 1}`,
      categoryId: `cat-${catIdx + 1}`,
      topic: c.topic,
      givenWhenThen: c.text,
      severity: c.severity,
      sortOrder: catIdx * 5 + i + 1,
      isBlocked: false,
      blockedReason: null,
      criterionKey: null,
    })),
  }));

  const totalCriteria = categories.reduce(
    (sum, c) => sum + c.criteria.length,
    0,
  );

  const template: TemplateDTO = {
    id: "tmpl-preview",
    label: "Betterware v25 (PREVIEW)",
    projectSlug: "betterware",
    agentApiName: "FDE_BW_Service_Agent_V2",
    version: "v25",
    welcomeMessage:
      "Hemos llegado hasta aquí juntos.\nTu evaluación de hoy es lo que convierte este trabajo en una experiencia real para las distribuidoras.",
    categories,
    totalCriteria,
  };

  // Build responses based on scenario
  const responses = categories.flatMap((cat) =>
    cat.criteria.map((c) => {
      const r = pickResult(scenario, c.severity, c.id);
      return {
        id: `resp-${c.id}`,
        criterionId: c.id,
        result: r.result,
        comment: r.comment,
        answeredAt: new Date().toISOString(),
        answeredByPortalAccessId: null,
        answeredByName: null,
        answeredByEmail: null,
        sourceEvaluationId: null,
        sourceEvaluationName: null,
        sourceEvaluationVersion: null,
      };
    }),
  );

  const answered = responses.filter((r) => r.result != null).length;

  const { finalDecision, confidenceLevel } = pickFinal(scenario);

  const evaluation: EvaluationDTO = {
    id: "eval-preview",
    name: "EVAL-PREVIEW",
    templateId: template.id,
    evaluatorPortalAccessId: "preview",
    evaluatorName,
    evaluatorEmail: "preview@laila.demo",
    evaluatorRole: "Client",
    evaluationType: "Partial",
    status: "Submitted",
    startedAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    submittedAt: new Date().toISOString(),
    finalDecision,
    confidenceLevel,
    finalComment:
      scenario === "no-low"
        ? "Hay demasiados bloqueantes abiertos para arrancar."
        : scenario === "yes-high"
          ? "Agente estable, listo para arrancar Insiders."
          : null,
    currentPage: 0,
    responses,
    collaborators: [],
    progress: {
      answered,
      total: totalCriteria,
      pct: Math.round((answered / totalCriteria) * 100),
    },
  };

  return { template, evaluation };
}

function pickResult(
  scenario: string,
  severity: "Blocker" | "Critical" | "Nice-to-have",
  id: string,
): { result: "Pass" | "Fail" | "NA" | null; comment: string | null } {
  // Deterministic pseudo-random based on criterion id
  const hash = id.split("").reduce((a, c) => a + c.charCodeAt(0), 0);

  if (scenario === "yes-high") {
    // Everything passes except a few NAs
    return hash % 11 === 0
      ? { result: "NA", comment: null }
      : { result: "Pass", comment: null };
  }
  if (scenario === "yes-low") {
    // Mostly pass, a few critical fails
    if (severity === "Critical" && hash % 7 === 0)
      return {
        result: "Fail",
        comment: "Observación menor que no bloquea el arranque.",
      };
    return hash % 13 === 0
      ? { result: "NA", comment: null }
      : { result: "Pass", comment: null };
  }
  if (scenario === "no-low") {
    // Many blocker fails
    if (severity === "Blocker" && hash % 3 === 0)
      return {
        result: "Fail",
        comment: "Bloqueante crítico abierto. Riesgo alto.",
      };
    return hash % 5 === 0
      ? { result: "Fail", comment: "Comportamiento inconsistente." }
      : hash % 11 === 0
        ? { result: "NA", comment: null }
        : { result: "Pass", comment: null };
  }
  // mixed · default
  if (hash % 20 === 0)
    return { result: "Fail", comment: "Falla observada en pruebas." };
  if (hash % 15 === 0) return { result: "NA", comment: null };
  return { result: "Pass", comment: null };
}

function pickFinal(scenario: string): {
  finalDecision: "Si" | "No";
  confidenceLevel: number;
} {
  switch (scenario) {
    case "yes-high":
      return { finalDecision: "Si", confidenceLevel: 90 };
    case "yes-low":
      return { finalDecision: "Si", confidenceLevel: 55 };
    case "no-low":
      return { finalDecision: "No", confidenceLevel: 25 };
    case "no-high":
      return { finalDecision: "No", confidenceLevel: 40 };
    default:
      return { finalDecision: "Si", confidenceLevel: 75 };
  }
}
