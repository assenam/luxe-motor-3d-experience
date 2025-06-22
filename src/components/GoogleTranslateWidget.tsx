
import React, { useEffect } from 'react';

const GoogleTranslateWidget: React.FC = () => {
  useEffect(() => {
    // Style the Google Translate widget to be less intrusive but still functional
    const style = document.createElement('style');
    style.innerHTML = `
      #google_translate_element {
        position: fixed;
        top: 10px;
        right: 10px;
        z-index: 9999;
        opacity: 0.1;
        pointer-events: none;
        background: white;
        padding: 5px;
        border-radius: 4px;
        font-size: 12px;
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
        opacity: 1 !important;
        pointer-events: auto !important;
        z-index: 10000 !important;
        font-size: 12px !important;
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

  return <div id="google_translate_element"></div>;
};

export default GoogleTranslateWidget;
