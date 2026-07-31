import logo from "../assets/logo_white.png";
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useLang } from "../utils/i18n";

export default function Navbar() {
  const [visible, setVisible] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const lang = useLang();

  const t = {
    pricing: lang === "es" ? "Precios" : "Pricing",
    whatsapp: lang === "es" ? "WhatsApp Bot" : "WhatsApp Bot",
    webbot: lang === "es" ? "Web Bot" : "Web Bot",
    demo: lang === "es" ? "Solicitar demo" : "Request Demo",
  };

  const switchLang = (newLang: "en" | "es") => {
    const path = location.pathname;

    let newPath;

    if (path.startsWith("/en") || path.startsWith("/es")) {
      newPath = path.replace(/^\/(en|es)/, `/${newLang}`);
    } else {
      newPath = `/${newLang}${path}`;
    }

    navigate(newPath);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScroll && currentScroll > 80) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      setLastScroll(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  return (
    <div
      className={`fixed top-0 left-0 w-full transition-transform duration-300 z-50
      ${visible ? "translate-y-0" : "-translate-y-full"}
      border-b border-white/10 bg-[#050711]/82 shadow-[0_10px_40px_rgba(0,0,0,0.24)] backdrop-blur-xl`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <Link to={`/${lang}/`}>
          <img src={logo} alt="Piroxeno" className="h-12 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 font-extrabold text-slate-100">
          <div className="flex gap-8">
            <Link
              to={`/${lang}/pricing`}
              className="relative group transition hover:scale-105 hover:text-[var(--color-primary)]"
            >
              {t.pricing}
            </Link>

            <Link
              to={`/${lang}/whatsapp-bot`}
              className="relative group transition hover:scale-105 hover:text-[var(--color-primary)]"
            >
              {t.whatsapp}
            </Link>

            <Link
              to={`/${lang}/web-bot`}
              className="relative group transition hover:scale-105 hover:text-[var(--color-primary)]"
            >
              {t.webbot}
            </Link>
          </div>

          {/* LANGUAGE SWITCH */}
          <div className="flex items-center rounded-full border border-white/10 bg-white/8 p-1">
            <button
              onClick={() => lang !== "es" && switchLang("es")}
              className={`px-3 py-1 rounded-full text-sm font-semibold transition ${
                lang === "es"
                  ? "bg-white text-black shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              ES
            </button>

            <button
              onClick={() => lang !== "en" && switchLang("en")}
              className={`px-3 py-1 rounded-full text-sm font-semibold transition ${
                lang === "en"
                  ? "bg-white text-black shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              EN
            </button>
          </div>

          <Link
            to={`/${lang}/request-demo`}
            className="rounded-4xl bg-[var(--color-primary)] px-8 py-4 text-lg font-semibold text-slate-950 shadow-[0_0_28px_rgba(0,204,153,0.2)] transition hover:bg-emerald-300"
          >
            {t.demo}
          </Link>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1"
        >
          <span
            className={`h-[2px] w-6 bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[6px]" : ""}`}
          />
          <span
            className={`h-[2px] w-6 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`h-[2px] w-6 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[6px]" : ""}`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-96 py-6" : "max-h-0"}`}
      >
        <div className="flex flex-col items-center gap-6 text-lg font-semibold text-slate-100">
          <Link to={`/${lang}/pricing`} onClick={() => setMenuOpen(false)}>
            {t.pricing}
          </Link>

          <Link to={`/${lang}/whatsapp-bot`} onClick={() => setMenuOpen(false)}>
            {t.whatsapp}
          </Link>

          <Link to={`/${lang}/web-bot`} onClick={() => setMenuOpen(false)}>
            {t.webbot}
          </Link>

          <Link
            to={`/${lang}/request-demo`}
            onClick={() => setMenuOpen(false)}
            className="rounded-full bg-[var(--color-primary)] px-8 py-3 text-slate-950"
          >
            {t.demo}
          </Link>
          <div className="flex items-center rounded-full border border-white/10 bg-white/8 p-1">
            <button
              onClick={() => lang !== "es" && switchLang("es")}
              className={`px-3 py-1 rounded-full text-sm font-semibold transition ${
                lang === "es"
                  ? "bg-white text-black shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              ES
            </button>

            <button
              onClick={() => lang !== "en" && switchLang("en")}
              className={`px-3 py-1 rounded-full text-sm font-semibold transition ${
                lang === "en"
                  ? "bg-white text-black shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
