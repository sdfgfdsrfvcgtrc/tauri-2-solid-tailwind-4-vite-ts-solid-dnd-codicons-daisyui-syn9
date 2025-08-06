import { t } from "../../i18n";
import { 
  DragDropProvider,
  DragDropSensors,
  useDragDropContext,
  createDraggable,
  createDroppable
} from "@thisbeyond/solid-dnd";
import { createSignal, For } from "solid-js";

const Draggable = (props: { id: string }) => {
  const draggable = createDraggable(props.id);
  return (
    <div
      use:draggable
      class="w-20 h-20 bg-yellow-400 rounded-lg flex items-center justify-center cursor-move shadow-lg hover:bg-yellow-300 transition-colors"
    >
      {props.id}
    </div>
  );
};

const Droppable = (props: { id: string; children: any }) => {
  const droppable = createDroppable(props.id);
  return (
    <div
      use:droppable
      class="min-w-[12rem] min-h-[12rem] bg-purple-500/60 rounded-xl flex flex-wrap justify-center items-center gap-4 border-4 border-dashed border-purple-300 p-4"
    >
      {props.children}
    </div>
  );
};

const DragArea = () => {
  const [, { onDragEnd }] = useDragDropContext();
  const [items, setItems] = createSignal<string[]>([
    "draggable-1",
    "draggable-2"
  ]);
  const [droppedItems, setDroppedItems] = createSignal<string[]>([]);

  onDragEnd(({ draggable, droppable }) => {
    if (droppable) {
      setItems(prev => prev.filter(id => id !== draggable.id));
      setDroppedItems(prev => 
        prev.includes(draggable.id) ? prev : [...prev, draggable.id]
      );
    }
  });

  return (
    <div class="flex flex-col gap-8">
      <div class="flex gap-6">
        <For each={items()}>
          {(itemId) => <Draggable id={itemId} />}
        </For>
      </div>
      <Droppable id="droppable-1">
        <For each={droppedItems()}>
          {(itemId) => <Draggable id={itemId} />}
        </For>
      </Droppable>
    </div>
  );
};

export const DragDropExample = () => {
  return (
    <div class="mb-6">
      <h2 class="text-xl font-bold text-white mb-4 flex items-center gap-2">
        
        {t('dragDropTitle')}
      </h2>
      <DragDropProvider>
        <DragDropSensors>
          <DragArea />
        </DragDropSensors>
      </DragDropProvider>
      <p class="text-white/80 mt-4 text-sm flex items-center gap-1">
        
        {t('dragInstructions')}
      </p>
    </div>
  );
};
