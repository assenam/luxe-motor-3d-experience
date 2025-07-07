
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
    console.log('🔍 DÉBUT sendPaymentConfirmationEmail via Formspree');
    console.log('📋 Données reçues:', {
      vehicle_info: data.vehicle_info,
      customer_email: data.customer_email,
      has_file: !!data.payment_proof_file
    });

    // Données simplifiées pour Formspree (éviter les messages trop longs)
    const formData = {
      _subject: `Nouvelle commande - ${data.vehicle_info}`,
      _replyto: data.customer_email,
      customer_name: `${data.customer_first_name} ${data.customer_last_name}`,
      customer_email: data.customer_email,
      customer_phone: data.customer_phone,
      vehicle: data.vehicle_info,
      price: data.vehicle_price,
      deposit: data.deposit_amount,
      reference: data.transfer_reference,
      address: `${data.customer_address}, ${data.customer_postal_code} ${data.customer_city}, ${data.customer_country}`,
      payment_proof: data.payment_proof_file ? 'Fichier joint fourni' : 'En attente',
      banking_info: 'Matera Marco - IT43D3608105138269139769151 - PPAYITR1XXX'
    };

    console.log('📤 Envoi via Formspree avec données simplifiées...');
    console.log('📋 FormData:', formData);
    
    const result = await submitToFormspree(formData);
    console.log('📬 Résultat Formspree:', result);

    if (result.ok) {
      console.log('✅ Email envoyé avec succès via Formspree');
      return { ok: true, data: result };
    } else {
      console.error('❌ Erreur Formspree détaillée:', {
        ok: result.ok,
        errors: result.errors,
        result: result
      });
      throw new Error(`Erreur Formspree: ${result.errors?.map(e => e.message).join(', ') || 'Erreur inconnue'}`);
    }
  } catch (error) {
    console.error('💥 ERREUR dans sendPaymentConfirmationEmail:', error);
    console.error('📊 Message erreur:', error instanceof Error ? error.message : 'Erreur inconnue');
    console.error('📊 Stack trace:', error instanceof Error ? error.stack : 'Pas de stack');
    throw error;
  }
};
