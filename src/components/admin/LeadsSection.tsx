import { Mail, Phone, Target } from "lucide-react";
import type { ClientSummary, PortalLead } from "../../utils/chatbotAdminApi";
import type { AdminLabels } from "./dashboardUtils";
import { formatDate } from "./dashboardUtils";

export function LeadsSection({
  labels,
  leads,
  clients,
  selectedSlug,
}: {
  labels: AdminLabels;
  leads: PortalLead[];
  clients: ClientSummary[];
  selectedSlug: string;
}) {
  const activeClient = clients.find((client) => client.client_slug === selectedSlug);
  const dynamicColumns = activeClient?.lead_columns || [];

  return (
    <section className="border border-white/10 bg-white/[0.035] p-5">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center bg-[var(--color-primary)]/15 text-[var(--color-primary)]">
          <Target className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-xl font-semibold">{labels.leads}</h2>
          <p className="text-sm text-slate-500">{leads.length} {labels.leads.toLowerCase()}</p>
        </div>
      </div>

      <div className="overflow-auto">
        <table className="min-w-full border-collapse text-left text-sm">
          <thead className="border-b border-white/10 text-xs uppercase tracking-[0.12em] text-slate-500">
            <tr>
              <th className="px-3 py-3 font-semibold">{labels.client}</th>
              <th className="px-3 py-3 font-semibold">{labels.contact}</th>
              <th className="px-3 py-3 font-semibold">{labels.interest}</th>
              {dynamicColumns.map((column) => <th key={column.key} className="px-3 py-3 font-semibold">{column.label}</th>)}
              <th className="px-3 py-3 font-semibold">{labels.created}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {leads.map((lead) => (
              <tr key={lead.id} className="text-slate-300">
                <td className="px-3 py-4 font-semibold text-white">{lead.client_slug}</td>
                <td className="px-3 py-4">
                  <div className="space-y-1">
                    {lead.email && <div className="flex items-center gap-2"><Mail className="h-3.5 w-3.5 text-[var(--color-primary)]" /> {lead.email}</div>}
                    {lead.phone && <div className="flex items-center gap-2"><Phone className="h-3.5 w-3.5 text-[var(--color-primary)]" /> {lead.phone}</div>}
                  </div>
                </td>
                <td className="max-w-[320px] px-3 py-4 text-slate-400">{lead.interest || "-"}</td>
                {dynamicColumns.map((column) => (
                  <td key={column.key} className="px-3 py-4 text-slate-400">{String(lead.fields?.[column.key] || "-")}</td>
                ))}
                <td className="px-3 py-4 text-slate-500">{formatDate(lead.created_at)}</td>
              </tr>
            ))}
            {!leads.length && <tr><td colSpan={4 + dynamicColumns.length} className="px-3 py-10 text-center text-slate-500">{labels.noData}</td></tr>}
          </tbody>
        </table>
      </div>
    </section>
  );
}
