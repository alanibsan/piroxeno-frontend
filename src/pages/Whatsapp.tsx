import { Link } from "react-router-dom";
import {
  Bot,
  CalendarCheck,
  CheckCircle2,
  MessageCircle,
  Send,
  Sparkles,
  Zap,
} from "lucide-react";
import { useLang } from "../utils/i18n";

export default function WhatsAppBot() {
  const lang = useLang();
  const requestDemoPath = `/${lang}/request-demo`;
  const t = {
    titleStart: lang === "es" ? "Tu " : "Your ",
    titleHighlight: lang === "es" ? "asistente de IA" : "AI assistant",
    titleEnd: lang === "es" ? " para WhatsApp" : " for WhatsApp",
    subtitle:
      lang === "es"
        ? "Automatiza conversaciones, agenda citas y resuelve preguntas de clientes al instante con un asistente de IA integrado directamente en WhatsApp."
        : "Automate conversations, schedule appointments and resolve customer questions instantly using an AI assistant integrated directly into WhatsApp.",
    cta: lang === "es" ? "Solicitar demo" : "Request Demo",
    chat:
      lang === "es"
        ? [
            "Hola, quiero agendar una cita.",
            "Claro. ¿Qué día te funciona mejor?",
            "Mañana por la tarde.",
            "Perfecto. Te agendé mañana a las 3:00 PM. Recibirás una confirmación pronto.",
          ]
        : [
            "Hi, I'd like to book an appointment.",
            "Sure! What day works best for you?",
            "Tomorrow afternoon.",
            "Perfect. I scheduled you for 3:00 PM tomorrow. You'll receive a confirmation shortly.",
          ],
    useCasesTitle:
      lang === "es"
        ? "Lo que puede hacer el WhatsApp Bot"
        : "What the WhatsApp Bot can do",
    useCases:
      lang === "es"
        ? [
            {
              title: "Agendar citas",
              text: "Agenda reuniones, consultas o reservaciones automáticamente desde WhatsApp.",
            },
            {
              title: "Responder preguntas de clientes",
              text: "Da respuestas instantáneas a FAQs usando IA entrenada con los datos de tu negocio.",
            },
            {
              title: "Asistente personal de IA",
              text: "Actúa como un asistente inteligente que ayuda a clientes, captura leads y gestiona solicitudes.",
            },
          ]
        : [
            {
              title: "Schedule appointments",
              text: "Automatically book meetings, consultations or reservations directly through WhatsApp.",
            },
            {
              title: "Answer customer questions",
              text: "Provide instant answers to FAQs using AI trained on your own business data.",
            },
            {
              title: "Personal AI assistant",
              text: "Act as a smart assistant that helps customers, captures leads and manages requests.",
            },
          ],
    howTitle: lang === "es" ? "Cómo funciona" : "How it works",
    steps:
      lang === "es"
        ? [
            {
              title: "Conecta WhatsApp",
              text: "Integra tu cuenta de WhatsApp Business con Piroxeno.",
            },
            {
              title: "Entrena la IA",
              text: "Proporciona información del negocio, FAQs y reglas de agenda.",
            },
            {
              title: "Empieza a automatizar",
              text: "La IA gestiona conversaciones, agenda citas y asiste a clientes.",
            },
          ]
        : [
            {
              title: "Connect WhatsApp",
              text: "Integrate your WhatsApp Business account with Piroxeno.",
            },
            {
              title: "Train the AI",
              text: "Provide your business information, FAQs and scheduling rules.",
            },
            {
              title: "Start automating",
              text: "The AI handles conversations, books appointments and assists customers.",
            },
          ],
    finalTitle:
      lang === "es"
        ? "Deja que la IA gestione tus conversaciones de WhatsApp"
        : "Let AI manage your WhatsApp conversations",
  };

  const useCaseIcons = [CalendarCheck, MessageCircle, Bot];

  return (
    <div className="min-h-screen overflow-hidden bg-[#050711] pt-32 text-white">
      <section className="relative px-6 pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_10%,rgba(0,204,153,0.24),transparent_30%),radial-gradient(circle_at_82%_20%,rgba(86,116,255,0.18),transparent_30%),linear-gradient(135deg,rgba(255,255,255,0.06)_0_1px,transparent_1px)] bg-[length:auto,auto,44px_44px]"></div>

        <div className="relative mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="text-center lg:text-left">
            <div className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm font-semibold text-emerald-100 backdrop-blur lg:mx-0">
              <Sparkles className="h-4 w-4 text-[var(--color-primary)]" />
              WhatsApp AI automation
            </div>

            <h1 className="mb-6 text-5xl font-bold leading-tight md:text-6xl">
              {t.titleStart}
              <span className="bg-gradient-to-r from-[var(--color-primary)] via-cyan-200 to-indigo-300 bg-clip-text text-transparent">
                {t.titleHighlight}
              </span>
              {t.titleEnd}
            </h1>

            <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-300 lg:mx-0">
              {t.subtitle}
            </p>

            <Link
              to={requestDemoPath}
              className="inline-flex items-center gap-2 rounded-2xl bg-[var(--color-primary)] px-8 py-4 text-lg font-semibold text-slate-950 shadow-[0_0_36px_rgba(0,204,153,0.25)] transition hover:-translate-y-0.5 hover:bg-emerald-300"
            >
              <Send className="h-5 w-5" />
              {t.cta}
            </Link>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-[var(--color-primary)]/26 via-cyan-400/10 to-indigo-500/22 blur-2xl"></div>
            <div className="relative rounded-[1.75rem] border border-white/12 bg-slate-950/80 p-5 shadow-2xl backdrop-blur">
              <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--color-primary)]/13 text-[var(--color-primary)]">
                    <MessageCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">WhatsApp Bot</p>
                    <p className="text-xs text-emerald-200/75">AI active</p>
                  </div>
                </div>
                <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs text-emerald-100">
                  online
                </span>
              </div>

              <div className="space-y-4">
                {t.chat.map((message, index) => (
                  <div
                    key={message}
                    className={
                      index % 2 === 0
                        ? "w-fit max-w-[86%] rounded-2xl border border-white/10 bg-white/[0.07] p-4 text-slate-100"
                        : "ml-auto w-fit max-w-[86%] rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-emerald-500 p-4 text-white shadow-lg shadow-emerald-950/30"
                    }
                  >
                    {message}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="mb-16 text-center text-3xl font-bold">
          {t.useCasesTitle}
        </h2>

        <div className="grid gap-6 text-left md:grid-cols-3">
          {t.useCases.map((useCase, index) => {
            const Icon = useCaseIcons[index];
            return (
            <div
              className="rounded-3xl border border-white/10 bg-white/[0.055] p-8 shadow-xl shadow-black/20 backdrop-blur transition hover:-translate-y-1 hover:border-[var(--color-primary)]/35"
              key={useCase.title}
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-primary)]/12 text-[var(--color-primary)]">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-semibold">{useCase.title}</h3>
              <p className="text-slate-400">{useCase.text}</p>
            </div>
          )})}
        </div>
      </section>

      <section className="relative py-24">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0),rgba(15,23,42,0.78),rgba(5,7,17,0))]"></div>
        <div className="relative mx-auto max-w-6xl px-6">
          <h2 className="mb-16 text-center text-3xl font-bold">{t.howTitle}</h2>

          <div className="grid gap-12 text-center md:grid-cols-3">
            {t.steps.map((step, index) => (
              <div key={step.title}>
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--color-primary)]/35 bg-[var(--color-primary)]/10 text-2xl font-bold text-[var(--color-primary)]">
                  0{index + 1}
                </div>
                <h3 className="mb-3 text-xl font-semibold">{step.title}</h3>
                <p className="text-slate-400">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-6 py-24 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(0,204,153,0.18),transparent_34%)]"></div>
        <div className="relative">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-primary)]/12 text-[var(--color-primary)]">
            <Zap className="h-7 w-7" />
          </div>
          <h2 className="mb-6 text-3xl font-bold">{t.finalTitle}</h2>

          <Link
            to={requestDemoPath}
            className="inline-flex items-center gap-2 rounded-2xl bg-[var(--color-primary)] px-8 py-4 text-lg font-semibold text-slate-950 shadow-[0_0_36px_rgba(0,204,153,0.25)] transition hover:bg-emerald-300"
          >
            <CheckCircle2 className="h-5 w-5" />
            {t.cta}
          </Link>
        </div>
      </section>
    </div>
  );
}
