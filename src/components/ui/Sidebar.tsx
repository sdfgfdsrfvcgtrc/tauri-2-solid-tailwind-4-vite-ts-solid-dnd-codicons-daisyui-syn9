// src/components/ui/Sidebar.tsx
import { Component, Switch, Match, For } from 'solid-js';
import { t } from '../../i18n';
import { AVAILABLE_THEMES, getThemeInfo } from '../../themes';
import { AVAILABLE_LANGUAGES } from '../../locales';
import { ThemeInfo } from '../../themes';
import { AvailableLanguage } from '../../locales';

type SidebarProps = {
  activeIcon: string;
  leftPanelWidth: number;
  onWidthChange: (width: number) => void;
  navigateToSection: (section: string) => void;
  currentThemeId: string;
  onThemeChange: (themeId: string) => void;
  currentLanguageCode: string;
  onLanguageChange: (langCode: string) => void;
};

export const Sidebar: Component<SidebarProps> = (props) => {
  let leftPanelRef: HTMLDivElement | undefined;
  let dividerRef: HTMLDivElement | undefined;

  const onDividerMouseDown = (e: MouseEvent) => {
    e.preventDefault();
    if (!leftPanelRef) return;
    const startX = e.clientX;
    const startWidth = leftPanelRef.getBoundingClientRect().width;
    const onMouseMove = (e: MouseEvent) => {
      const delta = e.clientX - startX;
      const minWidth = window.innerWidth * 0.2;
      const maxWidth = window.innerWidth * 0.5;
      const newWidth = Math.max(minWidth, Math.min(maxWidth, startWidth + delta));
      props.onWidthChange(newWidth);
    };
    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      if (document.body.style.cursor) document.body.style.cursor = '';
      if (dividerRef) dividerRef.style.cursor = '';
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    document.body.style.cursor = 'col-resize';
    if (dividerRef) dividerRef.style.cursor = 'col-resize';
  };

  return (
    <>
      <aside
        ref={leftPanelRef}
        style={{ width: `${props.leftPanelWidth}px` }}
        class="flex-shrink-0 bg-white/10 backdrop-blur-sm p-4 overflow-y-auto"
      >
        <Switch>
          <Match when={props.activeIcon === "home"}>
            <div class="flex flex-col gap-1">
              <h3 class="text-lg font-bold text-white/80 mb-2 flex items-center gap-2">
                {t('navigationPanel')}
              </h3>
              <button
                class="flex items-center gap-2 pl-4 pr-2 py-1 transition-colors flex-shrink-0 bg-gray-700/50 text-white/70 hover:bg-gray-600/50"
                onClick={() => props.navigateToSection("welcome")}
              >
                <span>{t('navWelcome')}</span>
              </button>
              <button
                class="flex items-center gap-2 pl-4 pr-2 py-1 transition-colors flex-shrink-0 bg-gray-700/50 text-white/70 hover:bg-gray-600/50"
                onClick={() => props.navigateToSection("theme")}
              >
                <span>{t('navTheme')}</span>
              </button>
              <button
                class="flex items-center gap-2 pl-4 pr-2 py-1 transition-colors flex-shrink-0 bg-gray-700/50 text-white/70 hover:bg-gray-600/50"
                onClick={() => props.navigateToSection("language")}
              >
                <span>{t('navLanguage')}</span>
              </button>
              <button
                class="flex items-center gap-2 pl-4 pr-2 py-1 transition-colors flex-shrink-0 bg-gray-700/50 text-white/70 hover:bg-gray-600/50"
                onClick={() => props.navigateToSection("daisyui")}
              >
                <span>{t('navDaisyUI')}</span>
              </button>
              <button
                class="flex items-center gap-2 pl-4 pr-2 py-1 transition-colors flex-shrink-0 bg-gray-700/50 text-white/70 hover:bg-gray-600/50"
                onClick={() => props.navigateToSection("two-panels")}
              >
                <span>{t('navTwoPanels')}</span>
              </button>
              <button
                class="flex items-center gap-2 pl-4 pr-2 py-1 transition-colors flex-shrink-0 bg-gray-700/50 text-white/70 hover:bg-gray/600/50"
                onClick={() => props.navigateToSection("resizable-panel")}
              >
                <span>{t('navResizablePanel')}</span>
              </button>
              <button
                class="flex items-center gap-2 pl-4 pr-2 py-1 transition-colors flex-shrink-0 bg-gray-700/50 text-white/70 hover:bg-gray-600/50"
                onClick={() => props.navigateToSection("drag-drop")}
              >
                <span>{t('navDragDrop')}</span>
              </button>
            </div>
          </Match>

          <Match when={props.activeIcon === "settings"}>
            <div class="flex flex-col gap-4">
              <h3 class="text-lg font-bold text-white/80 mb-2">
                {t('settingsPanel')}
              </h3>


              <div>
                <h4 class="text-md font-semibold text-white/70 mb-2 flex items-center gap-2">
                  <i class="codicon codicon-symbol-color"></i>
                  {t('themeTitle')}
                </h4>
                <div class="flex flex-wrap gap-2">
                  <For each={AVAILABLE_THEMES}>
                    {(theme: ThemeInfo) => (
                      <button
                        class={`flex items-center gap-2 pl-4 pr-2 py-1 transition-colors flex-shrink-0 ${
                          props.currentThemeId === theme.id
                            ? "bg-white/5 text-white"
                            : "bg-gray-700/50 text-white/70 hover:bg-gray-600/50"
                        }`}
                        onClick={() => props.onThemeChange(theme.id)}
                        title={theme.name}
                      >
                       
                        {theme.name}
                      </button>
                    )}
                  </For>
                </div>
              </div>

              
              <div>
                <h4 class="text-md font-semibold text-white/70 mb-2 flex items-center gap-2">
                  <i class="codicon codicon-globe"></i>
                  {t('languageTitle')}
                </h4>
                <div class="flex flex-wrap gap-2">
                  <For each={AVAILABLE_LANGUAGES}>
                    {(lang: AvailableLanguage) => (
                      <button
                        class={`flex items-center gap-2 pl-4 pr-2 py-1 transition-colors flex-shrink-0 ${
                          props.currentLanguageCode === lang.code
                            ? "bg-white/5 text-white"
                            : "bg-gray-700/50 text-white/70 hover:bg-gray-600/50"
                        }`}
                        onClick={() => props.onLanguageChange(lang.code)}
                        title={lang.name}
                      >
                       
                        {lang.name}
                      </button>
                    )}
                  </For>
                </div>
              </div>

              
              <div class="text-white/50 text-sm pt-4 border-t border-gray-700/50">
                <p>{t('settingsContent')}</p>
              </div>
            </div>
          </Match>

          <Match when={true}>
            <div class="p-4 text-white/50 text-sm">
              {t('selectActivity')}
            </div>
          </Match>
        </Switch>
      </aside>

      <div
        ref={dividerRef}
        onMouseDown={onDividerMouseDown}
        class="w-2 flex-shrink-0 bg-gray-400/30 hover:bg-gray-500 cursor-col-resize transition-colors"
      />
    </>
  );
};
