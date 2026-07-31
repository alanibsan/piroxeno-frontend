import { Link } from "react-router-dom";
import { CheckCircle2, Sparkles, Zap } from "lucide-react";
import { useLang } from "../utils/i18n";

export default function Pricing() {
  const lang = useLang();
  const requestDemoPath = `/${lang}/request-demo`;
  const t = {
    titleStart:
      lang === "es" ? "Precios flexibles para " : "Flexible pricing for ",
    titleHighlight: lang === "es" ? "automatización con IA" : "AI automation",
    subtitle:
      lang === "es"
        ? "El precio depende del uso, integraciones y complejidad de tus flujos. Elige el plan que se ajuste a tus metas de automatización."
        : "Pricing depends on usage, integrations and the complexity of your workflows. Choose the plan that fits your automation goals.",
    mostPopular: lang === "es" ? "MÁS POPULAR" : "MOST POPULAR",
    requestInfo: lang === "es" ? "Solicitar información" : "Request information",
    contactSales: lang === "es" ? "Contactar ventas" : "Contact sales",
    footnote:
      lang === "es"
        ? "El precio depende del volumen de conversaciones, integraciones y complejidad de automatización. Contáctanos para recibir una propuesta personalizada."
        : "Pricing depends on conversation volume, integrations and automation complexity. Contact us to receive a customized proposal.",
    plans:
      lang === "es"
        ? [
            {
              name: "Básico",
              description: "Chatbot esencial para resolver interacciones",
              price: "55 USD",
              cadence: "/mes",
              usage: "Incluye 55 casos resueltos",
              items: [
                "Chatbot de IA para Web o WhatsApp",
                "Resumen enviado al concluir cada interacción",
                "Automatización de FAQs",
                "Captura de leads",
                "1 USD por cada caso adicional",
              ],
              note: "Pensado para equipos que quieren empezar con soporte automatizado y seguimiento simple.",
              cta: "Solicitar información",
              featured: false,
            },
            {
              name: "Growth",
              description: "Automatización con métricas, tendencias y portal",
              price: "85 USD",
              cadence: "/mes",
              usage: "Incluye 85 casos resueltos",
              items: [
                "Todo lo incluido en Básico",
                "1.20 USD por caso resuelto adicional después de 85",
                "Tendencias y métricas de conversaciones",
                "Portal interno",
                "Espacio para 3 cuentas",
                "5 USD al mes por cada cuenta adicional",
                "Bot multicanal (Web + WhatsApp)",
              ],
              cta: "Solicitar información",
              featured: true,
            },
            {
              name: "Enterprise",
              description: "Automatización avanzada y estrategia de CX",
              items: [
                "Todo lo incluido en Growth",
                "Entrenamiento personalizado de IA",
                "Recomendaciones para optimizar NPS",
                "Insights de experiencia del cliente",
                "2 actualizaciones de reextracción de datos al año",
                "Soporte dedicado para optimización de IA",
                "Soporte técnico prioritario",
                "Integraciones personalizadas",
              ],
              cta: "Contactar ventas",
              featured: false,
            },
          ]
        : [
            {
              name: "Basic",
              description: "Essential chatbot for resolved interactions",
              price: "55 USD",
              cadence: "/mo",
              usage: "Includes 55 resolved cases",
              items: [
                "AI chatbot for Web or WhatsApp",
                "Summary sent after each interaction concludes",
                "FAQ automation",
                "Lead capture",
                "1 USD for each additional case",
              ],
              note: "Built for teams that want automated support with simple follow-up.",
              cta: "Request information",
              featured: false,
            },
            {
              name: "Growth",
              description: "Automation with metrics, trends and a portal",
              price: "85 USD",
              cadence: "/mo",
              usage: "Includes 85 resolved cases",
              items: [
                "Everything in Basic",
                "1.20 USD per additional resolved case after 85",
                "Conversation trends and metrics",
                "Internal portal",
                "Space for 3 accounts",
                "5 USD per month for each additional account",
                "Multi-channel bot (Web + WhatsApp)",
              ],
              cta: "Request information",
              featured: true,
            },
            {
              name: "Enterprise",
              description: "Advanced automation and CX strategy",
              items: [
                "Everything in Growth",
                "Custom AI training",
                "NPS optimization recommendations",
                "Customer experience insights",
                "2 data re-scraping updates per year",
                "Dedicated AI optimization support",
                "Priority technical support",
                "Custom integrations",
              ],
              cta: "Contact sales",
              featured: false,
            },
          ],
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#050711] px-6 pb-24 pt-32 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(0,204,153,0.24),transparent_30%),radial-gradient(circle_at_85%_18%,rgba(86,116,255,0.2),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.06)_0_1px,transparent_1px)] bg-[length:auto,auto,44px_44px]"></div>

      <div className="relative mx-auto mb-20 max-w-5xl text-center">
        <div className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm font-semibold text-emerald-100 backdrop-blur">
          <Sparkles className="h-4 w-4 text-[var(--color-primary)]" />
          {lang === "es" ? "Precios de Piroxeno AI" : "Piroxeno AI pricing"}
        </div>

        <h1 className="mb-6 text-5xl font-bold leading-tight md:text-6xl">
          {t.titleStart}
          <span className="bg-gradient-to-r from-[var(--color-primary)] via-cyan-200 to-indigo-300 bg-clip-text text-transparent">
            {t.titleHighlight}
          </span>
        </h1>

        <p className="mx-auto max-w-2xl text-lg text-slate-300">{t.subtitle}</p>
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
        {t.plans.map((plan) => (
          <div
            key={plan.name}
            className={
              plan.featured
                ? "relative flex flex-col overflow-hidden rounded-3xl border border-[var(--color-primary)]/55 bg-white/[0.075] p-8 shadow-[0_0_70px_rgba(0,204,153,0.18)] backdrop-blur"
                : "relative flex flex-col rounded-3xl border border-white/10 bg-white/[0.045] p-8 shadow-xl shadow-black/20 backdrop-blur"
            }
          >
            {plan.featured && (
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[var(--color-primary)] via-cyan-300 to-indigo-300"></div>
            )}

            {plan.featured && (
              <div className="absolute right-4 top-4 rounded-full bg-[var(--color-primary)] px-3 py-1 text-xs font-bold text-slate-950">
                {t.mostPopular}
              </div>
            )}

            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-primary)]/12 text-[var(--color-primary)]">
              <Zap className="h-6 w-6" />
            </div>

            <h3 className="mb-2 text-2xl font-semibold">{plan.name}</h3>
            <p className="mb-6 text-slate-400">{plan.description}</p>

            {"price" in plan && plan.price && (
              <div className="mb-6 rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="flex items-end gap-2">
                  <span className="text-4xl font-bold text-white">
                    {plan.price}
                  </span>
                  <span className="pb-1 text-sm text-slate-400">
                    {plan.cadence}
                  </span>
                </div>
                <p className="mt-2 text-sm text-emerald-100">{plan.usage}</p>
              </div>
            )}

            <ul className="mb-10 flex-1 space-y-4 text-slate-300">
              {plan.items.map((item) => (
                <li key={item} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-[var(--color-primary)]" />
                  <span>{item}</span>
                </li>
              ))}
              {"note" in plan && plan.note && (
                <li className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-slate-400">
                  {plan.note}
                </li>
              )}
            </ul>

            <Link
              to={requestDemoPath}
              className={
                plan.featured
                  ? "rounded-2xl bg-[var(--color-primary)] py-3 text-center font-semibold text-slate-950 shadow-[0_0_34px_rgba(0,204,153,0.24)] transition hover:bg-emerald-300"
                  : "rounded-2xl border border-white/12 bg-white/8 py-3 text-center font-semibold text-white transition hover:border-[var(--color-primary)]/50 hover:bg-white/12"
              }
            >
              {plan.cta}
            </Link>
          </div>
        ))}
      </div>

      <div className="relative mx-auto mt-16 max-w-3xl rounded-3xl border border-white/10 bg-white/[0.045] p-6 text-center text-slate-400 backdrop-blur">
        {t.footnote}
      </div>
    </div>
  );
}
