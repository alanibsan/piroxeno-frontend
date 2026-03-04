import { Link } from "react-router-dom";

export default function Pricing() {
  return (
    <div className="bg-white min-h-screen pt-32 pb-24 px-6">

      {/* HEADER */}

      <div className="max-w-5xl mx-auto text-center mb-20">

        <h1 className="text-5xl font-bold mb-6">
          Flexible pricing for{" "}
          <span className="text-[#00cc99]">AI automation</span>
        </h1>

        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Pricing depends on usage, integrations and the complexity of your
          workflows. Choose the plan that fits your automation goals.
        </p>

      </div>


      {/* PRICING CARDS */}

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

        {/* BASIC */}

        <div className="border rounded-2xl p-8 flex flex-col">

          <h3 className="text-2xl font-semibold mb-2">Basic</h3>

          <p className="text-gray-500 mb-6">
            Start automating conversations
          </p>

          <ul className="space-y-4 text-gray-700 mb-10 flex-1">

            <li>✓ AI chatbot for Web or WhatsApp</li>

            <li>✓ Website data scraping</li>

            <li>✓ FAQ automation</li>

            <li>✓ Lead capture</li>

            <li>✓ Conversation automation</li>

            <li className="text-gray-500">
              Usage based pricing depending on conversations and integrations
            </li>

          </ul>

          <Link
            to="/request-demo"
            className="bg-gray-900 text-white text-center py-3 rounded-full font-semibold hover:opacity-90 transition"
          >
            Request information
          </Link>

        </div>



        {/* GROWTH (MOST POPULAR) */}

        <div className="border-2 border-[#00cc99] rounded-2xl p-8 flex flex-col shadow-xl relative">

          <div className="absolute top-0 right-0 bg-[#00cc99] text-white text-xs px-3 py-1 rounded-bl-xl rounded-tr-xl">
            MOST POPULAR
          </div>

          <h3 className="text-2xl font-semibold mb-2">Growth</h3>

          <p className="text-gray-500 mb-6">
            Automation plus decision insights
          </p>

          <ul className="space-y-4 text-gray-700 mb-10 flex-1">

            <li>✓ Everything in Basic</li>

            <li>✓ Conversation analytics</li>

            <li>✓ Customer chat history</li>

            <li>✓ Internal dashboard</li>

            <li>✓ Insights to optimize customer interactions</li>

            <li>✓ Decision portal for CX and automation strategy</li>

            <li>✓ Multi-channel bot (Web + WhatsApp)</li>

          </ul>

          <Link
            to="/request-demo"
            className="bg-[#00cc99] text-white text-center py-3 rounded-full font-semibold hover:opacity-90 transition"
          >
            Request information
          </Link>

        </div>



        {/* ENTERPRISE */}

        <div className="border rounded-2xl p-8 flex flex-col">

          <h3 className="text-2xl font-semibold mb-2">Enterprise</h3>

          <p className="text-gray-500 mb-6">
            Advanced automation and CX strategy
          </p>

          <ul className="space-y-4 text-gray-700 mb-10 flex-1">

            <li>✓ Everything in Growth</li>

            <li>✓ Custom AI training</li>

            <li>✓ NPS optimization recommendations</li>

            <li>✓ Customer experience insights</li>

            <li>✓ 2 data re-scraping updates per year</li>

            <li>✓ Dedicated AI optimization support</li>

            <li>✓ Priority technical support</li>

            <li>✓ Custom integrations</li>

          </ul>

          <Link
            to="/request-demo"
            className="bg-gray-900 text-white text-center py-3 rounded-full font-semibold hover:opacity-90 transition"
          >
            Contact sales
          </Link>

        </div>

      </div>



      {/* FOOTNOTE */}

      <div className="max-w-3xl mx-auto text-center mt-16 text-gray-500">

        Pricing depends on conversation volume, integrations and automation
        complexity. Contact us to receive a customized proposal.

      </div>

    </div>
  );
}