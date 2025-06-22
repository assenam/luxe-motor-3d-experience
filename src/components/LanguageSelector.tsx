
import React, { useEffect, useState } from 'react';

const languages = [
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
  { code: 'da', name: 'Dansk', flag: '🇩🇰' },
  { code: 'sv', name: 'Svenska', flag: '🇸🇪' },
  { code: 'no', name: 'Norsk', flag: '🇳🇴' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'zh-CN', name: '中文 (简体)', flag: '🇨🇳' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
];

interface LanguageSelectorProps {
  currentLang: string;
  onLanguageChange: (lang: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  currentLang, 
  onLanguageChange 
}) => {
  const [selectedLang, setSelectedLang] = useState(currentLang);

  useEffect(() => {
    setSelectedLang(currentLang);
  }, [currentLang]);

  useEffect(() => {
    const waitForTranslateCombo = (callback: (combo: HTMLSelectElement) => void) => {
      const interval = setInterval(() => {
        const combo = document.querySelector('.goog-te-combo') as HTMLSelectElement;
        if (combo) {
          clearInterval(interval);
          callback(combo);
        }
      }, 300);
    };

    const selector = document.getElementById('languageSelector') as HTMLSelectElement;
    
    if (selector) {
      const handleChange = () => {
        const lang = selector.value;
        if (lang) {
          waitForTranslateCombo((combo) => {
            combo.value = lang;
            combo.dispatchEvent(new Event('change'));

            // Met à jour l'URL sans recharger
            const url = new URL(window.location.href);
            url.searchParams.set('lang', lang);
            window.history.replaceState({}, '', url);
          });
          
          setSelectedLang(lang);
          onLanguageChange(lang);
        }
      };

      selector.addEventListener('change', handleChange);
      
      return () => {
        selector.removeEventListener('change', handleChange);
      };
    }
  }, [onLanguageChange]);

  return (
    <div id="custom-translate" className="flex items-center space-x-2 text-sm">
      <span>🌐 Langue :</span>
      <select 
        id="languageSelector"
        value={selectedLang}
        className="bg-transparent border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-age-red"
      >
        <option value="">Sélectionner</option>
        {languages.map((language) => (
          <option key={language.code} value={language.code}>
            {language.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
