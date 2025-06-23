
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Upload, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Vehicle } from '@/lib/data';
import { submitToFormspree } from '@/services/formspree';

const formSchema = z.object({
  paymentProof: z.instanceof(File).refine(
    file => file.size > 0,
    "Une preuve de paiement est obligatoire"
  ).refine(
    file => ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'].includes(file.type),
    "Format accepté : PDF, JPG, PNG"
  ),
});

type FormData = z.infer<typeof formSchema>;

const PaymentForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [validationError, setValidationError] = useState<string>("");
  
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

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      paymentProof: undefined,
    },
  });

  if (!vehicle) return null;

  const totalAmount = vehicle.price;
  const depositAmount = Math.round(totalAmount * 0.2);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      form.setValue('paymentProof', file);
      setValidationError("");
    }
  };

  const validateBeforeSubmit = (): boolean => {
    // Validation 1: Vérifier que l'acompte est de 20%
    const minDeposit = Math.round(totalAmount * 0.2);
    if (depositAmount < minDeposit) {
      setValidationError("L'acompte de 20% est obligatoire pour valider la commande.");
      return false;
    }

    // Validation 2: Vérifier qu'une preuve de paiement est téléchargée
    if (!selectedFile) {
      setValidationError("Merci d'ajouter une preuve de paiement au format PDF ou image.");
      return false;
    }

    setValidationError("");
    return true;
  };

  const onSubmit = async (values: FormData) => {
    if (!validateBeforeSubmit()) {
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
        payment_proof_uploaded: 'Oui',
        payment_proof_name: selectedFile?.name || 'Fichier téléchargé',
        payment_proof_type: selectedFile?.type || 'Non spécifié'
      };
      
      const result = await submitToFormspree(submissionData);
      
      if (result.ok) {
        toast({
          title: "Commande validée !",
          description: "Votre commande avec acompte a été enregistrée. Nous vous contacterons rapidement.",
        });

        navigate('/payment-confirmation', { 
          state: { 
            order: { 
              vehicle, 
              totalAmount,
              depositAmount,
              paymentProofUploaded: true
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

  const isFormValid = selectedFile && !validationError;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow page-top-padding bg-gray-50">
        <div className="container mx-auto px-4 py-4 md:py-8 max-w-2xl">
          <div className="mb-6 md:mb-8">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-4 md:mb-6"
            >
              <ArrowLeft size={18} className="mr-2" />
              <span>Retour</span>
            </button>
            
            <h1 className="text-2xl md:text-3xl font-playfair font-semibold mb-2">
              Formulaire d'achat
            </h1>
            <p className="text-gray-600">
              Finalisez votre achat avec un acompte de 20%
            </p>
          </div>

          <div className="space-y-6">
            {/* Résumé véhicule et montants */}
            <Card className="shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl">Résumé de votre commande</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 mb-6">
                  <img 
                    src={vehicle.mainImage || vehicle.images[0]} 
                    alt={`${vehicle.brand} ${vehicle.model}`}
                    className="w-16 h-16 object-cover rounded" 
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{vehicle.brand} {vehicle.model}</h3>
                    <p className="text-gray-600">{vehicle.year} • {vehicle.mileage.toLocaleString()} km</p>
                  </div>
                </div>
                
                <div className="space-y-3 border-t pt-4">
                  <div className="flex justify-between text-lg">
                    <span className="font-medium">Montant total</span>
                    <span className="font-bold">{totalAmount.toLocaleString()} €</span>
                  </div>
                  <div className="flex justify-between text-lg text-green-600">
                    <span className="font-medium">Acompte à payer (20%)</span>
                    <span className="font-bold">{depositAmount.toLocaleString()} €</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Instructions de paiement */}
            <Card className="shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl">Instructions de paiement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <p className="text-blue-800 font-medium mb-2">
                    💳 Effectuez le virement de <strong>{depositAmount.toLocaleString()} €</strong>
                  </p>
                  <p className="text-blue-700 text-sm">
                    Utilisez la référence : <strong>AGE-{vehicle.id}-{Date.now().toString().slice(-6)}</strong>
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Titulaire :</span>
                    <span className="font-medium">AUTO GERMANY EXPORT SARL</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">IBAN :</span>
                    <span className="font-mono text-xs">FR76 XXXX XXXX XXXX XXXX XXXX XXX</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">BIC :</span>
                    <span className="font-mono">XXXXXXXX</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Upload preuve de paiement */}
            <Card className="shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl">Preuve de paiement</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="paymentProof"
                      render={() => (
                        <FormItem>
                          <FormLabel className="text-base font-medium">
                            Téléchargez votre preuve de paiement *
                          </FormLabel>
                          <FormControl>
                            <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50 hover:bg-gray-100 transition-colors">
                              <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                              <div className="space-y-1">
                                <p className="text-sm text-gray-600">
                                  Formats acceptés : PDF, JPG, PNG
                                </p>
                                <p className="text-xs text-gray-500">
                                  Cliquez ou glissez votre fichier ici
                                </p>
                                {selectedFile && (
                                  <p className="text-sm text-green-600 font-medium mt-2">
                                    ✓ {selectedFile.name}
                                  </p>
                                )}
                              </div>
                              <input
                                type="file"
                                accept=".pdf,.jpg,.jpeg,.png"
                                onChange={handleFileChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                required
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {validationError && (
                      <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
                        <AlertCircle size={16} />
                        <span className="text-sm font-medium">{validationError}</span>
                      </div>
                    )}

                    <Button 
                      type="submit" 
                      className={`w-full h-12 text-base font-medium ${
                        isFormValid 
                          ? 'bg-luxe-gold hover:bg-luxe-gold/90 text-black' 
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                      disabled={!isFormValid || isSubmitting}
                    >
                      {isSubmitting ? "Validation en cours..." : "Valider ma commande"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PaymentForm;
