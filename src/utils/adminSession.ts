export const ADMIN_TOKEN_STORAGE_KEY = "piroxeno_admin_session_token";
export const ADMIN_USER_STORAGE_KEY = "piroxeno_admin_session_user";

export type AdminSessionUser = {
  id?: string;
  email: string;
  role: "admin" | "user";
  client_slug: string | null;
  is_active?: boolean;
};

export function getAdminToken() {
  return sessionStorage.getItem(ADMIN_TOKEN_STORAGE_KEY) || "";
}

export function getAdminUser(): AdminSessionUser | null {
  const raw = sessionStorage.getItem(ADMIN_USER_STORAGE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as AdminSessionUser;
  } catch {
    clearAdminToken();
    return null;
  }
}

export function setAdminSession(token: string, user: AdminSessionUser) {
  sessionStorage.setItem(ADMIN_TOKEN_STORAGE_KEY, token);
  sessionStorage.setItem(ADMIN_USER_STORAGE_KEY, JSON.stringify(user));
}

export function clearAdminToken() {
  sessionStorage.removeItem(ADMIN_TOKEN_STORAGE_KEY);
  sessionStorage.removeItem(ADMIN_USER_STORAGE_KEY);
}
