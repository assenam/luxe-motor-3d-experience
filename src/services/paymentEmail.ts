
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

    // Préparer les données pour la fonction Edge
    const emailData = {
      vehicle_info: data.vehicle_info,
      vehicle_price: data.vehicle_price,
      deposit_amount: data.deposit_amount,
      transfer_reference: data.transfer_reference,
      customer_first_name: data.customer_first_name,
      customer_last_name: data.customer_last_name,
      customer_email: data.customer_email,
      customer_phone: data.customer_phone,
      customer_address: data.customer_address,
      customer_postal_code: data.customer_postal_code,
      customer_city: data.customer_city,
      customer_country: data.customer_country,
      payment_proof_url: data.payment_proof_file ? 'Fichier joint fourni' : null
    };

    console.log('📤 Appel de la fonction Edge send-payment-confirmation');
    
    const { data: result, error } = await supabase.functions.invoke('send-payment-confirmation', {
      body: emailData
    });

    if (error) {
      console.error('❌ Erreur fonction Edge:', error);
      throw new Error(`Erreur envoi email: ${error.message}`);
    }

    console.log('✅ Emails envoyés avec succès via Supabase Edge Function');
    console.log('📬 Réponse:', result);

    return { ok: true, data: result };
  } catch (error) {
    console.error('💥 ERREUR dans sendPaymentConfirmationEmail:', error);
    console.error('📊 Message erreur:', error instanceof Error ? error.message : 'Erreur inconnue');
    throw error;
  }
};
