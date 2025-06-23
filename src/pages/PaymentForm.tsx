
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Vehicle } from '@/lib/data';
import { submitToFormspree } from '@/services/formspree';

const formSchema = z.object({
  firstName: z.string().min(2, "Prénom requis"),
  lastName: z.string().min(2, "Nom requis"),
  email: z.string().email("Email invalide"),
  phone: z.string().min(10, "Téléphone requis"),
  address: z.string().min(5, "Adresse requise"),
  city: z.string().min(2, "Ville requise"),
  postalCode: z.string().min(5, "Code postal requis"),
  country: z.string().min(2, "Pays requis"),
  transferReference: z.string().min(1, "Référence requise"),
  notes: z.string().optional(),
  termsAccepted: z.boolean().refine(val => val === true, "Conditions requises"),
});

type FormData = z.infer<typeof formSchema>;

const PaymentForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
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
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
      country: "France",
      transferReference: vehicle ? `AGE-${vehicle.id}-${Date.now().toString().slice(-6)}` : "",
      notes: "",
      termsAccepted: false,
    },
  });

  if (!vehicle) return null;

  const depositAmount = vehicle.price * 0.2;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const onSubmit = async (values: FormData) => {
    setIsSubmitting(true);
    
    try {
      const submissionData = {
        ...values,
        _subject: `Nouvelle commande - ${vehicle.brand} ${vehicle.model}`,
        _template: 'table',
        type: 'vehicle_order',
        vehicle_info: `${vehicle.brand} ${vehicle.model} (${vehicle.year})`,
        vehicle_price: `${vehicle.price.toLocaleString()} €`,
        deposit_amount: `${depositAmount.toLocaleString()} €`,
        paymentProofUploaded: selectedFile ? 'Oui' : 'Non',
        paymentProofName: selectedFile?.name || 'Aucun fichier'
      };
      
      const result = await submitToFormspree(submissionData);
      
      if (result.ok) {
        toast({
          title: "Commande envoyée !",
          description: "Nous vous contacterons rapidement.",
        });

        navigate('/payment-confirmation', { 
          state: { 
            order: { 
              vehicle, 
              customerInfo: {
                ...values,
                paymentProofUploaded: !!selectedFile
              },
              depositAmount 
            } 
          } 
        });
      } else {
        throw new Error('Échec envoi');
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Erreur lors de l'envoi.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow page-top-padding bg-gray-50">
        <div className="container mx-auto px-4 py-4 md:py-8">
          <div className="mb-6 md:mb-8">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-4 md:mb-6"
            >
              <ArrowLeft size={18} className="mr-2" />
              <span>Retour</span>
            </button>
            
            <h1 className="text-2xl md:text-3xl font-playfair font-semibold mb-2">
              Paiement du dépôt
            </h1>
            <p className="text-gray-600">
              Payez un acompte de 20% pour réserver votre {vehicle.brand} {vehicle.model}
            </p>
          </div>

          <div className="w-full max-w-2xl mx-auto space-y-4 md:space-y-6">
            <Card className="shadow-sm">
              <CardHeader className="pb-3 md:pb-6">
                <CardTitle className="text-lg md:text-xl">Résumé de votre commande</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center space-x-3 md:space-x-4 mb-4">
                  <img 
                    src={vehicle.mainImage || vehicle.images[0]} 
                    alt={`${vehicle.brand} ${vehicle.model}`}
                    className="w-12 h-12 md:w-16 md:h-16 object-cover rounded" 
                  />
                  <div>
                    <h3 className="font-semibold text-sm md:text-base">{vehicle.brand} {vehicle.model}</h3>
                    <p className="text-gray-600 text-xs md:text-sm">{vehicle.year} • {vehicle.mileage.toLocaleString()} km</p>
                  </div>
                </div>
                <div className="border-t pt-3 md:pt-4 space-y-2">
                  <div className="flex justify-between text-sm md:text-base">
                    <span>Prix total</span>
                    <span className="font-medium">{vehicle.price.toLocaleString()} €</span>
                  </div>
                  <div className="flex justify-between text-green-600 font-semibold text-sm md:text-base">
                    <span>Acompte (20%)</span>
                    <span>{depositAmount.toLocaleString()} €</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader className="pb-3 md:pb-6">
                <CardTitle className="text-lg md:text-xl">Vos informations</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium">Prénom</FormLabel>
                            <FormControl>
                              <Input placeholder="Jean" className="h-10 text-base" {...field} />
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium">Nom</FormLabel>
                            <FormControl>
                              <Input placeholder="Dupont" className="h-10 text-base" {...field} />
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="jean@email.com" className="h-10 text-base" {...field} />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">Téléphone</FormLabel>
                          <FormControl>
                            <Input placeholder="06 12 34 56 78" className="h-10 text-base" {...field} />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">Adresse</FormLabel>
                          <FormControl>
                            <Input placeholder="123 Rue de la Paix" className="h-10 text-base" {...field} />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium">Ville</FormLabel>
                            <FormControl>
                              <Input placeholder="Paris" className="h-10 text-base" {...field} />
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="postalCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium">Code postal</FormLabel>
                            <FormControl>
                              <Input placeholder="75001" className="h-10 text-base" {...field} />
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                          <FormItem className="col-span-2 md:col-span-1">
                            <FormLabel className="text-sm font-medium">Pays</FormLabel>
                            <FormControl>
                              <Input placeholder="France" className="h-10 text-base" {...field} />
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="transferReference"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">Référence virement</FormLabel>
                          <FormControl>
                            <Input className="h-10 text-base" {...field} />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">Notes (optionnel)</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Commentaires..." 
                              rows={3}
                              className="text-base resize-none"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Preuve paiement (optionnel)</label>
                      <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 text-center bg-gray-50">
                        <Upload className="mx-auto h-6 w-6 text-gray-400 mb-2" />
                        <div className="space-y-1">
                          <p className="text-xs text-gray-600">Glissez votre fichier ici</p>
                          {selectedFile && (
                            <p className="text-xs text-green-600 font-medium truncate">
                              {selectedFile.name}
                            </p>
                          )}
                        </div>
                        <input
                          type="file"
                          accept="image/*,.pdf"
                          onChange={handleFileChange}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                      </div>
                    </div>

                    <FormField
                      control={form.control}
                      name="termsAccepted"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox 
                              checked={field.value} 
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-sm">
                              J'accepte les conditions générales de vente
                            </FormLabel>
                            <FormMessage className="text-xs" />
                          </div>
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      className="w-full bg-luxe-gold hover:bg-luxe-gold/90 text-black font-medium h-12 text-base"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Envoi en cours..." : "Confirmer ma commande"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader className="pb-3 md:pb-6">
                <CardTitle className="text-lg md:text-xl">Informations bancaires</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="bg-gray-50 p-3 md:p-4 rounded-lg space-y-2 text-sm">
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
                <div className="bg-blue-50 p-3 md:p-4 rounded-lg mt-3 md:mt-4">
                  <p className="text-xs md:text-sm text-blue-700">
                    💳 Effectuez le virement de <strong>{depositAmount.toLocaleString()} €</strong> avec la référence fournie. 
                    Nous vous contacterons dès réception du paiement.
                  </p>
                </div>
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
