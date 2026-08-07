import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  Check,
  Copy,
  Globe2,
  KeyRound,
  Loader2,
  Plus,
  RefreshCw,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Navigate } from "react-router-dom";
import { clearAdminToken, getAdminToken } from "../utils/adminSession";
import {
  chatbotAdminApi,
  type AppUser,
  type ClientDetail,
  type ClientSummary,
  type ClientUsage,
} from "../utils/chatbotAdminApi";
import { useLang } from "../utils/i18n";

type Tab = "clients" | "users" | "create";

function linesToArray(value: string) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function arrayToLines(value?: string[]) {
  return (value || []).join("\n");
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="border border-white/10 bg-white/[0.045] p-4">
      <p className="text-xs uppercase tracking-[0.16em] text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
    </div>
  );
}

export default function AdminDashboard() {
  const lang = useLang();
  const [token, setToken] = useState(() => getAdminToken());
  const [clients, setClients] = useState<ClientSummary[]>([]);
  const [selectedSlug, setSelectedSlug] = useState<string>("");
  const [detail, setDetail] = useState<ClientDetail | null>(null);
  const [usage, setUsage] = useState<ClientUsage | null>(null);
  const [users, setUsers] = useState<AppUser[]>([]);
  const [tab, setTab] = useState<Tab>("clients");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [copied, setCopied] = useState(false);

  const [originsDraft, setOriginsDraft] = useState("");
  const [enabledDraft, setEnabledDraft] = useState(true);
  const [rateLimitDraft, setRateLimitDraft] = useState(30);

  const [createForm, setCreateForm] = useState({
    client_slug: "",
    name: "",
    title: "",
    allowed_origins: "",
    primary_color: "#22c55e",
    rate_limit_per_minute: 30,
  });
  const [createdEmbed, setCreatedEmbed] = useState("");

  const [userForm, setUserForm] = useState<AppUser>({
    email: "",
    role: "user",
    client_slug: "",
    is_active: true,
  });

  const t = useMemo(
    () => ({
      title: lang === "es" ? "Panel de Piroxeno" : "Piroxeno Admin",
      subtitle:
        lang === "es"
          ? "Gestiona clientes, dominios autorizados, consumo y accesos."
          : "Manage clients, domain whitelist, usage and access.",
      clients: lang === "es" ? "Clientes" : "Clients",
      users: lang === "es" ? "Usuarios" : "Users",
      create: lang === "es" ? "Crear cliente" : "Create client",
      refresh: lang === "es" ? "Actualizar" : "Refresh",
    }),
    [lang],
  );

  const loadClients = async (selected = selectedSlug) => {
    if (!token) return;
    setLoading(true);
    setError("");
    try {
      const response = await chatbotAdminApi.listClients(token);
      setClients(response.clients);
      const nextSlug = selected || response.clients[0]?.client_slug || "";
      setSelectedSlug(nextSlug);
      if (nextSlug) await loadClientDetail(nextSlug);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load clients");
    } finally {
      setLoading(false);
    }
  };

  const loadClientDetail = async (clientSlug: string) => {
    if (!token || !clientSlug) return;
    setError("");
    const [clientDetail, clientUsage] = await Promise.all([
      chatbotAdminApi.getClient(token, clientSlug),
      chatbotAdminApi.getUsage(token, clientSlug),
    ]);
    setDetail(clientDetail);
    setUsage(clientUsage);
    setOriginsDraft(arrayToLines(clientDetail.config.allowed_origins));
    setEnabledDraft(Boolean(clientDetail.config.enabled));
    setRateLimitDraft(clientDetail.config.rate_limit_per_minute || 30);
  };

  const loadUsers = async () => {
    if (!token) return;
    setError("");
    try {
      const response = await chatbotAdminApi.listUsers(token);
      setUsers(response.users);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load users");
    }
  };

  useEffect(() => {
    if (token) {
      void loadClients();
      void loadUsers();
    }
  }, [token]);

  const handleLogout = () => {
    clearAdminToken();
    setToken("");
    setClients([]);
    setDetail(null);
    setUsage(null);
  };

  const saveConfig = async () => {
    if (!detail || !token) return;
    setSaving(true);
    setError("");
    setNotice("");
    try {
      await chatbotAdminApi.updateClientConfig(token, detail.client_slug, {
        allowed_origins: linesToArray(originsDraft),
        enabled: enabledDraft,
        rate_limit_per_minute: Number(rateLimitDraft),
      });
      await loadClients(detail.client_slug);
      setNotice("Configuracion guardada");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save config");
    } finally {
      setSaving(false);
    }
  };

  const createClient = async () => {
    if (!token) return;
    setSaving(true);
    setError("");
    setNotice("");
    setCreatedEmbed("");
    try {
      const response = await chatbotAdminApi.createClient(token, {
        client_slug: createForm.client_slug.trim(),
        name: createForm.name.trim(),
        title: createForm.title.trim() || undefined,
        allowed_origins: linesToArray(createForm.allowed_origins),
        primary_color: createForm.primary_color,
        rate_limit_per_minute: Number(createForm.rate_limit_per_minute),
      });
      setCreatedEmbed(response.embed);
      setNotice(`Cliente creado: ${response.client_slug}`);
      await loadClients(response.client_slug);
      setTab("clients");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create client");
    } finally {
      setSaving(false);
    }
  };

  const saveUser = async () => {
    if (!token) return;
    setSaving(true);
    setError("");
    setNotice("");
    try {
      await chatbotAdminApi.upsertUser(token, {
        ...userForm,
        client_slug: userForm.client_slug?.trim() || null,
      });
      setUserForm({ email: "", role: "user", client_slug: "", is_active: true });
      await loadUsers();
      setNotice("Usuario guardado");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save user");
    } finally {
      setSaving(false);
    }
  };

  const copyEmbed = async (value: string) => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  if (!token) {
    return <Navigate to={`/${lang}/login`} replace />;
  }


  return (
    <div className="min-h-screen bg-[#050711] px-6 pb-16 pt-28 text-white">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col justify-between gap-4 border-b border-white/10 pb-6 md:flex-row md:items-end">
          <div>
            <div className="mb-4 flex w-fit items-center gap-2 border border-white/10 bg-white/[0.055] px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200">
              <ShieldCheck className="h-4 w-4" /> Admin
            </div>
            <h1 className="text-4xl font-semibold tracking-tight">{t.title}</h1>
            <p className="mt-3 max-w-2xl text-slate-400">{t.subtitle}</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => void loadClients()}
              className="inline-flex items-center gap-2 border border-white/10 px-4 py-3 text-sm font-semibold text-slate-200 hover:border-[var(--color-primary)]/60"
            >
              <RefreshCw className="h-4 w-4" /> {t.refresh}
            </button>
            <button onClick={handleLogout} className="border border-white/10 px-4 py-3 text-sm text-slate-400 hover:text-white">
              Salir
            </button>
          </div>
        </header>

        {error && <div className="mb-4 border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</div>}
        {notice && <div className="mb-4 border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">{notice}</div>}

        <div className="mb-6 flex flex-wrap gap-2">
          {([
            ["clients", t.clients, Globe2],
            ["users", t.users, Users],
            ["create", t.create, Plus],
          ] as const).map(([key, label, Icon]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold ${
                tab === key ? "bg-[var(--color-primary)] text-slate-950" : "border border-white/10 text-slate-300 hover:border-white/25"
              }`}
            >
              <Icon className="h-4 w-4" /> {label}
            </button>
          ))}
        </div>

        {tab === "clients" && (
          <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
            <aside className="border border-white/10 bg-white/[0.035]">
              <div className="border-b border-white/10 px-4 py-3 text-sm font-semibold text-slate-300">Clientes</div>
              {loading && <div className="p-4 text-sm text-slate-400">Cargando...</div>}
              <div className="divide-y divide-white/10">
                {clients.map((client) => (
                  <button
                    key={client.client_slug}
                    onClick={async () => {
                      setSelectedSlug(client.client_slug);
                      await loadClientDetail(client.client_slug);
                    }}
                    className={`w-full px-4 py-4 text-left transition ${selectedSlug === client.client_slug ? "bg-white/[0.08]" : "hover:bg-white/[0.045]"}`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-semibold">{client.client_slug}</span>
                      <span className={`text-xs ${client.enabled ? "text-emerald-300" : "text-red-300"}`}>
                        {client.enabled ? "active" : "disabled"}
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-slate-500">{client.allowed_origins.length} dominios permitidos</p>
                  </button>
                ))}
              </div>
            </aside>

            <section className="border border-white/10 bg-white/[0.035] p-5">
              {detail ? (
                <div className="space-y-6">
                  <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div>
                      <h2 className="text-2xl font-semibold">{detail.client_slug}</h2>
                      <p className="mt-1 text-sm text-slate-500">Configuracion y consumo del cliente</p>
                    </div>
                    <button
                      onClick={() => copyEmbed(detail.embed)}
                      className="inline-flex items-center gap-2 bg-white px-4 py-3 text-sm font-semibold text-slate-950 hover:bg-emerald-100"
                    >
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      {copied ? "Copiado" : "Copiar snippet"}
                    </button>
                  </div>

                  <div className="grid gap-3 md:grid-cols-4">
                    <Stat label="Conversaciones" value={usage?.conversation_count ?? 0} />
                    <Stat label="Mensajes" value={usage?.message_count ?? 0} />
                    <Stat label="Assistant" value={usage?.assistant_messages ?? 0} />
                    <Stat label="Tokens" value={usage?.total_tokens ?? 0} />
                  </div>

                  <div className="grid gap-6 lg:grid-cols-2">
                    <div>
                      <label className="text-sm font-semibold text-slate-300">Whitelist de dominios</label>
                      <textarea
                        value={originsDraft}
                        onChange={(event) => setOriginsDraft(event.target.value)}
                        rows={8}
                        className="mt-2 w-full border border-white/10 bg-slate-950 p-4 font-mono text-sm text-white outline-none focus:border-[var(--color-primary)]"
                        placeholder="https://cliente.com\nhttps://www.cliente.com"
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="flex items-center gap-3 border border-white/10 bg-slate-950 p-4 text-sm">
                        <input type="checkbox" checked={enabledDraft} onChange={(event) => setEnabledDraft(event.target.checked)} />
                        Cliente activo
                      </label>
                      <label className="block text-sm font-semibold text-slate-300">
                        Rate limit por minuto
                        <input
                          type="number"
                          min={1}
                          value={rateLimitDraft}
                          onChange={(event) => setRateLimitDraft(Number(event.target.value))}
                          className="mt-2 w-full border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none focus:border-[var(--color-primary)]"
                        />
                      </label>
                      <button
                        onClick={saveConfig}
                        disabled={saving}
                        className="inline-flex items-center gap-2 bg-[var(--color-primary)] px-5 py-3 font-semibold text-slate-950 disabled:opacity-60"
                      >
                        {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                        Guardar cambios
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-slate-300">Snippet embebible</label>
                    <textarea readOnly value={detail.embed} rows={8} className="mt-2 w-full border border-white/10 bg-slate-950 p-4 font-mono text-xs text-slate-300" />
                  </div>
                </div>
              ) : (
                <div className="p-10 text-center text-slate-500">Selecciona un cliente</div>
              )}
            </section>
          </div>
        )}

        {tab === "create" && (
          <section className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
            <div className="border border-white/10 bg-white/[0.035] p-5">
              <h2 className="mb-5 text-2xl font-semibold">Crear cliente</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <input className="border border-white/10 bg-slate-950 px-4 py-3 text-white" placeholder="client_slug" value={createForm.client_slug} onChange={(e) => setCreateForm({ ...createForm, client_slug: e.target.value })} />
                <input className="border border-white/10 bg-slate-950 px-4 py-3 text-white" placeholder="Nombre" value={createForm.name} onChange={(e) => setCreateForm({ ...createForm, name: e.target.value })} />
                <input className="border border-white/10 bg-slate-950 px-4 py-3 text-white" placeholder="Titulo del widget" value={createForm.title} onChange={(e) => setCreateForm({ ...createForm, title: e.target.value })} />
                <input className="border border-white/10 bg-slate-950 px-4 py-3 text-white" placeholder="#22c55e" value={createForm.primary_color} onChange={(e) => setCreateForm({ ...createForm, primary_color: e.target.value })} />
                <input type="number" className="border border-white/10 bg-slate-950 px-4 py-3 text-white" placeholder="Rate limit" value={createForm.rate_limit_per_minute} onChange={(e) => setCreateForm({ ...createForm, rate_limit_per_minute: Number(e.target.value) })} />
              </div>
              <textarea className="mt-4 w-full border border-white/10 bg-slate-950 p-4 font-mono text-sm text-white" rows={6} placeholder="https://cliente.com\nhttps://www.cliente.com" value={createForm.allowed_origins} onChange={(e) => setCreateForm({ ...createForm, allowed_origins: e.target.value })} />
              <button onClick={createClient} disabled={saving} className="mt-4 inline-flex items-center gap-2 bg-[var(--color-primary)] px-5 py-3 font-semibold text-slate-950 disabled:opacity-60">
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                Crear cliente
              </button>
            </div>
            <div className="border border-white/10 bg-white/[0.035] p-5">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold"><KeyRound className="h-5 w-5" /> Snippet generado</h3>
              <textarea readOnly value={createdEmbed} rows={15} className="w-full border border-white/10 bg-slate-950 p-4 font-mono text-xs text-slate-300" placeholder="Aqui aparecera el snippet despues de crear el cliente" />
            </div>
          </section>
        )}

        {tab === "users" && (
          <section className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="border border-white/10 bg-white/[0.035] p-5">
              <h2 className="mb-5 text-2xl font-semibold">Usuarios</h2>
              <input className="mb-3 w-full border border-white/10 bg-slate-950 px-4 py-3 text-white" placeholder="email@cliente.com" value={userForm.email} onChange={(e) => setUserForm({ ...userForm, email: e.target.value })} />
              <select className="mb-3 w-full border border-white/10 bg-slate-950 px-4 py-3 text-white" value={userForm.role} onChange={(e) => setUserForm({ ...userForm, role: e.target.value as "admin" | "user" })}>
                <option value="user">user</option>
                <option value="admin">admin</option>
              </select>
              <input className="mb-3 w-full border border-white/10 bg-slate-950 px-4 py-3 text-white" placeholder="client_slug opcional" value={userForm.client_slug || ""} onChange={(e) => setUserForm({ ...userForm, client_slug: e.target.value })} />
              <label className="mb-4 flex items-center gap-3 text-sm text-slate-300">
                <input type="checkbox" checked={userForm.is_active} onChange={(e) => setUserForm({ ...userForm, is_active: e.target.checked })} /> activo
              </label>
              <button onClick={saveUser} disabled={saving} className="inline-flex items-center gap-2 bg-[var(--color-primary)] px-5 py-3 font-semibold text-slate-950 disabled:opacity-60">
                <Users className="h-4 w-4" /> Guardar usuario
              </button>
            </div>
            <div className="overflow-hidden border border-white/10 bg-white/[0.035]">
              <div className="border-b border-white/10 px-4 py-3 text-sm font-semibold text-slate-300">Cuentas</div>
              <div className="divide-y divide-white/10">
                {users.map((user) => (
                  <div key={user.email} className="grid gap-2 px-4 py-4 text-sm md:grid-cols-[1.2fr_0.5fr_0.7fr_0.4fr]">
                    <span className="font-medium text-white">{user.email}</span>
                    <span className="text-slate-300">{user.role}</span>
                    <span className="text-slate-400">{user.client_slug || "global"}</span>
                    <span className={user.is_active ? "text-emerald-300" : "text-red-300"}>{user.is_active ? "active" : "off"}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <div className="mt-8 flex items-center gap-2 text-xs text-slate-600">
          <Activity className="h-4 w-4" /> Backend: {chatbotAdminApi.apiUrl}
        </div>
      </div>
    </div>
  );
}
