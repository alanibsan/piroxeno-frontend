import { Activity, DatabaseZap, Gauge, LayoutDashboard, MessageSquareText, Sparkles, Users } from "lucide-react";
import type { PortalSummary } from "../../utils/chatbotAdminApi";
import type { Lang } from "../../utils/i18n";
import { Activity30DaySection } from "./Activity30DaySection";
import { StatCard } from "./PortalPrimitives";
import type { AdminLabels } from "./dashboardUtils";
import { formatNumber } from "./dashboardUtils";

type ActivityDay = PortalSummary["activity_30d"][number];

export function OverviewSection({
  summary,
  activity30d,
  hasActivity30d,
  labels,
  lang,
  loading,
}: {
  summary: PortalSummary | null;
  activity30d: ActivityDay[];
  hasActivity30d: boolean;
  labels: AdminLabels;
  lang: Lang;
  loading: boolean;
}) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
        <StatCard icon={MessageSquareText} label={labels.conversationsKpi} value={formatNumber(summary?.conversation_count)} hint={labels.metricHints.conversations} />
        <StatCard icon={Activity} label={labels.messages} value={formatNumber(summary?.message_count)} hint={labels.metricHints.messages} />
        <StatCard icon={Sparkles} label={labels.assistant} value={formatNumber(summary?.assistant_messages)} hint={labels.metricHints.assistant} />
        <StatCard icon={Users} label={labels.userMessages} value={formatNumber(summary?.user_messages)} hint={labels.metricHints.user} />
        <StatCard icon={DatabaseZap} label={labels.tokens} value={formatNumber(summary?.total_tokens)} hint={labels.metricHints.tokens} />
        <StatCard icon={Gauge} label={labels.latency} value={`${formatNumber(summary?.avg_latency_ms)} ms`} hint={labels.metricHints.latency} />
      </div>

      <Activity30DaySection activity30d={activity30d} hasActivity30d={hasActivity30d} labels={labels} lang={lang} formatNumber={formatNumber} />

      <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <section className="border border-white/10 bg-white/[0.035] p-5">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold"><LayoutDashboard className="h-5 w-5 text-[var(--color-primary)]" /> {labels.overview}</h2>
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
            {!summary?.by_client?.length && <p className="text-sm text-slate-500">{loading ? "" : labels.noData}</p>}
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
  );
}
