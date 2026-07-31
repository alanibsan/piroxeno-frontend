import { Link } from "react-router-dom";
import {
  Bot,
  BrainCircuit,
  CalendarCheck,
  CheckCircle2,
  Globe2,
  MessageSquareText,
  MousePointerClick,
  Sparkles,
  Zap,
} from "lucide-react";
import { useLang } from "../utils/i18n";

export default function WebBot() {
  const lang = useLang();
  const requestDemoPath = `/${lang}/request-demo`;
  const t = {
    titleStart: lang === "es" ? "Convierte tu sitio web en un " : "Turn your website into a ",
    titleHighlight: lang === "es" ? "asistente de IA 24/7" : "24/7 AI assistant",
    subtitle:
      lang === "es"
        ? "El Web Bot de Piroxeno responde preguntas, captura leads y ayuda a tus visitantes al instante usando IA entrenada con los datos de tu negocio."
        : "The Piroxeno Web Bot answers questions, captures leads and helps your visitors instantly using AI trained on your own business data.",
    cta: lang === "es" ? "Solicitar demo" : "Request Demo",
    chat: lang === "es"
      ? [
          "Hola, se integran con WhatsApp?",
          "Sí. Piroxeno se conecta con WhatsApp, chat web y sistemas internos para automatizar soporte y captura de leads.",
          "¿Puede agendar reuniones?",
          "Claro. Puede agendar demos, responder FAQs y calificar leads.",
        ]
      : [
          "Hi, do you integrate with WhatsApp?",
          "Yes. Piroxeno connects with WhatsApp, web chat and internal systems to automate support and lead capture.",
          "Can it schedule meetings?",
          "Absolutely. It can book demos, answer FAQs and qualify leads.",
        ],
    howTitle: lang === "es" ? "Cómo funciona el Web Bot" : "How the Web Bot works",
    steps: lang === "es"
      ? [
          {
            title: "Entrenar",
            text: "Sube tu documentación, FAQs y datos del sitio web para entrenar la IA.",
          },
          {
            title: "Publicar",
            text: "Agrega un script simple a tu sitio web y lanza al instante.",
          },
          {
            title: "Automatizar",
            text: "La IA atiende preguntas, captura leads y da soporte a clientes.",
          },
        ]
      : [
          {
            title: "Train",
            text: "Upload your documentation, FAQs and website data to train the AI.",
          },
          {
            title: "Deploy",
            text: "Add a simple script to your website and launch instantly.",
          },
          {
            title: "Automate",
            text: "The AI handles questions, captures leads and supports customers.",
          },
        ],
    featuresTitle: lang === "es" ? "Lo que puede hacer el Web Bot" : "What the Web Bot can do",
    features: lang === "es"
      ? [
          {
            title: "Responder preguntas de clientes",
            text: "Responde al instante usando IA entrenada con tu propia documentación.",
          },
          {
            title: "Capturar leads automáticamente",
            text: "Convierte conversaciones en leads calificados sin esfuerzo manual.",
          },
          {
            title: "Agendar reuniones",
            text: "Agenda demos directamente dentro del chat.",
          },
          {
            title: "Integrarse con tus herramientas",
            text: "Conecta CRM, sistemas de soporte y plataformas de mensajería.",
          },
        ]
      : [
          {
            title: "Answer customer questions",
            text: "Instantly respond to visitors using AI trained on your own documentation.",
          },
          {
            title: "Capture leads automatically",
            text: "Turn conversations into qualified leads without manual effort.",
          },
          {
            title: "Book meetings",
            text: "Schedule demos directly inside the chat.",
          },
          {
            title: "Integrate with your tools",
            text: "Connect CRM, support systems and messaging platforms.",
          },
        ],
    finalTitle:
      lang === "es" ? "Empieza a capturar leads hoy" : "Start capturing leads today",
  };

  const stepIcons = [BrainCircuit, Globe2, Zap];
  const featureIcons = [
    MessageSquareText,
    MousePointerClick,
    CalendarCheck,
    Bot,
  ];

  return (
    <div className="min-h-screen overflow-hidden bg-[#050711] pt-32 text-white">
      <section className="relative px-6 pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(0,204,153,0.24),transparent_30%),radial-gradient(circle_at_82%_18%,rgba(86,116,255,0.2),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.06)_0_1px,transparent_1px)] bg-[length:auto,auto,44px_44px]"></div>

        <div className="relative mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1fr_1fr]">
          <div className="text-center lg:text-left">
            <div className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm font-semibold text-emerald-100 backdrop-blur lg:mx-0">
              <Sparkles className="h-4 w-4 text-[var(--color-primary)]" />
              Website AI assistant
            </div>

            <h1 className="mb-6 text-5xl font-bold leading-tight md:text-6xl">
              {t.titleStart}
              <span className="bg-gradient-to-r from-[var(--color-primary)] via-cyan-200 to-indigo-300 bg-clip-text text-transparent">
                {t.titleHighlight}
              </span>
            </h1>

            <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-300 lg:mx-0">
              {t.subtitle}
            </p>

            <Link
              to={requestDemoPath}
              className="inline-flex items-center gap-2 rounded-2xl bg-[var(--color-primary)] px-8 py-4 text-lg font-semibold text-slate-950 shadow-[0_0_36px_rgba(0,204,153,0.25)] transition hover:-translate-y-0.5 hover:bg-emerald-300"
            >
              <MousePointerClick className="h-5 w-5" />
              {t.cta}
            </Link>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-[var(--color-primary)]/24 via-cyan-400/10 to-indigo-500/24 blur-2xl"></div>
            <div className="relative overflow-hidden rounded-[1.75rem] border border-white/12 bg-slate-950/80 p-5 shadow-2xl backdrop-blur">
              <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-400/80"></span>
                  <span className="h-3 w-3 rounded-full bg-amber-300/80"></span>
                  <span className="h-3 w-3 rounded-full bg-[var(--color-primary)]"></span>
                </div>
                <div className="rounded-full border border-white/10 bg-white/8 px-3 py-1 text-xs text-slate-300">
                  piroxeno.com
                </div>
              </div>

              <div className="grid gap-4 lg:grid-cols-[1fr_0.86fr]">
                <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-4">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-primary)]/12 text-[var(--color-primary)]">
                      <Bot className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Web Bot</p>
                      <p className="text-xs text-slate-400">AI trained on your site</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {t.chat.map((message, index) => (
                      <div
                        key={message}
                        className={
                          index % 2 === 0
                            ? "w-fit max-w-[92%] rounded-2xl border border-white/10 bg-black/20 p-3 text-sm text-slate-100"
                            : "ml-auto w-fit max-w-[92%] rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-emerald-500 p-3 text-sm text-white"
                        }
                      >
                        {message}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    ["Intent match", "94%"],
                    ["Lead score", "82%"],
                    ["Handoff risk", "low"],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="rounded-2xl border border-white/10 bg-white/[0.055] p-4"
                    >
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="text-slate-300">{label}</span>
                        <span className="font-mono text-[var(--color-primary)]">
                          {value}
                        </span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-white/10">
                        <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-[var(--color-primary)] to-cyan-300"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="mb-16 text-center text-3xl font-bold">{t.howTitle}</h2>

        <div className="grid gap-6 text-left md:grid-cols-3">
          {t.steps.map((step, index) => {
            const Icon = stepIcons[index];
            return (
            <div
              key={step.title}
              className="rounded-3xl border border-white/10 bg-white/[0.055] p-8 shadow-xl shadow-black/20 backdrop-blur"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-primary)]/12 text-[var(--color-primary)]">
                <Icon className="h-6 w-6" />
              </div>
              <div className="mb-3 font-mono text-sm text-[var(--color-primary)]">
                0{index + 1}
              </div>
              <h3 className="mb-3 text-xl font-semibold">{step.title}</h3>
              <p className="text-slate-400">{step.text}</p>
            </div>
          )})}
        </div>
      </section>

      <section className="relative py-24">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0),rgba(15,23,42,0.78),rgba(5,7,17,0))]"></div>
        <div className="relative mx-auto max-w-6xl px-6">
          <h2 className="mb-16 text-center text-3xl font-bold">
            {t.featuresTitle}
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            {t.features.map((feature, index) => {
              const Icon = featureIcons[index];
              return (
              <div
                className="rounded-3xl border border-white/10 bg-white/[0.055] p-8 shadow-xl shadow-black/20 backdrop-blur transition hover:-translate-y-1 hover:border-[var(--color-primary)]/35"
                key={feature.title}
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-primary)]/12 text-[var(--color-primary)]">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                <p className="text-slate-400">{feature.text}</p>
              </div>
            )})}
          </div>
        </div>
      </section>

      <section className="relative px-6 py-24 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(0,204,153,0.18),transparent_34%)]"></div>
        <div className="relative">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-primary)]/12 text-[var(--color-primary)]">
            <CheckCircle2 className="h-7 w-7" />
          </div>
          <h2 className="mb-6 text-3xl font-bold">{t.finalTitle}</h2>

          <Link
            to={requestDemoPath}
            className="inline-flex items-center gap-2 rounded-2xl bg-[var(--color-primary)] px-8 py-4 text-lg font-semibold text-slate-950 shadow-[0_0_36px_rgba(0,204,153,0.25)] transition hover:bg-emerald-300"
          >
            <Zap className="h-5 w-5" />
            {t.cta}
          </Link>
        </div>
      </section>
    </div>
  );
}
