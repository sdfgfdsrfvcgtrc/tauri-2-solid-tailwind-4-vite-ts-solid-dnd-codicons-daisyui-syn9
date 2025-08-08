// src/components/ui/Header.tsx
import { Component } from 'solid-js';
import { t } from '../../i18n';

type HeaderProps = {
  t: typeof t;
  onOpenAbout: () => void;
};

export const Header: Component<HeaderProps> = (props) => {
  return (
    <header class="h-10 bg-black/20 backdrop-blur-md flex items-center justify-between px-2">

      <div class="flex items-center gap-1">

        <button class="header-menu-button">
          {props.t('menuFile')}
        </button>


        <div class="relative group">
          <button class="header-menu-button">
            {props.t('menuHelp')}
          </button>

          <div class="absolute left-0 mt-1 w-48 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 overflow-hidden z-10">

            <button
              class="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 text-sm"
              onClick={props.onOpenAbout}
            >
              <i class="codicon codicon-info"></i>
              {props.t('about')}
            </button>

          </div>
        </div>
      </div>


      <div class="flex items-center gap-1">

      </div>
    </header>
  );
};
