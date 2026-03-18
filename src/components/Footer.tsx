import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-32">
      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-12">
        {/* BRAND */}

        <div>
          <h3 className="text-xl font-bold mb-4">
            <span className="text-[#00cc99]">PIROXENO</span>
          </h3>

          <p className="text-gray-600 text-sm">
            AI assistants for websites and messaging platforms. Automate
            conversations, capture leads and support your customers.
          </p>
        </div>

        {/* PRODUCT */}

        <div>
          <h4 className="font-semibold mb-4">Product</h4>

          <ul className="space-y-3 text-gray-600 text-sm">
            <li>
              <Link to="/web-bot" className="hover:text-[#00cc99]">
                Web Bot
              </Link>
            </li>

            <li>
              <Link to="/whatsapp-bot" className="hover:text-[#00cc99]">
                WhatsApp Bot
              </Link>
            </li>

            <li>
              <Link to="/pricing" className="hover:text-[#00cc99]">
                Pricing
              </Link>
            </li>
          </ul>
        </div>

        {/* COMPANY */}

        <div>
          <h4 className="font-semibold mb-4">Company</h4>

          <ul className="space-y-3 text-gray-600 text-sm">
            <li>
              <Link to="/requestDemo" className="hover:text-[#00cc99]">
                Request Demo
              </Link>
            </li>

            <li>
              <a
                href="mailto:alan@piroxeno.com"
                className="hover:text-[#00cc99]"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* CONTACT */}

        <div>
          <h4 className="font-semibold mb-4">Contact</h4>

          <ul className="space-y-3 text-gray-600 text-sm">
            <li>alan@piroxeno.com</li>

            <li>Mexico City, Mexico</li>
            <li>Madrid, Spain</li>

            <li>Available globally</li>
          </ul>
        </div>
      </div>

      {/* BOTTOM */}

      <div className="border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between text-sm text-gray-500">
          <span>
            © {new Date().getFullYear()} Piroxeno. All rights reserved.
          </span>

          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-[#00cc99]">
              Privacy
            </Link>

            <Link to="/Terms" className="hover:text-[#00cc99]">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
