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
};

export function Activity30DaySection({
  activity30d,
  hasActivity30d,
  maxDailyMessages,
  labels,
  lang,
  formatNumber,
}: {
  activity30d: ActivityDay[];
  hasActivity30d: boolean;
  maxDailyMessages: number;
  labels: Labels;
  lang: Lang;
  formatNumber: (value?: number | null) => string;
}) {
  return (
    <section className="border border-white/10 bg-white/[0.035] p-5">
      <h2 className="mb-5 flex items-center gap-2 text-lg font-semibold"><Activity className="h-5 w-5 text-[var(--color-primary)]" /> {labels.activity30d}</h2>
      <div className="mb-5 flex h-32 items-end gap-1 border-b border-white/10 pb-2">
        {activity30d.map((day) => (
          <div key={day.date} className="group relative flex min-w-0 flex-1 items-end">
            <div
              className={`w-full transition ${hasActivity30d ? "bg-[var(--color-primary)]/80 hover:bg-[var(--color-primary)]" : "bg-white/10"}`}
              style={{ height: `${Math.max(day.messages ? 10 : 3, (day.messages / maxDailyMessages) * 100)}%` }}
            />
          </div>
        ))}
      </div>
      <div className="overflow-auto">
        <div className="min-w-[780px] divide-y divide-white/10 text-sm">
          <div className="grid grid-cols-[1fr_repeat(6,0.75fr)] gap-3 pb-3 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
            <span>{lang === "es" ? "Día" : "Day"}</span><span>{labels.conversationsKpi}</span><span>{labels.messages}</span><span>{labels.assistant}</span><span>{labels.userMessages}</span><span>{labels.tokens}</span><span>{labels.latency}</span>
          </div>
          {activity30d.slice().reverse().map((day) => (
            <div key={day.date} className="grid grid-cols-[1fr_repeat(6,0.75fr)] gap-3 py-3 text-slate-300">
              <span className="font-medium text-white">{new Date(day.date).toLocaleDateString()}</span>
              <span>{formatNumber(day.conversations)}</span>
              <span>{formatNumber(day.messages)}</span>
              <span>{formatNumber(day.assistant_messages)}</span>
              <span>{formatNumber(day.user_messages)}</span>
              <span>{formatNumber(day.tokens)}</span>
              <span>{formatNumber(day.avg_latency_ms)} ms</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
