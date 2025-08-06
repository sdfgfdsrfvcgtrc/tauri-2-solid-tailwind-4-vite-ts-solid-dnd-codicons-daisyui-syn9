// src/i18n.ts
import { createSignal } from "solid-js";

import { AVAILABLE_LANGUAGES, DEFAULT_LANGUAGE_CODE, loadTranslations, getLanguageInfo } from './locales';


const [language, setLanguage] = createSignal<string>(DEFAULT_LANGUAGE_CODE);


const [translations, setTranslations] = createSignal<Record<string, string>>({});


const initializeLanguage = (initialLanguageCode?: string) => {
  let langCode = initialLanguageCode || DEFAULT_LANGUAGE_CODE;


  if (!AVAILABLE_LANGUAGES.some(lang => lang.code === langCode)) {
    console.warn(`Language '${langCode}' is not supported. Falling back to default '${DEFAULT_LANGUAGE_CODE}'.`);
    langCode = DEFAULT_LANGUAGE_CODE;
  }

  const loadedTranslations = loadTranslations(langCode);
  setLanguage(langCode);
  setTranslations(loadedTranslations);
};


const toggleLanguage = (newLanguageCode: string) => {
  if (newLanguageCode !== language()) {
    const loadedTranslations = loadTranslations(newLanguageCode);
    setLanguage(newLanguageCode);
    setTranslations(loadedTranslations);
    
    localStorage.setItem("app_language", newLanguageCode);
  }
};


const t = (key: string, params?: Record<string, string | number>): string => {
  let translation = translations()[key] || key; 


  if (params) {
    Object.keys(params).forEach(paramKey => {
      const paramValue = String(params[paramKey]);
      
      const placeholder = `{{${paramKey}}}`;
      translation = translation.replace(new RegExp(placeholder, 'g'), paramValue);
    });
  }

  return translation;
};


export { language, toggleLanguage, t, initializeLanguage, AVAILABLE_LANGUAGES, getLanguageInfo };
