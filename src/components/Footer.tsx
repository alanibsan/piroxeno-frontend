import { Link } from "react-router-dom";
import { useLang } from "../utils/i18n";

export default function Footer() {
  const lang = useLang();
  const t = {
    description:
      lang === "es"
        ? "Asistentes de IA para sitios web y plataformas de mensajería. Automatiza conversaciones, captura leads y atiende a tus clientes."
        : "AI assistants for websites and messaging platforms. Automate conversations, capture leads and support your customers.",
    product: lang === "es" ? "Producto" : "Product",
    company: lang === "es" ? "Empresa" : "Company",
    pricing: lang === "es" ? "Precios" : "Pricing",
    requestDemo: lang === "es" ? "Solicitar demo" : "Request Demo",
    contact: lang === "es" ? "Contacto" : "Contact",
    mexico: lang === "es" ? "Ciudad de México, México" : "Mexico City, Mexico",
    madrid: lang === "es" ? "Madrid, España" : "Madrid, Spain",
    global: lang === "es" ? "Disponible globalmente" : "Available globally",
    rights:
      lang === "es" ? "Todos los derechos reservados." : "All rights reserved.",
    privacy: lang === "es" ? "Privacidad" : "Privacy",
    terms: lang === "es" ? "Términos" : "Terms",
  };

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#050711] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(0,204,153,0.16),transparent_30%),linear-gradient(135deg,rgba(255,255,255,0.05)_0_1px,transparent_1px)] bg-[length:auto,44px_44px]"></div>
      <div className="relative max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-12">
        {/* BRAND */}

        <div>
          <h3 className="text-xl font-bold mb-4">
            <span className="text-[#00cc99]">PIROXENO</span>
          </h3>

          <p className="text-slate-400 text-sm">
            {t.description}
          </p>
        </div>

        {/* PRODUCT */}

        <div>
          <h4 className="font-semibold mb-4 text-white">{t.product}</h4>

          <ul className="space-y-3 text-slate-400 text-sm">
            <li>
              <Link to={`/${lang}/web-bot`} className="hover:text-[#00cc99]">
                Web Bot
              </Link>
            </li>

            <li>
              <Link to={`/${lang}/whatsapp-bot`} className="hover:text-[#00cc99]">
                WhatsApp Bot
              </Link>
            </li>

            <li>
              <Link to={`/${lang}/pricing`} className="hover:text-[#00cc99]">
                {t.pricing}
              </Link>
            </li>
          </ul>
        </div>

        {/* COMPANY */}

        <div>
          <h4 className="font-semibold mb-4 text-white">{t.company}</h4>

          <ul className="space-y-3 text-slate-400 text-sm">
            <li>
              <Link to={`/${lang}/request-demo`} className="hover:text-[#00cc99]">
                {t.requestDemo}
              </Link>
            </li>

            <li>
              <a
                href="mailto:alan@piroxeno.com"
                className="hover:text-[#00cc99]"
              >
                {t.contact}
              </a>
            </li>
          </ul>
        </div>

        {/* CONTACT */}

        <div>
          <h4 className="font-semibold mb-4 text-white">{t.contact}</h4>

          <ul className="space-y-3 text-slate-400 text-sm">
            <li>alan@piroxeno.com</li>

            <li>{t.mexico}</li>
            <li>{t.madrid}</li>

            <li>{t.global}</li>
          </ul>
        </div>
      </div>

      {/* BOTTOM */}

      <div className="relative border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between gap-4 text-sm text-slate-500">
          <span>
            © {new Date().getFullYear()} Piroxeno. {t.rights}
          </span>

          <div className="flex gap-6">
            <Link to={`/${lang}/privacy`} className="hover:text-[#00cc99]">
              {t.privacy}
            </Link>

            <Link to={`/${lang}/terms`} className="hover:text-[#00cc99]">
              {t.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
