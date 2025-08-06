// src/shortcuts/types.ts


export type ShortcutDefinition = {

  id: string;
  
  accelerator: string;
  
  handler: (event: KeyboardEvent) => void;
  
  preventDefault?: boolean;
};


export type ShortcutServiceOptions = {
  target?: EventTarget; 
  enabled?: boolean;
};
