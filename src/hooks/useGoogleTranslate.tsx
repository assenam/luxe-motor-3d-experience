
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}

export const useGoogleTranslate = () => {
  const [currentLang, setCurrentLang] = useState('fr');
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Extract language from URL
    const pathParts = location.pathname.split('/');
    const langFromUrl = pathParts[1];
    const supportedLangs = ['fr', 'en', 'de', 'es', 'it', 'pt', 'ar'];
    
    if (supportedLangs.includes(langFromUrl)) {
      setCurrentLang(langFromUrl);
    } else {
      setCurrentLang('fr');
    }
  }, [location.pathname]);

  useEffect(() => {
    // Load Google Translate script
    const loadGoogleTranslate = () => {
      if (document.getElementById('google-translate-script')) {
        return;
      }

      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.head.appendChild(script);

      window.googleTranslateElementInit = () => {
        if (!window.google?.translate?.TranslateElement) return;
        
        new window.google.translate.TranslateElement({
          pageLanguage: 'fr',
          includedLanguages: 'fr,en,de,es,it,pt,ar',
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
          multilanguagePage: true
        }, 'google_translate_element');
        
        setIsLoaded(true);
        console.log('Google Translate initialized');
      };
    };

    loadGoogleTranslate();
  }, []);

  const waitForSelectElement = (maxAttempts = 20): Promise<HTMLSelectElement | null> => {
    return new Promise((resolve) => {
      let attempts = 0;
      const checkForElement = () => {
        const selectElement = document.querySelector('select.goog-te-combo') as HTMLSelectElement;
        if (selectElement) {
          console.log('Google Translate select element found after', attempts, 'attempts');
          resolve(selectElement);
        } else if (attempts < maxAttempts) {
          attempts++;
          setTimeout(checkForElement, 200);
        } else {
          console.log('Google Translate select element not found after', maxAttempts, 'attempts');
          resolve(null);
        }
      };
      checkForElement();
    });
  };

  const changeLanguage = async (newLang: string) => {
    console.log('Changing language to:', newLang);
    
    // Update URL first
    const pathParts = location.pathname.split('/');
    const supportedLangs = ['fr', 'en', 'de', 'es', 'it', 'pt', 'ar'];
    
    let newPath;
    if (supportedLangs.includes(pathParts[1])) {
      // Replace existing language
      pathParts[1] = newLang;
      newPath = pathParts.join('/');
    } else {
      // Add language prefix
      newPath = `/${newLang}${location.pathname}`;
    }

    // Navigate to new URL
    navigate(newPath + location.search);
    setCurrentLang(newLang);

    // Wait for Google Translate to be loaded and then trigger translation
    if (isLoaded && window.google?.translate) {
      const selectElement = await waitForSelectElement();
      
      if (selectElement) {
        // Map language codes for Google Translate
        const langMap: { [key: string]: string } = {
          'fr': 'fr',
          'en': 'en',
          'de': 'de', 
          'es': 'es',
          'it': 'it',
          'pt': 'pt',
          'ar': 'ar'
        };
        
        const targetLang = langMap[newLang] || newLang;
        console.log('Setting Google Translate to:', targetLang);
        
        // Set the value and trigger change
        selectElement.value = targetLang;
        
        // Try multiple event types to ensure the translation triggers
        const events = ['change', 'input', 'click'];
        events.forEach(eventType => {
          const event = new Event(eventType, { bubbles: true });
          selectElement.dispatchEvent(event);
        });
        
        console.log('Language changed to:', targetLang);
      } else {
        console.log('Could not find Google Translate select element, using fallback method');
        // Fallback: try to use Google Translate API directly
        if (window.google?.translate?.TranslateElement) {
          window.google.translate.TranslateElement.getInstance()?.setLanguagePair('fr', newLang);
        }
      }
    } else {
      console.log('Google Translate not loaded yet, isLoaded:', isLoaded);
    }
  };

  return {
    currentLang,
    changeLanguage,
    isLoaded
  };
};
