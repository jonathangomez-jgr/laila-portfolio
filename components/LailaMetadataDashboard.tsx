const groups = [
  {
    category: "Configuración",
    colorDot: "bg-indigo-500",
    colorBg: "bg-indigo-50",
    colorBorder: "border-indigo-100",
    colorLabel: "text-indigo-700",
    colorValue: "text-indigo-600",
    items: [
      { label: "Custom Objects", value: 20 },
      { label: "Custom Fields", value: 4448 },
      { label: "Record Types", value: 28 },
      { label: "Lightning Pages", value: 36 },
    ],
  },
  {
    category: "IA y Automatización",
    colorDot: "bg-violet-500",
    colorBg: "bg-violet-50",
    colorBorder: "border-violet-100",
    colorLabel: "text-violet-700",
    colorValue: "text-violet-600",
    items: [
      { label: "Agentforce Agents", value: 17 },
      { label: "Custom Agent Actions", value: 17 },
      { label: "Flows", value: 109 },
      { label: "Prompt Templates", value: 22 },
    ],
  },
  {
    category: "Comunicación y Acceso",
    colorDot: "bg-sky-500",
    colorBg: "bg-sky-50",
    colorBorder: "border-sky-100",
    colorLabel: "text-sky-700",
    colorValue: "text-sky-600",
    items: [
      { label: "Email Templates", value: 5 },
      { label: "Surveys", value: 9 },
      { label: "Permission Sets", value: 30 },
    ],
  },
];

export default function LailaMetadataDashboard() {
  return (
    <div>
      <div className="mb-5">
        <h3 className="text-xl font-semibold text-gray-900">Configuración del Org</h3>
        <p className="mt-1.5 text-sm leading-6 text-gray-500">
          Indicadores de configuración, automatización y acceso del org de Salesforce.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {groups.map((group) => (
          <div
            key={group.category}
            className={`rounded-2xl border ${group.colorBorder} ${group.colorBg} p-5`}
          >
            <div className="mb-4 flex items-center gap-2">
              <span className={`h-2 w-2 rounded-full ${group.colorDot}`} />
              <p className={`text-xs font-bold uppercase tracking-wider ${group.colorLabel}`}>
                {group.category}
              </p>
            </div>
            <div className="space-y-2.5">
              {group.items.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between rounded-xl bg-white px-4 py-3 shadow-sm ring-1 ring-black/5"
                >
                  <span className="text-sm font-medium text-gray-600">{item.label}</span>
                  <span className={`text-2xl font-bold tabular-nums ${group.colorValue}`}>
                    {item.value.toLocaleString("es-CO")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
