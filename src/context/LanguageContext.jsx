import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../data/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    try {
      return localStorage.getItem('mpsf_language') || 'en';
    } catch {
      return 'en';
    }
  });

  const setLanguage = (lang) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('mpsf_language', lang);
    } catch (e) {
      console.warn('Could not save language to localStorage', e);
    }
  };

  useEffect(() => {
    document.documentElement.lang = language;
    if (language === 'te') {
      document.body.classList.add('lang-te');
      document.body.classList.remove('lang-hi', 'lang-en');
    } else if (language === 'hi') {
      document.body.classList.add('lang-hi');
      document.body.classList.remove('lang-te', 'lang-en');
    } else {
      document.body.classList.add('lang-en');
      document.body.classList.remove('lang-te', 'lang-hi');
    }
  }, [language]);

  /**
   * Helper function to get nested translation strings safely
   * e.g. t('nav.home') -> "ముఖచిత్రం" for 'te'
   */
  const t = (path) => {
    if (!path) return '';
    const keys = path.split('.');
    
    // 1. Try current selected language
    let current = translations[language];
    for (const key of keys) {
      if (current && current[key] !== undefined) {
        current = current[key];
      } else {
        current = null;
        break;
      }
    }
    if (current !== null && current !== undefined) {
      return current;
    }

    // 2. Fallback to English
    let fallback = translations.en;
    for (const key of keys) {
      if (fallback && fallback[key] !== undefined) {
        fallback = fallback[key];
      } else {
        fallback = null;
        break;
      }
    }
    return fallback || path;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, translations: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
