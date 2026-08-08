import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  BookOpen,
  Check,
  CircleHelp,
  Copy,
  DatabaseZap,
  Gauge,
  Globe2,
  Languages,
  Moon,
  LayoutDashboard,
  Loader2,
  LogOut,
  MessageSquareText,
  RefreshCw,
  Search,
  Send,
  Settings2,
  Smartphone,
  ShieldCheck,
  Sparkles,
  Sun,
  Users,
} from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";
import { clearAdminToken, getAdminToken, getAdminUser } from "../utils/adminSession";
import {
  chatbotAdminApi,
  type AppUser,
  type ClientDetail,
  type ClientSummary,
  type PortalConversation,
  type PortalDoc,
  type PortalMessage,
  type PortalSummary,
  type UpsertAppUser,
} from "../utils/chatbotAdminApi";
import { useLang, type Lang } from "../utils/i18n";

type Section = "overview" | "conversations" | "clients" | "users" | "docs" | "admin" | "demo";
type UserClientMode = "global" | "existing" | "new";


function linesToArray(value: string) {
  return value.split("\n").map((item) => item.trim()).filter(Boolean);
}

function arrayToLines(value?: string[]) {
  return (value || []).join("\n");
}

function slugifyAccountName(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 64);
}

function formatNumber(value?: number | null) {
  return new Intl.NumberFormat().format(value || 0);
}

function formatDate(value?: string | null) {
  if (!value) return "-";
  return new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
}

function getLabels(lang: Lang) {
  const es = lang === "es";
  return {
    app: es ? "Portal Piroxeno" : "Piroxeno Portal",
    subtitle: es ? "Operación, métricas y conversaciones de tus asistentes." : "Operations, metrics and conversations for your assistants.",
    overview: es ? "Dashboard" : "Dashboard",
    conversations: es ? "Conversaciones" : "Conversations",
    clients: es ? "Clientes" : "Clients",
    users: es ? "Usuarios" : "Users",
    docs: es ? "Documentación" : "Documentation",
    admin: es ? "Administración" : "Administration",
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
    accountName: es ? "Account Name" : "Account Name",
    domains: es ? "Whitelist de dominios" : "Domain whitelist",
    rateLimit: es ? "Rate limit por minuto" : "Rate limit per minute",
    save: es ? "Guardar cambios" : "Save changes",
    createClient: es ? "Crear cliente" : "Create client",
    createdClient: es ? "Cliente creado" : "Client created",
    createUser: es ? "Crear usuario" : "Create user",
    existingClient: es ? "Cliente existente" : "Existing client",
    newClient: es ? "Cliente nuevo" : "New client",
    global: es ? "Global" : "Global",
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
    settings: es ? "Preferencias" : "Preferences",
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

function StatCard({ icon: Icon, label, value, detail, hint }: { icon: typeof Activity; label: string; value: string | number; detail?: string; hint?: string }) {
  return (
    <div className="border border-white/10 bg-white/[0.045] p-5 shadow-[0_20px_80px_rgba(0,0,0,0.18)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            {label}
            {hint && <span className="group relative inline-flex cursor-help" aria-label={hint}><CircleHelp className="h-3.5 w-3.5 text-slate-500" /><span className="pointer-events-none absolute left-1/2 top-6 z-40 hidden w-64 -translate-x-1/2 border border-white/10 bg-slate-950 p-3 text-left text-[11px] font-medium normal-case leading-5 tracking-normal text-slate-200 shadow-2xl shadow-black/30 group-hover:block">{hint}</span></span>}
          </p>
          <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center bg-[var(--color-primary)]/15 text-[var(--color-primary)]">
          <Icon className="h-5 w-5" />
        </div>
      </div>
      {detail && <p className="mt-3 text-sm text-slate-500">{detail}</p>}
    </div>
  );
}

function PortalLoading({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center">
      <img src="/favicon.png" alt="" className="h-16 w-16 animate-spin drop-shadow-[0_18px_35px_rgba(0,0,0,0.35)]" />
    </div>
  );
}

function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-[var(--color-primary)] ${props.className || ""}`} />;
}

function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={`border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none focus:border-[var(--color-primary)] ${props.className || ""}`} />;
}

export default function AdminDashboard() {
  const lang = useLang();
  const navigate = useNavigate();
  const t = useMemo(() => getLabels(lang), [lang]);
  const [token, setToken] = useState(() => getAdminToken());
  const [user, setUser] = useState(() => getAdminUser());
  const isAdmin = user?.role === "admin";
  const [theme, setTheme] = useState(() => localStorage.getItem("piroxeno_portal_theme") || "dark");
  const [impersonatedUser, setImpersonatedUser] = useState<AppUser | null>(null);
  const actingUser = impersonatedUser || user;
  const impersonateUserId = impersonatedUser?.id;

  const [section, setSection] = useState<Section>("overview");
  const [clients, setClients] = useState<ClientSummary[]>([]);
  const [users, setUsers] = useState<AppUser[]>([]);
  const [selectedSlug, setSelectedSlug] = useState("");
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [summary, setSummary] = useState<PortalSummary | null>(null);
  const [conversations, setConversations] = useState<PortalConversation[]>([]);
  const [conversationQuery, setConversationQuery] = useState("");
  const [selectedConversationId, setSelectedConversationId] = useState("");
  const [messages, setMessages] = useState<PortalMessage[]>([]);
  const [demoPrompt, setDemoPrompt] = useState("Eres el asistente de demostracion de Piroxeno. Atiende como un chatbot de WhatsApp para un negocio moderno. Haz preguntas de seguimiento utiles, recuerda datos ya dichos por el usuario y muestra como puedes capturar leads, reservas o dudas frecuentes.");
  const [demoInput, setDemoInput] = useState("");
  const [demoSessionId, setDemoSessionId] = useState<string | undefined>();
  const [demoMessages, setDemoMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([]);
  const [docs, setDocs] = useState<PortalDoc[]>([]);
  const [detail, setDetail] = useState<ClientDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [conversationLoading, setConversationLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [copied, setCopied] = useState(false);

  const [originsDraft, setOriginsDraft] = useState("");
  const [enabledDraft, setEnabledDraft] = useState(true);
  const [rateLimitDraft, setRateLimitDraft] = useState(30);

  const [userClientMode, setUserClientMode] = useState<UserClientMode>("existing");
  const [newUserClientForm, setNewUserClientForm] = useState({ account_name: "", title: "", allowed_origins: "", primary_color: "#00cc99", rate_limit_per_minute: 30 });
  const [userForm, setUserForm] = useState<UpsertAppUser>({ email: "", role: "user", client_slug: "", is_active: true, password: "" });

  const navItems = [
    ["overview", LayoutDashboard, t.overview, true],
    ["conversations", MessageSquareText, t.conversations, true],
    ["clients", Globe2, t.clients, isAdmin],
    ["users", Users, t.users, isAdmin],
    ["docs", BookOpen, t.docs, true],
    ["demo", Smartphone, t.demo, isAdmin],
    ["admin", Settings2, t.admin, isAdmin],
  ] as const;

  const metricParams = { client_slug: selectedSlug || undefined, start_date: dateStart || undefined, end_date: dateEnd || undefined, impersonate_user_id: impersonateUserId };

  const loadPortal = async () => {
    if (!token) return;
    setLoading(true);
    setError("");
    try {
      const clientResponse = await chatbotAdminApi.portalClients(token, impersonateUserId);
      const nextClients = clientResponse.clients;
      setClients(nextClients);
      const nextSlug = actingUser?.role === "admin" ? selectedSlug : nextClients[0]?.client_slug || "";
      if (actingUser?.role !== "admin" && nextSlug) setSelectedSlug(nextSlug);
      const [summaryResponse, conversationResponse, docsResponse] = await Promise.all([
        chatbotAdminApi.portalSummary(token, { ...metricParams, client_slug: actingUser?.role === "admin" ? metricParams.client_slug : nextSlug || undefined }),
        chatbotAdminApi.portalConversations(token, { ...metricParams, client_slug: actingUser?.role === "admin" ? metricParams.client_slug : nextSlug || undefined, limit: 80 }),
        chatbotAdminApi.portalDocs(token, lang, impersonateUserId),
      ]);
      setSummary(summaryResponse);
      setConversations(conversationResponse.conversations);
      setDocs(docsResponse.docs);
      if (isAdmin) {
        try {
          const usersResponse = await chatbotAdminApi.listUsers(token);
          setUsers(usersResponse.users);
        } catch {
          setUsers([]);
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load portal");
    } finally {
      setLoading(false);
    }
  };

  const loadClientDetail = async (clientSlug: string) => {
    if (!token || !clientSlug || !isAdmin) return;
    const [clientDetail, clientUsage] = await Promise.all([
      chatbotAdminApi.getClient(token, clientSlug),
      chatbotAdminApi.getUsage(token, clientSlug),
    ]);
    setDetail(clientDetail);
    setSummary((current) => current || {
      scope: clientSlug,
      conversation_count: clientUsage.conversation_count,
      message_count: clientUsage.message_count,
      assistant_messages: clientUsage.assistant_messages,
      user_messages: clientUsage.user_messages,
      total_tokens: clientUsage.total_tokens,
      avg_latency_ms: 0,
      by_client: [],
      activity_30d: [],
    });
    setOriginsDraft(arrayToLines(clientDetail.config.allowed_origins));
    setEnabledDraft(Boolean(clientDetail.config.enabled));
    setRateLimitDraft(clientDetail.config.rate_limit_per_minute || 30);
  };

  useEffect(() => {
    if (token) void loadPortal();
  }, [token, lang, selectedSlug, dateStart, dateEnd, impersonateUserId]);

  const handleLogout = () => {
    clearAdminToken();
    setToken("");
    setUser(null);
  };

  const switchLang = () => {
    const nextLang = lang === "es" ? "en" : "es";
    navigate(`/${nextLang}/admin`);
  };

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("piroxeno_portal_theme", nextTheme);
  };

  const startImpersonation = (target: AppUser) => {
    setImpersonatedUser(target);
    setSelectedSlug(target.client_slug || "");
    setSection("overview");
  };

  const stopImpersonation = () => {
    setImpersonatedUser(null);
    setSelectedSlug("");
    setSection("overview");
  };

  const resetDemoConversation = () => {
    setDemoSessionId(undefined);
    setDemoInput("");
    setDemoMessages([]);
  };

  const sendDemoMessage = async () => {
    if (!token || !demoInput.trim()) return;
    const question = demoInput.trim();
    setDemoInput("");
    setDemoMessages((current) => [...current, { role: "user", content: question }]);
    setSaving(true);
    setError("");
    try {
      const response = await chatbotAdminApi.demoChat(token, {
        prompt: demoPrompt,
        question,
        session_id: demoSessionId,
      });
      setDemoSessionId(response.session_id);
      setDemoMessages((current) => [...current, { role: "assistant", content: response.answer }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not send demo message");
    } finally {
      setSaving(false);
    }
  };

  const loadConversationMessages = async (conversationId: string) => {
    if (!token) return;
    setSelectedConversationId(conversationId);
    setConversationLoading(true);
    setError("");
    try {
      const response = await chatbotAdminApi.portalConversationMessages(token, conversationId, impersonateUserId);
      setMessages(response.messages);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load conversation");
    } finally {
      setConversationLoading(false);
    }
  };

  const copyEmbed = async (value: string) => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  const saveConfig = async () => {
    if (!detail || !token) return;
    setSaving(true);
    setError("");
    try {
      await chatbotAdminApi.updateClientConfig(token, detail.client_slug, {
        allowed_origins: linesToArray(originsDraft),
        enabled: enabledDraft,
        rate_limit_per_minute: Number(rateLimitDraft),
      });
      await loadClientDetail(detail.client_slug);
      setNotice(lang === "es" ? "Configuración guardada" : "Configuration saved");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save config");
    } finally {
      setSaving(false);
    }
  };

  const createClient = async (form: typeof newUserClientForm) => {
    if (!token) throw new Error("Missing token");
    const accountName = form.account_name.trim();
    const clientSlug = slugifyAccountName(accountName);
    if (!clientSlug) throw new Error("Account Name is required");
    return chatbotAdminApi.createClient(token, {
      client_slug: clientSlug,
      name: accountName,
      title: form.title.trim() || undefined,
      allowed_origins: linesToArray(form.allowed_origins),
      primary_color: form.primary_color,
      rate_limit_per_minute: Number(form.rate_limit_per_minute),
    });
  };

  const saveUser = async () => {
    if (!token) return;
    setSaving(true);
    setError("");
    try {
      let assignedClientSlug = userClientMode === "global" ? null : userForm.client_slug?.trim() || null;
      if (userClientMode === "new") {
        const response = await createClient(newUserClientForm);
        assignedClientSlug = response.client_slug;
      }
      const assignedRole = userClientMode === "global" ? userForm.role : "user";
      await chatbotAdminApi.upsertUser(token, { ...userForm, role: assignedRole, email: userForm.email.trim().toLowerCase(), client_slug: assignedClientSlug, password: userForm.password?.trim() || undefined });
      setUserForm({ email: "", role: "user", client_slug: "", is_active: true, password: "" });
      setNewUserClientForm({ account_name: "", title: "", allowed_origins: "", primary_color: "#00cc99", rate_limit_per_minute: 30 });
      await loadPortal();
      setNotice(lang === "es" ? "Usuario guardado" : "User saved");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save user");
    } finally {
      setSaving(false);
    }
  };

  const syncRegistry = async (target: "current" | "dev") => {
    if (!token) return;
    setSaving(true);
    setError("");
    try {
      const response = await chatbotAdminApi.syncClientsFromRegistry(token, target === "dev" ? "http://127.0.0.1:8000" : undefined);
      await loadPortal();
      setNotice(`${response.synced_count} ${lang === "es" ? "clientes sincronizados" : "clients synced"}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not sync clients");
    } finally {
      setSaving(false);
    }
  };

  const publishLocalClients = async () => {
    if (!token) return;
    setSaving(true);
    setError("");
    try {
      const response = await chatbotAdminApi.publishLocalClients(token);
      await loadPortal();
      setNotice(`${response.published_count} ${lang === "es" ? "clientes publicados" : "clients published"}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not publish clients");
    } finally {
      setSaving(false);
    }
  };

  const filteredConversations = conversations.filter((conversation) => {
    const needle = conversationQuery.toLowerCase().trim();
    if (!needle) return true;
    return [conversation.client_slug, conversation.session_id, conversation.last_message].some((value) => value?.toLowerCase().includes(needle));
  });

  const activity30d = summary?.activity_30d || [];
  const hasActivity30d = activity30d.some((item) => item.messages > 0 || item.tokens > 0);
  const maxDailyMessages = Math.max(...activity30d.map((item) => item.messages), 1);
  const displayClient = actingUser?.client_slug || selectedSlug || t.global;

  if (!token || !user) return <Navigate to={`/${lang}/login`} replace />;

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-[#050711] text-white" : "bg-[#f6f7f4] text-slate-950 portal-light"}`}>
      <PortalLoading show={loading || saving || conversationLoading} />
      <div className={`fixed inset-0 -z-10 ${theme === "dark" ? "bg-[radial-gradient(circle_at_20%_0%,rgba(0,204,153,0.18),transparent_28%),radial-gradient(circle_at_85%_12%,rgba(200,162,77,0.13),transparent_22%),linear-gradient(180deg,#050711_0%,#090d17_100%)]" : "bg-[radial-gradient(circle_at_15%_5%,rgba(0,204,153,0.16),transparent_26%),radial-gradient(circle_at_85%_8%,rgba(200,162,77,0.16),transparent_22%),linear-gradient(180deg,#f7f8f4_0%,#eef3ef_100%)]"}`} />
      <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
        <aside className="border-r border-white/10 bg-black/20 px-4 py-5 backdrop-blur-xl">
          <div className="mb-8 flex items-center gap-3 px-2">
            <img src="/favicon.png" alt="Piroxeno" className="h-11 w-11 object-contain" />
            <div>
              <p className="text-lg font-semibold tracking-tight">{t.app}</p>
              <p className="text-xs text-slate-500">{isAdmin ? t.roleAdmin : t.roleUser}</p>
            </div>
          </div>

          <nav className="space-y-1">
            {navItems.filter(([, , , visible]) => visible).map(([key, Icon, label]) => (
              <button key={key} onClick={() => setSection(key)} className={`flex w-full items-center gap-3 px-3 py-3 text-left text-sm font-semibold transition ${section === key ? "bg-[var(--color-primary)] text-slate-950" : "text-slate-400 hover:bg-white/[0.06] hover:text-white"}`}>
                <Icon className="h-4 w-4" /> {label}
              </button>
            ))}
          </nav>

          <div className="mt-8 border border-white/10 bg-white/[0.035] p-3 text-xs text-slate-500">
            <p className="font-semibold text-slate-300">{user.email}</p>
            <p className="mt-1">{user.client_slug || t.global}</p>
          </div>
        </aside>

        <main className="px-5 py-5 lg:px-8">
          <header className="mb-6 flex flex-col justify-between gap-4 border-b border-white/10 pb-5 xl:flex-row xl:items-center">
            <div>
              <div className={`mb-3 flex w-fit items-center gap-2 text-sm font-extrabold uppercase tracking-[0.18em] ${theme === "dark" ? "text-emerald-200" : "text-emerald-700"}`}>
                <Sparkles className="h-4 w-4" /> {t.portalFor} {displayClient}
              </div>
              <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{navItems.find(([key]) => key === section)?.[2]}</h1>
              <p className="mt-2 text-slate-400">{t.subtitle}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button onClick={handleLogout} className="inline-flex items-center gap-2 border border-white/10 px-3 py-2 text-xs text-slate-500 hover:text-white"><LogOut className="h-3.5 w-3.5" /> {t.logout}</button>
            </div>
          </header>

          {error && <div className="mb-4 border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</div>}
          {notice && <div className="mb-4 border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">{notice}</div>}
          {impersonatedUser && <div className={`mb-4 flex flex-wrap items-center justify-between gap-3 border px-4 py-3 text-sm font-semibold shadow-lg ${theme === "dark" ? "border-amber-300/30 bg-amber-300/10 text-amber-100 shadow-black/20" : "border-amber-500/35 bg-amber-100 text-amber-950 shadow-amber-900/10"}`}><span>{t.impersonating}: {impersonatedUser.email}</span><button onClick={stopImpersonation} className={`border px-3 py-2 text-xs font-bold ${theme === "dark" ? "border-amber-200/30 hover:bg-amber-200/10" : "border-amber-600/30 hover:bg-amber-200"}`}>{t.stopImpersonating}</button></div>}

          {(section === "overview" || section === "conversations") && (
            <div className="mb-5 grid gap-3 md:grid-cols-[1fr_160px_160px_auto] xl:grid-cols-[280px_180px_180px_auto]">
              <Select value={selectedSlug} onChange={(e) => setSelectedSlug(e.target.value)} disabled={actingUser?.role !== "admin"}>
                {actingUser?.role === "admin" && <option value="">{t.allClients}</option>}
                {clients.map((client) => <option key={client.client_slug} value={client.client_slug}>{client.client_slug}</option>)}
              </Select>
              <TextInput type="date" value={dateStart} onChange={(e) => setDateStart(e.target.value)} aria-label={t.start} />
              <TextInput type="date" value={dateEnd} onChange={(e) => setDateEnd(e.target.value)} aria-label={t.end} />
              <button onClick={() => { setDateStart(""); setDateEnd(""); }} className="flex h-11 w-11 items-center justify-center border border-white/10 text-slate-400 hover:border-white/25 hover:text-white" aria-label="Reset" title="Reset"><RefreshCw className="h-3.5 w-3.5" /></button>
            </div>
          )}

          {section === "overview" && (
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
                <StatCard icon={MessageSquareText} label={t.conversationsKpi} value={formatNumber(summary?.conversation_count)} hint={t.metricHints.conversations} />
                <StatCard icon={Activity} label={t.messages} value={formatNumber(summary?.message_count)} hint={t.metricHints.messages} />
                <StatCard icon={Sparkles} label={t.assistant} value={formatNumber(summary?.assistant_messages)} hint={t.metricHints.assistant} />
                <StatCard icon={Users} label={t.userMessages} value={formatNumber(summary?.user_messages)} hint={t.metricHints.user} />
                <StatCard icon={DatabaseZap} label={t.tokens} value={formatNumber(summary?.total_tokens)} hint={t.metricHints.tokens} />
                <StatCard icon={Gauge} label={t.latency} value={`${formatNumber(summary?.avg_latency_ms)} ms`} hint={t.metricHints.latency} />
              </div>

              <section className="border border-white/10 bg-white/[0.035] p-5">
                <h2 className="mb-5 flex items-center gap-2 text-lg font-semibold"><Activity className="h-5 w-5 text-[var(--color-primary)]" /> {t.activity30d}</h2>
                {hasActivity30d ? <div>
                  <div className="flex h-56 items-end gap-1 border-b border-white/10 pb-2">
                    {activity30d.map((day) => (
                      <div key={day.date} className="group relative flex min-w-0 flex-1 items-end">
                        <div
                          className="w-full bg-[var(--color-primary)]/80 transition hover:bg-[var(--color-primary)]"
                          style={{ height: `${Math.max(day.messages ? 10 : 2, (day.messages / maxDailyMessages) * 100)}%` }}
                        />
                        <div className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 hidden w-40 -translate-x-1/2 border border-white/10 bg-slate-950 p-2 text-center text-xs text-slate-200 shadow-xl group-hover:block">
                          <p className="font-semibold">{new Date(day.date).toLocaleDateString()}</p>
                          <p>{formatNumber(day.messages)} mensajes</p>
                          <p>{formatNumber(day.tokens)} tokens</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 flex justify-between text-[11px] text-slate-500">
                    <span>{activity30d[0] ? new Date(activity30d[0].date).toLocaleDateString() : ""}</span>
                    <span>{activity30d[activity30d.length - 1] ? new Date(activity30d[activity30d.length - 1].date).toLocaleDateString() : ""}</span>
                  </div>
                </div> : <div className="flex h-56 items-center justify-center border border-dashed border-white/10 text-sm text-slate-500">{loading ? "" : t.noData}</div>}
              </section>

              <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
                <section className="border border-white/10 bg-white/[0.035] p-5">
                  <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold"><LayoutDashboard className="h-5 w-5 text-[var(--color-primary)]" /> {t.overview}</h2>
                  <div className="space-y-3">
                    {(summary?.by_client || []).slice(0, 8).map((item) => {
                      const max = Math.max(...(summary?.by_client || [{ messages: 1 }]).map((row) => row.messages), 1);
                      return (
                        <div key={item.client_slug}>
                          <div className="mb-1 flex justify-between text-sm"><span>{item.client_slug}</span><span className="text-slate-500">{formatNumber(item.messages)} msg · {formatNumber(item.tokens)} tok</span></div>
                          <div className="h-2 bg-white/10"><div className="h-2 bg-[var(--color-primary)]" style={{ width: `${Math.max(4, (item.messages / max) * 100)}%` }} /></div>
                        </div>
                      );
                    })}
                    {!summary?.by_client?.length && <p className="text-sm text-slate-500">{loading ? "" : t.noData}</p>}
                  </div>
                </section>
                <section className="border border-white/10 bg-white/[0.035] p-5">
                  <h2 className="mb-4 text-lg font-semibold">KPIs</h2>
                  <div className="grid gap-3 text-sm text-slate-300">
                    <div className="flex justify-between border-b border-white/10 pb-2"><span>Tokens / conversación</span><span>{summary?.conversation_count ? formatNumber(Math.round(summary.total_tokens / summary.conversation_count)) : 0}</span></div>
                    <div className="flex justify-between"><span>Mensajes / conversación</span><span>{summary?.conversation_count ? (summary.message_count / summary.conversation_count).toFixed(1) : 0}</span></div>
                  </div>
                </section>
              </div>
            </div>
          )}

          {section === "conversations" && (
            <div className="grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
              <section className="border border-white/10 bg-white/[0.035]">
                <div className="flex items-center gap-2 border-b border-white/10 p-4">
                  <Search className="h-4 w-4 text-slate-500" />
                  <input value={conversationQuery} onChange={(e) => setConversationQuery(e.target.value)} placeholder={t.search} className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-600" />
                </div>
                <div className="max-h-[640px] divide-y divide-white/10 overflow-auto">
                  {filteredConversations.map((conversation) => (
                    <button key={conversation.id} onClick={() => void loadConversationMessages(conversation.id)} className={`w-full p-4 text-left hover:bg-white/[0.045] ${selectedConversationId === conversation.id ? "bg-white/[0.07]" : ""}`}>
                      <div className="flex items-center justify-between gap-3"><span className="font-semibold">{conversation.client_slug}</span><span className="text-xs text-slate-500">{formatDate(conversation.last_message_at || conversation.updated_at)}</span></div>
                      <p className="mt-2 line-clamp-2 text-sm text-slate-400">{conversation.last_message || conversation.session_id}</p>
                      <p className="mt-2 text-xs text-slate-600">{formatNumber(conversation.message_count)} mensajes · {formatNumber(conversation.total_tokens)} tokens</p>
                    </button>
                  ))}
                </div>
              </section>
              <section className="border border-white/10 bg-white/[0.035] p-5">
                <h2 className="mb-4 text-lg font-semibold">{selectedConversationId ? t.openedConversation : t.noConversation}</h2>
                <div className="max-h-[640px] space-y-3 overflow-auto">
                  {messages.map((message) => (
                    <div key={message.id} className={`border p-4 ${message.role === "assistant" ? "border-[var(--color-primary)]/20 bg-[var(--color-primary)]/8" : "border-white/10 bg-slate-950"}`}>
                      <div className="mb-2 flex justify-between gap-3 text-xs uppercase tracking-[0.14em] text-slate-500"><span>{message.role}</span><span>{formatDate(message.created_at)}</span></div>
                      <p className="whitespace-pre-wrap text-sm leading-6 text-slate-200">{message.content}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {section === "clients" && isAdmin && (
            <div className="grid gap-5 xl:grid-cols-[320px_1fr]">
              <aside className="border border-white/10 bg-white/[0.035]">
                <div className="border-b border-white/10 px-4 py-3 text-sm font-semibold text-slate-300">{t.clients}</div>
                {clients.map((client) => (
                  <button key={client.client_slug} onClick={() => { setSelectedSlug(client.client_slug); void loadClientDetail(client.client_slug); }} className={`w-full px-4 py-4 text-left transition ${selectedSlug === client.client_slug ? "bg-white/[0.08]" : "hover:bg-white/[0.045]"}`}>
                    <div className="flex justify-between gap-3"><span className="font-semibold">{client.client_slug}</span><span className={client.enabled ? "text-xs text-emerald-300" : "text-xs text-red-300"}>{client.enabled ? t.active : t.disabled}</span></div>
                    <p className="mt-2 text-xs text-slate-500">{client.allowed_origins.length} domains · {client.source}</p>
                  </button>
                ))}
              </aside>
              <section className="border border-white/10 bg-white/[0.035] p-5">
                {detail ? <div className="space-y-6">
                  <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center"><div><h2 className="text-2xl font-semibold">{detail.client_slug}</h2><p className="mt-1 text-sm text-slate-500">Config</p></div></div>
                  <div className="grid gap-6 lg:grid-cols-2">
                    <label className="text-sm font-semibold text-slate-300">{t.domains}<textarea value={originsDraft} onChange={(e) => setOriginsDraft(e.target.value)} rows={8} className="mt-2 w-full border border-white/10 bg-slate-950 p-4 font-mono text-sm text-white outline-none focus:border-[var(--color-primary)]" /></label>
                    <div className="space-y-4"><label className="flex items-center gap-3 border border-white/10 bg-slate-950 p-4 text-sm"><input type="checkbox" checked={enabledDraft} onChange={(e) => setEnabledDraft(e.target.checked)} /> {t.active}</label><label className="block text-sm font-semibold text-slate-300">{t.rateLimit}<TextInput type="number" min={1} value={rateLimitDraft} onChange={(e) => setRateLimitDraft(Number(e.target.value))} className="mt-2 w-full" /></label><button onClick={saveConfig} disabled={saving} className="inline-flex items-center gap-2 bg-[var(--color-primary)] px-5 py-3 font-semibold text-slate-950 disabled:opacity-60">{saving && <Loader2 className="h-4 w-4 animate-spin" />}{t.save}</button></div>
                  </div>
                  <div><div className="mb-2 flex items-center justify-between"><label className="text-sm font-semibold text-slate-300">{t.snippet}</label><button onClick={() => copyEmbed(detail.embed)} className="inline-flex items-center gap-2 bg-white px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-100">{copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}{copied ? t.copied : t.copySnippet}</button></div><textarea readOnly value={detail.embed} rows={8} className="w-full border border-white/10 bg-slate-950 p-4 font-mono text-xs text-slate-300" /></div>
                </div> : <div className="p-10 text-center text-slate-500">{t.selectClient}</div>}
              </section>
            </div>
          )}

          {section === "users" && isAdmin && (
            <div className="grid gap-5 xl:grid-cols-[0.75fr_1.25fr]">
              <section className="border border-white/10 bg-white/[0.035] p-5">
                <h2 className="mb-5 text-xl font-semibold">{t.createUser}</h2>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 border border-white/10 bg-slate-950 p-1 text-sm">
                    {(["existing", "new", "global"] as const).map((mode) => <button key={mode} type="button" onClick={() => { setUserClientMode(mode); if (mode !== "global") setUserForm({ ...userForm, role: "user" }); }} className={`px-3 py-2 font-semibold ${userClientMode === mode ? "bg-[var(--color-primary)] text-slate-950" : "text-slate-400 hover:text-white"}`}>{mode === "existing" ? t.existingClient : mode === "new" ? t.newClient : t.global}</button>)}
                  </div>
                  {userClientMode === "existing" && <Select className="w-full" value={userForm.client_slug || ""} onChange={(e) => setUserForm({ ...userForm, client_slug: e.target.value })}><option value="">{t.selectClient}</option>{clients.map((client) => <option key={client.client_slug} value={client.client_slug}>{client.client_slug}</option>)}</Select>}
                  {userClientMode === "new" && <div className="space-y-3 border border-white/10 bg-slate-950 p-3">
                    <TextInput className="w-full" placeholder={t.accountName} value={newUserClientForm.account_name} onChange={(e) => setNewUserClientForm({ ...newUserClientForm, account_name: e.target.value })} />
                    <textarea className="w-full border border-white/10 bg-[#050711] p-4 font-mono text-sm text-white" rows={4} placeholder="https://cliente.com" value={newUserClientForm.allowed_origins} onChange={(e) => setNewUserClientForm({ ...newUserClientForm, allowed_origins: e.target.value })} />
                  </div>}
                  {userClientMode === "global" && <Select className="w-full" value={userForm.role} onChange={(e) => setUserForm({ ...userForm, role: e.target.value as "admin" | "user" })}><option value="user">user</option><option value="admin">admin</option></Select>}
                  <TextInput className="w-full" placeholder="email@cliente.com" value={userForm.email} onChange={(e) => setUserForm({ ...userForm, email: e.target.value })} />
                  <TextInput type="password" className="w-full" placeholder={t.tempPassword} value={userForm.password || ""} onChange={(e) => setUserForm({ ...userForm, password: e.target.value })} />
                  <label className="flex items-center gap-3 text-sm text-slate-300"><input type="checkbox" checked={userForm.is_active} onChange={(e) => setUserForm({ ...userForm, is_active: e.target.checked })} /> {t.active}</label>
                  <button onClick={saveUser} disabled={saving} className="inline-flex items-center gap-2 bg-[var(--color-primary)] px-5 py-3 font-semibold text-slate-950 disabled:opacity-60"><Users className="h-4 w-4" />{t.saveUser}</button>
                </div>
              </section>
              <section className="overflow-hidden border border-white/10 bg-white/[0.035]"><div className="border-b border-white/10 px-4 py-3 text-sm font-semibold text-slate-300">{t.users}</div><div className="divide-y divide-white/10">{users.map((item) => <div key={item.email} className="grid gap-2 px-4 py-4 text-sm md:grid-cols-[1.2fr_0.5fr_0.7fr_0.4fr_0.5fr]"><span className="font-medium text-white">{item.email}</span><span className="text-slate-300">{item.role}</span><span className="text-slate-400">{item.client_slug || t.global}</span><span className={item.is_active ? "text-emerald-300" : "text-red-300"}>{item.is_active ? t.active : t.disabled}</span><button onClick={() => startImpersonation(item)} className="border border-white/10 px-3 py-2 text-xs font-semibold text-slate-300 hover:border-[var(--color-primary)]/60">{t.viewAs}</button></div>)}</div></section>
            </div>
          )}

          {section === "docs" && <section className="grid gap-4 lg:grid-cols-2">{docs.map((doc) => <article key={doc.title} className="border border-white/10 bg-white/[0.035] p-5"><div className="mb-4 flex h-10 w-10 items-center justify-center bg-[var(--color-primary)]/15 text-[var(--color-primary)]"><BookOpen className="h-5 w-5" /></div><h2 className="text-xl font-semibold">{doc.title}</h2><p className="mt-3 leading-7 text-slate-400">{doc.body}</p></article>)}</section>}

          {section === "demo" && isAdmin && <section className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
            <div className="border border-white/10 bg-white/[0.035] p-5">
              <h2 className="mb-4 text-xl font-semibold">{t.demoPrompt}</h2>
              <textarea value={demoPrompt} onChange={(e) => setDemoPrompt(e.target.value)} rows={12} className="w-full border border-white/10 bg-slate-950 p-4 text-sm leading-6 text-white outline-none focus:border-[var(--color-primary)]" />
              <button type="button" onClick={resetDemoConversation} disabled={saving} className="mt-4 inline-flex items-center gap-2 border border-white/10 px-4 py-3 text-sm font-semibold text-slate-300 hover:border-[var(--color-primary)]/60"><RefreshCw className="h-4 w-4" /> {t.resetDemo}</button>
            </div>
            <div className="mx-auto w-full max-w-[430px] rounded-[58px] border-[3px] border-black bg-zinc-950 p-1.5 shadow-2xl shadow-black/40 ring-1 ring-white/15">
              <div className={`rounded-[52px] p-4 ${theme === "dark" ? "bg-[#0b141a]" : "bg-[#f7f2ea]"}`}>
                <div className="mx-auto mb-4 h-[37px] w-[126px] rounded-full bg-black shadow-inner shadow-zinc-800/70" />
                <div className={`flex items-center gap-3 border-b pb-3 ${theme === "dark" ? "border-white/10" : "border-slate-900/10"}`}><img src="/favicon.png" className="h-9 w-9" /><div><p className={`text-sm font-semibold ${theme === "dark" ? "text-white" : "text-slate-950"}`}>Piroxeno Demo</p><p className="text-xs text-emerald-500">online</p></div></div>
                <div className="h-[620px] space-y-3 overflow-auto px-1 py-4">
                  {demoMessages.map((message, index) => <div key={index} className={`max-w-[82%] rounded-2xl px-3 py-2 text-sm leading-5 ${message.role === "user" ? "ml-auto bg-[#005c4b] text-white" : theme === "dark" ? "bg-[#202c33] text-slate-100" : "bg-white text-slate-900 shadow-sm"}`}>{message.content}</div>)}
                  {!demoMessages.length && <div className="mt-20 text-center text-sm text-slate-500">WhatsApp demo</div>}
                </div>
                <form onSubmit={(e) => { e.preventDefault(); void sendDemoMessage(); }} className="flex gap-2">
                  <input value={demoInput} onChange={(e) => setDemoInput(e.target.value)} placeholder={t.typeMessage} className={`min-w-0 flex-1 rounded-full px-4 py-3 text-sm outline-none ${theme === "dark" ? "bg-[#202c33] text-white" : "bg-white text-slate-950 placeholder:text-slate-400"}`} />
                  <button className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-primary)] text-slate-950"><Send className="h-5 w-5" /></button>
                </form>
              </div>
            </div>
          </section>}

          {section === "admin" && isAdmin && <section className="grid gap-5 xl:grid-cols-3"><button onClick={switchLang} className="border border-white/10 bg-white/[0.035] p-5 text-left hover:border-[var(--color-primary)]/50"><Languages className="mb-4 h-6 w-6 text-[var(--color-primary)]" /><h2 className="font-semibold">{t.settings}</h2><p className="mt-2 text-sm text-slate-500">{lang === "es" ? "EN" : "ES"}</p></button><button onClick={toggleTheme} className="border border-white/10 bg-white/[0.035] p-5 text-left hover:border-[var(--color-primary)]/50">{theme === "dark" ? <Sun className="mb-4 h-6 w-6 text-[var(--color-primary)]" /> : <Moon className="mb-4 h-6 w-6 text-[var(--color-primary)]" />}<h2 className="font-semibold">{theme === "dark" ? t.light : t.dark}</h2><p className="mt-2 text-sm text-slate-500">{theme === "dark" ? t.dark : t.light}</p></button><button onClick={() => void syncRegistry("current")} disabled={saving} className="border border-white/10 bg-white/[0.035] p-5 text-left hover:border-[var(--color-primary)]/50"><RefreshCw className="mb-4 h-6 w-6 text-[var(--color-primary)]" /><h2 className="font-semibold">{t.syncRegistry}</h2><p className="mt-2 text-sm text-slate-500">Supabase → backend actual</p></button><button onClick={publishLocalClients} disabled={saving} className="border border-white/10 bg-white/[0.035] p-5 text-left hover:border-[var(--color-primary)]/50"><DatabaseZap className="mb-4 h-6 w-6 text-[var(--color-primary)]" /><h2 className="font-semibold">{t.publishLocal}</h2><p className="mt-2 text-sm text-slate-500">Backend actual → Supabase</p></button><button onClick={() => void syncRegistry("dev")} disabled={saving} className="border border-white/10 bg-white/[0.035] p-5 text-left hover:border-[var(--color-primary)]/50"><ShieldCheck className="mb-4 h-6 w-6 text-[var(--color-primary)]" /><h2 className="font-semibold">{t.replicateDev}</h2><p className="mt-2 text-sm text-slate-500">Supabase → http://127.0.0.1:8000</p></button></section>}

          {section === "clients" && !isAdmin && <Navigate to={`/${lang}/admin`} replace />}
          {section === "users" && !isAdmin && <Navigate to={`/${lang}/admin`} replace />}
          {section === "admin" && !isAdmin && <Navigate to={`/${lang}/admin`} replace />}
          {section === "demo" && !isAdmin && <Navigate to={`/${lang}/admin`} replace />}

        </main>
      </div>
    </div>
  );
}
