// src/locales/index.ts


export type AvailableLanguage = {
  code: string;
  name: string;

};


export const AVAILABLE_LANGUAGES: AvailableLanguage[] = [
  { code: 'en', name: 'English' },
  { code: 'ko', name: '한국어' },
  { code: 'ru', name: 'Русский' },

];


export const DEFAULT_LANGUAGE_CODE = 'en';

export const getLanguageInfo = (code: string): AvailableLanguage | undefined => {
  return AVAILABLE_LANGUAGES.find(lang => lang.code === code);
};


import enTranslations from './en.json';
import koTranslations from './ko.json';
import ruTranslations from './ru.json';


const TRANSLATIONS_MAP: Record<string, Record<string, string>> = {
  en: enTranslations,
  ko: koTranslations,
  ru: ruTranslations,
};


export const loadTranslations = (languageCode: string): Record<string, string> => {

  return TRANSLATIONS_MAP[languageCode] || TRANSLATIONS_MAP[DEFAULT_LANGUAGE_CODE] || {};
};
