
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
    const supportedLangs = ['fr', 'en', 'es', 'it', 'de', 'pt', 'nl', 'da', 'sv', 'no', 'ja', 'zh-CN', 'ru'];
    
    if (supportedLangs.includes(langFromUrl)) {
      setCurrentLang(langFromUrl);
    } else {
      setCurrentLang('fr');
    }
  }, [location.pathname]);

  const waitForTranslateCombo = (callback: (combo: HTMLSelectElement) => void) => {
    const interval = setInterval(() => {
      const combo = document.querySelector('.goog-te-combo') as HTMLSelectElement;
      if (combo) {
        clearInterval(interval);
        callback(combo);
      }
    }, 300);
  };

  const applyTranslationFromURL = () => {
    const params = new URLSearchParams(window.location.search);
    const lang = params.get('lang');

    if (lang) {
      waitForTranslateCombo((combo) => {
        combo.value = lang;
        combo.dispatchEvent(new Event('change'));

        // Met à jour le sélecteur personnalisé
        const customSelect = document.getElementById('languageSelector') as HTMLSelectElement;
        if (customSelect) customSelect.value = lang;
      });
    }
  };

  useEffect(() => {
    // Load Google Translate script
    const loadGoogleTranslate = () => {
      if (document.getElementById('google-translate-script')) {
        return;
      }

      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.head.appendChild(script);

      window.googleTranslateElementInit = () => {
        if (!window.google?.translate?.TranslateElement) return;
        
        new window.google.translate.TranslateElement({
          pageLanguage: 'fr',
          autoDisplay: false
        }, 'google_translate_element');
        
        setIsLoaded(true);
        console.log('Google Translate initialized');

        // Apply translation from URL after initialization
        setTimeout(applyTranslationFromURL, 1000);
      };
    };

    loadGoogleTranslate();
  }, []);

  const changeLanguage = async (newLang: string) => {
    console.log('Changing language to:', newLang);
    
    // Update URL first
    const pathParts = location.pathname.split('/');
    const supportedLangs = ['fr', 'en', 'es', 'it', 'de', 'pt', 'nl', 'da', 'sv', 'no', 'ja', 'zh-CN', 'ru'];
    
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
      waitForTranslateCombo((combo) => {
        combo.value = newLang;
        combo.dispatchEvent(new Event('change'));

        // Met à jour l'URL sans recharger
        const url = new URL(window.location.href);
        url.searchParams.set('lang', newLang);
        window.history.replaceState({}, '', url);
        
        console.log('Language changed to:', newLang);
      });
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
