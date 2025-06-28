
import { submitToFormspree } from './formspree';

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
    console.log('🔍 DÉBUT sendPaymentConfirmationEmail');
    console.log('📋 Données reçues:', {
      vehicle_info: data.vehicle_info,
      customer_email: data.customer_email,
      has_file: !!data.payment_proof_file
    });

    // Test simple d'abord - juste les données texte via submitToFormspree
    const simpleData = {
      _subject: `Nouvelle commande avec acompte - ${data.vehicle_info}`,
      type: 'payment_confirmation',
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
      customer_country: data.customer_country
    };

    console.log('📤 Tentative envoi via submitToFormspree (données simples)');
    
    const result = await submitToFormspree(simpleData);
    
    console.log('📬 Réponse submitToFormspree:', result);
    
    if (result.ok) {
      console.log('✅ Email envoyé avec succès !');
      return { ok: true, data: result };
    } else {
      console.error('❌ Échec submitToFormspree:', result);
      throw new Error('Échec envoi via Formspree');
    }
  } catch (error) {
    console.error('💥 ERREUR COMPLÈTE dans sendPaymentConfirmationEmail:', error);
    console.error('📊 Stack trace:', error instanceof Error ? error.stack : 'Pas de stack trace');
    throw error;
  }
};
