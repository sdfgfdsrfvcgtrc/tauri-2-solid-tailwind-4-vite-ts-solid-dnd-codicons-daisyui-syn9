import { t } from "../../i18n";
import { createSignal } from "solid-js";

export const ResizableboxExample = () => {
  const [size, setSize] = createSignal({ width: 200, height: 150 });
  let ref: HTMLDivElement;

  const onMouseDown = (e: MouseEvent) => {
    e.preventDefault();
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = size().width;
    const startHeight = size().height;

    const onMouseMove = (e: MouseEvent) => {
      const newWidth = startWidth + (e.clientX - startX);
      const newHeight = startHeight + (e.clientY - startY);
      setSize({
        width: Math.max(100, newWidth),
        height: Math.max(80, newHeight)
      });
    };

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  return (
    <div 
      ref={ref!}
      style={{
        width: `${size().width}px`,
        height: `${size().height}px`,
        background: "rgba(255, 255, 255, 0.2)",
        border: "2px dashed rgba(255,255,255,0.5)",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        boxSizing: "border-box",
        position: 'relative'
      }}
    >
      <div class="text-white text-center">
        <p class="font-medium mb-2 flex items-center justify-center gap-1">
          
          {t('resizeHint1')}
        </p>
        <p class="text-sm opacity-80 flex items-center justify-center gap-1">
          
          {t('resizeHint2')}
        </p>
      </div>
      <div 
        onMouseDown={onMouseDown}
        style={{
          position: 'absolute',
          right: '0',
          bottom: '0',
          width: '20px',
          height: '20px',
          background: 'rgba(255,255,255,0.5)',
          cursor: 'nwse-resize',
          borderRadius: '4px'
        }}
      />
    </div>
  );
};
