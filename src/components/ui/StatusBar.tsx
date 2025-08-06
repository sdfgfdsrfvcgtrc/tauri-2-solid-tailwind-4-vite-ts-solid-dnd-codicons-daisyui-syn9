// src/components/ui/StatusBar.tsx
import { Component } from 'solid-js';

type StatusBarProps = {
  activeTabTitle: string;

};

export const StatusBar: Component<StatusBarProps> = (props) => {
  return (
    <footer class="h-6 flex items-center px-2 text-xs text-white/80 bg-black/20 backdrop-blur-sm border-t border-gray-700 flex-shrink-0">
      <div class="flex-1 truncate">
        {props.activeTabTitle}
      </div>
      
      <div class="flex items-center gap-2">

      </div>
    </footer>
  );
};
