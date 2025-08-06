// src/components/ui/Header.tsx
import { Component } from 'solid-js';
import { t } from '../../i18n';

type HeaderProps = {
  t: typeof t;
};

export const Header: Component<HeaderProps> = (props) => {
  return (
    <header class="h-10 bg-black/20 backdrop-blur-md flex items-center justify-between px-2">
     
      <div class="flex items-center gap-1">
        <button class="header-menu-button">
          {props.t('menuFile')}
        </button>

        <button class="header-menu-button">
          {props.t('menuHelp')}
        </button>
      </div>

    </header>
  );
};
