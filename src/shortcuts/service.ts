// src/shortcuts/service.ts
import { ShortcutDefinition, ShortcutServiceOptions } from './types';


export class ShortcutService {
  private shortcuts: Map<string, ShortcutDefinition> = new Map();
  private target: EventTarget;
  private enabled: boolean;
  private boundHandler: (event: KeyboardEvent) => void;

  constructor(options: ShortcutServiceOptions = {}) {
    this.target = options.target ?? document;
    this.enabled = options.enabled ?? true;
    
    this.boundHandler = this.handleKeyDown.bind(this);
    
    this.target.addEventListener('keydown', this.boundHandler);
  }


  register(shortcut: ShortcutDefinition): void {
    this.shortcuts.set(shortcut.id, shortcut);
  }


  unregister(id: string): void {
    this.shortcuts.delete(id);
  }


  enable(): void {
    this.enabled = true;
  }


  disable(): void {
    this.enabled = false;
  }


  private handleKeyDown(event: KeyboardEvent): void {
    if (!this.enabled) return;

    for (const shortcut of this.shortcuts.values()) {
      if (this.matchesAccelerator(event, shortcut.accelerator)) {
        if (shortcut.preventDefault !== false) { 
          event.preventDefault();
        }
        shortcut.handler(event);
        
        break;
      }
    }
  }


  private matchesAccelerator(event: KeyboardEvent, accelerator: string): boolean {
    const parts = accelerator.toLowerCase().split('+').map(p => p.trim());
    const key = parts.pop();
    const modifiers = parts;

    if (!key) return false;


    let keyMatch = false;
    if (key.length === 1) {
        
        keyMatch = event.code.toLowerCase() === `key${key}`.toLowerCase();
    } else {
       
        const normalizedEventKey = event.key.toLowerCase();
        keyMatch = normalizedEventKey === key;
       
        if (!keyMatch) {
            
            keyMatch = normalizedEventKey === key;
        }
    }

    if (!keyMatch) return false;

    
    const ctrlRequired = modifiers.includes('ctrl') || modifiers.includes('control') || modifiers.includes('mod');
    const shiftRequired = modifiers.includes('shift');
    const altRequired = modifiers.includes('alt');
    const metaRequired = modifiers.includes('meta') || modifiers.includes('cmd') || modifiers.includes('super');

    return (
      event.ctrlKey === ctrlRequired &&
      event.shiftKey === shiftRequired &&
      event.altKey === altRequired &&
      event.metaKey === metaRequired
    );
  }


  destroy(): void {
    this.target.removeEventListener('keydown', this.boundHandler);
    this.shortcuts.clear();
  }
}
