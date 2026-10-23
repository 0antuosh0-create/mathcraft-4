import React from 'react';
import { Language } from '../../types/math';
import { formatDisplayNumber } from '../../utils/i18n';

interface TapePart {
  label: string;
  value: number | string;
  isUnknown?: boolean;
}

interface TapeDiagramProps {
  totalLabel: string;
  totalValue?: number | string;
  parts: TapePart[];
  title?: string;
  language?: Language;
}

export const TapeDiagram: React.FC<TapeDiagramProps> = ({
  totalLabel,
  totalValue,
  parts,
  title,
  language = 'en'
}) => {
  const isFa = language === 'fa';
  const numericParts = parts.map(p => typeof p.value === 'number' ? p.value : 1);
  const sumNumbers = numericParts.reduce((a, b) => a + b, 0);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-card my-3 transition-colors">
      {title && (
        <div className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-3 flex items-center justify-between">
          <span>{title}</span>
          <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">
            {isFa ? 'نمودار نواری کل و جزء' : 'Tape Diagram (Part-Whole)'}
          </span>
        </div>
      )}

      {/* Total Bar */}
      <div className="mb-2">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
          <span>{totalLabel}</span>
          <span className="font-mono font-bold text-slate-900 dark:text-white">
            {totalValue !== undefined ? formatDisplayNumber(totalValue, language) : '?'}
          </span>
        </div>
        <div className="w-full h-8 rounded border border-slate-800 dark:border-slate-700 bg-slate-900 dark:bg-slate-800 text-white flex items-center justify-center font-mono text-xs font-bold shadow-sm">
          {totalValue !== undefined ? formatDisplayNumber(totalValue, language) : (isFa ? '؟ (کل مجهول)' : '? (Unknown Whole)')}
        </div>
      </div>

      <div className="text-center text-[10px] text-slate-400 my-0.5">
        {isFa ? '↓ بخش‌های تشکیل‌دهنده ↓' : '↓ Constituent Parts ↓'}
      </div>

      {/* Parts Bar */}
      <div className="flex w-full gap-1.5 items-stretch mt-1">
        {parts.map((part, index) => {
          const ratio = sumNumbers > 0 ? ((typeof part.value === 'number' ? part.value : 1) / sumNumbers) * 100 : 100 / parts.length;
          const clampedWidth = Math.max(22, Math.min(78, ratio));

          return (
            <div
              key={index}
              style={{ width: `${clampedWidth}%` }}
              className={`flex flex-col justify-between p-2 rounded border text-center transition-colors ${
                part.isUnknown 
                  ? 'border-dashed border-rose-400 dark:border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200' 
                  : 'border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200'
              }`}
            >
              <div className="text-[10px] font-medium truncate mb-1 text-slate-600 dark:text-slate-400">
                {part.label}
              </div>
              <div className="font-mono text-xs font-black">
                {part.isUnknown ? (
                  <span className="bg-rose-200 dark:bg-rose-900/60 text-rose-800 dark:text-rose-200 px-1.5 py-0.5 rounded text-[10px]">
                    {isFa ? '؟ (مجهول)' : '? (Unknown)'}
                  </span>
                ) : (
                  formatDisplayNumber(part.value, language)
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
