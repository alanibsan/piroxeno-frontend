import type { LucideIcon } from "lucide-react";
import type React from "react";
import { CircleHelp } from "lucide-react";

export function StatCard({ icon: Icon, label, value, detail, hint }: { icon: LucideIcon; label: string; value: string | number; detail?: string; hint?: string }) {
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

export function PortalLoading({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center">
      <img src="/favicon.png" alt="" className="h-16 w-16 animate-spin drop-shadow-[0_18px_35px_rgba(0,0,0,0.35)]" />
    </div>
  );
}

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-[var(--color-primary)] ${props.className || ""}`} />;
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={`border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none focus:border-[var(--color-primary)] ${props.className || ""}`} />;
}
