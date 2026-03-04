import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import heroBg from "../assets/hero-bg.png";
import fondo from "../assets/fondito.png";
import DemoEmailInput from "../components/DemoEmailInput";


const words = ["question", "booking", "lead", "client","sale"];

export default function Landing() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#ffffff] text-black min-h-screen scroll-smooth">



      {/* HERO */}
     
     <section
  className="relative flex flex-col items-center justify-center text-center px-6 py-32 bg-cover"
  style={{
    backgroundImage: `url(${fondo})`,
    backgroundPosition: "center 20%",
  }}
>
  {/* Light overlay to reduce intensity */}
  <div className="absolute inset-0 bg-white/75"></div>

  {/* Content */}
  <div className="relative z-10 flex flex-col items-center">
    
    <h1 className="text-4xl md:text-6xl font-bold leading-tight max-w-4xl">
      Are you listening to your customers?
    </h1>

<h2 className="mt-6 text-2xl md:text-4xl font-semibold max-w-4xl">
  Your business is ignoring visitors. Turn it into a 24/7 assistant that never misses a{" "}
<span className="text-[var(--color-primary)] font-extrabold drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]">
{words[index]}
</span>
</h2>

    <DemoEmailInput />

  </div>
</section>
      

      {/* HOW IT WORKS */}
      <section id="how" className="px-8 py-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 text-center">

          <div>
            <div className="text-[var(--color-primary)] text-4xl mb-4">1</div>
            <h4 className="text-xl font-semibold mb-2">Demo</h4>
            <p className="text-neutral-400">
              We understand your needs, then show you how Piroxeno can help.
            </p>
          </div>

          <div>
            <div className="text-[var(--color-primary)] text-4xl mb-4">2</div>
            <h4 className="text-xl font-semibold mb-2">Train</h4>
            <p className="text-neutral-400">
              Your AI assistant learns from your own data. We work with you to make it perfect.
            </p>
          </div>

          <div>
            <div className="text-[var(--color-primary)] text-4xl mb-4">3</div>
            <h4 className="text-xl font-semibold mb-2">Act</h4>
            <p className="text-neutral-400">
              Add a small script and go live instantly. See your metrics and conversations in real time. Act.
            </p>
          </div>

        </div>
      </section>
{/* PROBLEM */}
<section
  className="relative px-8 py-24 bg-cover bg-center"
  style={{ backgroundImage: `url(${heroBg})` }}
>
  {/* Light overlay to soften image */}
  <div className="absolute inset-0 bg-white/30"></div>

  <div className="relative z-10 max-w-5xl mx-auto text-center">
    <h3 className="text-3xl font-semibold mb-6 text-black">
      Your website can provide more value than you think.
    </h3>

    <p className="text-neutral-800 text-lg font-semibold">
      Most websites lose potential clients because no one answers their questions.
      We give your business a 24/7 AI assistant trained on your own content: schedules meetings, answers FAQs, generates leads and more. All in one tool, no code, and with your data privacy intact.
    </p>
  </div>
</section>
{/* CTA FINAL */}
      <section className="px-8 py-32 text-center bg-white">
        <h3 className="text-3xl font-semibold mb-6">
          Ready to make your website intelligent?
        </h3>

        <Link
          to="/RequestDemo"
          className="bg-[var(--color-primary)] text-white px-8 py-4 rounded-3xl font-semibold text-lg hover:opacity-90 transition"
        >
          Request Demo
        </Link>
      </section>
    </div>
  );
}