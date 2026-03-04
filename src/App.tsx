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


function App() {
  return (
    <BrowserRouter>
      <Navbar /> {/* GLOBAL */}

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/RequestDemo" element={<RequestDemo />} />
        <Route path="/demo-requests" element={<DemoRequests />} />
        <Route path="/web-bot" element={<WebBot />} />
        <Route path="/whatsapp-bot" element={<WhatsAppBot />} />
        <Route path="/pricing" element={<Pricing />} />
      </Routes>
      <Footer />

    </BrowserRouter>
  );
}
export default App;


