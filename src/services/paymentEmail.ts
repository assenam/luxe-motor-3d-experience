
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
  const fileExt = file.name.split('.').pop();
  const fileName = `${transferReference}_${Date.now()}.${fileExt}`;
  const filePath = `${transferReference}/${fileName}`;

  const { data, error } = await supabase.storage
    .from('payment-proofs')
    .upload(filePath, file);

  if (error) {
    console.error('Error uploading payment proof:', error);
    throw error;
  }

  return filePath;
};

export const getPaymentProofSignedUrl = async (filePath: string): Promise<string> => {
  const { data, error } = await supabase.storage
    .from('payment-proofs')
    .createSignedUrl(filePath, 60 * 60 * 24 * 7); // 7 jours d'accès

  if (error) {
    console.error('Error creating signed URL:', error);
    throw error;
  }

  return data.signedUrl;
};

export const sendPaymentConfirmationEmail = async (data: PaymentEmailData) => {
  try {
    let paymentProofUrl = '';
    
    // Upload du fichier si présent
    if (data.payment_proof_file) {
      const filePath = await uploadPaymentProof(data.payment_proof_file, data.transfer_reference);
      paymentProofUrl = await getPaymentProofSignedUrl(filePath);
    }

    const emailPayload = {
      ...data,
      payment_proof_url: paymentProofUrl
    };

    const { data: result, error } = await supabase.functions.invoke('send-payment-confirmation', {
      body: emailPayload
    });

    if (error) {
      throw error;
    }

    return { ok: true, data: result };
  } catch (error) {
    console.error('Error sending payment confirmation email:', error);
    throw error;
  }
};
