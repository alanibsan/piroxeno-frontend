import { useLocation } from "react-router-dom";

export type Lang = "en" | "es";

export function useLang(): Lang {
  const { pathname } = useLocation();
  return pathname.startsWith("/en") ? "en" : "es";
}
