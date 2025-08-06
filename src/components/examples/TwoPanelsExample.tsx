import { t } from "../../i18n";
import { createSignal } from "solid-js";

export const TwoPanelsExample = () => {
  const [leftWidth, setLeftWidth] = createSignal(50);
  let containerRef: HTMLDivElement;
  let dividerRef: HTMLDivElement;

  const onMouseDown = (e: MouseEvent) => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = leftWidth();

    const onMouseMove = (e: MouseEvent) => {
      const containerWidth = containerRef.clientWidth;
      const delta = ((e.clientX - startX) / containerWidth) * 100;
      const newWidth = Math.max(20, Math.min(80, startWidth + delta));
      setLeftWidth(newWidth);
    };

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      document.body.style.cursor = '';
      dividerRef.style.cursor = '';
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    document.body.style.cursor = 'col-resize';
    dividerRef.style.cursor = 'col-resize';
  };

  return (
    <div 
      ref={containerRef!}
      class="w-full h-64 flex bg-gray-200/30 rounded-lg overflow-hidden"
    >
      <div 
        style={{ width: `${leftWidth()}%` }}
        class="h-full bg-blue-500/30 flex items-center justify-center p-4"
      >
        <div class="text-white text-center">
          <p class="font-medium">{t('leftPanel')}</p>
          <p class="text-sm opacity-80">
            {t('width')}: {Math.round(leftWidth())}%
          </p>
        </div>
      </div>
      
      <div 
        ref={dividerRef!}
        onMouseDown={onMouseDown}
        class="w-2 bg-gray-400/70 hover:bg-gray-500 cursor-col-resize transition-colors"
      />
      
      <div 
        style={{ width: `${100 - leftWidth()}%` }}
        class="h-full bg-green-500/30 flex items-center justify-center p-4"
      >
        <div class="text-white text-center">
          <p class="font-medium">{t('rightPanel')}</p>
          <p class="text-sm opacity-80">
            {t('width')}: {Math.round(100 - leftWidth())}%
          </p>
        </div>
      </div>
    </div>
  );
};
