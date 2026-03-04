import { useState } from "react";

export default function RequestDemo() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    jobTitle: "",
    company: ""
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    await fetch("https://api.piroxeno.com/request-demo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        first_name: form.firstName,
        last_name: form.lastName,
        phone: form.phone,
        email: form.email,
        job_title: form.jobTitle,
        company: form.company
      })
    });

    setLoading(false);
    setSuccess(true);
  };

  return (
    <div className="min-h-screen bg-white text-black px-6 pt-32 pb-20">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">

        {/* LEFT SIDE */}
        <div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            See how <span className="text-[#0a0a0a]">PIR</span><span className="text-[#00cc99]">OX</span><span className="text-[#0a0a0a]">ENO</span> turns your business
            into an intelligent assistant
          </h1>

          <p className="text-gray-600 mb-10 text-lg">
            Discover how AI agents trained on your own business data can capture
            leads, answer questions and support customers automatically.
          </p>

          <div className="space-y-6 text-gray-700">

            <div className="flex gap-4">
              <div className="text-[#00cc99] font-bold">01</div>
              <p>Understand your current CX and support workflows</p>
            </div>

            <div className="flex gap-4">
              <div className="text-[#00cc99] font-bold">02</div>
              <p>Identify opportunities where AI agents can automate interactions</p>
            </div>

            <div className="flex gap-4">
              <div className="text-[#00cc99] font-bold">03</div>
              <p>Get a tailored setup based on your website and business data</p>
            </div>

            <div className="flex gap-4">
              <div className="text-[#00cc99] font-bold">04</div>
              <p>Receive a custom ROI projection for your team</p>
            </div>

          </div>

        </div>

        {/* FORM */}
        <div className="bg-white border border-gray-200 p-8 rounded-2xl shadow-lg">

          {success ? (

            <div className="text-center py-10">

              <h2 className="text-2xl font-semibold mb-4 text-[#00cc99]">
                Demo requested successfully
              </h2>

              <p className="text-gray-600">
                Our team will contact you shortly to schedule your demo.
              </p>

            </div>

          ) : (

            <form onSubmit={handleSubmit} className="space-y-5">

              <div className="grid grid-cols-2 gap-4">

                <input
                  name="firstName"
                  placeholder="First Name"
                  onChange={handleChange}
                  required
                  className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#00cc99] outline-none"
                />

                <input
                  name="lastName"
                  placeholder="Last Name"
                  onChange={handleChange}
                  required
                  className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#00cc99] outline-none"
                />

              </div>

              <input
                name="phone"
                placeholder="Phone Number"
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#00cc99] outline-none"
              />

              <input
                name="email"
                type="email"
                placeholder="Work Email"
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#00cc99] outline-none"
              />

              <input
                name="jobTitle"
                placeholder="Job Title"
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#00cc99] outline-none"
              />

              <input
                name="company"
                placeholder="Company Name"
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#00cc99] outline-none"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#00cc99] text-white font-semibold py-3 rounded-lg hover:opacity-90 transition"
              >
                {loading ? "Submitting..." : "Request Demo"}
              </button>

            </form>

          )}

        </div>

      </div>
    </div>
  );
}