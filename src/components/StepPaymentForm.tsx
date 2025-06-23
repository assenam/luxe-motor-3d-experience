
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { submitToFormspree } from '@/services/formspree';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';

import { StepPaymentFormProps, CustomerInfo } from './payment-form/types';
import { validateCustomerInfo, generateTransferReference, calculateDepositAmount } from './payment-form/utils';
import StepIndicator from './payment-form/StepIndicator';
import OrderSummaryStep from './payment-form/OrderSummaryStep';
import CustomerInfoStep from './payment-form/CustomerInfoStep';
import PaymentInstructionsStep from './payment-form/PaymentInstructionsStep';
import PaymentProofStep from './payment-form/PaymentProofStep';
import ConfirmationStep from './payment-form/ConfirmationStep';

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
  const { removeFromCart } = useCart();

  const totalAmount = vehicle.price;
  const depositAmount = calculateDepositAmount(totalAmount);
  const transferReference = generateTransferReference(vehicle.id);

  const handleCustomerInfoChange = (field: keyof CustomerInfo, value: string) => {
    setCustomerInfo(prev => ({
      ...prev,
      [field]: value
    }));
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
    
    if (currentStep === 2 && !validateCustomerInfo(customerInfo)) {
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
        _cc: customerInfo.email,
        _replyto: customerInfo.email,
        type: 'vehicle_purchase_with_deposit',
        
        customer_email_subject: `Confirmation de votre commande - ${vehicle.brand} ${vehicle.model}`,
        customer_message: `
Bonjour ${customerInfo.firstName} ${customerInfo.lastName},

Nous avons bien reçu votre commande avec acompte pour le véhicule suivant :

🚗 VÉHICULE COMMANDÉ
- ${vehicle.brand} ${vehicle.model} (${vehicle.year})
- Prix total : ${totalAmount.toLocaleString()} €
- Acompte versé : ${depositAmount.toLocaleString()} € (20%)
- Référence de virement : ${transferReference}

📍 ADRESSE DE LIVRAISON
${customerInfo.address}
${customerInfo.postalCode} ${customerInfo.city}
${customerInfo.country}

⏳ PROCHAINES ÉTAPES
- Nous vérifions la réception de votre virement
- Nous préparons votre véhicule pour l'expédition
- Nous organisons le transport depuis l'Allemagne
- Nous vous contactons pour planifier la livraison

Notre équipe va maintenant traiter votre commande et vous tiendra informé(e) de chaque étape.

Si vous avez des questions, n'hésitez pas à nous contacter à contact@auto-germany-export.com

Merci de votre confiance,
L'équipe AUTO GERMANY EXPORT
        `,
        
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
        removeFromCart(vehicle.id);
        
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
    
    const stepProps = {
      vehicle,
      customerInfo,
      selectedFile,
      depositAmount,
      totalAmount,
      transferReference,
      onNext: handleNext,
      onPrevious: handlePrevious,
      onCustomerInfoChange: handleCustomerInfoChange,
      onFileChange: handleFileChange,
      onSubmit: handleSubmit,
      isSubmitting
    };

    switch (currentStep) {
      case 1:
        return <OrderSummaryStep {...stepProps} />;
      case 2:
        return <CustomerInfoStep {...stepProps} />;
      case 3:
        return <PaymentInstructionsStep {...stepProps} />;
      case 4:
        return <PaymentProofStep {...stepProps} />;
      case 5:
        return <ConfirmationStep {...stepProps} />;
      default:
        console.error('Unknown step:', currentStep);
        return (
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto">
              <h2 className="text-lg font-playfair font-semibold text-center mb-4">Erreur</h2>
              <p className="text-center text-red-500">Étape inconnue: {currentStep}</p>
            </div>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => setCurrentStep(1)}
                className="bg-luxe-gold hover:bg-luxe-gold/90 text-black px-4 py-2 rounded text-sm"
              >
                Recommencer
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg" style={{ height: '520px' }}>
      <StepIndicator currentStep={currentStep} totalSteps={5} />
      <div className="p-6" style={{ height: 'calc(520px - 80px)' }}>
        {renderStep()}
      </div>
    </div>
  );
};

export default StepPaymentForm;
