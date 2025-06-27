
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface PaymentConfirmationRequest {
  vehicle_info: string;
  vehicle_price: string;
  deposit_amount: string;
  transfer_reference: string;
  customer_first_name: string;
  customer_last_name: string;
  customer_email: string;
  customer_phone: string;
  customer_address: string;
  customer_postal_code: string;
  customer_city: string;
  customer_country: string;
  payment_proof_url?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("=== DÉBUT FONCTION SEND-PAYMENT-CONFIRMATION (VERSION SIMPLIFIÉE) ===");
    
    // Vérifier la clé API Resend
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      console.error("❌ RESEND_API_KEY n'est pas configurée");
      throw new Error("RESEND_API_KEY non configurée");
    }
    console.log("✅ RESEND_API_KEY trouvée");

    const data: PaymentConfirmationRequest = await req.json();
    console.log("📧 Données reçues:", {
      customer_email: data.customer_email,
      vehicle_info: data.vehicle_info,
      has_payment_proof: !!data.payment_proof_url
    });

    // Email pour l'équipe AUTO GERMANY EXPORT
    console.log("📤 Envoi email équipe...");
    const teamEmailResponse = await resend.emails.send({
      from: "AUTO GERMANY EXPORT <noreply@autogermanyexport.com>",
      to: ["contact@autogermanyexport.com"],
      subject: `Nouvelle commande avec acompte - ${data.vehicle_info}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333; border-bottom: 2px solid #d4af37; padding-bottom: 10px;">
            🚗 Nouvelle commande avec acompte
          </h1>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #d4af37; margin-top: 0;">Détails du véhicule</h2>
            <p><strong>Véhicule :</strong> ${data.vehicle_info}</p>
            <p><strong>Prix total :</strong> ${data.vehicle_price}</p>
            <p><strong>Acompte versé :</strong> ${data.deposit_amount} (20%)</p>
            <p><strong>Référence de virement :</strong> ${data.transfer_reference}</p>
          </div>

          <div style="background-color: #f0f8ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #333; margin-top: 0;">Informations client</h2>
            <p><strong>Nom :</strong> ${data.customer_first_name} ${data.customer_last_name}</p>
            <p><strong>Email :</strong> ${data.customer_email}</p>
            <p><strong>Téléphone :</strong> ${data.customer_phone}</p>
            <p><strong>Adresse :</strong><br>
              ${data.customer_address}<br>
              ${data.customer_postal_code} ${data.customer_city}<br>
              ${data.customer_country}
            </p>
          </div>

          <div style="background-color: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ffc107;">
            <h3 style="color: #856404; margin-top: 0;">📋 NOTE IMPORTANTE</h3>
            <p>Le client peut envoyer sa preuve de paiement par email à contact@autogermanyexport.com ou l'ajouter lors de la commande.</p>
            <p><strong>Vérifier la réception du virement avec la référence : ${data.transfer_reference}</strong></p>
          </div>

          <div style="background-color: #ffe4e1; padding: 15px; border-radius: 8px; border-left: 4px solid #ff6b6b;">
            <p style="margin: 0;"><strong>⚠️ Action requise :</strong> Vérifier la réception du virement et traiter la commande</p>
          </div>
        </div>
      `,
    });

    console.log("📤 Réponse email équipe:", teamEmailResponse);
    
    if (teamEmailResponse.error) {
      console.error("❌ Erreur email équipe:", teamEmailResponse.error);
      throw new Error(`Erreur envoi email équipe: ${teamEmailResponse.error.message}`);
    }

    // Email de confirmation pour le client
    console.log("📤 Envoi email client...");
    const customerEmailResponse = await resend.emails.send({
      from: "AUTO GERMANY EXPORT <noreply@autogermanyexport.com>",
      to: [data.customer_email],
      subject: `Confirmation de votre commande - ${data.vehicle_info}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; padding: 20px 0; background-color: #d4af37; color: white; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0;">AUTO GERMANY EXPORT</h1>
            <p style="margin: 5px 0 0 0;">Votre spécialiste automobile allemand</p>
          </div>

          <div style="padding: 30px; background-color: #fafafa;">
            <h2 style="color: #333;">Bonjour ${data.customer_first_name} ${data.customer_last_name},</h2>
            
            <p>Nous avons bien reçu votre commande avec acompte pour le véhicule suivant :</p>

            <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #d4af37;">
              <h3 style="color: #d4af37; margin-top: 0;">🚗 VÉHICULE COMMANDÉ</h3>
              <p><strong>Véhicule :</strong> ${data.vehicle_info}</p>
              <p><strong>Prix total :</strong> ${data.vehicle_price}</p>
              <p><strong>Acompte versé :</strong> <span style="color: #28a745; font-weight: bold;">${data.deposit_amount} (20%)</span></p>
              <p><strong>Référence de virement :</strong> ${data.transfer_reference}</p>
            </div>

            <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #333; margin-top: 0;">📍 ADRESSE DE LIVRAISON</h3>
              <p style="margin: 5px 0;">${data.customer_address}</p>
              <p style="margin: 5px 0;">${data.customer_postal_code} ${data.customer_city}</p>
              <p style="margin: 5px 0;">${data.customer_country}</p>
            </div>

            <div style="background-color: #e7f3ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #0066cc; margin-top: 0;">📋 PREUVE DE PAIEMENT</h3>
              <p>Si vous n'avez pas encore envoyé votre preuve de paiement, vous pouvez :</p>
              <ul style="margin: 10px 0; padding-left: 20px;">
                <li>L'envoyer par email à <strong>contact@autogermanyexport.com</strong></li>
                <li>Préciser votre nom et la référence : <strong>${data.transfer_reference}</strong></li>
              </ul>
            </div>

            <div style="background-color: #e7f3ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #0066cc; margin-top: 0;">⏳ PROCHAINES ÉTAPES</h3>
              <ul style="margin: 0; padding-left: 20px;">
                <li>Nous vérifions la réception de votre virement</li>
                <li>Nous préparons votre véhicule pour l'expédition</li>
                <li>Nous organisons le transport depuis l'Allemagne</li>
                <li>Nous vous contactons pour planifier la livraison</li>
              </ul>
            </div>

            <p>Notre équipe va maintenant traiter votre commande et vous tiendra informé(e) de chaque étape.</p>
            
            <p>Si vous avez des questions, n'hésitez pas à nous contacter à <a href="mailto:contact@autogermanyexport.com" style="color: #d4af37;">contact@autogermanyexport.com</a></p>

            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center;">
              <p style="margin: 0; color: #666;">Merci de votre confiance,</p>
              <p style="margin: 0; font-weight: bold; color: #d4af37;">L'équipe AUTO GERMANY EXPORT</p>
            </div>
          </div>
        </div>
      `,
    });

    console.log("📤 Réponse email client:", customerEmailResponse);
    
    if (customerEmailResponse.error) {
      console.error("❌ Erreur email client:", customerEmailResponse.error);
      throw new Error(`Erreur envoi email client: ${customerEmailResponse.error.message}`);
    }

    console.log("✅ Emails envoyés avec succès");
    console.log("=== FIN FONCTION SEND-PAYMENT-CONFIRMATION ===");

    return new Response(JSON.stringify({ 
      success: true, 
      teamEmail: teamEmailResponse,
      customerEmail: customerEmailResponse 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("❌ ERREUR DANS send-payment-confirmation:", error);
    console.error("❌ Stack trace:", error.stack);
    return new Response(
      JSON.stringify({ error: error.message, stack: error.stack }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
