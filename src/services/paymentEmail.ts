
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
    console.log('🔍 DÉBUT sendPaymentConfirmationEmail - VERSION PROFESSIONNELLE');
    console.log('📋 Données reçues:', {
      vehicle_info: data.vehicle_info,
      customer_email: data.customer_email,
      has_file: !!data.payment_proof_file
    });

    // Email professionnel structuré pour Formspree
    const formData = {
      _subject: `✅ Confirmation de commande - ${data.vehicle_info} - Réf: ${data.transfer_reference}`,
      _template: 'table',
      type: 'payment_confirmation',
      
      // Informations de commande
      'Véhicule commandé': data.vehicle_info,
      'Prix total': data.vehicle_price,
      'Acompte versé (20%)': data.deposit_amount,
      'Référence de virement': data.transfer_reference,
      
      // Informations client
      'Nom complet': `${data.customer_first_name} ${data.customer_last_name}`,
      'Email': data.customer_email,
      'Téléphone': data.customer_phone,
      'Adresse complète': `${data.customer_address}, ${data.customer_postal_code} ${data.customer_city}, ${data.customer_country}`,
      
      // Statut de la preuve de paiement
      'Preuve de paiement': data.payment_proof_file ? '✅ Fichier joint fourni' : '⏳ À envoyer par email à contact@autogermanyexport.com',
      
      // Instructions importantes
      'Instructions de virement': `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🏦 COORDONNÉES BANCAIRES AUTO GERMANY EXPORT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💶 MONTANT À VIRER : ${data.deposit_amount}
🔑 RÉFÉRENCE OBLIGATOIRE : ${data.transfer_reference}

⚠️ IMPORTANT : La référence est OBLIGATOIRE pour le traitement
de votre commande. Sans cette référence, nous ne pourrons pas
identifier votre paiement.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 PROCHAINES ÉTAPES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1️⃣ Effectuer le virement avec la référence : ${data.transfer_reference}
2️⃣ Envoyer la preuve de paiement à : contact@autogermanyexport.com
3️⃣ Notre équipe vérifie la réception du virement
4️⃣ Préparation et expédition de votre véhicule depuis l'Allemagne
5️⃣ Contact pour organiser la livraison à votre adresse

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📞 CONTACT & SUPPORT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📧 Email : contact@autogermanyexport.com
🌐 Site web : www.autogermanyexport.com

Merci de votre confiance !
L'équipe AUTO GERMANY EXPORT
Votre spécialiste automobile allemand

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      
      // Métadonnées pour l'équipe
      '_horodatage': new Date().toLocaleString('fr-FR'),
      '_statut_commande': 'En attente de virement',
      '_action_requise': 'Vérifier réception virement + traiter commande'
    };

    console.log('📤 Envoi email professionnel via Formspree');
    
    const result = await submitToFormspree(formData);
    
    console.log('📬 Réponse Formspree:', result);
    
    if (result.ok) {
      console.log('✅ Email professionnel envoyé avec succès !');
      return { ok: true, data: result };
    } else {
      console.error('❌ Échec envoi email professionnel:', result);
      throw new Error('Échec envoi via Formspree');
    }
  } catch (error) {
    console.error('💥 ERREUR dans sendPaymentConfirmationEmail:', error);
    console.error('📊 Message erreur:', error instanceof Error ? error.message : 'Erreur inconnue');
    throw error;
  }
};
