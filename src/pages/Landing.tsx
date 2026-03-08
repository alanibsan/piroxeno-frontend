import fondo from "../assets/fondito.png";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DemoEmailInput from "../components/DemoEmailInput";
import { Sparkle } from "lucide-react";

const rotatingWords = ["question", "lead", "booking", "client", "sale"];
const rotatingWordsHeader = [
  "business",
  "website",
  "clinic",
  "WhatsApp",
  "portal",
];
const features = [
  "Answer customer questions instantly",
  "Capture leads automatically",
  "Book meetings 24/7",
  "Integrate with WhatsApp",
];

export default function Landing() {
  const [wordIndex, setWordIndex] = useState(0);
  const [featureIndex, setFeatureIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFeatureIndex((prev) => (prev + 1) % features.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white text-black min-h-screen">
      {/* HERO */}

      <section
        className="relative py-32 px-6 text-center bg-[length:100%]"
        style={{
          backgroundImage: `url(${fondo})`,
          backgroundPosition: "center 30%",
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 bg-white/40"></div>

        <div className="relative z-10">
          <h2 className="mt-8 text-xl md:text-4xl text-black max-w-3xl mx-auto">
            Most website visitors leave without saying anything.
          </h2>
          <h1 className="text-5xl md:text-7xl font-bold max-w-5xl mx-auto leading-tight">
            Turn your{" "}
            <span className="text-[var(--color-primary)] font-bold">
              {rotatingWordsHeader[wordIndex]}
            </span>{" "}
            into a 24/7 AI assistant
          </h1>

          <div className="mt-10">
            <DemoEmailInput />
          </div>
        </div>
      </section>

      {/* SECOND HERO */}

      <section className="py-16 text-center">
        <h2 className="mt-8 text-xl md:text-4xl text-black max-w-3xl mx-auto">
          In Latin America, 83% of website visitors leave without telling you
          why.
        </h2>
        <h3 className="text-xl md:text-2xl max-w-5xl mx-auto leading-tight mt-6">
          Turn every conversation into actionable insights: customer objections,
          missing features, pricing concerns, and sales opportunities. Piroxeno
          answers questions instantly, saving hours of work and the cost of
          another hire. Transform your website into a 24/7 AI assistant that
          listens, understands your market and never misses a{" "}
          <span className="text-[var(--color-primary)] font-bold">
            {rotatingWords[wordIndex]}
          </span>
          .
        </h3>
      </section>

      {/* PRODUCT DEMO */}

      <section className="py-24 bg-[#0f172a] text-white">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h3 className="text-4xl font-bold">
            See <span className="text-[var(--color-primary)]">piroxeno</span> in
            action
          </h3>

          <p className="text-gray-400 mt-4">
            Your AI assistant answers customers instantly.
          </p>
        </div>

        <div className="max-w-2xl mx-auto bg-white text-black rounded-2xl shadow-xl p-8 space-y-4">
          <div className="bg-[var(--color-primary)] text-white p-3 rounded-xl w-fit ml-auto">
            Hi, do you take MAPFRE insurance?
          </div>
          <div className="bg-gray-100 p-3 rounded-xl w-fit relative">
            Yes, we accept MAPFRE as well as several other providers. If you'd
            like, I can help you check coverage or schedule an appointment.
            <Sparkle className="absolute bottom--2 left-1 w-4 h-4 text-purple-700 opacity-70" />
          </div>

          <div className="bg-[var(--color-primary)] text-white p-3 rounded-xl w-fit ml-auto">
            Nice. I would like to schedule an appointment.
          </div>

          <div className="bg-gray-100 p-3 rounded-xl w-fit relative">
            Of course. Are you available next Thursday at 3:00 PM?
                        <Sparkle className="absolute bottom--2 left-1 w-4 h-4 text-purple-700 opacity-70" />
          </div>

          <div className="bg-[var(--color-primary)] text-white p-3 rounded-xl w-fit ml-auto">
            Yes, that works for me.
          </div>
        </div>
      </section>

      {/* FEATURES ROTATOR */}

      <section className="py-24 text-center">
        <h3 className="text-4xl font-bold mb-12">
          What your AI assistant can do
        </h3>

        <div className="text-2xl text-[var(--color-primary)] font-semibold">
          {features[featureIndex]}
        </div>
      </section>

      {/* USE CASES */}

      <section className="py-24 bg-[#e6fffa]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12 text-center">
          <div>
            <h4 className="font-bold text-xl mb-2">Customer Support</h4>

            <p className="text-gray-600">
              Resolve FAQs automatically and reduce support workload.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-xl mb-2">Lead Generation</h4>

            <p className="text-gray-600">
              Capture visitors and qualify them instantly.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-xl mb-2">Bookings</h4>

            <p className="text-gray-600">
              Let customers schedule meetings without human intervention.
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}

      <section className="px-8 py-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 text-center">
          <div>
            <div className="text-[var(--color-primary)] text-4xl mb-4">1</div>

            <h4 className="text-xl font-semibold mb-2">Demo</h4>

            <p className="text-neutral-500">
              We understand your needs, then show you how Piroxeno can help.
            </p>
          </div>

          <div>
            <div className="text-[var(--color-primary)] text-4xl mb-4">2</div>

            <h4 className="text-xl font-semibold mb-2">Train</h4>

            <p className="text-neutral-500">
              Your AI assistant learns from your own data and workflows.
            </p>
          </div>

          <div>
            <div className="text-[var(--color-primary)] text-4xl mb-4">3</div>

            <h4 className="text-xl font-semibold mb-2">Launch</h4>

            <p className="text-neutral-500">
              Add a small script to your site and go live instantly.
            </p>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}

      <section className="py-32 bg-[#0f172a] text-white text-center">
        <h3 className="text-4xl font-bold mb-6">
          Start automating conversations today
        </h3>

        <p className="text-gray-400 mb-10">
          Deploy your AI assistant in minutes.
        </p>

        <Link
          to="/request-demo"
          className="bg-[var(--color-primary)] px-10 py-4 rounded-2xl text-lg font-semibold hover:opacity-90 transition"
        >
          Request Demo
        </Link>
      </section>
    </div>
  );
}
