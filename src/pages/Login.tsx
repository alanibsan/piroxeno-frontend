import { useState } from "react";
import { Eye, EyeOff, LockKeyhole, LogIn, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { setAdminToken } from "../utils/adminSession";
import { chatbotAdminApi } from "../utils/chatbotAdminApi";
import { useLang } from "../utils/i18n";

export default function Login() {
  const lang = useLang();
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [showToken, setShowToken] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const t = {
    badge: lang === "es" ? "Acceso privado" : "Private access",
    title: lang === "es" ? "Entrar al panel" : "Sign in to dashboard",
    copy:
      lang === "es"
        ? "El sitio público de Piroxeno permanece abierto. Este acceso es solo para administrar clientes, dominios y consumo."
        : "The public Piroxeno site stays open. This access is only for managing clients, domains and usage.",
    label: lang === "es" ? "Token de administración" : "Admin token",
    placeholder: "ADMIN_API_TOKEN",
    submit: lang === "es" ? "Entrar" : "Sign in",
    loading: lang === "es" ? "Validando..." : "Validating...",
    error: lang === "es" ? "No pudimos validar el acceso." : "We could not validate access.",
    note:
      lang === "es"
        ? "Temporalmente este login usa un token. Después debe conectarse con Supabase Auth."
        : "This login temporarily uses a token. Later it should be connected to Supabase Auth.",
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextToken = token.trim();
    if (!nextToken) return;

    setLoading(true);
    setError("");

    try {
      await chatbotAdminApi.listClients(nextToken);
      setAdminToken(nextToken);
      navigate(`/${lang}/admin`);
    } catch (err) {
      console.error(err);
      setError(t.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#050711] px-6 pt-32 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(0,204,153,0.22),transparent_30%),radial-gradient(circle_at_82%_18%,rgba(86,116,255,0.18),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.05)_0_1px,transparent_1px)] bg-[length:auto,auto,44px_44px]" />

      <div className="relative mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <div className="mb-5 flex w-fit items-center gap-2 border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-semibold text-emerald-100">
            <ShieldCheck className="h-4 w-4 text-[var(--color-primary)]" />
            {t.badge}
          </div>
          <h1 className="max-w-xl text-5xl font-semibold leading-tight tracking-tight md:text-6xl">
            {t.title}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">{t.copy}</p>
        </div>

        <form onSubmit={handleSubmit} className="border border-white/10 bg-white/[0.055] p-6 shadow-2xl shadow-black/30 backdrop-blur">
          <div className="mb-6 flex h-12 w-12 items-center justify-center bg-[var(--color-primary)] text-slate-950">
            <LockKeyhole className="h-6 w-6" />
          </div>

          <label className="block text-sm font-semibold text-slate-200">{t.label}</label>
          <div className="mt-2 flex border border-white/10 bg-slate-950 focus-within:border-[var(--color-primary)]">
            <input
              type={showToken ? "text" : "password"}
              value={token}
              onChange={(event) => setToken(event.target.value)}
              placeholder={t.placeholder}
              className="min-w-0 flex-1 bg-transparent px-4 py-3 text-white outline-none placeholder:text-slate-600"
            />
            <button
              type="button"
              onClick={() => setShowToken((value) => !value)}
              className="px-4 text-slate-400 hover:text-white"
              aria-label={showToken ? "Hide token" : "Show token"}
            >
              {showToken ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>

          {error && <p className="mt-3 text-sm text-red-300">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 bg-[var(--color-primary)] px-5 py-3 font-semibold text-slate-950 transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <LogIn className="h-5 w-5" />
            {loading ? t.loading : t.submit}
          </button>

          <p className="mt-4 text-xs leading-5 text-slate-500">{t.note}</p>
        </form>
      </div>
    </div>
  );
}
