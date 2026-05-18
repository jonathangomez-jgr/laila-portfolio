const records = [
  { group: "CRM", tipo: "Estándar", objeto: "Account", registros: 5386 },
  { group: "CRM", tipo: "Estándar", objeto: "Contact", registros: 119 },
  { group: "CRM", tipo: "Estándar", objeto: "Opportunity", registros: 5348 },
  { group: "CRM", tipo: "Estándar", objeto: "Quote", registros: 6 },
  { group: "CRM", tipo: "Estándar", objeto: "Contract", registros: 3 },
  { group: "CRM", tipo: "Estándar", objeto: "Order", registros: 3 },
  { group: "CRM", tipo: "Estándar", objeto: "Order Product", registros: 3 },
  { group: "CRM", tipo: "Estándar", objeto: "Asset", registros: 40 },
  { group: "Servicio al Cliente", tipo: "Estándar", objeto: "Case", registros: 3715 },
  { group: "Servicio al Cliente", tipo: "Estándar", objeto: "Work Order", registros: 18 },
  { group: "Servicio al Cliente", tipo: "Estándar", objeto: "Service Appointment", registros: 3 },
  { group: "Servicio al Cliente", tipo: "Estándar", objeto: "Messaging Session", registros: 340 },
  { group: "Servicio al Cliente", tipo: "Estándar", objeto: "Messaging User", registros: 4 },
  { group: "Servicio al Cliente", tipo: "Estándar", objeto: "Voice Call", registros: 21 },
  { group: "Servicio al Cliente", tipo: "Estándar", objeto: "Survey Invitation", registros: 325 },
  { group: "Lealtad y Eventos de Vida", tipo: "Estándar", objeto: "Loyalty Program", registros: 0 },
  { group: "Lealtad y Eventos de Vida", tipo: "Estándar", objeto: "Loyalty Program Member", registros: 99 },
  { group: "Lealtad y Eventos de Vida", tipo: "Estándar", objeto: "Loyalty Member Currency", registros: 99 },
  { group: "Lealtad y Eventos de Vida", tipo: "Estándar", objeto: "Transaction Journal", registros: 48 },
  { group: "Lealtad y Eventos de Vida", tipo: "Estándar", objeto: "Person Life Event", registros: 15 },
  { group: "Objetos Personalizados", tipo: "Personalizado", objeto: "Customer Feedback", registros: 194 },
  { group: "Objetos Personalizados", tipo: "Personalizado", objeto: "Financial Account", registros: 14 },
  { group: "Objetos Personalizados", tipo: "Personalizado", objeto: "Financial Account Transaction", registros: 48 },
  { group: "Objetos Personalizados", tipo: "Personalizado", objeto: "Solicitud de Crédito", registros: 1 },
  { group: "Objetos Personalizados", tipo: "Personalizado", objeto: "Insurance Policy", registros: 18 },
  { group: "Objetos Personalizados", tipo: "Personalizado", objeto: "Perfil Medicina Prepagada", registros: 7 },
  { group: "Objetos Personalizados", tipo: "Personalizado", objeto: "Formulario Afiliación", registros: 3 },
  { group: "Objetos Personalizados", tipo: "Personalizado", objeto: "Beneficiario", registros: 1 },
  { group: "Objetos Personalizados", tipo: "Personalizado", objeto: "Page Access", registros: 9 },
  { group: "Objetos Personalizados", tipo: "Personalizado", objeto: "Tipificación de casos", registros: 1174 },
  { group: "Objetos Personalizados", tipo: "Personalizado", objeto: "Premium Experience", registros: 27 },
  { group: "Objetos Personalizados", tipo: "Personalizado", objeto: "Premium Experience Attendee", registros: 11 },
];

const groupConfig: Record<string, { colorBar: string; colorBg: string; colorBorder: string; colorLabel: string; colorTotal: string }> = {
  "CRM": {
    colorBar: "bg-indigo-500",
    colorBg: "bg-indigo-50/60",
    colorBorder: "border-indigo-100",
    colorLabel: "text-indigo-700",
    colorTotal: "text-indigo-600",
  },
  "Servicio al Cliente": {
    colorBar: "bg-sky-500",
    colorBg: "bg-sky-50/60",
    colorBorder: "border-sky-100",
    colorLabel: "text-sky-700",
    colorTotal: "text-sky-600",
  },
  "Lealtad y Eventos de Vida": {
    colorBar: "bg-violet-500",
    colorBg: "bg-violet-50/60",
    colorBorder: "border-violet-100",
    colorLabel: "text-violet-700",
    colorTotal: "text-violet-600",
  },
  "Objetos Personalizados": {
    colorBar: "bg-emerald-500",
    colorBg: "bg-emerald-50/60",
    colorBorder: "border-emerald-100",
    colorLabel: "text-emerald-700",
    colorTotal: "text-emerald-600",
  },
};

const groupNames = ["CRM", "Servicio al Cliente", "Lealtad y Eventos de Vida", "Objetos Personalizados"];

export default function LailaRecordsDashboard() {
  const maxRecords = Math.max(...records.map((r) => r.registros));

  const grouped = groupNames.map((groupName) => {
    const items = records
      .filter((r) => r.group === groupName)
      .sort((a, b) => b.registros - a.registros);
    const total = items.reduce((s, r) => s + r.registros, 0);
    return { groupName, items, total };
  });

  return (
    <div>
      <div className="mb-5">
        <h3 className="text-xl font-semibold text-gray-900">Registros por Objeto</h3>
        <p className="mt-1.5 text-sm leading-6 text-gray-500">
          Distribución de registros de demo a través de objetos estándar y personalizados.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {grouped.map(({ groupName, items, total }) => {
          const cfg = groupConfig[groupName];
          return (
            <div
              key={groupName}
              className={`rounded-2xl border ${cfg.colorBorder} ${cfg.colorBg} p-5`}
            >
              <div className="mb-4 flex items-center justify-between">
                <p className={`text-xs font-bold uppercase tracking-wider ${cfg.colorLabel}`}>
                  {groupName}
                </p>
                <span className={`text-sm font-bold tabular-nums ${cfg.colorTotal}`}>
                  {total.toLocaleString("es-CO")} total
                </span>
              </div>

              <div className="space-y-2">
                {items.map((row) => {
                  const pct = maxRecords > 0 ? (row.registros / maxRecords) * 100 : 0;
                  return (
                    <div key={row.objeto}>
                      <div className="flex items-center justify-between text-xs text-gray-600 mb-0.5">
                        <span className="truncate pr-2 font-medium">{row.objeto}</span>
                        <span className="shrink-0 tabular-nums font-semibold text-gray-800">
                          {row.registros.toLocaleString("es-CO")}
                        </span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-white/70">
                        <div
                          className={`h-1.5 rounded-full ${cfg.colorBar} transition-all duration-500`}
                          style={{ width: `${Math.max(pct, row.registros > 0 ? 1 : 0)}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
