
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PaymentFormNew from '@/components/PaymentFormNew';
import MobilePaymentForm from '@/components/MobilePaymentForm';
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Vehicle } from '@/lib/data';
import { useIsMobile } from '@/hooks/use-mobile';

const PaymentForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    if (location.state?.vehicle) {
      setVehicle(location.state.vehicle);
    } else {
      navigate('/vehicles');
      toast({
        title: "Aucun véhicule sélectionné",
        description: "Veuillez sélectionner un véhicule avant de procéder au paiement.",
        variant: "destructive",
      });
    }
    
    window.scrollTo(0, 0);
  }, [location, navigate, toast]);
  
  if (!vehicle) return null;

  // Sur mobile, on utilise la version mobile optimisée
  if (isMobile) {
    return <MobilePaymentForm vehicle={vehicle} />;
  }

  // Sur desktop, on utilise le nouveau formulaire unifié
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow page-top-padding bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-6"
            >
              <ArrowLeft size={18} className="mr-2" />
              <span>Retour</span>
            </button>
            
            <h1 className="text-3xl font-playfair font-semibold mb-2">
              Paiement du dépôt
            </h1>
            <p className="text-gray-600">
              Payez un acompte de 20% pour réserver votre {vehicle.brand} {vehicle.model}
            </p>
          </div>

          <PaymentFormNew vehicle={vehicle} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PaymentForm;
