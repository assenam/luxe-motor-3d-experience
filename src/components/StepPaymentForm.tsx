
import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Upload, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Vehicle } from '@/lib/data';
import { submitToFormspree } from '@/services/formspree';
import { useNavigate } from 'react-router-dom';

interface StepPaymentFormProps {
  vehicle: Vehicle;
}

interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  postalCode: string;
  city: string;
  country: string;
}

const StepPaymentForm = ({ vehicle }: StepPaymentFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    postalCode: '',
    city: '',
    country: 'France'
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  const totalAmount = vehicle.price;
  const depositAmount = Math.round(totalAmount * 0.2);
  const transferReference = `AGE-${vehicle.id}-${Date.now().toString().slice(-6)}`;

  const handleCustomerInfoChange = (field: keyof CustomerInfo, value: string) => {
    setCustomerInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateCustomerInfo = () => {
    const required = ['firstName', 'lastName', 'email', 'phone', 'address', 'postalCode', 'city'];
    return required.every(field => customerInfo[field as keyof CustomerInfo].trim() !== '');
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    if (!file) {
      setSelectedFile(null);
      return;
    }

    const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Format invalide",
        description: "Veuillez joindre un PDF ou une image JPG/PNG.",
        variant: "destructive",
      });
      event.target.value = '';
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
  };

  const handleNext = () => {
    console.log('Current step:', currentStep);
    
    if (currentStep === 2 && !validateCustomerInfo()) {
      toast({
        title: "Informations manquantes",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      });
      return;
    }
    
    if (currentStep < 5) {
      const nextStep = currentStep + 1;
      console.log('Moving to step:', nextStep);
      setCurrentStep(nextStep);
    }
  };

  const handlePrevious = () => {
    console.log('Going back from step:', currentStep);
    if (currentStep > 1) {
      const prevStep = currentStep - 1;
      console.log('Moving to step:', prevStep);
      setCurrentStep(prevStep);
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      toast({
        title: "Fichier manquant",
        description: "Merci d'ajouter une preuve de paiement.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const submissionData = {
        _subject: `Nouvelle commande avec acompte - ${vehicle.brand} ${vehicle.model}`,
        _template: 'table',
        type: 'vehicle_purchase_with_deposit',
        vehicle_info: `${vehicle.brand} ${vehicle.model} (${vehicle.year})`,
        vehicle_price: `${totalAmount.toLocaleString()} €`,
        deposit_amount: `${depositAmount.toLocaleString()} €`,
        deposit_percentage: '20%',
        transfer_reference: transferReference,
        customer_first_name: customerInfo.firstName,
        customer_last_name: customerInfo.lastName,
        customer_email: customerInfo.email,
        customer_phone: customerInfo.phone,
        customer_address: customerInfo.address,
        customer_postal_code: customerInfo.postalCode,
        customer_city: customerInfo.city,
        customer_country: customerInfo.country,
        payment_proof_uploaded: 'Oui',
        payment_proof_name: selectedFile.name,
        payment_proof_type: selectedFile.type
      };
      
      const result = await submitToFormspree(submissionData);
      
      if (result.ok) {
        // Envoyer l'email de confirmation au client
        try {
          console.log("Sending confirmation email to customer...");
          const emailResponse = await fetch(`https://urcsbhdturxsvwksjdru.supabase.co/functions/v1/send-order-confirmation`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              customerInfo,
              vehicle: {
                brand: vehicle.brand,
                model: vehicle.model,
                year: vehicle.year,
                price: totalAmount
              },
              depositAmount,
              transferReference
            })
          });

          if (emailResponse.ok) {
            console.log("Confirmation email sent successfully");
          } else {
            console.error("Failed to send confirmation email");
          }
        } catch (emailError) {
          console.error("Error sending confirmation email:", emailError);
          // Ne pas faire échouer la commande si l'email échoue
        }

        toast({
          title: "Commande validée !",
          description: "Votre commande avec acompte a été enregistrée. Un email de confirmation vous a été envoyé.",
        });

        navigate('/payment-confirmation', { 
          state: { 
            order: { 
              vehicle, 
              totalAmount,
              depositAmount,
              customerInfo: {
                ...customerInfo,
                paymentProofUploaded: true,
                transferReference
              }
            } 
          } 
        });
      } else {
        throw new Error('Échec envoi');
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Erreur lors de l'envoi de la commande.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    console.log('Rendering step:', currentStep);
    
    switch (currentStep) {
      case 1:
        return (
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto">
              <h2 className="text-lg font-playfair font-semibold text-center mb-4">Résumé de votre commande</h2>
              <div className="flex items-center space-x-3 mb-4">
                <img 
                  src={vehicle.mainImage || vehicle.images[0]} 
                  alt={`${vehicle.brand} ${vehicle.model}`}
                  className="w-12 h-12 object-cover rounded" 
                />
                <div>
                  <h3 className="font-semibold text-base">{vehicle.brand} {vehicle.model}</h3>
                  <p className="text-gray-600 text-xs">{vehicle.year} • {vehicle.mileage.toLocaleString()} km</p>
                </div>
              </div>
              
              <div className="space-y-2 border-t pt-3">
                <div className="flex justify-between">
                  <span className="font-medium text-sm">Montant total</span>
                  <span className="font-bold text-sm">{totalAmount.toLocaleString()} €</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span className="font-medium text-sm">Acompte à payer (20%)</span>
                  <span className="font-bold text-lg">{depositAmount.toLocaleString()} €</span>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end mt-4">
              <Button
                onClick={handleNext}
                size="sm"
                className="bg-luxe-gold hover:bg-luxe-gold/90 text-black"
              >
                Suivant
                <ArrowRight size={14} className="ml-1" />
              </Button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto">
              <h2 className="text-lg font-playfair font-semibold text-center mb-4">Informations personnelles</h2>
              
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <Label htmlFor="firstName" className="text-xs">Prénom *</Label>
                  <Input
                    id="firstName"
                    value={customerInfo.firstName}
                    onChange={(e) => handleCustomerInfoChange('firstName', e.target.value)}
                    className="h-8 text-xs"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-xs">Nom *</Label>
                  <Input
                    id="lastName"
                    value={customerInfo.lastName}
                    onChange={(e) => handleCustomerInfoChange('lastName', e.target.value)}
                    className="h-8 text-xs"
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <Label htmlFor="email" className="text-xs">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={customerInfo.email}
                  onChange={(e) => handleCustomerInfoChange('email', e.target.value)}
                  className="h-8 text-xs"
                  required
                />
              </div>

              <div className="mb-3">
                <Label htmlFor="phone" className="text-xs">Téléphone *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={customerInfo.phone}
                  onChange={(e) => handleCustomerInfoChange('phone', e.target.value)}
                  className="h-8 text-xs"
                  required
                />
              </div>

              <div className="mb-3">
                <Label htmlFor="address" className="text-xs">Adresse de livraison *</Label>
                <Input
                  id="address"
                  value={customerInfo.address}
                  onChange={(e) => handleCustomerInfoChange('address', e.target.value)}
                  className="h-8 text-xs"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <Label htmlFor="postalCode" className="text-xs">Code postal *</Label>
                  <Input
                    id="postalCode"
                    value={customerInfo.postalCode}
                    onChange={(e) => handleCustomerInfoChange('postalCode', e.target.value)}
                    className="h-8 text-xs"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="city" className="text-xs">Ville *</Label>
                  <Input
                    id="city"
                    value={customerInfo.city}
                    onChange={(e) => handleCustomerInfoChange('city', e.target.value)}
                    className="h-8 text-xs"
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <Label htmlFor="country" className="text-xs">Pays *</Label>
                <Input
                  id="country"
                  value={customerInfo.country}
                  onChange={(e) => handleCustomerInfoChange('country', e.target.value)}
                  className="h-8 text-xs"
                  required
                />
              </div>
            </div>
            
            <div className="flex justify-between mt-4">
              <Button
                onClick={handlePrevious}
                variant="outline"
                size="sm"
                className="flex items-center"
              >
                <ArrowLeft size={14} className="mr-1" />
                Précédent
              </Button>
              <Button
                onClick={handleNext}
                size="sm"
                className="bg-luxe-gold hover:bg-luxe-gold/90 text-black"
              >
                Suivant
                <ArrowRight size={14} className="ml-1" />
              </Button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto">
              <h2 className="text-lg font-playfair font-semibold text-center mb-4">Instructions de paiement</h2>
              
              <div className="bg-blue-50 p-3 rounded-lg mb-3">
                <p className="text-blue-800 font-medium mb-1 text-xs">
                  💳 Effectuez le virement de <strong>{depositAmount.toLocaleString()} €</strong>
                </p>
                <p className="text-blue-700 text-xs">
                  Référence obligatoire : <strong>{transferReference}</strong>
                </p>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-600">Titulaire :</span>
                  <span className="font-medium">AUTO GERMANY EXPORT</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">IBAN :</span>
                  <span className="font-mono text-xs">FR76 1234 5678 9012 3456 7890 123</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">BIC :</span>
                  <span className="font-mono">ABCDFRPP</span>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between mt-4">
              <Button
                onClick={handlePrevious}
                variant="outline"
                size="sm"
                className="flex items-center"
              >
                <ArrowLeft size={14} className="mr-1" />
                Précédent
              </Button>
              <Button
                onClick={handleNext}
                size="sm"
                className="bg-luxe-gold hover:bg-luxe-gold/90 text-black"
              >
                Suivant
                <ArrowRight size={14} className="ml-1" />
              </Button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto">
              <h2 className="text-lg font-playfair font-semibold text-center mb-4">Preuve de paiement</h2>
              
              <div>
                <label htmlFor="paymentProof" className="block font-medium mb-2 text-sm">
                  Téléchargez votre preuve de paiement <span className="text-red-500">*</span>
                </label>
                <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 text-center bg-gray-50">
                  <Upload className="mx-auto h-6 w-6 text-gray-400 mb-2" />
                  <div className="space-y-1">
                    <p className="text-gray-600 text-xs">
                      Formats acceptés : PDF, JPG, PNG
                    </p>
                    <p className="text-xs text-gray-500">
                      Cliquez ou glissez votre fichier ici
                    </p>
                    {selectedFile && (
                      <p className="text-green-600 font-medium mt-2 flex items-center justify-center text-xs">
                        <Check size={14} className="mr-1" />
                        {selectedFile.name}
                      </p>
                    )}
                  </div>
                  <input
                    id="paymentProof"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-between mt-4">
              <Button
                onClick={handlePrevious}
                variant="outline"
                size="sm"
                className="flex items-center"
              >
                <ArrowLeft size={14} className="mr-1" />
                Précédent
              </Button>
              <Button
                onClick={handleNext}
                disabled={!selectedFile}
                size="sm"
                className="bg-luxe-gold hover:bg-luxe-gold/90 text-black"
              >
                Suivant
                <ArrowRight size={14} className="ml-1" />
              </Button>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto">
              <h2 className="text-lg font-playfair font-semibold text-center mb-4">Confirmation</h2>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
                  <span className="text-xs">Véhicule sélectionné</span>
                  <Check className="text-green-600" size={16} />
                </div>
                <div className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
                  <span className="text-xs">Informations personnelles renseignées</span>
                  <Check className="text-green-600" size={16} />
                </div>
                <div className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
                  <span className="text-xs">Instructions de paiement vues</span>
                  <Check className="text-green-600" size={16} />
                </div>
                <div className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
                  <span className="text-xs">Preuve de paiement ajoutée</span>
                  {selectedFile ? <Check className="text-green-600" size={16} /> : <span className="text-red-500 text-xs">Manquant</span>}
                </div>
              </div>
              
              <div className="bg-blue-50 p-2 rounded-lg mt-3">
                <p className="text-blue-800 font-medium text-xs">
                  Votre commande sera traitée dès réception de votre virement de {depositAmount.toLocaleString()} €
                </p>
              </div>
            </div>
            
            <div className="flex justify-between mt-4">
              <Button
                onClick={handlePrevious}
                variant="outline"
                size="sm"
                className="flex items-center"
              >
                <ArrowLeft size={14} className="mr-1" />
                Précédent
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!selectedFile || isSubmitting}
                size="sm"
                className="bg-luxe-gold hover:bg-luxe-gold/90 text-black"
              >
                {isSubmitting ? "Validation..." : "Valider"}
              </Button>
            </div>
          </div>
        );

      default:
        console.error('Unknown step:', currentStep);
        return (
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto">
              <h2 className="text-lg font-playfair font-semibold text-center mb-4">Erreur</h2>
              <p className="text-center text-red-500">Étape inconnue: {currentStep}</p>
            </div>
            <div className="flex justify-between mt-4">
              <Button
                onClick={() => setCurrentStep(1)}
                size="sm"
                className="bg-luxe-gold hover:bg-luxe-gold/90 text-black"
              >
                Recommencer
              </Button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg" style={{ height: '520px' }}>
      {/* Indicateur d'étapes */}
      <div className="flex justify-center py-4 border-b">
        <div className="flex items-center space-x-1">
          {[1, 2, 3, 4, 5].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                step <= currentStep 
                  ? 'bg-luxe-gold text-black' 
                  : 'bg-gray-200 text-gray-500'
              }`}>
                {step}
              </div>
              {step < 5 && (
                <div className={`w-4 h-0.5 ${
                  step < currentStep ? 'bg-luxe-gold' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Contenu de l'étape avec hauteur fixe */}
      <div className="p-6" style={{ height: 'calc(520px - 80px)' }}>
        {renderStep()}
      </div>
    </div>
  );
};

export default StepPaymentForm;
