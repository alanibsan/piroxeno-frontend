import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import RequestDemo from "./pages/RequestDemo";
import WebBot from "./pages/WebBot";
import WhatsAppBot from "./pages/Whatsapp";
import Pricing from "./pages/Pricing";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import { useEffect } from "react";

const ENABLE_PIROXENO_WIDGET = false;

function App() {
  useEffect(() => {
    if (!ENABLE_PIROXENO_WIDGET) return;
    if (window.PiroxenoWidgetLoaded) return;

    const script = document.createElement("script");
    script.src = "https://api.piroxeno.com/static/widget.js";
    script.async = true;
    script.setAttribute("data-api-key", "pxn_live_piroxchat_01");

    document.body.appendChild(script);

    window.PiroxenoWidgetLoaded = true;
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/es" />} />

        <Route path="/:lang" element={<Landing />} />
        <Route path="/:lang/login" element={<Login />} />
        <Route path="/:lang/request-demo" element={<RequestDemo />} />
        <Route path="/:lang/web-bot" element={<WebBot />} />
        <Route path="/:lang/whatsapp-bot" element={<WhatsAppBot />} />
        <Route path="/:lang/pricing" element={<Pricing />} />
        <Route path="/:lang/privacy" element={<Privacy />} />
        <Route path="/:lang/terms" element={<Terms />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
