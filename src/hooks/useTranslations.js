import { useState, useEffect } from 'react';

export function useTranslations() {
  const [language, setLanguage] = useState("es");
  const [translations, setTranslations] = useState({
    es: {
      inicio: "Inicio",
      // ...existing translations...
    },
    en: {}
  });

  useEffect(() => {
    const translateContent = async () => {
      if (language === "es") return;
      // ...existing translation logic...
    };

    translateContent();
  }, [language]);

  return {
    language,
    setLanguage,
    t: translations[language] || translations.es
  };
}
