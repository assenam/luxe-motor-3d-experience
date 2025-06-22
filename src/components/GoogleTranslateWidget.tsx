
import React, { useEffect } from 'react';

const GoogleTranslateWidget: React.FC = () => {
  useEffect(() => {
    // Style the Google Translate widget to be completely hidden but functional
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
      .skiptranslate {
        display: none !important;
      }
      #goog-gt-tt {
        display: none !important;
      }
      .goog-tooltip {
        display: none !important;
      }
      .goog-tooltip:hover {
        display: none !important;
      }
      .goog-text-highlight {
        background-color: transparent !important;
        box-shadow: none !important;
      }
      .goog-te-spinner-pos {
        display: none !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  return <div id="google_translate_element" style={{ display: 'none' }}></div>;
};

export default GoogleTranslateWidget;
