import type { Lang } from "../../utils/i18n";

export type Section = "overview" | "conversations" | "leads" | "clients" | "users" | "docs" | "admin" | "demo";
export type UserClientMode = "global" | "existing" | "new";

export const OWNER_EMAIL = "alan@piroxeno.com";

export function linesToArray(value: string) {
  return value.split("\n").map((item) => item.trim()).filter(Boolean);
}

export function arrayToLines(value?: string[]) {
  return (value || []).join("\n");
}

export function slugifyAccountName(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 64);
}

export function formatNumber(value?: number | null) {
  return new Intl.NumberFormat().format(value || 0);
}

export function formatDate(value?: string | null) {
  if (!value) return "-";
  return new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
}

export function blankLast30Days() {
  const today = new Date();
  return Array.from({ length: 30 }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - 29 + index);
    return {
      date: date.toISOString().slice(0, 10),
      conversations: 0,
      messages: 0,
      assistant_messages: 0,
      user_messages: 0,
      tokens: 0,
      avg_latency_ms: 0,
    };
  });
}

export function getLabels(lang: Lang) {
  const es = lang === "es";
  return {
    app: es ? "Portal Piroxeno" : "Piroxeno Portal",
    subtitle: es ? "Operación, métricas y conversaciones de tus asistentes." : "Operations, metrics and conversations for your assistants.",
    overview: es ? "Dashboard" : "Dashboard",
    conversations: es ? "Conversaciones" : "Conversations",
    leads: es ? "Leads" : "Leads",
    clients: es ? "Clientes" : "Clients",
    users: es ? "Usuarios" : "Users",
    docs: es ? "Documentación" : "Documentation",
    admin: es ? "Ajustes" : "Settings",
    demo: es ? "DEMO" : "DEMO",
    refresh: es ? "Actualizar" : "Refresh",
    logout: es ? "Salir" : "Log out",
    active: es ? "Activo" : "Active",
    disabled: es ? "Pausado" : "Paused",
    allClients: es ? "Todos los clientes" : "All clients",
    selectClient: es ? "Selecciona cliente" : "Select client",
    start: es ? "Desde" : "From",
    end: es ? "Hasta" : "To",
    conversationsKpi: es ? "Conversaciones" : "Conversations",
    messages: es ? "Mensajes" : "Messages",
    assistant: es ? "Assistant" : "Assistant",
    userMessages: es ? "Usuario" : "User",
    tokens: es ? "Tokens" : "Tokens",
    latency: es ? "Latencia media" : "Avg latency",
    client: es ? "Cliente" : "Client",
    lastMessage: es ? "Último mensaje" : "Last message",
    created: es ? "Creada" : "Created",
    openedConversation: es ? "Detalle de conversación" : "Conversation detail",
    noConversation: es ? "Selecciona una conversación" : "Select a conversation",
    copySnippet: es ? "Copiar snippet" : "Copy snippet",
    copied: es ? "Copiado" : "Copied",
    snippet: es ? "Snippet embebible" : "Embeddable snippet",
    leadColumns: es ? "Columnas de leads" : "Lead columns",
    leadColumnsHelp: es ? "Una columna por línea. Ejemplo: Servicio de interés, Presupuesto, Ubicación." : "One column per line. Example: Service interest, Budget, Location.",
    contact: es ? "Contacto" : "Contact",
    interest: es ? "Interés" : "Interest",
    accountName: es ? "Account Name" : "Account Name",
    domains: es ? "Whitelist de dominios" : "Domain whitelist",
    rateLimit: es ? "Rate limit por minuto" : "Rate limit per minute",
    save: es ? "Guardar cambios" : "Save changes",
    createClient: es ? "Crear cliente" : "Create client",
    createdClient: es ? "Cliente creado" : "Client created",
    createUser: es ? "Crear usuario" : "Create user",
    existingClient: es ? "Cliente existente" : "Existing client",
    newClient: es ? "Cliente nuevo" : "New client",
    global: es ? "Admin" : "Admin",
    tempPassword: es ? "Contraseña temporal (min. 10 caracteres)" : "Temporary password (min. 10 chars)",
    saveUser: es ? "Guardar usuario" : "Save user",
    syncRegistry: es ? "Sincronizar registry" : "Sync registry",
    publishLocal: es ? "Publicar locales" : "Publish locals",
    replicateDev: es ? "Replicar en dev" : "Replicate dev",
    roleAdmin: es ? "Admin" : "Admin",
    roleUser: es ? "Usuario" : "User",
    role: es ? "Rol" : "Role",
    search: es ? "Buscar" : "Search",
    light: es ? "Claro" : "Light",
    dark: es ? "Oscuro" : "Dark",
    impersonating: es ? "Viendo como" : "Viewing as",
    stopImpersonating: es ? "Volver a admin" : "Back to admin",
    viewAs: "Impersonate",
    demoPrompt: es ? "Prompt de demo" : "Demo prompt",
    resetDemo: es ? "Resetear demo" : "Reset demo",
    typeMessage: es ? "Escribe un mensaje" : "Type a message",
    portalFor: es ? "Piroxeno x" : "Piroxeno x",
    settings: es ? "Idioma" : "Language",
    theme: es ? "Tema" : "Theme",
    activity30d: es ? "Actividad de los ultimos 30 dias" : "Last 30 days activity",
    noData: es ? "Sin datos todavía" : "No data yet",
    metricHints: {
      conversations: es ? "Conversaciones iniciadas dentro del periodo seleccionado. Una conversación agrupa todos los mensajes de una misma sesión o visitante." : "Conversations started in the selected period. A conversation groups all messages from the same session or visitor.",
      messages: es ? "Suma de todos los mensajes intercambiados: preguntas del usuario final y respuestas generadas por el assistant." : "Total exchanged messages: end-user questions plus assistant responses.",
      assistant: es ? "Cantidad de respuestas que generó la IA. Ayuda a medir cuánto trabajo está absorbiendo el assistant." : "Number of AI-generated replies. Useful to understand how much work the assistant is handling.",
      user: es ? "Cantidad de mensajes enviados por usuarios finales. Indica demanda, intención y volumen real de interacción." : "Messages sent by end users. Indicates demand, intent and real interaction volume.",
      tokens: es ? "Consumo total de tokens registrado por el modelo. Es la métrica base para estimar costo de uso de IA." : "Total model tokens recorded. This is the baseline metric for estimating AI usage cost.",
      latency: es ? "Tiempo promedio que tarda el assistant en responder. Mientras menor sea, más fluida se siente la conversación." : "Average time the assistant takes to respond. Lower latency makes the conversation feel smoother.",
    },
  };
}

export type AdminLabels = ReturnType<typeof getLabels>;
