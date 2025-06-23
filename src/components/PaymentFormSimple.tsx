
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Vehicle } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload } from "lucide-react";
import { submitToFormspree } from '@/services/formspree';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const formSchema = z.object({
  firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Adresse email invalide"),
  phone: z.string().min(10, "Numéro de téléphone invalide"),
  address: z.string().min(5, "Adresse requise"),
  city: z.string().min(2, "Ville requise"),
  postalCode: z.string().min(5, "Code postal requis"),
  country: z.string().min(2, "Pays requis"),
  transferReference: z.string().min(1, "Référence de virement requise"),
  notes: z.string().optional(),
  termsAccepted: z.boolean().refine(val => val === true, "Vous devez accepter les conditions"),
  paymentProof: z
    .any()
    .optional()
    .refine((file) => {
      if (!file) return true; // Optional field
      return file?.size <= MAX_FILE_SIZE;
    }, "La taille du fichier doit être inférieure à 5MB")
    .refine((file) => {
      if (!file) return true; // Optional field
      return ACCEPTED_IMAGE_TYPES.includes(file?.type);
    }, "Seuls les formats .jpg, .jpeg, .png et .webp sont acceptés"),
});

type FormData = z.infer<typeof formSchema>;

interface PaymentFormSimpleProps {
  vehicle: Vehicle;
}

const PaymentFormSimple = ({ vehicle }: PaymentFormSimpleProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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
      transferReference: `AGE-${vehicle.id}-${Date.now().toString().slice(-6)}`,
      notes: "",
      termsAccepted: false,
    },
  });

  const calculateDeposit = (price: number) => {
    return price * 0.2; // 20% deposit
  };

  const depositAmount = calculateDeposit(vehicle.price);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      form.setValue('paymentProof', file);
    }
  };

  const onSubmit = async (values: FormData) => {
    setIsSubmitting(true);
    
    try {
      const submissionData = {
        ...values,
        _subject: `Nouvelle commande véhicule - ${vehicle.brand} ${vehicle.model}`,
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
        const hasPaymentProof = selectedFile !== null;
        
        toast({
          title: "Commande envoyée avec succès !",
          description: hasPaymentProof 
            ? "Nous avons bien reçu votre commande et votre preuve de paiement. Vous recevrez une confirmation par email."
            : "Nous avons bien reçu votre commande. N'oubliez pas d'effectuer le virement et de nous envoyer la preuve de paiement.",
        });

        navigate('/payment-confirmation', { 
          state: { 
            order: { 
              vehicle, 
              customerInfo: {
                ...values,
                paymentProofUploaded: hasPaymentProof
              },
              depositAmount 
            } 
          } 
        });
      } else {
        throw new Error('Échec de l\'envoi');
      }
    } catch (error) {
      console.error('Order submission error:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi de votre commande.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 py-6">
      <div className="max-w-4xl mx-auto px-4 space-y-6">
        {/* Résumé de commande */}
        <Card>
          <CardHeader>
            <CardTitle>Résumé de votre commande</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4 mb-4">
              <img 
                src={vehicle.mainImage || vehicle.images[0]} 
                alt={`${vehicle.brand} ${vehicle.model}`}
                className="w-20 h-20 object-cover rounded" 
              />
              <div>
                <h3 className="font-semibold">{vehicle.brand} {vehicle.model}</h3>
                <p className="text-gray-600">{vehicle.year} • {vehicle.mileage.toLocaleString()} km</p>
              </div>
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between mb-2">
                <span>Prix total</span>
                <span>{vehicle.price.toLocaleString()} €</span>
              </div>
              <div className="flex justify-between font-semibold text-lg">
                <span>Acompte à payer (20%)</span>
                <span className="text-green-600">{depositAmount.toLocaleString()} €</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Formulaire de commande */}
        <Card>
          <CardHeader>
            <CardTitle>Informations de commande</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Prénom et Nom */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Prénom *</FormLabel>
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
                        <FormLabel>Nom *</FormLabel>
                        <FormControl>
                          <Input placeholder="Dupont" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Email et Téléphone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email *</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="jean.dupont@email.com" {...field} />
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
                        <FormLabel>Téléphone *</FormLabel>
                        <FormControl>
                          <Input placeholder="06 12 34 56 78" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Adresse */}
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Adresse *</FormLabel>
                      <FormControl>
                        <Input placeholder="123 Rue de la Paix" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Ville, Code postal et Pays */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ville *</FormLabel>
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
                        <FormLabel>Code postal *</FormLabel>
                        <FormControl>
                          <Input placeholder="75001" {...field} />
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
                        <FormLabel>Pays *</FormLabel>
                        <FormControl>
                          <Input placeholder="France" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Référence de virement */}
                <FormField
                  control={form.control}
                  name="transferReference"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Référence de virement *</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Upload de preuve de paiement */}
                <FormField
                  control={form.control}
                  name="paymentProof"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preuve de paiement (optionnel)</FormLabel>
                      <FormControl>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center relative">
                          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                          <div className="space-y-2">
                            <p className="text-sm text-gray-600">
                              Cliquez pour télécharger ou glissez-déposez
                            </p>
                            <p className="text-xs text-gray-500">
                              PNG, JPG, JPEG ou WEBP (max. 5MB)
                            </p>
                            {selectedFile && (
                              <p className="text-sm text-green-600 font-medium">
                                Fichier sélectionné: {selectedFile.name}
                              </p>
                            )}
                          </div>
                          <input
                            type="file"
                            accept={ACCEPTED_IMAGE_TYPES.join(",")}
                            onChange={handleFileChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Notes */}
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notes supplémentaires (optionnel)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Informations complémentaires..." 
                          rows={3}
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Conditions générales */}
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
                        <FormLabel className="text-sm">
                          J'accepte les conditions générales de vente *
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                {/* Bouton de soumission */}
                <div className="pt-4">
                  <Button 
                    type="submit" 
                    className="w-full bg-luxe-gold hover:bg-luxe-gold/90 text-black font-medium py-3"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Envoi en cours..." : "Confirmer ma commande"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Informations de paiement */}
        <Card>
          <CardHeader>
            <CardTitle>Informations de paiement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 p-4 rounded space-y-2">
              <h4 className="font-medium">Coordonnées bancaires :</h4>
              <p className="text-sm">Titulaire : AUTO GERMANY EXPORT SARL</p>
              <p className="text-sm">IBAN : FR76 XXXX XXXX XXXX XXXX XXXX XXX</p>
              <p className="text-sm">BIC : XXXXXXXX</p>
            </div>
            <div className="bg-blue-50 p-4 rounded mt-4">
              <h4 className="font-medium text-blue-800 mb-2">Important :</h4>
              <p className="text-sm text-blue-700">
                Votre commande ne sera validée qu'après réception et vérification de votre preuve de paiement. 
                Vous pouvez l'ajouter directement dans le formulaire ci-dessus ou nous l'envoyer par email après votre commande.
              </p>
            </div>
            <p className="text-sm text-gray-600 mt-4">
              Veuillez effectuer le virement de l'acompte de {depositAmount.toLocaleString()} € en utilisant la référence fournie. 
              Nous vous contacterons dès réception du paiement.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentFormSimple;
