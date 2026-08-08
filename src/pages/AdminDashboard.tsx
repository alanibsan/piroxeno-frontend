import { useEffect, useMemo, useState } from "react";
import {
  BookOpen,
  Check,
  Copy,
  Globe2,
  LayoutDashboard,
  Loader2,
  LogOut,
  MessageSquareText,
  RefreshCw,
  Send,
  Settings2,
  Smartphone,
  Sparkles,
  Users,
} from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";
import { ConversationsSection } from "../components/admin/ConversationsSection";
import { OverviewSection } from "../components/admin/OverviewSection";
import { PortalFilters } from "../components/admin/PortalFilters";
import { PortalLoading, TextInput } from "../components/admin/PortalPrimitives";
import { SettingsSection } from "../components/admin/SettingsSection";
import { UsersSection } from "../components/admin/UsersSection";
import {
  arrayToLines,
  blankLast30Days,
  getLabels,
  linesToArray,
  slugifyAccountName,
  type Section,
  type UserClientMode,
} from "../components/admin/dashboardUtils";
import { clearAdminToken, getAdminToken, getAdminUser } from "../utils/adminSession";
import whatsappDark from "../assets/whatsapp_dark.jpg";
import whatsappLight from "../assets/whatsapp_light.jpg";
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
import { useLang } from "../utils/i18n";

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
  const [openUserMenu, setOpenUserMenu] = useState("");

  const [originsDraft, setOriginsDraft] = useState("");
  const [enabledDraft, setEnabledDraft] = useState(true);
  const [rateLimitDraft, setRateLimitDraft] = useState(30);
  const [promptDraft, setPromptDraft] = useState("");

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
    ["admin", Settings2, t.admin, true],
  ] as const;

  const metricParams = { client_slug: selectedSlug || undefined, start_date: dateStart || undefined, end_date: dateEnd || undefined, impersonate_user_id: impersonateUserId };

  const clearAlerts = () => {
    setError("");
    setNotice("");
  };

  useEffect(() => {
    clearAlerts();
    setOpenUserMenu("");
  }, [section, selectedSlug, dateStart, dateEnd]);

  const loadPortal = async () => {
    if (!token) return;
    setLoading(true);
    clearAlerts();
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
    setPromptDraft(clientDetail.prompt || "");
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
    clearAlerts();
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
    clearAlerts();
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
    clearAlerts();
    try {
      await chatbotAdminApi.updateClientConfig(token, detail.client_slug, {
        allowed_origins: linesToArray(originsDraft),
        enabled: enabledDraft,
        rate_limit_per_minute: Number(rateLimitDraft),
        prompt: promptDraft,
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
    clearAlerts();
    try {
      let assignedClientSlug = userClientMode === "global" ? null : userForm.client_slug?.trim() || null;
      if (userClientMode === "new") {
        const response = await createClient(newUserClientForm);
        assignedClientSlug = response.client_slug;
      }
      const assignedRole = userClientMode === "global" ? "admin" : "user";
      const response = await chatbotAdminApi.upsertUser(token, { ...userForm, role: assignedRole, email: userForm.email.trim().toLowerCase(), client_slug: assignedClientSlug, password: userForm.password?.trim() || undefined });
      setUserForm({ email: "", role: "user", client_slug: "", is_active: true, password: "" });
      setNewUserClientForm({ account_name: "", title: "", allowed_origins: "", primary_color: "#00cc99", rate_limit_per_minute: 30 });
      await loadPortal();
      setNotice(response.user._invitation_email_sent === false ? (lang === "es" ? "Usuario guardado, pero no se pudo enviar el email. Revisa SMTP en el backend." : "User saved, but the email could not be sent. Check backend SMTP.") : (lang === "es" ? "Usuario guardado" : "User saved"));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save user");
    } finally {
      setSaving(false);
    }
  };

  const toggleUserActive = async (target: AppUser) => {
    if (!token) return;
    setSaving(true);
    clearAlerts();
    try {
      await chatbotAdminApi.upsertUser(token, {
        ...target,
        is_active: !target.is_active,
      });
      await loadPortal();
      setNotice(lang === "es" ? "Usuario actualizado" : "User updated");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not update user");
    } finally {
      setSaving(false);
    }
  };

  const syncRegistry = async (target: "current" | "dev") => {
    if (!token) return;
    setSaving(true);
    clearAlerts();
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
    clearAlerts();
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

  const activity30d = summary?.activity_30d?.length ? summary.activity_30d : blankLast30Days();
  const hasActivity30d = activity30d.some((item) => item.conversations > 0 || item.messages > 0 || item.tokens > 0);
  const maxDailyMessages = Math.max(...activity30d.map((item) => item.messages), 1);
  const displayClient = actingUser?.client_slug || selectedSlug || t.global;
  const employeeUsers = users.filter((item) => !item.client_slug);
  const clientUsers = users.filter((item) => item.client_slug);

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

          {(section === "overview" || section === "conversations") && <PortalFilters labels={t} actingUser={actingUser} clients={clients} selectedSlug={selectedSlug} setSelectedSlug={setSelectedSlug} dateStart={dateStart} setDateStart={setDateStart} dateEnd={dateEnd} setDateEnd={setDateEnd} />}

          {section === "overview" && <OverviewSection summary={summary} activity30d={activity30d} hasActivity30d={hasActivity30d} maxDailyMessages={maxDailyMessages} labels={t} lang={lang} loading={loading} />}

          {section === "conversations" && <ConversationsSection labels={t} conversationQuery={conversationQuery} setConversationQuery={setConversationQuery} conversations={filteredConversations} selectedConversationId={selectedConversationId} loadConversationMessages={(conversationId) => void loadConversationMessages(conversationId)} messages={messages} />}

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
                    <div className="space-y-4"><label className="flex items-center gap-3 border border-white/10 bg-slate-950 p-4 text-sm"><input type="checkbox" checked={enabledDraft} onChange={(e) => setEnabledDraft(e.target.checked)} /> {t.active}</label><label className="block text-sm font-semibold text-slate-300">{t.rateLimit}<TextInput type="number" min={1} value={rateLimitDraft} onChange={(e) => setRateLimitDraft(Number(e.target.value))} className="mt-2 w-full" /></label></div>
                  </div>
                  <label className="block text-sm font-semibold text-slate-300">Prompt<textarea value={promptDraft} onChange={(e) => setPromptDraft(e.target.value)} rows={12} className="mt-2 w-full border border-white/10 bg-slate-950 p-4 font-mono text-sm leading-6 text-white outline-none focus:border-[var(--color-primary)]" /></label>
                  <div><div className="mb-2 flex items-center justify-between"><label className="text-sm font-semibold text-slate-300">{t.snippet}</label><button onClick={() => copyEmbed(detail.embed)} className="inline-flex items-center gap-2 bg-white px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-100">{copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}{copied ? t.copied : t.copySnippet}</button></div><textarea readOnly value={detail.embed} rows={8} className="w-full border border-white/10 bg-slate-950 p-4 font-mono text-xs text-slate-300" /></div>
                  <div className="flex justify-end border-t border-white/10 pt-5"><button onClick={saveConfig} disabled={saving} className="inline-flex items-center gap-2 bg-[var(--color-primary)] px-5 py-3 font-semibold text-slate-950 disabled:opacity-60">{saving && <Loader2 className="h-4 w-4 animate-spin" />}{t.save}</button></div>
                </div> : <div className="p-10 text-center text-slate-500">{t.selectClient}</div>}
              </section>
            </div>
          )}

          {section === "users" && isAdmin && <UsersSection labels={t} lang={lang} clients={clients} employeeUsers={employeeUsers} clientUsers={clientUsers} userClientMode={userClientMode} setUserClientMode={setUserClientMode} userForm={userForm} setUserForm={setUserForm} newUserClientForm={newUserClientForm} setNewUserClientForm={setNewUserClientForm} saveUser={saveUser} startImpersonation={startImpersonation} toggleUserActive={toggleUserActive} saving={saving} openUserMenu={openUserMenu} setOpenUserMenu={setOpenUserMenu} />}

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
                <div className="h-[620px] space-y-3 overflow-auto bg-cover bg-center px-1 py-4" style={{ backgroundImage: `url(${theme === "dark" ? whatsappDark : whatsappLight})` }}>
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

          {section === "admin" && <SettingsSection labels={t} lang={lang} theme={theme} isAdmin={isAdmin} saving={saving} switchLang={switchLang} toggleTheme={toggleTheme} syncRegistry={(target) => void syncRegistry(target)} publishLocalClients={() => void publishLocalClients()} />}

          {section === "clients" && !isAdmin && <Navigate to={`/${lang}/admin`} replace />}
          {section === "users" && !isAdmin && <Navigate to={`/${lang}/admin`} replace />}
          {section === "demo" && !isAdmin && <Navigate to={`/${lang}/admin`} replace />}

        </main>
      </div>
    </div>
  );
}
