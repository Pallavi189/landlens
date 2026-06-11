import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import AboutPage from "./pages/AboutPage";
import AdminDashboard from "./pages/AdminDashboard";
import AreaInsightsPage from "./pages/AreaInsightsPage";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RequestValuePage from "./pages/RequestValuePage";
import SRValuePage from "./pages/SRValuePage";
import StampDutyPage from "./pages/StampDutyPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sr-value" element={<SRValuePage />} />
        <Route path="/request-value" element={<RequestValuePage />} />
        <Route path="/stamp-duty" element={<StampDutyPage />} />
        <Route path="/area-insights" element={<AreaInsightsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
