// src/shortcuts/index.ts
import { ShortcutDefinition } from './types';


export type AppShortcutHandlers = {
  logTest: () => void;

};


export const createAppShortcuts = (handlers: AppShortcutHandlers): ShortcutDefinition[] => {
  return [
    {
      id: 'logTest',
      accelerator: 'ctrl+shift+l',
      handler: (e: KeyboardEvent) => {
        console.log('The internal hotkey Ctrl+Shift+L has worked!');
        handlers.logTest(); 
      },
      preventDefault: true,
    },

  ];
};


export * from './service';
export * from './types';
