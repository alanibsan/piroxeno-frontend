const API_URL =
  import.meta.env.VITE_PIROXENO_CHATBOT_API_URL ||
  (import.meta.env.DEV ? "http://127.0.0.1:8000" : "https://api.piroxeno.com");

export type ClientSummary = {
  client_slug: string;
  enabled: boolean;
  allowed_origins: string[];
  rate_limit_per_minute: number;
  has_prompt: boolean;
  has_embed: boolean;
  source?: string;
  registry_updated_at?: string;
};

export type ClientDetail = {
  client_slug: string;
  config: {
    enabled: boolean;
    allowed_origins: string[];
    rate_limit_per_minute: number;
    embed_key_hash?: string;
  };
  prompt: string;
  embed: string;
};

export type ClientUsage = {
  client_slug: string;
  conversation_count: number;
  message_count: number;
  assistant_messages: number;
  user_messages: number;
  total_tokens: number;
};

export type AppUser = {
  id?: string;
  email: string;
  role: "admin" | "user";
  client_slug: string | null;
  is_active: boolean;
  created_at?: string;
};

export type UpsertAppUser = AppUser & {
  password?: string;
};

export type LoginResponse = {
  token: string;
  expires_in: number;
  user: AppUser;
};
export type PortalSummary = {
  scope: string;
  conversation_count: number;
  message_count: number;
  assistant_messages: number;
  user_messages: number;
  total_tokens: number;
  avg_latency_ms: number;
  by_client: { client_slug: string; messages: number; tokens: number }[];
  activity_30d: { date: string; messages: number; tokens: number }[];
};

export type PortalConversation = {
  id: string;
  client_slug: string;
  session_id: string;
  created_at: string;
  updated_at: string;
  message_count: number;
  total_tokens: number;
  last_message: string;
  last_message_at: string | null;
};

export type PortalMessage = {
  id: string;
  conversation_id: string;
  client_slug: string;
  role: "user" | "assistant" | "system";
  content: string;
  tokens_prompt?: number | null;
  tokens_completion?: number | null;
  total_tokens?: number | null;
  duration_ms?: number | null;
  created_at: string;
};

export type PortalDoc = {
  title: string;
  body: string;
};

export type DemoChatResponse = {
  answer: string;
  sources: string[];
  session_id: string;
  usage?: Record<string, unknown>;
};


async function adminFetch<T>(path: string, token: string, options: RequestInit = {}, apiUrl = API_URL): Promise<T> {
  const response = await fetch(`${apiUrl}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    const message = data?.detail || "Admin request failed";
    throw new Error(Array.isArray(message) ? message[0]?.msg || "Validation error" : message);
  }

  return data as T;
}

export const chatbotAdminApi = {
  apiUrl: API_URL,
  async login(email: string, password: string) {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const text = await response.text();
    const data = text ? JSON.parse(text) : null;

    if (!response.ok) {
      const message = data?.detail || "Login failed";
      throw new Error(Array.isArray(message) ? message[0]?.msg || "Validation error" : message);
    }

    return data as LoginResponse;
  },

  portalClients(token: string, impersonateUserId?: string) {
    const query = impersonateUserId ? `?impersonate_user_id=${encodeURIComponent(impersonateUserId)}` : "";
    return adminFetch<{ clients: ClientSummary[]; user: AppUser }>(`/portal/clients${query}`, token);
  },
  portalSummary(token: string, params: { client_slug?: string; start_date?: string; end_date?: string; impersonate_user_id?: string }) {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value) query.set(key, value);
    });
    return adminFetch<PortalSummary>(`/portal/summary${query.toString() ? `?${query.toString()}` : ""}`, token);
  },
  portalConversations(token: string, params: { client_slug?: string; start_date?: string; end_date?: string; limit?: number; impersonate_user_id?: string }) {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value) query.set(key, String(value));
    });
    return adminFetch<{ conversations: PortalConversation[] }>(`/portal/conversations${query.toString() ? `?${query.toString()}` : ""}`, token);
  },
  portalConversationMessages(token: string, conversationId: string, impersonateUserId?: string) {
    const query = impersonateUserId ? `?impersonate_user_id=${encodeURIComponent(impersonateUserId)}` : "";
    return adminFetch<{ conversation: PortalConversation; messages: PortalMessage[] }>(`/portal/conversations/${conversationId}/messages${query}`, token);
  },
  portalDocs(token: string, lang: "es" | "en", impersonateUserId?: string) {
    const query = new URLSearchParams({ lang });
    if (impersonateUserId) query.set("impersonate_user_id", impersonateUserId);
    return adminFetch<{ docs: PortalDoc[] }>(`/portal/docs?${query.toString()}`, token);
  },
  demoChat(token: string, body: { prompt: string; question: string; session_id?: string; reset?: boolean }) {
    return adminFetch<DemoChatResponse>("/portal/demo-chat", token, {
      method: "POST",
      body: JSON.stringify(body),
    });
  },
  listClients(token: string) {
    return adminFetch<{ clients: ClientSummary[] }>("/admin/clients", token);
  },
  createClient(
    token: string,
    body: {
      client_slug: string;
      name: string;
      title?: string;
      allowed_origins: string[];
      primary_color: string;
      rate_limit_per_minute: number;
    },
  ) {
    return adminFetch<{ client_slug: string; client_key: string; embed: string }>("/admin/clients", token, {
      method: "POST",
      body: JSON.stringify(body),
    });
  },
  getClient(token: string, clientSlug: string) {
    return adminFetch<ClientDetail>(`/admin/clients/${clientSlug}`, token);
  },
  syncClientsFromRegistry(token: string, apiUrl = API_URL) {
    return adminFetch<{ synced_count: number; clients: string[] }>("/admin/clients/sync-from-registry", token, { method: "POST" }, apiUrl);
  },
  publishLocalClients(token: string) {
    return adminFetch<{ published_count: number; clients: string[] }>("/admin/client-registry/publish-local", token, { method: "POST" });
  },
  updateClientConfig(
    token: string,
    clientSlug: string,
    body: { allowed_origins?: string[]; enabled?: boolean; rate_limit_per_minute?: number },
  ) {
    return adminFetch<{ config: ClientDetail["config"] }>(`/admin/clients/${clientSlug}/config`, token, {
      method: "PATCH",
      body: JSON.stringify(body),
    });
  },
  getUsage(token: string, clientSlug: string) {
    return adminFetch<ClientUsage>(`/admin/clients/${clientSlug}/usage`, token);
  },
  listUsers(token: string) {
    return adminFetch<{ users: AppUser[] }>("/admin/users", token);
  },
  upsertUser(token: string, body: UpsertAppUser) {
    return adminFetch<{ user: AppUser }>("/admin/users", token, {
      method: "POST",
      body: JSON.stringify(body),
    });
  },
};
