
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
}

export const sendPaymentConfirmationEmail = async (data: PaymentEmailData) => {
  try {
    const { data: result, error } = await supabase.functions.invoke('send-payment-confirmation', {
      body: data
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
