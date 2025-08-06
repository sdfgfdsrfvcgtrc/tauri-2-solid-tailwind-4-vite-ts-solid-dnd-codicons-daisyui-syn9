// src/components/ui/ActivityBar.tsx
import { Component } from 'solid-js';

type ActivityBarProps = {
  activeIcon: string;
  setActiveIcon: (icon: string) => void;
};

export const ActivityBar: Component<ActivityBarProps> = (props) => {
  return (
    <div class="w-16 bg-black/10 backdrop-blur-sm flex flex-col items-center py-4 gap-6">
      <button
        class={`p-3 rounded-lg flex items-center justify-center transition-all ${
          props.activeIcon === "home"
            ? "bg-white/20 text-white"
            : "text-white/70 hover:bg-white/15"
        }`}
        onClick={() => props.setActiveIcon("home")}
      >
        <i class="codicon codicon-home text-3xl"></i>
      </button>
      <div class="flex-1"></div>
      <button
        class={`p-3 rounded-lg flex items-center justify-center transition-all ${
          props.activeIcon === "settings"
            ? "bg-white/20 text-white"
            : "text-white/70 hover:bg-white/15"
        }`}
        onClick={() => props.setActiveIcon("settings")}
      >
        <i class="codicon codicon-gear text-3xl"></i>
      </button>
      <button
        class={`p-3 rounded-lg flex items-center justify-center transition-all ${
          props.activeIcon === "home"
            ? "bg-white/20 text-white"
            : "text-white/70 hover:bg-white/15"
        }`}
        
      >
        <i class="codicon codicon-account text-sm"></i>
      </button>
    </div>
  );
};
