import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import RequestDemo from "./pages/RequestDemo";
import WebBot from "./pages/WebBot";
import WhatsAppBot from "./pages/Whatsapp";
import Pricing from "./pages/Pricing";
import AdminDashboard from "./pages/AdminDashboard";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import { useEffect } from "react";

const ENABLE_PIROXENO_WIDGET = false;

function AppRoutes() {
  const location = useLocation();
  const isAdminRoute = /\/(en|es)\/admin/.test(location.pathname);

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
    <>
      <ScrollToTop />
      {!isAdminRoute && <Navbar />}
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
        <Route path="/:lang/admin" element={<AdminDashboard />} />
      </Routes>
      {!isAdminRoute && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
