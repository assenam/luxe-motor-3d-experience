
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

  const changeLanguage = (newLang: string) => {
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

    // Trigger Google Translate after a short delay to ensure page is ready
    setTimeout(() => {
      if (isLoaded && window.google?.translate) {
        // Try to find the Google Translate select element
        const selectElement = document.querySelector('select.goog-te-combo') as HTMLSelectElement;
        if (selectElement) {
          console.log('Found Google Translate select element');
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
          selectElement.value = targetLang;
          
          // Trigger change event
          const changeEvent = new Event('change', { bubbles: true });
          selectElement.dispatchEvent(changeEvent);
          console.log('Language changed to:', targetLang);
        } else {
          console.log('Google Translate select element not found');
        }
      } else {
        console.log('Google Translate not loaded yet, isLoaded:', isLoaded);
      }
    }, 500);
  };

  return {
    currentLang,
    changeLanguage,
    isLoaded
  };
};
