
import { supabase } from '@/integrations/supabase/client';

export interface PaymentEmailData {
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
  payment_proof_file?: File;
}

export const sendPaymentConfirmationEmail = async (data: PaymentEmailData) => {
  try {
    console.log('🔍 DÉBUT sendPaymentConfirmationEmail via Supabase Edge Function');
    console.log('📋 Données reçues:', {
      vehicle_info: data.vehicle_info,
      customer_email: data.customer_email,
      has_file: !!data.payment_proof_file
    });

    // Préparer les données pour l'edge function
    const emailData = {
      vehicleInfo: data.vehicle_info,
      vehiclePrice: data.vehicle_price,
      depositAmount: data.deposit_amount,
      transferReference: data.transfer_reference,
      customerFirstName: data.customer_first_name,
      customerLastName: data.customer_last_name,
      customerEmail: data.customer_email,
      customerPhone: data.customer_phone,
      customerAddress: data.customer_address,
      customerPostalCode: data.customer_postal_code,
      customerCity: data.customer_city,
      customerCountry: data.customer_country,
      hasPaymentProof: !!data.payment_proof_file
    };

    console.log('📤 Envoi via edge function Supabase...');
    
    const { data: result, error } = await supabase.functions.invoke('send-payment-confirmation', {
      body: emailData
    });

    if (error) {
      console.error('❌ Erreur edge function:', error);
      throw new Error(`Erreur edge function: ${error.message}`);
    }

    console.log('📬 Résultat:', result);
    console.log('✅ Emails envoyés avec succès via Supabase/Resend');
    
    return { ok: true, data: result };
  } catch (error) {
    console.error('💥 ERREUR dans sendPaymentConfirmationEmail:', error);
    console.error('📊 Message erreur:', error instanceof Error ? error.message : 'Erreur inconnue');
    throw error;
  }
};
