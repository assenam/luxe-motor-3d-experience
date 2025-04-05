import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Check, Clock, FileText, Home, ArrowRight, FileCheck } from 'lucide-react';
import { Vehicle } from '@/lib/data';

type OrderInfo = {
  vehicle: Vehicle;
  customerInfo: any;
};

const PaymentConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [order, setOrder] = useState<OrderInfo | null>(null);
  
  useEffect(() => {
    if (location.state?.order) {
      setOrder(location.state.order);
    } else {
      navigate('/vehicles');
    }
    
    window.scrollTo(0, 0);
  }, [location, navigate]);
  
  if (!order) return null;
  
  const { vehicle, customerInfo } = order;
  const depositAmount = vehicle.price * 0.2;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-10 md:py-16 bg-gray-50 overflow-auto">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white p-6 md:p-8 rounded-sm shadow-sm mb-8 md:mb-12">
            <div className="flex justify-center mb-6 md:mb-8">
              <div className="h-20 md:h-24 w-20 md:w-24 rounded-full bg-green-100 flex items-center justify-center">
                <Check className="h-10 md:h-12 w-10 md:w-12 text-green-600" />
              </div>
            </div>
            
            <h1 className="text-2xl md:text-3xl font-playfair font-semibold text-center mb-3 md:mb-4">
              Merci pour votre commande !
            </h1>
            <p className="text-center text-gray-600 mb-6 md:mb-8 max-w-lg mx-auto">
              Votre demande d'achat a été enregistrée avec succès. {customerInfo.paymentProofUploaded ? 'Nous avons bien reçu votre preuve de paiement.' : 'Nous vous contacterons dès réception de votre virement d\'acompte.'}
            </p>
            
            <div className="max-h-[60vh] overflow-auto">
              <div className="border border-gray-200 rounded-sm p-5 md:p-6 mb-6 md:mb-8">
                <div className="flex items-center mb-4">
                  <FileText className="text-luxe-gold mr-3" size={24} />
                  <h2 className="text-xl font-semibold">Récapitulatif de votre commande</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  <div>
                    <h3 className="font-medium mb-3 md:mb-4 text-gray-900">Informations personnelles</h3>
                    <div className="space-y-2 text-gray-600">
                      <p>{customerInfo.firstName} {customerInfo.lastName}</p>
                      <p>{customerInfo.email}</p>
                      <p>{customerInfo.phone}</p>
                      <p>{customerInfo.address}</p>
                      <p>{customerInfo.postalCode} {customerInfo.city}</p>
                      <p>{customerInfo.country}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-3 md:mb-4 text-gray-900">Détails du véhicule</h3>
                    <div className="flex items-start mb-4">
                      <img 
                        src={vehicle.images[0]} 
                        alt={`${vehicle.brand} ${vehicle.model}`}
                        className="w-16 md:w-20 h-16 md:h-20 object-cover rounded-sm mr-3 md:mr-4" 
                      />
                      <div>
                        <h4 className="font-medium">{vehicle.brand} {vehicle.model}</h4>
                        <p className="text-sm text-gray-600">{vehicle.year} • {vehicle.exteriorColor}</p>
                        <p className="text-luxe-gold font-medium mt-1">{vehicle.price.toLocaleString('fr-FR')} €</p>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-4 mt-4">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Acompte (20%)</span>
                        <span className="font-medium">{depositAmount.toLocaleString('fr-FR')} €</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>À payer à la livraison ou en mensualités</span>
                        <span>{(vehicle.price - depositAmount).toLocaleString('fr-FR')} €</span>
                      </div>
                      <div className="flex justify-between text-sm mt-2">
                        <span className="text-gray-600">Référence</span>
                        <span>{customerInfo.transferReference}</span>
                      </div>
                      {customerInfo.paymentProofUploaded && (
                        <div className="flex items-center mt-2 text-green-600">
                          <FileCheck size={16} className="mr-1" />
                          <span className="text-sm">Preuve de paiement transmise</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-5 md:p-6 rounded-sm border border-gray-200">
                <h3 className="flex items-center font-medium mb-4 text-gray-900">
                  <Clock size={20} className="mr-2 text-luxe-gold" />
                  Prochaines étapes
                </h3>
                <ol className="space-y-4">
                  {!customerInfo.paymentProofUploaded && (
                    <li className="flex">
                      <div className="bg-luxe-gold text-white h-6 w-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0">1</div>
                      <div>
                        <p className="font-medium">Effectuer le virement bancaire</p>
                        <p className="text-sm text-gray-600 mt-1">
                          Veuillez effectuer votre virement d'acompte de {depositAmount.toLocaleString('fr-FR')} € en utilisant la référence {customerInfo.transferReference}.
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          Cet acompte couvre la garantie, le transport et les taxes douanières.
                        </p>
                      </div>
                    </li>
                  )}
                  <li className="flex">
                    <div className="bg-luxe-gold text-white h-6 w-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0">{customerInfo.paymentProofUploaded ? '1' : '2'}</div>
                    <div>
                      <p className="font-medium">Confirmation de réception</p>
                      <p className="text-sm text-gray-600 mt-1">
                        Nous vous contacterons par email dès vérification de votre paiement pour confirmer votre commande.
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="bg-luxe-gold text-white h-6 w-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0">{customerInfo.paymentProofUploaded ? '2' : '3'}</div>
                    <div>
                      <p className="font-medium">Préparation et livraison</p>
                      <p className="text-sm text-gray-600 mt-1">
                        Notre équipe préparera votre véhicule et conviendra avec vous d'une date de livraison.
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="bg-luxe-gold text-white h-6 w-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0">{customerInfo.paymentProofUploaded ? '3' : '4'}</div>
                    <div>
                      <p className="font-medium">Paiement du solde</p>
                      <p className="text-sm text-gray-600 mt-1">
                        Le reste du montant ({(vehicle.price - depositAmount).toLocaleString('fr-FR')} €) sera à régler soit à la livraison, soit en mensualités selon vos préférences.
                      </p>
                    </div>
                  </li>
                </ol>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-4">
            <button 
              onClick={() => navigate('/')}
              className="flex items-center justify-center text-gray-600 hover:text-gray-900"
            >
              <Home size={18} className="mr-2" />
              <span>Retour à l'accueil</span>
            </button>
            <button 
              onClick={() => navigate('/vehicles')}
              className="flex items-center justify-center text-luxe-gold hover:text-luxe-gold/80"
            >
              <span>Découvrir d'autres véhicules</span>
              <ArrowRight size={18} className="ml-2" />
            </button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PaymentConfirmation;
