const records = [
  { group: "CRM",                      objeto: "Account",                       registros: 5386 },
  { group: "CRM",                      objeto: "Opportunity",                   registros: 5348 },
  { group: "CRM",                      objeto: "Contact",                       registros: 119  },
  { group: "CRM",                      objeto: "Asset",                         registros: 40   },
  { group: "CRM",                      objeto: "Quote",                         registros: 6    },
  { group: "CRM",                      objeto: "Contract",                      registros: 3    },
  { group: "CRM",                      objeto: "Order",                         registros: 3    },
  { group: "CRM",                      objeto: "Order Product",                 registros: 3    },
  { group: "Servicio al Cliente",      objeto: "Case",                          registros: 3715 },
  { group: "Servicio al Cliente",      objeto: "Messaging Session",             registros: 340  },
  { group: "Servicio al Cliente",      objeto: "Survey Invitation",             registros: 325  },
  { group: "Servicio al Cliente",      objeto: "Voice Call",                    registros: 21   },
  { group: "Servicio al Cliente",      objeto: "Work Order",                    registros: 18   },
  { group: "Servicio al Cliente",      objeto: "Messaging User",                registros: 4    },
  { group: "Servicio al Cliente",      objeto: "Service Appointment",           registros: 3    },
  { group: "Lealtad y Eventos de Vida",objeto: "Loyalty Program Member",        registros: 99   },
  { group: "Lealtad y Eventos de Vida",objeto: "Loyalty Member Currency",       registros: 99   },
  { group: "Lealtad y Eventos de Vida",objeto: "Transaction Journal",           registros: 48   },
  { group: "Lealtad y Eventos de Vida",objeto: "Person Life Event",             registros: 15   },
  { group: "Lealtad y Eventos de Vida",objeto: "Loyalty Program",               registros: 0    },
  { group: "Objetos Personalizados",   objeto: "Tipificación de casos",         registros: 1174 },
  { group: "Objetos Personalizados",   objeto: "Customer Feedback",             registros: 194  },
  { group: "Objetos Personalizados",   objeto: "Financial Account Transaction", registros: 48   },
  { group: "Objetos Personalizados",   objeto: "Premium Experience",            registros: 27   },
  { group: "Objetos Personalizados",   objeto: "Insurance Policy",              registros: 18   },
  { group: "Objetos Personalizados",   objeto: "Financial Account",             registros: 14   },
  { group: "Objetos Personalizados",   objeto: "Premium Experience Attendee",   registros: 11   },
  { group: "Objetos Personalizados",   objeto: "Page Access",                   registros: 9    },
  { group: "Objetos Personalizados",   objeto: "Perfil Medicina Prepagada",     registros: 7    },
  { group: "Objetos Personalizados",   objeto: "Formulario Afiliación",         registros: 3    },
  { group: "Objetos Personalizados",   objeto: "Solicitud de Crédito",          registros: 1    },
  { group: "Objetos Personalizados",   objeto: "Beneficiario",                  registros: 1    },
];

const groupConfig: Record<string, { borderTop: string; bar: string; bg: string; border: string; labelColor: string; totalColor: string }> = {
  "CRM": {
    borderTop: "#066afe",
    bar: "bg-[#066afe]",
    bg: "bg-[#eaf5fe]",
    border: "border-[#066afe]/15",
    labelColor: "text-[#066afe]",
    totalColor: "text-[#022ac0]",
  },
  "Servicio al Cliente": {
    borderTop: "#00b3ff",
    bar: "bg-[#00b3ff]",
    bg: "bg-[#e6f7ff]",
    border: "border-[#00b3ff]/15",
    labelColor: "text-[#0090cc]",
    totalColor: "text-[#0090cc]",
  },
  "Lealtad y Eventos de Vida": {
    borderTop: "#730394",
    bar: "bg-[#730394]",
    bg: "bg-[#f7eafe]",
    border: "border-[#730394]/15",
    labelColor: "text-[#730394]",
    totalColor: "text-[#730394]",
  },
  "Objetos Personalizados": {
    borderTop: "#06a59a",
    bar: "bg-[#06a59a]",
    bg: "bg-[#eafaf9]",
    border: "border-[#06a59a]/15",
    labelColor: "text-[#06a59a]",
    totalColor: "text-[#06a59a]",
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
        <h3 className="text-xl font-semibold text-[#002775]">Registros por Objeto</h3>
        <p className="mt-1.5 text-sm leading-6 text-[#4a6fa5]">
          Distribución de registros de demo a través de objetos estándar y personalizados.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {grouped.map(({ groupName, items, total }) => {
          const cfg = groupConfig[groupName];
          return (
            <div
              key={groupName}
              className={`rounded-2xl border ${cfg.border} ${cfg.bg} p-5`}
              style={{ borderTop: `3px solid ${cfg.borderTop}` }}
            >
              <div className="mb-4 flex items-center justify-between">
                <p className={`text-xs font-bold uppercase tracking-wider ${cfg.labelColor}`}>
                  {groupName}
                </p>
                <span className={`text-sm font-bold tabular-nums ${cfg.totalColor}`}>
                  {total.toLocaleString("es-CO")} total
                </span>
              </div>

              <div className="space-y-2">
                {items.map((row) => {
                  const pct = maxRecords > 0 ? (row.registros / maxRecords) * 100 : 0;
                  return (
                    <div key={row.objeto}>
                      <div className="flex items-center justify-between text-xs mb-0.5">
                        <span className="truncate pr-2 font-medium text-[#002775]">{row.objeto}</span>
                        <span className="shrink-0 tabular-nums font-semibold text-[#022ac0]">
                          {row.registros.toLocaleString("es-CO")}
                        </span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-white/80" style={{ boxShadow: "inset 0 1px 2px rgba(6,106,254,0.06)" }}>
                        <div
                          className={`h-1.5 rounded-full ${cfg.bar} transition-all duration-500`}
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
