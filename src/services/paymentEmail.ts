
import { supabase } from '@/integrations/supabase/client';

export interface PaymentEmailData {
  vehicleInfo: string;
  vehiclePrice: string;
  depositAmount: string;
  transferReference: string;
  customerFirstName: string;
  customerLastName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  customerPostalCode: string;
  customerCity: string;
  customerCountry: string;
  hasPaymentProof: boolean;
}

export const sendPaymentConfirmationEmail = async (data: PaymentEmailData) => {
  try {
    console.log('🔍 DÉBUT sendPaymentConfirmationEmail via Supabase Edge Function');
    console.log('📋 Données reçues:', {
      vehicleInfo: data.vehicleInfo,
      customerEmail: data.customerEmail,
      hasPaymentProof: data.hasPaymentProof
    });

    // Vérifier que supabase est bien initialisé
    if (!supabase) {
      throw new Error('Supabase client non initialisé');
    }
    console.log('✅ Supabase client OK');

    // Les données sont déjà dans le bon format pour l'edge function
    const emailData = {
      vehicleInfo: data.vehicleInfo,
      vehiclePrice: data.vehiclePrice,
      depositAmount: data.depositAmount,
      transferReference: data.transferReference,
      customerFirstName: data.customerFirstName,
      customerLastName: data.customerLastName,
      customerEmail: data.customerEmail,
      customerPhone: data.customerPhone,
      customerAddress: data.customerAddress,
      customerPostalCode: data.customerPostalCode,
      customerCity: data.customerCity,
      customerCountry: data.customerCountry,
      hasPaymentProof: data.hasPaymentProof
    };

    console.log('📤 Données à envoyer:', emailData);
    console.log('📤 Envoi via edge function Supabase...');
    
    const { data: result, error } = await supabase.functions.invoke('send-payment-confirmation', {
      body: emailData
    });

    console.log('📊 Réponse brute:', { result, error });

    if (error) {
      console.error('❌ Erreur edge function:', error);
      console.error('❌ Détails erreur:', JSON.stringify(error, null, 2));
      throw new Error(`Erreur edge function: ${error.message || JSON.stringify(error)}`);
    }

    console.log('📬 Résultat:', result);
    console.log('✅ Emails envoyés avec succès via Supabase/Resend');
    
    return { ok: true, data: result };
  } catch (error) {
    console.error('💥 ERREUR dans sendPaymentConfirmationEmail:', error);
    console.error('📊 Type erreur:', typeof error);
    console.error('📊 Message erreur:', error instanceof Error ? error.message : 'Erreur inconnue');
    console.error('📊 Stack trace:', error instanceof Error ? error.stack : 'Pas de stack');
    throw error;
  }
};
