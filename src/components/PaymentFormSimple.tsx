
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

const formSchema = z.object({
  firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Adresse email invalide"),
  phone: z.string().min(10, "Numéro de téléphone invalide"),
  address: z.string().min(5, "Adresse requise"),
  city: z.string().min(2, "Ville requise"),
  postalCode: z.string().min(5, "Code postal requis"),
  transferReference: z.string().min(1, "Référence de virement requise"),
  notes: z.string().optional(),
  termsAccepted: z.boolean().refine(val => val === true, "Vous devez accepter les conditions"),
});

type FormData = z.infer<typeof formSchema>;

interface PaymentFormSimpleProps {
  vehicle: Vehicle;
}

const PaymentFormSimple = ({ vehicle }: PaymentFormSimpleProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      transferReference: `AGE-${vehicle.id}-${Date.now().toString().slice(-6)}`,
      notes: "",
      termsAccepted: false,
    },
  });

  const calculateDeposit = (price: number) => {
    return price * 0.2; // 20% deposit
  };

  const depositAmount = calculateDeposit(vehicle.price);

  const onSubmit = async (values: FormData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Commande envoyée avec succès !",
        description: "Nous avons bien reçu votre commande. Vous recevrez une confirmation par email.",
      });

      navigate('/payment-confirmation', { 
        state: { 
          order: { 
            vehicle, 
            customerInfo: values,
            depositAmount 
          } 
        } 
      });
    } catch (error) {
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">
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

                {/* Ville et Code postal */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
