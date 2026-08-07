import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  BarChart3,
  BookOpen,
  Check,
  Copy,
  DatabaseZap,
  Gauge,
  Globe2,
  Languages,
  LayoutDashboard,
  Loader2,
  LogOut,
  MessageSquareText,
  RefreshCw,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";
import logoMark from "../assets/logo-8.png";
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

type Section = "overview" | "metrics" | "conversations" | "clients" | "users" | "docs" | "admin";
type UserClientMode = "global" | "existing" | "new";


function linesToArray(value: string) {
  return value.split("\n").map((item) => item.trim()).filter(Boolean);
}

function arrayToLines(value?: string[]) {
  return (value || []).join("\n");
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
    metrics: es ? "Métricas" : "Metrics",
    conversations: es ? "Conversaciones" : "Conversations",
    clients: es ? "Clientes" : "Clients",
    users: es ? "Usuarios" : "Users",
    docs: es ? "Documentación" : "Documentation",
    admin: es ? "Administración" : "Administration",
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
    backend: es ? "Backend" : "Backend",
    roleAdmin: es ? "Admin" : "Admin",
    roleUser: es ? "Usuario" : "User",
    search: es ? "Buscar" : "Search",
  };
}

function StatCard({ icon: Icon, label, value, detail }: { icon: typeof Activity; label: string; value: string | number; detail?: string }) {
  return (
    <div className="border border-white/10 bg-white/[0.045] p-5 shadow-[0_20px_80px_rgba(0,0,0,0.18)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{label}</p>
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
  const [docs, setDocs] = useState<PortalDoc[]>([]);
  const [detail, setDetail] = useState<ClientDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [copied, setCopied] = useState(false);

  const [originsDraft, setOriginsDraft] = useState("");
  const [enabledDraft, setEnabledDraft] = useState(true);
  const [rateLimitDraft, setRateLimitDraft] = useState(30);

  const [userClientMode, setUserClientMode] = useState<UserClientMode>("existing");
  const [newUserClientForm, setNewUserClientForm] = useState({ client_slug: "", name: "", title: "", allowed_origins: "", primary_color: "#00cc99", rate_limit_per_minute: 30 });
  const [userForm, setUserForm] = useState<UpsertAppUser>({ email: "", role: "user", client_slug: "", is_active: true, password: "" });

  const navItems = [
    ["overview", LayoutDashboard, t.overview, true],
    ["metrics", BarChart3, t.metrics, true],
    ["conversations", MessageSquareText, t.conversations, true],
    ["clients", Globe2, t.clients, isAdmin],
    ["users", Users, t.users, isAdmin],
    ["docs", BookOpen, t.docs, true],
    ["admin", Settings2, t.admin, isAdmin],
  ] as const;

  const metricParams = { client_slug: selectedSlug || undefined, start_date: dateStart || undefined, end_date: dateEnd || undefined };

  const loadPortal = async () => {
    if (!token) return;
    setLoading(true);
    setError("");
    try {
      const clientResponse = await chatbotAdminApi.portalClients(token);
      const nextClients = clientResponse.clients;
      setClients(nextClients);
      const nextSlug = isAdmin ? selectedSlug : nextClients[0]?.client_slug || "";
      if (!isAdmin && nextSlug) setSelectedSlug(nextSlug);
      const [summaryResponse, conversationResponse, docsResponse] = await Promise.all([
        chatbotAdminApi.portalSummary(token, { ...metricParams, client_slug: isAdmin ? metricParams.client_slug : nextSlug || undefined }),
        chatbotAdminApi.portalConversations(token, { ...metricParams, client_slug: isAdmin ? metricParams.client_slug : nextSlug || undefined, limit: 80 }),
        chatbotAdminApi.portalDocs(token, lang),
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
    });
    setOriginsDraft(arrayToLines(clientDetail.config.allowed_origins));
    setEnabledDraft(Boolean(clientDetail.config.enabled));
    setRateLimitDraft(clientDetail.config.rate_limit_per_minute || 30);
  };

  useEffect(() => {
    if (token) void loadPortal();
  }, [token, lang, selectedSlug, dateStart, dateEnd]);

  const handleLogout = () => {
    clearAdminToken();
    setToken("");
    setUser(null);
  };

  const switchLang = () => {
    const nextLang = lang === "es" ? "en" : "es";
    navigate(`/${nextLang}/admin`);
  };

  const loadConversationMessages = async (conversationId: string) => {
    if (!token) return;
    setSelectedConversationId(conversationId);
    const response = await chatbotAdminApi.portalConversationMessages(token, conversationId);
    setMessages(response.messages);
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
    return chatbotAdminApi.createClient(token, {
      client_slug: form.client_slug.trim(),
      name: form.name.trim(),
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
      await chatbotAdminApi.upsertUser(token, { ...userForm, email: userForm.email.trim().toLowerCase(), client_slug: assignedClientSlug, password: userForm.password?.trim() || undefined });
      setUserForm({ email: "", role: "user", client_slug: "", is_active: true, password: "" });
      setNewUserClientForm({ client_slug: "", name: "", title: "", allowed_origins: "", primary_color: "#00cc99", rate_limit_per_minute: 30 });
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

  if (!token || !user) return <Navigate to={`/${lang}/login`} replace />;

  return (
    <div className="min-h-screen bg-[#050711] text-white">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_20%_0%,rgba(0,204,153,0.18),transparent_28%),radial-gradient(circle_at_85%_12%,rgba(200,162,77,0.13),transparent_22%),linear-gradient(180deg,#050711_0%,#090d17_100%)]" />
      <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
        <aside className="border-r border-white/10 bg-black/20 px-4 py-5 backdrop-blur-xl">
          <div className="mb-8 flex items-center gap-3 px-2">
            <img src={logoMark} alt="Piroxeno" className="h-11 w-11 object-contain" />
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
              <div className="mb-3 flex w-fit items-center gap-2 border border-white/10 bg-white/[0.045] px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200">
                <Sparkles className="h-4 w-4" /> {t.app}
              </div>
              <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{navItems.find(([key]) => key === section)?.[2]}</h1>
              <p className="mt-2 text-slate-400">{t.subtitle}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => void loadPortal()} className="inline-flex items-center gap-2 border border-white/10 px-4 py-3 text-sm font-semibold text-slate-200 hover:border-[var(--color-primary)]/60"><RefreshCw className="h-4 w-4" /> {t.refresh}</button>
              <button onClick={switchLang} className="inline-flex items-center gap-2 border border-white/10 px-4 py-3 text-sm font-semibold text-slate-200 hover:border-[var(--color-primary)]/60"><Languages className="h-4 w-4" /> {lang === "es" ? "EN" : "ES"}</button>
              <button onClick={handleLogout} className="inline-flex items-center gap-2 border border-white/10 px-4 py-3 text-sm text-slate-400 hover:text-white"><LogOut className="h-4 w-4" /> {t.logout}</button>
            </div>
          </header>

          {error && <div className="mb-4 border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</div>}
          {notice && <div className="mb-4 border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">{notice}</div>}

          {(section === "overview" || section === "metrics" || section === "conversations") && (
            <div className="mb-5 grid gap-3 md:grid-cols-[1fr_160px_160px] xl:grid-cols-[280px_180px_180px_auto]">
              <Select value={selectedSlug} onChange={(e) => setSelectedSlug(e.target.value)} disabled={!isAdmin}>
                {isAdmin && <option value="">{t.allClients}</option>}
                {clients.map((client) => <option key={client.client_slug} value={client.client_slug}>{client.client_slug}</option>)}
              </Select>
              <TextInput type="date" value={dateStart} onChange={(e) => setDateStart(e.target.value)} aria-label={t.start} />
              <TextInput type="date" value={dateEnd} onChange={(e) => setDateEnd(e.target.value)} aria-label={t.end} />
              <button onClick={() => { setDateStart(""); setDateEnd(""); }} className="border border-white/10 px-4 py-3 text-sm font-semibold text-slate-300 hover:border-white/25">Reset</button>
            </div>
          )}

          {(section === "overview" || section === "metrics") && (
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
                <StatCard icon={MessageSquareText} label={t.conversationsKpi} value={formatNumber(summary?.conversation_count)} />
                <StatCard icon={Activity} label={t.messages} value={formatNumber(summary?.message_count)} />
                <StatCard icon={Sparkles} label={t.assistant} value={formatNumber(summary?.assistant_messages)} />
                <StatCard icon={Users} label={t.userMessages} value={formatNumber(summary?.user_messages)} />
                <StatCard icon={DatabaseZap} label={t.tokens} value={formatNumber(summary?.total_tokens)} />
                <StatCard icon={Gauge} label={t.latency} value={`${formatNumber(summary?.avg_latency_ms)} ms`} />
              </div>

              <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
                <section className="border border-white/10 bg-white/[0.035] p-5">
                  <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold"><BarChart3 className="h-5 w-5 text-[var(--color-primary)]" /> {t.metrics}</h2>
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
                    {!summary?.by_client?.length && <p className="text-sm text-slate-500">{loading ? "Loading..." : "Sin datos todavía"}</p>}
                  </div>
                </section>
                <section className="border border-white/10 bg-white/[0.035] p-5">
                  <h2 className="mb-4 text-lg font-semibold">KPIs</h2>
                  <div className="grid gap-3 text-sm text-slate-300">
                    <div className="flex justify-between border-b border-white/10 pb-2"><span>Tokens / conversación</span><span>{summary?.conversation_count ? formatNumber(Math.round(summary.total_tokens / summary.conversation_count)) : 0}</span></div>
                    <div className="flex justify-between border-b border-white/10 pb-2"><span>Mensajes / conversación</span><span>{summary?.conversation_count ? (summary.message_count / summary.conversation_count).toFixed(1) : 0}</span></div>
                    <div className="flex justify-between"><span>Scope</span><span>{summary?.scope || "-"}</span></div>
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
              <section className="border border-white/10 bg-white/[0.035] p-5"><h2 className="mb-5 text-xl font-semibold">{t.createUser}</h2><div className="space-y-3"><TextInput className="w-full" placeholder="email@cliente.com" value={userForm.email} onChange={(e) => setUserForm({ ...userForm, email: e.target.value })} /><Select className="w-full" value={userForm.role} onChange={(e) => setUserForm({ ...userForm, role: e.target.value as "admin" | "user" })}><option value="user">user</option><option value="admin">admin</option></Select><div className="grid grid-cols-3 border border-white/10 bg-slate-950 p-1 text-sm">{(["existing", "new", "global"] as const).map((mode) => <button key={mode} type="button" onClick={() => setUserClientMode(mode)} className={`px-3 py-2 font-semibold ${userClientMode === mode ? "bg-[var(--color-primary)] text-slate-950" : "text-slate-400 hover:text-white"}`}>{mode === "existing" ? t.existingClient : mode === "new" ? t.newClient : t.global}</button>)}</div>{userClientMode === "existing" && <Select className="w-full" value={userForm.client_slug || ""} onChange={(e) => setUserForm({ ...userForm, client_slug: e.target.value })}><option value="">{t.selectClient}</option>{clients.map((client) => <option key={client.client_slug} value={client.client_slug}>{client.client_slug}</option>)}</Select>}{userClientMode === "new" && <div className="space-y-3 border border-white/10 bg-slate-950 p-3"><TextInput className="w-full" placeholder="client_slug" value={newUserClientForm.client_slug} onChange={(e) => setNewUserClientForm({ ...newUserClientForm, client_slug: e.target.value })} /><TextInput className="w-full" placeholder={lang === "es" ? "Nombre" : "Name"} value={newUserClientForm.name} onChange={(e) => setNewUserClientForm({ ...newUserClientForm, name: e.target.value })} /><textarea className="w-full border border-white/10 bg-[#050711] p-4 font-mono text-sm text-white" rows={4} placeholder="https://cliente.com" value={newUserClientForm.allowed_origins} onChange={(e) => setNewUserClientForm({ ...newUserClientForm, allowed_origins: e.target.value })} /></div>}<TextInput type="password" className="w-full" placeholder={t.tempPassword} value={userForm.password || ""} onChange={(e) => setUserForm({ ...userForm, password: e.target.value })} /><label className="flex items-center gap-3 text-sm text-slate-300"><input type="checkbox" checked={userForm.is_active} onChange={(e) => setUserForm({ ...userForm, is_active: e.target.checked })} /> {t.active}</label><button onClick={saveUser} disabled={saving} className="inline-flex items-center gap-2 bg-[var(--color-primary)] px-5 py-3 font-semibold text-slate-950 disabled:opacity-60"><Users className="h-4 w-4" />{t.saveUser}</button></div></section>
              <section className="overflow-hidden border border-white/10 bg-white/[0.035]"><div className="border-b border-white/10 px-4 py-3 text-sm font-semibold text-slate-300">{t.users}</div><div className="divide-y divide-white/10">{users.map((item) => <div key={item.email} className="grid gap-2 px-4 py-4 text-sm md:grid-cols-[1.2fr_0.5fr_0.7fr_0.4fr]"><span className="font-medium text-white">{item.email}</span><span className="text-slate-300">{item.role}</span><span className="text-slate-400">{item.client_slug || t.global}</span><span className={item.is_active ? "text-emerald-300" : "text-red-300"}>{item.is_active ? t.active : t.disabled}</span></div>)}</div></section>
            </div>
          )}

          {section === "docs" && <section className="grid gap-4 lg:grid-cols-2">{docs.map((doc) => <article key={doc.title} className="border border-white/10 bg-white/[0.035] p-5"><div className="mb-4 flex h-10 w-10 items-center justify-center bg-[var(--color-primary)]/15 text-[var(--color-primary)]"><BookOpen className="h-5 w-5" /></div><h2 className="text-xl font-semibold">{doc.title}</h2><p className="mt-3 leading-7 text-slate-400">{doc.body}</p></article>)}</section>}

          {section === "admin" && isAdmin && <section className="grid gap-5 xl:grid-cols-3"><button onClick={() => void syncRegistry("current")} disabled={saving} className="border border-white/10 bg-white/[0.035] p-5 text-left hover:border-[var(--color-primary)]/50"><RefreshCw className="mb-4 h-6 w-6 text-[var(--color-primary)]" /><h2 className="font-semibold">{t.syncRegistry}</h2><p className="mt-2 text-sm text-slate-500">Supabase → backend actual</p></button><button onClick={publishLocalClients} disabled={saving} className="border border-white/10 bg-white/[0.035] p-5 text-left hover:border-[var(--color-primary)]/50"><DatabaseZap className="mb-4 h-6 w-6 text-[var(--color-primary)]" /><h2 className="font-semibold">{t.publishLocal}</h2><p className="mt-2 text-sm text-slate-500">Backend actual → Supabase</p></button><button onClick={() => void syncRegistry("dev")} disabled={saving} className="border border-white/10 bg-white/[0.035] p-5 text-left hover:border-[var(--color-primary)]/50"><ShieldCheck className="mb-4 h-6 w-6 text-[var(--color-primary)]" /><h2 className="font-semibold">{t.replicateDev}</h2><p className="mt-2 text-sm text-slate-500">Supabase → http://127.0.0.1:8000</p></button></section>}

          {section === "clients" && !isAdmin && <Navigate to={`/${lang}/admin`} replace />}
          {section === "users" && !isAdmin && <Navigate to={`/${lang}/admin`} replace />}
          {section === "admin" && !isAdmin && <Navigate to={`/${lang}/admin`} replace />}

          <div className="mt-8 flex items-center gap-2 text-xs text-slate-600"><Activity className="h-4 w-4" /> {t.backend}: {chatbotAdminApi.apiUrl}</div>
        </main>
      </div>
    </div>
  );
}
