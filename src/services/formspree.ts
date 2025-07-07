
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xldnpnoq';

export interface FormspreeResponse {
  ok: boolean;
  next?: string;
  errors?: Array<{
    field: string;
    message: string;
  }>;
}

export const submitToFormspree = async (data: Record<string, any>): Promise<FormspreeResponse> => {
  try {
    console.log('🚀 Formspree: Début envoi vers', FORMSPREE_ENDPOINT);
    console.log('📤 Formspree: Données à envoyer:', data);

    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    console.log('📡 Formspree: Réponse reçue, status:', response.status);
    console.log('📡 Formspree: Response ok:', response.ok);

    if (!response.ok) {
      console.error('❌ Formspree: Erreur HTTP', response.status, response.statusText);
    }

    const result = await response.json();
    console.log('📋 Formspree: Contenu de la réponse:', result);
    
    return {
      ok: response.ok,
      ...result
    };
  } catch (error) {
    console.error('💥 Formspree: Erreur de soumission:', error);
    console.error('💥 Formspree: Type erreur:', typeof error);
    console.error('💥 Formspree: Message erreur:', error instanceof Error ? error.message : 'Erreur inconnue');
    return {
      ok: false,
      errors: [{ field: 'general', message: 'Erreur de connexion' }]
    };
  }
};
