import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import RequestDemo from "./pages/RequestDemo";
import DemoRequests from "./pages/RequestDemo";
import WebBot from "./pages/WebBot";
import WhatsAppBot from "./pages/Whatsapp";
import Pricing from "./pages/Pricing";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";


function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Navbar /> {/* GLOBAL */}

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/RequestDemo" element={<RequestDemo />} />
        <Route path="/demo-requests" element={<DemoRequests />} />
        <Route path="/web-bot" element={<WebBot />} />
        <Route path="/whatsapp-bot" element={<WhatsAppBot />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
