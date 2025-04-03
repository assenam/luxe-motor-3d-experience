
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import Index from "./pages/Index";
import Vehicles from "./pages/Vehicles";
import About from "./pages/About";
import Contact from "./pages/Contact";
import VehicleDetailPage from "./pages/VehicleDetailPage";
import NotFound from "./pages/NotFound";
import Services from "./pages/Services";
import ServiceImportation from "./pages/ServiceImportation";
import ServiceGarantie from "./pages/ServiceGarantie";
import ServiceLivraison from "./pages/ServiceLivraison";
import ServiceClient from "./pages/ServiceClient";
import ServiceFinancement from "./pages/ServiceFinancement";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import LegalNotices from "./pages/LegalNotices";
import PaymentForm from "./pages/PaymentForm";
import PaymentConfirmation from "./pages/PaymentConfirmation";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/vehicles" element={<Vehicles />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/vehicles/:id" element={<VehicleDetailPage />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/importation" element={<ServiceImportation />} />
            <Route path="/services/garantie" element={<ServiceGarantie />} />
            <Route path="/services/livraison" element={<ServiceLivraison />} />
            <Route path="/services/service-client" element={<ServiceClient />} />
            <Route path="/services/financement" element={<ServiceFinancement />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/legal-notices" element={<LegalNotices />} />
            <Route path="/payment" element={<PaymentForm />} />
            <Route path="/payment-confirmation" element={<PaymentConfirmation />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
