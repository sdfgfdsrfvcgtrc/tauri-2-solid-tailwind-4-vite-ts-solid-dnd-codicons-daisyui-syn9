// src/App.tsx
import { createSignal, For, onMount, createMemo, createEffect, onCleanup } from "solid-js";
import { invoke } from "@tauri-apps/api/core";
import {
  DragDropProvider,
  DragDropSensors,
  SortableProvider,
} from "@thisbeyond/solid-dnd";
import "./index.css";
import { t, toggleLanguage, language, initializeLanguage, AVAILABLE_LANGUAGES } from "./i18n";
import {
  WelcomeSection,
  DaisyUIExample,
  TwoPanelsExample,
  ResizableboxExample,
  DragDropExample,
  ThemeExample,
  LanguageExample
} from "./components/examples";
import "@vscode/codicons/dist/codicon.css";
import { TabPanel } from "./components/tabs";
import { AVAILABLE_THEMES, DEFAULT_THEME_ID, applyTheme, getThemeInfo } from './themes';
import { Header } from './components/ui/Header';
import { ActivityBar } from './components/ui/ActivityBar';
import { Sidebar } from './components/ui/Sidebar';
import { StatusBar } from './components/ui/StatusBar';

import { AboutModal } from './components/ui/AboutModal';

import { ShortcutService } from './shortcuts/service';
import { createAppShortcuts } from './shortcuts';

function App() {
  const [greetMsg, setGreetMsg] = createSignal("");
  const [name, setName] = createSignal("");
  const [currentTheme, setCurrentTheme] = createSignal<string>(DEFAULT_THEME_ID);
  const [daisyChecked, setDaisyChecked] = createSignal(false);
  const [activeIcon, setActiveIcon] = createSignal("home");
  const [leftPanelWidth, setLeftPanelWidth] = createSignal(256);
  const [currentSection, setCurrentSection] = createSignal("welcome");


  const [tabs, setTabs] = createSignal([
    {
      id: "welcome",
      tKey: 'welcomeTab',
      content: "welcome"
    }
  ]);
  const [activeTab, setActiveTab] = createSignal("welcome");


  const tabsWithNumbers = createMemo(() => {
    let newTabCounter = 1;
    return tabs().map(tab => {
      if (tab.tKey === 'newTab') {
        return { ...tab, tabNumber: newTabCounter++ };
      }
      return tab;
    });
  });


  const activeTabTitle = createMemo(() => {
    const activeTabId = activeTab();
    const tab = tabsWithNumbers().find(t => t.id === activeTabId);
    if (!tab) return "";

    if (tab.tKey === 'newTab' && tab.tabNumber !== undefined) {
      return t(tab.tKey, { n: tab.tabNumber });
    }
    return t(tab.tKey);
  });


  onMount(() => {
    const savedLanguage = localStorage.getItem("app_language");
    const browserLanguage = navigator.language.split('-')[0];
    initializeLanguage(savedLanguage || browserLanguage);

    const savedTheme = localStorage.getItem("app_theme");
    let themeToApply = DEFAULT_THEME_ID;
    if (savedTheme && AVAILABLE_THEMES.some(t => t.id === savedTheme)) {
      themeToApply = savedTheme;
    } else if (savedTheme) {
      console.warn(`Saved theme '${savedTheme}' is not available. Using default.`);
    }
    setCurrentTheme(themeToApply);
    applyTheme(themeToApply);
  });

  const setTheme = (newThemeId: string) => {
    if (newThemeId !== currentTheme() && AVAILABLE_THEMES.some(t => t.id === newThemeId)) {
      setCurrentTheme(newThemeId);
      applyTheme(newThemeId);
      localStorage.setItem("app_theme", newThemeId);
    }
  };

  const addTab = () => {
    const newId = `tab-${Date.now()}`;
    setTabs([
      ...tabs(),
      {
        id: newId,
        tKey: 'newTab',
        content: "empty"
      }
    ]);
    setActiveTab(newId);
  };

  const closeTab = (id: string) => {
    if (tabs().length <= 1) return;
    const newTabs = tabs().filter(tab => tab.id !== id);
    setTabs(newTabs);
    if (activeTab() === id) {
      setActiveTab(newTabs[0].id);
    }
  };

  const handleTabDragEnd = ({ draggable, droppable }: { draggable: any, droppable: any }) => {
    if (draggable && droppable) {
      const fromIndex = tabs().findIndex(t => t.id === draggable.id);
      const toIndex = tabs().findIndex(t => t.id === droppable.id);
      if (fromIndex !== toIndex && toIndex >= 0) {
        setTabs(prev => {
          const newTabs = [...prev];
          const [moved] = newTabs.splice(fromIndex, 1);
          newTabs.splice(toIndex, 0, moved);
          return newTabs;
        });
      }
    }
  };

  const navigateToSection = (section: string) => {
    setCurrentSection(section);
    const welcomeTab = tabs().find(tab => tab.id === "welcome");
    if (welcomeTab) {
      setActiveTab("welcome");
    }
  };


  let shortcutService: ShortcutService | null = null;

  const handleLogTest = () => {
    console.log("The handleLogTest handler is called from the App!");
    alert("The Ctrl+Shift+L hotkey has worked! (internal)");
  };

  createEffect(() => {
    console.log("Initialization of the internal keyboard shortcut service...");
    shortcutService = new ShortcutService({});

    const shortcutHandlers = {
      logTest: handleLogTest,
    };

    const appShortcuts = createAppShortcuts(shortcutHandlers);

    appShortcuts.forEach(shortcut => {
      shortcutService!.register(shortcut);
    });

    onCleanup(() => {
      console.log("Destroying the internal keyboard shortcut service...");
      if (shortcutService) {
        shortcutService.destroy();
        shortcutService = null;
      }
    });
  });



  const [isAboutModalOpen, setIsAboutModalOpen] = createSignal(false);


  return (
    <div class="h-screen flex flex-col">

      <Header t={t} onOpenAbout={() => setIsAboutModalOpen(true)} />

      <main class="flex flex-1 overflow-hidden">
        <ActivityBar activeIcon={activeIcon()} setActiveIcon={setActiveIcon} />

        <Sidebar
          activeIcon={activeIcon()}
          leftPanelWidth={leftPanelWidth()}
          onWidthChange={setLeftPanelWidth}
          navigateToSection={navigateToSection}
          currentThemeId={currentTheme()}
          onThemeChange={setTheme}
          currentLanguageCode={language()}
          onLanguageChange={toggleLanguage}
        />

        <div class="flex-1 flex flex-col overflow-hidden">
          <TabPanel
            tabs={tabsWithNumbers()}
            activeTab={activeTab()}
            setActiveTab={setActiveTab}
            addTab={addTab}
            closeTab={closeTab}
            onDragEnd={handleTabDragEnd}
            greetMsg={name()}
            setName={setName}
            setGreetMsg={setGreetMsg}
            daisyChecked={daisyChecked()}
            setDaisyChecked={setDaisyChecked}
            currentSection={currentSection()}
          />
        </div>
      </main>

      <StatusBar activeTabTitle={activeTabTitle()} />


      <AboutModal
        isOpen={isAboutModalOpen()}
        onClose={() => setIsAboutModalOpen(false)}
        t={t}
      />
    </div>
  );
}

export default App;
