
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
import { ArrowLeft, Building2, ClipboardCopy, FileText, Info, Upload } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Vehicle } from '@/lib/data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from '@/hooks/use-mobile';

const formSchema = z.object({
  firstName: z.string().min(2, { message: "Le prénom doit contenir au moins 2 caractères" }),
  lastName: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  email: z.string().email({ message: "Adresse email invalide" }),
  phone: z.string().min(10, { message: "Numéro de téléphone invalide" }),
  address: z.string().min(5, { message: "Adresse requise" }),
  city: z.string().min(2, { message: "Ville requise" }),
  postalCode: z.string().min(5, { message: "Code postal requis" }),
  country: z.string().min(2, { message: "Pays requis" }),
  transferDate: z.string().min(1, { message: "Date de virement requise" }),
  transferReference: z.string().min(1, { message: "Référence de virement requise" }),
  paymentProof: z.instanceof(File).optional().or(z.literal('')),
  notes: z.string().optional(),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: "Vous devez accepter les conditions générales"
  }),
});

// Définir un type pour les noms des champs du formulaire
type FormFields = keyof z.infer<typeof formSchema>;

const PaymentForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [bankInfoOpen, setBankInfoOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentProofFile, setPaymentProofFile] = useState<File | null>(null);
  const isMobile = useIsMobile();
  
  const form = useForm<z.infer<typeof formSchema>>({
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
      transferDate: "",
      transferReference: "",
      paymentProof: '',
      notes: "",
      termsAccepted: false,
    },
  });
  
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
  
  const calculateDeposit = (price: number) => {
    return price * 0.2; // 20% deposit
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPaymentProofFile(file);
      form.setValue('paymentProof', file);
    }
  };
  
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Form values:", values);
    console.log("Payment proof:", paymentProofFile);
    
    toast({
      title: "Paiement par virement initié",
      description: "Nous avons bien reçu vos informations. Votre commande sera confirmée dès réception du virement.",
    });
    
    navigate('/payment-confirmation', { 
      state: { 
        order: { 
          vehicle, 
          customerInfo: { 
            ...values, 
            paymentProofUploaded: !!paymentProofFile 
          } 
        } 
      } 
    });
  };
  
  const copyBankDetails = () => {
    navigator.clipboard.writeText("IBAN: FR76 XXXX XXXX XXXX XXXX XXXX XXX - BIC: XXXXXXXX");
    toast({
      title: "Copié dans le presse-papiers",
      description: "Les coordonnées bancaires ont été copiées.",
    });
  };
  
  if (!vehicle) return null;
  
  const depositAmount = calculateDeposit(vehicle.price);

  const nextStep = () => {
    if (currentStep === 1) {
      const personalInfoFields: FormFields[] = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'postalCode', 'country'];
      const isValid = personalInfoFields.every(field => !!form.getValues(field));
      
      if (!isValid) {
        form.trigger(personalInfoFields);
        return;
      }
    }
    
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const renderStepIndicator = () => {
    return (
      <div className="flex items-center justify-center mb-8">
        {[1, 2, 3].map((step) => (
          <React.Fragment key={step}>
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep >= step ? 'bg-luxe-gold text-white' : 'bg-gray-200 text-gray-500'
              }`}
            >
              {step}
            </div>
            {step < 3 && (
              <div className={`h-1 w-16 ${currentStep > step ? 'bg-luxe-gold' : 'bg-gray-200'}`}></div>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  const BankInformationCard = () => (
    <div className="bg-white p-6 rounded-sm shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Coordonnées bancaires</h3>
        <button 
          onClick={() => setBankInfoOpen(true)}
          className="flex items-center text-sm text-luxe-gold hover:text-luxe-gold/80"
        >
          <Info size={16} className="mr-1" />
          <span>Plus d'infos</span>
        </button>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-sm text-sm mb-4">
        <div className="mb-2">
          <span className="font-medium block">Titulaire du compte</span>
          <span>AUTO GERMANY EXPORT SARL</span>
        </div>
        <div className="mb-2">
          <span className="font-medium block">IBAN</span>
          <span>FR76 XXXX XXXX XXXX XXXX XXXX XXX</span>
        </div>
        <div>
          <span className="font-medium block">BIC</span>
          <span>XXXXXXXX</span>
        </div>
      </div>
      
      <div>
        <button
          onClick={copyBankDetails}
          className="w-full flex items-center justify-center text-sm border border-gray-300 rounded-sm py-2 px-4 hover:bg-gray-50"
        >
          <ClipboardCopy size={16} className="mr-2" />
          <span>Copier les coordonnées</span>
        </button>
      </div>
    </div>
  );

  const OrderSummaryCard = () => (
    <div className="bg-white p-6 rounded-sm shadow-sm mb-6">
      <h3 className="text-lg font-semibold mb-4">Résumé de commande</h3>
      <div className="flex items-center mb-4">
        <img 
          src={vehicle?.images[0]} 
          alt={`${vehicle?.brand} ${vehicle?.model}`}
          className="w-20 h-20 object-cover rounded-sm mr-4" 
        />
        <div>
          <h4 className="font-medium">{vehicle?.brand} {vehicle?.model}</h4>
          <p className="text-sm text-gray-600">{vehicle?.year} • {vehicle?.mileage} km</p>
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-4 mt-4">
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Prix du véhicule</span>
          <span>{vehicle?.price.toLocaleString('fr-FR')} €</span>
        </div>
        <div className="flex justify-between font-medium text-lg">
          <span>Acompte (20%)</span>
          <span className="text-luxe-gold">{depositAmount.toLocaleString('fr-FR')} €</span>
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-600">
          <span>Reste à payer</span>
          <span>{(vehicle?.price - depositAmount).toLocaleString('fr-FR')} €</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="mb-8">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-6"
            >
              <ArrowLeft size={18} className="mr-2" />
              <span>Retour</span>
            </button>
            
            <h1 className="text-3xl font-playfair font-semibold mb-2">
              Paiement par Virement Bancaire
            </h1>
            <p className="text-gray-600">
              Finalisez l'achat de votre {vehicle.brand} {vehicle.model}
            </p>
          </div>

          {isMobile && renderStepIndicator()}
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {isMobile ? (
                    <>
                      {currentStep === 1 && (
                        <div className="bg-white p-6 rounded-sm shadow-sm mb-8">
                          <div className="flex items-center mb-4">
                            <FileText className="text-luxe-gold mr-3" size={24} />
                            <h2 className="text-xl font-semibold">Informations personnelles</h2>
                          </div>
                          
                          <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Prénom</FormLabel>
                                    <FormControl>
                                      <Input placeholder="Jean" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Nom</FormLabel>
                                    <FormControl>
                                      <Input placeholder="Dupont" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                      <Input type="email" placeholder="jean.dupont@example.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Téléphone</FormLabel>
                                    <FormControl>
                                      <Input placeholder="+33 6 12 34 56 78" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            
                            <FormField
                              control={form.control}
                              name="address"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Adresse</FormLabel>
                                  <FormControl>
                                    <Input placeholder="123 Rue de Paris" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                              <FormField
                                control={form.control}
                                name="city"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Ville</FormLabel>
                                    <FormControl>
                                      <Input placeholder="Paris" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={form.control}
                                name="postalCode"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Code Postal</FormLabel>
                                    <FormControl>
                                      <Input placeholder="75000" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={form.control}
                                name="country"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Pays</FormLabel>
                                    <FormControl>
                                      <Input placeholder="France" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>

                          <div className="mt-6 flex justify-end">
                            <button
                              type="button"
                              onClick={nextStep}
                              className="premium-button bg-luxe-gold hover:bg-luxe-gold/90 text-black"
                            >
                              Continuer
                            </button>
                          </div>
                        </div>
                      )}

                      {currentStep === 2 && (
                        <>
                          <OrderSummaryCard />
                          <BankInformationCard />

                          <div className="bg-white p-6 rounded-sm shadow-sm mt-6">
                            <div className="flex items-center mb-4">
                              <Building2 className="text-luxe-gold mr-3" size={24} />
                              <h2 className="text-xl font-semibold">Informations de paiement</h2>
                            </div>
                            
                            <div className="grid grid-cols-1 gap-6">
                              <FormField
                                control={form.control}
                                name="transferDate"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Date prévue du virement</FormLabel>
                                    <FormControl>
                                      <Input type="date" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={form.control}
                                name="transferReference"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Référence du virement</FormLabel>
                                    <FormControl>
                                      <Input 
                                        placeholder={`AGE-${vehicle.id}-${new Date().getTime().toString().slice(-6)}`} 
                                        {...field} 
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>

                          <div className="flex justify-between mt-6">
                            <button
                              type="button"
                              onClick={prevStep}
                              className="premium-button bg-white border border-luxe-black hover:bg-secondary text-luxe-black"
                            >
                              Retour
                            </button>
                            <button
                              type="button"
                              onClick={nextStep}
                              className="premium-button bg-luxe-gold hover:bg-luxe-gold/90 text-black"
                            >
                              Continuer
                            </button>
                          </div>
                        </>
                      )}

                      {currentStep === 3 && (
                        <div className="bg-white p-6 rounded-sm shadow-sm mb-8">
                          <div className="flex items-center mb-4">
                            <Upload className="text-luxe-gold mr-3" size={24} />
                            <h2 className="text-xl font-semibold">Preuve de paiement</h2>
                          </div>
                          
                          <div className="space-y-6">
                            <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                              <input 
                                type="file" 
                                id="paymentProof" 
                                className="hidden" 
                                accept="image/*, application/pdf"
                                onChange={handleFileChange}
                              />
                              <label 
                                htmlFor="paymentProof" 
                                className="cursor-pointer flex flex-col items-center"
                              >
                                <Upload className="h-12 w-12 text-gray-400 mb-2" />
                                <span className="text-sm font-medium text-gray-900">
                                  {paymentProofFile ? paymentProofFile.name : "Télécharger votre justificatif de virement"}
                                </span>
                                <p className="text-xs text-gray-500 mt-1">
                                  JPG, PNG ou PDF (max. 10 MB)
                                </p>
                              </label>
                            </div>
                            
                            <FormField
                              control={form.control}
                              name="notes"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Notes supplémentaires (optionnel)</FormLabel>
                                  <FormControl>
                                    <Textarea 
                                      placeholder="Précisez ici toute information complémentaire concernant votre commande ou votre paiement." 
                                      {...field} 
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="termsAccepted"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                  <FormControl>
                                    <Checkbox 
                                      checked={field.value} 
                                      onCheckedChange={field.onChange}
                                    />
                                  </FormControl>
                                  <div className="space-y-1 leading-none">
                                    <FormLabel className="text-sm font-normal">
                                      J'accepte les{" "}
                                      <a 
                                        href="/terms-of-service" 
                                        target="_blank" 
                                        className="text-luxe-gold hover:underline"
                                      >
                                        conditions générales de vente
                                      </a>
                                      {" "}et la{" "}
                                      <a 
                                        href="/privacy-policy" 
                                        target="_blank"
                                        className="text-luxe-gold hover:underline"
                                      >
                                        politique de confidentialité
                                      </a>
                                    </FormLabel>
                                    <FormMessage />
                                  </div>
                                </FormItem>
                              )}
                            />
                          </div>

                          <div className="flex justify-between mt-6">
                            <button
                              type="button"
                              onClick={prevStep}
                              className="premium-button bg-white border border-luxe-black hover:bg-secondary text-luxe-black"
                            >
                              Retour
                            </button>
                            <button
                              type="submit"
                              className="premium-button bg-luxe-gold hover:bg-luxe-gold/90 text-black"
                            >
                              Valider ma commande
                            </button>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="bg-white p-6 rounded-sm shadow-sm mb-8">
                      <div className="flex items-center mb-4">
                        <FileText className="text-luxe-gold mr-3" size={24} />
                        <h2 className="text-xl font-semibold">Informations personnelles</h2>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Prénom</FormLabel>
                              <FormControl>
                                <Input placeholder="Jean" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nom</FormLabel>
                              <FormControl>
                                <Input placeholder="Dupont" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="jean.dupont@example.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Téléphone</FormLabel>
                              <FormControl>
                                <Input placeholder="+33 6 12 34 56 78" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem className="mt-6">
                            <FormLabel>Adresse</FormLabel>
                            <FormControl>
                              <Input placeholder="123 Rue de Paris" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-6">
                        <FormField
                          control={form.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Ville</FormLabel>
                              <FormControl>
                                <Input placeholder="Paris" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="postalCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Code Postal</FormLabel>
                              <FormControl>
                                <Input placeholder="75000" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="country"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Pays</FormLabel>
                              <FormControl>
                                <Input placeholder="France" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="pt-6 border-t border-gray-200 mt-6">
                        <div className="flex items-center mb-4">
                          <Building2 className="text-luxe-gold mr-3" size={24} />
                          <h2 className="text-xl font-semibold">Informations de paiement</h2>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="transferDate"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Date prévue du virement</FormLabel>
                                <FormControl>
                                  <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="transferReference"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Référence du virement</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder={`AGE-${vehicle.id}-${new Date().getTime().toString().slice(-6)}`} 
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <div className="mt-6">
                          <div className="flex items-center mb-4">
                            <Upload className="text-luxe-gold mr-3" size={24} />
                            <h2 className="text-xl font-semibold">Preuve de paiement</h2>
                          </div>
                          
                          <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                            <input 
                              type="file" 
                              id="paymentProof" 
                              className="hidden" 
                              accept="image/*, application/pdf"
                              onChange={handleFileChange}
                            />
                            <label 
                              htmlFor="paymentProof" 
                              className="cursor-pointer flex flex-col items-center"
                            >
                              <Upload className="h-12 w-12 text-gray-400 mb-2" />
                              <span className="text-sm font-medium text-gray-900">
                                {paymentProofFile ? paymentProofFile.name : "Télécharger votre justificatif de virement"}
                              </span>
                              <p className="text-xs text-gray-500 mt-1">
                                JPG, PNG ou PDF (max. 10 MB)
                              </p>
                            </label>
                          </div>
                        </div>
                        
                        <FormField
                          control={form.control}
                          name="notes"
                          render={({ field }) => (
                            <FormItem className="mt-6">
                              <FormLabel>Notes supplémentaires (optionnel)</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Précisez ici toute information complémentaire concernant votre commande ou votre paiement." 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="termsAccepted"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-6">
                            <FormControl>
                              <Checkbox 
                                checked={field.value} 
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel className="text-sm font-normal">
                                J'accepte les{" "}
                                <a 
                                  href="/terms-of-service" 
                                  target="_blank" 
                                  className="text-luxe-gold hover:underline"
                                >
                                  conditions générales de vente
                                </a>
                                {" "}et la{" "}
                                <a 
                                  href="/privacy-policy" 
                                  target="_blank"
                                  className="text-luxe-gold hover:underline"
                                >
                                  politique de confidentialité
                                </a>
                              </FormLabel>
                              <FormMessage />
                            </div>
                          </FormItem>
                        )}
                      />
                      
                      <div className="pt-4 flex justify-end">
                        <button
                          type="submit"
                          className="premium-button bg-luxe-gold hover:bg-luxe-gold/90 text-black"
                        >
                          Valider ma commande
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              </Form>
            </div>
            
            <div className="md:col-span-1">
              {!isMobile && (
                <>
                  <OrderSummaryCard />
                  <BankInformationCard />
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Dialog open={bankInfoOpen} onOpenChange={setBankInfoOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Informations de paiement</DialogTitle>
            <DialogDescription>
              Utilisez ces coordonnées bancaires pour effectuer votre virement.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Instructions pour le virement bancaire</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>Effectuez le virement depuis votre compte bancaire personnel ou professionnel.</li>
                <li>Utilisez la référence indiquée pour nous permettre d'identifier votre paiement.</li>
                <li>L'acompte de 20% doit être reçu pour confirmer votre commande.</li>
                <li>Le reste à payer devra être réglé avant la livraison du véhicule.</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-sm">
              <h3 className="font-medium mb-2">Coordonnées bancaires complètes</h3>
              <div className="space-y-2 text-sm">
                <div className="grid grid-cols-3">
                  <span className="font-medium">Banque</span>
                  <span className="col-span-2">BANQUE XXXX</span>
                </div>
                <div className="grid grid-cols-3">
                  <span className="font-medium">Titulaire</span>
                  <span className="col-span-2">AUTO GERMANY EXPORT SARL</span>
                </div>
                <div className="grid grid-cols-3">
                  <span className="font-medium">IBAN</span>
                  <span className="col-span-2">FR76 XXXX XXXX XXXX XXXX XXXX XXX</span>
                </div>
                <div className="grid grid-cols-3">
                  <span className="font-medium">BIC</span>
                  <span className="col-span-2">XXXXXXXX</span>
                </div>
                <div className="grid grid-cols-3">
                  <span className="font-medium">Adresse</span>
                  <span className="col-span-2">123 Avenue des Banques, 75000 Paris</span>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <button
              onClick={copyBankDetails}
              className="premium-button bg-white border border-luxe-black hover:bg-secondary text-luxe-black"
            >
              <ClipboardCopy size={16} className="mr-2" />
              <span>Copier les coordonnées</span>
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default PaymentForm;
