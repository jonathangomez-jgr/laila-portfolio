const groups = [
  {
    category: "Configuración",
    borderTop: "#066afe",
    labelColor: "text-[#066afe]",
    valueColor: "text-[#022ac0]",
    bg: "bg-[#eaf5fe]",
    border: "border-[#066afe]/15",
    items: [
      { label: "Custom Objects",  value: 20   },
      { label: "Custom Fields",   value: 4448 },
      { label: "Record Types",    value: 28   },
      { label: "Lightning Pages", value: 36   },
    ],
  },
  {
    category: "IA y Automatización",
    borderTop: "#730394",
    labelColor: "text-[#730394]",
    valueColor: "text-[#730394]",
    bg: "bg-[#f7eafe]",
    border: "border-[#730394]/15",
    items: [
      { label: "Agentforce Agents",    value: 17  },
      { label: "Custom Agent Actions", value: 17  },
      { label: "Flows",                value: 109 },
      { label: "Prompt Templates",     value: 22  },
    ],
  },
  {
    category: "Comunicación y Acceso",
    borderTop: "#06a59a",
    labelColor: "text-[#06a59a]",
    valueColor: "text-[#06a59a]",
    bg: "bg-[#eafaf9]",
    border: "border-[#06a59a]/15",
    items: [
      { label: "Email Templates", value: 5  },
      { label: "Surveys",         value: 9  },
      { label: "Permission Sets", value: 30 },
    ],
  },
];

export default function LailaMetadataDashboard() {
  return (
    <div>
      <div className="mb-5">
        <h3 className="text-xl font-semibold text-[#002775]">Configuración del Org</h3>
        <p className="mt-1.5 text-sm leading-6 text-[#4a6fa5]">
          Indicadores de configuración, automatización y acceso del org de Salesforce.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {groups.map((group) => (
          <div
            key={group.category}
            className={`rounded-2xl border ${group.border} ${group.bg} p-5`}
            style={{ borderTop: `3px solid ${group.borderTop}` }}
          >
            <p className={`mb-4 text-xs font-bold uppercase tracking-wider ${group.labelColor}`}>
              {group.category}
            </p>
            <div className="space-y-2.5">
              {group.items.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between rounded-xl bg-white px-4 py-3 shadow-sm"
                  style={{ boxShadow: "0 2px 8px rgba(6,106,254,0.08)" }}
                >
                  <span className="text-sm font-medium text-[#002775]">{item.label}</span>
                  <span className={`text-2xl font-bold tabular-nums ${group.valueColor}`}>
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
