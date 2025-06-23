
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface OrderConfirmationRequest {
  customerInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    postalCode: string;
    city: string;
    country: string;
  };
  vehicle: {
    brand: string;
    model: string;
    year: number;
    price: number;
  };
  depositAmount: number;
  transferReference: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { customerInfo, vehicle, depositAmount, transferReference }: OrderConfirmationRequest = await req.json();

    console.log("Sending order confirmation email to:", customerInfo.email);

    const emailResponse = await resend.emails.send({
      from: "AUTO GERMANY EXPORT <commandes@auto-germany-export.com>",
      to: [customerInfo.email],
      subject: `Confirmation de votre commande - ${vehicle.brand} ${vehicle.model}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #D4AF37; margin: 0;">AUTO GERMANY EXPORT</h1>
            <p style="color: #666; margin: 5px 0;">Véhicules d'exception depuis l'Allemagne</p>
          </div>
          
          <h2 style="color: #333;">Bonjour ${customerInfo.firstName} ${customerInfo.lastName},</h2>
          
          <p style="color: #333; line-height: 1.6;">
            Nous avons bien reçu votre commande avec acompte pour le véhicule suivant :
          </p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #D4AF37; margin-top: 0;">${vehicle.brand} ${vehicle.model}</h3>
            <p style="margin: 5px 0;"><strong>Année :</strong> ${vehicle.year}</p>
            <p style="margin: 5px 0;"><strong>Prix total :</strong> ${vehicle.price.toLocaleString()} €</p>
            <p style="margin: 5px 0;"><strong>Acompte versé :</strong> ${depositAmount.toLocaleString()} € (20%)</p>
            <p style="margin: 5px 0;"><strong>Référence de virement :</strong> ${transferReference}</p>
          </div>
          
          <div style="background-color: #e8f4fd; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #0066cc; margin-top: 0;">📍 Adresse de livraison</h3>
            <p style="margin: 5px 0;">${customerInfo.address}</p>
            <p style="margin: 5px 0;">${customerInfo.postalCode} ${customerInfo.city}</p>
            <p style="margin: 5px 0;">${customerInfo.country}</p>
          </div>
          
          <div style="background-color: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #856404; margin-top: 0;">⏳ Prochaines étapes</h3>
            <ul style="color: #333; line-height: 1.6;">
              <li>Nous vérifions la réception de votre virement</li>
              <li>Nous préparons votre véhicule pour l'expédition</li>
              <li>Nous organisons le transport depuis l'Allemagne</li>
              <li>Nous vous contactons pour planifier la livraison</li>
            </ul>
          </div>
          
          <p style="color: #333; line-height: 1.6;">
            Notre équipe va maintenant traiter votre commande et vous tiendra informé(e) de chaque étape. 
            Vous recevrez un email de confirmation dès que nous aurons vérifié la réception de votre virement.
          </p>
          
          <p style="color: #333; line-height: 1.6;">
            Si vous avez des questions, n'hésitez pas à nous contacter à l'adresse 
            <a href="mailto:contact@auto-germany-export.com" style="color: #D4AF37;">contact@auto-germany-export.com</a> 
            ou au téléphone en mentionnant votre référence de commande.
          </p>
          
          <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; text-align: center;">
            <p style="color: #666; font-size: 14px; margin: 0;">
              Merci de votre confiance,<br>
              <strong>L'équipe AUTO GERMANY EXPORT</strong>
            </p>
          </div>
        </div>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-order-confirmation function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
