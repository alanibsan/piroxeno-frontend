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

async function adminFetch<T>(path: string, token: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
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
