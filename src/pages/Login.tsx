import { useLang } from "../utils/i18n";

export default function Login() {
  const lang = useLang();

  return (
    <div className="min-h-screen bg-white pt-32 px-6 text-center">
      {lang === "es" ? "Página de inicio de sesión" : "Login Page"}
    </div>
  );
}
