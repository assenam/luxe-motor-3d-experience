
import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Upload, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Vehicle } from '@/lib/data';
import { submitToFormspree } from '@/services/formspree';
import { useNavigate } from 'react-router-dom';

interface StepPaymentFormProps {
  vehicle: Vehicle;
}

const StepPaymentForm = ({ vehicle }: StepPaymentFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const totalAmount = vehicle.price;
  const depositAmount = Math.round(totalAmount * 0.2);
  const transferReference = `AGE-${vehicle.id}-${Date.now().toString().slice(-6)}`;

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
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
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
        payment_proof_uploaded: 'Oui',
        payment_proof_name: selectedFile.name,
        payment_proof_type: selectedFile.type
      };
      
      const result = await submitToFormspree(submissionData);
      
      if (result.ok) {
        toast({
          title: "Commande validée !",
          description: "Votre commande avec acompte a été enregistrée.",
        });

        navigate('/payment-confirmation', { 
          state: { 
            order: { 
              vehicle, 
              totalAmount,
              depositAmount,
              customerInfo: {
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
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-playfair font-semibold text-center">Résumé de votre commande</h2>
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src={vehicle.mainImage || vehicle.images[0]} 
                alt={`${vehicle.brand} ${vehicle.model}`}
                className="w-16 h-16 object-cover rounded" 
              />
              <div>
                <h3 className="font-semibold text-lg">{vehicle.brand} {vehicle.model}</h3>
                <p className="text-gray-600 text-sm">{vehicle.year} • {vehicle.mileage.toLocaleString()} km</p>
              </div>
            </div>
            
            <div className="space-y-3 border-t pt-4">
              <div className="flex justify-between">
                <span className="font-medium">Montant total</span>
                <span className="font-bold">{totalAmount.toLocaleString()} €</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span className="font-medium">Acompte à payer (20%)</span>
                <span className="font-bold">{depositAmount.toLocaleString()} €</span>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-playfair font-semibold text-center">Instructions de paiement</h2>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-blue-800 font-medium mb-2">
                💳 Effectuez le virement de <strong>{depositAmount.toLocaleString()} €</strong>
              </p>
              <p className="text-blue-700 text-sm">
                Référence obligatoire : <strong>{transferReference}</strong>
              </p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Titulaire :</span>
                <span className="font-medium">AUTO GERMANY EXPORT SARL</span>
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
        );

      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-playfair font-semibold text-center">Preuve de paiement</h2>
            
            <div>
              <label htmlFor="paymentProof" className="block font-medium mb-3">
                Téléchargez votre preuve de paiement <span className="text-red-500">*</span>
              </label>
              <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50">
                <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                <div className="space-y-1">
                  <p className="text-gray-600 text-sm">
                    Formats acceptés : PDF, JPG, PNG
                  </p>
                  <p className="text-xs text-gray-500">
                    Cliquez ou glissez votre fichier ici
                  </p>
                  {selectedFile && (
                    <p className="text-green-600 font-medium mt-3 flex items-center justify-center text-sm">
                      <Check size={16} className="mr-2" />
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
        );

      case 4:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-playfair font-semibold text-center">Confirmation</h2>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span className="text-sm">Véhicule sélectionné</span>
                <Check className="text-green-600" size={18} />
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span className="text-sm">Instructions de paiement vues</span>
                <Check className="text-green-600" size={18} />
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span className="text-sm">Preuve de paiement ajoutée</span>
                {selectedFile ? <Check className="text-green-600" size={18} /> : <span className="text-red-500 text-sm">Manquant</span>}
              </div>
            </div>
            
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-blue-800 font-medium text-sm">
                Votre commande sera traitée dès réception de votre virement de {depositAmount.toLocaleString()} €
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-md mx-auto h-screen flex flex-col">
      {/* Indicateur d'étapes - plus compact */}
      <div className="flex justify-center py-4">
        <div className="flex items-center space-x-3">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                step <= currentStep 
                  ? 'bg-luxe-gold text-black' 
                  : 'bg-gray-200 text-gray-500'
              }`}>
                {step}
              </div>
              {step < 4 && (
                <div className={`w-8 h-0.5 ${
                  step < currentStep ? 'bg-luxe-gold' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Contenu de l'étape - flexible */}
      <div className="flex-1 overflow-hidden">
        <Card className="h-full">
          <CardContent className="p-4 h-full overflow-auto">
            {renderStep()}
          </CardContent>
        </Card>
      </div>

      {/* Boutons de navigation - toujours visibles en bas */}
      <div className="flex justify-between p-4 bg-white border-t">
        <Button
          onClick={handlePrevious}
          disabled={currentStep === 1}
          variant="outline"
          size="sm"
          className="flex items-center"
        >
          <ArrowLeft size={14} className="mr-1" />
          Précédent
        </Button>

        {currentStep < 4 ? (
          <Button
            onClick={handleNext}
            disabled={currentStep === 3 && !selectedFile}
            size="sm"
            className="flex items-center bg-luxe-gold hover:bg-luxe-gold/90 text-black"
          >
            Suivant
            <ArrowRight size={14} className="ml-1" />
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={!selectedFile || isSubmitting}
            size="sm"
            className="bg-luxe-gold hover:bg-luxe-gold/90 text-black"
          >
            {isSubmitting ? "Validation..." : "Valider"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default StepPaymentForm;
