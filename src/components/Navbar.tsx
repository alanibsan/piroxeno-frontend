import logo from "../assets/logo.png";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


export default function Navbar() {
  const [visible, setVisible] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);

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

        {/* Navigation */}
        <div className="flex items-center gap-10 text-gray-800 font-extrabold">

          {/* Links */}
          <div className="flex gap-8">

            <Link
              to="/pricing"
              className="relative group transition-all duration-200 hover:scale-105"
            >
              Pricing
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>
            </Link>

            <Link
              to="/whatsapp-bot"
              className="relative group transition-all duration-200 hover:scale-105"
            >
              WhatsApp Bot
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>
            </Link>

            <Link
              to="/web-bot"
              className="relative group transition-all duration-200 hover:scale-105"
            >
              Web Bot
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>
            </Link>

          </div>

          {/* CTA */}
          <Link
            to="/RequestDemo"
            className="bg-[var(--color-primary)] text-white px-8 py-4 rounded-4xl font-semibold text-lg hover:opacity-90 transition"
          >
            Request Demo
          </Link>

        </div>
      </div>
    </div>
  );
}