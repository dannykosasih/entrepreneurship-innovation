import React, { createContext, useContext, useEffect, useState } from 'react';

export const LANG_STORAGE_KEY = 'ddk_lms_lang';

const LanguageContext = createContext({
  lang: 'id',
  isEn: false,
  setLang: () => {},
  toggleLang: () => {},
});

function readStoredLang() {
  try {
    const saved = localStorage.getItem(LANG_STORAGE_KEY);
    return saved === 'en' || saved === 'id' ? saved : 'id';
  } catch {
    return 'id';
  }
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(readStoredLang);

  useEffect(() => {
    try {
      localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch {
      // Ignore storage failures in restricted contexts
    }
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const setLang = (next) => {
    if (next === 'en' || next === 'id') {
      setLangState(next);
    }
  };

  const toggleLang = () => {
    setLangState((prev) => (prev === 'en' ? 'id' : 'en'));
  };

  return (
    <LanguageContext.Provider value={{ lang, isEn: lang === 'en', setLang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
