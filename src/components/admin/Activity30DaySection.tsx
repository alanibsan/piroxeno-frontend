import { Activity } from "lucide-react";
import type { Lang } from "../../utils/i18n";

type ActivityDay = {
  date: string;
  conversations: number;
  messages: number;
  assistant_messages: number;
  user_messages: number;
  tokens: number;
  avg_latency_ms: number;
};

type Labels = {
  activity30d: string;
  conversationsKpi: string;
  messages: string;
  assistant: string;
  userMessages: string;
  tokens: string;
  latency: string;
  noData: string;
};

export function Activity30DaySection({
  activity30d,
  hasActivity30d,
  labels,
  lang,
  formatNumber,
}: {
  activity30d: ActivityDay[];
  hasActivity30d: boolean;
  labels: Labels;
  lang: Lang;
  formatNumber: (value?: number | null) => string;
}) {
  return (
    <section className="border border-white/10 bg-white/[0.035] p-5">
      <h2 className="mb-5 flex items-center gap-2 text-lg font-semibold"><Activity className="h-5 w-5 text-[var(--color-primary)]" /> {labels.activity30d}</h2>
      <div className="grid gap-4 xl:grid-cols-2">
        {[
          { key: "conversations", label: labels.conversationsKpi, unit: "" },
          { key: "messages", label: labels.messages, unit: "" },
          { key: "tokens", label: labels.tokens, unit: "" },
          { key: "avg_latency_ms", label: labels.latency, unit: " ms" },
        ].map((metric) => {
          const values = activity30d.map((day) => Number(day[metric.key as keyof ActivityDay]) || 0);
          const max = Math.max(...values, 1);
          const points = values.map((value, index) => {
            const x = (index / Math.max(activity30d.length - 1, 1)) * 100;
            const y = 100 - (value / max) * 84 - 8;
            return `${x},${y}`;
          }).join(" ");
          const lastValue = values[values.length - 1] || 0;
          return (
            <div key={metric.key} className="border border-white/10 bg-slate-950/70 p-4">
              <div className="mb-3 flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-slate-200">{metric.label}</p>
                  <p className="text-xs text-slate-500">{lang === "es" ? "Últimos 30 días" : "Last 30 days"}</p>
                </div>
                <span className="text-sm font-semibold text-[var(--color-primary)]">{formatNumber(lastValue)}{metric.unit}</span>
              </div>
              <div className="h-40 border-b border-l border-white/10">
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full overflow-visible">
                  <polyline points={points} fill="none" stroke="rgba(0,204,153,0.95)" strokeWidth="2.2" vectorEffect="non-scaling-stroke" />
                  <polyline points={`0,100 ${points} 100,100`} fill="rgba(0,204,153,0.10)" stroke="none" />
                </svg>
              </div>
              <div className="mt-2 flex justify-between text-[10px] uppercase tracking-[0.12em] text-slate-500">
                <span>{activity30d[0] ? new Date(activity30d[0].date).toLocaleDateString(undefined, { day: "2-digit", month: "short" }) : ""}</span>
                <span>{hasActivity30d ? `${lang === "es" ? "Máx" : "Max"} ${formatNumber(max)}${metric.unit}` : labels.noData}</span>
                <span>{activity30d[activity30d.length - 1] ? new Date(activity30d[activity30d.length - 1].date).toLocaleDateString(undefined, { day: "2-digit", month: "short" }) : ""}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
