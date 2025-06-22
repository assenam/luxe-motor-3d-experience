import React, { useEffect } from 'react';

const GoogleTranslateWidget: React.FC = () => {
  useEffect(() => {
    // Hide the Google Translate widget but keep it functional
    const style = document.createElement('style');
    style.innerHTML = `
      #google_translate_element {
        display: none !important;
      }
      .goog-te-banner-frame {
        display: none !important;
      }
      .goog-te-menu-frame {
        display: none !important;
      }
      body {
        top: 0 !important;
      }
      .goog-te-combo {
        display: none !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return <div id="google_translate_element" style={{ display: 'none' }}></div>;
};

export default GoogleTranslateWidget;
