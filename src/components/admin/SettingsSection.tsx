import { DatabaseZap, Languages, Moon, RefreshCw, ShieldCheck, Sun } from "lucide-react";
import type { AdminLabels } from "./dashboardUtils";

export function SettingsSection({
  labels,
  lang,
  theme,
  isAdmin,
  saving,
  switchLang,
  toggleTheme,
  syncRegistry,
  publishLocalClients,
}: {
  labels: AdminLabels;
  lang: "es" | "en";
  theme: string;
  isAdmin: boolean;
  saving: boolean;
  switchLang: () => void;
  toggleTheme: () => void;
  syncRegistry: (target: "current" | "dev") => void;
  publishLocalClients: () => void;
}) {
  return (
    <section className="grid gap-5 xl:grid-cols-3">
      <button onClick={switchLang} className="border border-white/10 bg-white/[0.035] p-5 text-left hover:border-[var(--color-primary)]/50"><Languages className="mb-4 h-6 w-6 text-[var(--color-primary)]" /><h2 className="font-semibold">{labels.settings}</h2><p className="mt-2 text-sm text-slate-500">{lang === "es" ? "Español → English" : "English → Español"}</p></button>
      <button onClick={toggleTheme} className="border border-white/10 bg-white/[0.035] p-5 text-left hover:border-[var(--color-primary)]/50">{theme === "dark" ? <Moon className="mb-4 h-6 w-6 text-[var(--color-primary)]" /> : <Sun className="mb-4 h-6 w-6 text-[var(--color-primary)]" />}<h2 className="font-semibold">{labels.theme}</h2><p className="mt-2 text-sm text-slate-500">{theme === "dark" ? labels.dark : labels.light}</p></button>
      {isAdmin && <button onClick={() => syncRegistry("current")} disabled={saving} className="border border-white/10 bg-white/[0.035] p-5 text-left hover:border-[var(--color-primary)]/50"><RefreshCw className="mb-4 h-6 w-6 text-[var(--color-primary)]" /><h2 className="font-semibold">{labels.syncRegistry}</h2><p className="mt-2 text-sm text-slate-500">Supabase → backend actual</p></button>}
      {isAdmin && <button onClick={publishLocalClients} disabled={saving} className="border border-white/10 bg-white/[0.035] p-5 text-left hover:border-[var(--color-primary)]/50"><DatabaseZap className="mb-4 h-6 w-6 text-[var(--color-primary)]" /><h2 className="font-semibold">{labels.publishLocal}</h2><p className="mt-2 text-sm text-slate-500">Backend actual → Supabase</p></button>}
      {isAdmin && <button onClick={() => syncRegistry("dev")} disabled={saving} className="border border-white/10 bg-white/[0.035] p-5 text-left hover:border-[var(--color-primary)]/50"><ShieldCheck className="mb-4 h-6 w-6 text-[var(--color-primary)]" /><h2 className="font-semibold">{labels.replicateDev}</h2><p className="mt-2 text-sm text-slate-500">Supabase → http://127.0.0.1:8000</p></button>}
    </section>
  );
}
