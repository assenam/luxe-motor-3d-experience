
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

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
      };
    };

    loadGoogleTranslate();
  }, []);

  const changeLanguage = (newLang: string) => {
    if (!isLoaded) return;

    // Update URL
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

    // Trigger Google Translate
    const iframe = document.querySelector('iframe.goog-te-menu-frame') as HTMLIFrameElement;
    if (iframe?.contentWindow) {
      try {
        const langCode = newLang === 'fr' ? 'fr' : newLang;
        const selectElement = iframe.contentWindow.document.querySelector(`[value="${langCode}"]`) as HTMLElement;
        if (selectElement) {
          selectElement.click();
        }
      } catch (error) {
        console.log('Translation triggered via URL change');
      }
    }

    setCurrentLang(newLang);
  };

  return {
    currentLang,
    changeLanguage,
    isLoaded
  };
};
