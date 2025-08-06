// src/components/tabs/TabPanel.tsx
import { 
  DragDropProvider,
  DragDropSensors,
  SortableProvider,
} from "@thisbeyond/solid-dnd";
import { For, Switch, Match, Component, createMemo, createSignal, onMount } from "solid-js";
import { SortableTab } from "./SortableTab";
import { 
  WelcomeSection,
  DaisyUIExample,
  TwoPanelsExample,
  ResizableboxExample,
  DragDropExample,
  ThemeExample,
  LanguageExample
} from "../examples";
import { t } from "../../i18n";

type Tab = { 
  id: string; 
  tKey: string; 
  content: string; 
  tabNumber?: number 
};

type TabPanelProps = {
  tabs: Tab[];
  activeTab: string;
  setActiveTab: (id: string) => void;
  addTab: () => void;
  closeTab: (id: string) => void;
  onDragEnd: (event: any) => void;
  greetMsg: string;
  setName: (name: string) => void;
  setGreetMsg: (msg: string) => void;
  daisyChecked: boolean;
  setDaisyChecked: (checked: boolean) => void;
  currentSection: string;
};

export const TabPanel: Component<TabPanelProps> = (props) => {
  const tabsWithNumbers = createMemo(() => {
    let newTabCounter = 1;
    return props.tabs.map(tab => {
      if (tab.tKey === 'newTab') {
        return { ...tab, tabNumber: newTabCounter++ };
      }
      return tab;
    });
  });


  let tabsContainerRef: HTMLDivElement | undefined;
  const [showScrollButtons, setShowScrollButtons] = createSignal(false);


  const checkScroll = () => {
    if (!tabsContainerRef) return;
    setShowScrollButtons(tabsContainerRef.scrollWidth > tabsContainerRef.clientWidth);
  };


  const scrollTabs = (direction: 'left' | 'right') => {
    if (!tabsContainerRef) return;
    const scrollAmount = 200; 
    tabsContainerRef.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  
  onMount(() => {
    checkScroll();
    
    window.addEventListener('resize', checkScroll);
  });


  createMemo(() => {
    if (props.tabs.length > 0 && tabsContainerRef) {
      
      setTimeout(() => {
       
        tabsContainerRef!.scrollLeft = tabsContainerRef!.scrollWidth;
        checkScroll();
      }, 50);
    }
  });

  return (
    <div class="flex flex-col h-full">
      
      <div class="bg-gray-800/30">
        <div class="flex items-center h-8">
          
          <div 
            class="flex items-center justify-center h-full px-3 bg-gray-700/50 text-white/70 hover:bg-gray-600/50 transition-colors cursor-pointer flex-shrink-0"
            onClick={() => scrollTabs('left')}
          >
            <i class="codicon codicon-chevron-left text-sm"></i>
          </div>
          
          
          <div 
            ref={tabsContainerRef}
            class="flex-1 flex overflow-x-auto scrollbar-hide h-full"
            onScroll={checkScroll}
          >
            <DragDropProvider onDragEnd={props.onDragEnd}>
              <DragDropSensors>
                <div class="flex items-center h-full">
                  <SortableProvider ids={props.tabs.map(tab => tab.id)}>
                    <For each={tabsWithNumbers()}>
                      {(tab) => (
                        <SortableTab
                          id={tab.id}
                          tKey={tab.tKey}
                          tabNumber={tab.tabNumber}
                          isActive={props.activeTab === tab.id}
                          onClick={() => props.setActiveTab(tab.id)}
                          onClose={() => props.closeTab(tab.id)}
                        />
                      )}
                    </For>
                  </SortableProvider>
                  
                  
                  <div 
                    class="flex items-center justify-center h-full px-3 bg-gray-700/50 text-white/70 hover:bg-gray-600/50 transition-colors cursor-pointer flex-shrink-0"
                    onClick={props.addTab}
                  >
                    <i class="codicon codicon-add text-sm"></i>
                  </div>
                </div>
              </DragDropSensors>
            </DragDropProvider>
          </div>
          
          
          <div 
            class="flex items-center justify-center h-full px-3 bg-gray-700/50 text-white/70 hover:bg-gray-600/50 transition-colors cursor-pointer flex-shrink-0"
            onClick={() => scrollTabs('right')}
          >
            <i class="codicon codicon-chevron-right text-sm"></i>
          </div>
        </div>
      </div>
      
      
      <div class="flex-1 overflow-y-auto p-4 bg-white/5">
        <Switch fallback={<div>Неизвестная вкладка</div>}>
          
          <Match when={props.activeTab === "welcome"}>
            
            <Switch fallback={<div>Раздел не найден</div>}>
              
              <Match when={props.currentSection === "welcome"}>
                <WelcomeSection 
                  greetMsg={props.greetMsg}
                  setName={props.setName}
                  setGreetMsg={props.setGreetMsg}
                />
              </Match>
              
              <Match when={props.currentSection === "theme"}>
                <ThemeExample />
              </Match>
              <Match when={props.currentSection === "language"}>
                <LanguageExample />
              </Match>

              <Match when={props.currentSection === "daisyui"}>
                <DaisyUIExample 
                  daisyChecked={props.daisyChecked}
                  setDaisyChecked={props.setDaisyChecked}
                />
              </Match>
             
              <Match when={props.currentSection === "two-panels"}>
                <div class="flex-1 bg-white/20 backdrop-blur-sm rounded-xl p-4 mb-6">
                  <h2 class="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    
                    {t('panelsTitle')}
                  </h2>
                  <TwoPanelsExample />
                </div>
              </Match>
             
              <Match when={props.currentSection === "resizable-panel"}>
                <div class="flex-1 bg-white/20 backdrop-blur-sm rounded-xl p-4 mb-6">
                  <h2 class="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    
                    {t('resizableTitle')}
                  </h2>
                  <div class="flex justify-center">
                    <ResizableboxExample />
                  </div>
                </div>
              </Match>
              
              <Match when={props.currentSection === "drag-drop"}>
                <DragDropExample />
              </Match>
            </Switch>
          </Match>
          
          <Match when={props.activeTab !== "welcome"}>
            <div class="flex items-center justify-center h-full">
              <div class="text-center">
                <i class="codicon codicon-file text-6xl text-white/30 mb-4"></i>
                <p class="text-white/60">{t('tabContent', { id: props.activeTab })}</p>
              </div>
            </div>
          </Match>
        </Switch>
      </div>
    </div>
  );
};
