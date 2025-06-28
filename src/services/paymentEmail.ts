
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
    console.log('📧 Envoi email via Formspree');
    
    // Préparer les données pour Formspree
    const formData = new FormData();
    
    // Ajouter toutes les données texte
    formData.append('_subject', `Nouvelle commande avec acompte - ${data.vehicle_info}`);
    formData.append('type', 'payment_confirmation');
    formData.append('vehicle_info', data.vehicle_info);
    formData.append('vehicle_price', data.vehicle_price);
    formData.append('deposit_amount', data.deposit_amount);
    formData.append('transfer_reference', data.transfer_reference);
    formData.append('customer_first_name', data.customer_first_name);
    formData.append('customer_last_name', data.customer_last_name);
    formData.append('customer_email', data.customer_email);
    formData.append('customer_phone', data.customer_phone);
    formData.append('customer_address', data.customer_address);
    formData.append('customer_postal_code', data.customer_postal_code);
    formData.append('customer_city', data.customer_city);
    formData.append('customer_country', data.customer_country);
    
    // Ajouter le fichier de preuve de paiement si présent
    if (data.payment_proof_file) {
      formData.append('payment_proof', data.payment_proof_file);
      console.log('📎 Fichier de preuve de paiement attaché:', data.payment_proof_file.name);
    }

    // Utiliser fetch directement pour supporter FormData avec fichiers
    const response = await fetch('https://formspree.io/f/xldnpnoq', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const result = await response.json();
    console.log('✅ Email envoyé avec succès via Formspree');
    
    return { ok: true, data: result };
  } catch (error) {
    console.error('❌ Erreur envoi email via Formspree:', error);
    throw error;
  }
};
