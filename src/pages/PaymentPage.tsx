
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PaymentFormNew from '@/components/PaymentFormNew';
import { ArrowLeft } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import { Vehicle } from '@/lib/data';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const vehicle = location.state?.vehicle as Vehicle;
  
  useEffect(() => {
    if (!vehicle) {
      navigate('/vehicles', { replace: true });
      toast({
        title: "Aucun véhicule sélectionné",
        description: "Veuillez sélectionner un véhicule avant de procéder au paiement.",
        variant: "destructive",
      });
    }
    
    window.scrollTo(0, 0);
  }, [vehicle, navigate, toast]);
  
  if (!vehicle) {
    return null;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-4"
            >
              <ArrowLeft size={18} className="mr-2" />
              <span>Retour</span>
            </button>
            
            <h1 className="text-2xl md:text-3xl font-playfair font-semibold mb-2">
              Finaliser votre commande
            </h1>
            <p className="text-gray-600">
              Complétez vos informations pour réserver votre {vehicle.brand} {vehicle.model}
            </p>
          </div>

          <PaymentFormNew vehicle={vehicle} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PaymentPage;
