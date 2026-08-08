import fondo from "../assets/fondito.png";
import logoBlanco from "../assets/partners/LOGO_BLANCO.png";
import recreaLogo from "../assets/partners/recrea.jpg";
import rockinRobinLogo from "../assets/partners/rockinrobin.png";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DemoEmailInput from "../components/DemoEmailInput";
import {
  BrainCircuit,
  CalendarCheck,
  MessageCircle,
  Sparkle,
} from "lucide-react";
import { useLang } from "../utils/i18n";

export default function Landing() {
  const lang = useLang();
  const [wordIndex, setWordIndex] = useState(0);
  const [featureIndex, setFeatureIndex] = useState(0);

  const t = {
    heroTop:
      lang === "es"
        ? "No hagas esperar a tus clientes. Responde al instante."
        : "Don't keep your customers waiting. Answer instantly.",

    heroTitleStart: lang === "es" ? "Convierte tu" : "Turn your",

    heroTitleEnd:
      lang === "es" ? "en un asistente 24/7" : "into a 24/7 assistant",

    secondHeroTop:
      lang === "es"
        ? "La mitad de las llamadas y consultas nunca son contestadas."
        : "Half of all calls and inquiries are never answered.",

    secondHeroText:
      lang === "es"
        ? "Convierte cada llamada, conversación o chat en una interacción valiosa. Piroxeno responde al instante y no pierde"
        : "Turn every call, conversation or chat into a valuable interaction. Piroxeno answers instantly and never misses a",
    featuresTitle:
      lang === "es"
        ? "Lo que tu asistente puede hacer"
        : "What your AI assistant can do",

    finalTitle:
      lang === "es"
        ? "Ahorra tiempo, dinero y oportunidades perdidas."
        : "Start saving time, money and missed opportunities with AI.",

    finalSubtitle:
      lang === "es" ? "En vivo la próxima semana." : "Go live next week.",

    cta: lang === "es" ? "Agendar demo" : "Request Demo",
    captured: lang === "es" ? "Más leads capturados" : "More leads captured",
    usageBased: lang === "es" ? "Pagas según tu uso" : "Pay based on usage",
    sleepMode:
      lang === "es" ? "Trabaja mientras duermes" : "Works while you sleep",
    demoTitle:
      lang === "es" ? (
        <>
          Mira <span className="text-[var(--color-primary)]">piroxeno</span> en
          acción
        </>
      ) : (
        <>
          See <span className="text-[var(--color-primary)]">piroxeno</span> in
          action
        </>
      ),
    demoSubtitle:
      lang === "es"
        ? "Tu asistente de IA responde a tus clientes al instante."
        : "Your AI assistant answers customers instantly.",
    partnersLabel:
      lang === "es"
        ? "Clientes que ya confían en Piroxeno"
        : "Clients already trusting Piroxeno",
    chat1:
      lang === "es"
        ? "Hola, ¿aceptan seguro MAPFRE?"
        : "Hi, do you take MAPFRE insurance?",
    chat2:
      lang === "es"
        ? "Sí, aceptamos MAPFRE y varios proveedores más. Si quieres, puedo ayudarte a revisar cobertura o agendar una cita."
        : "Yes, we accept MAPFRE as well as several other providers. If you'd like, I can help you check coverage or schedule an appointment.",
    chat3:
      lang === "es"
        ? "Perfecto. Quiero agendar una cita."
        : "Nice. I would like to schedule an appointment.",
    chat4:
      lang === "es"
        ? "Claro. ¿Estás disponible el próximo jueves a las 3:00 PM?"
        : "Of course. Are you available next Thursday at 3:00 PM?",
    chat5:
      lang === "es"
        ? "Sí, me funciona."
        : "Yes, that works for me.",
    steps:
      lang === "es"
        ? [
            {
              title: "Demo",
              text: "Entendemos tus necesidades y te mostramos cómo Piroxeno puede ayudarte.",
            },
            {
              title: "Entrenar",
              text: "Tu asistente de IA aprende de tus datos y flujos de trabajo.",
            },
            {
              title: "Lanzar",
              text: "Agrega un pequeño script a tu sitio y empieza a operar al instante.",
            },
          ]
        : [
            {
              title: "Demo",
              text: "We understand your needs, then show you how Piroxeno can help.",
            },
            {
              title: "Train",
              text: "Your AI assistant learns from your own data and workflows.",
            },
            {
              title: "Launch",
              text: "Add a small script to your site and go live instantly.",
            },
          ],
  };

  const rotatingWords =
    lang === "es"
      ? ["oportunidades", "leads", "citas", "clientes", "ventas"]
      : ["question", "lead", "booking", "client", "sale"];

  const rotatingWordsHeader =
    lang === "es"
      ? ["negocio", "sitio web", "clínica", "WhatsApp", "portal"]
      : ["business", "website", "clinic", "WhatsApp", "portal"];

  const features =
    lang === "es"
      ? [
          "Responde preguntas al instante",
          "Captura leads automáticamente",
          "Agenda citas 24/7",
          "Integra con WhatsApp",
          "Detecta objeciones del cliente",
          "Entiende por qué los usuarios se van",
        ]
      : [
          "Answer customer questions instantly",
          "Capture leads automatically",
          "Book meetings 24/7",
          "Integrate with WhatsApp",
          "Measure customer sentiment and objections",
          "Provide insights on what visitors want and why they leave",
        ];

  const partners = [
    {
      name: "Piroxeno partner",
      logo: logoBlanco,
      className: "h-20 w-auto object-contain",
    },
    {
      name: "Recrea",
      logo: recreaLogo,
      className: "h-16 w-auto object-contain",
    },
    {
      name: "Rockin Robin",
      logo: rockinRobinLogo,
      className: "h-14 w-auto object-contain",
    },
  ];

  const featureCards =
    lang === "es"
      ? [
          {
            icon: MessageCircle,
            title: "Responde con contexto",
            text: "Resuelve dudas, filtra intención y mantiene el tono de tu marca en cada conversación.",
          },
          {
            icon: CalendarCheck,
            title: "Convierte demanda en citas",
            text: "Captura datos, propone horarios y empuja el siguiente paso sin fricción.",
          },
          {
            icon: BrainCircuit,
            title: "Aprende de tus flujos",
            text: "Entrena con tu web, documentos y procesos para operar como parte del equipo.",
          },
        ]
      : [
          {
            icon: MessageCircle,
            title: "Answer with context",
            text: "Resolve questions, detect intent and keep your brand tone across every conversation.",
          },
          {
            icon: CalendarCheck,
            title: "Turn demand into bookings",
            text: "Capture details, propose times and move customers to the next step without friction.",
          },
          {
            icon: BrainCircuit,
            title: "Learn your workflows",
            text: "Train on your website, docs and processes so the assistant operates like part of the team.",
          },
        ];

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [rotatingWords.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setFeatureIndex((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <div className="min-h-screen overflow-hidden bg-[#050711] text-white">
      {/* HERO */}
      <section
        className="relative px-6 pb-24 pt-32 md:pb-32 md:pt-40"
        style={{
          backgroundImage: `url(${fondo})`,
          backgroundPosition: "center 30%",
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 bg-[#050711]/88"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,204,153,0.28),transparent_32%),radial-gradient(circle_at_82%_24%,rgba(86,116,255,0.22),transparent_30%),linear-gradient(135deg,rgba(255,255,255,0.08)_0_1px,transparent_1px)] bg-[length:auto,auto,42px_42px]"></div>
        <div className="absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-[var(--color-primary)]/18 blur-3xl"></div>

        <div className="relative z-10 mx-auto max-w-5xl">
          <div className="text-center lg:text-left">
            <h2 className="text-lg text-emerald-100/85 md:text-2xl">
              {t.heroTop}
            </h2>

            <h1 className="mx-auto mt-5 max-w-5xl text-5xl font-bold leading-[0.95] tracking-normal md:text-7xl lg:mx-0">
              {t.heroTitleStart}{" "}
              <span className="bg-gradient-to-r from-[var(--color-primary)] via-cyan-200 to-indigo-300 bg-clip-text text-transparent">
                {rotatingWordsHeader[wordIndex]}
              </span>{" "}
              {t.heroTitleEnd}
            </h1>

            <div className="mt-8 grid gap-3 text-left sm:grid-cols-3">
              {[
                ["3.4x", t.captured],
                ["Uso", t.usageBased],
                ["24/7", t.sleepMode],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur"
                >
                  <div className="text-2xl font-bold text-white">{value}</div>
                  <div className="mt-1 text-sm text-slate-300">{label}</div>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <DemoEmailInput />
            </div>
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section className="relative px-6 py-16">
        <div className="absolute inset-x-0 top-0 mx-auto h-px max-w-6xl bg-gradient-to-r from-transparent via-white/15 to-transparent"></div>
        <div className="mx-auto max-w-6xl">
          <p className="text-center text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">
            {t.partnersLabel}
          </p>

          <div className="relative mt-10 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.045] py-6 shadow-2xl shadow-black/20 backdrop-blur">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[#050711] to-transparent"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[#050711] to-transparent"></div>
            <div className="partner-carousel flex w-max items-center gap-5">
              {[...partners, ...partners].map((partner, index) => (
                <div
                  key={`${partner.name}-${index}`}
                  className="flex h-28 w-48 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-slate-950/50 px-6"
                  aria-hidden={index >= partners.length}
                >
                  <img
                    src={partner.logo}
                    alt={index < partners.length ? partner.name : ""}
                    className={`${partner.className} max-w-full opacity-85 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0`}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECOND HERO */}
      <section className="relative px-6 py-20 text-center">
        <div className="absolute inset-x-0 top-0 mx-auto h-px max-w-6xl bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        <h2 className="mx-auto mt-8 max-w-3xl text-xl text-white md:text-4xl">
          {t.secondHeroTop}
        </h2>

        <h3 className="mx-auto mt-6 max-w-5xl text-xl text-slate-300 md:text-2xl">
          {t.secondHeroText}{" "}
          <span className="font-bold text-[var(--color-primary)]">
            {rotatingWords[wordIndex]}
          </span>
        </h3>
      </section>

      {/* PRODUCT DEMO */}
      <section className="relative px-6 py-24 text-white">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0),rgba(15,23,42,0.82)_30%,rgba(5,7,17,1))]"></div>
        <div className="relative mx-auto mb-16 max-w-4xl text-center">
          <h3 className="text-4xl font-bold">{t.demoTitle}</h3>

          <p className="mt-4 text-slate-400">{t.demoSubtitle}</p>
        </div>

        <div className="relative mx-auto max-w-3xl rounded-[1.75rem] border border-white/12 bg-slate-950/80 p-4 shadow-[0_30px_100px_rgba(0,0,0,0.45)] backdrop-blur md:p-8">
          <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <MessageCircle className="h-4 w-4 text-[var(--color-primary)]" />
              Piroxeno conversation
            </div>
            <span className="rounded-full bg-[var(--color-primary)]/12 px-3 py-1 text-xs text-emerald-100">
              AI active
            </span>
          </div>

          <div className="ml-auto w-fit max-w-[86%] rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-emerald-500 p-3 text-white shadow-lg shadow-emerald-950/30">
            {t.chat1}
          </div>

          <div className="relative mt-4 w-fit max-w-[88%] rounded-2xl border border-white/10 bg-white/[0.07] p-3 text-slate-100">
            {t.chat2}
            <Sparkle className="absolute -bottom-2 left-2 h-4 w-4 text-[var(--color-primary)] opacity-80" />
          </div>

          <div className="ml-auto mt-4 w-fit max-w-[86%] rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-emerald-500 p-3 text-white shadow-lg shadow-emerald-950/30">
            {t.chat3}
          </div>

          <div className="relative mt-4 w-fit max-w-[88%] rounded-2xl border border-white/10 bg-white/[0.07] p-3 text-slate-100">
            {t.chat4}
            <Sparkle className="absolute -bottom-2 left-2 h-4 w-4 text-[var(--color-primary)] opacity-80" />
          </div>

          <div className="ml-auto mt-4 w-fit max-w-[86%] rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-emerald-500 p-3 text-white shadow-lg shadow-emerald-950/30">
            {t.chat5}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="px-6 py-24 text-center">
        <h3 className="mb-12 text-4xl font-bold">{t.featuresTitle}</h3>

        <div className="text-4xl font-semibold text-[var(--color-primary)]">
          {features[featureIndex]}
        </div>

        <div className="mx-auto mt-12 grid max-w-6xl gap-5 text-left md:grid-cols-3">
          {featureCards.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-3xl border border-white/10 bg-white/[0.055] p-6 shadow-xl shadow-black/20 transition hover:-translate-y-1 hover:border-[var(--color-primary)]/35 hover:bg-white/[0.075]"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-primary)]/12 text-[var(--color-primary)]">
                <Icon className="h-6 w-6" />
              </div>
              <h4 className="text-xl font-semibold text-white">{title}</h4>
              <p className="mt-3 text-slate-400">{text}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-16 grid max-w-6xl gap-10 text-center md:grid-cols-3">
          {t.steps.map((step, index) => (
            <div key={step.title} className="relative">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--color-primary)]/35 bg-[var(--color-primary)]/10 text-2xl font-bold text-[var(--color-primary)]">
                0{index + 1}
              </div>
              <h4 className="mb-2 text-xl font-semibold">{step.title}</h4>
              <p className="text-slate-400">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative px-6 py-32 text-center text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,204,153,0.22),transparent_35%),linear-gradient(180deg,#050711,#0f172a)]"></div>
        <div className="relative mx-auto max-w-4xl">
          <h3 className="mb-6 text-4xl font-bold">{t.finalTitle}</h3>

          <p className="mb-10 text-slate-400">{t.finalSubtitle}</p>

          <Link
            to={`/${lang}/request-demo`}
            className="inline-flex items-center gap-2 rounded-2xl bg-[var(--color-primary)] px-10 py-4 text-lg font-semibold text-slate-950 shadow-[0_0_42px_rgba(0,204,153,0.3)] transition hover:-translate-y-0.5 hover:bg-emerald-300"
          >
            <Sparkle className="h-5 w-5" />
            {t.cta}
          </Link>
        </div>
      </section>
    </div>
  );
}
