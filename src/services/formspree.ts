
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
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    
    return {
      ok: response.ok,
      ...result
    };
  } catch (error) {
    console.error('Formspree submission error:', error);
    return {
      ok: false,
      errors: [{ field: 'general', message: 'Erreur de connexion' }]
    };
  }
};
