
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Vehicle } from '@/lib/data';
import StepPaymentForm from '@/components/StepPaymentForm';
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

  if (isMobile) {
    // Version mobile : plein écran sans navbar/footer
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white px-4 py-3 flex items-center border-b">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mr-4"
          >
            <ArrowLeft size={18} className="mr-1" />
            <span className="text-sm">Retour</span>
          </button>
          
          <div className="flex-1">
            <h1 className="text-lg font-playfair font-semibold">
              Formulaire d'achat
            </h1>
            <p className="text-xs text-gray-600">
              Finalisez votre achat avec un acompte de 20%
            </p>
          </div>
        </div>

        <StepPaymentForm vehicle={vehicle} />
      </div>
    );
  }

  // Version desktop : avec navbar/footer
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
            
            <h1 className="text-3xl font-playfair font-semibold mb-2 text-center">
              Formulaire d'achat
            </h1>
            <p className="text-gray-600 text-center">
              Finalisez votre achat avec un acompte de 20%
            </p>
          </div>

          <StepPaymentForm vehicle={vehicle} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PaymentForm;
