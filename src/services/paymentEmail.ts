
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

    // Préparer les données pour Formspree
    const formData = {
      _subject: `🚗 Nouvelle commande - ${data.vehicle_info} - ${data.customer_first_name} ${data.customer_last_name}`,
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
      payment_proof_status: data.payment_proof_file ? 'Fichier joint fourni' : 'En attente',
      message: `
NOUVELLE COMMANDE AUTO GERMANY EXPORT

VÉHICULE:
- ${data.vehicle_info}
- Prix total: ${data.vehicle_price}
- Acompte: ${data.deposit_amount}
- Référence: ${data.transfer_reference}

CLIENT:
- Nom: ${data.customer_first_name} ${data.customer_last_name}
- Email: ${data.customer_email}
- Téléphone: ${data.customer_phone}
- Adresse: ${data.customer_address}, ${data.customer_postal_code} ${data.customer_city}, ${data.customer_country}

INSTRUCTIONS BANCAIRES:
- Bénéficiaire: Matera Marco
- IBAN: IT43D3608105138269139769151
- BIC: PPAYITR1XXX
- Type: BONIFICO ISTANTANEO
- Motif: REGOLAMENTO DEL SERVIZIO
- Référence obligatoire: ${data.transfer_reference}

ACTION REQUISE:
- Vérifier la réception du virement avec la référence: ${data.transfer_reference}
- Preuve de paiement: ${data.payment_proof_file ? 'Fichier joint fourni' : 'À recevoir par email'}
      `
    };

    console.log('📤 Envoi via Formspree...');
    
    const result = await submitToFormspree(formData);

    if (result.ok) {
      console.log('✅ Email envoyé avec succès via Formspree');
      return { ok: true, data: result };
    } else {
      console.error('❌ Erreur Formspree:', result.errors);
      throw new Error('Erreur envoi email via Formspree');
    }
  } catch (error) {
    console.error('💥 ERREUR dans sendPaymentConfirmationEmail:', error);
    console.error('📊 Message erreur:', error instanceof Error ? error.message : 'Erreur inconnue');
    throw error;
  }
};
