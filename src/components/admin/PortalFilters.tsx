import { RefreshCw } from "lucide-react";
import type { ClientSummary } from "../../utils/chatbotAdminApi";
import { Select, TextInput } from "./PortalPrimitives";
import type { AdminLabels } from "./dashboardUtils";

export function PortalFilters({
  labels,
  actingUser,
  clients,
  selectedSlug,
  setSelectedSlug,
  dateStart,
  setDateStart,
  dateEnd,
  setDateEnd,
}: {
  labels: AdminLabels;
  actingUser: { role?: string } | null;
  clients: ClientSummary[];
  selectedSlug: string;
  setSelectedSlug: (value: string) => void;
  dateStart: string;
  setDateStart: (value: string) => void;
  dateEnd: string;
  setDateEnd: (value: string) => void;
}) {
  return (
    <div className={`mb-5 grid gap-3 ${actingUser?.role === "admin" ? "md:grid-cols-[1fr_160px_160px_auto] xl:grid-cols-[280px_180px_180px_auto]" : "md:grid-cols-[160px_160px_auto]"}`}>
      {actingUser?.role === "admin" && <Select value={selectedSlug} onChange={(event) => setSelectedSlug(event.target.value)}>
        <option value="">{labels.allClients}</option>
        {clients.map((client) => <option key={client.client_slug} value={client.client_slug}>{client.client_slug}</option>)}
      </Select>}
      <TextInput type="date" value={dateStart} onChange={(event) => setDateStart(event.target.value)} aria-label={labels.start} />
      <TextInput type="date" value={dateEnd} onChange={(event) => setDateEnd(event.target.value)} aria-label={labels.end} />
      <button onClick={() => { setDateStart(""); setDateEnd(""); }} className="flex h-11 w-11 items-center justify-center border border-white/10 text-slate-400 hover:border-white/25 hover:text-white" aria-label="Reset" title="Reset"><RefreshCw className="h-3.5 w-3.5" /></button>
    </div>
  );
}
