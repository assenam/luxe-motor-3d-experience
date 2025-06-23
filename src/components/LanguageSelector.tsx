
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

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = event.target.value;
    console.log('Language selector changed to:', lang);
    
    if (lang) {
      setSelectedLang(lang);
      onLanguageChange(lang);
    }
  };

  return (
    <div id="custom-translate" className="flex items-center space-x-2 text-sm">
      <span className="hidden md:inline">🌐 Langue :</span>
      <span className="md:hidden">🌐</span>
      <select 
        id="languageSelector"
        value={selectedLang}
        onChange={handleLanguageChange}
        className="bg-transparent border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-age-red min-w-[120px]"
      >
        <option value="">Sélectionner</option>
        {languages.map((language) => (
          <option key={language.code} value={language.code}>
            {language.flag} {language.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
