// src/components/tabs/SortableTab.tsx
import { createSortable, transformStyle } from "@thisbeyond/solid-dnd";
import { t } from "../../i18n";
import { Component } from "solid-js";

type SortableTabProps = {
  id: string;
  tKey: string;
  isActive: boolean;
  onClick: () => void;
  onClose: () => void;
  tabNumber?: number;
};

export const SortableTab: Component<SortableTabProps> = (props) => {
  const sortable = createSortable(props.id);
  return (
    <div
      use:sortable
      style={transformStyle(sortable.transform)}
      class={`flex items-center gap-2 pl-4 pr-2 py-1 cursor-move transition-all flex-shrink-0 ${
        props.isActive 
          ? "bg-white/5 text-white" 
          : "bg-gray-700/50 text-white/70 hover:bg-gray-600/50"
      }`}
      onClick={props.onClick}
    >
      
      <span class="whitespace-nowrap overflow-hidden text-ellipsis max-w-[120px]">
        {props.tKey === 'newTab' && props.tabNumber !== undefined
          ? t(props.tKey, { n: props.tabNumber })
          : t(props.tKey)
        }
      </span>
      
     
      <button 
        class="ml-2 flex items-center justify-center w-3 h-4 text-white/60 hover:text-white hover:bg-gray-600/50 transition-colors"
        onClick={(e) => {
          e.stopPropagation();
          props.onClose();
        }}
      >
        <i class="codicon codicon-close text-[10px]"></i>
      </button>
    </div>
  );
};
