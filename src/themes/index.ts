// src/themes/index.ts


export type ThemeInfo = {
  id: string; 
  name: string; 
  
};


export const AVAILABLE_THEMES: ThemeInfo[] = [
  { id: 'lightsyn9', name: 'Light Syn9' },
  { id: 'darksyn9', name: 'Dark Syn9' },

];


export const DEFAULT_THEME_ID = 'lightsyn9';


export const getThemeInfo = (id: string): ThemeInfo | undefined => {
  return AVAILABLE_THEMES.find(theme => theme.id === id);
};


export const applyTheme = (themeId: string) => {
  const htmlElement = document.documentElement;

 
  htmlElement.classList.forEach(cls => {
    if (cls.startsWith('theme-')) {
      htmlElement.classList.remove(cls);
    }
  });


  const themeClassName = `theme-${themeId}`;
  htmlElement.classList.add(themeClassName);
};
