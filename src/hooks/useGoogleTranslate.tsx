
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
    // Extract language from URL parameters
    const params = new URLSearchParams(location.search);
    const langFromParams = params.get('lang');
    
    // Extract language from URL path
    const pathParts = location.pathname.split('/');
    const langFromPath = pathParts[1];
    
    const supportedLangs = ['fr', 'en', 'es', 'it', 'de', 'pt', 'nl', 'da', 'sv', 'no', 'ja', 'zh-CN', 'ru'];
    
    let detectedLang = 'fr';
    
    if (langFromParams && supportedLangs.includes(langFromParams)) {
      detectedLang = langFromParams;
    } else if (langFromPath && supportedLangs.includes(langFromPath)) {
      detectedLang = langFromPath;
    }
    
    console.log('Detected language:', detectedLang, 'from path:', langFromPath, 'from params:', langFromParams);
    setCurrentLang(detectedLang);
  }, [location.pathname, location.search]);

  const applyTranslation = (lang: string) => {
    console.log('Applying translation for:', lang);
    const interval = setInterval(() => {
      const combo = document.querySelector('.goog-te-combo') as HTMLSelectElement;
      if (combo) {
        clearInterval(interval);
        console.log('Setting Google Translate to:', lang);
        combo.value = lang;
        combo.dispatchEvent(new Event('change'));
      }
    }, 100);
    
    // Timeout après 5 secondes
    setTimeout(() => {
      clearInterval(interval);
    }, 5000);
  };

  const updateURL = (lang: string) => {
    const currentPath = location.pathname;
    const currentSearch = location.search;
    
    // Si on est sur une route avec préfixe de langue
    const pathParts = currentPath.split('/');
    const supportedLangs = ['fr', 'en', 'es', 'it', 'de', 'pt', 'nl', 'da', 'sv', 'no', 'ja', 'zh-CN', 'ru'];
    
    let newPath = currentPath;
    
    if (pathParts[1] && supportedLangs.includes(pathParts[1])) {
      // Remplacer la langue existante
      pathParts[1] = lang;
      newPath = pathParts.join('/');
    } else {
      // Ajouter la langue au début du chemin
      if (lang !== 'fr') {
        newPath = `/${lang}${currentPath}`;
      }
    }
    
    // Pour le français, on n'ajoute pas de préfixe mais on garde les paramètres de recherche
    if (lang === 'fr' && pathParts[1] && supportedLangs.includes(pathParts[1])) {
      // Supprimer le préfixe de langue pour le français
      pathParts.splice(1, 1);
      newPath = pathParts.join('/') || '/';
    }
    
    // Mettre à jour les paramètres de recherche
    const params = new URLSearchParams(currentSearch);
    if (lang !== 'fr') {
      params.set('lang', lang);
    } else {
      params.delete('lang');
    }
    
    const queryString = params.toString();
    const finalPath = newPath + (queryString ? `?${queryString}` : '');
    
    console.log('Navigating to:', finalPath);
    navigate(finalPath, { replace: true });
  };

  useEffect(() => {
    // Load Google Translate script
    const loadGoogleTranslate = () => {
      if (document.getElementById('google-translate-script')) {
        console.log('Google Translate script already loaded');
        return;
      }

      console.log('Loading Google Translate script');
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.head.appendChild(script);

      window.googleTranslateElementInit = () => {
        console.log('Google Translate initializing...');
        if (!window.google?.translate?.TranslateElement) {
          console.error('Google Translate not available');
          return;
        }
        
        new window.google.translate.TranslateElement({
          pageLanguage: 'fr',
          autoDisplay: false
        }, 'google_translate_element');
        
        setIsLoaded(true);
        console.log('Google Translate initialized successfully');

        // Apply current language after a short delay
        setTimeout(() => {
          if (currentLang !== 'fr') {
            applyTranslation(currentLang);
          }
        }, 1000);
      };
    };

    loadGoogleTranslate();
  }, []);

  // Apply translation when currentLang changes and Google Translate is loaded
  useEffect(() => {
    if (isLoaded && currentLang !== 'fr') {
      console.log('Applying translation for current language:', currentLang);
      applyTranslation(currentLang);
    }
  }, [currentLang, isLoaded]);

  const changeLanguage = async (newLang: string) => {
    console.log('Changing language to:', newLang);
    setCurrentLang(newLang);
    
    // Mettre à jour l'URL immédiatement
    updateURL(newLang);

    if (isLoaded) {
      applyTranslation(newLang);
    }
  };

  return {
    currentLang,
    changeLanguage,
    isLoaded
  };
};
