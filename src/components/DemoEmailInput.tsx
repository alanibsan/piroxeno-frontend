import { useState } from "react";
import type { FormEvent } from "react";

export default function DemoEmailInput() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch("https://api.piroxeno.com/request-demo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          source: "landing"
        })
      });

      setSuccess(true);
      setEmail("");
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto mt-10">
      <div className="flex items-center bg-white border border-gray-300 rounded-full shadow-sm overflow-hidden focus-within:ring-2 focus-within:ring-black transition">
        
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter a business email"
          className="flex-1 px-6 py-4 text-gray-900 placeholder-gray-400 bg-transparent focus:outline-none"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-6 py-4 font-semibold hover:opacity-90 transition"
        >
          {loading ? "Sending..." : "Get a demo"}
        </button>
      </div>

      {success && (
        <p className="text-green-600 text-sm mt-3 text-center">
          Thanks. We'll contact you soon.
        </p>
      )}
    </form>
  );
}