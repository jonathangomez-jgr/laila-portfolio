// ARCHIVO GENERADO — no editar a mano.
// Fuente: auditoría read-only de paquetexpress-sandbox (qa2020) del 2026-10-20 sobre
// Paquete_Express_vX v18. Generador: paquetexpress/_work/handover-v18/tools/build_inventory.py
// Los valores secretos se excluyen en el generador (ver sanitización).
import type {
  DependencyNode,
  SecurityRow,
  ScriptVariable,
  ScriptSubagent,
} from "./types";

export const dependencyNodes: DependencyNode[] = [
  {
    "id": "ENV-001",
    "name": "Usuario del agente con sufijo sandbox",
    "apiName": "",
    "type": "Env-specific item",
    "source": "canales",
    "usedBy": [],
    "actions": [],
    "deployClass": "Configuración específica del ambiente",
    "deployMethod": "Específico ambiente",
    "envSpecific": true,
    "envNotes": "",
    "status": "Confirmado",
    "statusNote": "En prod debe ser el username productivo (probable …@00d2e0000013exd.ext)",
    "evidence": "Ver CHN/OMNI/INT/SEC relacionados",
    "risks": [],
    "details": {
      "detalle": "default_agent_user (.agent) y botUser (Bot) = agentforce_paquete_express@00d2e0000013exd.ext.qa2020"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "F0 · Prerrequisitos de plataforma",
    "order": 0,
    "criticality": "Crítica",
    "actionRequired": "Ajustar al ambiente y desplegar/configurar"
  },
  {
    "id": "ENV-002",
    "name": "IDs hardcodeados en FDE_Route_to_ASA",
    "apiName": "",
    "type": "Env-specific item",
    "source": "canales",
    "usedBy": [],
    "actions": [],
    "deployClass": "Configuración específica del ambiente",
    "deployMethod": "Específico ambiente",
    "envSpecific": true,
    "envNotes": "",
    "status": "Confirmado",
    "statusNote": "Prefijo 2E: existían en prod al refresh; validar",
    "evidence": "Ver CHN/OMNI/INT/SEC relacionados",
    "risks": [],
    "details": {
      "detalle": "queueId 00G2E000008f2uRUAQ, serviceChannelId 0N92E000000DcLRSA0"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "F0 · Prerrequisitos de plataforma",
    "order": 0,
    "criticality": "Crítica",
    "actionRequired": "Ajustar al ambiente y desplegar/configurar"
  },
  {
    "id": "ENV-003",
    "name": "IDs hardcodeados en Routes_to_Messaging_Agent",
    "apiName": "",
    "type": "Env-specific item",
    "source": "canales",
    "usedBy": [],
    "actions": [],
    "deployClass": "Configuración específica del ambiente",
    "deployMethod": "Específico ambiente",
    "envSpecific": true,
    "envNotes": "",
    "status": "Confirmado",
    "statusNote": "Sandbox-only; editar en prod",
    "evidence": "Ver CHN/OMNI/INT/SEC relacionados",
    "risks": [],
    "details": {
      "detalle": "copilotId 0Xxdh0000005iq1CAA, queueId 00Gdh000002KTazEAG"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "F0 · Prerrequisitos de plataforma",
    "order": 0,
    "criticality": "Crítica",
    "actionRequired": "Ajustar al ambiente y desplegar/configurar"
  },
  {
    "id": "ENV-004",
    "name": "Sufijos de planner bundle",
    "apiName": "",
    "type": "Env-specific item",
    "source": "canales",
    "usedBy": [],
    "actions": [],
    "deployClass": "Configuración específica del ambiente",
    "deployMethod": "Específico ambiente",
    "envSpecific": true,
    "envNotes": "",
    "status": "Confirmado",
    "statusNote": "Autogenerados al publicar; no desplegar el planner bundle, publicar desde el authoring bundle",
    "evidence": "Ver CHN/OMNI/INT/SEC relacionados",
    "risks": [],
    "details": {
      "detalle": "GenAiPlannerBundle Paquete_Express_vX_v18: plugins *_16jdh000000NJef, funciones *_179dh000000WnX3..WnXC"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "F0 · Prerrequisitos de plataforma",
    "order": 0,
    "criticality": "Alta",
    "actionRequired": "Ajustar al ambiente y desplegar/configurar"
  },
  {
    "id": "ENV-005",
    "name": "Retriever ADL",
    "apiName": "",
    "type": "Env-specific item",
    "source": "canales",
    "usedBy": [],
    "actions": [],
    "deployClass": "Configuración específica del ambiente",
    "deployMethod": "Específico ambiente",
    "envSpecific": true,
    "envNotes": "",
    "status": "Confirmado",
    "statusNote": "Por org",
    "evidence": "Ver CHN/OMNI/INT/SEC relacionados",
    "risks": [],
    "details": {
      "detalle": "File_ADL_LibreriaDeDatos_1Cx_K4B73f7782b (y File_AgentforceLibraryPaqueteExpress_1Cx_K4Bf0c48e50)"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "F0 · Prerrequisitos de plataforma",
    "order": 0,
    "criticality": "Crítica",
    "actionRequired": "Ajustar al ambiente y desplegar/configurar"
  },
  {
    "id": "ENV-006",
    "name": "WhatsApp Meta IDs",
    "apiName": "",
    "type": "Env-specific item",
    "source": "canales",
    "usedBy": [],
    "actions": [],
    "deployClass": "Configuración manual",
    "deployMethod": "Manual",
    "envSpecific": true,
    "envNotes": "",
    "status": "Confirmado",
    "statusNote": "Manual en prod",
    "evidence": "Ver CHN/OMNI/INT/SEC relacionados",
    "risks": [],
    "details": {
      "detalle": "externalAccountId 887937057029245, platformKey 889770550884886, número (número WhatsApp Business)"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "F0 · Prerrequisitos de plataforma",
    "order": 0,
    "criticality": "Alta",
    "actionRequired": "Configurar manualmente"
  },
  {
    "id": "ENV-007",
    "name": "Sitio ESW / dominios",
    "apiName": "",
    "type": "Env-specific item",
    "source": "canales",
    "usedBy": [],
    "actions": [],
    "deployClass": "Configuración específica del ambiente",
    "deployMethod": "Específico ambiente",
    "envSpecific": true,
    "envNotes": "",
    "status": "Confirmado",
    "statusNote": "Por org",
    "evidence": "Ver CHN/OMNI/INT/SEC relacionados",
    "risks": [],
    "details": {
      "detalle": "ESW_fde_Web_messaging_1787853743276, paquetexpress--qa2020.sandbox.my.site.com, CSP 'agente'/'chat_agente'"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "F0 · Prerrequisitos de plataforma",
    "order": 0,
    "criticality": "Alta",
    "actionRequired": "Ajustar al ambiente y desplegar/configurar"
  },
  {
    "id": "ENV-008",
    "name": "Permission set autogenerado del agente",
    "apiName": "",
    "type": "Env-specific item",
    "source": "canales",
    "usedBy": [],
    "actions": [],
    "deployClass": "Configuración específica del ambiente",
    "deployMethod": "Específico ambiente",
    "envSpecific": true,
    "envNotes": "",
    "status": "Confirmado",
    "statusNote": "Se genera con otro Id en prod",
    "evidence": "Ver CHN/OMNI/INT/SEC relacionados",
    "risks": [],
    "details": {
      "detalle": "NextGen_1bYdh00000013NFEAY_Permissions"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "F0 · Prerrequisitos de plataforma",
    "order": 0,
    "criticality": "Alta",
    "actionRequired": "Ajustar al ambiente y desplegar/configurar"
  },
  {
    "id": "ENV-009",
    "name": "Usuarios FDE en Omni",
    "apiName": "",
    "type": "Env-specific item",
    "source": "canales",
    "usedBy": [],
    "actions": [],
    "deployClass": "Configuración específica del ambiente",
    "deployMethod": "Específico ambiente",
    "envSpecific": true,
    "envNotes": "",
    "status": "Confirmado",
    "statusNote": "Excluir del paquete de prod",
    "evidence": "Ver CHN/OMNI/INT/SEC relacionados",
    "risks": [],
    "details": {
      "detalle": "Voice_Escalation.userOverflowAssignee y Voice presence config con usuario Salesforce FDE"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "F0 · Prerrequisitos de plataforma",
    "order": 0,
    "criticality": "Media",
    "actionRequired": "Ajustar al ambiente y desplegar/configurar"
  },
  {
    "id": "ENV-010",
    "name": "Case default owner",
    "apiName": "",
    "type": "Env-specific item",
    "source": "canales",
    "usedBy": [],
    "actions": [],
    "deployClass": "Configuración específica del ambiente",
    "deployMethod": "Específico ambiente",
    "envSpecific": true,
    "envNotes": "",
    "status": "Confirmado",
    "statusNote": "No incluir Case settings en deploy",
    "evidence": "Ver CHN/OMNI/INT/SEC relacionados",
    "risks": [],
    "details": {
      "detalle": "Case.settings defaultCaseOwner = usuario interno"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "F0 · Prerrequisitos de plataforma",
    "order": 0,
    "criticality": "Media",
    "actionRequired": "Ajustar al ambiente y desplegar/configurar"
  },
  {
    "id": "ENV-011",
    "name": "Named Credential webex_cc",
    "apiName": "",
    "type": "Env-specific item",
    "source": "canales",
    "usedBy": [],
    "actions": [],
    "deployClass": "Configuración específica del ambiente",
    "deployMethod": "Específico ambiente",
    "envSpecific": true,
    "envNotes": "",
    "status": "Confirmado",
    "statusNote": "Inverso: apunta a prod",
    "evidence": "Ver CHN/OMNI/INT/SEC relacionados",
    "risks": [],
    "details": {
      "detalle": "Endpoint https://paquetexpress.my.salesforce.com en sandbox"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "F0 · Prerrequisitos de plataforma",
    "order": 0,
    "criticality": "Media",
    "actionRequired": "Ajustar al ambiente y desplegar/configurar"
  },
  {
    "id": "ENV-012",
    "name": "Datos referenciados por nombre",
    "apiName": "",
    "type": "Env-specific item",
    "source": "canales",
    "usedBy": [],
    "actions": [],
    "deployClass": "Datos / registros de configuración",
    "deployMethod": "Datos",
    "envSpecific": true,
    "envNotes": "",
    "status": "Confirmado",
    "statusNote": "Deben existir en prod con nombres exactos",
    "evidence": "Ver CHN/OMNI/INT/SEC relacionados",
    "risks": [],
    "details": {
      "detalle": "Account '7 PUBLICO GENERAL' (001dh00000JGgrjAAD en sandbox), BusinessHours 'Horario Paquete', 6 RecordTypes Case por DeveloperName"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "F0 · Prerrequisitos de plataforma",
    "order": 0,
    "criticality": "Crítica",
    "actionRequired": "Crear o verificar registro"
  },
  {
    "id": "ENV-013",
    "name": "Endpoints productivos en sandbox",
    "apiName": "",
    "type": "Env-specific item",
    "source": "canales",
    "usedBy": [],
    "actions": [],
    "deployClass": "Configuración específica del ambiente",
    "deployMethod": "Específico ambiente",
    "envSpecific": true,
    "envNotes": "",
    "status": "Confirmado",
    "statusNote": "Pruebas QA consumen API productiva",
    "evidence": "Ver CHN/OMNI/INT/SEC relacionados",
    "risks": [],
    "details": {
      "detalle": "Custom Labels URL_* → cc.paquetexpress.com.mx"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "F0 · Prerrequisitos de plataforma",
    "order": 0,
    "criticality": "Alta",
    "actionRequired": "Ajustar al ambiente y desplegar/configurar"
  },
  {
    "id": "ENV-014",
    "name": "Credencial hardcodeada",
    "apiName": "",
    "type": "Env-specific item",
    "source": "canales",
    "usedBy": [],
    "actions": [],
    "deployClass": "Requiere investigación",
    "deployMethod": "Investigar",
    "envSpecific": true,
    "envNotes": "",
    "status": "Confirmado",
    "statusNote": "Rotar; parametrizar por ambiente",
    "evidence": "Ver CHN/OMNI/INT/SEC relacionados",
    "risks": [],
    "details": {
      "detalle": "CotizacionEnvioV2.generateHeader(): token hardcodeado (user/password vacíos)"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "F0 · Prerrequisitos de plataforma",
    "order": 0,
    "criticality": "Crítica",
    "actionRequired": "Investigar antes del go-live"
  },
  {
    "id": "ENV-015",
    "name": "Org Id prod en username",
    "apiName": "",
    "type": "Env-specific item",
    "source": "canales",
    "usedBy": [],
    "actions": [],
    "deployClass": "Configuración específica del ambiente",
    "deployMethod": "Específico ambiente",
    "envSpecific": true,
    "envNotes": "",
    "status": "Confirmado",
    "statusNote": "Informativo",
    "evidence": "Ver CHN/OMNI/INT/SEC relacionados",
    "risks": [],
    "details": {
      "detalle": "'00d2e0000013exd' embebido en username del agente y en descripción de PS Agentforce_Paquete_Express_Permissions"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "F0 · Prerrequisitos de plataforma",
    "order": 0,
    "criticality": "Baja",
    "actionRequired": "Ajustar al ambiente y desplegar/configurar"
  },
  {
    "id": "FEAT-001",
    "name": "Einstein Generative AI",
    "apiName": "EinsteinGpt settings",
    "type": "Settings",
    "source": "canales",
    "usedBy": [],
    "actions": [],
    "deployClass": "Elemento existente a validar",
    "deployMethod": "Validar existente",
    "envSpecific": false,
    "envNotes": "",
    "status": "Confirmado",
    "statusNote": "Habilitado",
    "evidence": "settings/EinsteinGpt.settings-meta.xml",
    "risks": [
      "Templates desplegados no quedan activos automáticamente"
    ],
    "details": {
      "detalle": "enableEinsteinGptPlatform=true, enableEinsteinGptGlobalLangSupport=true, enableEnhancedPromptSecurity=false, proveedores OpenAI/Azure/Bedrock/Vertex no deshabilitados, deploy de templates como activos=false."
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "F0 · Prerrequisitos de plataforma",
    "order": 0,
    "criticality": "Crítica",
    "actionRequired": "Verificar existencia y configuración"
  },
  {
    "id": "FEAT-002",
    "name": "Agentforce / Bots",
    "apiName": "Bot settings + BotDefinition",
    "type": "Settings",
    "source": "canales",
    "usedBy": [],
    "actions": [],
    "deployClass": "Elemento existente a validar",
    "deployMethod": "Validar existente",
    "envSpecific": false,
    "envNotes": "",
    "status": "Confirmado",
    "statusNote": "Habilitado",
    "evidence": "SOQL BotDefinition/BotVersion",
    "risks": [
      "Paquete_Express_vX (0Xxdh…) creado en sandbox: no existe en prod"
    ],
    "details": {
      "detalle": "enableBots=true; 4 Agentforce Service Agents activos (Agentforce_Paquete_Express v11, Paquetexpress_Service_Agent_Split v50, FDE_..._voice v14, Paquete_Express_vX v18) + 5 Einstein Bots clásicos activos."
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "F0 · Prerrequisitos de plataforma",
    "order": 0,
    "criticality": "Crítica",
    "actionRequired": "Verificar existencia y configuración"
  },
  {
    "id": "FEAT-003",
    "name": "Data Cloud",
    "apiName": "DataSpace default (0vhVn000000003FIAQ)",
    "type": "Data Cloud",
    "source": "canales",
    "usedBy": [],
    "actions": [],
    "deployClass": "Elemento existente a validar",
    "deployMethod": "Validar existente",
    "envSpecific": true,
    "envNotes": "",
    "status": "Confirmado",
    "statusNote": "Provisionado",
    "evidence": "SOQL DataSpace + PermissionSetLicense",
    "risks": [
      "Requerido para ADL/retriever de FAQ_Search"
    ],
    "details": {
      "detalle": "1 data space 'default'. PSL Data Cloud 200000 (187 usadas)."
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "F0 · Prerrequisitos de plataforma",
    "order": 0,
    "criticality": "Crítica",
    "actionRequired": "Verificar existencia y configuración"
  },
  {
    "id": "FEAT-004",
    "name": "Knowledge",
    "apiName": "Knowledge settings",
    "type": "Settings",
    "source": "canales",
    "usedBy": [],
    "actions": [],
    "deployClass": "Elemento existente a validar",
    "deployMethod": "Validar existente",
    "envSpecific": false,
    "envNotes": "",
    "status": "Confirmado",
    "statusNote": "Habilitado (no usado por v18)",
    "evidence": "settings/Knowledge.settings-meta.xml + botVersion",
    "risks": [],
    "details": {
      "detalle": "enableKnowledge=true, defaultLanguage es_MX; en v18 knowledgeActionEnabled=false, knowledgeFallbackEnabled=false, citations off, rag_feature_config_id vacío."
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "F0 · Prerrequisitos de plataforma",
    "order": 0,
    "criticality": "Baja",
    "actionRequired": "Verificar existencia y configuración"
  },
  {
    "id": "FEAT-005",
    "name": "Einstein Trust Layer masking",
    "apiName": "AITrustAttrSetup",
    "type": "Configuración",
    "source": "canales",
    "usedBy": [],
    "actions": [],
    "deployClass": "Configuración manual",
    "deployMethod": "Manual",
    "envSpecific": true,
    "envNotes": "",
    "status": "Confirmado",
    "statusNote": "Configurado",
    "evidence": "SOQL AITrustAttrSetup",
    "risks": [
      "Replicar manualmente en prod"
    ],
    "details": {
      "detalle": "22 atributos; habilitados PERSON, EMAIL_ADDRESS, PHONE_NUMBER, CREDIT_CARD, US_SSN."
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "F0 · Prerrequisitos de plataforma",
    "order": 0,
    "criticality": "Alta",
    "actionRequired": "Configurar manualmente"
  },
  {
    "id": "FEAT-006",
    "name": "Licencias",
    "apiName": "UserLicense / PermissionSetLicense",
    "type": "Licencias",
    "source": "canales",
    "usedBy": [],
    "actions": [],
    "deployClass": "Elemento existente a validar",
    "deployMethod": "Validar existente",
    "envSpecific": true,
    "envNotes": "",
    "status": "Pendiente",
    "statusNote": "Pendiente validar en prod",
    "evidence": "SOQL UserLicense / PermissionSetLicense (sandbox)",
    "risks": [
      "Licencias de asesores humanos para Messaging/Digital Engagement no confirmadas",
      "Flex credits/consumo no inspeccionado"
    ],
    "details": {
      "detalle": "Einstein Agent 601 (2 usadas); Agentforce Service Agent User PSL 200 (2); Builder 10000 (7); Prompt Templates; Service User PSL 161 (5); Messaging User PSL 1/1; Enhanced Chat User 22 (1); Salesforce 465 (463 usadas); Inbound Lead Gen Agent 1/1."
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "F0 · Prerrequisitos de plataforma",
    "order": 0,
    "criticality": "Crítica",
    "actionRequired": "Verificar existencia y configuración"
  },
  {
    "id": "FEAT-007",
    "name": "OWD sharing",
    "apiName": "Case, Contact, Account, MessagingSession, MessagingEndUser, Sucursal__c",
    "type": "Sharing model",
    "source": "canales",
    "usedBy": [],
    "actions": [],
    "deployClass": "Elemento existente a validar",
    "deployMethod": "Validar existente",
    "envSpecific": false,
    "envNotes": "",
    "status": "Confirmado",
    "statusNote": "OK",
    "evidence": "Tooling EntityDefinition + SharingRules",
    "risks": [
      "Ver SEC-023"
    ],
    "details": {
      "detalle": "Case/Contact/Account Private (interno y externo); MessagingSession/MessagingEndUser/Sucursal__c ReadWrite. 11 sharing rules (ninguna al rol del agente)."
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "F0 · Prerrequisitos de plataforma",
    "order": 0,
    "criticality": "Alta",
    "actionRequired": "Verificar existencia y configuración"
  },
  {
    "id": "FEAT-008",
    "name": "Organización",
    "apiName": "Coordinados de Carga Paquetexpress S de RL de CV",
    "type": "Organization",
    "source": "canales",
    "usedBy": [],
    "actions": [],
    "deployClass": "Configuración específica del ambiente",
    "deployMethod": "Específico ambiente",
    "envSpecific": true,
    "envNotes": "",
    "status": "Confirmado",
    "statusNote": "OK",
    "evidence": "SOQL Organization",
    "risks": [],
    "details": {
      "detalle": "Enterprise Edition, sandbox qa2020, instancia USA932S, locale es_MX, TZ America/Mazatlan."
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "F0 · Prerrequisitos de plataforma",
    "order": 0,
    "criticality": "Baja",
    "actionRequired": "Ajustar al ambiente y desplegar/configurar"
  },
  {
    "id": "OMNI-012",
    "name": "Omni-Channel settings",
    "apiName": "OmniChannel / LiveMessage settings",
    "type": "Settings",
    "source": "canales",
    "usedBy": [
      "AGT-002"
    ],
    "actions": [],
    "deployClass": "Elemento existente a validar",
    "deployMethod": "Validar existente",
    "envSpecific": false,
    "envNotes": "",
    "status": "Confirmado",
    "statusNote": "OK",
    "evidence": "settings/OmniChannel.settings-meta.xml",
    "risks": [],
    "details": {
      "detalle": "enableOmniChannel=true, enableOmniSkillsRouting=true, enableOmniSecondaryRoutingPriority=false, enableOmniStatusCapModel=false; LiveMessage enabled."
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "F0 · Prerrequisitos de plataforma",
    "order": 0,
    "criticality": "Media",
    "actionRequired": "Verificar existencia y configuración"
  },
  {
    "id": "BH-001",
    "name": "Horario Paquete",
    "apiName": "Horario Paquete",
    "type": "BusinessHours",
    "source": "dependencias",
    "usedBy": [
      "APX-001"
    ],
    "actions": [],
    "deployClass": "Elemento existente a validar",
    "deployMethod": "Configuración manual (no metadata) — debe existir con el mismo Name en destino",
    "envSpecific": true,
    "envNotes": "Se busca por Name",
    "status": "Confirmado",
    "evidence": "sf data query \"SELECT Id, Name, IsActive FROM BusinessHours\"",
    "risks": [
      "Si en prod el nombre difiere o hay 0/2 registros con ese nombre → siempre 'fuera de horario' (no escala)",
      "Holidays no inspeccionados"
    ],
    "details": {
      "id": "01m2E0000005HqkQAE",
      "active": "True",
      "default": "True",
      "timezone": "America/Mexico_City",
      "canales/seguridad (OMNI-010)": "Activo, IsDefault=true, TZ America/Mexico_City. CheckBusinessHours lo busca por Name hardcodeado e ignora el input businessHourName. También existe 'Default' (America/Mazatlan)."
    },
    "aliases": [
      "OMNI-010"
    ],
    "dependsOn": [],
    "phase": "F1 · Datos y configuración base",
    "order": 1,
    "criticality": "Alta",
    "actionRequired": "Verificar existencia y configuración"
  },
  {
    "id": "DATA-001",
    "name": "Account '7 PUBLICO GENERAL'",
    "apiName": "7 PUBLICO GENERAL",
    "type": "Registro de datos (Account)",
    "source": "dependencias",
    "usedBy": [
      "FLW-001"
    ],
    "actions": [],
    "deployClass": "Datos / registros de configuración",
    "deployMethod": "Data: debe existir en prod con el Name exacto",
    "envSpecific": true,
    "envNotes": "Registro creado en el sandbox (Id 001dh…, 2025-11-24): no existe en producción con ese Id. Crear la cuenta con el Name exacto antes de activar el agente.",
    "status": "Pendiente",
    "evidence": "sf data query \"SELECT Id, Name FROM Account WHERE Name='7 PUBLICO GENERAL'\"",
    "risks": [
      "Dependencia de dato por nombre; existencia en prod no verificada."
    ],
    "details": {
      "id_sandbox": "001dh00000JGgrjAAD",
      "recordType": "Persona_fisica",
      "created": "2025-11-24"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "F1 · Datos y configuración base",
    "order": 1,
    "criticality": "Crítica",
    "actionRequired": "Crear o verificar registro"
  },
  {
    "id": "OMNI-005",
    "name": "Cola Agentes AI",
    "apiName": "Agentes_AI (00Gdh000002KTazEAG)",
    "type": "Queue",
    "source": "canales",
    "usedBy": [
      "AGT-002"
    ],
    "actions": [],
    "deployClass": "Metadata desplegable",
    "deployMethod": "Metadata",
    "envSpecific": true,
    "envNotes": "",
    "status": "Confirmado",
    "statusNote": "Existe solo en sandbox (dh)",
    "evidence": "SOQL Group",
    "risks": [
      "Crear en prod + miembros (Datos/Manual) + actualizar IDs en flows"
    ],
    "details": {
      "detalle": "QueueSobject LiveAgentSession, Case, MessagingSession; 5 miembros; routing config Pruebapaquete. Session handler queue del WhatsApp activo."
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "F1 · Datos y configuración base",
    "order": 1,
    "criticality": "Alta",
    "actionRequired": "Desplegar"
  },
  {
    "id": "OMNI-006",
    "name": "Cola Agentes IA WEB",
    "apiName": "Agentes_IA_WEB (00Gdh000003w4BCEAY)",
    "type": "Queue",
    "source": "canales",
    "usedBy": [
      "AGT-002"
    ],
    "actions": [],
    "deployClass": "Metadata desplegable",
    "deployMethod": "Metadata",
    "envSpecific": true,
    "envNotes": "",
    "status": "Confirmado",
    "statusNote": "Existe solo en sandbox (dh)",
    "evidence": "SOQL Group",
    "risks": [
      "Crear en prod + miembros"
    ],
    "details": {
      "detalle": "QueueSobject MessagingSession, Case; 8 miembros; fallback de fde_Web_messaging."
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "F1 · Datos y configuración base",
    "order": 1,
    "criticality": "Alta",
    "actionRequired": "Desplegar"
  },
  {
    "id": "OMNI-009",
    "name": "Presence configs/status",
    "apiName": "General (19 usuarios), Voice (1), ChatEnLinea, Facebook, default; statuses Available_Messaging, Available_Live_Message, WhatsApp_Facebook, Todos, etc.",
    "type": "PresenceUserConfig / ServicePresenceStatus",
    "source": "canales",
    "usedBy": [
      "AGT-002"
    ],
    "actions": [],
    "deployClass": "Datos / registros de configuración",
    "deployMethod": "Datos",
    "envSpecific": true,
    "envNotes": "",
    "status": "Confirmado",
    "statusNote": "Existe",
    "evidence": "retrieve presenceUserConfigs/servicePresenceStatuses",
    "risks": [
      "Asignación de usuarios/perfiles a presencia y status es por ambiente",
      "Voice presence asignada a usuario FDE"
    ],
    "details": {
      "detalle": "Statuses con canal sfdc_livemessage existen; asignaciones por usuario (no por perfil)."
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "F1 · Datos y configuración base",
    "order": 1,
    "criticality": "Media",
    "actionRequired": "Crear o verificar registro"
  },
  {
    "id": "OMNI-011",
    "name": "Omni Supervisor",
    "apiName": "Supervisor_Paquete",
    "type": "OmniSupervisorConfig",
    "source": "canales",
    "usedBy": [
      "AGT-002"
    ],
    "actions": [],
    "deployClass": "Elemento existente a validar",
    "deployMethod": "Validar existente",
    "envSpecific": true,
    "envNotes": "",
    "status": "Confirmado",
    "statusNote": "Existe",
    "evidence": "retrieve omniSupervisorConfigs",
    "risks": [],
    "details": {
      "detalle": "3 usuarios asignados."
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "F1 · Datos y configuración base",
    "order": 1,
    "criticality": "Baja",
    "actionRequired": "Verificar existencia y configuración"
  },
  {
    "id": "QRC-001",
    "name": "Pruebapaquete",
    "apiName": "Pruebapaquete",
    "type": "QueueRoutingConfig",
    "source": "dependencias",
    "usedBy": [
      "QUE-001"
    ],
    "actions": [],
    "deployClass": "Elemento existente a validar",
    "deployMethod": "Metadata API",
    "envSpecific": false,
    "envNotes": "",
    "status": "Confirmado",
    "evidence": "sf data query QueueRoutingConfig",
    "risks": [
      "Voice_Escalation contiene username de sandbox (no aplica a v18 pero rompe deploy si se incluye)"
    ],
    "details": {
      "id": "0K92E000000Ch5SSAS",
      "routingModel": "MostAvailable",
      "capacityWeight": "1",
      "canales/seguridad (OMNI-008)": "Pruebapaquete: MOST_AVAILABLE, prioridad 1, capacityWeight 1, no attribute-based; compartida por las 3 colas. Voice_Escalation tiene userOverflowAssignee = usuario FDE de sandbox."
    },
    "aliases": [
      "OMNI-008"
    ],
    "dependsOn": [],
    "phase": "F1 · Datos y configuración base",
    "order": 1,
    "criticality": "Alta",
    "actionRequired": "Verificar existencia y configuración"
  },
  {
    "id": "QUE-001",
    "name": "WhatsApp (PaquetePrueba)",
    "apiName": "PaquetePrueba",
    "type": "Queue (Group)",
    "source": "dependencias",
    "usedBy": [
      "FLW-016"
    ],
    "actions": [],
    "deployClass": "Elemento existente a validar",
    "deployMethod": "Metadata API (Queue) — pero el flow usa el Id",
    "envSpecific": true,
    "envNotes": "Id hardcodeado en FLW-016",
    "status": "Confirmado",
    "evidence": "sf data query Group/QueueSobject/GroupMember",
    "risks": [
      "Nombre 'Prueba' en cola productiva.",
      "Nombre DeveloperName 'PaquetePrueba' sugiere cola de prueba; confirmar que es la cola productiva de asesores"
    ],
    "details": {
      "id": "00G2E000008f2uRUAQ",
      "sobject": "MessagingSession",
      "members": "50",
      "routingConfig": "QRC-001",
      "canales/seguridad (OMNI-004)": "QueueSobject MessagingSession; 50 miembros; QueueRoutingConfig Pruebapaquete."
    },
    "aliases": [
      "OMNI-004"
    ],
    "dependsOn": [
      "QRC-001"
    ],
    "phase": "F1 · Datos y configuración base",
    "order": 1,
    "criticality": "Crítica",
    "actionRequired": "Verificar existencia y configuración"
  },
  {
    "id": "SCH-001",
    "name": "Mensajería",
    "apiName": "sfdc_livemessage",
    "type": "ServiceChannel",
    "source": "dependencias",
    "usedBy": [
      "FLW-016"
    ],
    "actions": [],
    "deployClass": "Elemento existente a validar",
    "deployMethod": "Estándar",
    "envSpecific": true,
    "envNotes": "Id hardcodeado en FLW-016",
    "status": "Confirmado",
    "evidence": "sf data query ServiceChannel",
    "risks": [
      "ID hardcodeado en 5 routing flows"
    ],
    "details": {
      "id": "0N92E000000DcLRSA0",
      "relatedEntity": "MessagingSession",
      "canales/seguridad (OMNI-007)": "relatedEntityType MessagingSession, sin auto-accept, sin ACW timer. También existen sfdc_liveagent y sfdc_phone."
    },
    "aliases": [
      "OMNI-007"
    ],
    "dependsOn": [],
    "phase": "F1 · Datos y configuración base",
    "order": 1,
    "criticality": "Crítica",
    "actionRequired": "Verificar existencia y configuración"
  },
  {
    "id": "FLD-001",
    "name": "Medio_de_contacto__c",
    "apiName": "Case.Medio_de_contacto__c",
    "type": "CustomField",
    "source": "dependencias",
    "usedBy": [
      "FLW-002",
      "FLW-003",
      "FLW-004",
      "FLW-005",
      "FLW-006",
      "FLW-007",
      "FLW-008"
    ],
    "actions": [],
    "deployClass": "Metadata desplegable",
    "deployMethod": "Metadata API (CustomField)",
    "envSpecific": false,
    "envNotes": "",
    "status": "Confirmado",
    "evidence": "sf sobject describe -s Case; Tooling MetadataComponentDependency",
    "risks": [],
    "details": {
      "type": "picklist",
      "restrictedPicklist": "False",
      "createable": "True",
      "value_written": "valor = canal (EmbeddedMessaging -> \"Chat en línea\")",
      "picklist_values": "Chat en línea, Cliente en piso, Email, Evaluación caritas PDA, Facebook, Notificación EAD/RAD, Otros, Riesgos, Teléfono, Twitter, Webmaster, WhatsApp, Sección Amarilla, EmbeddedMessaging",
      "id": "00N2E00000HeGySUAV"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "F2 · Modelo de datos",
    "order": 2,
    "criticality": "Alta",
    "actionRequired": "Desplegar"
  },
  {
    "id": "FLD-002",
    "name": "Crear_ticket_duplicado__c",
    "apiName": "Case.Crear_ticket_duplicado__c",
    "type": "CustomField",
    "source": "dependencias",
    "usedBy": [
      "FLW-002",
      "FLW-003",
      "FLW-004",
      "FLW-005",
      "FLW-006",
      "FLW-007",
      "FLW-008"
    ],
    "actions": [],
    "deployClass": "Metadata desplegable",
    "deployMethod": "Metadata API (CustomField)",
    "envSpecific": false,
    "envNotes": "",
    "status": "Confirmado",
    "evidence": "sf sobject describe -s Case; Tooling MetadataComponentDependency",
    "risks": [],
    "details": {
      "type": "boolean",
      "restrictedPicklist": "False",
      "createable": "True",
      "value_written": "true (bypass validaTicketDuplicado)",
      "picklist_values": "None",
      "id": "00N2E00000IbeOEUAZ"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "F2 · Modelo de datos",
    "order": 2,
    "criticality": "Alta",
    "actionRequired": "Desplegar"
  },
  {
    "id": "FLD-003",
    "name": "Descripcion_del_Contenido__c",
    "apiName": "Case.Descripcion_del_Contenido__c",
    "type": "CustomField",
    "source": "dependencias",
    "usedBy": [
      "FLW-003"
    ],
    "actions": [],
    "deployClass": "Metadata desplegable",
    "deployMethod": "Metadata API (CustomField)",
    "envSpecific": false,
    "envNotes": "",
    "status": "Confirmado",
    "evidence": "sf sobject describe -s Case; Tooling MetadataComponentDependency",
    "risks": [],
    "details": {
      "type": "textarea",
      "restrictedPicklist": "False",
      "createable": "True",
      "value_written": "'cotizar por un agente'",
      "picklist_values": "None",
      "id": "00N2E00000Hdw6nUAB"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "F2 · Modelo de datos",
    "order": 2,
    "criticality": "Alta",
    "actionRequired": "Desplegar"
  },
  {
    "id": "FLD-004",
    "name": "Tarifa__c",
    "apiName": "Case.Tarifa__c",
    "type": "CustomField",
    "source": "dependencias",
    "usedBy": [
      "FLW-003"
    ],
    "actions": [],
    "deployClass": "Metadata desplegable",
    "deployMethod": "Metadata API (CustomField)",
    "envSpecific": false,
    "envNotes": "",
    "status": "Confirmado",
    "evidence": "sf sobject describe -s Case; Tooling MetadataComponentDependency",
    "risks": [],
    "details": {
      "type": "picklist",
      "restrictedPicklist": "False",
      "createable": "True",
      "value_written": "'T0'",
      "picklist_values": "TS, T0, T1, T2, T3, T4, T5, T6, T7",
      "id": "00N2E00000HeCtDUAV"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "F2 · Modelo de datos",
    "order": 2,
    "criticality": "Alta",
    "actionRequired": "Desplegar"
  },
  {
    "id": "FLD-005",
    "name": "Motivo_de_no_env_o__c",
    "apiName": "Case.Motivo_de_no_env_o__c",
    "type": "CustomField",
    "source": "dependencias",
    "usedBy": [
      "FLW-003",
      "FLW-004"
    ],
    "actions": [],
    "deployClass": "Metadata desplegable",
    "deployMethod": "Metadata API (CustomField)",
    "envSpecific": false,
    "envNotes": "",
    "status": "Confirmado",
    "evidence": "sf sobject describe -s Case; Tooling MetadataComponentDependency",
    "risks": [],
    "details": {
      "type": "picklist",
      "restrictedPicklist": "True",
      "createable": "True",
      "value_written": "'Cliente solo se encuentra cotizando' (restringido, existe)",
      "picklist_values": "Aseguramiento de mercancías especiales, documentos y/o perecederos, Atención | Servicio 800, Atención | Servicio de sucursal, Cliente destino decide, Cliente solo se encuentra cotizando, Condiciones inadecuadas de embalaje, Corte de documentación para envío el mismo día, Costo elevado, Disponibilidad de estacionamiento, EAD | RAD en zona federal, Horarios de programación para RAD, Horarios específicos de entrega, Manejo | Cuidado de la mercancía, Mensajería FXC, Mercancía excede medidas volumétricas y/o peso, Mercancía no transportable, Mercancía perecedera FXC, No especificó, No requirió hacer el envío, Procesos internos burocráticos, Promesa comercial sabatina, Proveedor decide, Restricciones a Zona Plus, Restricciones de EAD | RAD, Seguridad |Extravío de mercancía, Servicio de embalaje, Servicio express en sábado, Sin cobertura, Tiempos de entrega, Ubicación de sucursal destino, Ubica",
      "id": "00N2E00000HeM3mUAF"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "F2 · Modelo de datos",
    "order": 2,
    "criticality": "Alta",
    "actionRequired": "Desplegar"
  },
  {
    "id": "FLD-006",
    "name": "Pais_destino__c",
    "apiName": "Case.Pais_destino__c",
    "type": "CustomField",
    "source": "dependencias",
    "usedBy": [
      "FLW-003"
    ],
    "actions": [],
    "deployClass": "Metadata desplegable",
    "deployMethod": "Metadata API (CustomField)",
    "envSpecific": false,
    "envNotes": "",
    "status": "Confirmado",
    "evidence": "sf sobject describe -s Case; Tooling MetadataComponentDependency",
    "risks": [],
    "details": {
      "type": "string",
      "restrictedPicklist": "False",
      "createable": "True",
      "value_written": "'N/A'",
      "picklist_values": "None",
      "id": "00N2E00000HeM3nUAF"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "F2 · Modelo de datos",
    "order": 2,
    "criticality": "Alta",
    "actionRequired": "Desplegar"
  },
  {
    "id": "FLD-007",
    "name": "Se_realizo_el_envio__c",
    "apiName": "Case.Se_realizo_el_envio__c",
    "type": "CustomField",
    "source": "dependencias",
    "usedBy": [
      "FLW-003",
      "FLW-004"
    ],
    "actions": [],
    "deployClass": "Metadata desplegable",
    "deployMethod": "Metadata API (CustomField)",
    "envSpecific": false,
    "envNotes": "",
    "status": "Confirmado",
    "evidence": "sf sobject describe -s Case; Tooling MetadataComponentDependency",
    "risks": [],
    "details": {
      "type": "picklist",
      "restrictedPicklist": "True",
      "createable": "True",
      "value_written": "'Activa' (restringido, existe)",
      "picklist_values": "SI, NO, No se contactó al cliente, No se concretó solicitud por falta de datos, Cliente realizará envío después, Activa",
      "id": "00N2E00000HeM3qUAF"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "F2 · Modelo de datos",
    "order": 2,
    "criticality": "Alta",
    "actionRequired": "Desplegar"
  },
  {
    "id": "FLD-008",
    "name": "Numero_de_Rastreo__c",
    "apiName": "Case.Numero_de_Rastreo__c",
    "type": "CustomField",
    "source": "dependencias",
    "usedBy": [
      "FLW-005",
      "FLW-006"
    ],
    "actions": [],
    "deployClass": "Metadata desplegable",
    "deployMethod": "Metadata API (CustomField)",
    "envSpecific": false,
    "envNotes": "",
    "status": "Confirmado",
    "evidence": "sf sobject describe -s Case; Tooling MetadataComponentDependency",
    "risks": [],
    "details": {
      "type": "string",
      "restrictedPicklist": "False",
      "createable": "True",
      "value_written": "guía (input)",
      "picklist_values": "None",
      "id": "00N2E00000Hdw77UAB"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "F2 · Modelo de datos",
    "order": 2,
    "criticality": "Alta",
    "actionRequired": "Desplegar"
  },
  {
    "id": "FLD-009",
    "name": "Descuento__c",
    "apiName": "Case.Descuento__c",
    "type": "CustomField",
    "source": "dependencias",
    "usedBy": [
      "FLW-004"
    ],
    "actions": [],
    "deployClass": "Metadata desplegable",
    "deployMethod": "Metadata API (CustomField)",
    "envSpecific": false,
    "envNotes": "",
    "status": "Confirmado",
    "evidence": "sf sobject describe -s Case; Tooling MetadataComponentDependency",
    "risks": [],
    "details": {
      "type": "picklist",
      "restrictedPicklist": "True",
      "createable": "True",
      "value_written": "'0%'",
      "picklist_values": "0%, 15%, 20%, 25%",
      "id": "00N2E00000Hdw6oUAB"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "F2 · Modelo de datos",
    "order": 2,
    "criticality": "Alta",
    "actionRequired": "Desplegar"
  },
  {
    "id": "FLD-010",
    "name": "Se_ofreci_descuento__c",
    "apiName": "Case.Se_ofreci_descuento__c",
    "type": "CustomField",
    "source": "dependencias",
    "usedBy": [
      "FLW-004"
    ],
    "actions": [],
    "deployClass": "Metadata desplegable",
    "deployMethod": "Metadata API (CustomField)",
    "envSpecific": false,
    "envNotes": "",
    "status": "Confirmado",
    "evidence": "sf sobject describe -s Case; Tooling MetadataComponentDependency",
    "risks": [],
    "details": {
      "type": "picklist",
      "restrictedPicklist": "True",
      "createable": "True",
      "value_written": "'NO'",
      "picklist_values": "SI, NO",
      "id": "00N2E00000Hdw7FUAR"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "F2 · Modelo de datos",
    "order": 2,
    "criticality": "Alta",
    "actionRequired": "Desplegar"
  },
  {
    "id": "FLD-011",
    "name": "Desea_cotizacion_por_correo__c",
    "apiName": "Case.Desea_cotizacion_por_correo__c",
    "type": "CustomField",
    "source": "dependencias",
    "usedBy": [
      "FLW-004"
    ],
    "actions": [],
    "deployClass": "Metadata desplegable",
    "deployMethod": "Metadata API (CustomField)",
    "envSpecific": false,
    "envNotes": "",
    "status": "Confirmado",
    "evidence": "sf sobject describe -s Case; Tooling MetadataComponentDependency",
    "risks": [],
    "details": {
      "type": "picklist",
      "restrictedPicklist": "True",
      "createable": "True",
      "value_written": "'No'",
      "picklist_values": "No, Si",
      "id": "00N2E00000HeJ36UAF"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "F2 · Modelo de datos",
    "order": 2,
    "criticality": "Alta",
    "actionRequired": "Desplegar"
  },
  {
    "id": "FLD-012",
    "name": "Como_nos_conoci_el_cliente__c",
    "apiName": "Case.Como_nos_conoci_el_cliente__c",
    "type": "CustomField",
    "source": "dependencias",
    "usedBy": [
      "FLW-004"
    ],
    "actions": [],
    "deployClass": "Metadata desplegable",
    "deployMethod": "Metadata API (CustomField)",
    "envSpecific": false,
    "envNotes": "",
    "status": "Confirmado",
    "evidence": "sf sobject describe -s Case; Tooling MetadataComponentDependency",
    "risks": [],
    "details": {
      "type": "picklist",
      "restrictedPicklist": "True",
      "createable": "True",
      "value_written": "medioDeContacto (RESTRINGIDO: riesgo)",
      "picklist_values": "Cliente con convenio, Cliente frecuente, Eventos deportivos, Expo Moda, Facebook, No especificó, Página WEB, Periódicos locales, Publicidad en móviles, Radio, Recomendaciones de Cliente, Revistas, Sección Amarilla, TV, Ubicación de la sucursal, WhatsApp, PXGL, Chat en línea",
      "id": "00N2E00000HeM3hUAF"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "F2 · Modelo de datos",
    "order": 2,
    "criticality": "Alta",
    "actionRequired": "Desplegar"
  },
  {
    "id": "FLD-013",
    "name": "Motivo_de_NO_activaci_n__c",
    "apiName": "Case.Motivo_de_NO_activaci_n__c",
    "type": "CustomField",
    "source": "dependencias",
    "usedBy": [
      "FLW-004"
    ],
    "actions": [],
    "deployClass": "Metadata desplegable",
    "deployMethod": "Metadata API (CustomField)",
    "envSpecific": false,
    "envNotes": "",
    "status": "Confirmado",
    "evidence": "sf sobject describe -s Case; Tooling MetadataComponentDependency",
    "risks": [],
    "details": {
      "type": "picklist",
      "restrictedPicklist": "True",
      "createable": "True",
      "value_written": "'Otros'",
      "picklist_values": "No aplica. Cotización menor a $500.00, Cliente cuenta con convenio / crédito, Cliente no desea el descuento, Cliente solo se encuentra cotizando, Cliente maneja RPP, Otros",
      "id": "00N2E00000HeM3lUAF"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "F2 · Modelo de datos",
    "order": 2,
    "criticality": "Alta",
    "actionRequired": "Desplegar"
  },
  {
    "id": "FLD-014",
    "name": "Se_activ_descuento__c",
    "apiName": "Case.Se_activ_descuento__c",
    "type": "CustomField",
    "source": "dependencias",
    "usedBy": [
      "FLW-004"
    ],
    "actions": [],
    "deployClass": "Metadata desplegable",
    "deployMethod": "Metadata API (CustomField)",
    "envSpecific": false,
    "envNotes": "",
    "status": "Confirmado",
    "evidence": "sf sobject describe -s Case; Tooling MetadataComponentDependency",
    "risks": [],
    "details": {
      "type": "picklist",
      "restrictedPicklist": "True",
      "createable": "True",
      "value_written": "'NO'",
      "picklist_values": "SI, NO",
      "id": "00N2E00000HeM3pUAF"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "F2 · Modelo de datos",
    "order": 2,
    "criticality": "Alta",
    "actionRequired": "Desplegar"
  },
  {
    "id": "FLD-015",
    "name": "Tipo_de_Cotizacion__c",
    "apiName": "Case.Tipo_de_Cotizacion__c",
    "type": "CustomField",
    "source": "dependencias",
    "usedBy": [
      "FLW-004"
    ],
    "actions": [],
    "deployClass": "Metadata desplegable",
    "deployMethod": "Metadata API (CustomField)",
    "envSpecific": false,
    "envNotes": "",
    "status": "Confirmado",
    "evidence": "sf sobject describe -s Case; Tooling MetadataComponentDependency",
    "risks": [],
    "details": {
      "type": "picklist",
      "restrictedPicklist": "True",
      "createable": "True",
      "value_written": "'Nacional'",
      "picklist_values": "Nacional, FTL, Zona plus, PXGL",
      "id": "00N2E00000HeM3vUAF"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "F2 · Modelo de datos",
    "order": 2,
    "criticality": "Alta",
    "actionRequired": "Desplegar"
  },
  {
    "id": "FLD-016",
    "name": "Cliente_solicito_crear_caso__c",
    "apiName": "Case.Cliente_solicito_crear_caso__c",
    "type": "CustomField",
    "source": "dependencias",
    "usedBy": [
      "FLW-005",
      "FLW-006"
    ],
    "actions": [],
    "deployClass": "Metadata desplegable",
    "deployMethod": "Metadata API (CustomField)",
    "envSpecific": false,
    "envNotes": "",
    "status": "Confirmado",
    "evidence": "sf sobject describe -s Case; Tooling MetadataComponentDependency",
    "risks": [],
    "details": {
      "type": "picklist",
      "restrictedPicklist": "True",
      "createable": "True",
      "value_written": "FLW-006 'Si'; FLW-005 input LLM (RESTRINGIDO Si/No: riesgo)",
      "picklist_values": "Si, No",
      "id": "00Ndh00000BUf93EAD"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "F2 · Modelo de datos",
    "order": 2,
    "criticality": "Alta",
    "actionRequired": "Desplegar"
  },
  {
    "id": "FLD-017",
    "name": "Guia__c",
    "apiName": "Case.Guia__c",
    "type": "CustomField",
    "source": "dependencias",
    "usedBy": [
      "FLW-006"
    ],
    "actions": [],
    "deployClass": "Metadata desplegable",
    "deployMethod": "Metadata API (CustomField)",
    "envSpecific": false,
    "envNotes": "",
    "status": "Confirmado",
    "evidence": "sf sobject describe -s Case; Tooling MetadataComponentDependency",
    "risks": [],
    "details": {
      "type": "string",
      "restrictedPicklist": "False",
      "createable": "True",
      "value_written": "input Guia",
      "picklist_values": "None",
      "id": "00N2E00000Hdw6wUAB"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "F2 · Modelo de datos",
    "order": 2,
    "criticality": "Alta",
    "actionRequired": "Desplegar"
  },
  {
    "id": "FLD-018",
    "name": "Origin",
    "apiName": "Case.Origin",
    "type": "StandardField (picklist)",
    "source": "dependencias",
    "usedBy": [
      "OBJ-001"
    ],
    "actions": [],
    "deployClass": "Elemento existente a validar",
    "deployMethod": "N/A (StandardValueSet CaseOrigin/CaseStatus)",
    "envSpecific": false,
    "envNotes": "",
    "status": "Confirmado",
    "evidence": "sf sobject describe -s Case",
    "risks": [],
    "details": {
      "restrictedPicklist": "False",
      "value_written": "medioDeContacto (no restringido; 'WhatsApp' se normaliza a 'Whatsapp'; 'Chat' y 'EmbeddedMessaging' quedan como valores fuera de lista)",
      "picklist_values": "Teléfono, Chat en línea, Email, Webmaster, Facebook, Notificación EAD/RAD, Evaluación caritas PDA, Riesgos, Whatsapp, Twitter, Otros, Contact Center, Instagram1, YouTube, Google Play, LinkedIn, Play Store, App Store, Web, Facebook Messenger, Sección Amarilla, Voz del Cliente, Instagram, PXGL, Visita Calidad, Encuestas IH, Encuestas SC, Boletín, PXConnect"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "F2 · Modelo de datos",
    "order": 2,
    "criticality": "Alta",
    "actionRequired": "Verificar existencia y configuración"
  },
  {
    "id": "FLD-019",
    "name": "Status",
    "apiName": "Case.Status",
    "type": "StandardField (picklist)",
    "source": "dependencias",
    "usedBy": [
      "OBJ-001"
    ],
    "actions": [],
    "deployClass": "Elemento existente a validar",
    "deployMethod": "N/A (StandardValueSet CaseOrigin/CaseStatus)",
    "envSpecific": false,
    "envNotes": "",
    "status": "Confirmado",
    "evidence": "sf sobject describe -s Case",
    "risks": [],
    "details": {
      "restrictedPicklist": "False",
      "value_written": "'Cerrado' (FLW-002/003/004/006/007), 'Abierto' en FLW-005 (NO existe en picklist), sin valor en FLW-008",
      "picklist_values": "On Hold, Escalated, Nuevo, Asignado, Pendiente de información, Cerrado, En revisión, Incompleto, Revisión, Documentación faltante sucursal, Documentación faltante cliente, Investigación CMS, Indemnización especial, No procede, Pendiente de consentimiento, En proceso de pago, Pagada, En proceso de llamada, Salvamento Pendiente, Retenido por Crédito, New, In Progress, Waiting for Customer, Merged, Closed, Response Received, Cancelado por desinterés del cliente, Abandono documental del cliente, Pendiente reporte mensual, Pendiente factura / VoBo NC"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "F2 · Modelo de datos",
    "order": 2,
    "criticality": "Alta",
    "actionRequired": "Verificar existencia y configuración"
  },
  {
    "id": "FLD-020",
    "name": "Email",
    "apiName": "Contact.Email",
    "type": "StandardField",
    "source": "dependencias",
    "usedBy": [
      "FLW-001"
    ],
    "actions": [],
    "deployClass": "Elemento existente a validar",
    "deployMethod": "N/A",
    "envSpecific": false,
    "envNotes": "",
    "status": "Confirmado",
    "evidence": "FLW-001",
    "risks": [],
    "details": {},
    "aliases": [],
    "dependsOn": [],
    "phase": "F2 · Modelo de datos",
    "order": 2,
    "criticality": "Alta",
    "actionRequired": "Verificar existencia y configuración"
  },
  {
    "id": "FLD-021",
    "name": "FirstName",
    "apiName": "Contact.FirstName",
    "type": "StandardField",
    "source": "dependencias",
    "usedBy": [
      "FLW-001"
    ],
    "actions": [],
    "deployClass": "Elemento existente a validar",
    "deployMethod": "N/A",
    "envSpecific": false,
    "envNotes": "",
    "status": "Confirmado",
    "evidence": "FLW-001",
    "risks": [],
    "details": {},
    "aliases": [],
    "dependsOn": [],
    "phase": "F2 · Modelo de datos",
    "order": 2,
    "criticality": "Alta",
    "actionRequired": "Verificar existencia y configuración"
  },
  {
    "id": "FLD-022",
    "name": "LastName",
    "apiName": "Contact.LastName",
    "type": "StandardField",
    "source": "dependencias",
    "usedBy": [
      "FLW-001"
    ],
    "actions": [],
    "deployClass": "Elemento existente a validar",
    "deployMethod": "N/A",
    "envSpecific": false,
    "envNotes": "",
    "status": "Confirmado",
    "evidence": "FLW-001",
    "risks": [],
    "details": {},
    "aliases": [],
    "dependsOn": [],
    "phase": "F2 · Modelo de datos",
    "order": 2,
    "criticality": "Alta",
    "actionRequired": "Verificar existencia y configuración"
  },
  {
    "id": "FLD-023",
    "name": "MobilePhone",
    "apiName": "Contact.MobilePhone",
    "type": "StandardField",
    "source": "dependencias",
    "usedBy": [
      "FLW-001"
    ],
    "actions": [],
    "deployClass": "Elemento existente a validar",
    "deployMethod": "N/A",
    "envSpecific": false,
    "envNotes": "",
    "status": "Confirmado",
    "evidence": "FLW-001",
    "risks": [],
    "details": {},
    "aliases": [],
    "dependsOn": [],
    "phase": "F2 · Modelo de datos",
    "order": 2,
    "criticality": "Alta",
    "actionRequired": "Verificar existencia y configuración"
  },
  {
    "id": "FLD-024",
    "name": "AccountId",
    "apiName": "Contact.AccountId",
    "type": "StandardField",
    "source": "dependencias",
    "usedBy": [
      "FLW-001"
    ],
    "actions": [],
    "deployClass": "Elemento existente a validar",
    "deployMethod": "N/A",
    "envSpecific": false,
    "envNotes": "",
    "status": "Confirmado",
    "evidence": "FLW-001",
    "risks": [],
    "details": {},
    "aliases": [],
    "dependsOn": [],
    "phase": "F2 · Modelo de datos",
    "order": 2,
    "criticality": "Alta",
    "actionRequired": "Verificar existencia y configuración"
  },
  {
    "id": "OBJ-001",
    "name": "Case",
    "apiName": "Case",
    "type": "Standard Object",
    "source": "dependencias",
    "usedBy": [
      "FLW-002",
      "FLW-003",
      "FLW-004",
      "FLW-005",
      "FLW-006",
      "FLW-007",
      "FLW-008",
      "FLW-013",
      "FLW-014",
      "FLW-015"
    ],
    "actions": [],
    "deployClass": "Elemento existente a validar",
    "deployMethod": "N/A",
    "envSpecific": false,
    "envNotes": "",
    "status": "Confirmado",
    "evidence": "sf sobject describe -s Case (findings/raw/describe_case.json)",
    "risks": [],
    "details": {
      "record_types_used": "RT-001..RT-006",
      "automation": "TRG-001, AUT-001..AUT-013, WF-001..WF-007, AR-001, VR-002..VR-019, ENT-001, ENT-002"
    },
    "aliases": [],
    "dependsOn": [
      "TRG-001",
      "FLD-018",
      "FLD-019",
      "AUT-001",
      "AUT-002",
      "AUT-003",
      "AUT-004",
      "AUT-005",
      "AUT-006",
      "AUT-007",
      "AUT-008",
      "AUT-009",
      "AUT-010",
      "AUT-011",
      "AUT-012",
      "AUT-013",
      "WF-001",
      "WF-002",
      "WF-003",
      "WF-004",
      "WF-005",
      "WF-006",
      "WF-007",
      "AR-001",
      "ARR-001",
      "ENT-001",
      "ENT-002",
      "VR-002",
      "VR-003",
      "VR-004",
      "VR-005",
      "VR-006",
      "VR-007",
      "VR-008",
      "VR-009",
      "VR-010",
      "VR-011",
      "VR-012",
      "VR-013",
      "VR-014",
      "VR-015",
      "VR-016",
      "VR-017",
      "VR-018",
      "VR-019"
    ],
    "phase": "F2 · Modelo de datos",
    "order": 2,
    "criticality": "Alta",
    "actionRequired": "Verificar existencia y configuración"
  },
  {
    "id": "OBJ-002",
    "name": "Contact",
    "apiName": "Contact",
    "type": "Standard Object",
    "source": "dependencias",
    "usedBy": [
      "FLW-001",
      "FLW-014",
      "FLW-015"
    ],
    "actions": [],
    "deployClass": "Elemento existente a validar",
    "deployMethod": "N/A",
    "envSpecific": false,
    "envNotes": "",
    "status": "Confirmado",
    "evidence": "sf data query DuplicateRule; ValidationRule tooling",
    "risks": [],
    "details": {
      "fields_used": "Email, FirstName, LastName, MobilePhone, AccountId",
      "automation": "AUT-014, VR-001",
      "duplicate_rules": "Standard_Contact_Duplicate_Rule y Standard_Rule_for_Contacts_with_Duplicate_Leads INACTIVAS"
    },
    "aliases": [],
    "dependsOn": [
      "AUT-014",
      "VR-001"
    ],
    "phase": "F2 · Modelo de datos",
    "order": 2,
    "criticality": "Alta",
    "actionRequired": "Verificar existencia y configuración"
  },
  {
    "id": "OBJ-003",
    "name": "Account",
    "apiName": "Account",
    "type": "Standard Object",
    "source": "dependencias",
    "usedBy": [
      "FLW-001"
    ],
    "actions": [],
    "deployClass": "Elemento existente a validar",
    "deployMethod": "N/A",
    "envSpecific": false,
    "envNotes": "",
    "status": "Confirmado",
    "evidence": "FLW-001",
    "risks": [],
    "details": {
      "fields_used": "Id, Name"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "F2 · Modelo de datos",
    "order": 2,
    "criticality": "Alta",
    "actionRequired": "Verificar existencia y configuración"
  },
  {
    "id": "OBJ-004",
    "name": "RecordType",
    "apiName": "RecordType",
    "type": "Standard Object",
    "source": "dependencias",
    "usedBy": [
      "FLW-002",
      "FLW-003",
      "FLW-004",
      "FLW-005",
      "FLW-006",
      "FLW-007",
      "FLW-008"
    ],
    "actions": [],
    "deployClass": "Elemento existente a validar",
    "deployMethod": "N/A",
    "envSpecific": false,
    "envNotes": "",
    "status": "Confirmado",
    "evidence": "flows",
    "risks": [],
    "details": {
      "filter": "DeveloperName only"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "F2 · Modelo de datos",
    "order": 2,
    "criticality": "Alta",
    "actionRequired": "Verificar existencia y configuración"
  },
  {
    "id": "OBJ-005",
    "name": "CaseComment",
    "apiName": "CaseComment",
    "type": "Standard Object",
    "source": "dependencias",
    "usedBy": [
      "FLW-013"
    ],
    "actions": [],
    "deployClass": "Elemento existente a validar",
    "deployMethod": "N/A",
    "envSpecific": false,
    "envNotes": "",
    "status": "Confirmado",
    "evidence": "ApexTrigger tooling (0 en CaseComment)",
    "risks": [],
    "details": {
      "triggers": "ninguno custom"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "F2 · Modelo de datos",
    "order": 2,
    "criticality": "Alta",
    "actionRequired": "Verificar existencia y configuración"
  },
  {
    "id": "OBJ-006",
    "name": "MessagingSession",
    "apiName": "MessagingSession",
    "type": "Standard Object",
    "source": "dependencias",
    "usedBy": [
      "FLW-005",
      "FLW-016"
    ],
    "actions": [],
    "deployClass": "Elemento existente a validar",
    "deployMethod": "N/A",
    "envSpecific": false,
    "envNotes": "",
    "status": "Confirmado",
    "evidence": "FlowDefinitionView",
    "risks": [],
    "details": {
      "usage": "transcripción (getConvTscpForRecord) y routing; RT flow Auto_Close_Waiting_Messaging_Sessions on update"
    },
    "aliases": [],
    "dependsOn": [
      "AUT-015",
      "AUT-016"
    ],
    "phase": "F2 · Modelo de datos",
    "order": 2,
    "criticality": "Alta",
    "actionRequired": "Verificar existencia y configuración"
  },
  {
    "id": "RT-001",
    "name": "Consulta_de_Informacion_General",
    "apiName": "Case.Consulta_de_Informacion_General",
    "type": "RecordType",
    "source": "dependencias",
    "usedBy": [
      "FLW-008"
    ],
    "actions": [],
    "deployClass": "Metadata desplegable",
    "deployMethod": "Metadata API (RecordType) — flows usan DeveloperName (portable)",
    "envSpecific": false,
    "envNotes": "",
    "status": "Confirmado",
    "evidence": "sf data query \"SELECT DeveloperName, SobjectType, IsActive, Id FROM RecordType WHERE DeveloperName IN (...)\"",
    "risks": [],
    "details": {
      "id": "0122E000000trmIQAQ",
      "sobject": "Case",
      "active": "True"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "F2 · Modelo de datos",
    "order": 2,
    "criticality": "Crítica",
    "actionRequired": "Desplegar"
  },
  {
    "id": "RT-002",
    "name": "Direccion_de_Sucursales",
    "apiName": "Case.Direccion_de_Sucursales",
    "type": "RecordType",
    "source": "dependencias",
    "usedBy": [
      "FLW-007"
    ],
    "actions": [],
    "deployClass": "Metadata desplegable",
    "deployMethod": "Metadata API (RecordType) — flows usan DeveloperName (portable)",
    "envSpecific": false,
    "envNotes": "",
    "status": "Confirmado",
    "evidence": "sf data query \"SELECT DeveloperName, SobjectType, IsActive, Id FROM RecordType WHERE DeveloperName IN (...)\"",
    "risks": [],
    "details": {
      "id": "0122E000000trmLQAQ",
      "sobject": "Case",
      "active": "True"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "F2 · Modelo de datos",
    "order": 2,
    "criticality": "Crítica",
    "actionRequired": "Desplegar"
  },
  {
    "id": "RT-003",
    "name": "Cotizacion_de_Envios_Internacionales",
    "apiName": "Case.Cotizacion_de_Envios_Internacionales",
    "type": "RecordType",
    "source": "dependencias",
    "usedBy": [
      "FLW-003"
    ],
    "actions": [],
    "deployClass": "Metadata desplegable",
    "deployMethod": "Metadata API (RecordType) — flows usan DeveloperName (portable)",
    "envSpecific": false,
    "envNotes": "",
    "status": "Confirmado",
    "evidence": "sf data query \"SELECT DeveloperName, SobjectType, IsActive, Id FROM RecordType WHERE DeveloperName IN (...)\"",
    "risks": [],
    "details": {
      "id": "0122E000000trxLQAQ",
      "sobject": "Case",
      "active": "True"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "F2 · Modelo de datos",
    "order": 2,
    "criticality": "Crítica",
    "actionRequired": "Desplegar"
  },
  {
    "id": "RT-004",
    "name": "Cotizacion_de_Envios_Nacionales",
    "apiName": "Case.Cotizacion_de_Envios_Nacionales",
    "type": "RecordType",
    "source": "dependencias",
    "usedBy": [
      "FLW-004"
    ],
    "actions": [],
    "deployClass": "Metadata desplegable",
    "deployMethod": "Metadata API (RecordType) — flows usan DeveloperName (portable)",
    "envSpecific": false,
    "envNotes": "",
    "status": "Confirmado",
    "evidence": "sf data query \"SELECT DeveloperName, SobjectType, IsActive, Id FROM RecordType WHERE DeveloperName IN (...)\"",
    "risks": [],
    "details": {
      "id": "0122E000000trxMQAQ",
      "sobject": "Case",
      "active": "True"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "F2 · Modelo de datos",
    "order": 2,
    "criticality": "Crítica",
    "actionRequired": "Desplegar"
  },
  {
    "id": "RT-005",
    "name": "Estatus_Solicitud_de_Servicio",
    "apiName": "Case.Estatus_Solicitud_de_Servicio",
    "type": "RecordType",
    "source": "dependencias",
    "usedBy": [
      "FLW-005",
      "FLW-006"
    ],
    "actions": [],
    "deployClass": "Metadata desplegable",
    "deployMethod": "Metadata API (RecordType) — flows usan DeveloperName (portable)",
    "envSpecific": false,
    "envNotes": "",
    "status": "Confirmado",
    "evidence": "sf data query \"SELECT DeveloperName, SobjectType, IsActive, Id FROM RecordType WHERE DeveloperName IN (...)\"",
    "risks": [],
    "details": {
      "id": "0122E000000trmMQAQ",
      "sobject": "Case",
      "active": "True"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "F2 · Modelo de datos",
    "order": 2,
    "criticality": "Crítica",
    "actionRequired": "Desplegar"
  },
  {
    "id": "RT-006",
    "name": "Direccion_de_vacantes",
    "apiName": "Case.Direccion_de_vacantes",
    "type": "RecordType",
    "source": "dependencias",
    "usedBy": [
      "FLW-002"
    ],
    "actions": [],
    "deployClass": "Metadata desplegable",
    "deployMethod": "Metadata API (RecordType) — flows usan DeveloperName (portable)",
    "envSpecific": false,
    "envNotes": "Id distinto por org no afecta (lookup por DeveloperName)",
    "status": "Confirmado",
    "evidence": "sf data query \"SELECT DeveloperName, SobjectType, IsActive, Id FROM RecordType WHERE DeveloperName IN (...)\"",
    "risks": [
      "Creado post-refresh (prefijo 012Vn): verificar que exista en prod."
    ],
    "details": {
      "id": "012Vn000001De8jIAC",
      "sobject": "Case",
      "active": "True"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "F2 · Modelo de datos",
    "order": 2,
    "criticality": "Crítica",
    "actionRequired": "Desplegar"
  },
  {
    "id": "CINT-006",
    "name": "Named / External Credentials",
    "apiName": "webex_cc, cisco_webex__U2C_WBX2, cisco_webex__Webex, ciscocjs__CPC_Named_Credential",
    "type": "NamedCredential (legacy)",
    "source": "canales",
    "usedBy": [],
    "actions": [],
    "deployClass": "Configuración específica del ambiente",
    "deployMethod": "Específico ambiente",
    "envSpecific": true,
    "envNotes": "",
    "status": "Confirmado",
    "statusNote": "Existe",
    "evidence": "SOQL NamedCredential + Tooling ExternalCredential/ExternalServiceRegistration",
    "risks": [
      "webex_cc en sandbox autentica contra prod"
    ],
    "details": {
      "detalle": "Ninguna usada por v18. webex_cc (NamedUser) apunta a https://paquetexpress.my.salesforce.com (URL de PRODUCCIÓN dentro del sandbox). ExternalCredential=0, ExternalServiceRegistration=0."
    },
    "aliases": [
      "INT-006"
    ],
    "dependsOn": [],
    "phase": "F3 · Integraciones",
    "order": 3,
    "criticality": "Media",
    "actionRequired": "Ajustar al ambiente y desplegar/configurar"
  },
  {
    "id": "CINT-007",
    "name": "Webex Contact Center (Cisco)",
    "apiName": "Paquetes cisco_webex / ciscocjs, ConnectedApp Webex_CC, CustomSite webex_cc, CSP *.webex.com",
    "type": "Integración CTI/Contact Center",
    "source": "canales",
    "usedBy": [],
    "actions": [],
    "deployClass": "Requiere investigación",
    "deployMethod": "Investigar",
    "envSpecific": false,
    "envNotes": "",
    "status": "Pendiente",
    "statusNote": "Pendiente",
    "evidence": "list metadata ConnectedApp/NamedCredential/CustomSite",
    "risks": [
      "Confirmar si el escalamiento humano se atiende en Omni Salesforce o en Webex CC"
    ],
    "details": {
      "detalle": "Presente en el org; no referenciada por v18. Puede ser el escritorio de los asesores humanos."
    },
    "aliases": [
      "INT-007"
    ],
    "dependsOn": [],
    "phase": "F3 · Integraciones",
    "order": 3,
    "criticality": "Media",
    "actionRequired": "Investigar antes del go-live"
  },
  {
    "id": "CINT-008",
    "name": "Connected Apps",
    "apiName": "API_SALESFORCE, CPQIntegrationUserApp, Data_Cloud_API_Ingestion, Data_Cloud_Ingestion_API, RestClient, Webex_CC",
    "type": "ConnectedApp",
    "source": "canales",
    "usedBy": [],
    "actions": [],
    "deployClass": "Requiere investigación",
    "deployMethod": "Investigar",
    "envSpecific": false,
    "envNotes": "",
    "status": "Pendiente",
    "statusNote": "Pendiente",
    "evidence": "sf org list metadata ConnectedApp",
    "risks": [],
    "details": {
      "detalle": "Ninguna referenciada por flows/apex de v18 (Deducido). ExternalClientApplication=0."
    },
    "aliases": [
      "INT-008"
    ],
    "dependsOn": [],
    "phase": "F3 · Integraciones",
    "order": 3,
    "criticality": "Baja",
    "actionRequired": "Investigar antes del go-live"
  },
  {
    "id": "INT-001",
    "name": "API Cotizador Paquetexpress v2 (POST getQuotation)",
    "apiName": "API Cotizador Paquetexpress v2 (POST getQuotation)",
    "type": "Integración externa (HTTP)",
    "source": "dependencias",
    "usedBy": [
      "APX-002"
    ],
    "actions": [],
    "deployClass": "Dependencia externa",
    "deployMethod": "Externo",
    "envSpecific": true,
    "envNotes": "Host productivo usado desde sandbox",
    "status": "Confirmado",
    "evidence": "código Apex + labels",
    "risks": [
      "Credenciales en código (rotar, mover a External Credential)",
      "Host productivo desde sandbox"
    ],
    "details": {
      "host": "cc.paquetexpress.com.mx",
      "auth": "INT-001: token en body header (hardcode); INT-002/003: sin auth visible en código",
      "named_credential": "None",
      "canales/seguridad (INT-002)": "Endpoint Label.URL_COTIZACION → https://cc.paquetexpress.com.mx/WsQuotePaquetexpress/api/apiQuoter/v2/getQuotation. Header con user/password/token hardcodeados en Apex (appName 'RAD')."
    },
    "aliases": [
      "INT-002"
    ],
    "dependsOn": [],
    "phase": "F3 · Integraciones",
    "order": 3,
    "criticality": "Crítica",
    "actionRequired": "Verificar conectividad y contrato"
  },
  {
    "id": "INT-002",
    "name": "API Rastreo v3 (GET guia/historico/ultimoevento)",
    "apiName": "API Rastreo v3 (GET guia/historico/ultimoevento)",
    "type": "Integración externa (HTTP)",
    "source": "dependencias",
    "usedBy": [
      "APX-003"
    ],
    "actions": [],
    "deployClass": "Dependencia externa",
    "deployMethod": "Externo",
    "envSpecific": true,
    "envNotes": "Host productivo usado desde sandbox",
    "status": "Confirmado",
    "evidence": "código Apex + labels",
    "risks": [
      "Sandbox llama al host de PRODUCCIÓN (sin separación QA/PRD)",
      "Sin Named Credential: endpoint en Custom Label"
    ],
    "details": {
      "host": "cc.paquetexpress.com.mx",
      "auth": "INT-001: token en body header (hardcode); INT-002/003: sin auth visible en código",
      "named_credential": "None",
      "canales/seguridad (INT-001)": "Endpoint = Label.URL_RASTREO + guía + Label.URL_RASTREO_END → https://cc.paquetexpress.com.mx/ptxws/rest/api/v3/guia/historico/ultimoevento/{guia}/@1@2@3@4@5. Autorizado por Remote Site PRD_TOKEN_PAQUETEXPRESS_LOGIN (cc.paquetexpress.com.mx). with sharing."
    },
    "aliases": [
      "INT-001"
    ],
    "dependsOn": [],
    "phase": "F3 · Integraciones",
    "order": 3,
    "criticality": "Crítica",
    "actionRequired": "Verificar conectividad y contrato"
  },
  {
    "id": "INT-003",
    "name": "API Código Postal v3 (GET codigopostal ORGN/DEST)",
    "apiName": "API Código Postal v3 (GET codigopostal ORGN/DEST)",
    "type": "Integración externa (HTTP)",
    "source": "dependencias",
    "usedBy": [
      "APX-004"
    ],
    "actions": [],
    "deployClass": "Dependencia externa",
    "deployMethod": "Externo",
    "envSpecific": true,
    "envNotes": "Host productivo usado desde sandbox",
    "status": "Confirmado",
    "evidence": "código Apex + labels",
    "risks": [
      "Host productivo"
    ],
    "details": {
      "host": "cc.paquetexpress.com.mx",
      "auth": "INT-001: token en body header (hardcode); INT-002/003: sin auth visible en código",
      "named_credential": "None",
      "canales/seguridad (INT-003)": "Label.URL_VALIDA_CP → https://cc.paquetexpress.com.mx/ptxws/rest/api/v3/codigopostal/{cp}/@1@2@3@4@5/ORGN|DEST?source=WEBPAGE."
    },
    "aliases": [
      "INT-003"
    ],
    "dependsOn": [],
    "phase": "F3 · Integraciones",
    "order": 3,
    "criticality": "Crítica",
    "actionRequired": "Verificar conectividad y contrato"
  },
  {
    "id": "INT-004",
    "name": "Einstein LLM Gateway (Prompt Template generation)",
    "apiName": "ConnectApi.EinsteinLLM",
    "type": "Integración plataforma (GenAI)",
    "source": "dependencias",
    "usedBy": [
      "APX-005",
      "PT-001",
      "PT-002"
    ],
    "actions": [],
    "deployClass": "Elemento existente a validar",
    "deployMethod": "Requiere Einstein Generative AI habilitado + licencias/créditos",
    "envSpecific": false,
    "envNotes": "",
    "status": "Confirmado",
    "evidence": "prompt templates",
    "risks": [],
    "details": {
      "models": "sfdc_ai__DefaultGPT5, sfdc_ai__DefaultGPT5Mini"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "F3 · Integraciones",
    "order": 3,
    "criticality": "Crítica",
    "actionRequired": "Verificar existencia y configuración"
  },
  {
    "id": "LBL-001",
    "name": "URL_COTIZACION",
    "apiName": "URL_COTIZACION",
    "type": "CustomLabel",
    "source": "dependencias",
    "usedBy": [
      "APX-002"
    ],
    "actions": [],
    "deployClass": "Configuración específica del ambiente",
    "deployMethod": "Metadata API (CustomLabels)",
    "envSpecific": true,
    "envNotes": "Endpoint por label: en sandbox apunta al host productivo",
    "status": "Confirmado",
    "evidence": "sf project retrieve start -m CustomLabel:URL_COTIZACION; src/main/default/labels/CustomLabels.labels-meta.xml",
    "risks": [
      "Sandbox consume el API productivo de Paquetexpress.",
      "Si se despliega CustomLabels completo se sobreescriben valores de prod"
    ],
    "details": {
      "value_summary": "https://cc.paquetexpress.com.mx/WsQuotePaquetexpress/api/apiQuoter/v2/getQuotation",
      "id": "1012E00000Ck9pDQAR",
      "protected": "False",
      "canales/seguridad (INT-004)": "Valores es_MX apuntan a cc.paquetexpress.com.mx (mismos para sandbox y prod)."
    },
    "aliases": [
      "INT-004"
    ],
    "dependsOn": [],
    "phase": "F3 · Integraciones",
    "order": 3,
    "criticality": "Crítica",
    "actionRequired": "Ajustar al ambiente y desplegar/configurar"
  },
  {
    "id": "LBL-002",
    "name": "URL_RASTREO",
    "apiName": "URL_RASTREO",
    "type": "CustomLabel",
    "source": "dependencias",
    "usedBy": [
      "APX-003"
    ],
    "actions": [],
    "deployClass": "Configuración específica del ambiente",
    "deployMethod": "Metadata API (CustomLabels)",
    "envSpecific": true,
    "envNotes": "Endpoint por label: en sandbox apunta al host productivo",
    "status": "Confirmado",
    "evidence": "sf project retrieve start -m CustomLabel:URL_RASTREO; src/main/default/labels/CustomLabels.labels-meta.xml",
    "risks": [
      "Sandbox consume el API productivo de Paquetexpress."
    ],
    "details": {
      "value_summary": "https://cc.paquetexpress.com.mx/ptxws/rest/api/v3/guia/historico/ultimoevento/",
      "id": "1012E00000Ck9p3QAB",
      "protected": "False"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "F3 · Integraciones",
    "order": 3,
    "criticality": "Crítica",
    "actionRequired": "Ajustar al ambiente y desplegar/configurar"
  },
  {
    "id": "LBL-003",
    "name": "URL_RASTREO_END",
    "apiName": "URL_RASTREO_END",
    "type": "CustomLabel",
    "source": "dependencias",
    "usedBy": [
      "APX-003"
    ],
    "actions": [],
    "deployClass": "Metadata desplegable",
    "deployMethod": "Metadata API (CustomLabels)",
    "envSpecific": true,
    "envNotes": "Endpoint por label: en sandbox apunta al host productivo",
    "status": "Confirmado",
    "evidence": "sf project retrieve start -m CustomLabel:URL_RASTREO_END; src/main/default/labels/CustomLabels.labels-meta.xml",
    "risks": [],
    "details": {
      "value_summary": "sufijo de path literal",
      "id": "1012E00000Ck9p8QAB",
      "protected": "False"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "F3 · Integraciones",
    "order": 3,
    "criticality": "Crítica",
    "actionRequired": "Desplegar"
  },
  {
    "id": "LBL-004",
    "name": "URL_VALIDA_CP",
    "apiName": "URL_VALIDA_CP",
    "type": "CustomLabel",
    "source": "dependencias",
    "usedBy": [
      "APX-004"
    ],
    "actions": [],
    "deployClass": "Configuración específica del ambiente",
    "deployMethod": "Metadata API (CustomLabels)",
    "envSpecific": true,
    "envNotes": "Endpoint por label: en sandbox apunta al host productivo",
    "status": "Confirmado",
    "evidence": "sf project retrieve start -m CustomLabel:URL_VALIDA_CP; src/main/default/labels/CustomLabels.labels-meta.xml",
    "risks": [
      "Sandbox consume el API productivo de Paquetexpress."
    ],
    "details": {
      "value_summary": "https://cc.paquetexpress.com.mx/ptxws/rest/api/v3/codigopostal/",
      "id": "1012E00000By9mUQAR",
      "protected": "False"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "F3 · Integraciones",
    "order": 3,
    "criticality": "Crítica",
    "actionRequired": "Ajustar al ambiente y desplegar/configurar"
  },
  {
    "id": "LBL-005",
    "name": "URL_VALIDACP_ORIGEN_END",
    "apiName": "URL_VALIDACP_ORIGEN_END",
    "type": "CustomLabel",
    "source": "dependencias",
    "usedBy": [
      "APX-004"
    ],
    "actions": [],
    "deployClass": "Metadata desplegable",
    "deployMethod": "Metadata API (CustomLabels)",
    "envSpecific": true,
    "envNotes": "Endpoint por label: en sandbox apunta al host productivo",
    "status": "Confirmado",
    "evidence": "sf project retrieve start -m CustomLabel:URL_VALIDACP_ORIGEN_END; src/main/default/labels/CustomLabels.labels-meta.xml",
    "risks": [],
    "details": {
      "value_summary": "sufijo .../ORGN?source=WEBPAGE",
      "id": "1012E00000By9mTQAR",
      "protected": "False"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "F3 · Integraciones",
    "order": 3,
    "criticality": "Crítica",
    "actionRequired": "Desplegar"
  },
  {
    "id": "LBL-006",
    "name": "URL_VALIDACP_DESTINO_END",
    "apiName": "URL_VALIDACP_DESTINO_END",
    "type": "CustomLabel",
    "source": "dependencias",
    "usedBy": [
      "APX-004"
    ],
    "actions": [],
    "deployClass": "Metadata desplegable",
    "deployMethod": "Metadata API (CustomLabels)",
    "envSpecific": true,
    "envNotes": "Endpoint por label: en sandbox apunta al host productivo",
    "status": "Confirmado",
    "evidence": "sf project retrieve start -m CustomLabel:URL_VALIDACP_DESTINO_END; src/main/default/labels/CustomLabels.labels-meta.xml",
    "risks": [],
    "details": {
      "value_summary": "sufijo .../DEST?source=WEBPAGE",
      "id": "1012E00000By9mSQAR",
      "protected": "False"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "F3 · Integraciones",
    "order": 3,
    "criticality": "Crítica",
    "actionRequired": "Desplegar"
  },
  {
    "id": "RSS-001",
    "name": "PRD_TOKEN_PAQUETEXPRESS_LOGIN",
    "apiName": "PRD_TOKEN_PAQUETEXPRESS_LOGIN",
    "type": "RemoteSiteSetting",
    "source": "dependencias",
    "usedBy": [
      "APX-002",
      "APX-003",
      "APX-004"
    ],
    "actions": [],
    "deployClass": "Metadata desplegable",
    "deployMethod": "Metadata API (RemoteSiteSetting)",
    "envSpecific": false,
    "envNotes": "Mismo host en ambos ambientes",
    "status": "Confirmado",
    "evidence": "src/main/default/remoteSiteSettings/PRD_TOKEN_PAQUETEXPRESS_LOGIN.remoteSite-meta.xml",
    "risks": [
      "Remote Site (no Named Credential): sin gestión de secretos ni separación por ambiente.",
      "webhook.site activo = posible canal de exfiltración",
      "Remote sites QA HTTP sin TLS (V19)"
    ],
    "details": {
      "url": "https://cc.paquetexpress.com.mx",
      "active": "True",
      "canales/seguridad (INT-005)": "Activos. Además existen QA: testEP (apiqa.paquetexpress.com.mx), ValidaRFC (qaclu.paquetexpress.com.mx), GLP_QA_Cliente/GLP_QA_Rad (http://qaglp.paquetexpress.mx:7009/7007, sin TLS), GLP_QA_Cotizacion (qawls.paquetexpress.com.mx) → usados por V19/Glp, no por v18. PruebasObtenerIp → https://webhook.site activo."
    },
    "aliases": [
      "INT-005"
    ],
    "dependsOn": [],
    "phase": "F3 · Integraciones",
    "order": 3,
    "criticality": "Crítica",
    "actionRequired": "Desplegar"
  },
  {
    "id": "APX-001",
    "name": "CheckBusinessHours",
    "apiName": "CheckBusinessHours",
    "type": "ApexClass",
    "source": "dependencias",
    "usedBy": [
      "AGT-001"
    ],
    "actions": [
      "Escalation_v2.Check_Now_is_within_Business_Hours_by_Name"
    ],
    "deployClass": "Metadata desplegable",
    "deployMethod": "Metadata API (ApexClass) — deploy a prod requiere RunSpecifiedTests/RunLocalTests con >=75%",
    "envSpecific": false,
    "envNotes": "",
    "status": "Confirmado",
    "evidence": "sf project retrieve start -m ApexClass:CheckBusinessHours; _work/handover-v18/src/main/default/classes/CheckBusinessHours.cls; sf data query --use-tooling-api -q \"SELECT ApexClassOrTrigger.Name, NumLinesCovered, NumLinesUncovered FROM ApexCodeCoverageAggregate WHERE ...\"",
    "risks": [
      "Ignora el input businessHourName: nombre 'Horario Paquete' hardcodeado en SOQL.",
      "No es bulk-safe: devuelve 1 resultado sin importar el tamaño del input.",
      "Cobertura registrada 0%; el test no tiene asserts.",
      "Existe AgentforceBusinessHours (versión corregida, 100% cubierta) que v18 NO usa."
    ],
    "details": {
      "sharing": "sin declarar (omitido)",
      "invocable": "checkBusinessHoursByName(List<OrderInput>) label \"Check Now is within Business Hours by Name\"",
      "inputs": "businessHourName:String (required)",
      "outputs": "sOrderStatus:Boolean",
      "soql": "BusinessHours WHERE Name='Horario Paquete' AND IsActive=true",
      "dml": "—",
      "callouts": "—",
      "crud_fls": "N/A (solo BusinessHours)",
      "exception_handling": "ninguno",
      "coverage": "0/18 (0%) en ApexCodeCoverageAggregate",
      "tests": "TST-001",
      "apex_class_access_agent_user": "Sí (PS Agentforce_Paquete_Express_Permissions)"
    },
    "aliases": [],
    "dependsOn": [
      "TST-001",
      "BH-001"
    ],
    "phase": "F4 · Apex",
    "order": 4,
    "criticality": "Crítica",
    "actionRequired": "Desplegar"
  },
  {
    "id": "APX-002",
    "name": "CotizacionEnvioV2",
    "apiName": "CotizacionEnvioV2",
    "type": "ApexClass",
    "source": "dependencias",
    "usedBy": [
      "FLW-009"
    ],
    "actions": [
      "Quote_Management.Obtener_Cotizaci_n_Paqueteria_V2"
    ],
    "deployClass": "Metadata desplegable",
    "deployMethod": "Metadata API (ApexClass) — deploy a prod requiere RunSpecifiedTests/RunLocalTests con >=75%",
    "envSpecific": true,
    "envNotes": "Endpoint/token embebidos; el label define el host",
    "status": "Confirmado",
    "evidence": "sf project retrieve start -m ApexClass:CotizacionEnvioV2; _work/handover-v18/src/main/default/classes/CotizacionEnvioV2.cls; sf data query --use-tooling-api -q \"SELECT ApexClassOrTrigger.Name, NumLinesCovered, NumLinesUncovered FROM ApexCodeCoverageAggregate WHERE ...\"",
    "risks": [
      "Token de seguridad del API HARDCODEADO en generateHeader() (valor no reproducido aquí). Rotar y mover a Named/External Credential.",
      "Endpoint vía Custom Label sin Named Credential; el sandbox apunta al host PRODUCTIVO cc.paquetexpress.com.mx.",
      "Decimal.valueOf(peso/largo/alto) e Integer.valueOf(ancho) fuera del try: entradas no numéricas o ancho decimal ('10.5') lanzan excepción no controlada.",
      "Si HTTP!=200 o excepción devuelve lista vacía (tamaño != input) -> error en el Flow.",
      "Solo procesa quotationInputs[0] (no bulk).",
      "Cobertura registrada 0%."
    ],
    "details": {
      "sharing": "with sharing",
      "invocable": "getQuotation label \"Get Quotation2\"",
      "inputs": "cpOrigen,cpDestino,tipo (req); largo,alto,ancho,peso,RAD,EAD,IVPF:String; amt:Integer",
      "outputs": "options:List<String>, code:String",
      "soql": "—",
      "dml": "—",
      "callouts": "POST {Label.URL_COTIZACION} host cc.paquetexpress.com.mx path /WsQuotePaquetexpress/api/apiQuoter/v2/getQuotation",
      "named_credential": "NINGUNO (endpoint desde Custom Label + Remote Site PRD_TOKEN_PAQUETEXPRESS_LOGIN)",
      "crud_fls": "N/A",
      "exception_handling": "try/catch solo alrededor de http.send/parse; parseo numérico fuera del try",
      "coverage": "0/124 (0%)",
      "tests": "TST-003, TST-002 (cubre CotizacionEnvio v1, no V2)"
    },
    "aliases": [],
    "dependsOn": [
      "TST-003",
      "LBL-001",
      "RSS-001",
      "INT-001"
    ],
    "phase": "F4 · Apex",
    "order": 4,
    "criticality": "Crítica",
    "actionRequired": "Desplegar"
  },
  {
    "id": "APX-003",
    "name": "RastreoEnvio",
    "apiName": "RastreoEnvio",
    "type": "ApexClass",
    "source": "dependencias",
    "usedBy": [
      "FLW-010"
    ],
    "actions": [
      "Orden_Management.Obtener_estatus_de_la_orden"
    ],
    "deployClass": "Metadata desplegable",
    "deployMethod": "Metadata API (ApexClass) — deploy a prod requiere RunSpecifiedTests/RunLocalTests con >=75%",
    "envSpecific": false,
    "envNotes": "Endpoint/token embebidos; el label define el host",
    "status": "Confirmado",
    "evidence": "sf project retrieve start -m ApexClass:RastreoEnvio; _work/handover-v18/src/main/default/classes/RastreoEnvio.cls; sf data query --use-tooling-api -q \"SELECT ApexClassOrTrigger.Name, NumLinesCovered, NumLinesUncovered FROM ApexCodeCoverageAggregate WHERE ...\"",
    "risks": [
      "Devuelve lista vacía ante error -> mismatch de resultados en Flow.",
      "Número de guía concatenado sin URL-encode.",
      "dataList[0] sin validar tamaño (cae en catch).",
      "Endpoint productivo vía label, sin Named Credential.",
      "Cobertura registrada 0%."
    ],
    "details": {
      "sharing": "with sharing",
      "invocable": "getOrderStatus label \"Get Order Status\"",
      "inputs": "sOrderNumber:String",
      "outputs": "status,rastreo,guia,referencia,fecha,hora,sucursalOrigen,sucursalDestino,ciudadDestino,promesa",
      "soql": "—",
      "dml": "—",
      "callouts": "GET {Label.URL_RASTREO}+guia+{Label.URL_RASTREO_END} host cc.paquetexpress.com.mx path /ptxws/rest/api/v3/guia/historico/ultimoevento/",
      "named_credential": "NINGUNO",
      "crud_fls": "N/A",
      "exception_handling": "try/catch con System.debug; devuelve lista vacía",
      "coverage": "0/29 (0%)",
      "tests": "TST-002, TST-003"
    },
    "aliases": [],
    "dependsOn": [
      "TST-002",
      "TST-003",
      "LBL-002",
      "LBL-003",
      "RSS-001",
      "INT-002"
    ],
    "phase": "F4 · Apex",
    "order": 4,
    "criticality": "Crítica",
    "actionRequired": "Desplegar"
  },
  {
    "id": "APX-004",
    "name": "validaCodigo2",
    "apiName": "validaCodigo2",
    "type": "ApexClass",
    "source": "dependencias",
    "usedBy": [
      "FLW-011",
      "FLW-012"
    ],
    "actions": [
      "Quote_Management.Obtener_Codigo_postal_origen_valido_v2A",
      "Quote_Management.Obtener_Codigo_postal_destino_valido_v2A"
    ],
    "deployClass": "Metadata desplegable",
    "deployMethod": "Metadata API (ApexClass) — deploy a prod requiere RunSpecifiedTests/RunLocalTests con >=75%",
    "envSpecific": false,
    "envNotes": "Endpoint/token embebidos; el label define el host",
    "status": "Confirmado",
    "evidence": "sf project retrieve start -m ApexClass:validaCodigo2; _work/handover-v18/src/main/default/classes/validaCodigo2.cls; sf data query --use-tooling-api -q \"SELECT ApexClassOrTrigger.Name, NumLinesCovered, NumLinesUncovered FROM ApexCodeCoverageAggregate WHERE ...\"",
    "risks": [
      "Expone mensaje técnico de excepción (incluye número de línea) al cliente.",
      "Si tipo no es Origen/Destino el endpoint queda null.",
      "Endpoint productivo vía label.",
      "Cobertura registrada 0%."
    ],
    "details": {
      "sharing": "with sharing",
      "invocable": "validaCodigo label \"Valida codigo postal2\"",
      "inputs": "codigoPostal, tipo (Origen|Destino)",
      "outputs": "valido:Boolean, mensaje:String",
      "soql": "—",
      "dml": "—",
      "callouts": "GET {Label.URL_VALIDA_CP}+cp+{URL_VALIDACP_ORIGEN_END|URL_VALIDACP_DESTINO_END} host cc.paquetexpress.com.mx path /ptxws/rest/api/v3/codigopostal/",
      "named_credential": "NINGUNO",
      "crud_fls": "N/A",
      "exception_handling": "try/catch; devuelve valido=false y mensaje con ex.getMessage()",
      "coverage": "0/35 (0%)",
      "tests": "TST-003"
    },
    "aliases": [],
    "dependsOn": [
      "TST-003",
      "LBL-004",
      "LBL-005",
      "LBL-006",
      "RSS-001",
      "INT-003"
    ],
    "phase": "F4 · Apex",
    "order": 4,
    "criticality": "Crítica",
    "actionRequired": "Desplegar"
  },
  {
    "id": "APX-005",
    "name": "CaseSummaryAgentforceInvocable",
    "apiName": "CaseSummaryAgentforceInvocable",
    "type": "ApexClass",
    "source": "dependencias",
    "usedBy": [
      "FLW-005"
    ],
    "actions": [
      "Orden_Management.Crea_caso_seguimiento_de_una_orden_v2A"
    ],
    "deployClass": "Metadata desplegable",
    "deployMethod": "Metadata API (ApexClass) — deploy a prod requiere RunSpecifiedTests/RunLocalTests con >=75%",
    "envSpecific": false,
    "envNotes": "",
    "status": "Confirmado",
    "evidence": "sf project retrieve start -m ApexClass:CaseSummaryAgentforceInvocable; _work/handover-v18/src/main/default/classes/CaseSummaryAgentforceInvocable.cls; sf data query --use-tooling-api -q \"SELECT ApexClassOrTrigger.Name, NumLinesCovered, NumLinesUncovered FROM ApexCodeCoverageAggregate WHERE ...\"",
    "risks": [
      "Dependencia dura de la plantilla Case_Summary_Agentforce por DeveloperName (string) — MetadataComponentDependency no la detecta.",
      "Test usa Test.isRunningTest() para no llamar al LLM (cobertura no valida la integración real).",
      "Sin acceso explícito a la clase en los permission sets del usuario del agente (se invoca vía Flow)."
    ],
    "details": {
      "sharing": "with sharing",
      "invocable": "generateCaseSummary label \"Generar resumen caso Agentforce\"",
      "inputs": "conversationTranscript, caseContext, trackingNumber, orderStatusSummary, contactName, channelType, seguimiento",
      "outputs": "subject, description, topic, errorMessage",
      "soql": "—",
      "dml": "—",
      "callouts": "ConnectApi.EinsteinLLM.generateMessagesForPromptTemplate('Case_Summary_Agentforce')",
      "named_credential": "N/A (Einstein LLM Gateway)",
      "crud_fls": "N/A",
      "exception_handling": "try/catch -> errorMessage",
      "coverage": "0/111 (0%) registrado",
      "tests": "TST-004",
      "bulk": "itera requests pero hace 1 llamada LLM por request"
    },
    "aliases": [],
    "dependsOn": [
      "TST-004",
      "PT-002",
      "INT-004"
    ],
    "phase": "F4 · Apex",
    "order": 4,
    "criticality": "Crítica",
    "actionRequired": "Desplegar"
  },
  {
    "id": "MCK-001",
    "name": "CalloutMockCotizacion2",
    "apiName": "CalloutMockCotizacion2",
    "type": "ApexClass (HttpCalloutMock)",
    "source": "dependencias",
    "usedBy": [
      "TST-003"
    ],
    "actions": [],
    "deployClass": "Metadata desplegable",
    "deployMethod": "Metadata API con los tests",
    "envSpecific": false,
    "envNotes": "",
    "status": "Confirmado",
    "evidence": "src/main/default/classes/CalloutMockCotizacion2.cls",
    "risks": [],
    "details": {},
    "aliases": [],
    "dependsOn": [],
    "phase": "F4 · Apex",
    "order": 4,
    "criticality": "Alta",
    "actionRequired": "Desplegar"
  },
  {
    "id": "MCK-002",
    "name": "CalloutMockRastreo",
    "apiName": "CalloutMockRastreo",
    "type": "ApexClass (HttpCalloutMock)",
    "source": "dependencias",
    "usedBy": [
      "TST-002",
      "TST-003"
    ],
    "actions": [],
    "deployClass": "Metadata desplegable",
    "deployMethod": "Metadata API con los tests",
    "envSpecific": false,
    "envNotes": "",
    "status": "Confirmado",
    "evidence": "src/main/default/classes/CalloutMockRastreo.cls",
    "risks": [],
    "details": {},
    "aliases": [],
    "dependsOn": [],
    "phase": "F4 · Apex",
    "order": 4,
    "criticality": "Alta",
    "actionRequired": "Desplegar"
  },
  {
    "id": "MCK-003",
    "name": "CalloutMockValidaCodigoPostal3",
    "apiName": "CalloutMockValidaCodigoPostal3",
    "type": "ApexClass (HttpCalloutMock)",
    "source": "dependencias",
    "usedBy": [
      "TST-003"
    ],
    "actions": [],
    "deployClass": "Metadata desplegable",
    "deployMethod": "Metadata API con los tests",
    "envSpecific": false,
    "envNotes": "",
    "status": "Confirmado",
    "evidence": "src/main/default/classes/CalloutMockValidaCodigoPostal3.cls",
    "risks": [],
    "details": {},
    "aliases": [],
    "dependsOn": [],
    "phase": "F4 · Apex",
    "order": 4,
    "criticality": "Alta",
    "actionRequired": "Desplegar"
  },
  {
    "id": "MCK-004",
    "name": "CalloutMockValidaCodigoPostal4",
    "apiName": "CalloutMockValidaCodigoPostal4",
    "type": "ApexClass (HttpCalloutMock)",
    "source": "dependencias",
    "usedBy": [
      "TST-003"
    ],
    "actions": [],
    "deployClass": "Metadata desplegable",
    "deployMethod": "Metadata API con los tests",
    "envSpecific": false,
    "envNotes": "",
    "status": "Confirmado",
    "evidence": "src/main/default/classes/CalloutMockValidaCodigoPostal4.cls",
    "risks": [],
    "details": {},
    "aliases": [],
    "dependsOn": [],
    "phase": "F4 · Apex",
    "order": 4,
    "criticality": "Alta",
    "actionRequired": "Desplegar"
  },
  {
    "id": "TST-001",
    "name": "TestCheckBusinessHours",
    "apiName": "TestCheckBusinessHours",
    "type": "ApexClass (test)",
    "source": "dependencias",
    "usedBy": [
      "APX-001"
    ],
    "actions": [],
    "deployClass": "Metadata desplegable",
    "deployMethod": "Metadata API (ApexClass) junto con las clases que cubre",
    "envSpecific": false,
    "envNotes": "",
    "status": "Confirmado",
    "evidence": "Tooling MetadataComponentDependency (RefMetadataComponentId IN clases) ; src/main/default/classes/TestCheckBusinessHours.cls",
    "risks": [
      "Cobertura real Pendiente: ejecutar sf apex run test --tests TestCheckBusinessHours (no ejecutado por ser auditoría read-only)."
    ],
    "details": {
      "covers": "APX-001",
      "notes": "Sin asserts; usa BusinessHours real del org (SeeAllData no necesario para BusinessHours)",
      "coverage_aggregate_of_covered": "0% registrado para todas las clases productivas cubiertas (ApexCodeCoverage sin filas: los tests no se han corrido desde el último refresh/compilación)"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "F4 · Apex",
    "order": 4,
    "criticality": "Alta",
    "actionRequired": "Desplegar"
  },
  {
    "id": "TST-002",
    "name": "TestClassRastreoCotizacion",
    "apiName": "TestClassRastreoCotizacion",
    "type": "ApexClass (test)",
    "source": "dependencias",
    "usedBy": [
      "APX-003"
    ],
    "actions": [],
    "deployClass": "Metadata desplegable",
    "deployMethod": "Metadata API (ApexClass) junto con las clases que cubre",
    "envSpecific": false,
    "envNotes": "",
    "status": "Confirmado",
    "evidence": "Tooling MetadataComponentDependency (RefMetadataComponentId IN clases) ; src/main/default/classes/TestClassRastreoCotizacion.cls",
    "risks": [
      "Cobertura real Pendiente: ejecutar sf apex run test --tests TestClassRastreoCotizacion (no ejecutado por ser auditoría read-only)."
    ],
    "details": {
      "covers": "APX-003",
      "notes": "Cubre RastreoEnvio, CotizacionEnvio (v1) y ValidaCodigoPostalCobertura (no usadas por v18 salvo RastreoEnvio). Mock CalloutMockRastreo/CalloutMockCotizacion/CalloutMockValidaCodigoPostal(2)",
      "coverage_aggregate_of_covered": "0% registrado para todas las clases productivas cubiertas (ApexCodeCoverage sin filas: los tests no se han corrido desde el último refresh/compilación)"
    },
    "aliases": [],
    "dependsOn": [
      "MCK-002"
    ],
    "phase": "F4 · Apex",
    "order": 4,
    "criticality": "Alta",
    "actionRequired": "Desplegar"
  },
  {
    "id": "TST-003",
    "name": "TestClassRastreoCotizacionCPCobertura",
    "apiName": "TestClassRastreoCotizacionCPCobertura",
    "type": "ApexClass (test)",
    "source": "dependencias",
    "usedBy": [
      "APX-002",
      "APX-003",
      "APX-004"
    ],
    "actions": [],
    "deployClass": "Metadata desplegable",
    "deployMethod": "Metadata API (ApexClass) junto con las clases que cubre",
    "envSpecific": false,
    "envNotes": "",
    "status": "Confirmado",
    "evidence": "Tooling MetadataComponentDependency (RefMetadataComponentId IN clases) ; src/main/default/classes/TestClassRastreoCotizacionCPCobertura.cls",
    "risks": [
      "Cobertura real Pendiente: ejecutar sf apex run test --tests TestClassRastreoCotizacionCPCobertura (no ejecutado por ser auditoría read-only)."
    ],
    "details": {
      "covers": "APX-002, APX-003, APX-004",
      "notes": "Mocks CalloutMockRastreo, CalloutMockCotizacion2, CalloutMockValidaCodigoPostal3/4",
      "coverage_aggregate_of_covered": "0% registrado para todas las clases productivas cubiertas (ApexCodeCoverage sin filas: los tests no se han corrido desde el último refresh/compilación)"
    },
    "aliases": [],
    "dependsOn": [
      "MCK-001",
      "MCK-002",
      "MCK-003",
      "MCK-004"
    ],
    "phase": "F4 · Apex",
    "order": 4,
    "criticality": "Alta",
    "actionRequired": "Desplegar"
  },
  {
    "id": "TST-004",
    "name": "CaseSummaryAgentforceInvocable_Test",
    "apiName": "CaseSummaryAgentforceInvocable_Test",
    "type": "ApexClass (test)",
    "source": "dependencias",
    "usedBy": [
      "APX-005"
    ],
    "actions": [],
    "deployClass": "Metadata desplegable",
    "deployMethod": "Metadata API (ApexClass) junto con las clases que cubre",
    "envSpecific": false,
    "envNotes": "",
    "status": "Confirmado",
    "evidence": "Tooling MetadataComponentDependency (RefMetadataComponentId IN clases) ; src/main/default/classes/CaseSummaryAgentforceInvocable_Test.cls",
    "risks": [
      "Cobertura real Pendiente: ejecutar sf apex run test --tests CaseSummaryAgentforceInvocable_Test (no ejecutado por ser auditoría read-only)."
    ],
    "details": {
      "covers": "APX-005",
      "notes": "20 métodos de test; rama LLM simulada vía Test.isRunningTest()",
      "coverage_aggregate_of_covered": "0% registrado para todas las clases productivas cubiertas (ApexCodeCoverage sin filas: los tests no se han corrido desde el último refresh/compilación)"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "F4 · Apex",
    "order": 4,
    "criticality": "Alta",
    "actionRequired": "Desplegar"
  },
  {
    "id": "DC-001",
    "name": "Search Index ADL_LibreriaDeDatos",
    "apiName": "ADL_LibreriaDeDatos",
    "type": "Data Cloud Search Index (DataSemanticSearch)",
    "source": "dependencias",
    "usedBy": [
      "RET-001"
    ],
    "actions": [],
    "deployClass": "Configuración manual",
    "deployMethod": "Se crea automáticamente al crear la Data Library en destino",
    "envSpecific": true,
    "envNotes": "IDs de org",
    "status": "Confirmado",
    "evidence": "sf data query \"SELECT ... FROM DataSemanticSearch\"",
    "risks": [
      "Índice refrescado por última vez 2026-04-25; validar que los PDFs vigentes estén indexados."
    ],
    "details": {
      "id": "18ldh0000001ebJAAQ",
      "searchType": "Hybrid",
      "runtimeStatus": "READY",
      "indexRefreshedOn": "2026-04-25T09:27:32Z",
      "primaryDmo": "ADL_LibreriaDeDatos__dlm",
      "vectorDmo": "ADL_LibreriaDeDatos_index__dlm",
      "chunkDmo": "ADL_LibreriaDeDatos_chunk__dlm",
      "dataSpace": "default (0vhVn000000003FIAQ)",
      "primaryDmoRecords": "3"
    },
    "aliases": [],
    "dependsOn": [
      "DC-002",
      "DC-003",
      "DC-004"
    ],
    "phase": "F5 · IA generativa y grounding",
    "order": 5,
    "criticality": "Alta",
    "actionRequired": "Configurar manualmente"
  },
  {
    "id": "DC-002",
    "name": "ADL_LibreriaDeDatos__dlm",
    "apiName": "ADL_LibreriaDeDatos__dlm",
    "type": "Data Cloud DMO",
    "source": "dependencias",
    "usedBy": [
      "DC-001"
    ],
    "actions": [],
    "deployClass": "Configuración manual",
    "deployMethod": "Auto (Data Library)",
    "envSpecific": true,
    "envNotes": "",
    "status": "Confirmado",
    "evidence": "sf data query \"SELECT COUNT() FROM ADL_LibreriaDeDatos__dlm\"",
    "risks": [],
    "details": {
      "records": "3"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "F5 · IA generativa y grounding",
    "order": 5,
    "criticality": "Alta",
    "actionRequired": "Configurar manualmente"
  },
  {
    "id": "DC-003",
    "name": "Archivos de grounding (AiGroundingFileRefCustom__dlm)",
    "apiName": "AiGroundingFileRefCustom__dlm",
    "type": "Data Cloud DMO / DataStream AiGroundingFileRef_00D2E0000013ExD (DataSource UploadedFiles)",
    "source": "dependencias",
    "usedBy": [
      "DC-001"
    ],
    "actions": [],
    "deployClass": "Configuración manual",
    "deployMethod": "Subir los mismos PDFs a la Data Library en destino",
    "envSpecific": true,
    "envNotes": "Contenido = datos, no metadata",
    "status": "Confirmado",
    "evidence": "sf data query \"SELECT Name__c, GroundingSourceId__c, FileSize__c FROM AiGroundingFileRefCustom__dlm\"",
    "risks": [
      "Contenido de FAQ depende de 3 PDFs; no versionados en repo."
    ],
    "details": {
      "files": "Preguntas frecuentes Paquetexpress.pdf (45 KB), Aviso de Privacidad Sitio Web Paquetexpress (V. Final 01-07-25).pdf (95 KB), Paquetexpress Info.pdf (142 KB)",
      "grounding_sources": "1Jadh00000008OzCAI, 1Jadh0000000NcXCAU",
      "note": "Cada PDF aparece en 2 grounding sources (2 librerías)"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "F5 · IA generativa y grounding",
    "order": 5,
    "criticality": "Alta",
    "actionRequired": "Configurar manualmente"
  },
  {
    "id": "DC-004",
    "name": "Data Space default",
    "apiName": "default",
    "type": "Data Cloud Data Space",
    "source": "dependencias",
    "usedBy": [
      "DC-001"
    ],
    "actions": [],
    "deployClass": "Elemento existente a validar",
    "deployMethod": "N/A",
    "envSpecific": true,
    "envNotes": "",
    "status": "Confirmado",
    "evidence": "sf data query \"SELECT Id, Name FROM DataSpace\"",
    "risks": [],
    "details": {
      "id": "0vhVn000000003FIAQ"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "F5 · IA generativa y grounding",
    "order": 5,
    "criticality": "Media",
    "actionRequired": "Verificar existencia y configuración"
  },
  {
    "id": "PT-001",
    "name": "FAQ Search",
    "apiName": "FAQ_Search",
    "type": "GenAiPromptTemplate",
    "source": "dependencias",
    "usedBy": [
      "AGT-001"
    ],
    "actions": [
      "General_Information_Management.FAQ_Search",
      "Job_Search.FAQ_Search"
    ],
    "deployClass": "Configuración específica del ambiente",
    "deployMethod": "Metadata API (GenAiPromptTemplate) DESPUÉS de crear Data Library/retriever en destino y ajustar el nombre del retriever",
    "envSpecific": true,
    "envNotes": "El nombre del retriever lleva sufijo generado por org (_1Cx_K4B73f7782b): al recrear la Data Library en prod el nombre cambiará y la plantilla debe editarse.",
    "status": "Confirmado",
    "evidence": "sf project retrieve start -m GenAiPromptTemplate:FAQ_Search; src/main/default/genAiPromptTemplates/FAQ_Search.genAiPromptTemplate-meta.xml",
    "risks": [
      "Retriever con nombre específico del org (no portable).",
      "Versión 6 en Draft sin publicar (riesgo de confusión al editar).",
      "La plantilla inserta los resultados del retriever directamente como 'Response' (sin instrucción de no inventar si no hay resultados).",
      "Retriever/Search Index se genera por org: en prod hay que crear la Data Library, subir archivos, esperar indexación y re-apuntar el template antes de desplegar/activar",
      "Si se despliega tal cual, la acción FAQ falla"
    ],
    "details": {
      "type": "einstein_gpt__flex",
      "visibility": "Global",
      "activeVersionIdentifier": "..._5",
      "versions": "1-4: Published, retriever File_AgentforceLibraryPaqueteExpress_1Cx_K4Bf0c48e50\n5: Published (ACTIVA), retriever File_ADL_LibreriaDeDatos_1Cx_K4B73f7782b\n6: Draft (mismo contenido que v5)",
      "model": "sfdc_ai__DefaultGPT5",
      "inputs": "apiName=Question, type=primitive://String, required=True",
      "grounding": "type=Einstein Retriever (invocable://getEinsteinRetrieverResults), name=File_ADL_LibreriaDeDatos_1Cx_K4B73f7782b, param=searchText={!$Input:Question}",
      "canales/seguridad (INT-009)": "Versión activa _5 (Published) usa retriever File_ADL_LibreriaDeDatos_1Cx_K4B73f7782b; v1-v4 usaban File_AgentforceLibraryPaqueteExpress_1Cx_K4Bf0c48e50; v6 Draft. Modelo sfdc_ai__DefaultGPT5. Sufijo 'K4B' derivado del Org Id del sandbox."
    },
    "aliases": [
      "INT-009"
    ],
    "dependsOn": [
      "RET-001",
      "RET-002",
      "INT-004"
    ],
    "phase": "F5 · IA generativa y grounding",
    "order": 5,
    "criticality": "Crítica",
    "actionRequired": "Ajustar al ambiente y desplegar/configurar"
  },
  {
    "id": "PT-002",
    "name": "Case_Summary_Agentforce",
    "apiName": "Case_Summary_Agentforce",
    "type": "GenAiPromptTemplate",
    "source": "dependencias",
    "usedBy": [
      "APX-005"
    ],
    "actions": [
      "Orden_Management.Crea_caso_seguimiento_de_una_orden_v2A (indirecto)"
    ],
    "deployClass": "Metadata desplegable",
    "deployMethod": "Metadata API (GenAiPromptTemplate) antes que el flow/clase",
    "envSpecific": false,
    "envNotes": "",
    "status": "Confirmado",
    "evidence": "src/main/default/genAiPromptTemplates/Case_Summary_Agentforce.genAiPromptTemplate-meta.xml",
    "risks": [
      "Contrato de formato de salida frágil ({Topic}/{Subject}/{Description}); si el modelo cambia el formato, el caso queda sin Subject/Description.",
      "Dependencia oculta (no aparece en el .agent); desplegar y activar en prod"
    ],
    "details": {
      "type": "einstein_gpt__flex",
      "activeVersion": "_1 Published",
      "model": "sfdc_ai__DefaultGPT5Mini",
      "inputs": "ConversationTranscript, CaseContext, TrackingNumber, OrderStatusSummary, Seguimiento",
      "grounding": "ninguno (solo inputs)",
      "output_contract": "Bloques {Topic} {Subject} {Description} parseados por APX-005",
      "canales/seguridad (INT-010)": "Invocado vía ConnectApi.EinsteinLLM.generateMessagesForPromptTemplate desde Crea_caso_seguimiento_de_una_orden."
    },
    "aliases": [
      "INT-010"
    ],
    "dependsOn": [
      "INT-004"
    ],
    "phase": "F5 · IA generativa y grounding",
    "order": 5,
    "criticality": "Crítica",
    "actionRequired": "Desplegar"
  },
  {
    "id": "RET-001",
    "name": "File_ADL_LibreriaDeDatos (Einstein Retriever)",
    "apiName": "File_ADL_LibreriaDeDatos_1Cx_K4B73f7782b",
    "type": "Einstein Retriever / Agentforce Data Library",
    "source": "dependencias",
    "usedBy": [
      "PT-001"
    ],
    "actions": [
      "FAQ_Search"
    ],
    "deployClass": "Configuración manual",
    "deployMethod": "Manual (Setup > Agentforce Data Library) en destino; no desplegable vía Metadata API en este org",
    "envSpecific": true,
    "envNotes": "Nombre con sufijo de org",
    "status": "Pendiente",
    "evidence": "sf org list metadata-types (sin tipo Retriever); templateDataProviders en FAQ_Search",
    "risks": [
      "Configuración del retriever no verificada."
    ],
    "details": {
      "search_index": "DC-001",
      "note": "No existe tipo de metadata retriever en este org (listMetadataTypes); configuración (campos, filtros, nº resultados) no inspeccionable"
    },
    "aliases": [],
    "dependsOn": [
      "DC-001"
    ],
    "phase": "F5 · IA generativa y grounding",
    "order": 5,
    "criticality": "Crítica",
    "actionRequired": "Configurar manualmente"
  },
  {
    "id": "RET-002",
    "name": "File_AgentforceLibraryPaqueteExpress (retriever legado)",
    "apiName": "File_AgentforceLibraryPaqueteExpress_1Cx_K4Bf0c48e50",
    "type": "Einstein Retriever",
    "source": "dependencias",
    "usedBy": [
      "PT-001"
    ],
    "actions": [],
    "deployClass": "Elemento existente a validar",
    "deployMethod": "N/A",
    "envSpecific": true,
    "envNotes": "",
    "status": "Pendiente",
    "evidence": "FAQ_Search versiones 1-4",
    "risks": [
      "Posible segunda Data Library huérfana (hay 2 GroundingSourceId en AiGroundingFileRefCustom__dlm)."
    ],
    "details": {
      "note": "Solo usado por versiones 1-4 (inactivas) de FAQ_Search"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "F5 · IA generativa y grounding",
    "order": 5,
    "criticality": "Baja",
    "actionRequired": "Verificar existencia y configuración"
  },
  {
    "id": "FLW-001",
    "name": "AG Get and create contact - v3",
    "apiName": "AG_Get_and_create_contact",
    "type": "Flow",
    "source": "dependencias",
    "usedBy": [
      "AGT-001"
    ],
    "actions": [
      "Customer_Verification.AG_Get_and_create_contact"
    ],
    "deployClass": "Metadata desplegable",
    "deployMethod": "Metadata API (Flow) — se despliega la versión activa; activar en destino",
    "envSpecific": true,
    "envNotes": "Usa dato por nombre (Account '7 PUBLICO GENERAL')",
    "status": "Confirmado",
    "evidence": "sf data query --use-tooling-api -o paquetexpress-sandbox -q \"SELECT DeveloperName, ActiveVersionId, LatestVersionId, ActiveVersion.VersionNumber, LatestVersion.VersionNumber FROM FlowDefinition WHERE DeveloperName IN (...)\" (findings/raw/flowdefs.json); sf project retrieve start -m Flow:AG_Get_and_create_contact; _work/handover-v18/src/main/default/flows/AG_Get_and_create_contact.flow-meta.xml",
    "risks": [
      "Busca Account por Name = '7 PUBLICO GENERAL' (hardcode de dato, DATA-001). Si no existe en el destino, el contacto se crea sin cuenta.",
      "Contact se crea con MobilePhone (no Phone). Validation rule Contact.si_telefono_y_correoe_esta_vacio exige Phone o Email: si EmailAdress viene vacío, el insert falla (sin fault path).",
      "Get_Contact_By_Email toma el primer contacto con ese email (sin orden), puede haber duplicados (Duplicate Rules de Contact inactivas).",
      "Sin fault paths en lookups/create."
    ],
    "details": {
      "processType": "AutoLaunchedFlow",
      "status": "Active",
      "label": "AG Get and create contact - v3",
      "apiVersion": "62.0",
      "activeVersion": "3",
      "latestVersion": "3",
      "activeVersionId": "301dh000015pSP0AAM",
      "latestVersionId": "301dh000015pSP0AAM",
      "latest_ne_active": "False",
      "lastModified": "2026-10-09",
      "runInMode": "Default (user context)",
      "io_variables": "contactId (String, out)\nEmail (String, out)\nEmailAdress (String, in/)\nFirstName (String, in/)\nisExistingContact (Boolean, out)\nisVerified (Boolean, out)\nLastName (String, in/)\nPhone (String, in/)\nrecordContact (SObject<Contact>, out)",
      "recordLookups": "Get_Contact_By_Email → Contact [Email EqualTo elementReference:EmailAdress] · fault path: no\nGet_Created_Contact → Contact [Id EqualTo elementReference:newContactId] · fault path: no\nObtiene_cuenta_publico_general → Account [Name EqualTo stringValue:7 PUBLICO GENERAL] · fault path: no",
      "recordCreates": "Crear_Contacto → Contact · asigna: AccountId=elementReference:Obtiene_cuenta_publico_general.Id, Email=elementReference:EmailAdress, FirstName=elementReference:FirstName, LastName=elementReference:LastName, MobilePhone=elementReference:PhoneNormalized · fault path: no",
      "decisions": "name=Existe_el_contacto, rules=[{'rule': 'Si_existe', 'conds': ['Get_Contact_By_Email IsNull booleanValue:false']}, {'rule': 'No_existe_crear', 'conds': ['Get_Contact_By_Email IsNull booleanValue:true']}]",
      "formulas": "—",
      "assignments": "Asigna_contacto_creado: recordContact Assign elementReference:Get_Created_Contact, Asigna_contacto_creado: contactId Assign elementReference:newContactId, Asigna_contacto_creado: Email Assign elementReference:Get_Created_Contact.Email, Asigna_contacto_creado: isVerified Assign booleanValue:true, Asigna_contacto_encontrado: recordContact Assign elementReference:Get_Contact_By_Email, Asigna_contacto_encontrado: contactId Assign elementReference:Get_Contact_By_Email.Id, Asigna_contacto_encontrado: Email Assign elementReference:Get_Contact_By_Email.Email, Asigna_contacto_encontrado: isVerified Assign booleanValue:true, Asigna_contacto_encontrado: isExistingContact Assign booleanValue:true",
      "fault_paths": "Get_Contact_By_Email: False\nGet_Created_Contact: False\nObtiene_cuenta_publico_general: False\nCrear_Contacto: False"
    },
    "aliases": [],
    "dependsOn": [
      "OBJ-002",
      "OBJ-003",
      "DATA-001",
      "FLD-020",
      "FLD-021",
      "FLD-022",
      "FLD-023",
      "FLD-024"
    ],
    "phase": "F6 · Flows del agente",
    "order": 6,
    "criticality": "Crítica",
    "actionRequired": "Desplegar"
  },
  {
    "id": "FLW-002",
    "name": "Crea caso búsqueda de empleo",
    "apiName": "Crea_caso_b_squeda_de_empleo",
    "type": "Flow",
    "source": "dependencias",
    "usedBy": [
      "AGT-001"
    ],
    "actions": [
      "Job_Search.Crea_caso_b_squeda_de_empleo_v2A"
    ],
    "deployClass": "Metadata desplegable",
    "deployMethod": "Metadata API (Flow) — se despliega la versión activa; activar en destino",
    "envSpecific": false,
    "envNotes": "Sin IDs hardcodeados; RecordTypes por DeveloperName",
    "status": "Confirmado",
    "evidence": "sf data query --use-tooling-api -o paquetexpress-sandbox -q \"SELECT DeveloperName, ActiveVersionId, LatestVersionId, ActiveVersion.VersionNumber, LatestVersion.VersionNumber FROM FlowDefinition WHERE DeveloperName IN (...)\" (findings/raw/flowdefs.json); sf project retrieve start -m Flow:Crea_caso_b_squeda_de_empleo; _work/handover-v18/src/main/default/flows/Crea_caso_b_squeda_de_empleo.flow-meta.xml",
    "risks": [
      "Sin fault path en Create_Case / Get_record_type / Get_Case_Record: un error DML (validation rule, picklist restringido, trigger addError) devuelve error genérico al agente.",
      "Get_record_type filtra RecordType solo por DeveloperName (sin SobjectType='Case'); hoy es único (Confirmado), pero frágil.",
      "Depende de Crear_ticket_duplicado__c=true para saltar TriggerTicket.validaTicketDuplicado (APX-006)."
    ],
    "details": {
      "processType": "AutoLaunchedFlow",
      "status": "Active",
      "label": "Crea caso búsqueda de empleo",
      "apiVersion": "62.0",
      "activeVersion": "8",
      "latestVersion": "8",
      "activeVersionId": "301dh00000WvmQfAAJ",
      "latestVersionId": "301dh00000WvmQfAAJ",
      "latest_ne_active": "False",
      "lastModified": "2026-03-24",
      "runInMode": "Default (user context)",
      "io_variables": "caseRecord (SObject<Case>, out)\ncontactRecordId (String, in/)\nDescription (String, in/)\nmedioDeContacto (String, in/)\nSubject (String, in/)",
      "recordLookups": "Get_Case_Record → Case [Id EqualTo elementReference:Create_Case] · fault path: no\nGet_record_type → RecordType [DeveloperName EqualTo stringValue:Direccion_de_vacantes] · fault path: no",
      "recordCreates": "Create_Case → Case · asigna: ContactId=elementReference:contactRecordId, Crear_ticket_duplicado__c=booleanValue:true, Description=elementReference:Description, Medio_de_contacto__c=elementReference:medioDeContacto, Origin=elementReference:medioDeContacto, RecordTypeId=elementReference:Get_record_type.Id, Status=stringValue:Cerrado, Subject=elementReference:Subject · fault path: no",
      "decisions": "name=Medio_de_contacto, rules=[{'rule': 'Requiere_cambio', 'conds': ['medioDeContacto EqualTo stringValue:EmbeddedMessaging']}]",
      "assignments": "Cambio_de_valor: medioDeContacto Assign stringValue:Chat en línea",
      "fault_paths": "Get_Case_Record: False\nGet_record_type: False\nCreate_Case: False"
    },
    "aliases": [],
    "dependsOn": [
      "OBJ-001",
      "OBJ-004",
      "RT-006",
      "FLD-001",
      "FLD-002"
    ],
    "phase": "F6 · Flows del agente",
    "order": 6,
    "criticality": "Crítica",
    "actionRequired": "Desplegar"
  },
  {
    "id": "FLW-003",
    "name": "Crea caso cotizacion internacional",
    "apiName": "Crea_caso_cotizacion_internacional",
    "type": "Flow",
    "source": "dependencias",
    "usedBy": [
      "AGT-001"
    ],
    "actions": [
      "International_Quote_Management.Crea_caso_cotizacion_internacional_v2A"
    ],
    "deployClass": "Metadata desplegable",
    "deployMethod": "Metadata API (Flow) — se despliega la versión activa; activar en destino",
    "envSpecific": false,
    "envNotes": "Sin IDs hardcodeados; RecordTypes por DeveloperName",
    "status": "Confirmado",
    "evidence": "sf data query --use-tooling-api -o paquetexpress-sandbox -q \"SELECT DeveloperName, ActiveVersionId, LatestVersionId, ActiveVersion.VersionNumber, LatestVersion.VersionNumber FROM FlowDefinition WHERE DeveloperName IN (...)\" (findings/raw/flowdefs.json); sf project retrieve start -m Flow:Crea_caso_cotizacion_internacional; _work/handover-v18/src/main/default/flows/Crea_caso_cotizacion_internacional.flow-meta.xml",
    "risks": [
      "Sin fault path en Create_Case / Get_record_type / Get_Case_Record: un error DML (validation rule, picklist restringido, trigger addError) devuelve error genérico al agente.",
      "Get_record_type filtra RecordType solo por DeveloperName (sin SobjectType='Case'); hoy es único (Confirmado), pero frágil.",
      "Depende de Crear_ticket_duplicado__c=true para saltar TriggerTicket.validaTicketDuplicado (APX-006).",
      "Valores fijos de picklist restringidos: Motivo_de_no_env_o__c='Cliente solo se encuentra cotizando', Se_realizo_el_envio__c='Activa' (existen, Confirmado)."
    ],
    "details": {
      "processType": "AutoLaunchedFlow",
      "status": "Active",
      "label": "Crea caso cotizacion internacional",
      "apiVersion": "62.0",
      "activeVersion": "4",
      "latestVersion": "4",
      "activeVersionId": "301dh00000Wy04oAAB",
      "latestVersionId": "301dh00000Wy04oAAB",
      "latest_ne_active": "False",
      "lastModified": "2026-03-24",
      "runInMode": "Default (user context)",
      "io_variables": "caseRecord (SObject<Case>, out)\ncontactRecordId (String, in/)\nDescription (String, in/)\nmedioDeContacto (String, in/)\nSubject (String, in/)",
      "recordLookups": "Get_Case_Record → Case [Id EqualTo elementReference:Create_Case] · fault path: no\nGet_record_type → RecordType [DeveloperName EqualTo stringValue:Cotizacion_de_Envios_Internacionales] · fault path: no",
      "recordCreates": "Create_Case → Case · asigna: ContactId=elementReference:contactRecordId, Crear_ticket_duplicado__c=booleanValue:true, Descripcion_del_Contenido__c=stringValue:cotizar por un agente, Description=elementReference:Description, Medio_de_contacto__c=elementReference:medioDeContacto, Motivo_de_no_env_o__c=stringValue:Cliente solo se encuentra cotizando, Origin=elementReference:medioDeContacto, Pais_destino__c=stringValue:N/A, RecordTypeId=elementReference:Get_record_type.Id, Se_realizo_el_envio__c=stringValue:Activa, Status=stringValue:Cerrado, Subject=elementReference:Subject, Tarifa__c=stringValue:T0 · fault path: no",
      "decisions": "name=Medio_de_contacto, rules=[{'rule': 'Requiere_cambio', 'conds': ['medioDeContacto EqualTo stringValue:EmbeddedMessaging']}]",
      "assignments": "Cambio_de_valor: medioDeContacto Assign stringValue:Chat en línea",
      "fault_paths": "Get_Case_Record: False\nGet_record_type: False\nCreate_Case: False"
    },
    "aliases": [],
    "dependsOn": [
      "OBJ-001",
      "OBJ-004",
      "RT-003",
      "FLD-001",
      "FLD-002",
      "FLD-003",
      "FLD-004",
      "FLD-005",
      "FLD-006",
      "FLD-007"
    ],
    "phase": "F6 · Flows del agente",
    "order": 6,
    "criticality": "Crítica",
    "actionRequired": "Desplegar"
  },
  {
    "id": "FLW-004",
    "name": "Crea caso cotizacion nacional",
    "apiName": "Crea_caso_cotizacion_nacional",
    "type": "Flow",
    "source": "dependencias",
    "usedBy": [
      "AGT-001"
    ],
    "actions": [
      "Quote_Management.Crea_caso_cotizacion_nacional_v2"
    ],
    "deployClass": "Metadata desplegable",
    "deployMethod": "Metadata API (Flow) — se despliega la versión activa; activar en destino",
    "envSpecific": false,
    "envNotes": "Sin IDs hardcodeados; RecordTypes por DeveloperName",
    "status": "Confirmado",
    "evidence": "sf data query --use-tooling-api -o paquetexpress-sandbox -q \"SELECT DeveloperName, ActiveVersionId, LatestVersionId, ActiveVersion.VersionNumber, LatestVersion.VersionNumber FROM FlowDefinition WHERE DeveloperName IN (...)\" (findings/raw/flowdefs.json); sf project retrieve start -m Flow:Crea_caso_cotizacion_nacional; _work/handover-v18/src/main/default/flows/Crea_caso_cotizacion_nacional.flow-meta.xml",
    "risks": [
      "Sin fault path en Create_Case / Get_record_type / Get_Case_Record: un error DML (validation rule, picklist restringido, trigger addError) devuelve error genérico al agente.",
      "Get_record_type filtra RecordType solo por DeveloperName (sin SobjectType='Case'); hoy es único (Confirmado), pero frágil.",
      "Depende de Crear_ticket_duplicado__c=true para saltar TriggerTicket.validaTicketDuplicado (APX-006).",
      "Como_nos_conoci_el_cliente__c (picklist RESTRINGIDO) recibe medioDeContacto: si el canal no está en la lista (p.ej. 'Chat' = valor por defecto de @variables.contactChannel, o cualquier ChannelType distinto de WhatsApp/EmbeddedMessaging) el insert falla. Pendiente validar en runtime.",
      "Assignment usa 'Chat en Línea' (L mayúscula) vs picklist 'Chat en línea'; los datos muestran que Salesforce normaliza mayúsculas (Origin 'WhatsApp'->'Whatsapp'), por lo que probablemente no falla, pero es inconsistente con los otros 6 flows.",
      "Semántica: se escribe el canal en 'Cómo nos conoció el cliente'."
    ],
    "details": {
      "processType": "AutoLaunchedFlow",
      "status": "Active",
      "label": "Crea caso cotizacion nacional",
      "apiVersion": "62.0",
      "activeVersion": "6",
      "latestVersion": "6",
      "activeVersionId": "301dh000014iQf7AAE",
      "latestVersionId": "301dh000014iQf7AAE",
      "latest_ne_active": "False",
      "lastModified": "2026-09-29",
      "runInMode": "Default (user context)",
      "io_variables": "caseRecord (SObject<Case>, out)\ncontactRecordId (String, in/)\nDescription (String, in/)\nmedioDeContacto (String, in/)\nSubject (String, in/)",
      "recordLookups": "Get_Case_Record → Case [Id EqualTo elementReference:Create_Case] · fault path: no\nGet_record_type → RecordType [DeveloperName EqualTo stringValue:Cotizacion_de_Envios_Nacionales] · fault path: no",
      "recordCreates": "Create_Case → Case · asigna: Como_nos_conoci_el_cliente__c=elementReference:medioDeContacto, ContactId=elementReference:contactRecordId, Crear_ticket_duplicado__c=booleanValue:true, Description=elementReference:Description, Descuento__c=stringValue:0%, Desea_cotizacion_por_correo__c=stringValue:No, Medio_de_contacto__c=elementReference:medioDeContacto, Motivo_de_NO_activaci_n__c=stringValue:Otros, Motivo_de_no_env_o__c=stringValue:Cliente solo se encuentra cotizando, Origin=elementReference:medioDeContacto, RecordTypeId=elementReference:Get_record_type.Id, Se_activ_descuento__c=stringValue:NO, Se_ofreci_descuento__c=stringValue:NO, Se_realizo_el_envio__c=stringValue:Activa, Status=stringValue:Cerrado, Subject=elementReference:Subject, Tipo_de_Cotizacion__c=stringValue:Nacional · fault path: no",
      "decisions": "name=Medio_de_contacto, rules=[{'rule': 'Requiere_cambio', 'conds': ['medioDeContacto EqualTo stringValue:EmbeddedMessaging']}]",
      "assignments": "Cambio_de_valor: medioDeContacto Assign stringValue:Chat en Línea",
      "fault_paths": "Get_Case_Record: False\nGet_record_type: False\nCreate_Case: False"
    },
    "aliases": [],
    "dependsOn": [
      "OBJ-001",
      "OBJ-004",
      "RT-004",
      "FLD-001",
      "FLD-002",
      "FLD-005",
      "FLD-007",
      "FLD-009",
      "FLD-010",
      "FLD-011",
      "FLD-012",
      "FLD-013",
      "FLD-014",
      "FLD-015"
    ],
    "phase": "F6 · Flows del agente",
    "order": 6,
    "criticality": "Crítica",
    "actionRequired": "Desplegar"
  },
  {
    "id": "FLW-005",
    "name": "Crea caso seguimiento de una orden",
    "apiName": "Crea_caso_seguimiento_de_una_orden",
    "type": "Flow",
    "source": "dependencias",
    "usedBy": [
      "AGT-001"
    ],
    "actions": [
      "Orden_Management.Crea_caso_seguimiento_de_una_orden_v2A"
    ],
    "deployClass": "Metadata desplegable",
    "deployMethod": "Metadata API (Flow) — se despliega la versión activa; activar en destino",
    "envSpecific": false,
    "envNotes": "Sin IDs hardcodeados; RecordTypes por DeveloperName",
    "status": "Confirmado",
    "evidence": "sf data query --use-tooling-api -o paquetexpress-sandbox -q \"SELECT DeveloperName, ActiveVersionId, LatestVersionId, ActiveVersion.VersionNumber, LatestVersion.VersionNumber FROM FlowDefinition WHERE DeveloperName IN (...)\" (findings/raw/flowdefs.json); sf project retrieve start -m Flow:Crea_caso_seguimiento_de_una_orden; _work/handover-v18/src/main/default/flows/Crea_caso_seguimiento_de_una_orden.flow-meta.xml",
    "risks": [
      "Sin fault path en Create_Case / Get_record_type / Get_Case_Record: un error DML (validation rule, picklist restringido, trigger addError) devuelve error genérico al agente.",
      "Get_record_type filtra RecordType solo por DeveloperName (sin SobjectType='Case'); hoy es único (Confirmado), pero frágil.",
      "Depende de Crear_ticket_duplicado__c=true para saltar TriggerTicket.validaTicketDuplicado (APX-006).",
      "Status='Abierto' NO existe en el picklist Case.Status (no restringido) y el Workflow 'Ticket Cerrado' (WF-003) cierra en create todo caso RT Estatus Solicitud de Servicio -> el caso de RECLAMACIÓN queda 'Cerrado' inmediatamente. Confirmado con datos: 370/370 casos RT Estatus_Solicitud_de_Servicio creados por el usuario del agente están Cerrado.",
      "Cliente_solicito_crear_caso__c (picklist RESTRINGIDO Si/No) recibe el input Seguimiento que el LLM llena (with Seguimiento = ...). 'Sí' con acento u otro valor -> falla DML.",
      "Outputs subject/description de CaseSummaryAgentforceInvocable SOBRESCRIBEN Subject/Description del agente; si la plantilla falla (errorMessage) quedan null -> caso sin asunto/descripción.",
      "Get_Messaging_Transcript (getConvTscpForRecord) sí tiene fault path (único elemento con fault en los 13 flows)."
    ],
    "details": {
      "processType": "AutoLaunchedFlow",
      "status": "Active",
      "label": "Crea caso seguimiento de una orden",
      "apiVersion": "63.0",
      "activeVersion": "13",
      "latestVersion": "13",
      "activeVersionId": "301dh00000lrxzlAAA",
      "latestVersionId": "301dh00000lrxzlAAA",
      "latest_ne_active": "False",
      "lastModified": "2026-06-10",
      "runInMode": "Default (user context)",
      "io_variables": "CaseContext (String, in/)\ncaseRecord (SObject<Case>, out)\ncontactRecordId (String, in/)\nConversationTranscript (String, in/)\nDescription (String, in/)\nmedioDeContacto (String, in/)\nmessagingSessionId (String, in/)\nNumeroDeGuia (String, in/)\nOrderStatusSummary (String, in/)\nSeguimiento (String, in/)\nSubject (String, in/)",
      "recordLookups": "Get_Case_Record → Case [Id EqualTo elementReference:Create_Case] · fault path: no\nGet_record_type → RecordType [DeveloperName EqualTo stringValue:Estatus_Solicitud_de_Servicio] · fault path: no",
      "recordCreates": "Create_Case → Case · asigna: Cliente_solicito_crear_caso__c=elementReference:Seguimiento, ContactId=elementReference:contactRecordId, Crear_ticket_duplicado__c=booleanValue:true, Description=elementReference:Description, Medio_de_contacto__c=elementReference:medioDeContacto, Numero_de_Rastreo__c=elementReference:NumeroDeGuia, Origin=elementReference:medioDeContacto, RecordTypeId=elementReference:Get_record_type.Id, Status=stringValue:Abierto, Subject=elementReference:Subject · fault path: no",
      "actionCalls": "Generate_Case_Summary → apex:CaseSummaryAgentforceInvocable (caseContext=elementReference:CaseContext, channelType=elementReference:medioDeContacto, conversationTranscript=elementReference:ConversationTranscript, orderStatusSummary=elementReference:OrderStatusSummary, seguimiento=elementReference:Seguimiento, trackingNumber=elementReference:NumeroDeGuia)\nGet_Messaging_Transcript → getConvTscpForRecord:getConvTscpForRecord (recordId=elementReference:messagingSessionId, transcriptType=stringValue:PROCESSED)",
      "decisions": "name=Has_Conversation_Transcript, rules=[{'rule': 'Con_transcript', 'conds': ['ConversationTranscript IsNull booleanValue:false', 'ConversationTranscript NotEqualTo stringValue:']}, {'rule': 'Con_case_context', 'conds': ['CaseContext IsNull booleanValue:false', 'CaseContext NotEqualTo stringValue:']}]\nname=Has_Messaging_Session_Id, rules=[{'rule': 'Con_sesion', 'conds': ['messagingSessionId IsNull booleanValue:false', 'messagingSessionId NotEqualTo stringValue:']}]\nname=Medio_de_contacto, rules=[{'rule': 'Requiere_cambio', 'conds': ['medioDeContacto EqualTo stringValue:EmbeddedMessaging']}]",
      "assignments": "Cambio_de_valor: medioDeContacto Assign stringValue:Chat en línea, Set_Transcript_From_Messaging: ConversationTranscript Assign elementReference:platformTranscript",
      "fault_paths": "Get_Case_Record: False\nGet_record_type: False\nCreate_Case: False\nGenerate_Case_Summary: False\nGet_Messaging_Transcript: True"
    },
    "aliases": [],
    "dependsOn": [
      "APX-005",
      "OBJ-001",
      "OBJ-004",
      "OBJ-006",
      "STD-001",
      "RT-005",
      "FLD-001",
      "FLD-002",
      "FLD-008",
      "FLD-016"
    ],
    "phase": "F6 · Flows del agente",
    "order": 6,
    "criticality": "Crítica",
    "actionRequired": "Desplegar"
  },
  {
    "id": "FLW-006",
    "name": "Crea caso solicitud de servicio",
    "apiName": "Crea_caso_solicitud_de_servicio",
    "type": "Flow",
    "source": "dependencias",
    "usedBy": [
      "AGT-001"
    ],
    "actions": [
      "CaseManagement_v2.Crea_caso_solicitud_de_servicio_v2A",
      "Orden_Management.Crea_caso_solicitud_de_servicio_orden"
    ],
    "deployClass": "Metadata desplegable",
    "deployMethod": "Metadata API (Flow) — se despliega la versión activa; activar en destino",
    "envSpecific": false,
    "envNotes": "Sin IDs hardcodeados; RecordTypes por DeveloperName",
    "status": "Confirmado",
    "evidence": "sf data query --use-tooling-api -o paquetexpress-sandbox -q \"SELECT DeveloperName, ActiveVersionId, LatestVersionId, ActiveVersion.VersionNumber, LatestVersion.VersionNumber FROM FlowDefinition WHERE DeveloperName IN (...)\" (findings/raw/flowdefs.json); sf project retrieve start -m Flow:Crea_caso_solicitud_de_servicio; _work/handover-v18/src/main/default/flows/Crea_caso_solicitud_de_servicio.flow-meta.xml",
    "risks": [
      "Sin fault path en Create_Case / Get_record_type / Get_Case_Record: un error DML (validation rule, picklist restringido, trigger addError) devuelve error genérico al agente.",
      "Get_record_type filtra RecordType solo por DeveloperName (sin SobjectType='Case'); hoy es único (Confirmado), pero frágil.",
      "Depende de Crear_ticket_duplicado__c=true para saltar TriggerTicket.validaTicketDuplicado (APX-006).",
      "Usado por 2 acciones en 2 subagentes; Cliente_solicito_crear_caso__c fijo 'Si'.",
      "RT Estatus Solicitud de Servicio + Tipo_de_Entrega__c EAD/OCU dispararía email alerts al contacto (WF-006/WF-007); el flow no setea Tipo_de_Entrega__c, por lo que hoy no aplica."
    ],
    "details": {
      "processType": "AutoLaunchedFlow",
      "status": "Active",
      "label": "Crea caso solicitud de servicio",
      "apiVersion": "62.0",
      "activeVersion": "8",
      "latestVersion": "8",
      "activeVersionId": "301dh000017fcT8AAI",
      "latestVersionId": "301dh000017fcT8AAI",
      "latest_ne_active": "False",
      "lastModified": "2026-10-14",
      "runInMode": "Default (user context)",
      "io_variables": "caseRecord (SObject<Case>, out)\ncontactRecordId (String, in/)\nDescription (String, in/)\nGuia (String, in/)\nmedioDeContacto (String, in/)\nNumeroDeRastreo (String, in/)\nSeguimiento (String, in/)\nSubject (String, in/)",
      "recordLookups": "Get_Case_Record → Case [Id EqualTo elementReference:Create_Case] · fault path: no\nGet_record_type → RecordType [DeveloperName EqualTo stringValue:Estatus_Solicitud_de_Servicio] · fault path: no",
      "recordCreates": "Create_Case → Case · asigna: Cliente_solicito_crear_caso__c=stringValue:Si, ContactId=elementReference:contactRecordId, Crear_ticket_duplicado__c=booleanValue:true, Description=elementReference:Description, Guia__c=elementReference:Guia, Medio_de_contacto__c=elementReference:medioDeContacto, Numero_de_Rastreo__c=elementReference:NumeroDeRastreo, Origin=elementReference:medioDeContacto, RecordTypeId=elementReference:Get_record_type.Id, Status=stringValue:Cerrado, Subject=elementReference:Subject · fault path: no",
      "decisions": "name=Medio_de_contacto, rules=[{'rule': 'Requiere_cambio', 'conds': ['medioDeContacto EqualTo stringValue:EmbeddedMessaging']}]",
      "assignments": "Cambio_de_valor: medioDeContacto Assign stringValue:Chat en línea",
      "fault_paths": "Get_Case_Record: False\nGet_record_type: False\nCreate_Case: False"
    },
    "aliases": [],
    "dependsOn": [
      "OBJ-001",
      "OBJ-004",
      "RT-005",
      "FLD-001",
      "FLD-002",
      "FLD-008",
      "FLD-016",
      "FLD-017"
    ],
    "phase": "F6 · Flows del agente",
    "order": 6,
    "criticality": "Crítica",
    "actionRequired": "Desplegar"
  },
  {
    "id": "FLW-007",
    "name": "Crea caso ver sucursales",
    "apiName": "Crea_caso_ver_sucursales",
    "type": "Flow",
    "source": "dependencias",
    "usedBy": [
      "AGT-001"
    ],
    "actions": [
      "Job_Search.Crea_caso_ver_sucursales_v2A"
    ],
    "deployClass": "Metadata desplegable",
    "deployMethod": "Metadata API (Flow) — se despliega la versión activa; activar en destino",
    "envSpecific": false,
    "envNotes": "Sin IDs hardcodeados; RecordTypes por DeveloperName",
    "status": "Confirmado",
    "evidence": "sf data query --use-tooling-api -o paquetexpress-sandbox -q \"SELECT DeveloperName, ActiveVersionId, LatestVersionId, ActiveVersion.VersionNumber, LatestVersion.VersionNumber FROM FlowDefinition WHERE DeveloperName IN (...)\" (findings/raw/flowdefs.json); sf project retrieve start -m Flow:Crea_caso_ver_sucursales; _work/handover-v18/src/main/default/flows/Crea_caso_ver_sucursales.flow-meta.xml",
    "risks": [
      "Sin fault path en Create_Case / Get_record_type / Get_Case_Record: un error DML (validation rule, picklist restringido, trigger addError) devuelve error genérico al agente.",
      "Get_record_type filtra RecordType solo por DeveloperName (sin SobjectType='Case'); hoy es único (Confirmado), pero frágil.",
      "Depende de Crear_ticket_duplicado__c=true para saltar TriggerTicket.validaTicketDuplicado (APX-006).",
      "Acción expuesta en el subagente Job_Search (no en un subagente de sucursales); revisar si es intencional."
    ],
    "details": {
      "processType": "AutoLaunchedFlow",
      "status": "Active",
      "label": "Crea caso ver sucursales",
      "apiVersion": "62.0",
      "activeVersion": "5",
      "latestVersion": "5",
      "activeVersionId": "301dh00000Wxm4kAAB",
      "latestVersionId": "301dh00000Wxm4kAAB",
      "latest_ne_active": "False",
      "lastModified": "2026-03-24",
      "runInMode": "Default (user context)",
      "io_variables": "caseRecord (SObject<Case>, out)\ncontactRecordId (String, in/)\nDescription (String, in/)\nmedioDeContacto (String, in/)\nSubject (String, in/)",
      "recordLookups": "Get_Case_Record → Case [Id EqualTo elementReference:Create_Case] · fault path: no\nGet_record_type → RecordType [DeveloperName EqualTo stringValue:Direccion_de_Sucursales] · fault path: no",
      "recordCreates": "Create_Case → Case · asigna: ContactId=elementReference:contactRecordId, Crear_ticket_duplicado__c=booleanValue:true, Description=elementReference:Description, Medio_de_contacto__c=elementReference:medioDeContacto, Origin=elementReference:medioDeContacto, RecordTypeId=elementReference:Get_record_type.Id, Status=stringValue:Cerrado, Subject=elementReference:Subject · fault path: no",
      "decisions": "name=Medio_de_contacto, rules=[{'rule': 'Requiere_cambio', 'conds': ['medioDeContacto EqualTo stringValue:EmbeddedMessaging']}]",
      "assignments": "Cambio_de_valor: medioDeContacto Assign stringValue:Chat en línea",
      "fault_paths": "Get_Case_Record: False\nGet_record_type: False\nCreate_Case: False"
    },
    "aliases": [],
    "dependsOn": [
      "OBJ-001",
      "OBJ-004",
      "RT-002",
      "FLD-001",
      "FLD-002"
    ],
    "phase": "F6 · Flows del agente",
    "order": 6,
    "criticality": "Crítica",
    "actionRequired": "Desplegar"
  },
  {
    "id": "FLW-008",
    "name": "Create case Agent paquete",
    "apiName": "Create_case_Agent_paquete",
    "type": "Flow",
    "source": "dependencias",
    "usedBy": [
      "AGT-001"
    ],
    "actions": [
      "General_Information_Management.Create_case_Agent_paquete_v2"
    ],
    "deployClass": "Metadata desplegable",
    "deployMethod": "Metadata API (Flow) — se despliega la versión activa; activar en destino",
    "envSpecific": false,
    "envNotes": "Sin IDs hardcodeados; RecordTypes por DeveloperName",
    "status": "Confirmado",
    "evidence": "sf data query --use-tooling-api -o paquetexpress-sandbox -q \"SELECT DeveloperName, ActiveVersionId, LatestVersionId, ActiveVersion.VersionNumber, LatestVersion.VersionNumber FROM FlowDefinition WHERE DeveloperName IN (...)\" (findings/raw/flowdefs.json); sf project retrieve start -m Flow:Create_case_Agent_paquete; _work/handover-v18/src/main/default/flows/Create_case_Agent_paquete.flow-meta.xml",
    "risks": [
      "Sin fault path en Create_Case / Get_record_type / Get_Case_Record: un error DML (validation rule, picklist restringido, trigger addError) devuelve error genérico al agente.",
      "Get_record_type filtra RecordType solo por DeveloperName (sin SobjectType='Case'); hoy es único (Confirmado), pero frágil.",
      "Depende de Crear_ticket_duplicado__c=true para saltar TriggerTicket.validaTicketDuplicado (APX-006).",
      "No setea Status; WF 'Ticket Cerrado' lo cierra en create (RT Consulta de Información General)."
    ],
    "details": {
      "processType": "AutoLaunchedFlow",
      "status": "Active",
      "label": "Create case Agent paquete",
      "apiVersion": "62.0",
      "activeVersion": "5",
      "latestVersion": "5",
      "activeVersionId": "301dh00000WyBe9AAF",
      "latestVersionId": "301dh00000WyBe9AAF",
      "latest_ne_active": "False",
      "lastModified": "2026-03-24",
      "runInMode": "Default (user context)",
      "io_variables": "caseRecord (SObject<Case>, out)\ncontactRecordId (String, in/)\nDescription (String, in/)\nmedioDeContacto (String, in/)\nSubject (String, in/)",
      "recordLookups": "Get_Case_Record → Case [Id EqualTo elementReference:Create_Case] · fault path: no\nGet_RecordType → RecordType [DeveloperName EqualTo stringValue:Consulta_de_Informacion_General] · fault path: no",
      "recordCreates": "Create_Case → Case · asigna: ContactId=elementReference:contactRecordId, Crear_ticket_duplicado__c=booleanValue:true, Description=elementReference:Description, Medio_de_contacto__c=elementReference:medioDeContacto, Origin=elementReference:medioDeContacto, RecordTypeId=elementReference:Get_RecordType.Id, Subject=elementReference:Subject · fault path: no",
      "decisions": "name=Medio_de_contacto, rules=[{'rule': 'Requiere_cambio', 'conds': ['medioDeContacto EqualTo stringValue:EmbeddedMessaging']}]",
      "assignments": "Cambio_de_valor: medioDeContacto Assign stringValue:Chat en línea",
      "fault_paths": "Get_Case_Record: False\nGet_RecordType: False\nCreate_Case: False"
    },
    "aliases": [],
    "dependsOn": [
      "OBJ-001",
      "OBJ-004",
      "RT-001",
      "FLD-001",
      "FLD-002"
    ],
    "phase": "F6 · Flows del agente",
    "order": 6,
    "criticality": "Crítica",
    "actionRequired": "Desplegar"
  },
  {
    "id": "FLW-009",
    "name": "Obtener Cotización Paquetería",
    "apiName": "Obtener_Cotizaci_n_Paqueter_a",
    "type": "Flow",
    "source": "dependencias",
    "usedBy": [
      "AGT-001"
    ],
    "actions": [
      "Quote_Management.Obtener_Cotizaci_n_Paqueteria_V2"
    ],
    "deployClass": "Metadata desplegable",
    "deployMethod": "Metadata API (Flow) — se despliega la versión activa; activar en destino",
    "envSpecific": false,
    "envNotes": "Sin IDs hardcodeados; RecordTypes por DeveloperName",
    "status": "Confirmado",
    "evidence": "sf data query --use-tooling-api -o paquetexpress-sandbox -q \"SELECT DeveloperName, ActiveVersionId, LatestVersionId, ActiveVersion.VersionNumber, LatestVersion.VersionNumber FROM FlowDefinition WHERE DeveloperName IN (...)\" (findings/raw/flowdefs.json); sf project retrieve start -m Flow:Obtener_Cotizaci_n_Paqueter_a; _work/handover-v18/src/main/default/flows/Obtener_Cotizaci_n_Paqueter_a.flow-meta.xml",
    "risks": [
      "Sin fault path en Get_Quotation (Apex con callout).",
      "Decision solo cubre Code='200' y Code=null; Code='500' (respuesta de negocio del API) cae al Default Outcome sin asignar OutputMessage -> salida vacía al agente.",
      "Si CotizacionEnvioV2 devuelve lista vacía (HTTP!=200 o excepción) el runtime de Flow lanza error de tamaño de resultados (Pendiente verificar en runtime)."
    ],
    "details": {
      "processType": "AutoLaunchedFlow",
      "status": "Active",
      "label": "Obtener Cotización Paquetería",
      "apiVersion": "62.0",
      "activeVersion": "2",
      "latestVersion": "2",
      "activeVersionId": "301dh00000F6buAAAR",
      "latestVersionId": "301dh00000F6buAAAR",
      "latest_ne_active": "False",
      "lastModified": "2025-10-22",
      "runInMode": "Default (user context)",
      "io_variables": "ALTO (String, in/)\namt (Number, in/)\nANCHO (String, in/)\nCP_Destino (String, in/)\nCP_ORIGEN (String, in/)\nEAD (String, in/)\nIVPF (String, in/)\nLARGO (String, in/)\nOutputMessage (String, out)\nPESO (String, in/)\nRAD (String, in/)\nTIPO_PAQUETERIA (String, in/)",
      "actionCalls": "Get_Quotation → apex:CotizacionEnvioV2 (alto=elementReference:ALTO, amt=elementReference:amt, ancho=elementReference:ANCHO, cpDestino=elementReference:CP_Destino, cpOrigen=elementReference:CP_ORIGEN, EAD=elementReference:EAD, IVPF=elementReference:IVPF, largo=elementReference:LARGO, peso=elementReference:PESO, RAD=elementReference:RAD, tipo=elementReference:TIPO_PAQUETERIA)",
      "decisions": "name=Respondio_el_servicio, rules=[{'rule': 'Code_200', 'conds': ['Code EqualTo stringValue:200']}, {'rule': 'Code_Null', 'conds': ['Code IsNull booleanValue:true']}]",
      "textTemplates": "name=OutputMessageForm, text=<p>Su paquete puede ser enviado bajo los siguientes costos aproximados: {!LIST_OPTIONS}</p>",
      "assignments": "Assignment_Output_Message_200: OutputMessage Assign elementReference:OutputMessageForm, Assignment_Output_Message_Null: OutputMessage Assign stringValue:Su paquete no pudo ser cotizado",
      "fault_paths": "Get_Quotation: False"
    },
    "aliases": [],
    "dependsOn": [
      "APX-002"
    ],
    "phase": "F6 · Flows del agente",
    "order": 6,
    "criticality": "Crítica",
    "actionRequired": "Desplegar"
  },
  {
    "id": "FLW-010",
    "name": "Obtener estatus de la orden",
    "apiName": "PE_GetOrderStatus",
    "type": "Flow",
    "source": "dependencias",
    "usedBy": [
      "AGT-001"
    ],
    "actions": [
      "Orden_Management.Obtener_estatus_de_la_orden"
    ],
    "deployClass": "Metadata desplegable",
    "deployMethod": "Metadata API (Flow) — se despliega la versión activa; activar en destino",
    "envSpecific": false,
    "envNotes": "Sin IDs hardcodeados; RecordTypes por DeveloperName",
    "status": "Confirmado",
    "evidence": "sf data query --use-tooling-api -o paquetexpress-sandbox -q \"SELECT DeveloperName, ActiveVersionId, LatestVersionId, ActiveVersion.VersionNumber, LatestVersion.VersionNumber FROM FlowDefinition WHERE DeveloperName IN (...)\" (findings/raw/flowdefs.json); sf project retrieve start -m Flow:PE_GetOrderStatus; _work/handover-v18/src/main/default/flows/PE_GetOrderStatus.flow-meta.xml",
    "risks": [
      "Sin fault path en Get_Order_Status (callout). RastreoEnvio devuelve lista vacía ante error -> probable error de Flow en vez de la rama 'Null' (Pendiente verificar).",
      "Variable de salida con typo 'OutpoutMessage' (contrato con el agente; no renombrar sin actualizar el .agent)."
    ],
    "details": {
      "processType": "AutoLaunchedFlow",
      "status": "Active",
      "label": "Obtener estatus de la orden",
      "apiVersion": "62.0",
      "activeVersion": "1",
      "latestVersion": "1",
      "activeVersionId": "301Vn00000MFUSbIAP",
      "latestVersionId": "301Vn00000MFUSbIAP",
      "latest_ne_active": "False",
      "lastModified": "2025-01-29",
      "runInMode": "Default (user context)",
      "io_variables": "NUMERO_RASTREO (String, in/)\nOutpoutMessage (String, out)",
      "actionCalls": "Get_Order_Status → apex:RastreoEnvio (sOrderNumber=elementReference:NUMERO_RASTREO)",
      "decisions": "name=Status_Null, rules=[{'rule': 'No_Null', 'conds': ['status IsNull booleanValue:false']}, {'rule': 'Null', 'conds': ['status IsNull booleanValue:true']}]",
      "assignments": "Assignment_Error: OutpoutMessage Assign stringValue:Lo siento no encuentro con la información de rastreo, Assignment_salida: ciudadDestino Assign elementReference:Get_Order_Status.ciudadDestino, Assignment_salida: fecha Assign elementReference:Get_Order_Status.fecha, Assignment_salida: guia Assign elementReference:Get_Order_Status.guia, Assignment_salida: hora Assign elementReference:Get_Order_Status.hora, Assignment_salida: promesa Assign elementReference:Get_Order_Status.promesa, Assignment_salida: rastreo Assign elementReference:Get_Order_Status.rastreo, Assignment_salida: referencia Assign elementReference:Get_Order_Status.referencia, Assignment_salida: status Assign elementReference:Get_Order_Status.status, Assignment_salida: sucursalDestino Assign elementReference:Get_Order_Status.sucursalDestino, Assignment_salida: sucursalOrigen Assign elementReference:Get_Order_Status.sucursalOr",
      "fault_paths": "Get_Order_Status: False"
    },
    "aliases": [],
    "dependsOn": [
      "APX-003"
    ],
    "phase": "F6 · Flows del agente",
    "order": 6,
    "criticality": "Crítica",
    "actionRequired": "Desplegar"
  },
  {
    "id": "FLW-011",
    "name": "Obtener Código postal destino válido",
    "apiName": "PE_GetValidDestinationPostalCode",
    "type": "Flow",
    "source": "dependencias",
    "usedBy": [
      "AGT-001"
    ],
    "actions": [
      "Quote_Management.Obtener_Codigo_postal_destino_valido_v2A"
    ],
    "deployClass": "Metadata desplegable",
    "deployMethod": "Metadata API (Flow) — se despliega la versión activa; activar en destino",
    "envSpecific": false,
    "envNotes": "Sin IDs hardcodeados; RecordTypes por DeveloperName",
    "status": "Confirmado",
    "evidence": "sf data query --use-tooling-api -o paquetexpress-sandbox -q \"SELECT DeveloperName, ActiveVersionId, LatestVersionId, ActiveVersion.VersionNumber, LatestVersion.VersionNumber FROM FlowDefinition WHERE DeveloperName IN (...)\" (findings/raw/flowdefs.json); sf project retrieve start -m Flow:PE_GetValidDestinationPostalCode; _work/handover-v18/src/main/default/flows/PE_GetValidDestinationPostalCode.flow-meta.xml",
    "risks": [
      "Sin fault path. Variable interna 'Origen' vale 'Destino' (nombre engañoso, funcionalmente correcto).",
      "Mensaje de error de Apex (ex.getMessage + línea) puede llegar al cliente vía OutputMessage."
    ],
    "details": {
      "processType": "AutoLaunchedFlow",
      "status": "Active",
      "label": "Obtener Código postal destino válido",
      "apiVersion": "62.0",
      "activeVersion": "1",
      "latestVersion": "1",
      "activeVersionId": "301Vn00000MFUSdIAP",
      "latestVersionId": "301Vn00000MFUSdIAP",
      "latest_ne_active": "False",
      "lastModified": "2025-01-29",
      "runInMode": "Default (user context)",
      "io_variables": "CP_Destino (String, in/)\nOutputMessage (String, out)",
      "actionCalls": "Valida_codigo_postal_origen → apex:validaCodigo2 (codigoPostal=elementReference:CP_Destino, tipo=elementReference:Origen)",
      "decisions": "name=Es_v_lido, rules=[{'rule': 'Si_es_Valido', 'conds': ['Valida_codigo_postal_origen.valido EqualTo booleanValue:true']}, {'rule': 'No_es_Valido', 'conds': ['Valida_codigo_postal_origen.valido EqualTo booleanValue:false']}]",
      "assignments": "Assignmet_Output_message_No_v_lido: OutputMessage Assign elementReference:Valida_codigo_postal_origen.mensaje, Assignmet_Output_message_Valido: OutputMessage Assign stringValue:Código Postal  válido",
      "fault_paths": "Valida_codigo_postal_origen: False"
    },
    "aliases": [],
    "dependsOn": [
      "APX-004"
    ],
    "phase": "F6 · Flows del agente",
    "order": 6,
    "criticality": "Crítica",
    "actionRequired": "Desplegar"
  },
  {
    "id": "FLW-012",
    "name": "Obtener Código postal origen válido",
    "apiName": "PE_GetValidOriginPostalCode",
    "type": "Flow",
    "source": "dependencias",
    "usedBy": [
      "AGT-001"
    ],
    "actions": [
      "Quote_Management.Obtener_Codigo_postal_origen_valido_v2A"
    ],
    "deployClass": "Metadata desplegable",
    "deployMethod": "Metadata API (Flow) — se despliega la versión activa; activar en destino",
    "envSpecific": false,
    "envNotes": "Sin IDs hardcodeados; RecordTypes por DeveloperName",
    "status": "Confirmado",
    "evidence": "sf data query --use-tooling-api -o paquetexpress-sandbox -q \"SELECT DeveloperName, ActiveVersionId, LatestVersionId, ActiveVersion.VersionNumber, LatestVersion.VersionNumber FROM FlowDefinition WHERE DeveloperName IN (...)\" (findings/raw/flowdefs.json); sf project retrieve start -m Flow:PE_GetValidOriginPostalCode; _work/handover-v18/src/main/default/flows/PE_GetValidOriginPostalCode.flow-meta.xml",
    "risks": [
      "Sin fault path.",
      "Mensaje de error de Apex puede llegar al cliente vía OutputMessage."
    ],
    "details": {
      "processType": "AutoLaunchedFlow",
      "status": "Active",
      "label": "Obtener Código postal origen válido",
      "apiVersion": "62.0",
      "activeVersion": "1",
      "latestVersion": "1",
      "activeVersionId": "301Vn00000MFUSeIAP",
      "latestVersionId": "301Vn00000MFUSeIAP",
      "latest_ne_active": "False",
      "lastModified": "2025-01-29",
      "runInMode": "Default (user context)",
      "io_variables": "CP_ORIGEN (String, in/)\nOutputMessage (String, out)",
      "actionCalls": "Valida_codigo_postal_origen → apex:validaCodigo2 (codigoPostal=elementReference:CP_ORIGEN, tipo=elementReference:Origen)",
      "decisions": "name=Es_v_lido, rules=[{'rule': 'Si_es_Valido', 'conds': ['Valida_codigo_postal_origen.valido EqualTo booleanValue:true']}, {'rule': 'No_es_Valido', 'conds': ['Valida_codigo_postal_origen.valido EqualTo booleanValue:false']}]",
      "assignments": "Assignmet_Output_message_No_v_lido: OutputMessage Assign elementReference:Valida_codigo_postal_origen.mensaje, Assignmet_Output_message_Valido: OutputMessage Assign stringValue:Código Postal  válido",
      "fault_paths": "Valida_codigo_postal_origen: False"
    },
    "aliases": [],
    "dependsOn": [
      "APX-004"
    ],
    "phase": "F6 · Flows del agente",
    "order": 6,
    "criticality": "Crítica",
    "actionRequired": "Desplegar"
  },
  {
    "id": "FLW-013",
    "name": "AddCaseComment",
    "apiName": "SvcCopilotTmpl__AddCaseComment",
    "type": "Flow (plantilla estándar de plataforma, namespace SvcCopilotTmpl)",
    "source": "dependencias",
    "usedBy": [
      "AGT-001"
    ],
    "actions": [
      "CaseManagement_v2.AddCaseComment_v2A"
    ],
    "deployClass": "Elemento existente a validar",
    "deployMethod": "No se despliega: plantilla provista por la plataforma (Agentforce Service). Debe existir/estar habilitada en el org destino",
    "envSpecific": false,
    "envNotes": "No aparece en FlowDefinition ni en listMetadata Flow ni en InstalledSubscriberPackage; sí existe como acción invocable /actions/custom/flow/SvcCopilotTmpl__AddCaseComment",
    "status": "Confirmado",
    "evidence": "sf api request rest /services/data/v65.0/actions/custom/flow/SvcCopilotTmpl__AddCaseComment; Tooling FlowDefinition WHERE NamespacePrefix='SvcCopilotTmpl' -> 0 filas",
    "risks": [
      "Lógica interna no inspeccionable (no retrievable); comportamiento controlado por Salesforce y puede cambiar por release."
    ],
    "details": {
      "inputs": "caseComment:STRING, caseRecord:SOBJECT",
      "outputs": "outcomeMessage:STRING",
      "namespace": "SvcCopilotTmpl",
      "installed_package": "False"
    },
    "aliases": [],
    "dependsOn": [
      "OBJ-001",
      "OBJ-005"
    ],
    "phase": "F6 · Flows del agente",
    "order": 6,
    "criticality": "Crítica",
    "actionRequired": "Verificar existencia y configuración"
  },
  {
    "id": "FLW-014",
    "name": "GetCaseByCaseNumber",
    "apiName": "SvcCopilotTmpl__GetCaseByCaseNumber",
    "type": "Flow (plantilla estándar de plataforma, namespace SvcCopilotTmpl)",
    "source": "dependencias",
    "usedBy": [
      "AGT-001"
    ],
    "actions": [
      "CaseManagement_v2.GetCaseByCaseNumber_v2A"
    ],
    "deployClass": "Elemento existente a validar",
    "deployMethod": "No se despliega: plantilla provista por la plataforma (Agentforce Service). Debe existir/estar habilitada en el org destino",
    "envSpecific": false,
    "envNotes": "No aparece en FlowDefinition ni en listMetadata Flow ni en InstalledSubscriberPackage; sí existe como acción invocable /actions/custom/flow/SvcCopilotTmpl__GetCaseByCaseNumber",
    "status": "Confirmado",
    "evidence": "sf api request rest /services/data/v65.0/actions/custom/flow/SvcCopilotTmpl__GetCaseByCaseNumber; Tooling FlowDefinition WHERE NamespacePrefix='SvcCopilotTmpl' -> 0 filas",
    "risks": [
      "Lógica interna no inspeccionable (no retrievable); comportamiento controlado por Salesforce y puede cambiar por release."
    ],
    "details": {
      "inputs": "caseNumber:STRING, contactRecord:SOBJECT",
      "outputs": "caseRecord:SOBJECT(Case)",
      "namespace": "SvcCopilotTmpl",
      "installed_package": "False"
    },
    "aliases": [],
    "dependsOn": [
      "OBJ-001",
      "OBJ-002"
    ],
    "phase": "F6 · Flows del agente",
    "order": 6,
    "criticality": "Crítica",
    "actionRequired": "Verificar existencia y configuración"
  },
  {
    "id": "FLW-015",
    "name": "GetCasesForContact",
    "apiName": "SvcCopilotTmpl__GetCasesForContact",
    "type": "Flow (plantilla estándar de plataforma, namespace SvcCopilotTmpl)",
    "source": "dependencias",
    "usedBy": [
      "AGT-001"
    ],
    "actions": [
      "CaseManagement_v2.GetAllCasesForContact"
    ],
    "deployClass": "Elemento existente a validar",
    "deployMethod": "No se despliega: plantilla provista por la plataforma (Agentforce Service). Debe existir/estar habilitada en el org destino",
    "envSpecific": false,
    "envNotes": "No aparece en FlowDefinition ni en listMetadata Flow ni en InstalledSubscriberPackage; sí existe como acción invocable /actions/custom/flow/SvcCopilotTmpl__GetCasesForContact",
    "status": "Confirmado",
    "evidence": "sf api request rest /services/data/v65.0/actions/custom/flow/SvcCopilotTmpl__GetCasesForContact; Tooling FlowDefinition WHERE NamespacePrefix='SvcCopilotTmpl' -> 0 filas",
    "risks": [
      "Lógica interna no inspeccionable (no retrievable); comportamiento controlado por Salesforce y puede cambiar por release."
    ],
    "details": {
      "inputs": "contactRecord:SOBJECT",
      "outputs": "caseList:SOBJECT(Case)",
      "namespace": "SvcCopilotTmpl",
      "installed_package": "False"
    },
    "aliases": [],
    "dependsOn": [
      "OBJ-001",
      "OBJ-002"
    ],
    "phase": "F6 · Flows del agente",
    "order": 6,
    "criticality": "Crítica",
    "actionRequired": "Verificar existencia y configuración"
  },
  {
    "id": "STD-001",
    "name": "getConvTscpForRecord",
    "apiName": "getConvTscpForRecord",
    "type": "Acción estándar (Flow core action)",
    "source": "dependencias",
    "usedBy": [
      "FLW-005"
    ],
    "actions": [],
    "deployClass": "Elemento existente a validar",
    "deployMethod": "Plataforma",
    "envSpecific": false,
    "envNotes": "",
    "status": "Confirmado",
    "evidence": "FLW-005",
    "risks": [],
    "details": {
      "inputs": "recordId=messagingSessionId, transcriptType=PROCESSED",
      "fault_path": "True"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "F6 · Flows del agente",
    "order": 6,
    "criticality": "Alta",
    "actionRequired": "Verificar existencia y configuración"
  },
  {
    "id": "STD-002",
    "name": "routeWork",
    "apiName": "routeWork",
    "type": "Acción estándar Omni-Channel",
    "source": "dependencias",
    "usedBy": [
      "FLW-016"
    ],
    "actions": [],
    "deployClass": "Elemento existente a validar",
    "deployMethod": "Plataforma",
    "envSpecific": false,
    "envNotes": "",
    "status": "Confirmado",
    "evidence": "FLW-016",
    "risks": [],
    "details": {},
    "aliases": [],
    "dependsOn": [],
    "phase": "F6 · Flows del agente",
    "order": 6,
    "criticality": "Alta",
    "actionRequired": "Verificar existencia y configuración"
  },
  {
    "id": "PS-001",
    "name": "Permission set del agente",
    "apiName": "Agentforce_Paquete_Express_Permissions",
    "type": "PermissionSet",
    "source": "curado",
    "usedBy": [
      "USR-001"
    ],
    "actions": [],
    "deployClass": "Metadata desplegable",
    "deployMethod": "Metadata API (PermissionSet)",
    "envSpecific": false,
    "envNotes": "",
    "status": "Confirmado",
    "evidence": "retrieve PermissionSet + SOQL ObjectPermissions / FieldPermissions / SetupEntityAccess",
    "risks": [
      "Sin acceso a RastreoEnvio, CotizacionEnvioV2, validaCodigo2 ni CaseSummaryAgentforceInvocable (ver SEC-014..017).",
      "ModifyAll/ViewAll en Sucursal__c y Delete en Case/Contact exceden lo que usan las acciones."
    ],
    "details": {
      "objetos": "Case CRED · Contact CRED · Account CRE · MessagingSession RE · MessagingEndUser R · Sucursal__c CRED+ViewAll+ModifyAll",
      "FLS": "Cubre los campos que escriben Crea_caso_* y AG_Get_and_create_contact",
      "recordTypes": "6 RT de Case visibles",
      "Apex": "Solo CheckBusinessHours",
      "última modificación": "2026-08-26 en el sandbox (delta respecto de producción)"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "F7 · Seguridad e identidad",
    "order": 7,
    "criticality": "Crítica",
    "actionRequired": "Desplegar"
  },
  {
    "id": "PS-002",
    "name": "Permission sets estándar de Agentforce Service Agent",
    "apiName": "AgentforceServiceAgentUserPsg · AgentforceServiceAgentUser · AgentforceServiceAgentBase · AgentforceServiceAgentSecureBase · EinsteinGPTPromptTemplateUser",
    "type": "PermissionSetGroup / PermissionSet (estándar)",
    "source": "curado",
    "usedBy": [
      "USR-001"
    ],
    "actions": [],
    "deployClass": "Elemento existente a validar",
    "deployMethod": "Estándar: asignar en destino",
    "envSpecific": false,
    "envNotes": "",
    "status": "Confirmado",
    "evidence": "SOQL PermissionSetAssignment",
    "risks": [],
    "details": {
      "licencias": "Einstein Agent (UserLicense) + Agentforce Service Agent User (PSL)"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "F7 · Seguridad e identidad",
    "order": 7,
    "criticality": "Crítica",
    "actionRequired": "Verificar existencia y configuración"
  },
  {
    "id": "USR-001",
    "name": "Usuario del agente",
    "apiName": "agentforce_paquete_express@00d2e0000013exd.ext.qa2020",
    "type": "User (Einstein Agent User)",
    "source": "dependencias",
    "usedBy": [
      "AGT-001"
    ],
    "actions": [],
    "deployClass": "Configuración específica del ambiente",
    "deployMethod": "Manual: crear usuario en destino y actualizar default_agent_user en el .agent",
    "envSpecific": true,
    "envNotes": "Username con sufijo .qa2020 hardcodeado en el bundle",
    "status": "Confirmado",
    "evidence": "sf data query User / PermissionSetAssignment",
    "risks": [
      "default_agent_user específico del sandbox.",
      "Valida_Tickets__c=false es requisito para no disparar VR obligadoProUser."
    ],
    "details": {
      "id": "005Vn000004fBRpIAM",
      "profile": "Einstein Agent User",
      "timezone": "America/Mazatlan",
      "Valida_Tickets__c": "False",
      "permission_sets": "18",
      "key_ps": "Agentforce_Paquete_Express_Permissions, NextGen_1bYdh00000013NFEAY_Permissions (Paquete_Express_vX), AgentforceServiceAgentUser, EinsteinGPTPromptTemplateUser, GLP_RAD_Agentforce"
    },
    "aliases": [],
    "dependsOn": [
      "PS-001",
      "PS-002"
    ],
    "phase": "F7 · Seguridad e identidad",
    "order": 7,
    "criticality": "Crítica",
    "actionRequired": "Ajustar al ambiente y desplegar/configurar"
  },
  {
    "id": "FLW-016",
    "name": "FDE Route to Agent",
    "apiName": "FDE_Route_to_ASA",
    "type": "Flow (Omni-Channel RoutingFlow)",
    "source": "dependencias",
    "usedBy": [
      "AGT-001"
    ],
    "actions": [
      "connection messaging.outbound_route_name",
      "connection customer_web_client.outbound_route_name"
    ],
    "deployClass": "Configuración específica del ambiente",
    "deployMethod": "Metadata API (Flow) + activar; requiere Queue/ServiceChannel existentes",
    "envSpecific": true,
    "envNotes": "serviceChannelId=0N92E000000DcLRSA0 y queueId=00G2E000008f2uRUAQ HARDCODEADOS. Prefijo 2E = creados antes del refresh (probablemente iguales en prod), pero se debe verificar en el org destino.",
    "status": "Confirmado",
    "evidence": "_work/handover-v18/src/main/default/flows/FDE_Route_to_ASA.flow-meta.xml; sf data query \"SELECT Id, DeveloperName FROM ServiceChannel\"; sf data query \"SELECT Id, DeveloperName, Name FROM Group WHERE Id='00G2E000008f2uRUAQ'\"",
    "risks": [
      "IDs hardcodeados de ServiceChannel y Queue en routeWork (isQueueVariable=false).",
      "Queue DeveloperName 'PaquetePrueba' (label WhatsApp) y routing config 'Pruebapaquete': nombre de prueba aunque tiene 50 miembros.",
      "Sin fault path en RoutingAction.",
      "Nombre del flow 'Route_to_ASA' pero enruta a cola humana WhatsApp (label 'FDE Route to Agent').",
      "IDs hardcodeados (prefijo 2E = existían en prod al refresh, validar)",
      "Web y WhatsApp escalan a la misma cola 'WhatsApp'",
      "Sin manejo de error: si la cola no existe el escalamiento falla"
    ],
    "details": {
      "processType": "RoutingFlow",
      "status": "Active",
      "label": "FDE Route to Agent",
      "apiVersion": "64.0",
      "activeVersion": "2",
      "latestVersion": "2",
      "activeVersionId": "301dh000015Xt2LAAS",
      "latestVersionId": "301dh000015Xt2LAAS",
      "latest_ne_active": "False",
      "lastModified": "2026-10-07",
      "runInMode": "Default (user context)",
      "io_variables": "recordId (String, in/)",
      "actionCalls": "RoutingAction → routeWork:routeWork (recordId=elementReference:recordId, serviceChannelId=stringValue:0N92E000000DcLRSA0, serviceChannelLabel=stringValue:Mensajería, serviceChannelDevName=stringValue:sfdc_livemessage, routingType=stringValue:QueueBased, routingConfigId=None, routingConfigLabel=None, queueId=stringValue:00G2E000008f2uRUAQ, agentId=None, agentLabel=None, queueLabel=stringValue:WhatsApp, skillOption=None, skillRequirementsResourceItem=None, botId=None, botLabel=None, externalConversationBotId=None, externalConversationBotLabel=None, copilotId=None, copilotLabel=None, agentforceEmployeeAgentId=None, agentforceEmployeeAgentLabel=None, digitalWorkerId=None, digitalWorkerLabel=None, isQueueVariable=booleanValue:false)",
      "fault_paths": "RoutingAction: False",
      "routeWork_inputs": "recordId=elementReference:recordId, serviceChannelId=stringValue:0N92E000000DcLRSA0, serviceChannelLabel=stringValue:Mensajería, serviceChannelDevName=stringValue:sfdc_livemessage, routingType=stringValue:QueueBased, routingConfigId=None, routingConfigLabel=None, queueId=stringValue:00G2E000008f2uRUAQ, agentId=None, agentLabel=None, queueLabel=stringValue:WhatsApp, skillOption=None, skillRequirementsResourceItem=None, botId=None, botLabel=None, externalConversationBotId=None, externalConversationBotLabel=None, copilotId=None, copilotLabel=None, agentforceEmployeeAgentId=None, agentforceEmployeeAgentLabel=None, digitalWorkerId=None, digitalWorkerLabel=None, isQueueVariable=booleanValue:false",
      "canales/seguridad (OMNI-001)": "Un único routeWork: routingType=QueueBased, queueId 00G2E000008f2uRUAQ (cola 'WhatsApp' / DeveloperName PaquetePrueba), serviceChannelId 0N92E000000DcLRSA0 (sfdc_livemessage 'Mensajería'). Sin skills, sin decisiones, sin faultConnector, sin fallback, sin chequeo de horario ni de disponibilidad. Usado por ambas conexiones (web y WhatsApp)."
    },
    "aliases": [
      "OMNI-001"
    ],
    "dependsOn": [
      "OBJ-006",
      "QUE-001",
      "SCH-001",
      "STD-002"
    ],
    "phase": "F8 · Omni-Channel y enrutamiento",
    "order": 8,
    "criticality": "Crítica",
    "actionRequired": "Ajustar al ambiente y desplegar/configurar"
  },
  {
    "id": "OMNI-002",
    "name": "Routes to Messaging Agent (entrada WhatsApp → vX)",
    "apiName": "Routes_to_Messaging_Agent",
    "type": "Flow RoutingFlow",
    "source": "canales",
    "usedBy": [
      "AGT-002"
    ],
    "actions": [],
    "deployClass": "Configuración específica del ambiente",
    "deployMethod": "Específico ambiente",
    "envSpecific": true,
    "envNotes": "",
    "status": "Confirmado",
    "statusNote": "Activo",
    "evidence": "flows/Routes_to_Messaging_Agent.flow-meta.xml",
    "risks": [
      "copilotId y queueId creados en sandbox (prefijo dh) → no existirán en prod; editar tras crear agente/cola",
      "Si se despliega sin cambiar, WhatsApp no llega al agente"
    ],
    "details": {
      "detalle": "routeWork routingType=Copilot, copilotId 0Xxdh0000005iq1CAA (Paquete_Express_vX), queueId 00Gdh000002KTazEAG (Agentes AI), serviceChannelId 0N92E000000DcLRSA0. Sin fault path."
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "F8 · Omni-Channel y enrutamiento",
    "order": 8,
    "criticality": "Alta",
    "actionRequired": "Ajustar al ambiente y desplegar/configurar"
  },
  {
    "id": "OMNI-003",
    "name": "Routes to Messaging Agent Web",
    "apiName": "Routes_to_Messaging_Agent_Web",
    "type": "Flow RoutingFlow",
    "source": "canales",
    "usedBy": [
      "AGT-002"
    ],
    "actions": [],
    "deployClass": "Elemento existente a validar",
    "deployMethod": "Validar existente",
    "envSpecific": true,
    "envNotes": "",
    "status": "Confirmado",
    "statusNote": "Activo",
    "evidence": "flows/Routes_to_Messaging_Agent_Web.flow-meta.xml",
    "risks": [
      "Apunta a otro agente; confirmar qué canal web va a prod"
    ],
    "details": {
      "detalle": "routingType=Copilot → 0Xxdh0000005T7pCAE (Paquetexpress_Service_Agent_Split), cola Agentes_IA_WEB 00Gdh000003w4BCEAY."
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "F8 · Omni-Channel y enrutamiento",
    "order": 8,
    "criticality": "Media",
    "actionRequired": "Verificar existencia y configuración"
  },
  {
    "id": "AGT-001",
    "name": "Agent Script V18",
    "apiName": "Paquete_Express_vX_18",
    "type": "AiAuthoringBundle",
    "source": "curado",
    "usedBy": [],
    "actions": [],
    "deployClass": "Metadata desplegable",
    "deployMethod": "Metadata API (AiAuthoringBundle) + sf agent publish authoring-bundle",
    "envSpecific": true,
    "envNotes": "default_agent_user lleva el username del sandbox (.qa2020). El <target> del bundle-meta.xml referencia la BotVersion v18 del sandbox; en producción la versión publicada tendrá otro número.",
    "status": "Confirmado",
    "evidence": "sf project retrieve start -m AiAuthoringBundle:Paquete_Express_vX_18 → _work/handover-v18/src/main/default/aiAuthoringBundles/Paquete_Express_vX_18/",
    "risks": [
      "Editar default_agent_user antes de desplegar.",
      "Retirar o ajustar <target> en bundle-meta.xml para que el publish cree la versión correcta en producción (PENDIENTE DE VERIFICACIÓN en prod)."
    ],
    "details": {
      "target": "Paquete_Express_vX.v18",
      "versionTag": "Version 9.2 final",
      "versionDescription": "Xime realizo modificación sobre este de cotizacion nacional",
      "líneas": "2002",
      "subagentes": "10 + router",
      "modelo": "sfdc_ai__DefaultGPT4Omni",
      "locale": "es_MX (+ es)"
    },
    "aliases": [],
    "dependsOn": [
      "FLW-001",
      "FLW-002",
      "FLW-003",
      "FLW-004",
      "FLW-005",
      "FLW-006",
      "FLW-007",
      "FLW-008",
      "FLW-009",
      "FLW-010",
      "FLW-011",
      "FLW-012",
      "FLW-016",
      "FLW-013",
      "FLW-014",
      "FLW-015",
      "APX-001",
      "PT-001",
      "USR-001",
      "AGT-002"
    ],
    "phase": "F9 · Agente",
    "order": 9,
    "criticality": "Crítica",
    "actionRequired": "Desplegar"
  },
  {
    "id": "AGT-002",
    "name": "Bot + BotVersion (agente publicado)",
    "apiName": "Paquete_Express_vX",
    "type": "Bot / BotVersion",
    "source": "curado",
    "usedBy": [
      "AGT-001"
    ],
    "actions": [],
    "deployClass": "Requiere investigación",
    "deployMethod": "Generado por sf agent publish authoring-bundle (no desplegar el XML del sandbox)",
    "envSpecific": true,
    "envNotes": "El Id del BotDefinition es del sandbox y está hardcodeado en Routes_to_Messaging_Agent (OMNI-002).",
    "status": "Confirmado",
    "evidence": "SOQL BotDefinition/BotVersion; retrieve Bot:Paquete_Express_vX",
    "risks": [
      "La activación es un paso explícito posterior al publish."
    ],
    "details": {
      "BotDefinition (sandbox)": "0Xxdh0000005iq1CAA",
      "BotVersion activa": "v18 (0X9dh0000004yX3CAI)",
      "agentType": "EinsteinServiceAgent",
      "agentDSLEnabled": "true",
      "contextVariables": "7 (MessagingSession / MessagingEndUser)",
      "diálogos": "Welcome, Rich_Content_Error_Handling, Transfer_To_Agent"
    },
    "aliases": [],
    "dependsOn": [
      "AGT-003",
      "CHN-001",
      "CHN-002",
      "CHN-003",
      "CHN-004",
      "CHN-005",
      "CHN-006",
      "CHN-007",
      "CHN-008",
      "OMNI-002",
      "OMNI-003",
      "OMNI-005",
      "OMNI-006",
      "OMNI-009",
      "OMNI-011",
      "OMNI-012"
    ],
    "phase": "F9 · Agente",
    "order": 9,
    "criticality": "Crítica",
    "actionRequired": "Investigar antes del go-live"
  },
  {
    "id": "AGT-003",
    "name": "GenAiPlannerBundle V18",
    "apiName": "Paquete_Express_vX_v18",
    "type": "GenAiPlannerBundle",
    "source": "curado",
    "usedBy": [
      "AGT-002"
    ],
    "actions": [],
    "deployClass": "Requiere investigación",
    "deployMethod": "No desplegar: se regenera con el publish",
    "envSpecific": true,
    "envNotes": "Los sufijos de topics y funciones son propios del org.",
    "status": "Confirmado",
    "evidence": "retrieve GenAiPlannerBundle:Paquete_Express_vX_v18",
    "risks": [
      "Desplegarlo manualmente desde el sandbox arrastra sufijos no portables."
    ],
    "details": {
      "origen": "Compilado desde el Agent Script al publicar",
      "sufijos": "Topics/plugins _16jdh000000NJef y funciones _179dh000000WnX* generados por el org"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "F9 · Agente",
    "order": 9,
    "criticality": "Crítica",
    "actionRequired": "Investigar antes del go-live"
  },
  {
    "id": "CHN-001",
    "name": "WhatsApp (número WhatsApp Business)",
    "apiName": "WHATSAPP_US_889770550884886",
    "type": "MessagingChannel (WhatsApp, Enhanced)",
    "source": "canales",
    "usedBy": [
      "AGT-002"
    ],
    "actions": [],
    "deployClass": "Configuración manual",
    "deployMethod": "Manual",
    "envSpecific": true,
    "envNotes": "",
    "status": "Confirmado",
    "statusNote": "Activo en sandbox",
    "evidence": "retrieve MessagingChannel + SOQL MessagingChannel/MessagingSession count",
    "risks": [
      "Vinculación del número con Meta/WhatsApp Business es manual en prod (un número no puede estar en 2 orgs)",
      "Routing flow apunta a IDs sandbox (ver OMNI-002)"
    ],
    "details": {
      "detalle": "Activo. sessionHandlerType=Flow → Routes_to_Messaging_Agent; sessionHandlerQueue=Agentes_AI; consent ImplicitOptIn; keywords OptOut/Help es_MX; externalAccountId/platformKey de Meta. 156 MessagingSessions últimos 30 días. Creado en sandbox 2025-11-05 (0Mjdh…)."
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "F10 · Canales",
    "order": 10,
    "criticality": "Crítica",
    "actionRequired": "Configurar manualmente"
  },
  {
    "id": "CHN-002",
    "name": "Web messaging (FDE)",
    "apiName": "fde_Web_messaging",
    "type": "MessagingChannel (EmbeddedMessaging)",
    "source": "canales",
    "usedBy": [
      "AGT-002"
    ],
    "actions": [],
    "deployClass": "Metadata desplegable",
    "deployMethod": "Metadata",
    "envSpecific": true,
    "envNotes": "",
    "status": "Confirmado",
    "statusNote": "Activo",
    "evidence": "retrieve messagingChannels/fde_Web_messaging",
    "risks": [
      "Canal no autenticado + verificación débil (nombre+correo)",
      "Keywords OptOut en en_US, no es_MX",
      "Creado en sandbox: crear en prod; sessionHandlerAsa requiere el agente ya publicado/activo en prod"
    ],
    "details": {
      "detalle": "Activo. sessionHandlerType=AgentforceServiceAgent, sessionHandlerAsa=Paquete_Express_vX (enlace directo al agente), fallback queue Agentes_IA_WEB. authMode=UnAuth, JWT anónimo 360, adjuntos habilitados (5 MB, bmp,csv,doc,docx,gif,jpg,pdf,png,tiff,txt,xls,xlsx,xml), isAgentAvlCheckEnabled=false, keywords en en_US. 140 sesiones/30 días."
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "F10 · Canales",
    "order": 10,
    "criticality": "Crítica",
    "actionRequired": "Desplegar"
  },
  {
    "id": "CHN-003",
    "name": "Embedded Service deployment fde_Web_messaging",
    "apiName": "fde_Web_messaging (EmbeddedServiceConfig) + Network/CustomSite/ExperienceBundle ESW_fde_Web_messaging_1787853743276",
    "type": "EmbeddedServiceConfig WebV2 + sitio ESW",
    "source": "canales",
    "usedBy": [
      "AGT-002"
    ],
    "actions": [],
    "deployClass": "Configuración específica del ambiente",
    "deployMethod": "Específico ambiente",
    "envSpecific": true,
    "envNotes": "",
    "status": "Confirmado",
    "statusNote": "Activo",
    "evidence": "retrieve EmbeddedServiceConfig + SOQL Network/Domain",
    "risks": [
      "Nombre de site con timestamp generado por org",
      "Publicación del deployment y del sitio ESW es manual",
      "Snippet/código en www.paquetexpress.com.mx es externo y contiene URLs del org"
    ],
    "details": {
      "detalle": "isEnabled=true, areGuestUsersAllowed=false, branding EmbeddedServiceConfig_BrandingSet_1a044636edd, sin T&C, site Live (dominio paquetexpress--qa2020.sandbox.my.site.com). El snippet se inserta en el sitio web del cliente."
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "F10 · Canales",
    "order": 10,
    "criticality": "Crítica",
    "actionRequired": "Ajustar al ambiente y desplegar/configurar"
  },
  {
    "id": "CHN-004",
    "name": "Conexiones del agente",
    "apiName": "connection messaging / customer_web_client",
    "type": "Agent Script connections",
    "source": "canales",
    "usedBy": [
      "AGT-002"
    ],
    "actions": [],
    "deployClass": "Metadata desplegable",
    "deployMethod": "Metadata",
    "envSpecific": false,
    "envNotes": "",
    "status": "Confirmado",
    "statusNote": "Definido",
    "evidence": ".agent líneas 453-463",
    "risks": [
      "customer_web_client: no se identificó un cliente web custom (Pendiente/Investigar si se usa API/headless)"
    ],
    "details": {
      "detalle": "Ambas: outbound_route_type=OmniChannelFlow, outbound_route_name=flow://FDE_Route_to_ASA, escalation_message es_MX, adaptive_response_allowed=False."
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "F10 · Canales",
    "order": 10,
    "criticality": "Crítica",
    "actionRequired": "Desplegar"
  },
  {
    "id": "CHN-005",
    "name": "Variables de contexto del Bot",
    "apiName": "ChannelName, ChannelType, ContactId, EndUserId, EndUserLanguage, RoutableId, WhatsAppPhone",
    "type": "Bot contextVariables",
    "source": "canales",
    "usedBy": [
      "AGT-002"
    ],
    "actions": [],
    "deployClass": "Metadata desplegable",
    "deployMethod": "Metadata",
    "envSpecific": false,
    "envNotes": "",
    "status": "Confirmado",
    "statusNote": "OK",
    "evidence": "bots/Paquete_Express_vX.bot-meta.xml",
    "risks": [],
    "details": {
      "detalle": "Mapeadas a MessagingSession.* y MessagingEndUser.ContactId/MessagingPlatformKey para 8 messageTypes (EmbeddedMessaging, WhatsApp, Facebook, AppleBusinessChat, Text, Custom, Line, Email). Bot type ExternalCopilot, agentType EinsteinServiceAgent, agentDSLEnabled=true, richContentEnabled=true."
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "F10 · Canales",
    "order": 10,
    "criticality": "Alta",
    "actionRequired": "Desplegar"
  },
  {
    "id": "CHN-006",
    "name": "Otros canales activos con otros agentes",
    "apiName": "Chat_en_linea_Agentforce_Paquetexpress, Chat_Agentforce, Chat_en_linea_agentforce_voice, Chat_En_Linea",
    "type": "MessagingChannel (EmbeddedMessaging)",
    "source": "canales",
    "usedBy": [
      "AGT-002"
    ],
    "actions": [],
    "deployClass": "Elemento existente a validar",
    "deployMethod": "Validar existente",
    "envSpecific": true,
    "envNotes": "",
    "status": "Confirmado",
    "statusNote": "Activos",
    "evidence": "retrieve messagingChannels + routing flows + BotVersion activos",
    "risks": [
      "4 agentes de servicio activos simultáneamente con el mismo usuario de agente",
      "Riesgo de que el canal web 'productivo' en prod apunte a otro agente (Split) en vez de vX"
    ],
    "details": {
      "detalle": "Chat_en_linea_Agentforce_Paquetexpress → Routes_to_Messaging_Agent_Web → agente Paquetexpress_Service_Agent_Split (v50 activa). Chat_Agentforce → ASA Agentforce_Paquete_Express (v11 activa). Chat_en_linea_agentforce_voice → Omni_Flow_test → Agentforce_Paquete_Express. Chat_En_Linea → Routes_to_Messaging_Agent_Web. fde_voice (PstnVoice) activo. WhatsApp 776502412217878 y 735753156299216 y WhatsAppVoice inactivos (bots legacy)."
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "F10 · Canales",
    "order": 10,
    "criticality": "Media",
    "actionRequired": "Verificar existencia y configuración"
  },
  {
    "id": "CHN-007",
    "name": "Channel Object Linking Rule",
    "apiName": "Match_phone_number_to_record_1792111105779",
    "type": "ChannelObjectLinkingRule",
    "source": "canales",
    "usedBy": [
      "AGT-002"
    ],
    "actions": [],
    "deployClass": "Metadata desplegable",
    "deployMethod": "Metadata",
    "envSpecific": false,
    "envNotes": "",
    "status": "Confirmado",
    "statusNote": "Activo",
    "evidence": "retrieve ChannelObjectLinkingRule",
    "risks": [
      "Solo voz; no aplica a v18 pero crea contactos automáticamente"
    ],
    "details": {
      "detalle": "channelType=Phone, objectToLink=Contact, CreateNewRecordAndLink si no hay match, activo."
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "F10 · Canales",
    "order": 10,
    "criticality": "Media",
    "actionRequired": "Desplegar"
  },
  {
    "id": "CHN-008",
    "name": "CSP Trusted Sites / CORS",
    "apiName": "agente, chat_agente, Paquete_Agente, Paquete_Agente2, Paque_exp, QA, Voice_*",
    "type": "CspTrustedSite / CorsWhitelistOrigin",
    "source": "canales",
    "usedBy": [
      "AGT-002"
    ],
    "actions": [],
    "deployClass": "Configuración específica del ambiente",
    "deployMethod": "Específico ambiente",
    "envSpecific": true,
    "envNotes": "",
    "status": "Pendiente",
    "statusNote": "Pendiente detalle",
    "evidence": "SOQL CspTrustedSite (tooling) + list metadata CorsWhitelistOrigin",
    "risks": [
      "URLs sandbox/QA deben reemplazarse en prod"
    ],
    "details": {
      "detalle": "34 CSP (incluye https://paquetexpress--qa2020.sandbox.my.site.com y https://pqa.paquetexpress.com.mx QA); 24 CorsWhitelistOrigin (no inspeccionados en detalle)."
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "F10 · Canales",
    "order": 10,
    "criticality": "Crítica",
    "actionRequired": "Ajustar al ambiente y desplegar/configurar"
  },
  {
    "id": "APX-006",
    "name": "TriggerTicket (handler de trigger Ticket)",
    "apiName": "TriggerTicket",
    "type": "ApexClass (automatización indirecta)",
    "source": "dependencias",
    "usedBy": [
      "TRG-001"
    ],
    "actions": [],
    "deployClass": "Metadata desplegable",
    "deployMethod": "Metadata API",
    "envSpecific": false,
    "envNotes": "",
    "status": "Confirmado",
    "evidence": "_work/handover-v18/src/main/default/classes/TriggerTicket.cls",
    "risks": [
      "Si un flow del agente deja de setear Crear_ticket_duplicado__c=true, casos con mismo Numero_de_Rastreo__c+RT abierto serán bloqueados por addError.",
      "Ninguno de los RT del agente es Reclamación/queja, por lo que los callouts GLP/Quejas no se disparan hoy."
    ],
    "details": {
      "methods_on_insert": "validaTicketDuplicado (before insert, se salta si Crear_Ticket_Duplicado__c=true), asignaMontoReclamadoInicial, procesaCamposGLP / enqueueGeoJobOnInsert / validaRoboSiniestroEnNuevoCaso (solo RT Reclamación), procesaTicket (after insert/update: si RT LIKE %queja% -> callout CallWS_Ticket_Quejas)",
      "labels": "Reclamacion_Name, Periodo_Dias_Pago, Id_Guest_User"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "V · Automatización existente a validar",
    "order": 11,
    "criticality": "Media",
    "actionRequired": "Desplegar"
  },
  {
    "id": "AR-001",
    "name": "Caso Web",
    "apiName": "Case.Caso Web",
    "type": "AssignmentRule (activa)",
    "source": "dependencias",
    "usedBy": [
      "OBJ-001"
    ],
    "actions": [],
    "deployClass": "Elemento existente a validar",
    "deployMethod": "Metadata API",
    "envSpecific": false,
    "envNotes": "",
    "status": "Confirmado",
    "evidence": "src/main/default/assignmentRules/Case.assignmentRules-meta.xml",
    "risks": [],
    "details": {
      "entries": "1",
      "rule": "Origin=Webmaster AND Status=Nuevo -> Reclamaciones_Intake",
      "impact": "No aplica a casos del agente; además Flow Create Records no ejecuta assignment rules"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "V · Automatización existente a validar",
    "order": 11,
    "criticality": "Baja",
    "actionRequired": "Verificar existencia y configuración"
  },
  {
    "id": "ARR-001",
    "name": "AutoResponseRules Case",
    "apiName": "Case",
    "type": "AutoResponseRules",
    "source": "dependencias",
    "usedBy": [
      "OBJ-001"
    ],
    "actions": [],
    "deployClass": "Elemento existente a validar",
    "deployMethod": "N/A",
    "envSpecific": false,
    "envNotes": "",
    "status": "Confirmado",
    "evidence": "src/main/default/autoResponseRules/Case.autoResponseRules-meta.xml (sin reglas)",
    "risks": [],
    "details": {
      "rules": "0"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "V · Automatización existente a validar",
    "order": 11,
    "criticality": "Baja",
    "actionRequired": "Verificar existencia y configuración"
  },
  {
    "id": "AUT-001",
    "name": "Actualizar_Estado_Felicitacion_del_Cliente",
    "apiName": "Actualizar_Estado_Felicitacion_del_Cliente",
    "type": "Record-Triggered Flow",
    "source": "dependencias",
    "usedBy": [
      "OBJ-001"
    ],
    "actions": [],
    "deployClass": "Elemento existente a validar",
    "deployMethod": "Metadata API",
    "envSpecific": false,
    "envNotes": "",
    "status": "Confirmado",
    "evidence": "sf data query \"SELECT ApiName, TriggerType, RecordTriggerType FROM FlowDefinitionView WHERE IsActive=true AND TriggerObjectOrEvent.QualifiedApiName IN (...)\"; src/main/default/flows/Actualizar_Estado_Felicitacion_del_Cliente.flow-meta.xml",
    "risks": [],
    "details": {
      "object": "Case",
      "trigger": "before insert",
      "summary": "Si RecordTypeId = RT resuelto en el flow (Felicitación) -> Status=Cerrado",
      "impact_on_agent": "Bajo (RT no usado por el agente)"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "V · Automatización existente a validar",
    "order": 11,
    "criticality": "Baja",
    "actionRequired": "Verificar existencia y configuración"
  },
  {
    "id": "AUT-002",
    "name": "AsignaCuentaAContacto_Ticket",
    "apiName": "AsignaCuentaAContacto_Ticket",
    "type": "Record-Triggered Flow",
    "source": "dependencias",
    "usedBy": [
      "OBJ-001"
    ],
    "actions": [],
    "deployClass": "Elemento existente a validar",
    "deployMethod": "Metadata API",
    "envSpecific": false,
    "envNotes": "",
    "status": "Confirmado",
    "evidence": "sf data query \"SELECT ApiName, TriggerType, RecordTriggerType FROM FlowDefinitionView WHERE IsActive=true AND TriggerObjectOrEvent.QualifiedApiName IN (...)\"; src/main/default/flows/AsignaCuentaAContacto_Ticket.flow-meta.xml",
    "risks": [
      "MEDIO: se dispara en todos los casos del agente con contacto (AccountId se deriva del contacto); un error aquí revierte la creación del caso"
    ],
    "details": {
      "object": "Case",
      "trigger": "after insert/update; AccountId cambia o no nulo",
      "summary": "Si el caso tiene ContactId sin cuenta, asigna la cuenta al contacto (update Contact, sin fault path)",
      "impact_on_agent": "MEDIO: se dispara en todos los casos del agente con contacto (AccountId se deriva del contacto); un error aquí revierte la creación del caso"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "V · Automatización existente a validar",
    "order": 11,
    "criticality": "Media",
    "actionRequired": "Verificar existencia y configuración"
  },
  {
    "id": "AUT-003",
    "name": "NotificaCase",
    "apiName": "NotificaCase",
    "type": "Record-Triggered Flow",
    "source": "dependencias",
    "usedBy": [
      "OBJ-001"
    ],
    "actions": [],
    "deployClass": "Elemento existente a validar",
    "deployMethod": "Metadata API",
    "envSpecific": false,
    "envNotes": "",
    "status": "Confirmado",
    "evidence": "sf data query \"SELECT ApiName, TriggerType, RecordTriggerType FROM FlowDefinitionView WHERE IsActive=true AND TriggerObjectOrEvent.QualifiedApiName IN (...)\"; src/main/default/flows/NotificaCase.flow-meta.xml",
    "risks": [],
    "details": {
      "object": "Case",
      "trigger": "after insert; Tipo_de_solicitud_form__c/Origin=Voz del Cliente/Comentarios",
      "summary": "Custom notification",
      "impact_on_agent": "Bajo"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "V · Automatización existente a validar",
    "order": 11,
    "criticality": "Baja",
    "actionRequired": "Verificar existencia y configuración"
  },
  {
    "id": "AUT-004",
    "name": "PQTR_Asingacion_analista",
    "apiName": "PQTR_Asingacion_analista",
    "type": "Record-Triggered Flow",
    "source": "dependencias",
    "usedBy": [
      "OBJ-001"
    ],
    "actions": [],
    "deployClass": "Elemento existente a validar",
    "deployMethod": "Metadata API",
    "envSpecific": false,
    "envNotes": "",
    "status": "Confirmado",
    "evidence": "sf data query \"SELECT ApiName, TriggerType, RecordTriggerType FROM FlowDefinitionView WHERE IsActive=true AND TriggerObjectOrEvent.QualifiedApiName IN (...)\"; src/main/default/flows/PQTR_Asingacion_analista.flow-meta.xml",
    "risks": [],
    "details": {
      "object": "Case",
      "trigger": "after insert/update; GLP_listo__c, RT Reclamación",
      "summary": "Asignación de analista, entitlement, emails",
      "impact_on_agent": "Bajo (solo RT Reclamación)"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "V · Automatización existente a validar",
    "order": 11,
    "criticality": "Baja",
    "actionRequired": "Verificar existencia y configuración"
  },
  {
    "id": "AUT-005",
    "name": "RTF_Asignacion_reclamacion_por_cobranza",
    "apiName": "RTF_Asignacion_reclamacion_por_cobranza",
    "type": "Record-Triggered Flow",
    "source": "dependencias",
    "usedBy": [
      "OBJ-001"
    ],
    "actions": [],
    "deployClass": "Elemento existente a validar",
    "deployMethod": "Metadata API",
    "envSpecific": false,
    "envNotes": "",
    "status": "Confirmado",
    "evidence": "sf data query \"SELECT ApiName, TriggerType, RecordTriggerType FROM FlowDefinitionView WHERE IsActive=true AND TriggerObjectOrEvent.QualifiedApiName IN (...)\"; src/main/default/flows/RTF_Asignacion_reclamacion_por_cobranza.flow-meta.xml",
    "risks": [],
    "details": {
      "object": "Case",
      "trigger": "after insert/update; RT Reclamación",
      "summary": "Reasigna owner",
      "impact_on_agent": "Bajo"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "V · Automatización existente a validar",
    "order": 11,
    "criticality": "Baja",
    "actionRequired": "Verificar existencia y configuración"
  },
  {
    "id": "AUT-006",
    "name": "PAQEX_Cerrar_milestone",
    "apiName": "PAQEX_Cerrar_milestone",
    "type": "Record-Triggered Flow",
    "source": "dependencias",
    "usedBy": [
      "OBJ-001"
    ],
    "actions": [],
    "deployClass": "Elemento existente a validar",
    "deployMethod": "Metadata API",
    "envSpecific": false,
    "envNotes": "",
    "status": "Confirmado",
    "evidence": "sf data query \"SELECT ApiName, TriggerType, RecordTriggerType FROM FlowDefinitionView WHERE IsActive=true AND TriggerObjectOrEvent.QualifiedApiName IN (...)\"; src/main/default/flows/PAQEX_Cerrar_milestone.flow-meta.xml",
    "risks": [],
    "details": {
      "object": "Case",
      "trigger": "after update; RT Reclamación",
      "summary": "Cierra CaseMilestone",
      "impact_on_agent": "Bajo"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "V · Automatización existente a validar",
    "order": 11,
    "criticality": "Baja",
    "actionRequired": "Verificar existencia y configuración"
  },
  {
    "id": "AUT-007",
    "name": "EnviaEncuestas",
    "apiName": "EnviaEncuestas",
    "type": "Record-Triggered Flow",
    "source": "dependencias",
    "usedBy": [
      "OBJ-001"
    ],
    "actions": [],
    "deployClass": "Elemento existente a validar",
    "deployMethod": "Metadata API",
    "envSpecific": false,
    "envNotes": "",
    "status": "Confirmado",
    "evidence": "sf data query \"SELECT ApiName, TriggerType, RecordTriggerType FROM FlowDefinitionView WHERE IsActive=true AND TriggerObjectOrEvent.QualifiedApiName IN (...)\"; src/main/default/flows/EnviaEncuestas.flow-meta.xml",
    "risks": [],
    "details": {
      "object": "Case",
      "trigger": "after update; Status=Pagada, RT Reclamación",
      "summary": "sendSurveyInvitation",
      "impact_on_agent": "Bajo"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "V · Automatización existente a validar",
    "order": 11,
    "criticality": "Baja",
    "actionRequired": "Verificar existencia y configuración"
  },
  {
    "id": "AUT-008",
    "name": "Notifiacion_Pago_directo",
    "apiName": "Notifiacion_Pago_directo",
    "type": "Record-Triggered Flow",
    "source": "dependencias",
    "usedBy": [
      "OBJ-001"
    ],
    "actions": [],
    "deployClass": "Elemento existente a validar",
    "deployMethod": "Metadata API",
    "envSpecific": false,
    "envNotes": "",
    "status": "Confirmado",
    "evidence": "sf data query \"SELECT ApiName, TriggerType, RecordTriggerType FROM FlowDefinitionView WHERE IsActive=true AND TriggerObjectOrEvent.QualifiedApiName IN (...)\"; src/main/default/flows/Notifiacion_Pago_directo.flow-meta.xml",
    "risks": [],
    "details": {
      "object": "Case",
      "trigger": "after update; RT Reclamación",
      "summary": "Custom notification",
      "impact_on_agent": "Bajo"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "V · Automatización existente a validar",
    "order": 11,
    "criticality": "Baja",
    "actionRequired": "Verificar existencia y configuración"
  },
  {
    "id": "AUT-009",
    "name": "PQTEX_Cambio_de_estatus",
    "apiName": "PQTEX_Cambio_de_estatus",
    "type": "Record-Triggered Flow",
    "source": "dependencias",
    "usedBy": [
      "OBJ-001"
    ],
    "actions": [],
    "deployClass": "Elemento existente a validar",
    "deployMethod": "Metadata API",
    "envSpecific": false,
    "envNotes": "",
    "status": "Confirmado",
    "evidence": "sf data query \"SELECT ApiName, TriggerType, RecordTriggerType FROM FlowDefinitionView WHERE IsActive=true AND TriggerObjectOrEvent.QualifiedApiName IN (...)\"; src/main/default/flows/PQTEX_Cambio_de_estatus.flow-meta.xml",
    "risks": [],
    "details": {
      "object": "Case",
      "trigger": "before update; RT Reclamación",
      "summary": "Cambia Status",
      "impact_on_agent": "Bajo"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "V · Automatización existente a validar",
    "order": 11,
    "criticality": "Baja",
    "actionRequired": "Verificar existencia y configuración"
  },
  {
    "id": "AUT-010",
    "name": "RTF_Caso_Reasignacion_por_cuenta",
    "apiName": "RTF_Caso_Reasignacion_por_cuenta",
    "type": "Record-Triggered Flow",
    "source": "dependencias",
    "usedBy": [
      "OBJ-001"
    ],
    "actions": [],
    "deployClass": "Elemento existente a validar",
    "deployMethod": "Metadata API",
    "envSpecific": false,
    "envNotes": "",
    "status": "Confirmado",
    "evidence": "sf data query \"SELECT ApiName, TriggerType, RecordTriggerType FROM FlowDefinitionView WHERE IsActive=true AND TriggerObjectOrEvent.QualifiedApiName IN (...)\"; src/main/default/flows/RTF_Caso_Reasignacion_por_cuenta.flow-meta.xml",
    "risks": [],
    "details": {
      "object": "Case",
      "trigger": "after update; AccountId de null a valor, RT Reclamación",
      "summary": "Reasigna owner",
      "impact_on_agent": "Bajo"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "V · Automatización existente a validar",
    "order": 11,
    "criticality": "Baja",
    "actionRequired": "Verificar existencia y configuración"
  },
  {
    "id": "AUT-011",
    "name": "RTF_Fecha_cancelacion_por_desinteres",
    "apiName": "RTF_Fecha_cancelacion_por_desinteres",
    "type": "Record-Triggered Flow",
    "source": "dependencias",
    "usedBy": [
      "OBJ-001"
    ],
    "actions": [],
    "deployClass": "Elemento existente a validar",
    "deployMethod": "Metadata API",
    "envSpecific": false,
    "envNotes": "",
    "status": "Confirmado",
    "evidence": "sf data query \"SELECT ApiName, TriggerType, RecordTriggerType FROM FlowDefinitionView WHERE IsActive=true AND TriggerObjectOrEvent.QualifiedApiName IN (...)\"; src/main/default/flows/RTF_Fecha_cancelacion_por_desinteres.flow-meta.xml",
    "risks": [],
    "details": {
      "object": "Case",
      "trigger": "before update; RT Reclamación",
      "summary": "Fecha cancelación",
      "impact_on_agent": "Bajo"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "V · Automatización existente a validar",
    "order": 11,
    "criticality": "Baja",
    "actionRequired": "Verificar existencia y configuración"
  },
  {
    "id": "AUT-012",
    "name": "Status_anterior",
    "apiName": "Status_anterior",
    "type": "Record-Triggered Flow",
    "source": "dependencias",
    "usedBy": [
      "OBJ-001"
    ],
    "actions": [],
    "deployClass": "Elemento existente a validar",
    "deployMethod": "Metadata API",
    "envSpecific": false,
    "envNotes": "",
    "status": "Confirmado",
    "evidence": "sf data query \"SELECT ApiName, TriggerType, RecordTriggerType FROM FlowDefinitionView WHERE IsActive=true AND TriggerObjectOrEvent.QualifiedApiName IN (...)\"; src/main/default/flows/Status_anterior.flow-meta.xml",
    "risks": [],
    "details": {
      "object": "Case",
      "trigger": "before update; RT Reclamación",
      "summary": "Guarda status previo",
      "impact_on_agent": "Bajo"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "V · Automatización existente a validar",
    "order": 11,
    "criticality": "Baja",
    "actionRequired": "Verificar existencia y configuración"
  },
  {
    "id": "AUT-013",
    "name": "cisco_webex__Case_Space_Notification",
    "apiName": "cisco_webex__Case_Space_Notification",
    "type": "Record-Triggered Flow",
    "source": "dependencias",
    "usedBy": [
      "OBJ-001"
    ],
    "actions": [],
    "deployClass": "Elemento existente a validar",
    "deployMethod": "Metadata API",
    "envSpecific": false,
    "envNotes": "",
    "status": "No verificado",
    "evidence": "sf data query \"SELECT ApiName, TriggerType, RecordTriggerType FROM FlowDefinitionView WHERE IsActive=true AND TriggerObjectOrEvent.QualifiedApiName IN (...)\"; src/main/default/flows/cisco_webex__Case_Space_Notification.flow-meta.xml",
    "risks": [],
    "details": {
      "object": "Case",
      "trigger": "after update",
      "summary": "Notificación Webex (paquete cisco_webex, unmanaged)",
      "impact_on_agent": "Bajo (solo update)"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "V · Automatización existente a validar",
    "order": 11,
    "criticality": "Baja",
    "actionRequired": "Verificar existencia y configuración"
  },
  {
    "id": "AUT-014",
    "name": "Actualiza_contacto_al_usuario_de_mensajeria",
    "apiName": "Actualiza_contacto_al_usuario_de_mensajeria",
    "type": "Record-Triggered Flow",
    "source": "dependencias",
    "usedBy": [
      "OBJ-002"
    ],
    "actions": [],
    "deployClass": "Elemento existente a validar",
    "deployMethod": "Metadata API",
    "envSpecific": false,
    "envNotes": "",
    "status": "Confirmado",
    "evidence": "sf data query \"SELECT ApiName, TriggerType, RecordTriggerType FROM FlowDefinitionView WHERE IsActive=true AND TriggerObjectOrEvent.QualifiedApiName IN (...)\"; src/main/default/flows/Actualiza_contacto_al_usuario_de_mensajeria.flow-meta.xml",
    "risks": [
      "Bajo-Medio (FLW-001 no setea Usuario_de_Mensajeria_Id__c)"
    ],
    "details": {
      "object": "Contact",
      "trigger": "after insert/update; Usuario_de_Mensajeria_Id__c no nulo",
      "summary": "Update MessagingEndUser.ContactId",
      "impact_on_agent": "Bajo-Medio (FLW-001 no setea Usuario_de_Mensajeria_Id__c)"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "V · Automatización existente a validar",
    "order": 11,
    "criticality": "Media",
    "actionRequired": "Verificar existencia y configuración"
  },
  {
    "id": "AUT-015",
    "name": "Mark_Messaging_Sessions_Closed_by_Auto_Close_Bot",
    "apiName": "Mark_Messaging_Sessions_Closed_by_Auto_Close_Bot",
    "type": "Record-Triggered Flow",
    "source": "dependencias",
    "usedBy": [
      "OBJ-006"
    ],
    "actions": [],
    "deployClass": "Elemento existente a validar",
    "deployMethod": "Metadata API",
    "envSpecific": false,
    "envNotes": "",
    "status": "No verificado",
    "evidence": "sf data query \"SELECT ApiName, TriggerType, RecordTriggerType FROM FlowDefinitionView WHERE IsActive=true AND TriggerObjectOrEvent.QualifiedApiName IN (...)\"; src/main/default/flows/Mark_Messaging_Sessions_Closed_by_Auto_Close_Bot.flow-meta.xml",
    "risks": [
      "Medio (puede cerrar sesiones de mensajería relacionadas con escalamiento) — no inspeccionado en detalle"
    ],
    "details": {
      "object": "AgentWork",
      "trigger": "after insert/update",
      "summary": "Cierre de sesiones",
      "impact_on_agent": "Medio (puede cerrar sesiones de mensajería relacionadas con escalamiento) — no inspeccionado en detalle"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "V · Automatización existente a validar",
    "order": 11,
    "criticality": "Baja",
    "actionRequired": "Verificar existencia y configuración"
  },
  {
    "id": "AUT-016",
    "name": "Auto_Close_Waiting_Messaging_Sessions",
    "apiName": "Auto_Close_Waiting_Messaging_Sessions",
    "type": "Record-Triggered Flow",
    "source": "dependencias",
    "usedBy": [
      "OBJ-006"
    ],
    "actions": [],
    "deployClass": "Elemento existente a validar",
    "deployMethod": "Metadata API",
    "envSpecific": false,
    "envNotes": "",
    "status": "No verificado",
    "evidence": "sf data query \"SELECT ApiName, TriggerType, RecordTriggerType FROM FlowDefinitionView WHERE IsActive=true AND TriggerObjectOrEvent.QualifiedApiName IN (...)\"; src/main/default/flows/Auto_Close_Waiting_Messaging_Sessions.flow-meta.xml",
    "risks": [
      "Medio — no inspeccionado en detalle"
    ],
    "details": {
      "object": "MessagingSession",
      "trigger": "after update",
      "summary": "Auto-cierre de sesiones en espera",
      "impact_on_agent": "Medio — no inspeccionado en detalle"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "V · Automatización existente a validar",
    "order": 11,
    "criticality": "Baja",
    "actionRequired": "Verificar existencia y configuración"
  },
  {
    "id": "EA-001",
    "name": "Cotizacion_Nacional_Descuento",
    "apiName": "Case.Cotizacion_Nacional_Descuento",
    "type": "WorkflowAlert + EmailTemplate",
    "source": "dependencias",
    "usedBy": [
      "WF-005"
    ],
    "actions": [],
    "deployClass": "Elemento existente a validar",
    "deployMethod": "Metadata API",
    "envSpecific": false,
    "envNotes": "",
    "status": "Confirmado",
    "evidence": "src/main/default/workflows/Case.workflow-meta.xml; sf data query EmailTemplate",
    "risks": [],
    "details": {
      "template": "Cotizacion_nacional_con_descuento (00X2E000002pNLnUAM)",
      "recipient": "contactLookup:ContactId"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "V · Automatización existente a validar",
    "order": 11,
    "criticality": "Baja",
    "actionRequired": "Verificar existencia y configuración"
  },
  {
    "id": "EA-002",
    "name": "Notificacion_Estatus_de_Carta_Porte_Entrega_a_domicilio",
    "apiName": "Case.Notificacion_Estatus_de_Carta_Porte_Entrega_a_domicilio",
    "type": "WorkflowAlert + EmailTemplate",
    "source": "dependencias",
    "usedBy": [
      "WF-006"
    ],
    "actions": [],
    "deployClass": "Elemento existente a validar",
    "deployMethod": "Metadata API",
    "envSpecific": false,
    "envNotes": "",
    "status": "Confirmado",
    "evidence": "src/main/default/workflows/Case.workflow-meta.xml; sf data query EmailTemplate",
    "risks": [],
    "details": {
      "template": "Estatus_de_carta_porte_EAD (00X2E000002pNLpUAM)",
      "recipient": "contactLookup:ContactId"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "V · Automatización existente a validar",
    "order": 11,
    "criticality": "Baja",
    "actionRequired": "Verificar existencia y configuración"
  },
  {
    "id": "EA-003",
    "name": "Notificacion_Estatus_de_Carta_Porte_Entrega_OCURRE",
    "apiName": "Case.Notificacion_Estatus_de_Carta_Porte_Entrega_OCURRE",
    "type": "WorkflowAlert + EmailTemplate",
    "source": "dependencias",
    "usedBy": [
      "WF-007"
    ],
    "actions": [],
    "deployClass": "Elemento existente a validar",
    "deployMethod": "Metadata API",
    "envSpecific": false,
    "envNotes": "",
    "status": "Confirmado",
    "evidence": "src/main/default/workflows/Case.workflow-meta.xml; sf data query EmailTemplate",
    "risks": [],
    "details": {
      "template": "Estatus_de_Carta_Porte_Entrega_de_OCURRE (00X2E000002pNLoUAM)",
      "recipient": "contactLookup:ContactId"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "V · Automatización existente a validar",
    "order": 11,
    "criticality": "Baja",
    "actionRequired": "Verificar existencia y configuración"
  },
  {
    "id": "ENT-001",
    "name": "Caso estándar",
    "apiName": "Caso estándar",
    "type": "Entitlement Process (SlaProcess)",
    "source": "dependencias",
    "usedBy": [
      "OBJ-001"
    ],
    "actions": [],
    "deployClass": "Elemento existente a validar",
    "deployMethod": "Metadata API (EntitlementProcess)",
    "envSpecific": false,
    "envNotes": "",
    "status": "Confirmado",
    "evidence": "sf data query \"SELECT Name, IsActive FROM SlaProcess\"",
    "risks": [],
    "details": {
      "active": "True",
      "note": "Se asigna vía EntitlementId; los flows del agente no setean EntitlementId"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "V · Automatización existente a validar",
    "order": 11,
    "criticality": "Baja",
    "actionRequired": "Verificar existencia y configuración"
  },
  {
    "id": "ENT-002",
    "name": "reclamos por daño - control de tiempos",
    "apiName": "reclamos por daño - control de tiempos",
    "type": "Entitlement Process (SlaProcess)",
    "source": "dependencias",
    "usedBy": [
      "OBJ-001"
    ],
    "actions": [],
    "deployClass": "Elemento existente a validar",
    "deployMethod": "Metadata API",
    "envSpecific": false,
    "envNotes": "",
    "status": "Confirmado",
    "evidence": "idem",
    "risks": [],
    "details": {
      "active": "True",
      "note": "Asignado por AUT-004 solo a Reclamación"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "V · Automatización existente a validar",
    "order": 11,
    "criticality": "Baja",
    "actionRequired": "Verificar existencia y configuración"
  },
  {
    "id": "TRG-001",
    "name": "Ticket",
    "apiName": "Ticket",
    "type": "ApexTrigger",
    "source": "dependencias",
    "usedBy": [
      "OBJ-001"
    ],
    "actions": [],
    "deployClass": "Elemento existente a validar",
    "deployMethod": "Metadata API",
    "envSpecific": false,
    "envNotes": "",
    "status": "Confirmado",
    "evidence": "sf data query --use-tooling-api \"SELECT Name, TableEnumOrId, Status FROM ApexTrigger WHERE TableEnumOrId IN ('Case','Contact',...)\"; src/main/default/triggers/Ticket.trigger",
    "risks": [
      "Se dispara en cada Case creado por el agente."
    ],
    "details": {
      "object": "Case",
      "events": "before/after insert, before/after update",
      "guard": "TriggerExecute.Execute()"
    },
    "aliases": [],
    "dependsOn": [
      "APX-006"
    ],
    "phase": "V · Automatización existente a validar",
    "order": 11,
    "criticality": "Media",
    "actionRequired": "Verificar existencia y configuración"
  },
  {
    "id": "VR-001",
    "name": "si_telefono_y_correoe_esta_vacio",
    "apiName": "Contact.si_telefono_y_correoe_esta_vacio",
    "type": "ValidationRule (activa)",
    "source": "dependencias",
    "usedBy": [
      "OBJ-002"
    ],
    "actions": [],
    "deployClass": "Elemento existente a validar",
    "deployMethod": "Metadata API",
    "envSpecific": false,
    "envNotes": "",
    "status": "Confirmado",
    "evidence": "sf data query --use-tooling-api \"SELECT ValidationName, Active, ErrorMessage FROM ValidationRule WHERE EntityDefinition.QualifiedApiName IN ('Case','Contact') AND Active=true\"",
    "risks": [
      "MEDIO: FLW-001 escribe MobilePhone (no Phone); si Email viene vacío el insert falla"
    ],
    "details": {
      "object": "Contact",
      "errorMessage": "Se debe de ingresar de manera obligatoria por lo menos uno de los siguientes datos:\r\nTeléfono,\r\nEmail.",
      "formula": "AND(ISBLANK(Phone), ISBLANK(Email), Owner.et4ae5__ValidExactTargetAdmin__c=false)",
      "impact_on_agent": "MEDIO: FLW-001 escribe MobilePhone (no Phone); si Email viene vacío el insert falla"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "V · Automatización existente a validar",
    "order": 11,
    "criticality": "Media",
    "actionRequired": "Verificar existencia y configuración"
  },
  {
    "id": "VR-002",
    "name": "Campos_ligados_requerimiento_cliente",
    "apiName": "Case.Campos_ligados_requerimiento_cliente",
    "type": "ValidationRule (activa)",
    "source": "dependencias",
    "usedBy": [
      "OBJ-001"
    ],
    "actions": [],
    "deployClass": "Elemento existente a validar",
    "deployMethod": "Metadata API",
    "envSpecific": false,
    "envNotes": "",
    "status": "No verificado",
    "evidence": "sf data query --use-tooling-api \"SELECT ValidationName, Active, ErrorMessage FROM ValidationRule WHERE EntityDefinition.QualifiedApiName IN ('Case','Contact') AND Active=true\"",
    "risks": [],
    "details": {
      "object": "Case",
      "errorMessage": "Si captura fecha de solicitud a cliente o un indicador, complete fecha + al menos un indicador, o borre lo capturado. Atajo (docs ya en formulario): capture fec",
      "formula": "None",
      "impact_on_agent": "Bajo: condiciones de campos de Reclamación/queja no escritos por el agente (revisado por nombre/mensaje)"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "V · Automatización existente a validar",
    "order": 11,
    "criticality": "Baja",
    "actionRequired": "Verificar existencia y configuración"
  },
  {
    "id": "VR-003",
    "name": "Campos_ligados_requerimiento_sucursal",
    "apiName": "Case.Campos_ligados_requerimiento_sucursal",
    "type": "ValidationRule (activa)",
    "source": "dependencias",
    "usedBy": [
      "OBJ-001"
    ],
    "actions": [],
    "deployClass": "Elemento existente a validar",
    "deployMethod": "Metadata API",
    "envSpecific": false,
    "envNotes": "",
    "status": "No verificado",
    "evidence": "sf data query --use-tooling-api \"SELECT ValidationName, Active, ErrorMessage FROM ValidationRule WHERE EntityDefinition.QualifiedApiName IN ('Case','Contact') AND Active=true\"",
    "risks": [],
    "details": {
      "object": "Case",
      "errorMessage": "Si captura fecha de solicitud de acuse, sucursal, número de requerimientos o un indicador interno, complete todos esos campos o borre lo capturado. Pagos especi",
      "formula": "None",
      "impact_on_agent": "Bajo: condiciones de campos de Reclamación/queja no escritos por el agente (revisado por nombre/mensaje)"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "V · Automatización existente a validar",
    "order": 11,
    "criticality": "Baja",
    "actionRequired": "Verificar existencia y configuración"
  },
  {
    "id": "VR-004",
    "name": "Cargo_logistica_campos_req",
    "apiName": "Case.Cargo_logistica_campos_req",
    "type": "ValidationRule (activa)",
    "source": "dependencias",
    "usedBy": [
      "OBJ-001"
    ],
    "actions": [],
    "deployClass": "Elemento existente a validar",
    "deployMethod": "Metadata API",
    "envSpecific": false,
    "envNotes": "",
    "status": "No verificado",
    "evidence": "sf data query --use-tooling-api \"SELECT ValidationName, Active, ErrorMessage FROM ValidationRule WHERE EntityDefinition.QualifiedApiName IN ('Case','Contact') AND Active=true\"",
    "risks": [],
    "details": {
      "object": "Case",
      "errorMessage": "Con cargo a Logística debe completar: Ruta, Móvil, Segmento, Tramo, Id/nombre operador logíst. responsable 1 y Departamento Responsable.",
      "formula": "None",
      "impact_on_agent": "Bajo: condiciones de campos de Reclamación/queja no escritos por el agente (revisado por nombre/mensaje)"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "V · Automatización existente a validar",
    "order": 11,
    "criticality": "Baja",
    "actionRequired": "Verificar existencia y configuración"
  },
  {
    "id": "VR-005",
    "name": "Cargo_sucursal_campos_req",
    "apiName": "Case.Cargo_sucursal_campos_req",
    "type": "ValidationRule (activa)",
    "source": "dependencias",
    "usedBy": [
      "OBJ-001"
    ],
    "actions": [],
    "deployClass": "Elemento existente a validar",
    "deployMethod": "Metadata API",
    "envSpecific": false,
    "envNotes": "",
    "status": "No verificado",
    "evidence": "sf data query --use-tooling-api \"SELECT ValidationName, Active, ErrorMessage FROM ValidationRule WHERE EntityDefinition.QualifiedApiName IN ('Case','Contact') AND Active=true\"",
    "risks": [],
    "details": {
      "object": "Case",
      "errorMessage": "Con cargo a sucursal distinta de Logística debe completar Departamento Responsable e Id/nombre operador logíst. responsable 1.",
      "formula": "None",
      "impact_on_agent": "Bajo: condiciones de campos de Reclamación/queja no escritos por el agente (revisado por nombre/mensaje)"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "V · Automatización existente a validar",
    "order": 11,
    "criticality": "Baja",
    "actionRequired": "Verificar existencia y configuración"
  },
  {
    "id": "VR-006",
    "name": "Comentarios_obligatorios",
    "apiName": "Case.Comentarios_obligatorios",
    "type": "ValidationRule (activa)",
    "source": "dependencias",
    "usedBy": [
      "OBJ-001"
    ],
    "actions": [],
    "deployClass": "Elemento existente a validar",
    "deployMethod": "Metadata API",
    "envSpecific": false,
    "envNotes": "",
    "status": "Confirmado",
    "evidence": "sf data query --use-tooling-api \"SELECT ValidationName, Active, ErrorMessage FROM ValidationRule WHERE EntityDefinition.QualifiedApiName IN ('Case','Contact') AND Active=true\"",
    "risks": [],
    "details": {
      "object": "Case",
      "errorMessage": "Si el estado del ticket es Desinterés del cliente debe colocar los comentarios del cliente.",
      "formula": "ISPICKVAL(Status,\"Desinterés del cliente\") AND ISBLANK(Comentarios__c)",
      "impact_on_agent": "No aplica"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "V · Automatización existente a validar",
    "order": 11,
    "criticality": "Baja",
    "actionRequired": "Verificar existencia y configuración"
  },
  {
    "id": "VR-007",
    "name": "Datos_reclamacion_fecha_resolucion",
    "apiName": "Case.Datos_reclamacion_fecha_resolucion",
    "type": "ValidationRule (activa)",
    "source": "dependencias",
    "usedBy": [
      "OBJ-001"
    ],
    "actions": [],
    "deployClass": "Elemento existente a validar",
    "deployMethod": "Metadata API",
    "envSpecific": false,
    "envNotes": "",
    "status": "No verificado",
    "evidence": "sf data query --use-tooling-api \"SELECT ValidationName, Active, ErrorMessage FROM ValidationRule WHERE EntityDefinition.QualifiedApiName IN ('Case','Contact') AND Active=true\"",
    "risks": [],
    "details": {
      "object": "Case",
      "errorMessage": "Al registrar la fecha de envío de resolución debe completar: Fecha reclamación cliente, Número de Rastreo, Solicitud de servicio, Fecha de documentación y Anoma",
      "formula": "None",
      "impact_on_agent": "Bajo: condiciones de campos de Reclamación/queja no escritos por el agente (revisado por nombre/mensaje)"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "V · Automatización existente a validar",
    "order": 11,
    "criticality": "Baja",
    "actionRequired": "Verificar existencia y configuración"
  },
  {
    "id": "VR-008",
    "name": "Especificar_tipo_faltante_requerido",
    "apiName": "Case.Especificar_tipo_faltante_requerido",
    "type": "ValidationRule (activa)",
    "source": "dependencias",
    "usedBy": [
      "OBJ-001"
    ],
    "actions": [],
    "deployClass": "Elemento existente a validar",
    "deployMethod": "Metadata API",
    "envSpecific": false,
    "envNotes": "",
    "status": "No verificado",
    "evidence": "sf data query --use-tooling-api \"SELECT ValidationName, Active, ErrorMessage FROM ValidationRule WHERE EntityDefinition.QualifiedApiName IN ('Case','Contact') AND Active=true\"",
    "risks": [],
    "details": {
      "object": "Case",
      "errorMessage": "Debe especificar el tipo de faltante al registrar la fecha de envío de resolución.",
      "formula": "None",
      "impact_on_agent": "Bajo: condiciones de campos de Reclamación/queja no escritos por el agente (revisado por nombre/mensaje)"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "V · Automatización existente a validar",
    "order": 11,
    "criticality": "Baja",
    "actionRequired": "Verificar existencia y configuración"
  },
  {
    "id": "VR-009",
    "name": "Fecha_envio_reporte_salvamento_pendiente",
    "apiName": "Case.Fecha_envio_reporte_salvamento_pendiente",
    "type": "ValidationRule (activa)",
    "source": "dependencias",
    "usedBy": [
      "OBJ-001"
    ],
    "actions": [],
    "deployClass": "Elemento existente a validar",
    "deployMethod": "Metadata API",
    "envSpecific": false,
    "envNotes": "",
    "status": "No verificado",
    "evidence": "sf data query --use-tooling-api \"SELECT ValidationName, Active, ErrorMessage FROM ValidationRule WHERE EntityDefinition.QualifiedApiName IN ('Case','Contact') AND Active=true\"",
    "risks": [],
    "details": {
      "object": "Case",
      "errorMessage": "El Estatus salvamento sigue en Pendiente cliente o RAD solicitada. Actualice el Estatus salvamento (y capture RAD realizada) antes de registrar la Fecha de enví",
      "formula": "None",
      "impact_on_agent": "Bajo: condiciones de campos de Reclamación/queja no escritos por el agente (revisado por nombre/mensaje)"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "V · Automatización existente a validar",
    "order": 11,
    "criticality": "Baja",
    "actionRequired": "Verificar existencia y configuración"
  },
  {
    "id": "VR-010",
    "name": "Fecha_reclamacion_cliente_en_resolucion",
    "apiName": "Case.Fecha_reclamacion_cliente_en_resolucion",
    "type": "ValidationRule (activa)",
    "source": "dependencias",
    "usedBy": [
      "OBJ-001"
    ],
    "actions": [],
    "deployClass": "Elemento existente a validar",
    "deployMethod": "Metadata API",
    "envSpecific": false,
    "envNotes": "",
    "status": "No verificado",
    "evidence": "sf data query --use-tooling-api \"SELECT ValidationName, Active, ErrorMessage FROM ValidationRule WHERE EntityDefinition.QualifiedApiName IN ('Case','Contact') AND Active=true\"",
    "risks": [],
    "details": {
      "object": "Case",
      "errorMessage": "Al registrar la fecha de envío de resolución debe capturar la Fecha reclamación cliente.",
      "formula": "None",
      "impact_on_agent": "Bajo: condiciones de campos de Reclamación/queja no escritos por el agente (revisado por nombre/mensaje)"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "V · Automatización existente a validar",
    "order": 11,
    "criticality": "Baja",
    "actionRequired": "Verificar existencia y configuración"
  },
  {
    "id": "VR-011",
    "name": "Ingresa_factor_externo",
    "apiName": "Case.Ingresa_factor_externo",
    "type": "ValidationRule (activa)",
    "source": "dependencias",
    "usedBy": [
      "OBJ-001"
    ],
    "actions": [],
    "deployClass": "Elemento existente a validar",
    "deployMethod": "Metadata API",
    "envSpecific": false,
    "envNotes": "",
    "status": "No verificado",
    "evidence": "sf data query --use-tooling-api \"SELECT ValidationName, Active, ErrorMessage FROM ValidationRule WHERE EntityDefinition.QualifiedApiName IN ('Case','Contact') AND Active=true\"",
    "risks": [],
    "details": {
      "object": "Case",
      "errorMessage": "Necesitas agregar un valor ya que la sucursal imputable es \"Factor Externo\"",
      "formula": "None",
      "impact_on_agent": "Bajo: condiciones de campos de Reclamación/queja no escritos por el agente (revisado por nombre/mensaje)"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "V · Automatización existente a validar",
    "order": 11,
    "criticality": "Baja",
    "actionRequired": "Verificar existencia y configuración"
  },
  {
    "id": "VR-012",
    "name": "NC_bloqueada_salvamento_pendiente",
    "apiName": "Case.NC_bloqueada_salvamento_pendiente",
    "type": "ValidationRule (activa)",
    "source": "dependencias",
    "usedBy": [
      "OBJ-001"
    ],
    "actions": [],
    "deployClass": "Elemento existente a validar",
    "deployMethod": "Metadata API",
    "envSpecific": false,
    "envNotes": "",
    "status": "No verificado",
    "evidence": "sf data query --use-tooling-api \"SELECT ValidationName, Active, ErrorMessage FROM ValidationRule WHERE EntityDefinition.QualifiedApiName IN ('Case','Contact') AND Active=true\"",
    "risks": [],
    "details": {
      "object": "Case",
      "errorMessage": "Salvamento pendiente por recolectar o con RAD solicitada. Actualice el Estatus salvamento antes de registrar la Fecha de solicitud de NC.",
      "formula": "None",
      "impact_on_agent": "Bajo: condiciones de campos de Reclamación/queja no escritos por el agente (revisado por nombre/mensaje)"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "V · Automatización existente a validar",
    "order": 11,
    "criticality": "Baja",
    "actionRequired": "Verificar existencia y configuración"
  },
  {
    "id": "VR-013",
    "name": "Numeros_del_1_al_10",
    "apiName": "Case.Numeros_del_1_al_10",
    "type": "ValidationRule (activa)",
    "source": "dependencias",
    "usedBy": [
      "OBJ-001"
    ],
    "actions": [],
    "deployClass": "Elemento existente a validar",
    "deployMethod": "Metadata API",
    "envSpecific": false,
    "envNotes": "",
    "status": "No verificado",
    "evidence": "sf data query --use-tooling-api \"SELECT ValidationName, Active, ErrorMessage FROM ValidationRule WHERE EntityDefinition.QualifiedApiName IN ('Case','Contact') AND Active=true\"",
    "risks": [],
    "details": {
      "object": "Case",
      "errorMessage": "Por favor, ingrese un número entre 1 y 10",
      "formula": "None",
      "impact_on_agent": "Bajo: condiciones de campos de Reclamación/queja no escritos por el agente (revisado por nombre/mensaje)"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "V · Automatización existente a validar",
    "order": 11,
    "criticality": "Baja",
    "actionRequired": "Verificar existencia y configuración"
  },
  {
    "id": "VR-014",
    "name": "Numeros_del_1_al_10_sal",
    "apiName": "Case.Numeros_del_1_al_10_sal",
    "type": "ValidationRule (activa)",
    "source": "dependencias",
    "usedBy": [
      "OBJ-001"
    ],
    "actions": [],
    "deployClass": "Elemento existente a validar",
    "deployMethod": "Metadata API",
    "envSpecific": false,
    "envNotes": "",
    "status": "No verificado",
    "evidence": "sf data query --use-tooling-api \"SELECT ValidationName, Active, ErrorMessage FROM ValidationRule WHERE EntityDefinition.QualifiedApiName IN ('Case','Contact') AND Active=true\"",
    "risks": [],
    "details": {
      "object": "Case",
      "errorMessage": "Por favor, ingrese un número entre 1 y 10",
      "formula": "None",
      "impact_on_agent": "Bajo: condiciones de campos de Reclamación/queja no escritos por el agente (revisado por nombre/mensaje)"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "V · Automatización existente a validar",
    "order": 11,
    "criticality": "Baja",
    "actionRequired": "Verificar existencia y configuración"
  },
  {
    "id": "VR-015",
    "name": "Pago_requerido_fecha_resolucion",
    "apiName": "Case.Pago_requerido_fecha_resolucion",
    "type": "ValidationRule (activa)",
    "source": "dependencias",
    "usedBy": [
      "OBJ-001"
    ],
    "actions": [],
    "deployClass": "Elemento existente a validar",
    "deployMethod": "Metadata API",
    "envSpecific": false,
    "envNotes": "",
    "status": "No verificado",
    "evidence": "sf data query --use-tooling-api \"SELECT ValidationName, Active, ErrorMessage FROM ValidationRule WHERE EntityDefinition.QualifiedApiName IN ('Case','Contact') AND Active=true\"",
    "risks": [],
    "details": {
      "object": "Case",
      "errorMessage": "Para estatus Pendiente de consentimiento debe completar: Salvamento (y Estatus salvamento si Salvamento = Si), ¿Se indemnizó flete?, Tipo de anomalía indemnizad",
      "formula": "None",
      "impact_on_agent": "Bajo: condiciones de campos de Reclamación/queja no escritos por el agente (revisado por nombre/mensaje)"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "V · Automatización existente a validar",
    "order": 11,
    "criticality": "Baja",
    "actionRequired": "Verificar existencia y configuración"
  },
  {
    "id": "VR-016",
    "name": "Queja_ventas_solo_satisfaccion_edita",
    "apiName": "Case.Queja_ventas_solo_satisfaccion_edita",
    "type": "ValidationRule (activa)",
    "source": "dependencias",
    "usedBy": [
      "OBJ-001"
    ],
    "actions": [],
    "deployClass": "Elemento existente a validar",
    "deployMethod": "Metadata API",
    "envSpecific": false,
    "envNotes": "",
    "status": "Confirmado",
    "evidence": "sf data query --use-tooling-api \"SELECT ValidationName, Active, ErrorMessage FROM ValidationRule WHERE EntityDefinition.QualifiedApiName IN ('Case','Contact') AND Active=true\"",
    "risks": [],
    "details": {
      "object": "Case",
      "errorMessage": "Esta queja la registró un asesor. El contenido solo lo puede modificar Satisfacción al cliente.",
      "formula": "NOT(ISNEW()) ...",
      "impact_on_agent": "No aplica a creación"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "V · Automatización existente a validar",
    "order": 11,
    "criticality": "Baja",
    "actionRequired": "Verificar existencia y configuración"
  },
  {
    "id": "VR-017",
    "name": "Valida_Tipo_queja_Reclamacion",
    "apiName": "Case.Valida_Tipo_queja_Reclamacion",
    "type": "ValidationRule (activa)",
    "source": "dependencias",
    "usedBy": [
      "OBJ-001"
    ],
    "actions": [],
    "deployClass": "Elemento existente a validar",
    "deployMethod": "Metadata API",
    "envSpecific": false,
    "envNotes": "",
    "status": "No verificado",
    "evidence": "sf data query --use-tooling-api \"SELECT ValidationName, Active, ErrorMessage FROM ValidationRule WHERE EntityDefinition.QualifiedApiName IN ('Case','Contact') AND Active=true\"",
    "risks": [],
    "details": {
      "object": "Case",
      "errorMessage": "Debe seleccionar un Tipo de Queja cuando el tipo de registro es Reclamación y la cuenta tiene queja.",
      "formula": "None",
      "impact_on_agent": "Bajo: condiciones de campos de Reclamación/queja no escritos por el agente (revisado por nombre/mensaje)"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "V · Automatización existente a validar",
    "order": 11,
    "criticality": "Baja",
    "actionRequired": "Verificar existencia y configuración"
  },
  {
    "id": "VR-018",
    "name": "Validacion_Negligencia",
    "apiName": "Case.Validacion_Negligencia",
    "type": "ValidationRule (activa)",
    "source": "dependencias",
    "usedBy": [
      "OBJ-001"
    ],
    "actions": [],
    "deployClass": "Elemento existente a validar",
    "deployMethod": "Metadata API",
    "envSpecific": false,
    "envNotes": "",
    "status": "No verificado",
    "evidence": "sf data query --use-tooling-api \"SELECT ValidationName, Active, ErrorMessage FROM ValidationRule WHERE EntityDefinition.QualifiedApiName IN ('Case','Contact') AND Active=true\"",
    "risks": [],
    "details": {
      "object": "Case",
      "errorMessage": "Si se detecta negligencia, favor de asignar el detalle.",
      "formula": "None",
      "impact_on_agent": "Bajo: condiciones de campos de Reclamación/queja no escritos por el agente (revisado por nombre/mensaje)"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "V · Automatización existente a validar",
    "order": 11,
    "criticality": "Baja",
    "actionRequired": "Verificar existencia y configuración"
  },
  {
    "id": "VR-019",
    "name": "obligadoProUser",
    "apiName": "Case.obligadoProUser",
    "type": "ValidationRule (activa)",
    "source": "dependencias",
    "usedBy": [
      "OBJ-001"
    ],
    "actions": [],
    "deployClass": "Elemento existente a validar",
    "deployMethod": "Metadata API",
    "envSpecific": false,
    "envNotes": "",
    "status": "Confirmado",
    "evidence": "sf data query --use-tooling-api \"SELECT ValidationName, Active, ErrorMessage FROM ValidationRule WHERE EntityDefinition.QualifiedApiName IN ('Case','Contact') AND Active=true\"",
    "risks": [
      "Depende del usuario del agente: hoy Valida_Tickets__c=false -> no aplica. Si se marca en prod, TODOS los casos del agente fallarían"
    ],
    "details": {
      "object": "Case",
      "errorMessage": "Este campo es obligatorio para su usuario.",
      "formula": "AND($User.Valida_Tickets__c, ISBLANK(TEXT(Entrega_reconocida__c)))",
      "impact_on_agent": "Depende del usuario del agente: hoy Valida_Tickets__c=false -> no aplica. Si se marca en prod, TODOS los casos del agente fallarían"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "V · Automatización existente a validar",
    "order": 11,
    "criticality": "Media",
    "actionRequired": "Verificar existencia y configuración"
  },
  {
    "id": "WF-001",
    "name": "Actualiza Fecha pago/improc",
    "apiName": "Case.Actualiza Fecha pago/improc",
    "type": "WorkflowRule (activa)",
    "source": "dependencias",
    "usedBy": [
      "OBJ-001"
    ],
    "actions": [],
    "deployClass": "Elemento existente a validar",
    "deployMethod": "Metadata API (Workflow)",
    "envSpecific": false,
    "envNotes": "",
    "status": "Confirmado",
    "evidence": "sf project retrieve start -m Workflow:Case; src/main/default/workflows/Case.workflow-meta.xml",
    "risks": [],
    "details": {
      "criteria": "onAllChanges; Fecha_de_envio_de_resolucion__c != null",
      "actions": "FieldUpdate fecha",
      "impact_on_agent": "Bajo"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "V · Automatización existente a validar",
    "order": 11,
    "criticality": "Baja",
    "actionRequired": "Verificar existencia y configuración"
  },
  {
    "id": "WF-002",
    "name": "Falta de atención en sucursales",
    "apiName": "Case.Falta de atención en sucursales",
    "type": "WorkflowRule (activa)",
    "source": "dependencias",
    "usedBy": [
      "OBJ-001"
    ],
    "actions": [],
    "deployClass": "Elemento existente a validar",
    "deployMethod": "Metadata API (Workflow)",
    "envSpecific": false,
    "envNotes": "",
    "status": "Confirmado",
    "evidence": "sf project retrieve start -m Workflow:Case; src/main/default/workflows/Case.workflow-meta.xml",
    "risks": [],
    "details": {
      "criteria": "onCreate; RT Falta de atención",
      "actions": "Status=Cerrado",
      "impact_on_agent": "Bajo"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "V · Automatización existente a validar",
    "order": 11,
    "criticality": "Baja",
    "actionRequired": "Verificar existencia y configuración"
  },
  {
    "id": "WF-003",
    "name": "Ticket Cerrado",
    "apiName": "Case.Ticket Cerrado",
    "type": "WorkflowRule (activa)",
    "source": "dependencias",
    "usedBy": [
      "OBJ-001"
    ],
    "actions": [],
    "deployClass": "Elemento existente a validar",
    "deployMethod": "Metadata API (Workflow)",
    "envSpecific": false,
    "envNotes": "",
    "status": "Confirmado",
    "evidence": "sf project retrieve start -m Workflow:Case; src/main/default/workflows/Case.workflow-meta.xml",
    "risks": [
      "ALTO: cierra en create los casos de FLW-005 (reclamación con Status Abierto), FLW-006, FLW-007, FLW-008"
    ],
    "details": {
      "criteria": "onCreateOnly; RT IN (Estatus Solicitud de Servicio [con Origin != Voz del Cliente], Consulta de Información General, Dirección de Sucursales, Bolsa de trabajo, ...)",
      "actions": "FieldUpdate Status=Cerrado",
      "impact_on_agent": "ALTO: cierra en create los casos de FLW-005 (reclamación con Status Abierto), FLW-006, FLW-007, FLW-008"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "V · Automatización existente a validar",
    "order": 11,
    "criticality": "Crítica",
    "actionRequired": "Verificar existencia y configuración"
  },
  {
    "id": "WF-004",
    "name": "Ticket Cerrado Atencion",
    "apiName": "Case.Ticket Cerrado Atencion",
    "type": "WorkflowRule (activa)",
    "source": "dependencias",
    "usedBy": [
      "OBJ-001"
    ],
    "actions": [],
    "deployClass": "Elemento existente a validar",
    "deployMethod": "Metadata API (Workflow)",
    "envSpecific": false,
    "envNotes": "",
    "status": "Confirmado",
    "evidence": "sf project retrieve start -m Workflow:Case; src/main/default/workflows/Case.workflow-meta.xml",
    "risks": [],
    "details": {
      "criteria": "onCreateOrTriggeringUpdate; TODAY()-DATEVALUE(CreatedDate)>=7",
      "actions": "Status=Cerrado",
      "impact_on_agent": "Bajo (casos antiguos)"
    },
    "aliases": [],
    "dependsOn": [],
    "phase": "V · Automatización existente a validar",
    "order": 11,
    "criticality": "Baja",
    "actionRequired": "Verificar existencia y configuración"
  },
  {
    "id": "WF-005",
    "name": "Ticket Envio Correo Cotizacion Nacional Cliente",
    "apiName": "Case.Ticket Envio Correo Cotizacion Nacional Cliente",
    "type": "WorkflowRule (activa)",
    "source": "dependencias",
    "usedBy": [
      "OBJ-001"
    ],
    "actions": [],
    "deployClass": "Elemento existente a validar",
    "deployMethod": "Metadata API (Workflow)",
    "envSpecific": false,
    "envNotes": "",
    "status": "Confirmado",
    "evidence": "sf project retrieve start -m Workflow:Case; src/main/default/workflows/Case.workflow-meta.xml",
    "risks": [],
    "details": {
      "criteria": "RT Cotización Nacional AND Requiere_envio_de_correo__c=Si AND Se_ofreci_descuento__c=SI",
      "actions": "Email alert Cotizacion_Nacional_Descuento (template Cotizacion_nacional_con_descuento) al ContactId",
      "impact_on_agent": "Bajo: FLW-004 setea Se_ofreci_descuento__c=NO (no envía). Si se cambia, se enviaría correo al cliente"
    },
    "aliases": [],
    "dependsOn": [
      "EA-001"
    ],
    "phase": "V · Automatización existente a validar",
    "order": 11,
    "criticality": "Baja",
    "actionRequired": "Verificar existencia y configuración"
  },
  {
    "id": "WF-006",
    "name": "Ticket Envio Correo Notificación: Estatus de Carta Porte (EAD)",
    "apiName": "Case.Ticket Envio Correo Notificación: Estatus de Carta Porte (EAD)",
    "type": "WorkflowRule (activa)",
    "source": "dependencias",
    "usedBy": [
      "OBJ-001"
    ],
    "actions": [],
    "deployClass": "Elemento existente a validar",
    "deployMethod": "Metadata API (Workflow)",
    "envSpecific": false,
    "envNotes": "",
    "status": "Confirmado",
    "evidence": "sf project retrieve start -m Workflow:Case; src/main/default/workflows/Case.workflow-meta.xml",
    "risks": [],
    "details": {
      "criteria": "RT Estatus Solicitud de Servicio AND Tipo_de_Entrega__c=EAD",
      "actions": "Email alert al contacto (template Estatus_de_carta_porte_EAD)",
      "impact_on_agent": "Bajo hoy (flows no setean Tipo_de_Entrega__c)"
    },
    "aliases": [],
    "dependsOn": [
      "EA-002"
    ],
    "phase": "V · Automatización existente a validar",
    "order": 11,
    "criticality": "Baja",
    "actionRequired": "Verificar existencia y configuración"
  },
  {
    "id": "WF-007",
    "name": "Ticket Envio Correo Notificación: Estatus de Carta Porte (Entrega OCURRE)",
    "apiName": "Case.Ticket Envio Correo Notificación: Estatus de Carta Porte (Entrega OCURRE)",
    "type": "WorkflowRule (activa)",
    "source": "dependencias",
    "usedBy": [
      "OBJ-001"
    ],
    "actions": [],
    "deployClass": "Elemento existente a validar",
    "deployMethod": "Metadata API (Workflow)",
    "envSpecific": false,
    "envNotes": "",
    "status": "Confirmado",
    "evidence": "sf project retrieve start -m Workflow:Case; src/main/default/workflows/Case.workflow-meta.xml",
    "risks": [],
    "details": {
      "criteria": "RT Estatus Solicitud de Servicio AND Tipo_de_Entrega__c=OCU",
      "actions": "Email alert al contacto (template Estatus_de_Carta_Porte_Entrega_de_OCURRE)",
      "impact_on_agent": "Bajo hoy"
    },
    "aliases": [],
    "dependsOn": [
      "EA-003"
    ],
    "phase": "V · Automatización existente a validar",
    "order": 11,
    "criticality": "Baja",
    "actionRequired": "Verificar existencia y configuración"
  }
];

export const securityRows: SecurityRow[] = [
  {
    "id": "SEC-001",
    "component": "Agent user (identidad de ejecución)",
    "operation": "Ejecutar todas las acciones del agente v18",
    "permission": "Profile 'Einstein Agent User' · UserLicense 'Einstein Agent' · IsActive=true · UserType Standard · ContactId=null · Role 'ADMINISTRADOR CRM' (sin roles subordinados; padre 'Gerencia JR inteligencia de negocios')",
    "identity": "agentforce_paquete_express@00d2e0000013exd.ext.qa2020 (005Vn000004fBRpIAM)",
    "evidence": "SOQL User + UserRole (2026-10-20)",
    "classification": "Efectivo",
    "notes": "Username contiene el Org Id de producción (00d2e0000013exd) + sufijo '.qa2020'. Id 005Vn… creado 2025-01-29 (pre-refresh) → probablemente existe en prod como '…@00d2e0000013exd.ext'. Validar en prod."
  },
  {
    "id": "SEC-002",
    "component": "Profile Einstein Agent User",
    "operation": "Permisos de sistema base",
    "permission": "ApiEnabled, ApiUserOnly, DigitalAgentUser, RunFlow (Modify/ViewAll=false)",
    "identity": "agentforce_paquete_express@00d2e0000013exd.ext.qa2020 (005Vn000004fBRpIAM)",
    "evidence": "Retrieve Profile 'Einstein Agent User' + PermissionSet owned-by-profile 0PSVn0000001i3qOAA",
    "classification": "Efectivo",
    "notes": "Profile además otorga acceso a 467 ApexClass, 33 ApexPage, 16 custom objects (SetupEntityAccess) → sobre-amplio."
  },
  {
    "id": "SEC-003",
    "component": "Agentforce Service Agent estándar",
    "operation": "Planner/runtime del agente, acceso a Case/Contact/Knowledge",
    "permission": "PSG AgentforceServiceAgentUserPsg + PS AgentforceServiceAgentUser, AgentforceServiceAgentBase, AgentforceServiceAgentSecureBase (PSL AgentforceServiceAgentUserPsl)",
    "identity": "agentforce_paquete_express@00d2e0000013exd.ext.qa2020 (005Vn000004fBRpIAM)",
    "evidence": "PermissionSetAssignment / PermissionSetLicenseAssign",
    "classification": "Efectivo",
    "notes": "Requeridos por Agentforce Service Agent."
  },
  {
    "id": "SEC-004",
    "component": "Agentforce Service Agent Builder",
    "operation": "Construir/activar/desactivar TODOS los agentes",
    "permission": "PS AgentforceServiceAgentBuilder (PSL AgentforceServiceAgentBuilderPsl)",
    "identity": "agentforce_paquete_express@00d2e0000013exd.ext.qa2020 (005Vn000004fBRpIAM)",
    "evidence": "PermissionSetAssignment",
    "classification": "Efectivo",
    "notes": "Sobre-privilegio: no lo necesita un usuario de ejecución. Remover en prod."
  },
  {
    "id": "SEC-005",
    "component": "Data Cloud",
    "operation": "Administración Data Cloud / Setup",
    "permission": "PS GenieAdmin 'Data Cloud Architect' (PermissionsCustomizeApplication=true, PermissionsViewSetup=true) + GenieMarketingManager + GenieMarketingManagerEnhancedSecurity (PSL GenieDataPlatformStarterPsl, CdpSegmentsActivationsCardPsl)",
    "identity": "agentforce_paquete_express@00d2e0000013exd.ext.qa2020 (005Vn000004fBRpIAM)",
    "evidence": "PermissionSetAssignment + PermissionSet system perms",
    "classification": "Efectivo",
    "notes": "Sobre-privilegio crítico (Customize Application). Puede ser que se asignó para que el retriever ADL de FAQ_Search funcione; validar el permiso mínimo (p.ej. Data Cloud User/retriever access) antes de retirar."
  },
  {
    "id": "SEC-006",
    "component": "Prompt templates (FAQ_Search, Case_Summary_Agentforce)",
    "operation": "Ejecutar prompt templates",
    "permission": "PS EinsteinGPTPromptTemplateUser (requerido) + EinsteinGPTPromptTemplateManager (sobre-privilegio) · PSL EinsteinGPTPromptTemplatesPsl",
    "identity": "agentforce_paquete_express@00d2e0000013exd.ext.qa2020 (005Vn000004fBRpIAM)",
    "evidence": "PermissionSetAssignment",
    "classification": "Efectivo",
    "notes": "Manager permite editar templates; retirar en prod."
  },
  {
    "id": "SEC-007",
    "component": "Licencias PSL no relacionadas",
    "operation": "n/a",
    "permission": "PSL HighVelocitySalesPsl (Sales Engagement), InboundLeadGenAgentPsl (1/1 usada por este usuario)",
    "identity": "agentforce_paquete_express@00d2e0000013exd.ext.qa2020 (005Vn000004fBRpIAM)",
    "evidence": "PermissionSetLicenseAssign",
    "classification": "Efectivo",
    "notes": "No requeridas para v18; InboundLeadGenAgentPsl consume la única licencia disponible."
  },
  {
    "id": "SEC-008",
    "component": "Case",
    "operation": "Crear casos (Crea_caso_* x6, Create_case_Agent_paquete), leer (SvcCopilotTmpl GetCaseByCaseNumber/GetCasesForContact), comentar (AddCaseComment)",
    "permission": "ObjectPermissions Case R/C/E/D (ViewAll/ModifyAll=false) en Agentforce_Paquete_Express_Permissions",
    "identity": "agentforce_paquete_express@00d2e0000013exd.ext.qa2020 (005Vn000004fBRpIAM)",
    "evidence": "SOQL ObjectPermissions",
    "classification": "Efectivo",
    "notes": "Delete no es necesario → retirar. Agentforce_Paquete_Express_Permissions creado 2025-01-29 (existe en prod) pero modificado en sandbox 2026-08-26 → hay delta a desplegar."
  },
  {
    "id": "SEC-009",
    "component": "Contact",
    "operation": "Buscar por email y crear contacto (AG_Get_and_create_contact)",
    "permission": "ObjectPermissions Contact R/C/E/D en Agentforce_Paquete_Express_Permissions",
    "identity": "agentforce_paquete_express@00d2e0000013exd.ext.qa2020 (005Vn000004fBRpIAM)",
    "evidence": "SOQL ObjectPermissions + flow recordLookups/recordCreates",
    "classification": "Efectivo",
    "notes": "Delete innecesario."
  },
  {
    "id": "SEC-010",
    "component": "Account",
    "operation": "Lookup cuenta '7 PUBLICO GENERAL' por Name (AG_Get_and_create_contact)",
    "permission": "ObjectPermissions Account R/C/E en Agentforce_Paquete_Express_Permissions",
    "identity": "agentforce_paquete_express@00d2e0000013exd.ext.qa2020 (005Vn000004fBRpIAM)",
    "evidence": "SOQL ObjectPermissions",
    "classification": "Efectivo",
    "notes": "El flow solo lee Account; Create/Edit innecesarios."
  },
  {
    "id": "SEC-011",
    "component": "MessagingSession / MessagingEndUser",
    "operation": "Variables de contexto (ChannelName, ChannelType, RoutableId, EndUserId, EndUserLanguage, ContactId, WhatsAppPhone)",
    "permission": "MessagingSession R/E; MessagingEndUser R en Agentforce_Paquete_Express_Permissions",
    "identity": "agentforce_paquete_express@00d2e0000013exd.ext.qa2020 (005Vn000004fBRpIAM)",
    "evidence": "SOQL ObjectPermissions + Bot contextVariables",
    "classification": "Efectivo",
    "notes": "OWD ReadWrite en ambos."
  },
  {
    "id": "SEC-012",
    "component": "Sucursal__c",
    "operation": "No usado por v18 (lo usa V19/Glp)",
    "permission": "Sucursal__c R/C/E/D + ViewAllRecords + ModifyAllRecords en Agentforce_Paquete_Express_Permissions; Read en GLP_RAD_Agentforce",
    "identity": "agentforce_paquete_express@00d2e0000013exd.ext.qa2020 (005Vn000004fBRpIAM)",
    "evidence": "SOQL ObjectPermissions",
    "classification": "Efectivo",
    "notes": "Sobre-privilegio (Modify All). No requerido por v18 (Deducido: ninguna acción v18 lo referencia)."
  },
  {
    "id": "SEC-013",
    "component": "Apex CheckBusinessHours",
    "operation": "Acción directa apex://CheckBusinessHours (Escalation_v2)",
    "permission": "SetupEntityAccess ApexClass 01p2E00000CfIBQQA3 en Agentforce_Paquete_Express_Permissions",
    "identity": "agentforce_paquete_express@00d2e0000013exd.ext.qa2020 (005Vn000004fBRpIAM)",
    "evidence": "SOQL SetupEntityAccess",
    "classification": "Efectivo",
    "notes": "Clase ignora el input y usa nombre hardcodeado 'Horario Paquete'."
  },
  {
    "id": "SEC-014",
    "component": "Apex RastreoEnvio (vía flow PE_GetOrderStatus)",
    "operation": "Callout rastreo",
    "permission": "SIN SetupEntityAccess para el usuario del agente (solo sfdc_chatbot_service_permset y otros perfiles)",
    "identity": "agentforce_paquete_express@00d2e0000013exd.ext.qa2020 (005Vn000004fBRpIAM)",
    "evidence": "SOQL SetupEntityAccess por SetupEntityId 01p2E00000CTO3VQAX",
    "classification": "Pendiente",
    "notes": "Si la release update 'Require User Access to Apex Classes Invoked by Flow' está aplicada en prod, la acción fallará. Recomendado agregar ApexClass access al PS del agente."
  },
  {
    "id": "SEC-015",
    "component": "Apex CotizacionEnvioV2 (vía Obtener_Cotizaci_n_Paqueter_a)",
    "operation": "Callout cotización",
    "permission": "SIN SetupEntityAccess para el usuario del agente",
    "identity": "agentforce_paquete_express@00d2e0000013exd.ext.qa2020 (005Vn000004fBRpIAM)",
    "evidence": "SOQL SetupEntityAccess 01p2E00000CfKodQAF",
    "classification": "Pendiente",
    "notes": "Mismo riesgo que RastreoEnvio."
  },
  {
    "id": "SEC-016",
    "component": "Apex validaCodigo2 (vía PE_GetValidOriginPostalCode / PE_GetValidDestinationPostalCode)",
    "operation": "Callout validación CP",
    "permission": "SIN SetupEntityAccess para el usuario del agente",
    "identity": "agentforce_paquete_express@00d2e0000013exd.ext.qa2020 (005Vn000004fBRpIAM)",
    "evidence": "SOQL SetupEntityAccess 01p2E00000CfKofQAF",
    "classification": "Pendiente",
    "notes": "Mismo riesgo."
  },
  {
    "id": "SEC-017",
    "component": "Apex CaseSummaryAgentforceInvocable (vía Crea_caso_seguimiento_de_una_orden)",
    "operation": "Resumen IA del caso via ConnectApi.EinsteinLLM + prompt Case_Summary_Agentforce + getConvTscpForRecord",
    "permission": "SIN SetupEntityAccess para el usuario del agente; PromptTemplateUser presente",
    "identity": "agentforce_paquete_express@00d2e0000013exd.ext.qa2020 (005Vn000004fBRpIAM)",
    "evidence": "SOQL SetupEntityAccess 01pdh00000FZujRAAT; código Apex",
    "classification": "Pendiente",
    "notes": "Clase creada en sandbox (01pdh) → no existe en prod; desplegar junto con prompt template Case_Summary_Agentforce (activar)."
  },
  {
    "id": "SEC-018",
    "component": "Flows de acción (13 retrievados)",
    "operation": "Ejecutar flows desde el agente",
    "permission": "Profile RunFlow=true; ningún flow tiene isAdditionalPermissionRequiredToRun=true",
    "identity": "agentforce_paquete_express@00d2e0000013exd.ext.qa2020 (005Vn000004fBRpIAM)",
    "evidence": "Flow XML + Profile",
    "classification": "Efectivo",
    "notes": "AllFlows PS solo da FlowAccess a UpdateDocumentoFirmas (irrelevante)."
  },
  {
    "id": "SEC-019",
    "component": "Modo de ejecución de flows",
    "operation": "Contexto de sharing en lookups/creates",
    "permission": "Ningún flow define runInMode (DefaultMode)",
    "identity": "agentforce_paquete_express@00d2e0000013exd.ext.qa2020 (005Vn000004fBRpIAM)",
    "evidence": "grep runInMode en flows/",
    "classification": "Deducido",
    "notes": "Para acciones de agente se ejecutan como el usuario del agente; con OWD Private la visibilidad depende de ownership/sharing. Validar con prueba en prod."
  },
  {
    "id": "SEC-020",
    "component": "FLS Case (campos escritos por Crea_caso_*)",
    "operation": "Crear Case con campos custom",
    "permission": "Read/Edit en Agentforce_Paquete_Express_Permissions: Crear_ticket_duplicado__c, Descripcion_del_Contenido__c, Motivo_de_no_env_o__c, Pais_destino__c, Se_realizo_el_envio__c, Tarifa__c, Medio_de_contacto__c, Como_nos_conoci_el_cliente__c, Descuento__c, Desea_cotizacion_por_correo__c, Motivo_de_NO_activaci_n__c, Se_activ_descuento__c, Se_ofreci_descuento__c, Tipo_de_Cotizacion__c, Cliente_solicito_crear_caso__c, Numero_de_Rastreo__c, Guia__c, Origin, Description, Subject, ContactId",
    "identity": "agentforce_paquete_express@00d2e0000013exd.ext.qa2020 (005Vn000004fBRpIAM)",
    "evidence": "SOQL FieldPermissions vs inputAssignments de los flows",
    "classification": "Efectivo",
    "notes": "Status y RecordTypeId no tienen fila FLS (estándar)."
  },
  {
    "id": "SEC-021",
    "component": "FLS Contact",
    "operation": "Crear contacto",
    "permission": "Read/Edit Email, MobilePhone, AccountId en Agentforce_Paquete_Express_Permissions y profile; FirstName/LastName estándar",
    "identity": "agentforce_paquete_express@00d2e0000013exd.ext.qa2020 (005Vn000004fBRpIAM)",
    "evidence": "SOQL FieldPermissions",
    "classification": "Efectivo",
    "notes": ""
  },
  {
    "id": "SEC-022",
    "component": "Record Types Case (6)",
    "operation": "Crear casos con RT Direccion_de_vacantes, Cotizacion_de_Envios_Internacionales, Cotizacion_de_Envios_Nacionales, Estatus_Solicitud_de_Servicio, Direccion_de_Sucursales, Consulta_de_Informacion_General",
    "permission": "recordTypeVisibilities visible=true en Agentforce_Paquete_Express_Permissions (profile visible=false)",
    "identity": "agentforce_paquete_express@00d2e0000013exd.ext.qa2020 (005Vn000004fBRpIAM)",
    "evidence": "Retrieve PermissionSet + Profile",
    "classification": "Efectivo",
    "notes": "Los RT deben existir en prod con el mismo DeveloperName (lookup por DeveloperName)."
  },
  {
    "id": "SEC-023",
    "component": "Sharing Case/Contact/Account",
    "operation": "Leer casos de un contacto / buscar contacto por email",
    "permission": "OWD Private (interno y externo); rol ADMINISTRADOR CRM sin subordinados; sharing rules (11) no apuntan a ese rol",
    "identity": "agentforce_paquete_express@00d2e0000013exd.ext.qa2020 (005Vn000004fBRpIAM)",
    "evidence": "EntityDefinition.InternalSharingModel + SharingRules retrieve",
    "classification": "Deducido",
    "notes": "Visibilidad efectiva ≈ registros propios. Evidencia: 386 de 386 casos creados por el agente en 30 días siguen con Owner = agente → nadie humano es dueño; GetCasesForContact/GetCaseByCaseNumber solo verían casos propios del agente y Get_Contact_By_Email podría no encontrar contactos existentes de otros owners (riesgo de duplicados)."
  },
  {
    "id": "SEC-024",
    "component": "Account '7 PUBLICO GENERAL'",
    "operation": "Lookup por Name para AccountId del contacto",
    "permission": "Owner distinto al agente; 72/72 contactos creados por el agente en 30 días quedaron ligados a esa cuenta",
    "identity": "agentforce_paquete_express@00d2e0000013exd.ext.qa2020 (005Vn000004fBRpIAM)",
    "evidence": "SOQL counts",
    "classification": "Efectivo",
    "notes": "Funciona en sandbox, mecanismo de acceso no determinado (Pendiente). Registro creado en sandbox (001dh…) → en prod debe existir cuenta con Name exacto."
  },
  {
    "id": "SEC-025",
    "component": "SvcCopilotTmpl__AddCaseComment / GetCaseByCaseNumber / GetCasesForContact",
    "operation": "Leer/comentar casos",
    "permission": "Flows de plantilla estándar; no recuperables como Flow (Entity cannot be found)",
    "identity": "agentforce_paquete_express@00d2e0000013exd.ext.qa2020 (005Vn000004fBRpIAM)",
    "evidence": "sf project retrieve (fallido)",
    "classification": "Pendiente",
    "notes": "Validar disponibilidad en prod (provienen de plantillas Service Agent) y que respetan sharing."
  },
  {
    "id": "SEC-026",
    "component": "FAQ_Search (genAiPromptTemplate)",
    "operation": "generatePromptResponse con retriever ADL",
    "permission": "PromptTemplateUser + permisos Data Cloud (GenieAdmin) ",
    "identity": "agentforce_paquete_express@00d2e0000013exd.ext.qa2020 (005Vn000004fBRpIAM)",
    "evidence": "Retrieve GenAiPromptTemplate",
    "classification": "Deducido",
    "notes": "Retriever File_ADL_LibreriaDeDatos_1Cx_K4B73f7782b; el acceso al retriever depende de Data Cloud. Validar mínimo privilegio."
  },
  {
    "id": "SEC-027",
    "component": "Identidad compartida entre agentes",
    "operation": "Ejecución de 4 agentes distintos",
    "permission": "Mismo usuario tiene NextGen_*_Permissions de Agentforce_Paquete_Express, Paquetexpress_Service_Agent_Split, FDE_Paquetexpress_Service_Agent_Split_voice y Paquete_Express_vX; además GLP_RAD_Agentforce (10 clases Glp*) y NextGen…12sb (5 clases MOCK_GLP_*)",
    "identity": "agentforce_paquete_express@00d2e0000013exd.ext.qa2020 (005Vn000004fBRpIAM)",
    "evidence": "PermissionSetAssignment + SetupEntityAccess",
    "classification": "Efectivo",
    "notes": "Mezcla de permisos de V19/voz/mocks en el usuario de v18. En prod separar o depurar (MOCK_* no debe ir a prod)."
  },
  {
    "id": "SEC-028",
    "component": "Verificación del cliente",
    "operation": "Acceso a datos de casos del contacto",
    "permission": "Agent Script: verificación solo nombre + correo; canal web authMode=UnAuth",
    "identity": "Usuario final anónimo (web) / número WhatsApp",
    "evidence": "Agent script + MessagingChannel fde_Web_messaging embeddedConfig",
    "classification": "Deducido",
    "notes": "Riesgo de suplantación: cualquiera que conozca un correo puede consultar/comentar casos de ese contacto."
  },
  {
    "id": "SEC-029",
    "component": "Credenciales API Paquetexpress",
    "operation": "Autenticación a APIs de cotización",
    "permission": "Token hardcodeado (usuario/password vacíos) en Apex CotizacionEnvioV2.generateHeader() (valores no reproducidos)",
    "identity": "Código Apex (sin Named/External Credential)",
    "evidence": "classes/CotizacionEnvioV2.cls l.170-175",
    "classification": "Efectivo",
    "notes": "Secreto en código fuente/metadata; rotar y mover a Named Credential/External Credential."
  },
  {
    "id": "SEC-030",
    "component": "Einstein Trust Layer",
    "operation": "Enmascaramiento de datos en prompts",
    "permission": "AITrustAttrSetup habilitados: PERSON, EMAIL_ADDRESS, PHONE_NUMBER, CREDIT_CARD, US_SSN (17 restantes deshabilitados); enableEnhancedPromptSecurity=false",
    "identity": "Org",
    "evidence": "SOQL AITrustAttrSetup + EinsteinGpt.settings",
    "classification": "Efectivo",
    "notes": "Revisar en prod la misma configuración (no desplegable vía este bundle)."
  },
  {
    "id": "SEC-031",
    "component": "Bot settings privacidad",
    "operation": "Logs de conversación",
    "permission": "logPrivateConversationData=false; descripción contiene '#DisableURLRedaction#'; sessionTimeout=0",
    "identity": "Bot Paquete_Express_vX",
    "evidence": "bots/Paquete_Express_vX.bot-meta.xml",
    "classification": "Efectivo",
    "notes": "URLs no se redactan (intencional para ligas oficiales)."
  },
  {
    "id": "SEC-032",
    "component": "Case Settings",
    "operation": "Owner por defecto de casos",
    "permission": "defaultCaseOwner = usuario interno específico (User)",
    "identity": "Org",
    "evidence": "settings/Case.settings-meta.xml",
    "classification": "Efectivo",
    "notes": "Específico de ambiente; no aplicado a casos del agente (siguen owner agente)."
  }
];

export const scriptVariables: ScriptVariable[] = [
  {
    "name": "contactRecord",
    "kind": "mutable",
    "type": "object",
    "default": "{}",
    "description": "Almacena el registro (record) del contacto verificado para relacionarlo con casos y consultarlos. Se puebla al verificar al cliente.",
    "source": null,
    "visibility": "Internal"
  },
  {
    "name": "isVerified",
    "kind": "mutable",
    "type": "boolean",
    "default": "False",
    "description": "Almacena un valor booleano que indica si el cliente está verificado.",
    "source": null,
    "visibility": "External"
  },
  {
    "name": "isExistingContact",
    "kind": "mutable",
    "type": "boolean",
    "default": "False",
    "description": "True si el contacto ya existía en Salesforce al verificar; False si se creó durante la verificación.",
    "source": null,
    "visibility": "Internal"
  },
  {
    "name": "pendingIntent",
    "kind": "mutable",
    "type": "string",
    "default": "\"\"",
    "description": "Intención original del cliente capturada antes de la verificación, para que el agente retome el subagente correcto después de verificar. Valores permitidos: Quote, Order, Case, GeneralInfo, JobBranch, Escalation, o vacío cuando no hay intención pendiente.",
    "source": null,
    "visibility": null
  },
  {
    "name": "customerEmail",
    "kind": "mutable",
    "type": "string",
    "default": "\"\"",
    "description": "Almacena el correo electrónico proporcionado por el cliente durante la verificación.",
    "source": null,
    "visibility": null
  },
  {
    "name": "customerFirstName",
    "kind": "mutable",
    "type": "string",
    "default": "\"\"",
    "description": "Almacena el nombre proporcionado por el cliente durante la verificación.",
    "source": null,
    "visibility": null
  },
  {
    "name": "customerLastName",
    "kind": "mutable",
    "type": "string",
    "default": "\"\"",
    "description": "Almacena el apellido proporcionado por el cliente durante la verificación.",
    "source": null,
    "visibility": null
  },
  {
    "name": "customerPhone",
    "kind": "mutable",
    "type": "string",
    "default": "\"\"",
    "description": "Teléfono del cliente. En WhatsApp se toma automáticamente del remitente (WhatsAppPhone) sin preguntar; en web (EmbeddedMessaging) se pregunta y se registra con capture_phone. La normalización a 10 dígitos se hace en el flujo que guarda el Contacto.",
    "source": null,
    "visibility": null
  },
  {
    "name": "nationalQuoteCaseCreated",
    "kind": "mutable",
    "type": "boolean",
    "default": "False",
    "description": "Almacena si ya se creó el caso de cotización nacional en la conversación actual.",
    "source": null,
    "visibility": null
  },
  {
    "name": "serviceCaseCreated",
    "kind": "mutable",
    "type": "boolean",
    "default": "False",
    "description": "Almacena si ya se creó el caso de solicitud de servicio en la conversación actual.",
    "source": null,
    "visibility": null
  },
  {
    "name": "orderCaseCreated",
    "kind": "mutable",
    "type": "boolean",
    "default": "False",
    "description": "Almacena si ya se creó el caso de seguimiento de orden en la conversación actual.",
    "source": null,
    "visibility": null
  },
  {
    "name": "faqCaseCreated",
    "kind": "mutable",
    "type": "boolean",
    "default": "False",
    "description": "Almacena si ya se creó el caso de consulta de información general (FAQ) en la conversación actual.",
    "source": null,
    "visibility": null
  },
  {
    "name": "branchCaseCreated",
    "kind": "mutable",
    "type": "boolean",
    "default": "False",
    "description": "Almacena si ya se creó el caso de consulta de sucursales en la conversación actual.",
    "source": null,
    "visibility": null
  },
  {
    "name": "jobCaseCreated",
    "kind": "mutable",
    "type": "boolean",
    "default": "False",
    "description": "Almacena si ya se creó el caso de consulta de vacantes de empleo en la conversación actual.",
    "source": null,
    "visibility": null
  },
  {
    "name": "caseSubject",
    "kind": "mutable",
    "type": "string",
    "default": "\"\"",
    "description": "Asunto (menos de 7 palabras) capturado por el LLM para el caso que se creará automáticamente. Se vacía después de crear el caso.",
    "source": null,
    "visibility": null
  },
  {
    "name": "caseDescription",
    "kind": "mutable",
    "type": "string",
    "default": "\"\"",
    "description": "Descripción (máximo 3 oraciones) capturada por el LLM para el caso que se creará automáticamente. Se vacía después de crear el caso.",
    "source": null,
    "visibility": null
  },
  {
    "name": "explicitCaseRequested",
    "kind": "mutable",
    "type": "boolean",
    "default": "False",
    "description": "True cuando el cliente pidió EXPLÍCITAMENTE abrir/crear un caso general (no portería silenciosa). Determina si se le pide asunto/descripción y se le muestra el número de caso.",
    "source": null,
    "visibility": null
  },
  {
    "name": "caseTrackingAsked",
    "kind": "mutable",
    "type": "boolean",
    "default": "False",
    "description": "True cuando ya se le preguntó al cliente si tiene número de guía o de rastreo para el caso de solicitud de servicio, sin importar si dio alguno o dijo que no. Hasta que sea True, el caso NO se crea; una vez True, el caso se crea con lo que haya (guía/rastreo o vacío).",
    "source": null,
    "visibility": null
  },
  {
    "name": "caseRouteLock",
    "kind": "mutable",
    "type": "boolean",
    "default": "False",
    "description": "Candado de ruteo. True mientras el cliente está creando un caso explícito (explicitCaseRequested True y serviceCaseCreated False). Mientras sea True, las transiciones a Orden Management y Escalamiento quedan deshabilitadas para que un número de guía/rastreo o la palabra 'paquete' no desvíen el caso en curso a una consulta de estatus.",
    "source": null,
    "visibility": null
  },
  {
    "name": "caseMotivoShown",
    "kind": "mutable",
    "type": "boolean",
    "default": "False",
    "description": "True cuando ya se mostró al cliente la pregunta del motivo del caso. Se usa para promover caseMotivoReady en el siguiente turno y así impedir que el LLM invente el motivo antes de preguntarlo.",
    "source": null,
    "visibility": null
  },
  {
    "name": "caseMotivoReady",
    "kind": "mutable",
    "type": "boolean",
    "default": "False",
    "description": "Candado de secuencia: se promueve a True en before_reasoning el turno siguiente a mostrar la pregunta del motivo. Habilita capture_case_details SOLO después de que el cliente haya tenido un turno para describir el problema; impide fabricar el motivo en el mismo turno de la petición.",
    "source": null,
    "visibility": null
  },
  {
    "name": "caseTrackingShown",
    "kind": "mutable",
    "type": "boolean",
    "default": "False",
    "description": "True cuando ya se mostró al cliente la pregunta de guía/rastreo. Se usa para promover caseTrackingReady en el siguiente turno.",
    "source": null,
    "visibility": null
  },
  {
    "name": "caseTrackingReady",
    "kind": "mutable",
    "type": "boolean",
    "default": "False",
    "description": "Candado de secuencia: se promueve a True en before_reasoning el turno siguiente a mostrar la pregunta de guía/rastreo. Habilita capture_case_tracking y skip_case_tracking SOLO después de que el cliente haya tenido un turno para responder; impide saltarse la pregunta en el mismo turno.",
    "source": null,
    "visibility": null
  },
  {
    "name": "caseGuia",
    "kind": "mutable",
    "type": "string",
    "default": "\"\"",
    "description": "Número de guía que el cliente proporcionó para el caso de solicitud de servicio. Se registra SOLO si el cliente lo dio explícitamente; nunca se inventa. Puede quedar vacío.",
    "source": null,
    "visibility": null
  },
  {
    "name": "caseRastreo",
    "kind": "mutable",
    "type": "string",
    "default": "\"\"",
    "description": "Número de rastreo que el cliente proporcionó para el caso de solicitud de servicio. Se registra SOLO si el cliente lo dio explícitamente; nunca se inventa. Puede quedar vacío.",
    "source": null,
    "visibility": null
  },
  {
    "name": "trackingNumber",
    "kind": "mutable",
    "type": "string",
    "default": "\"\"",
    "description": "Número de rastreo/guía capturado por el LLM para el estatus de la orden y los casos de seguimiento.",
    "source": null,
    "visibility": null
  },
  {
    "name": "orderStatusMessage",
    "kind": "mutable",
    "type": "string",
    "default": "\"\"",
    "description": "Mensaje de estatus de la orden devuelto por la acción de estatus, mostrado al cliente y usado como descripción del caso de seguimiento.",
    "source": null,
    "visibility": null
  },
  {
    "name": "reportRequested",
    "kind": "mutable",
    "type": "boolean",
    "default": "False",
    "description": "Se establece en True SOLO cuando el cliente solicita explícitamente abrir un reporte, reclamación, folio o caso de seguimiento sobre su envío. Distingue la reclamación (seguimiento) de la portería silenciosa tras una consulta de estatus.",
    "source": null,
    "visibility": null
  },
  {
    "name": "orderPorteriaCaseCreated",
    "kind": "mutable",
    "type": "boolean",
    "default": "False",
    "description": "Almacena si ya se creó el caso de portería silenciosa (solicitud de servicio) tras una consulta de estatus en Orden Management, para no crearlo dos veces.",
    "source": null,
    "visibility": null
  },
  {
    "name": "verifiedContactId",
    "kind": "mutable",
    "type": "string",
    "default": "\"\"",
    "description": "Id de Salesforce del contacto verificado (copiado del output del flujo de verificacion). Se usa como contactRecordId al crear casos. Nombre unico para evitar cualquier ambiguedad con la variable enlazada ContactId.",
    "source": null,
    "visibility": null
  },
  {
    "name": "contactChannel",
    "kind": "mutable",
    "type": "string",
    "default": "\"Chat\"",
    "description": "Medio de contacto para los casos. Se siembra desde ChannelType cuando hay sesion de messaging real; su valor por defecto (Chat) evita que el input requerido medioDeContacto quede vacio al probar por CLI.",
    "source": null,
    "visibility": null
  },
  {
    "name": "shipmentType",
    "kind": "mutable",
    "type": "string",
    "default": "\"\"",
    "description": "Almacena la clasificación del envío. Los valores permitidos son Domestic o International.",
    "source": null,
    "visibility": null
  },
  {
    "name": "destinationCountry",
    "kind": "mutable",
    "type": "string",
    "default": "\"\"",
    "description": "Almacena el país de destino cuando el envío es International.",
    "source": null,
    "visibility": null
  },
  {
    "name": "internationalCaseCreated",
    "kind": "mutable",
    "type": "boolean",
    "default": "False",
    "description": "Almacena si el caso de cotización internacional ya se creó, para que nunca se cree dos veces.",
    "source": null,
    "visibility": null
  },
  {
    "name": "internationalTransferDecision",
    "kind": "mutable",
    "type": "string",
    "default": "\"\"",
    "description": "Almacena la decisión de transferencia del cliente después de crear un caso de cotización internacional. Los valores permitidos son Yes o No.",
    "source": null,
    "visibility": null
  },
  {
    "name": "newQuoteRequested",
    "kind": "mutable",
    "type": "boolean",
    "default": "False",
    "description": "True cuando el cliente pide hacer OTRA/NUEVA cotización tras completar una previa. Dispara el reinicio del estado de cotización en Quote_Management para volver a preguntar si el envío es nacional o internacional.",
    "source": null,
    "visibility": null
  },
  {
    "name": "jobBranchType",
    "kind": "mutable",
    "type": "string",
    "default": "\"\"",
    "description": "Indica si el cliente pregunto por sucursales (Branch) o por empleo (Job) en Job_Search, para crear el caso correcto de forma determinista. Valores permitidos: Branch o Job.",
    "source": null,
    "visibility": null
  },
  {
    "name": "quoteCPOrigen",
    "kind": "mutable",
    "type": "string",
    "default": "\"\"",
    "description": "Codigo postal de origen capturado para la cotizacion nacional.",
    "source": null,
    "visibility": null
  },
  {
    "name": "quoteCPDestino",
    "kind": "mutable",
    "type": "string",
    "default": "\"\"",
    "description": "Codigo postal de destino capturado para la cotizacion nacional.",
    "source": null,
    "visibility": null
  },
  {
    "name": "quoteTipo",
    "kind": "mutable",
    "type": "string",
    "default": "\"\"",
    "description": "Tipo de envio capturado para la cotizacion nacional (Package o Envelope).",
    "source": null,
    "visibility": null
  },
  {
    "name": "quoteTipoRegistrado",
    "kind": "mutable",
    "type": "string",
    "default": "\"\"",
    "description": "Ancla de coherencia: guarda el tipo (Package/Envelope) para el que YA se capturaron o autollenaron los detalles. Cuando quoteTipo cambia respecto a este valor (p. ej. el cliente pasa de Sobre a Paquete), se detecta el cambio y se limpian peso/dimensiones/RAD/EAD/IVPF/monto para que las ramas deterministas vuelvan a pedir los datos desde cero.",
    "source": null,
    "visibility": "Internal"
  },
  {
    "name": "quotePeso",
    "kind": "mutable",
    "type": "string",
    "default": "\"\"",
    "description": "Peso en kilogramos capturado para la cotizacion nacional.",
    "source": null,
    "visibility": null
  },
  {
    "name": "quoteLargo",
    "kind": "mutable",
    "type": "string",
    "default": "\"\"",
    "description": "Largo en centimetros capturado para la cotizacion nacional.",
    "source": null,
    "visibility": null
  },
  {
    "name": "quoteAncho",
    "kind": "mutable",
    "type": "string",
    "default": "\"\"",
    "description": "Ancho en centimetros capturado para la cotizacion nacional.",
    "source": null,
    "visibility": null
  },
  {
    "name": "quoteAlto",
    "kind": "mutable",
    "type": "string",
    "default": "\"\"",
    "description": "Alto en centimetros capturado para la cotizacion nacional.",
    "source": null,
    "visibility": null
  },
  {
    "name": "quoteRAD",
    "kind": "mutable",
    "type": "string",
    "default": "\"\"",
    "description": "Respuesta a si requiere recoleccion a domicilio (Yes/No) para la cotizacion nacional.",
    "source": null,
    "visibility": null
  },
  {
    "name": "quoteEAD",
    "kind": "mutable",
    "type": "string",
    "default": "\"\"",
    "description": "Respuesta a si requiere entrega a domicilio (Yes/No) para la cotizacion nacional.",
    "source": null,
    "visibility": null
  },
  {
    "name": "quoteIVPF",
    "kind": "mutable",
    "type": "string",
    "default": "\"\"",
    "description": "Respuesta a si requiere asegurar la mercancia (Yes/No) para la cotizacion nacional.",
    "source": null,
    "visibility": null
  },
  {
    "name": "quoteAmt",
    "kind": "mutable",
    "type": "number",
    "default": "0",
    "description": "Importe a asegurar (entero, sin decimales) para la cotizacion nacional. 0 cuando no aplica.",
    "source": null,
    "visibility": null
  },
  {
    "name": "quoteResult",
    "kind": "mutable",
    "type": "string",
    "default": "\"\"",
    "description": "Mensaje de cotizacion devuelto por la accion Obtener Cotizacion Paqueteria, mostrado al cliente y usado como base del caso nacional.",
    "source": null,
    "visibility": null
  },
  {
    "name": "quoteResultShown",
    "kind": "mutable",
    "type": "boolean",
    "default": "False",
    "description": "True cuando ya se mostró al cliente el resultado de una cotización completada. Si el cliente vuelve a Quote_Management con esto en True, significa que quiere OTRA cotización: se reinicia TODO el estado de forma determinista (sin depender de que el LLM llame request_new_quote). Se limpia en el reinicio.",
    "source": null,
    "visibility": "Internal"
  },
  {
    "name": "quoteCPOrigenRaw",
    "kind": "mutable",
    "type": "string",
    "default": "\"\"",
    "description": "Código postal de origen TAL CUAL lo escribió el cliente, antes de validar. El LLM solo lo guarda; un bloque determinista lo valida y, si es válido, lo promueve a quoteCPOrigen. Así la captura no depende de que el LLM recuerde validar.",
    "source": null,
    "visibility": "Internal"
  },
  {
    "name": "quoteCPDestinoRaw",
    "kind": "mutable",
    "type": "string",
    "default": "\"\"",
    "description": "Código postal de destino TAL CUAL lo escribió el cliente, antes de validar. El LLM solo lo guarda; un bloque determinista lo valida y, si es válido, lo promueve a quoteCPDestino.",
    "source": null,
    "visibility": "Internal"
  },
  {
    "name": "quoteCpOrigenMsg",
    "kind": "mutable",
    "type": "string",
    "default": "\"\"",
    "description": "Mensaje devuelto por la validación del CP de origen. Es 'Código Postal  válido' cuando es válido; cualquier otro texto indica inválido y se muestra al cliente para que reintente.",
    "source": null,
    "visibility": "Internal"
  },
  {
    "name": "quoteCpDestinoMsg",
    "kind": "mutable",
    "type": "string",
    "default": "\"\"",
    "description": "Mensaje devuelto por la validación del CP de destino. Es 'Código Postal  válido' cuando es válido; cualquier otro texto indica inválido y se muestra al cliente para que reintente.",
    "source": null,
    "visibility": "Internal"
  },
  {
    "name": "quoteInProgress",
    "kind": "mutable",
    "type": "boolean",
    "default": "False",
    "description": "Ancla de reentrada: True mientras hay una cotizacion en curso pero el envio aun NO se clasifica como Domestic/International (shipmentType vacio). El router la usa para volver a Quote_Management de forma determinista en la ventana de clasificacion, evitando que el router responda por su cuenta la respuesta 'nacional'/'internacional'.",
    "source": null,
    "visibility": "Internal"
  },
  {
    "name": "faqQuestion",
    "kind": "mutable",
    "type": "string",
    "default": "\"\"",
    "description": "Version concisa de la consulta de informacion general del cliente. Su captura dispara el loop post-accion que crea el caso de forma determinista en General Information.",
    "source": null,
    "visibility": null
  },
  {
    "name": "isWithinBusinessHours",
    "kind": "mutable",
    "type": "boolean",
    "default": "False",
    "description": "Almacena si la hora actual está dentro del horario de atención configurado (Horario Paquete). Se establece con la validación de horario antes de escalar a un agente en vivo.",
    "source": null,
    "visibility": "Internal"
  },
  {
    "name": "ChannelName",
    "kind": "linked",
    "type": "string",
    "default": null,
    "description": "Esta variable también puede llamarse MessagingSession ChannelName",
    "source": "@MessagingSession.ChannelName",
    "visibility": null
  },
  {
    "name": "ChannelType",
    "kind": "linked",
    "type": "string",
    "default": null,
    "description": "Esta variable también puede llamarse MessagingSession ChannelType",
    "source": "@MessagingSession.ChannelType",
    "visibility": null
  },
  {
    "name": "ContactId",
    "kind": "linked",
    "type": "string",
    "default": null,
    "description": "Esta variable también puede llamarse MessagingEndUser ContactId",
    "source": "@MessagingEndUser.ContactId",
    "visibility": null
  },
  {
    "name": "EndUserId",
    "kind": "linked",
    "type": "string",
    "default": null,
    "description": "Esta variable también puede llamarse MessagingEndUser Id",
    "source": "@MessagingSession.MessagingEndUserId",
    "visibility": null
  },
  {
    "name": "EndUserLanguage",
    "kind": "linked",
    "type": "string",
    "default": null,
    "description": "Esta variable también puede llamarse MessagingSession EndUserLanguage",
    "source": "@MessagingSession.EndUserLanguage",
    "visibility": null
  },
  {
    "name": "WhatsAppPhone",
    "kind": "linked",
    "type": "string",
    "default": null,
    "description": "Número del remitente cuando la sesión es de WhatsApp (MessagingEndUser.MessagingPlatformKey, p. ej. 5216684803604). Solo se usa para sembrar customerPhone en canal WhatsApp.",
    "source": "@MessagingEndUser.MessagingPlatformKey",
    "visibility": null
  },
  {
    "name": "RoutableId",
    "kind": "linked",
    "type": "string",
    "default": null,
    "description": "Esta variable también puede llamarse MessagingSession Id",
    "source": "@MessagingSession.Id",
    "visibility": null
  },
  {
    "name": "caseRecord",
    "kind": "mutable",
    "type": "object",
    "default": null,
    "description": "Es el registro del caso",
    "source": null,
    "visibility": "External"
  }
];

export const scriptSubagents: ScriptSubagent[] = [
  {
    "apiName": "agent_router",
    "isStart": true,
    "label": "Enrutador del Agente",
    "description": "Da la bienvenida al usuario y determina el subagente adecuado según lo que escribe el usuario",
    "lines": "470-529",
    "variablesRead": [
      "explicitCaseRequested",
      "internationalTransferDecision",
      "isVerified",
      "newQuoteRequested",
      "pendingIntent",
      "quoteInProgress",
      "quoteResult",
      "serviceCaseCreated",
      "shipmentType"
    ],
    "variablesSet": [],
    "transitions": [
      "CaseManagement_v2",
      "Customer_Verification",
      "Escalation_v2",
      "General_Information_Management",
      "International_Quote_Management",
      "Job_Search",
      "Orden_Management",
      "Quote_Management",
      "ambiguous_question",
      "off_topic"
    ],
    "deterministicRuns": [],
    "reasoningActions": [
      {
        "name": "go_to_Quote_Management",
        "kind": "transition",
        "ref": "@utils.transition to @subagent.Quote_Management",
        "description": "Punto de entrada para cotizaciones (cotizar, cotización, precio, tarifa). Úsalo para cotización NACIONAL o cuando el cliente aún NO ha indicado si es nacional o internacional; este subagente clasifica el envío. Si el cliente ya dijo que es INTERNACIONAL o mencionó un país fuera de México, usa go_to_International_Quote_Management en su lugar.",
        "availableWhen": "@variables.isVerified == True",
        "with": [],
        "set": []
      },
      {
        "name": "go_to_International_Quote_Management",
        "kind": "transition",
        "ref": "@utils.transition to @subagent.International_Quote_Management",
        "description": "Úsalo SOLO cuando el cliente indique explícitamente que su cotización es INTERNACIONAL o mencione un país/destino fuera de México (por ejemplo 'cotizar a Estados Unidos', 'envío internacional a España'). Va directo al asistente de Cotización Internacional, que únicamente pedirá el país de destino y NUNCA pide peso, dimensiones, códigos postales ni datos del paquete.",
        "availableWhen": "@variables.isVerified == True",
        "with": [],
        "set": []
      },
      {
        "name": "go_to_Customer_Verification",
        "kind": "transition",
        "ref": "@utils.transition to @subagent.Customer_Verification",
        "description": "Verifica la identidad del cliente con nombre completo y correo electrónico.",
        "availableWhen": null,
        "with": [],
        "set": []
      },
      {
        "name": "go_to_Escalation_v2",
        "kind": "transition",
        "ref": "@utils.transition to @subagent.Escalation_v2",
        "description": "Transfiere la conversación a un agente en vivo.",
        "availableWhen": "@variables.isVerified == True",
        "with": [],
        "set": []
      },
      {
        "name": "go_to_General_Information_Management",
        "kind": "transition",
        "ref": "@utils.transition to @subagent.General_Information_Management",
        "description": "Responde preguntas frecuentes y preguntas informativas o de cómo hacer algo, y proporciona la URL del sitio web de Paquetexpress. Úsalo siempre que el cliente SOLO PIDA INFORMACIÓN sobre un proceso o política (por ejemplo '¿cómo inicio una reclamación?', requisitos, procesos, artículos prohibidos, aviso de privacidad, derechos ARCO, PROFECO), incluso si la pregunta menciona las palabras 'reclamación', 'queja', 'reclamo' o 'caso'. Rutea aquí mientras el cliente no solicite explícitamente abrir, crear o actualizar un caso.",
        "availableWhen": "@variables.isVerified == True",
        "with": [],
        "set": []
      },
      {
        "name": "go_to_Job_Search",
        "kind": "transition",
        "ref": "@utils.transition to @subagent.Job_Search",
        "description": "Proporciona información de sucursales y de vacantes de empleo.",
        "availableWhen": "@variables.isVerified == True",
        "with": [],
        "set": []
      },
      {
        "name": "go_to_CaseManagement_v2",
        "kind": "transition",
        "ref": "@utils.transition to @subagent.CaseManagement_v2",
        "description": "Úsalo SOLO cuando el cliente solicite explícitamente abrir, crear o actualizar un caso, levantar una reclamación o queja como acción ('quiero levantar una reclamación', 'abran un caso'), consultar el estatus de un caso existente, o agregar un comentario a un caso. NO rutees aquí preguntas informativas o de cómo funciona una reclamación/queja (esas van a General Information Management).",
        "availableWhen": "@variables.isVerified == True",
        "with": [],
        "set": []
      },
      {
        "name": "go_to_Orden_Management",
        "kind": "transition",
        "ref": "@utils.transition to @subagent.Orden_Management",
        "description": "Rastrea y consulta el estatus de un ENVÍO, paquete, orden, número de rastreo o guía. Úsalo cuando el cliente quiera saber DÓNDE ESTÁ su envío/paquete o darle seguimiento al ENVÍO ('rastrear', 'seguimiento de mi envío/paquete', '¿dónde está mi paquete?', 'localizar mi guía', 'estatus de mi orden'), con o sin número de guía. NO lo uses para el seguimiento de un CASO existente (eso es Gestión de Casos).",
        "availableWhen": "@variables.isVerified == True",
        "with": [],
        "set": []
      },
      {
        "name": "go_to_ambiguous_question",
        "kind": "transition",
        "ref": "@utils.transition to @subagent.ambiguous_question",
        "description": "Pide más detalles al cliente cuando la solicitud es demasiado ambigua.",
        "availableWhen": null,
        "with": [],
        "set": []
      },
      {
        "name": "go_to_off_topic",
        "kind": "transition",
        "ref": "@utils.transition to @subagent.off_topic",
        "description": "Redirige cuando la solicitud está fuera del alcance de Paquetexpress. Úsalo SIEMPRE que el mensaje no corresponda a rastreo de envíos, cotización, información general/FAQ, sucursales o empleo, gestión de casos o escalamiento — incluyendo temas financieros (invertir, bolsa de valores, comprar/vender acciones), conocimiento general u otras empresas. El Router NUNCA debe responder estos temas por su cuenta: siempre transiciona aquí.",
        "availableWhen": null,
        "with": [],
        "set": []
      }
    ],
    "definedActions": []
  },
  {
    "apiName": "Quote_Management",
    "isStart": false,
    "label": "Gestión de Cotización",
    "description": "Gestiona las intenciones del cliente para darle una cotización. Identifica palabras clave (cotizar, cotizacion, precio, budget, price, rate, quotation/quote), guía al cliente para recopilar los detalles del envío y luego crea un caso con la información proporcionada. Si el usuario no está verificado, debe verificarse antes de acceder a este tema. \\nel usuario ya fue verificado, no se requiere verificación adicional. dando prioridad a la clasificación del envío como nacional o internacional antes de continuar con más detalles.",
    "lines": "530-949",
    "variablesRead": [
      "caseRecord",
      "contactChannel",
      "destinationCountry",
      "internationalCaseCreated",
      "internationalTransferDecision",
      "isVerified",
      "nationalQuoteCaseCreated",
      "newQuoteRequested",
      "pendingIntent",
      "quoteAlto",
      "quoteAmt",
      "quoteAncho",
      "quoteCPDestino",
      "quoteCPDestinoRaw",
      "quoteCPOrigen",
      "quoteCPOrigenRaw",
      "quoteCpDestinoMsg",
      "quoteCpOrigenMsg",
      "quoteEAD",
      "quoteIVPF",
      "quoteInProgress",
      "quoteLargo",
      "quotePeso",
      "quoteRAD",
      "quoteResult",
      "quoteResultShown",
      "quoteTipo",
      "quoteTipoRegistrado",
      "shipmentType",
      "verifiedContactId"
    ],
    "variablesSet": [
      "caseRecord",
      "destinationCountry",
      "internationalCaseCreated",
      "internationalTransferDecision",
      "nationalQuoteCaseCreated",
      "newQuoteRequested",
      "pendingIntent",
      "quoteAlto",
      "quoteAmt",
      "quoteAncho",
      "quoteCPDestino",
      "quoteCPDestinoRaw",
      "quoteCPOrigen",
      "quoteCPOrigenRaw",
      "quoteCpDestinoMsg",
      "quoteCpOrigenMsg",
      "quoteEAD",
      "quoteIVPF",
      "quoteInProgress",
      "quoteLargo",
      "quotePeso",
      "quoteRAD",
      "quoteResult",
      "quoteResultShown",
      "quoteTipo",
      "quoteTipoRegistrado",
      "shipmentType"
    ],
    "transitions": [
      "Customer_Verification",
      "International_Quote_Management"
    ],
    "deterministicRuns": [
      "Crea_caso_cotizacion_nacional_v2",
      "Obtener_Codigo_postal_destino_valido_v2A",
      "Obtener_Codigo_postal_origen_valido_v2A",
      "Obtener_Cotizaci_n_Paqueteria_V2"
    ],
    "reasoningActions": [
      {
        "name": "capture_shipment_classification",
        "kind": "setVariables",
        "ref": "@utils.setVariables",
        "description": "Registra ÚNICAMENTE la clasificación del envío al inicio (nacional/internacional). shipmentType DEBE ser exactamente el token en inglés 'Domestic' (el envío permanece dentro de México) o 'International' (el envío sale de México). Nunca guardes 'Nacional', 'Internacional', el nombre de un país ni ningún otro valor en shipmentType.",
        "availableWhen": null,
        "with": [
          "shipmentType = ..."
        ],
        "set": []
      },
      {
        "name": "request_new_quote",
        "kind": "setVariables",
        "ref": "@utils.setVariables",
        "description": "Llámala EN CUANTO el cliente pida cotizar OTRO envío, OTRO paquete, OTRO sobre, 'también quiero enviar...', o una NUEVA cotización DESDE CERO después de que ya se completó una cotización previa (nacional o internacional). Un 'otro envío/paquete/sobre' es SIEMPRE una cotización nueva (cada envío es independiente), así que SÍ debes llamarla. Establece newQuoteRequested en True para reiniciar TODO el flujo (incluidos los códigos postales) y volver a preguntar si el envío es nacional o internacional. SOLO NO la uses cuando el cliente quiere corregir el MISMO envío en curso cambiando entre Paquete y Sobre ('mejor que sea sobre', 'cámbialo a paquete'): para ese caso de corrección usa capture_tipo, que conserva los códigos postales ya validados.",
        "availableWhen": "@variables.quoteResult != \"\"",
        "with": [
          "newQuoteRequested = ..."
        ],
        "set": []
      },
      {
        "name": "capture_cp_origen",
        "kind": "setVariables",
        "ref": "@utils.setVariables",
        "description": "Registra el código postal de origen TAL CUAL lo escribió el cliente EN ESTE TURNO, sin validarlo tú. Llámala en cuanto el cliente dé un código postal de origen. El sistema lo valida automáticamente después. NUNCA reutilices un código postal de una cotización anterior ni del historial: usa SOLO el que el cliente acaba de escribir en este turno.",
        "availableWhen": "@variables.shipmentType == \"Domestic\"",
        "with": [
          "quoteCPOrigenRaw = ..."
        ],
        "set": []
      },
      {
        "name": "capture_cp_destino",
        "kind": "setVariables",
        "ref": "@utils.setVariables",
        "description": "Registra el código postal de destino TAL CUAL lo escribió el cliente EN ESTE TURNO, sin validarlo tú. Llámala en cuanto el cliente dé un código postal de destino. El sistema lo valida automáticamente después. NUNCA reutilices un código postal de una cotización anterior ni del historial: usa SOLO el que el cliente acaba de escribir en este turno.",
        "availableWhen": "@variables.shipmentType == \"Domestic\"",
        "with": [
          "quoteCPDestinoRaw = ..."
        ],
        "set": []
      },
      {
        "name": "capture_tipo",
        "kind": "setVariables",
        "ref": "@utils.setVariables",
        "description": "Registra el tipo de envío. quoteTipo DEBE ser exactamente 'Package' o 'Envelope'. Llámala inmediatamente después de que el cliente elija.",
        "availableWhen": "@variables.shipmentType == \"Domestic\"",
        "with": [
          "quoteTipo = ..."
        ],
        "set": []
      },
      {
        "name": "capture_peso",
        "kind": "setVariables",
        "ref": "@utils.setVariables",
        "description": "Registra el peso en kilogramos. Llámala SOLO cuando el cliente acaba de dar el peso en este turno. Es el PRIMER dato del paquete.",
        "availableWhen": "@variables.shipmentType == \"Domestic\" and @variables.quoteTipo == \"Package\" and @variables.quotePeso == \"\"",
        "with": [
          "quotePeso = ..."
        ],
        "set": []
      },
      {
        "name": "capture_largo",
        "kind": "setVariables",
        "ref": "@utils.setVariables",
        "description": "Registra el largo en centímetros. Solo está disponible una vez registrado el peso y mientras el largo siga vacío.",
        "availableWhen": "@variables.quoteTipo == \"Package\" and @variables.quotePeso != \"\" and @variables.quoteLargo == \"\"",
        "with": [
          "quoteLargo = ..."
        ],
        "set": []
      },
      {
        "name": "capture_ancho",
        "kind": "setVariables",
        "ref": "@utils.setVariables",
        "description": "Registra el ancho en centímetros. Solo está disponible una vez registrado el largo y mientras el ancho siga vacío.",
        "availableWhen": "@variables.quoteTipo == \"Package\" and @variables.quoteLargo != \"\" and @variables.quoteAncho == \"\"",
        "with": [
          "quoteAncho = ..."
        ],
        "set": []
      },
      {
        "name": "capture_alto",
        "kind": "setVariables",
        "ref": "@utils.setVariables",
        "description": "Registra el alto en centímetros. Solo está disponible una vez registrado el ancho y mientras el alto siga vacío.",
        "availableWhen": "@variables.quoteTipo == \"Package\" and @variables.quoteAncho != \"\" and @variables.quoteAlto == \"\"",
        "with": [
          "quoteAlto = ..."
        ],
        "set": []
      },
      {
        "name": "capture_rad",
        "kind": "setVariables",
        "ref": "@utils.setVariables",
        "description": "Registra si se requiere recolección a domicilio. quoteRAD DEBE ser exactamente 'Yes' o 'No'. Solo está disponible una vez que ya hay alto (en paquete) o dimensiones de sobre, y mientras RAD siga vacío.",
        "availableWhen": "@variables.shipmentType == \"Domestic\" and @variables.quoteTipo != \"\" and @variables.quoteAlto != \"\" and @variables.quoteRAD == \"\"",
        "with": [
          "quoteRAD = ..."
        ],
        "set": []
      },
      {
        "name": "capture_ead",
        "kind": "setVariables",
        "ref": "@utils.setVariables",
        "description": "Registra si se requiere entrega a domicilio. quoteEAD DEBE ser exactamente 'Yes' o 'No'. Solo está disponible una vez registrada la recolección (RAD) y mientras EAD siga vacío.",
        "availableWhen": "@variables.shipmentType == \"Domestic\" and @variables.quoteRAD != \"\" and @variables.quoteEAD == \"\"",
        "with": [
          "quoteEAD = ..."
        ],
        "set": []
      },
      {
        "name": "capture_ivpf",
        "kind": "setVariables",
        "ref": "@utils.setVariables",
        "description": "Registra si se requiere asegurar la mercancía. quoteIVPF DEBE ser exactamente 'Yes' o 'No'. Solo aplica a paquete y una vez registrada la entrega (EAD).",
        "availableWhen": "@variables.quoteTipo == \"Package\" and @variables.quoteEAD != \"\" and @variables.quoteIVPF == \"\"",
        "with": [
          "quoteIVPF = ..."
        ],
        "set": []
      },
      {
        "name": "capture_amt",
        "kind": "setVariables",
        "ref": "@utils.setVariables",
        "description": "Registra el importe a asegurar como un entero sin decimales. Llámala inmediatamente después de que el cliente lo proporcione, SOLO cuando ya respondió que Sí requiere seguro.",
        "availableWhen": "@variables.quoteIVPF == \"Yes\" and @variables.quoteAmt == 0",
        "with": [
          "quoteAmt = ..."
        ],
        "set": []
      }
    ],
    "definedActions": [
      {
        "name": "Obtener_Codigo_postal_origen_valido_v2A",
        "label": "Obtener Código postal origen válido",
        "description": "Válida código postal origen que registro el cliente",
        "target": "flow://PE_GetValidOriginPostalCode",
        "source": "Obtener_C_digo_postal_origen_v_lido",
        "requireConfirmation": false,
        "progressIndicator": false,
        "inputs": [
          {
            "name": "CP_ORIGEN",
            "type": "string",
            "label": "CP_ORIGEN",
            "description": "Almacena el código postal origen que registro el cliente",
            "required": true,
            "userInput": false,
            "displayable": null,
            "complexType": null
          }
        ],
        "outputs": [
          {
            "name": "OutputMessage",
            "type": "string",
            "label": "OutputMessage",
            "description": "Almacene el mensaje de salida y muestra si el código postal es valido o no",
            "required": null,
            "userInput": null,
            "displayable": true,
            "complexType": null
          }
        ]
      },
      {
        "name": "Obtener_Codigo_postal_destino_valido_v2A",
        "label": "Obtener Código postal destino válido",
        "description": "Válida código postal destino que registro el cliente",
        "target": "flow://PE_GetValidDestinationPostalCode",
        "source": "Obtener_C_digo_postal_destino_v_lido",
        "requireConfirmation": false,
        "progressIndicator": false,
        "inputs": [
          {
            "name": "CP_Destino",
            "type": "string",
            "label": "CP_Destino",
            "description": "Almacena el código postal destino que registro el cliente",
            "required": true,
            "userInput": false,
            "displayable": null,
            "complexType": null
          }
        ],
        "outputs": [
          {
            "name": "OutputMessage",
            "type": "string",
            "label": "OutputMessage",
            "description": "Almacene el mensaje de salida y muestra si el código postal es valido o no",
            "required": null,
            "userInput": null,
            "displayable": true,
            "complexType": null
          }
        ]
      },
      {
        "name": "Crea_caso_cotizacion_nacional_v2",
        "label": "Crea caso cotizacion nacional v2",
        "description": "Acción para crear caso de cotización nacional",
        "target": "flow://Crea_caso_cotizacion_nacional",
        "source": null,
        "requireConfirmation": null,
        "progressIndicator": null,
        "inputs": [
          {
            "name": "Description",
            "type": "string",
            "label": "Description",
            "description": "Almacena los detalles del problema del usuario que se usarán para el caso.",
            "required": true,
            "userInput": false,
            "displayable": null,
            "complexType": null
          },
          {
            "name": "Subject",
            "type": "string",
            "label": "Subject",
            "description": "Almacena el asunto del caso a crear.",
            "required": true,
            "userInput": false,
            "displayable": null,
            "complexType": null
          },
          {
            "name": "contactRecordId",
            "type": "string",
            "label": "contactRecordId",
            "description": "Almacena el id de salesforce",
            "required": true,
            "userInput": false,
            "displayable": null,
            "complexType": null
          },
          {
            "name": "medioDeContacto",
            "type": "string",
            "label": "medioDeContacto",
            "description": "almacena el medio de contacto del usuario",
            "required": true,
            "userInput": false,
            "displayable": null,
            "complexType": null
          }
        ],
        "outputs": [
          {
            "name": "caseRecord",
            "type": "object",
            "label": "caseRecord",
            "description": "Almacena el registro del caso creado por el cliente.",
            "required": null,
            "userInput": null,
            "displayable": false,
            "complexType": "lightning__recordInfoType"
          }
        ]
      },
      {
        "name": "Obtener_Cotizaci_n_Paqueteria_V2",
        "label": "Obtener Cotización Paqueteria V2",
        "description": "Obtiene la cotización según los datos capturados por cliente",
        "target": "flow://Obtener_Cotizaci_n_Paqueter_a",
        "source": null,
        "requireConfirmation": null,
        "progressIndicator": null,
        "inputs": [
          {
            "name": "ALTO",
            "type": "string",
            "label": "ALTO",
            "description": "Almacena lo alto del paquete que esta describiendo el cliente",
            "required": true,
            "userInput": true,
            "displayable": null,
            "complexType": null
          },
          {
            "name": "ANCHO",
            "type": "string",
            "label": "ANCHO",
            "description": "Almacena lo ancho del paquete que está describiendo el cliente",
            "required": true,
            "userInput": true,
            "displayable": null,
            "complexType": null
          },
          {
            "name": "CP_Destino",
            "type": "string",
            "label": "CP_Destino",
            "description": "Almacena el código postal destino que registro el cliente",
            "required": true,
            "userInput": true,
            "displayable": null,
            "complexType": null
          },
          {
            "name": "CP_ORIGEN",
            "type": "string",
            "label": "CP_ORIGEN",
            "description": "Almacena el código postal origen que registro el cliente",
            "required": true,
            "userInput": true,
            "displayable": null,
            "complexType": null
          },
          {
            "name": "EAD",
            "type": "string",
            "label": "EAD",
            "description": "Almacena la respuesta que selecciono el cliente en la pregunta ¿Requiere servicio de entrega a domicilio?",
            "required": true,
            "userInput": true,
            "displayable": null,
            "complexType": null
          },
          {
            "name": "IVPF",
            "type": "string",
            "label": "IVPF",
            "description": "Almacena la respuesta de la pregunta ¿Requiere asegurar su mercancía? que selecciono el cliente",
            "required": true,
            "userInput": true,
            "displayable": null,
            "complexType": null
          },
          {
            "name": "LARGO",
            "type": "string",
            "label": "LARGO",
            "description": "Almacena lo largo del paquete que está describiendo el cliente",
            "required": true,
            "userInput": true,
            "displayable": null,
            "complexType": null
          },
          {
            "name": "PESO",
            "type": "string",
            "label": "PESO",
            "description": "Almacena el peso del paquete que está describiendo el cliente",
            "required": true,
            "userInput": true,
            "displayable": null,
            "complexType": null
          },
          {
            "name": "RAD",
            "type": "string",
            "label": "RAD",
            "description": "Almacena la respuesta que selecciono el cliente en la pregunta ¿Requiere servicio de recolección a domicilio?",
            "required": true,
            "userInput": true,
            "displayable": null,
            "complexType": null
          },
          {
            "name": "TIPO_PAQUETERIA",
            "type": "string",
            "label": "TIPO_PAQUETERIA",
            "description": "Almacena el tipo de paquetería que selecciono el cliente",
            "required": true,
            "userInput": true,
            "displayable": null,
            "complexType": null
          },
          {
            "name": "amt",
            "type": "number",
            "label": "amt",
            "description": "Almacena la respuesta de la pregunta Ingrese el importe con número y sin decimales",
            "required": true,
            "userInput": true,
            "displayable": null,
            "complexType": null
          }
        ],
        "outputs": [
          {
            "name": "OutputMessage",
            "type": "string",
            "label": "OutputMessage",
            "description": "Almacene el mensaje de salida y muestra las opciones",
            "required": null,
            "userInput": null,
            "displayable": true,
            "complexType": null
          }
        ]
      }
    ]
  },
  {
    "apiName": "International_Quote_Management",
    "isStart": false,
    "label": "Cotización Internacional",
    "description": "Gestiona cotizaciones de envíos internacionales. El ÚNICO dato que necesita del cliente es el país de destino. Crea un caso de cotización internacional y ofrece transferir a un agente en vivo. NUNCA pide código postal, tipo de paquete, peso, dimensiones ni valor declarado, y NUNCA genera una cotización automática.",
    "lines": "950-1055",
    "variablesRead": [
      "caseRecord",
      "contactChannel",
      "destinationCountry",
      "internationalCaseCreated",
      "internationalTransferDecision",
      "isVerified",
      "newQuoteRequested",
      "pendingIntent",
      "shipmentType",
      "verifiedContactId"
    ],
    "variablesSet": [
      "caseRecord",
      "destinationCountry",
      "internationalCaseCreated",
      "internationalTransferDecision",
      "newQuoteRequested",
      "pendingIntent",
      "shipmentType"
    ],
    "transitions": [
      "Customer_Verification",
      "Escalation_v2",
      "Quote_Management"
    ],
    "deterministicRuns": [
      "Crea_caso_cotizacion_internacional_v2A"
    ],
    "reasoningActions": [
      {
        "name": "capture_destination_country",
        "kind": "setVariables",
        "ref": "@utils.setVariables",
        "description": "Registra ÚNICAMENTE el país de destino de un envío International. Llámala inmediatamente después de que el cliente indique el país de destino.",
        "availableWhen": null,
        "with": [
          "destinationCountry = ..."
        ],
        "set": []
      },
      {
        "name": "capture_transfer_decision",
        "kind": "setVariables",
        "ref": "@utils.setVariables",
        "description": "Registra la decisión del cliente sobre ser transferido a un agente en vivo, después de crear el caso de cotización internacional. DEBES llamarla en cuanto el cliente responda a la oferta de transferencia, en ese mismo turno. Pasa EXACTAMENTE el texto 'Yes' si el cliente acepta de cualquier forma (sí, claro, ok, dale, por favor, adelante, hágalo) y EXACTAMENTE el texto 'No' si rechaza de cualquier forma (no, no gracias, así está bien). NUNCA pases el texto literal del cliente ni ningún valor distinto de Yes o No.",
        "availableWhen": "@variables.internationalCaseCreated == True",
        "with": [
          "internationalTransferDecision = ..."
        ],
        "set": []
      },
      {
        "name": "request_new_quote",
        "kind": "setVariables",
        "ref": "@utils.setVariables",
        "description": "Llámala EN CUANTO el cliente pida hacer OTRA cotización, una NUEVA cotización, o cambiar entre envío nacional e internacional. Establece newQuoteRequested en True para salir del flujo internacional y volver a preguntar si el envío es nacional o internacional. NO la confundas con la decisión de transferencia.",
        "availableWhen": null,
        "with": [
          "newQuoteRequested = ..."
        ],
        "set": []
      },
      {
        "name": "Crea_caso_cotizacion_internacional_v2A",
        "kind": "action",
        "ref": "@actions.Crea_caso_cotizacion_internacional_v2A",
        "description": "",
        "availableWhen": null,
        "with": [
          "Description = ...",
          "Subject = ...",
          "contactRecordId = ...",
          "medioDeContacto = ..."
        ],
        "set": []
      }
    ],
    "definedActions": [
      {
        "name": "Crea_caso_cotizacion_internacional_v2A",
        "label": "Crea caso cotizacion internacional v2A",
        "description": "Acción para crear caso de cotización internacional",
        "target": "flow://Crea_caso_cotizacion_internacional",
        "source": null,
        "requireConfirmation": null,
        "progressIndicator": null,
        "inputs": [
          {
            "name": "Description",
            "type": "string",
            "label": "Description",
            "description": "Almacena los detalles que se usarán para el caso.",
            "required": true,
            "userInput": false,
            "displayable": null,
            "complexType": null
          },
          {
            "name": "Subject",
            "type": "string",
            "label": "Subject",
            "description": "Almacena el asunto del caso a crear.",
            "required": true,
            "userInput": false,
            "displayable": null,
            "complexType": null
          },
          {
            "name": "contactRecordId",
            "type": "string",
            "label": "contactRecordId",
            "description": "Almacena el id de salesforce",
            "required": true,
            "userInput": false,
            "displayable": null,
            "complexType": null
          },
          {
            "name": "medioDeContacto",
            "type": "string",
            "label": "medioDeContacto",
            "description": "almacena el medio de contacto del usuario",
            "required": true,
            "userInput": false,
            "displayable": null,
            "complexType": null
          }
        ],
        "outputs": [
          {
            "name": "caseRecord",
            "type": "object",
            "label": "caseRecord",
            "description": "Almacena el registro del caso creado por el cliente.",
            "required": null,
            "userInput": null,
            "displayable": false,
            "complexType": "lightning__recordInfoType"
          }
        ]
      }
    ]
  },
  {
    "apiName": "Customer_Verification",
    "isStart": false,
    "label": "Verificación del Cliente",
    "description": "Este tema se activa justo después del tema de saludo al cliente para verificar la identidad del cliente antes de dar acceso a datos sensibles o continuar con otros temas.",
    "lines": "1056-1174",
    "variablesRead": [
      "ChannelType",
      "WhatsAppPhone",
      "contactChannel",
      "contactRecord",
      "customerEmail",
      "customerFirstName",
      "customerLastName",
      "customerPhone",
      "isExistingContact",
      "isVerified",
      "pendingIntent",
      "verifiedContactId"
    ],
    "variablesSet": [
      "contactChannel",
      "contactRecord",
      "customerEmail",
      "customerFirstName",
      "customerLastName",
      "customerPhone",
      "isExistingContact",
      "isVerified",
      "pendingIntent",
      "verifiedContactId"
    ],
    "transitions": [
      "CaseManagement_v2",
      "Escalation_v2",
      "General_Information_Management",
      "Job_Search",
      "Orden_Management",
      "Quote_Management"
    ],
    "deterministicRuns": [
      "AG_Get_and_create_contact"
    ],
    "reasoningActions": [
      {
        "name": "capture_pending_intent",
        "kind": "setVariables",
        "ref": "@utils.setVariables",
        "description": "Registra la intención original del cliente para poder retomarla automáticamente después de la verificación. Los valores permitidos son Quote, Order, Case, GeneralInfo, JobBranch o Escalation.",
        "availableWhen": null,
        "with": [
          "pendingIntent = ..."
        ],
        "set": []
      },
      {
        "name": "capture_customer_details",
        "kind": "setVariables",
        "ref": "@utils.setVariables",
        "description": "Registra el nombre, apellido y correo electrónico proporcionados por el cliente. Si el cliente escribe su nombre completo en un solo mensaje (por ejemplo 'Regina Segura'), toma la primera palabra como nombre y el resto como apellido.",
        "availableWhen": "@variables.isVerified == False",
        "with": [
          "customerEmail = ...",
          "customerFirstName = ...",
          "customerLastName = ..."
        ],
        "set": []
      },
      {
        "name": "capture_phone",
        "kind": "setVariables",
        "ref": "@utils.setVariables",
        "description": "Registra el número de teléfono dictado por el cliente (chat web). Llámala cuando el cliente proporcione su teléfono. En WhatsApp NO se usa: el teléfono ya se tomó del remitente.",
        "availableWhen": "@variables.ChannelType != \"WhatsApp\"",
        "with": [
          "customerPhone = ..."
        ],
        "set": []
      }
    ],
    "definedActions": [
      {
        "name": "AG_Get_and_create_contact",
        "label": "AG Obtener y crear contacto",
        "description": "Obtiene o crea el contacto a partir del nombre y correo proporcionados por el cliente. Busca por correo y, si no existe, crea el contacto automáticamente. Devuelve la verificación en un solo paso.",
        "target": "flow://AG_Get_and_create_contact",
        "source": null,
        "requireConfirmation": false,
        "progressIndicator": false,
        "inputs": [
          {
            "name": "EmailAdress",
            "type": "string",
            "label": "EmailAdress",
            "description": "Correo electrónico proporcionado por el cliente.",
            "required": true,
            "userInput": false,
            "displayable": null,
            "complexType": null
          },
          {
            "name": "FirstName",
            "type": "string",
            "label": "FirstName",
            "description": "Primer nombre proporcionado por el cliente.",
            "required": true,
            "userInput": false,
            "displayable": null,
            "complexType": null
          },
          {
            "name": "LastName",
            "type": "string",
            "label": "LastName",
            "description": "Apellido proporcionado por el cliente.",
            "required": true,
            "userInput": false,
            "displayable": null,
            "complexType": null
          },
          {
            "name": "Phone",
            "type": "string",
            "label": "Phone",
            "description": "Teléfono del cliente (en WhatsApp se toma del remitente, en web se pregunta). El flujo lo normaliza a 10 dígitos y lo guarda en MobilePhone del Contacto.",
            "required": false,
            "userInput": false,
            "displayable": null,
            "complexType": null
          }
        ],
        "outputs": [
          {
            "name": "Email",
            "type": "string",
            "label": "Email",
            "description": "Correo electrónico del contacto encontrado o creado.",
            "required": null,
            "userInput": null,
            "displayable": false,
            "complexType": null
          },
          {
            "name": "contactId",
            "type": "string",
            "label": "contactId",
            "description": "Id de Salesforce del contacto encontrado o creado.",
            "required": null,
            "userInput": null,
            "displayable": false,
            "complexType": null
          },
          {
            "name": "isVerified",
            "type": "boolean",
            "label": "isVerified",
            "description": "Indica si el cliente fue verificado (contacto encontrado o creado).",
            "required": null,
            "userInput": null,
            "displayable": false,
            "complexType": null
          },
          {
            "name": "isExistingContact",
            "type": "boolean",
            "label": "isExistingContact",
            "description": "True si el contacto ya existía en Salesforce; False si se creó en esta ejecución.",
            "required": null,
            "userInput": null,
            "displayable": false,
            "complexType": null
          },
          {
            "name": "recordContact",
            "type": "object",
            "label": "recordContact",
            "description": "Registro del contacto para relacionarlo con un caso o consultarlo.",
            "required": null,
            "userInput": null,
            "displayable": false,
            "complexType": "lightning__recordInfoType"
          }
        ]
      }
    ]
  },
  {
    "apiName": "Escalation_v2",
    "isStart": false,
    "label": "Escalamiento",
    "description": "Transfiere la conversación a un agente en vivo. Tema principal para solicitudes OPERATIVAS: cambio de dirección, instalación, modificar/reprogramar entrega. También para peticiones explícitas de agente y cuando otros temas no pueden resolver. NUNCA crea casos de Salesforce desde este tema.",
    "lines": "1175-1222",
    "variablesRead": [
      "internationalTransferDecision",
      "isVerified",
      "isWithinBusinessHours",
      "pendingIntent"
    ],
    "variablesSet": [
      "internationalTransferDecision",
      "isWithinBusinessHours",
      "pendingIntent"
    ],
    "transitions": [
      "Customer_Verification"
    ],
    "deterministicRuns": [],
    "reasoningActions": [
      {
        "name": "check_business_hours",
        "kind": "action",
        "ref": "@actions.Check_Now_is_within_Business_Hours_by_Name",
        "description": "Valida si el horario de atención (Horario Paquete) está abierto en este momento, antes de transferir a un agente.",
        "availableWhen": null,
        "with": [
          "businessHourName = \"Horario Paquete\""
        ],
        "set": [
          "@variables.isWithinBusinessHours = @outputs.sOrderStatus"
        ]
      },
      {
        "name": "escalate_to_human",
        "kind": "escalate",
        "ref": "@utils.escalate",
        "description": "Transfiere la conversación a un agente en vivo directamente cuando el horario de atención está abierto. No requiere volver a preguntar al cliente si desea ser transferido.",
        "availableWhen": "@variables.isWithinBusinessHours == True",
        "with": [],
        "set": []
      }
    ],
    "definedActions": [
      {
        "name": "Check_Now_is_within_Business_Hours_by_Name",
        "label": "Verifica si estamos dentro del Horario de Atención por Nombre",
        "description": "Verifica si la fecha y hora actuales están dentro del horario de atención configurado en Salesforce. Úsala inmediatamente antes de transferir o escalar una conversación a un agente en vivo. Devuelve true cuando el negocio está abierto y false cuando está cerrado.",
        "target": "apex://CheckBusinessHours",
        "source": "Check_Now_is_within_Business_Hours_by_Name",
        "requireConfirmation": false,
        "progressIndicator": false,
        "inputs": [
          {
            "name": "businessHourName",
            "type": "string",
            "label": "businessHourName",
            "description": "Nombre del Business Hours de Salesforce a evaluar.",
            "required": true,
            "userInput": false,
            "displayable": null,
            "complexType": null
          }
        ],
        "outputs": [
          {
            "name": "sOrderStatus",
            "type": "boolean",
            "label": "sOrderStatus",
            "description": "True si el horario de atención está abierto en este momento; false si está cerrado.",
            "required": null,
            "userInput": null,
            "displayable": false,
            "complexType": null
          }
        ]
      }
    ]
  },
  {
    "apiName": "General_Information_Management",
    "isStart": false,
    "label": "Gestión de Información General",
    "description": "Este tema proporciona información al usuario como la URL del sitio web (https://www.paquetexpress.com.mx), y otra solo si los demás temas no pudieron ofrecer la información requerida.",
    "lines": "1223-1352",
    "variablesRead": [
      "contactChannel",
      "faqCaseCreated",
      "faqQuestion",
      "isVerified",
      "pendingIntent",
      "verifiedContactId"
    ],
    "variablesSet": [
      "faqCaseCreated",
      "faqQuestion",
      "pendingIntent"
    ],
    "transitions": [
      "Customer_Verification"
    ],
    "deterministicRuns": [
      "Create_case_Agent_paquete_v2"
    ],
    "reasoningActions": [
      {
        "name": "capture_faq_question",
        "kind": "setVariables",
        "ref": "@utils.setVariables",
        "description": "Registra una versión concisa de la pregunta de información general del cliente. Llámala inmediatamente cuando el cliente haga una pregunta, antes de responder.",
        "availableWhen": null,
        "with": [
          "faqQuestion = ..."
        ],
        "set": []
      },
      {
        "name": "FAQ_Search",
        "kind": "action",
        "ref": "@actions.FAQ_Search",
        "description": "",
        "availableWhen": null,
        "with": [],
        "set": []
      }
    ],
    "definedActions": [
      {
        "name": "FAQ_Search",
        "label": "Búsqueda de FAQ v2",
        "description": "Proporciona un nombre claro para esta acción y define el nombre de API para las referencias del sistema",
        "target": "generatePromptResponse://FAQ_Search",
        "source": null,
        "requireConfirmation": null,
        "progressIndicator": null,
        "inputs": [
          {
            "name": "Input:Question",
            "type": "string",
            "label": "Pregunta",
            "description": "guarda la pregunta que hace el cliente",
            "required": true,
            "userInput": false,
            "displayable": null,
            "complexType": null
          },
          {
            "name": "outputLanguage",
            "type": "string",
            "label": "Idioma de salida",
            "description": "Opcional. Especifica el idioma de la respuesta usando el código de idioma de dos caracteres o el código de configuración regional de cinco caracteres (por ejemplo, en_US, en_GB, es, es_MX).",
            "required": false,
            "userInput": false,
            "displayable": null,
            "complexType": null
          },
          {
            "name": "citationMode",
            "type": "string",
            "label": "Modo de Citación",
            "description": "Selecciona el modo de citación",
            "required": false,
            "userInput": false,
            "displayable": null,
            "complexType": null
          },
          {
            "name": "isPreviewOnly",
            "type": "boolean",
            "label": "Solo Vista Previa",
            "description": "Resuelve la plantilla de prompt sin generar una respuesta del LLM.",
            "required": false,
            "userInput": false,
            "displayable": null,
            "complexType": null
          }
        ],
        "outputs": [
          {
            "name": "promptResponse",
            "type": "string",
            "label": "Respuesta del Prompt",
            "description": "La respuesta del prompt generada por la acción con base en el prompt y la entrada especificados.",
            "required": null,
            "userInput": null,
            "displayable": false,
            "complexType": null
          },
          {
            "name": "generationId",
            "type": "string",
            "label": "ID de Generación del Prompt",
            "description": "El identificador único de la generación del prompt asociada a esta invocación de la acción.",
            "required": null,
            "userInput": null,
            "displayable": false,
            "complexType": null
          },
          {
            "name": "citations",
            "type": "object",
            "label": "Citaciones",
            "description": "La respuesta de citaciones del prompt generada por la acción con base en el prompt y la entrada especificados.",
            "required": null,
            "userInput": null,
            "displayable": false,
            "complexType": "@apexClassType/AiCopilot__GenAiCitationOutput"
          }
        ]
      },
      {
        "name": "Create_case_Agent_paquete_v2",
        "label": "Crea caso consulta de informacion general",
        "description": "Acción para crear caso de consulta de información general (FAQ)",
        "target": "flow://Create_case_Agent_paquete",
        "source": null,
        "requireConfirmation": null,
        "progressIndicator": null,
        "inputs": [
          {
            "name": "Description",
            "type": "string",
            "label": "Description",
            "description": "Almacena los detalles de la consulta del cliente que se usarán para el caso.",
            "required": true,
            "userInput": false,
            "displayable": null,
            "complexType": null
          },
          {
            "name": "Subject",
            "type": "string",
            "label": "Subject",
            "description": "Almacena el asunto del caso a crear.",
            "required": true,
            "userInput": false,
            "displayable": null,
            "complexType": null
          },
          {
            "name": "contactRecordId",
            "type": "string",
            "label": "contactRecordId",
            "description": "Almacena el id de salesforce",
            "required": true,
            "userInput": false,
            "displayable": null,
            "complexType": null
          },
          {
            "name": "medioDeContacto",
            "type": "string",
            "label": "medioDeContacto",
            "description": "almacena el medio de contacto del usuario",
            "required": true,
            "userInput": false,
            "displayable": null,
            "complexType": null
          }
        ],
        "outputs": [
          {
            "name": "caseRecord",
            "type": "object",
            "label": "caseRecord",
            "description": "Almacena el registro del caso creado por el cliente.",
            "required": null,
            "userInput": null,
            "displayable": false,
            "complexType": "lightning__recordInfoType"
          }
        ]
      }
    ]
  },
  {
    "apiName": "Job_Search",
    "isStart": false,
    "label": "Información de Empleo/Sucursales",
    "description": "Este tema se usa para entregar información general relacionada con sucursales o búsqueda de empleo directamente, sin requerir información adicional del usuario.",
    "lines": "1353-1519",
    "variablesRead": [
      "branchCaseCreated",
      "contactChannel",
      "isVerified",
      "jobBranchType",
      "jobCaseCreated",
      "pendingIntent",
      "verifiedContactId"
    ],
    "variablesSet": [
      "branchCaseCreated",
      "jobBranchType",
      "jobCaseCreated",
      "pendingIntent"
    ],
    "transitions": [
      "Customer_Verification"
    ],
    "deterministicRuns": [
      "Crea_caso_b_squeda_de_empleo_v2A",
      "Crea_caso_ver_sucursales_v2A"
    ],
    "reasoningActions": [
      {
        "name": "capture_job_branch_type",
        "kind": "setVariables",
        "ref": "@utils.setVariables",
        "description": "Registra si el cliente preguntó por sucursales (Branch) o empleo (Job) para determinar qué respuesta entregar. Los valores permitidos son Branch o Job.",
        "availableWhen": null,
        "with": [
          "jobBranchType = ..."
        ],
        "set": []
      },
      {
        "name": "FAQ_Search",
        "kind": "action",
        "ref": "@actions.FAQ_Search",
        "description": "",
        "availableWhen": "@variables.jobBranchType == \"Branch\"",
        "with": [],
        "set": []
      }
    ],
    "definedActions": [
      {
        "name": "Crea_caso_ver_sucursales_v2A",
        "label": "Crea caso ver sucursales v2A",
        "description": "Acción para crear caso de consulta de sucursales",
        "target": "flow://Crea_caso_ver_sucursales",
        "source": null,
        "requireConfirmation": null,
        "progressIndicator": null,
        "inputs": [
          {
            "name": "Description",
            "type": "string",
            "label": "Description",
            "description": "Almacena los detalles de la consulta del cliente que se usarán para el caso.",
            "required": true,
            "userInput": false,
            "displayable": null,
            "complexType": null
          },
          {
            "name": "Subject",
            "type": "string",
            "label": "Subject",
            "description": "Almacena el asunto del caso a crear.",
            "required": true,
            "userInput": false,
            "displayable": null,
            "complexType": null
          },
          {
            "name": "contactRecordId",
            "type": "string",
            "label": "contactRecordId",
            "description": "Almacena el id de salesforce",
            "required": true,
            "userInput": false,
            "displayable": null,
            "complexType": null
          },
          {
            "name": "medioDeContacto",
            "type": "string",
            "label": "medioDeContacto",
            "description": "almacena el medio de contacto del usuario",
            "required": true,
            "userInput": false,
            "displayable": null,
            "complexType": null
          }
        ],
        "outputs": [
          {
            "name": "caseRecord",
            "type": "object",
            "label": "caseRecord",
            "description": "Almacena el registro del caso creado por el cliente.",
            "required": null,
            "userInput": null,
            "displayable": false,
            "complexType": "lightning__recordInfoType"
          }
        ]
      },
      {
        "name": "Crea_caso_b_squeda_de_empleo_v2A",
        "label": "Crea caso busqueda de empleo v2A",
        "description": "Acción para crear caso de consulta de vacantes de empleo",
        "target": "flow://Crea_caso_b_squeda_de_empleo",
        "source": null,
        "requireConfirmation": null,
        "progressIndicator": null,
        "inputs": [
          {
            "name": "Description",
            "type": "string",
            "label": "Description",
            "description": "Almacena los detalles de la consulta del cliente que se usarán para el caso.",
            "required": true,
            "userInput": false,
            "displayable": null,
            "complexType": null
          },
          {
            "name": "Subject",
            "type": "string",
            "label": "Subject",
            "description": "Almacena el asunto del caso a crear.",
            "required": true,
            "userInput": false,
            "displayable": null,
            "complexType": null
          },
          {
            "name": "contactRecordId",
            "type": "string",
            "label": "contactRecordId",
            "description": "Almacena el id de salesforce",
            "required": true,
            "userInput": false,
            "displayable": null,
            "complexType": null
          },
          {
            "name": "medioDeContacto",
            "type": "string",
            "label": "medioDeContacto",
            "description": "almacena el medio de contacto del usuario",
            "required": true,
            "userInput": false,
            "displayable": null,
            "complexType": null
          }
        ],
        "outputs": [
          {
            "name": "caseRecord",
            "type": "object",
            "label": "caseRecord",
            "description": "Almacena el registro del caso creado por el cliente.",
            "required": null,
            "userInput": null,
            "displayable": false,
            "complexType": "lightning__recordInfoType"
          }
        ]
      },
      {
        "name": "FAQ_Search",
        "label": "Búsqueda de FAQ v2",
        "description": "Proporciona un nombre claro para esta acción y define el nombre de API para las referencias del sistema",
        "target": "generatePromptResponse://FAQ_Search",
        "source": null,
        "requireConfirmation": null,
        "progressIndicator": null,
        "inputs": [
          {
            "name": "Input:Question",
            "type": "string",
            "label": "Pregunta",
            "description": "guarda la pregunta que hace el cliente",
            "required": true,
            "userInput": false,
            "displayable": null,
            "complexType": null
          },
          {
            "name": "outputLanguage",
            "type": "string",
            "label": "Idioma de salida",
            "description": "Opcional. Especifica el idioma de la respuesta usando el código de idioma de dos caracteres o el código de configuración regional de cinco caracteres (por ejemplo, en_US, en_GB, es, es_MX).",
            "required": false,
            "userInput": false,
            "displayable": null,
            "complexType": null
          },
          {
            "name": "citationMode",
            "type": "string",
            "label": "Modo de Citación",
            "description": "Selecciona el modo de citación",
            "required": false,
            "userInput": false,
            "displayable": null,
            "complexType": null
          },
          {
            "name": "isPreviewOnly",
            "type": "boolean",
            "label": "Solo Vista Previa",
            "description": "Resuelve la plantilla de prompt sin generar una respuesta del LLM.",
            "required": false,
            "userInput": false,
            "displayable": null,
            "complexType": null
          }
        ],
        "outputs": [
          {
            "name": "promptResponse",
            "type": "string",
            "label": "Respuesta del Prompt",
            "description": "La respuesta del prompt generada por la acción con base en el prompt y la entrada especificados.",
            "required": null,
            "userInput": null,
            "displayable": false,
            "complexType": null
          },
          {
            "name": "generationId",
            "type": "string",
            "label": "ID de Generación del Prompt",
            "description": "El identificador único de la generación del prompt asociada a esta invocación de la acción.",
            "required": null,
            "userInput": null,
            "displayable": false,
            "complexType": null
          },
          {
            "name": "citations",
            "type": "object",
            "label": "Citaciones",
            "description": "La respuesta de citaciones del prompt generada por la acción con base en el prompt y la entrada especificados.",
            "required": null,
            "userInput": null,
            "displayable": false,
            "complexType": "@apexClassType/AiCopilot__GenAiCitationOutput"
          }
        ]
      }
    ]
  },
  {
    "apiName": "CaseManagement_v2",
    "isStart": false,
    "label": "Gestión de Casos",
    "description": "ALCANCE ESTRECHO: (1) consultar o actualizar casos EXISTENTES (por número de caso, comentarios); (2) portería SILENCIOSA solo para consultas administrativas GENERALES (facturación, cuenta, procesos NO relacionados con envíos). NUNCA uses este tema si aparece guía, rastreo, envío, paquete, entrega, estatus, tracking, reporte/reclamación de envío, cambio de dirección, instalación o modificación de entrega — usa Orden Management o Escalamiento. Escuchar 'caso' o 'problema' por sí solo NO justifica este tema cuando existen palabras de envío. Si el usuario no está verificado, debe verificarse antes de acceder a este tema.",
    "lines": "1520-1740",
    "variablesRead": [
      "caseDescription",
      "caseGuia",
      "caseMotivoReady",
      "caseMotivoShown",
      "caseRastreo",
      "caseRecord",
      "caseRouteLock",
      "caseSubject",
      "caseTrackingAsked",
      "caseTrackingReady",
      "caseTrackingShown",
      "contactChannel",
      "contactRecord",
      "explicitCaseRequested",
      "isVerified",
      "pendingIntent",
      "serviceCaseCreated",
      "verifiedContactId"
    ],
    "variablesSet": [
      "caseDescription",
      "caseGuia",
      "caseMotivoReady",
      "caseMotivoShown",
      "caseRastreo",
      "caseRecord",
      "caseRouteLock",
      "caseSubject",
      "caseTrackingReady",
      "caseTrackingShown",
      "explicitCaseRequested",
      "pendingIntent",
      "serviceCaseCreated"
    ],
    "transitions": [
      "Customer_Verification",
      "Escalation_v2",
      "General_Information_Management",
      "Orden_Management"
    ],
    "deterministicRuns": [
      "Crea_caso_solicitud_de_servicio_v2A"
    ],
    "reasoningActions": [
      {
        "name": "go_to_Orden_Management",
        "kind": "transition",
        "ref": "@utils.transition to @subagent.Orden_Management",
        "description": "Úsalo SOLO cuando el cliente quiera RASTREAR o consultar el ESTATUS de un envío, o dé un número de guía/rastreo para consultar su paquete. NO lo uses para una petición GENERAL de abrir un caso, reclamación, queja, reporte o folio: eso se atiende en este tema llamando capture_explicit_case_request.",
        "availableWhen": "@variables.caseRouteLock != True",
        "with": [],
        "set": []
      },
      {
        "name": "go_to_Escalation_v2",
        "kind": "transition",
        "ref": "@utils.transition to @subagent.Escalation_v2",
        "description": "Úsalo para solicitudes operativas (cambio de dirección, instalación, modificar/reprogramar entrega) o cuando el cliente pida un agente en vivo. NUNCA crees un caso para estas solicitudes.",
        "availableWhen": "@variables.caseRouteLock != True",
        "with": [],
        "set": []
      },
      {
        "name": "go_to_General_Information_Management",
        "kind": "transition",
        "ref": "@utils.transition to @subagent.General_Information_Management",
        "description": "Úsalo cuando el cliente SOLO PIDE INFORMACIÓN sobre cómo levantar una reclamación o queja, los pasos o requisitos de una reclamación/queja, o cualquier pregunta general de cómo hacer algo/FAQ, sin solicitar explícitamente abrir, crear o actualizar un caso. Redirige aquí en lugar de crear un caso.",
        "availableWhen": null,
        "with": [],
        "set": []
      },
      {
        "name": "AddCaseComment_v2A",
        "kind": "action",
        "ref": "@actions.AddCaseComment_v2A",
        "description": "",
        "availableWhen": null,
        "with": [
          "caseRecord = ...",
          "caseComment = ..."
        ],
        "set": []
      },
      {
        "name": "capture_explicit_case_request",
        "kind": "setVariables",
        "ref": "@utils.setVariables",
        "description": "Llámala EN CUANTO el cliente pida EXPLÍCITAMENTE abrir, crear o levantar un caso GENERAL (no relacionado con envíos). Establece explicitCaseRequested en True. NO la uses para portería silenciosa ni para consultas informativas.",
        "availableWhen": null,
        "with": [
          "explicitCaseRequested = ..."
        ],
        "set": []
      },
      {
        "name": "capture_case_details",
        "kind": "setVariables",
        "ref": "@utils.setVariables",
        "description": "Registra un asunto de caso corto (menos de 7 palabras) y una descripción (máximo 3 oraciones) para que el caso de solicitud de servicio se cree automáticamente. NUNCA tomes como motivo la frase con la que el cliente pidió abrir el caso (p. ej. 'quiero levantar un caso', 'abran un caso', 'quiero abrir un caso', 'levantar una reclamación'): eso NO describe el problema. Llámala SOLO después de que el cliente haya DESCRITO el problema o motivo real en un mensaje; si solo pidió abrir el caso sin describirlo, NO la llames y primero pregunta el motivo. Si solo está preguntando cómo funciona una reclamación, NO la llames y en su lugar usa go_to_General_Information_Management.",
        "availableWhen": "@variables.caseMotivoReady == True",
        "with": [
          "caseSubject = ...",
          "caseDescription = ..."
        ],
        "set": []
      },
      {
        "name": "capture_case_tracking",
        "kind": "setVariables",
        "ref": "@utils.setVariables",
        "description": "Llámala cuando el cliente comparta un número de guía y/o de rastreo para el caso. Registra en caseGuia SOLO lo que el cliente identifique como guía y en caseRastreo SOLO lo que identifique como rastreo (si da un único número sin especificar cuál es, ponlo en caseRastreo). NUNCA inventes el dato que no te dieron: deja vacío el campo que falte. SIEMPRE marca caseTrackingAsked en True. NO la uses para portería silenciosa.",
        "availableWhen": "@variables.caseTrackingReady == True",
        "with": [
          "caseGuia = ...",
          "caseRastreo = ...",
          "caseTrackingAsked = True"
        ],
        "set": []
      },
      {
        "name": "skip_case_tracking",
        "kind": "setVariables",
        "ref": "@utils.setVariables",
        "description": "Llámala cuando, tras preguntarle, el cliente diga que NO tiene o no quiere compartir número de guía ni de rastreo. Marca caseTrackingAsked en True para que el caso se cree sin esos datos. No cambia caseGuia ni caseRastreo (quedan vacíos).",
        "availableWhen": "@variables.caseTrackingReady == True",
        "with": [
          "caseTrackingAsked = True"
        ],
        "set": []
      },
      {
        "name": "GetCaseByCaseNumber_v2A",
        "kind": "action",
        "ref": "@actions.GetCaseByCaseNumber_v2A",
        "description": "",
        "availableWhen": null,
        "with": [
          "contactRecord = @variables.contactRecord",
          "caseNumber = ..."
        ],
        "set": []
      },
      {
        "name": "GetAllCasesForContact",
        "kind": "action",
        "ref": "@actions.GetAllCasesForContact",
        "description": "",
        "availableWhen": null,
        "with": [
          "contactRecord = @variables.contactRecord"
        ],
        "set": []
      }
    ],
    "definedActions": [
      {
        "name": "AddCaseComment_v2A",
        "label": "Agregar Comentario al Caso",
        "description": "Permite que un cliente agregue un comentario a un caso existente.",
        "target": "flow://SvcCopilotTmpl__AddCaseComment",
        "source": "SvcCopilotTmpl__AddCaseComment",
        "requireConfirmation": true,
        "progressIndicator": true,
        "inputs": [
          {
            "name": "caseRecord",
            "type": "object",
            "label": "Registro del caso",
            "description": "Almacena el registro del caso que se actualizará con un comentario.",
            "required": true,
            "userInput": false,
            "displayable": null,
            "complexType": "lightning__recordInfoType"
          },
          {
            "name": "caseComment",
            "type": "string",
            "label": "Comentario del caso",
            "description": "Almacena el texto del comentario a agregar al caso.",
            "required": true,
            "userInput": true,
            "displayable": null,
            "complexType": null
          }
        ],
        "outputs": [
          {
            "name": "outcomeMessage",
            "type": "string",
            "label": "Mensaje de resultado",
            "description": "Almacena el mensaje que le informa al cliente si el comentario se agregó correctamente al caso.",
            "required": null,
            "userInput": null,
            "displayable": true,
            "complexType": null
          }
        ]
      },
      {
        "name": "Crea_caso_solicitud_de_servicio_v2A",
        "label": "Crea caso solicitud de servicio v2A",
        "description": "Acción para crear caso de solicitud de servicio",
        "target": "flow://Crea_caso_solicitud_de_servicio",
        "source": null,
        "requireConfirmation": null,
        "progressIndicator": null,
        "inputs": [
          {
            "name": "Description",
            "type": "string",
            "label": "Description",
            "description": "Almacena los detalles del problema del usuario que se usarán para el caso.",
            "required": true,
            "userInput": false,
            "displayable": null,
            "complexType": null
          },
          {
            "name": "Subject",
            "type": "string",
            "label": "Subject",
            "description": "Almacena el asunto del caso a crear.",
            "required": true,
            "userInput": false,
            "displayable": null,
            "complexType": null
          },
          {
            "name": "contactRecordId",
            "type": "string",
            "label": "contactRecordId",
            "description": "Almacena el id de salesforce",
            "required": true,
            "userInput": false,
            "displayable": null,
            "complexType": null
          },
          {
            "name": "medioDeContacto",
            "type": "string",
            "label": "medioDeContacto",
            "description": "almacena el medio de contacto del usuario",
            "required": true,
            "userInput": false,
            "displayable": null,
            "complexType": null
          },
          {
            "name": "NumeroDeRastreo",
            "type": "string",
            "label": "NumeroDeRastreo",
            "description": "Número de rastreo que el cliente proporcionó para el caso. Opcional: puede ir vacío. Se mapea al campo Numero_de_Rastreo__c del caso.",
            "required": false,
            "userInput": false,
            "displayable": null,
            "complexType": null
          },
          {
            "name": "Guia",
            "type": "string",
            "label": "Guia",
            "description": "Número de guía que el cliente proporcionó para el caso. Opcional: puede ir vacío. Se mapea al campo Guia__c del caso.",
            "required": false,
            "userInput": false,
            "displayable": null,
            "complexType": null
          }
        ],
        "outputs": [
          {
            "name": "caseRecord",
            "type": "object",
            "label": "caseRecord",
            "description": "Almacena el registro del caso creado por el cliente.",
            "required": null,
            "userInput": null,
            "displayable": false,
            "complexType": "lightning__recordInfoType"
          }
        ]
      },
      {
        "name": "GetCaseByCaseNumber_v2A",
        "label": "Obtener Caso por Número de Caso",
        "description": "Devuelve un caso asociado a un registro de contacto y número de caso dados.",
        "target": "flow://SvcCopilotTmpl__GetCaseByCaseNumber",
        "source": "SvcCopilotTmpl__GetCaseByCaseNumber",
        "requireConfirmation": false,
        "progressIndicator": true,
        "inputs": [
          {
            "name": "contactRecord",
            "type": "object",
            "label": "Registro de contacto",
            "description": "Almacena el registro de contacto del cliente que se usará con el número de caso para buscar un caso.",
            "required": true,
            "userInput": false,
            "displayable": null,
            "complexType": "lightning__recordInfoType"
          },
          {
            "name": "caseNumber",
            "type": "string",
            "label": "Número de Caso",
            "description": "Almacena el número de caso proporcionado por el cliente.",
            "required": true,
            "userInput": false,
            "displayable": null,
            "complexType": null
          }
        ],
        "outputs": [
          {
            "name": "caseRecord",
            "type": "object",
            "label": "Registro del caso",
            "description": "Almacena el registro del caso con base en el registro de contacto y el número de caso.",
            "required": null,
            "userInput": null,
            "displayable": true,
            "complexType": "lightning__recordInfoType"
          }
        ]
      },
      {
        "name": "GetAllCasesForContact",
        "label": "Obtener Todos los Casos del Contacto",
        "description": "Devuelve una lista de casos relacionados con un registro de contacto dado.",
        "target": "flow://SvcCopilotTmpl__GetCasesForContact",
        "source": "SvcCopilotTmpl__GetAllCasesForContact",
        "requireConfirmation": false,
        "progressIndicator": true,
        "inputs": [
          {
            "name": "contactRecord",
            "type": "object",
            "label": "Registro de contacto",
            "description": "El registro de contacto del cliente usado para buscar los registros de casos relacionados.",
            "required": true,
            "userInput": false,
            "displayable": null,
            "complexType": "lightning__recordInfoType"
          }
        ],
        "outputs": [
          {
            "name": "caseList",
            "type": "list[object]",
            "label": "Lista de Casos",
            "description": "Almacena el ID, Subject, Description, Status, CreatedDate, CaseNumber, LastModifiedDate y ClosedDate de los registros de casos relacionados con un contacto específico.",
            "required": null,
            "userInput": null,
            "displayable": true,
            "complexType": "lightning__recordInfoType"
          }
        ]
      }
    ]
  },
  {
    "apiName": "Orden_Management",
    "isStart": false,
    "label": "Gestión de Órdenes",
    "description": "Atiende consultas y acciones del cliente relacionadas con solicitudes de servicio y estatus de la orden. El usuario puede referirse a una solicitud de servicio con distintos términos como orden, número de rastreo, guía, paquete o solicitud de servicio, que deben entenderse como equivalentes. Si el usuario no está verificado, debe verificarse antes de acceder a este tema. Si el usuario ya fue verificado, no se requiere verificación adicional. Debe crearse un caso con la información proporcionada por el cliente.",
    "lines": "1741-1953",
    "variablesRead": [
      "RoutableId",
      "caseRecord",
      "contactChannel",
      "isVerified",
      "orderCaseCreated",
      "orderPorteriaCaseCreated",
      "orderStatusMessage",
      "pendingIntent",
      "reportRequested",
      "trackingNumber",
      "verifiedContactId"
    ],
    "variablesSet": [
      "caseRecord",
      "orderCaseCreated",
      "orderPorteriaCaseCreated",
      "orderStatusMessage",
      "pendingIntent",
      "reportRequested",
      "trackingNumber"
    ],
    "transitions": [
      "Customer_Verification",
      "Escalation_v2"
    ],
    "deterministicRuns": [
      "Crea_caso_seguimiento_de_una_orden_v2A",
      "Crea_caso_solicitud_de_servicio_orden"
    ],
    "reasoningActions": [
      {
        "name": "capture_tracking_number",
        "kind": "setVariables",
        "ref": "@utils.setVariables",
        "description": "Registra el número de rastreo/guía que proporcionó el cliente. Llámala inmediatamente cuando el cliente dé un número de rastreo o guía; es necesario antes de poder consultar el estatus.",
        "availableWhen": null,
        "with": [
          "trackingNumber = ..."
        ],
        "set": []
      },
      {
        "name": "capture_report_request",
        "kind": "setVariables",
        "ref": "@utils.setVariables",
        "description": "Registra que el cliente pidió EXPLÍCITAMENTE abrir un reporte, reclamación, folio o caso de seguimiento sobre su envío. Llámala SOLO ante frases como 'quiero un reporte', 'levantar reclamación', 'necesito folio', 'abrir caso'. NO la llames para una simple consulta de estatus ni para una queja implícita.",
        "availableWhen": null,
        "with": [
          "reportRequested = ..."
        ],
        "set": []
      },
      {
        "name": "go_to_Escalation_v2",
        "kind": "transition",
        "ref": "@utils.transition to @subagent.Escalation_v2",
        "description": "Transfiere a un agente en vivo para solicitudes operativas (cambio de dirección, instalación, modificar/reprogramar entrega), quejas implícitas tras consultar estatus, o cuando el cliente pide explícitamente un agente.",
        "availableWhen": null,
        "with": [],
        "set": []
      },
      {
        "name": "Obtener_estatus_de_la_orden",
        "kind": "action",
        "ref": "@actions.Obtener_estatus_de_la_orden",
        "description": "Consulta el estatus del envío usando el número de rastreo registrado. Llámala justo después de registrar el número de rastreo para darle al cliente el estatus de su envío.",
        "availableWhen": "@variables.trackingNumber != \"\"",
        "with": [
          "NUMERO_RASTREO = @variables.trackingNumber"
        ],
        "set": [
          "@variables.orderStatusMessage = @outputs.OutpoutMessage"
        ]
      },
      {
        "name": "Crea_caso_solicitud_de_servicio_orden",
        "kind": "action",
        "ref": "@actions.Crea_caso_solicitud_de_servicio_orden",
        "description": "",
        "availableWhen": null,
        "with": [
          "Description = ...",
          "Subject = ...",
          "NumeroDeRastreo = ...",
          "Seguimiento = ...",
          "contactRecordId = ...",
          "medioDeContacto = ..."
        ],
        "set": []
      },
      {
        "name": "Crea_caso_seguimiento_de_una_orden_v2A",
        "kind": "action",
        "ref": "@actions.Crea_caso_seguimiento_de_una_orden_v2A",
        "description": "",
        "availableWhen": null,
        "with": [
          "Description = ...",
          "NumeroDeGuia = ...",
          "Subject = ...",
          "CaseContext = ...",
          "OrderStatusSummary = ...",
          "Seguimiento = ...",
          "messagingSessionId = ...",
          "contactRecordId = ...",
          "medioDeContacto = ..."
        ],
        "set": []
      }
    ],
    "definedActions": [
      {
        "name": "Obtener_estatus_de_la_orden",
        "label": "Obtener estatus de la orden",
        "description": "Obtiene el estatus del envío de la orden según el número de rastreo o guía proporcionado por el cliente",
        "target": "flow://PE_GetOrderStatus",
        "source": "Obtener_estatus_de_la_orden",
        "requireConfirmation": false,
        "progressIndicator": false,
        "inputs": [
          {
            "name": "NUMERO_RASTREO",
            "type": "string",
            "label": "NUMERO_RASTREO",
            "description": "Almacena el número de rastreo o guía que proporciona el cliente",
            "required": true,
            "userInput": false,
            "displayable": null,
            "complexType": null
          }
        ],
        "outputs": [
          {
            "name": "OutpoutMessage",
            "type": "string",
            "label": "OutpoutMessage",
            "description": "Muestra el mensaje de salida con la información solicitada",
            "required": null,
            "userInput": null,
            "displayable": true,
            "complexType": null
          }
        ]
      },
      {
        "name": "Crea_caso_seguimiento_de_una_orden_v2A",
        "label": "Crea caso seguimiento de una orden v2A",
        "description": "Acción para crear caso de RECLAMACIÓN (seguimiento) de una orden cuando el cliente lo pide explícitamente",
        "target": "flow://Crea_caso_seguimiento_de_una_orden",
        "source": null,
        "requireConfirmation": null,
        "progressIndicator": null,
        "inputs": [
          {
            "name": "Description",
            "type": "string",
            "label": "Description",
            "description": "Almacena los detalles del problema del usuario que se usarán para el caso.",
            "required": true,
            "userInput": false,
            "displayable": null,
            "complexType": null
          },
          {
            "name": "NumeroDeGuia",
            "type": "string",
            "label": "NumeroDeGuia",
            "description": "almacena el número de rastreo proporcionado por el cliente.",
            "required": true,
            "userInput": false,
            "displayable": null,
            "complexType": null
          },
          {
            "name": "Subject",
            "type": "string",
            "label": "Subject",
            "description": "Almacena el asunto del caso a crear.",
            "required": true,
            "userInput": false,
            "displayable": null,
            "complexType": null
          },
          {
            "name": "CaseContext",
            "type": "string",
            "label": "CaseContext",
            "description": "Motivo de creación del caso en una línea, para enriquecer el resumen.",
            "required": false,
            "userInput": false,
            "displayable": null,
            "complexType": null
          },
          {
            "name": "OrderStatusSummary",
            "type": "string",
            "label": "OrderStatusSummary",
            "description": "Resumen legible del estatus del envío ya consultado.",
            "required": false,
            "userInput": false,
            "displayable": null,
            "complexType": null
          },
          {
            "name": "Seguimiento",
            "type": "string",
            "label": "Seguimiento",
            "description": "'Si' si la solicitud del cliente requiere seguimiento posterior; 'No' si fue resuelta.",
            "required": false,
            "userInput": false,
            "displayable": null,
            "complexType": null
          },
          {
            "name": "messagingSessionId",
            "type": "string",
            "label": "messagingSessionId",
            "description": "Id de la Messaging Session actual (0Mw...) para obtener la transcripción.",
            "required": false,
            "userInput": false,
            "displayable": null,
            "complexType": null
          },
          {
            "name": "contactRecordId",
            "type": "string",
            "label": "contactRecordId",
            "description": "Almacena el id de salesforce",
            "required": true,
            "userInput": false,
            "displayable": null,
            "complexType": null
          },
          {
            "name": "medioDeContacto",
            "type": "string",
            "label": "medioDeContacto",
            "description": "almacena el medio de contacto del usuario",
            "required": true,
            "userInput": false,
            "displayable": null,
            "complexType": null
          }
        ],
        "outputs": [
          {
            "name": "caseRecord",
            "type": "object",
            "label": "caseRecord",
            "description": "Almacena el registro del caso creado por el cliente.",
            "required": null,
            "userInput": null,
            "displayable": false,
            "complexType": "lightning__recordInfoType"
          }
        ]
      },
      {
        "name": "Crea_caso_solicitud_de_servicio_orden",
        "label": "Crea caso solicitud de servicio (portería orden)",
        "description": "Acción SILENCIOSA para registrar internamente un caso de solicitud de servicio tras una consulta de estatus de envío. No se comparte folio con el cliente.",
        "target": "flow://Crea_caso_solicitud_de_servicio",
        "source": null,
        "requireConfirmation": null,
        "progressIndicator": null,
        "inputs": [
          {
            "name": "Description",
            "type": "string",
            "label": "Description",
            "description": "Almacena los detalles de la consulta del cliente que se usarán para el caso.",
            "required": true,
            "userInput": false,
            "displayable": null,
            "complexType": null
          },
          {
            "name": "Subject",
            "type": "string",
            "label": "Subject",
            "description": "Almacena el asunto del caso a crear.",
            "required": true,
            "userInput": false,
            "displayable": null,
            "complexType": null
          },
          {
            "name": "NumeroDeRastreo",
            "type": "string",
            "label": "NumeroDeRastreo",
            "description": "Almacena el número de rastreo o guía proporcionado por el cliente.",
            "required": false,
            "userInput": false,
            "displayable": null,
            "complexType": null
          },
          {
            "name": "Seguimiento",
            "type": "string",
            "label": "Seguimiento",
            "description": "'Si' si requiere seguimiento posterior; 'No' si es solo consulta de estatus.",
            "required": false,
            "userInput": false,
            "displayable": null,
            "complexType": null
          },
          {
            "name": "contactRecordId",
            "type": "string",
            "label": "contactRecordId",
            "description": "Almacena el id de salesforce",
            "required": true,
            "userInput": false,
            "displayable": null,
            "complexType": null
          },
          {
            "name": "medioDeContacto",
            "type": "string",
            "label": "medioDeContacto",
            "description": "almacena el medio de contacto del usuario",
            "required": true,
            "userInput": false,
            "displayable": null,
            "complexType": null
          }
        ],
        "outputs": [
          {
            "name": "caseRecord",
            "type": "object",
            "label": "caseRecord",
            "description": "Almacena el registro del caso creado por el cliente.",
            "required": null,
            "userInput": null,
            "displayable": false,
            "complexType": "lightning__recordInfoType"
          }
        ]
      }
    ]
  },
  {
    "apiName": "ambiguous_question",
    "isStart": false,
    "label": "Pregunta Ambigua",
    "description": "Redirige la conversación a los subagentes relevantes cuando la solicitud del usuario es demasiado ambigua",
    "lines": "1954-1979",
    "variablesRead": [
      "isVerified"
    ],
    "variablesSet": [],
    "transitions": [
      "Customer_Verification"
    ],
    "deterministicRuns": [],
    "reasoningActions": [],
    "definedActions": []
  },
  {
    "apiName": "off_topic",
    "isStart": false,
    "label": "Fuera de Tema",
    "description": "Redirige la conversación a los subagentes relevantes cuando la solicitud del usuario está fuera de tema",
    "lines": "1980-2003",
    "variablesRead": [
      "isVerified"
    ],
    "variablesSet": [],
    "transitions": [
      "Customer_Verification"
    ],
    "deterministicRuns": [],
    "reasoningActions": [],
    "definedActions": []
  }
];
