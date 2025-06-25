
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

export const uploadPaymentProof = async (file: File, transferReference: string): Promise<string> => {
  console.log('🔄 Upload de la preuve de paiement:', file.name);
  
  const fileExt = file.name.split('.').pop();
  const fileName = `${transferReference}_${Date.now()}.${fileExt}`;
  const filePath = `${transferReference}/${fileName}`;

  const { data, error } = await supabase.storage
    .from('payment-proofs')
    .upload(filePath, file);

  if (error) {
    console.error('❌ Erreur upload preuve de paiement:', error);
    throw error;
  }

  console.log('✅ Upload réussi:', data);
  return filePath;
};

export const getPaymentProofSignedUrl = async (filePath: string): Promise<string> => {
  console.log('🔗 Création URL signée pour:', filePath);
  
  const { data, error } = await supabase.storage
    .from('payment-proofs')
    .createSignedUrl(filePath, 60 * 60 * 24 * 7); // 7 jours d'accès

  if (error) {
    console.error('❌ Erreur création URL signée:', error);
    throw error;
  }

  console.log('✅ URL signée créée:', data.signedUrl);
  return data.signedUrl;
};

export const sendPaymentConfirmationEmail = async (data: PaymentEmailData) => {
  try {
    console.log('📧 Début envoi email de confirmation');
    
    let paymentProofUrl = '';
    
    // Upload du fichier si présent
    if (data.payment_proof_file) {
      console.log('📎 Upload de la preuve de paiement...');
      const filePath = await uploadPaymentProof(data.payment_proof_file, data.transfer_reference);
      paymentProofUrl = await getPaymentProofSignedUrl(filePath);
      console.log('✅ Preuve de paiement uploadée et URL créée');
    } else {
      console.log('⚠️ Aucune preuve de paiement fournie');
    }

    const emailPayload = {
      ...data,
      payment_proof_url: paymentProofUrl
    };

    console.log('📤 Appel de la fonction edge send-payment-confirmation...');
    console.log('📧 Destinataire:', data.customer_email);

    const { data: result, error } = await supabase.functions.invoke('send-payment-confirmation', {
      body: emailPayload
    });

    if (error) {
      console.error('❌ Erreur fonction edge:', error);
      throw error;
    }

    console.log('✅ Réponse fonction edge:', result);
    return { ok: true, data: result };
  } catch (error) {
    console.error('❌ Erreur envoi email confirmation:', error);
    throw error;
  }
};
