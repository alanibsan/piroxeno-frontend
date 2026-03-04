import { Link } from "react-router-dom";

export default function WebBot() {
  return (
    <div className="bg-white text-black min-h-screen pt-32">

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 text-center">

        <h1 className="text-5xl font-bold leading-tight mb-6">
          Turn your website into a{" "}
          <span className="text-[#00cc99]">24/7 AI assistant</span>
        </h1>

        <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-10">
          The Piroxeno Web Bot answers questions, captures leads and helps your
          visitors instantly using AI trained on your own business data.
        </p>

        <Link
          to="/request-demo"
          className="bg-[#00cc99] text-white px-8 py-4 rounded-full font-semibold text-lg hover:opacity-90 transition"
        >
          Request Demo
        </Link>

      </section>

      {/* MOCK CHAT DEMO */}
      <section className="max-w-5xl mx-auto px-6 py-24">

        <div className="bg-gray-100 rounded-2xl p-10 shadow-inner">

          <div className="space-y-6">

            <div className="bg-white p-4 rounded-xl shadow w-fit">
              Hi, do you integrate with WhatsApp?
            </div>

            <div className="bg-[#00cc99] text-white p-4 rounded-xl shadow w-fit ml-auto">
              Yes. Piroxeno connects with WhatsApp, web chat and internal
              systems to automate support and lead capture.
            </div>

            <div className="bg-white p-4 rounded-xl shadow w-fit">
              Can it schedule meetings?
            </div>

            <div className="bg-[#00cc99] text-white p-4 rounded-xl shadow w-fit ml-auto">
              Absolutely. It can book demos, answer FAQs and qualify leads.
            </div>

          </div>

        </div>

      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-6xl mx-auto px-6 py-20">

        <h2 className="text-3xl font-bold text-center mb-16">
          How the Web Bot works
        </h2>

        <div className="grid md:grid-cols-3 gap-12 text-center">

          <div>
            <div className="text-[#00cc99] text-4xl mb-4">1</div>
            <h3 className="font-semibold text-xl mb-3">Train</h3>
            <p className="text-gray-600">
              Upload your documentation, FAQs and website data to train the AI.
            </p>
          </div>

          <div>
            <div className="text-[#00cc99] text-4xl mb-4">2</div>
            <h3 className="font-semibold text-xl mb-3">Deploy</h3>
            <p className="text-gray-600">
              Add a simple script to your website and launch instantly.
            </p>
          </div>

          <div>
            <div className="text-[#00cc99] text-4xl mb-4">3</div>
            <h3 className="font-semibold text-xl mb-3">Automate</h3>
            <p className="text-gray-600">
              The AI handles questions, captures leads and supports customers.
            </p>
          </div>

        </div>

      </section>

      {/* FEATURES */}
      <section className="bg-gray-50 py-24">

        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-3xl font-bold text-center mb-16">
            What the Web Bot can do
          </h2>

          <div className="grid md:grid-cols-2 gap-10">

            <div className="bg-white p-8 rounded-xl border">
              <h3 className="font-semibold text-xl mb-2">
                Answer customer questions
              </h3>
              <p className="text-gray-600">
                Instantly respond to visitors using AI trained on your own
                documentation.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl border">
              <h3 className="font-semibold text-xl mb-2">
                Capture leads automatically
              </h3>
              <p className="text-gray-600">
                Turn conversations into qualified leads without manual effort.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl border">
              <h3 className="font-semibold text-xl mb-2">
                Book meetings
              </h3>
              <p className="text-gray-600">
                Schedule demos directly inside the chat.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl border">
              <h3 className="font-semibold text-xl mb-2">
                Integrate with your tools
              </h3>
              <p className="text-gray-600">
                Connect CRM, support systems and messaging platforms.
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* CTA */}
      <section className="text-center py-24">

        <h2 className="text-3xl font-bold mb-6">
          Start capturing leads today
        </h2>

        <Link
          to="/request-demo"
          className="bg-[#00cc99] text-white px-8 py-4 rounded-full font-semibold text-lg hover:opacity-90 transition"
        >
          Request Demo
        </Link>

      </section>

    </div>
  );
}