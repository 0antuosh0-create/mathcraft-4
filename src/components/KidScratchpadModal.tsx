import React, { useRef, useState, useEffect } from 'react';
import { Language } from '../types/math';
import { X, RotateCcw, Palette, Check } from 'lucide-react';
import { sound } from '../utils/sound';

interface KidScratchpadModalProps {
  isOpen: boolean;
  onClose: () => void;
  language?: Language;
}

export const KidScratchpadModal: React.FC<KidScratchpadModalProps> = ({
  isOpen,
  onClose,
  language = 'en'
}) => {
  const isFa = language === 'fa';
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [currentColor, setCurrentColor] = useState<string>('#2563eb');
  const [brushSize, setBrushSize] = useState<number>(3);

  const colors = [
    { label: 'Blue', hex: '#2563eb' },
    { label: 'Rose', hex: '#e11d48' },
    { label: 'Emerald', hex: '#059669' },
    { label: 'Amber', hex: '#d97706' },
    { label: 'Dark', hex: '#0f172a' },
  ];

  useEffect(() => {
    if (isOpen && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
      }
    }
  }, [isOpen]);

  const handleStartDraw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e && e.touches[0] ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e && e.touches[0] ? e.touches[0].clientY : (e as React.MouseEvent).clientY;

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = currentColor;
    ctx.lineWidth = brushSize;
  };

  const handleDraw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e && e.touches[0] ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e && e.touches[0] ? e.touches[0].clientY : (e as React.MouseEvent).clientY;

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const handleStopDraw = () => {
    setIsDrawing(false);
  };

  const handleClear = () => {
    sound.playClick();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 print-hide">
      <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-2xl flex flex-col shadow-2xl border-2 border-amber-300 dark:border-amber-600/50 overflow-hidden text-xs">
        {/* Top Control Bar */}
        <div className="p-3 bg-amber-50 dark:bg-slate-800/80 border-b border-amber-200 dark:border-slate-700 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">🎨</span>
            <div className="font-bold text-slate-900 dark:text-white text-xs">
              {isFa ? 'دفترچه چرک‌نویس و نقاشی ریاضی' : 'Interactive Math Scratchpad'}
            </div>
          </div>

          {/* Color Palette */}
          <div className="flex items-center gap-1.5">
            {colors.map(c => (
              <button
                key={c.hex}
                onClick={() => setCurrentColor(c.hex)}
                style={{ backgroundColor: c.hex }}
                className={`w-6 h-6 rounded-full border-2 transition-transform ${currentColor === c.hex ? 'scale-125 border-white shadow-md' : 'border-transparent opacity-80'}`}
                title={c.label}
              />
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleClear}
              className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-bold flex items-center gap-1 text-[11px]"
              title="Clear Scratchpad"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{isFa ? 'پاک کردن' : 'Clear'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-sm font-bold ms-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Drawing Canvas Area */}
        <div className="relative bg-[#fdfbf7] dark:bg-slate-950 p-2 overflow-hidden flex items-center justify-center">
          {/* Subtle math grid paper texture */}
          <canvas
            ref={canvasRef}
            width={700}
            height={420}
            onMouseDown={handleStartDraw}
            onMouseMove={handleDraw}
            onMouseUp={handleStopDraw}
            onMouseLeave={handleStopDraw}
            onTouchStart={handleStartDraw}
            onTouchMove={handleDraw}
            onTouchEnd={handleStopDraw}
            className="w-full h-[380px] bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 paper-grid cursor-crosshair shadow-inner touch-none"
          />
        </div>

        {/* Footer */}
        <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-medium px-4">
          <span>{isFa ? 'می‌توانی اعداد و مراحل قرض گرفتن را با موس یا انگشت اینجا بنویسی!' : 'Sketch borrowing columns, equations, or diagrams freely here!'}</span>
          <button
            onClick={onClose}
            className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold px-3 py-1 rounded-lg text-xs transition-colors"
          >
            {isFa ? 'بستن دفترچه' : 'Done'}
          </button>
        </div>
      </div>
    </div>
  );
};
