
import React, { useState } from 'react';
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
import { useNavigate } from 'react-router-dom';

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

interface PaymentFormMobileProps {
  vehicle: Vehicle;
}

const PaymentFormMobile = ({ vehicle }: PaymentFormMobileProps) => {
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
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-lg mx-auto space-y-4">
        {/* Résumé véhicule */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Votre véhicule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-3 mb-3">
              <img 
                src={vehicle.mainImage || vehicle.images[0]} 
                alt={`${vehicle.brand} ${vehicle.model}`}
                className="w-16 h-16 object-cover rounded" 
              />
              <div>
                <h3 className="font-medium text-sm">{vehicle.brand} {vehicle.model}</h3>
                <p className="text-xs text-gray-600">{vehicle.year} • {vehicle.mileage.toLocaleString()} km</p>
              </div>
            </div>
            <div className="border-t pt-3 space-y-1">
              <div className="flex justify-between text-sm">
                <span>Prix total</span>
                <span>{vehicle.price.toLocaleString()} €</span>
              </div>
              <div className="flex justify-between font-medium text-green-600">
                <span>Acompte (20%)</span>
                <span>{depositAmount.toLocaleString()} €</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Formulaire */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Vos informations</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm">Prénom</FormLabel>
                        <FormControl>
                          <Input placeholder="Jean" className="h-10" {...field} />
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
                        <FormLabel className="text-sm">Nom</FormLabel>
                        <FormControl>
                          <Input placeholder="Dupont" className="h-10" {...field} />
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
                      <FormLabel className="text-sm">Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="jean@email.com" className="h-10" {...field} />
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
                      <FormLabel className="text-sm">Téléphone</FormLabel>
                      <FormControl>
                        <Input placeholder="06 12 34 56 78" className="h-10" {...field} />
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
                      <FormLabel className="text-sm">Adresse</FormLabel>
                      <FormControl>
                        <Input placeholder="123 Rue de la Paix" className="h-10" {...field} />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-3 gap-3">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm">Ville</FormLabel>
                        <FormControl>
                          <Input placeholder="Paris" className="h-10" {...field} />
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
                        <FormLabel className="text-sm">Code</FormLabel>
                        <FormControl>
                          <Input placeholder="75001" className="h-10" {...field} />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm">Pays</FormLabel>
                        <FormControl>
                          <Input placeholder="France" className="h-10" {...field} />
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
                      <FormLabel className="text-sm">Référence virement</FormLabel>
                      <FormControl>
                        <Input className="h-10" {...field} />
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
                      <FormLabel className="text-sm">Notes (optionnel)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Commentaires..." 
                          rows={3}
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                {/* Upload fichier */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Preuve paiement (optionnel)</label>
                  <div className="border-2 border-dashed border-gray-300 rounded p-4 text-center">
                    <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                    <div className="space-y-1">
                      <p className="text-xs text-gray-600">
                        Glissez votre fichier ici
                      </p>
                      {selectedFile && (
                        <p className="text-xs text-green-600 font-medium">
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
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox 
                          checked={field.value} 
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-xs">
                          J'accepte les conditions générales
                        </FormLabel>
                        <FormMessage className="text-xs" />
                      </div>
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full bg-luxe-gold hover:bg-luxe-gold/90 text-black font-medium h-12"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Envoi..." : "Confirmer ma commande"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Informations bancaires */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Informations bancaires</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 p-3 rounded space-y-1 text-sm">
              <p><strong>Titulaire :</strong> AUTO GERMANY EXPORT SARL</p>
              <p><strong>IBAN :</strong> FR76 XXXX XXXX XXXX XXXX XXXX XXX</p>
              <p><strong>BIC :</strong> XXXXXXXX</p>
            </div>
            <div className="bg-blue-50 p-3 rounded mt-3">
              <p className="text-xs text-blue-700">
                Effectuez le virement de {depositAmount.toLocaleString()} € avec la référence fournie. 
                Nous vous contacterons dès réception.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentFormMobile;
