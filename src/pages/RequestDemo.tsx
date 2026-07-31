import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { CheckCircle2, Send, Sparkles } from "lucide-react";
import { useLang } from "../utils/i18n";

export default function RequestDemo() {
  const lang = useLang();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    jobTitle: "",
    company: ""
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const t = {
    title:
      lang === "es"
        ? "Mira cómo PIROXENO convierte tu negocio en un asistente inteligente"
        : "See how PIROXENO turns your business into an intelligent assistant",
    subtitle:
      lang === "es"
        ? "Descubre cómo un asistente de IA entrenado con los datos de tu negocio puede capturar leads, responder preguntas y atender clientes automáticamente."
        : "Discover how AI agents trained on your own business data can capture leads, answer questions and support customers automatically.",
    bullets:
      lang === "es"
        ? [
            "Entender tus flujos actuales de experiencia del cliente y soporte",
            "Identificar oportunidades donde agentes de IA pueden automatizar interacciones",
            "Recibir una configuración a la medida basada en tu sitio web y datos de negocio",
            "Obtener una proyección personalizada de ROI para tu equipo",
          ]
        : [
            "Understand your current CX and support workflows",
            "Identify opportunities where AI agents can automate interactions",
            "Get a tailored setup based on your website and business data",
            "Receive a custom ROI projection for your team",
          ],
    successTitle:
      lang === "es"
        ? "Demo solicitada correctamente"
        : "Demo requested successfully",
    successText:
      lang === "es"
        ? "Nuestro equipo te contactará pronto para agendar tu demo."
        : "Our team will contact you shortly to schedule your demo.",
    firstName: lang === "es" ? "Nombre" : "First Name",
    lastName: lang === "es" ? "Apellido" : "Last Name",
    phone: lang === "es" ? "Teléfono" : "Phone Number",
    email: lang === "es" ? "Email de trabajo" : "Work Email",
    jobTitle: lang === "es" ? "Cargo" : "Job Title",
    company: lang === "es" ? "Nombre de la empresa" : "Company Name",
    submitting: lang === "es" ? "Enviando..." : "Submitting...",
    submit: lang === "es" ? "Solicitar demo" : "Request Demo",
    badge: lang === "es" ? "Demo personalizada" : "Personalized demo",
    formTitle: lang === "es" ? "Cuéntanos de tu negocio" : "Tell us about your business",
    formSubtitle:
      lang === "es"
        ? "Te contactamos para revisar tu caso y armar una demo con tus flujos reales."
        : "We will contact you to review your use case and prepare a demo around your real workflows.",
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    await fetch("https://api.piroxeno.com/request-demo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        first_name: form.firstName,
        last_name: form.lastName,
        phone: form.phone,
        email: form.email,
        job_title: form.jobTitle,
        company: form.company
      })
    });

    setLoading(false);
    setSuccess(true);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050711] px-6 pb-24 pt-32 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(0,204,153,0.24),transparent_30%),radial-gradient(circle_at_85%_18%,rgba(86,116,255,0.2),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.06)_0_1px,transparent_1px)] bg-[length:auto,auto,44px_44px]"></div>
      <div className="pointer-events-none absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-[var(--color-primary)]/16 blur-3xl"></div>

      <div className="relative mx-auto grid max-w-6xl gap-12 md:grid-cols-[0.95fr_1.05fr] md:items-start">
        <div className="pt-4">
          <div className="mb-6 flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm font-semibold text-emerald-100 backdrop-blur">
            <Sparkles className="h-4 w-4 text-[var(--color-primary)]" />
            {t.badge}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {t.title.split("PIROXENO")[0]}
            <span className="text-white">PIR</span><span className="text-[#00cc99]">OX</span><span className="text-white">ENO</span>
            {t.title.split("PIROXENO")[1]}
          </h1>

          <p className="mb-10 max-w-xl text-lg text-slate-300">
            {t.subtitle}
          </p>

          <div className="space-y-4">
            {t.bullets.map((bullet) => (
              <div
                className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.055] p-4 text-slate-300 backdrop-blur"
                key={bullet}
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-[var(--color-primary)]" />
                <p>{bullet}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-[var(--color-primary)]/24 via-cyan-400/10 to-indigo-500/20 blur-2xl"></div>
          <div className="relative overflow-hidden rounded-[1.75rem] border border-white/14 bg-slate-950/75 p-6 shadow-2xl backdrop-blur-xl md:p-8">
            <div className="mb-8 border-b border-white/10 pb-6">
              <h2 className="text-2xl font-semibold text-white">{t.formTitle}</h2>
              <p className="mt-2 text-sm text-slate-400">{t.formSubtitle}</p>
            </div>

            {success ? (
              <div className="py-10 text-center">
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-primary)]/12 text-[var(--color-primary)]">
                  <CheckCircle2 className="h-7 w-7" />
                </div>

                <h2 className="mb-4 text-2xl font-semibold text-[var(--color-primary)]">
                  {t.successTitle}
                </h2>

                <p className="text-slate-300">
                  {t.successText}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    name="firstName"
                    placeholder={t.firstName}
                    onChange={handleChange}
                    required
                    className="rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-[var(--color-primary)]/60 focus:ring-2 focus:ring-[var(--color-primary)]/20"
                  />

                  <input
                    name="lastName"
                    placeholder={t.lastName}
                    onChange={handleChange}
                    required
                    className="rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-[var(--color-primary)]/60 focus:ring-2 focus:ring-[var(--color-primary)]/20"
                  />
                </div>

                <input
                  name="phone"
                  placeholder={t.phone}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-[var(--color-primary)]/60 focus:ring-2 focus:ring-[var(--color-primary)]/20"
                />

                <input
                  name="email"
                  type="email"
                  placeholder={t.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-[var(--color-primary)]/60 focus:ring-2 focus:ring-[var(--color-primary)]/20"
                />

                <input
                  name="jobTitle"
                  placeholder={t.jobTitle}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-[var(--color-primary)]/60 focus:ring-2 focus:ring-[var(--color-primary)]/20"
                />

                <input
                  name="company"
                  placeholder={t.company}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-[var(--color-primary)]/60 focus:ring-2 focus:ring-[var(--color-primary)]/20"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[var(--color-primary)] px-6 py-4 font-semibold text-slate-950 shadow-[0_0_34px_rgba(0,204,153,0.24)] transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? t.submitting : t.submit}
                  <Send className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
