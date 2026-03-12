import logo from "../assets/logo.png";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [visible, setVisible] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

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
      bg-white shadow-sm`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="Piroxeno" className="h-12 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10 text-gray-800 font-extrabold">

          <div className="flex gap-8">

            <Link to="/pricing" className="relative group hover:scale-105 transition">
              Pricing
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>
            </Link>

            <Link to="/whatsapp-bot" className="relative group hover:scale-105 transition">
              WhatsApp Bot
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>
            </Link>

            <Link to="/web-bot" className="relative group hover:scale-105 transition">
              Web Bot
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>
            </Link>

          </div>

          <Link
            to="/RequestDemo"
            className="bg-[var(--color-primary)] text-white px-8 py-4 rounded-4xl font-semibold text-lg hover:opacity-90 transition"
          >
            Request Demo
          </Link>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1"
        >
          <span
            className={`w-6 h-[2px] bg-black transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-[6px]" : ""
            }`}
          ></span>
          <span
            className={`w-6 h-[2px] bg-black transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`w-6 h-[2px] bg-black transition-all duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-[6px]" : ""
            }`}
          ></span>
        </button>

      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-96 py-6" : "max-h-0"
        }`}
      >
        <div className="flex flex-col items-center gap-6 text-lg font-semibold">

          <Link to="/pricing" onClick={() => setMenuOpen(false)}>
            Pricing
          </Link>

          <Link to="/whatsapp-bot" onClick={() => setMenuOpen(false)}>
            WhatsApp Bot
          </Link>

          <Link to="/web-bot" onClick={() => setMenuOpen(false)}>
            Web Bot
          </Link>

          <Link
            to="/RequestDemo"
            onClick={() => setMenuOpen(false)}
            className="bg-[var(--color-primary)] text-white px-8 py-3 rounded-full"
          >
            Request Demo
          </Link>

        </div>
      </div>
    </div>
  );
}