import { useState } from "react";
import type { FormEvent } from "react";
import { useLang } from "../utils/i18n";

export default function DemoEmailInput() {
  const lang = useLang();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const t = {
    placeholder:
      lang === "es" ? "Ingresa tu email de trabajo" : "Enter a business email",
    loading: lang === "es" ? "Enviando..." : "Sending...",
    button: lang === "es" ? "Obtener demo" : "Get a demo",
    success:
      lang === "es"
        ? "Gracias. Te contactaremos pronto."
        : "Thanks. We'll contact you soon.",
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch("https://api.piroxeno.com/request-demo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          source: "landing"
        })
      });

      setSuccess(true);
      setEmail("");
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto mt-10 w-full max-w-xl lg:mx-0">
      <div className="flex flex-col overflow-hidden rounded-2xl border border-white/14 bg-white/[0.08] shadow-[0_18px_70px_rgba(0,0,0,0.22)] backdrop-blur transition focus-within:border-[var(--color-primary)]/60 focus-within:ring-2 focus-within:ring-[var(--color-primary)]/25 sm:flex-row">
        
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t.placeholder}
          className="min-w-0 flex-1 bg-transparent px-6 py-4 text-white placeholder:text-slate-400 focus:outline-none"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-[var(--color-primary)] px-6 py-4 font-semibold text-slate-950 transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? t.loading : t.button}
        </button>
      </div>

      {success && (
        <p className="mt-3 text-center text-sm text-emerald-300 lg:text-left">
          {t.success}
        </p>
      )}
    </form>
  );
}
