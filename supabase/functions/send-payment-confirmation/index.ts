
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface PaymentConfirmationRequest {
  vehicleInfo: string;
  vehiclePrice: string;
  depositAmount: string;
  transferReference: string;
  customerFirstName: string;
  customerLastName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  customerPostalCode: string;
  customerCity: string;
  customerCountry: string;
  hasPaymentProof: boolean;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("=== DÉBUT FONCTION SEND-PAYMENT-CONFIRMATION ===");
    
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      console.error("❌ RESEND_API_KEY n'est pas configurée");
      throw new Error("RESEND_API_KEY non configurée");
    }
    console.log("✅ RESEND_API_KEY trouvée");

    const data: PaymentConfirmationRequest = await req.json();
    console.log("📧 Données reçues:", {
      customerEmail: data.customerEmail,
      vehicleInfo: data.vehicleInfo,
      hasPaymentProof: data.hasPaymentProof
    });

    // Email pour l'équipe
    console.log("📤 Envoi email équipe...");
    const teamEmailResponse = await resend.emails.send({
      from: "AUTO GERMANY EXPORT <contact@autogermanyexport.com>",
      to: ["contact@autogermanyexport.com"],
      subject: `🚗 Nouvelle commande - ${data.vehicleInfo} - ${data.customerFirstName} ${data.customerLastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8f9fa;">
          <div style="background-color: #d4af37; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">🚗 NOUVELLE COMMANDE</h1>
            <p style="margin: 5px 0 0 0; font-size: 16px;">AUTO GERMANY EXPORT</p>
          </div>

          <div style="padding: 30px; background-color: white;">
            <div style="background-color: #fff3cd; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #ffc107;">
              <h2 style="color: #856404; margin-top: 0; font-size: 18px;">📋 INFORMATIONS COMMANDE</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; font-weight: bold;">Véhicule :</td><td style="padding: 8px 0;">${data.vehicleInfo}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Prix total :</td><td style="padding: 8px 0;">${data.vehiclePrice}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Acompte versé :</td><td style="padding: 8px 0; color: #28a745; font-weight: bold;">${data.depositAmount}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Référence :</td><td style="padding: 8px 0; color: #d4af37; font-weight: bold;">${data.transferReference}</td></tr>
              </table>
            </div>

            <div style="background-color: #e7f3ff; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #0066cc;">
              <h2 style="color: #0066cc; margin-top: 0; font-size: 18px;">👤 INFORMATIONS CLIENT</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; font-weight: bold;">Nom :</td><td style="padding: 8px 0;">${data.customerFirstName} ${data.customerLastName}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Email :</td><td style="padding: 8px 0;">${data.customerEmail}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Téléphone :</td><td style="padding: 8px 0;">${data.customerPhone}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Adresse :</td><td style="padding: 8px 0;">${data.customerAddress}<br>${data.customerPostalCode} ${data.customerCity}<br>${data.customerCountry}</td></tr>
              </table>
            </div>

            <div style="background-color: #ffe4e1; padding: 20px; border-radius: 8px; border-left: 4px solid #ff6b6b;">
              <h3 style="color: #721c24; margin-top: 0;">⚠️ ACTION REQUISE</h3>
              <p style="margin: 10px 0;"><strong>Vérifier la réception du virement :</strong> ${data.transferReference}</p>
              <p style="margin: 10px 0;"><strong>Preuve de paiement :</strong> ${data.hasPaymentProof ? 'Fournie' : 'À recevoir par email'}</p>
            </div>
          </div>
        </div>
      `,
    });

    if (teamEmailResponse.error) {
      console.error("❌ Erreur email équipe:", teamEmailResponse.error);
      throw new Error(`Erreur envoi email équipe: ${teamEmailResponse.error.message}`);
    }

    // Email de confirmation pour le client
    console.log("📤 Envoi email client...");
    const customerEmailResponse = await resend.emails.send({
      from: "AUTO GERMANY EXPORT <contact@autogermanyexport.com>",
      to: [data.customerEmail],
      subject: `✅ Confirmation de commande - ${data.vehicleInfo} - Réf: ${data.transferReference}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8f9fa;">
          <div style="background-color: #d4af37; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">AUTO GERMANY EXPORT</h1>
            <p style="margin: 5px 0 0 0; font-size: 16px;">Votre spécialiste automobile allemand</p>
          </div>

          <div style="padding: 30px; background-color: white;">
            <h2 style="color: #333; margin-top: 0;">Bonjour ${data.customerFirstName} ${data.customerLastName},</h2>
            
            <p style="font-size: 16px; line-height: 1.6;">Nous avons bien reçu votre commande avec acompte. Voici le récapitulatif :</p>

            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #d4af37;">
              <h3 style="color: #d4af37; margin-top: 0;">🚗 VÉHICULE COMMANDÉ</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; font-weight: bold;">Véhicule :</td><td style="padding: 8px 0;">${data.vehicleInfo}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Prix total :</td><td style="padding: 8px 0;">${data.vehiclePrice}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Acompte :</td><td style="padding: 8px 0; color: #28a745; font-weight: bold;">${data.depositAmount} (20%)</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Référence :</td><td style="padding: 8px 0; color: #d4af37; font-weight: bold;">${data.transferReference}</td></tr>
              </table>
            </div>

            <div style="background-color: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ffc107;">
              <h3 style="color: #856404; margin-top: 0;">🏦 INSTRUCTIONS DE VIREMENT</h3>
              <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
                <tr><td style="padding: 8px 0; font-weight: bold;">Bénéficiaire :</td><td style="padding: 8px 0;">Matera Marco</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">IBAN :</td><td style="padding: 8px 0; font-family: monospace;">IT43D3608105138269139769151</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">BIC :</td><td style="padding: 8px 0; font-family: monospace;">PPAYITR1XXX</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Type :</td><td style="padding: 8px 0;">BONIFICO ISTANTANEO</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Motif :</td><td style="padding: 8px 0;">REGOLAMENTO DEL SERVIZIO</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Montant :</td><td style="padding: 8px 0; color: #28a745; font-weight: bold;">${data.depositAmount}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Référence :</td><td style="padding: 8px 0; color: #d4af37; font-weight: bold;">${data.transferReference}</td></tr>
              </table>
              <p style="margin: 10px 0; color: #856404;"><strong>⚠️ Important :</strong> La référence est obligatoire pour identifier votre paiement.</p>
            </div>

            <div style="background-color: #e7f3ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #0066cc; margin-top: 0;">📋 PROCHAINES ÉTAPES</h3>
              <ol style="margin: 0; padding-left: 20px;">
                <li style="margin: 8px 0;">Effectuer le virement avec la référence : <strong>${data.transferReference}</strong></li>
                <li style="margin: 8px 0;">Envoyer la preuve de paiement à : <strong>contact@autogermanyexport.com</strong></li>
                <li style="margin: 8px 0;">Notre équipe vérifie la réception du virement</li>
                <li style="margin: 8px 0;">Préparation et expédition depuis l'Allemagne</li>
                <li style="margin: 8px 0;">Livraison à votre adresse</li>
              </ol>
            </div>

            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0; text-align: center;"><strong>📞 Contact :</strong> contact@autogermanyexport.com</p>
            </div>

            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center;">
              <p style="margin: 0; color: #666;">Merci de votre confiance,</p>
              <p style="margin: 0; font-weight: bold; color: #d4af37;">L'équipe AUTO GERMANY EXPORT</p>
            </div>
          </div>
        </div>
      `,
    });

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
