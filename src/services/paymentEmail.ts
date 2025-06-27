
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
    console.log('📧 Début envoi email de confirmation (version simplifiée)');
    
    // Préparer les données sans upload de fichier
    const emailPayload = {
      ...data,
      payment_proof_url: '' // Pas d'upload pour l'instant
    };

    console.log('📤 Appel de la fonction edge send-payment-confirmation...');
    console.log('📧 Destinataire:', data.customer_email);

    const { data: result, error } = await supabase.functions.invoke('send-payment-confirmation', {
      body: emailPayload
    });

    if (error) {
      console.error('❌ Erreur fonction edge:', error);
      throw new Error(`Erreur envoi email: ${error.message}`);
    }

    console.log('✅ Réponse fonction edge:', result);
    return { ok: true, data: result };
  } catch (error) {
    console.error('❌ Erreur envoi email confirmation:', error);
    throw error;
  }
};
