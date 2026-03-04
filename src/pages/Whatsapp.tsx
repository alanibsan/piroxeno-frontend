import { Link } from "react-router-dom";

export default function WhatsAppBot() {
  return (
    <div className="bg-white text-black min-h-screen pt-32">

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 text-center">

        <h1 className="text-5xl font-bold leading-tight mb-6">
          Your <span className="text-[#00cc99]">AI assistant</span> for WhatsApp
        </h1>

        <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-10">
          Automate conversations, schedule appointments and resolve customer
          questions instantly using an AI assistant integrated directly into
          WhatsApp.
        </p>

        <Link
          to="/request-demo"
          className="bg-[#00cc99] text-white px-8 py-4 rounded-full font-semibold text-lg hover:opacity-90 transition"
        >
          Request Demo
        </Link>

      </section>

      {/* CHAT DEMO */}
      <section className="max-w-4xl mx-auto px-6 py-24">

        <div className="bg-gray-100 rounded-2xl p-10 shadow-inner">

          <div className="space-y-6">

            <div className="bg-white p-4 rounded-xl shadow w-fit">
              Hi, I'd like to book an appointment.
            </div>

            <div className="bg-[#00cc99] text-white p-4 rounded-xl shadow w-fit ml-auto">
              Sure! What day works best for you?
            </div>

            <div className="bg-white p-4 rounded-xl shadow w-fit">
              Tomorrow afternoon.
            </div>

            <div className="bg-[#00cc99] text-white p-4 rounded-xl shadow w-fit ml-auto">
              Perfect. I scheduled you for 3:00 PM tomorrow. You'll receive a confirmation shortly.
            </div>

          </div>

        </div>

      </section>

      {/* USE CASES */}
      <section className="max-w-6xl mx-auto px-6 py-20">

        <h2 className="text-3xl font-bold text-center mb-16">
          What the WhatsApp Bot can do
        </h2>

        <div className="grid md:grid-cols-3 gap-10 text-center">

          <div className="bg-gray-50 p-8 rounded-xl border">
            <h3 className="font-semibold text-xl mb-3">Schedule appointments</h3>
            <p className="text-gray-600">
              Automatically book meetings, consultations or reservations directly through WhatsApp.
            </p>
          </div>

          <div className="bg-gray-50 p-8 rounded-xl border">
            <h3 className="font-semibold text-xl mb-3">Answer customer questions</h3>
            <p className="text-gray-600">
              Provide instant answers to FAQs using AI trained on your own business data.
            </p>
          </div>

          <div className="bg-gray-50 p-8 rounded-xl border">
            <h3 className="font-semibold text-xl mb-3">Personal AI assistant</h3>
            <p className="text-gray-600">
              Act as a smart assistant that helps customers, captures leads and manages requests.
            </p>
          </div>

        </div>

      </section>

      {/* HOW IT WORKS */}
      <section className="bg-gray-50 py-24">

        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-3xl font-bold text-center mb-16">
            How it works
          </h2>

          <div className="grid md:grid-cols-3 gap-12 text-center">

            <div>
              <div className="text-[#00cc99] text-4xl mb-4">1</div>
              <h3 className="font-semibold text-xl mb-3">Connect WhatsApp</h3>
              <p className="text-gray-600">
                Integrate your WhatsApp Business account with Piroxeno.
              </p>
            </div>

            <div>
              <div className="text-[#00cc99] text-4xl mb-4">2</div>
              <h3 className="font-semibold text-xl mb-3">Train the AI</h3>
              <p className="text-gray-600">
                Provide your business information, FAQs and scheduling rules.
              </p>
            </div>

            <div>
              <div className="text-[#00cc99] text-4xl mb-4">3</div>
              <h3 className="font-semibold text-xl mb-3">Start automating</h3>
              <p className="text-gray-600">
                The AI handles conversations, books appointments and assists customers.
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* CTA */}
      <section className="text-center py-24">

        <h2 className="text-3xl font-bold mb-6">
          Let AI manage your WhatsApp conversations
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