export const ADMIN_TOKEN_STORAGE_KEY = "piroxeno_admin_token";

export function getAdminToken() {
  return sessionStorage.getItem(ADMIN_TOKEN_STORAGE_KEY) || "";
}

export function setAdminToken(token: string) {
  sessionStorage.setItem(ADMIN_TOKEN_STORAGE_KEY, token);
}

export function clearAdminToken() {
  sessionStorage.removeItem(ADMIN_TOKEN_STORAGE_KEY);
}
