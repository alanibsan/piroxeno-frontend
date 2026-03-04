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

        {/* LOGO */}

        <Link to="/" className="flex items-center">
          <img src={logo} alt="Piroxeno" className="h-10 w-auto" />
        </Link>


        {/* DESKTOP MENU */}

        <div className="hidden md:flex items-center gap-10 text-gray-800 font-extrabold">

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
            to="/request-demo"
            className="bg-[#00cc99] text-white px-6 py-3 rounded-full font-semibold text-sm hover:opacity-90 transition"
          >
            Request Demo
          </Link>

        </div>


        {/* MOBILE MENU BUTTON */}

        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >

            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}

          </svg>

        </button>

      </div>


      {/* MOBILE MENU */}

      {menuOpen && (

        <div className="md:hidden bg-white border-t border-gray-200">

          <div className="flex flex-col gap-6 px-6 py-6 text-gray-800 font-semibold">

            <Link
              to="/pricing"
              onClick={() => setMenuOpen(false)}
            >
              Pricing
            </Link>

            <Link
              to="/whatsapp-bot"
              onClick={() => setMenuOpen(false)}
            >
              WhatsApp Bot
            </Link>

            <Link
              to="/web-bot"
              onClick={() => setMenuOpen(false)}
            >
              Web Bot
            </Link>

            <Link
              to="/request-demo"
              onClick={() => setMenuOpen(false)}
              className="bg-[#00cc99] text-white text-center py-3 rounded-full font-semibold"
            >
              Request Demo
            </Link>

          </div>

        </div>

      )}

    </div>

  );

}