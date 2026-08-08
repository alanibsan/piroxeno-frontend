import { Search } from "lucide-react";
import type { PortalConversation, PortalMessage } from "../../utils/chatbotAdminApi";
import type { AdminLabels } from "./dashboardUtils";
import { formatDate, formatNumber } from "./dashboardUtils";

export function ConversationsSection({
  labels,
  conversationQuery,
  setConversationQuery,
  conversations,
  selectedConversationId,
  loadConversationMessages,
  messages,
}: {
  labels: AdminLabels;
  conversationQuery: string;
  setConversationQuery: (value: string) => void;
  conversations: PortalConversation[];
  selectedConversationId: string;
  loadConversationMessages: (conversationId: string) => void;
  messages: PortalMessage[];
}) {
  return (
    <div className="grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
      <section className="border border-white/10 bg-white/[0.035]">
        <div className="flex items-center gap-2 border-b border-white/10 p-4">
          <Search className="h-4 w-4 text-slate-500" />
          <input value={conversationQuery} onChange={(event) => setConversationQuery(event.target.value)} placeholder={labels.search} className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-600" />
        </div>
        <div className="max-h-[640px] divide-y divide-white/10 overflow-auto">
          {conversations.map((conversation) => (
            <button key={conversation.id} onClick={() => loadConversationMessages(conversation.id)} className={`w-full p-4 text-left hover:bg-white/[0.045] ${selectedConversationId === conversation.id ? "bg-white/[0.07]" : ""}`}>
              <div className="flex items-center justify-between gap-3"><span className="font-semibold">{conversation.client_slug}</span><span className="text-xs text-slate-500">{formatDate(conversation.last_message_at || conversation.updated_at)}</span></div>
              <p className="mt-2 line-clamp-2 text-sm text-slate-400">{conversation.last_message || conversation.session_id}</p>
              <p className="mt-2 text-xs text-slate-600">{formatNumber(conversation.message_count)} mensajes · {formatNumber(conversation.total_tokens)} tokens</p>
            </button>
          ))}
        </div>
      </section>
      <section className="border border-white/10 bg-white/[0.035] p-5">
        <h2 className="mb-4 text-lg font-semibold">{selectedConversationId ? labels.openedConversation : labels.noConversation}</h2>
        <div className="max-h-[640px] space-y-3 overflow-auto">
          {messages.map((message) => (
            <div key={message.id} className={`border p-4 ${message.role === "assistant" ? "border-[var(--color-primary)]/20 bg-[var(--color-primary)]/8" : "border-white/10 bg-slate-950"}`}>
              <div className="mb-2 flex justify-between gap-3 text-xs uppercase tracking-[0.14em] text-slate-500"><span>{message.role}</span><span>{formatDate(message.created_at)}</span></div>
              <p className="whitespace-pre-wrap text-sm leading-6 text-slate-200">{message.content}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
