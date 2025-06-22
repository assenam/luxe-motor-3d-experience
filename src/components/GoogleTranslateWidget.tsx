
import React, { useEffect } from 'react';

const GoogleTranslateWidget: React.FC = () => {
  useEffect(() => {
    // Style the Google Translate widget to be less intrusive but still functional
    const style = document.createElement('style');
    style.innerHTML = `
      #google_translate_element {
        position: fixed;
        top: -50px;
        left: -50px;
        z-index: -1;
        opacity: 0.01;
        pointer-events: none;
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
        position: fixed;
        top: -100px;
        left: -100px;
        opacity: 0.01;
        pointer-events: auto;
        z-index: 1;
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
