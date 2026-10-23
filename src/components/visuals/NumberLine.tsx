import React from 'react';
import { Language } from '../../types/math';
import { formatDisplayNumber } from '../../utils/i18n';

interface NumberLineProps {
  min: number;
  max: number;
  target: number;
  roundedTo: number;
  placeName?: string;
  language?: Language;
}

export const NumberLine: React.FC<NumberLineProps> = ({
  min,
  max,
  target,
  roundedTo,
  placeName = 'place',
  language = 'en'
}) => {
  const isFa = language === 'fa';
  const midpoint = Math.floor((min + max) / 2);
  const range = max - min;
  const percentage = range > 0 ? Math.max(4, Math.min(96, ((target - min) / range) * 100)) : 50;
  const isRoundUp = roundedTo === max;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-card my-3 transition-colors">
      <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-6">
        <span>
          {isFa ? (
            <>محور اعداد: گرد کردن <strong className="font-mono text-slate-900 dark:text-white">{formatDisplayNumber(target, language)}</strong> به نزدیک‌ترین {placeName}</>
          ) : (
            <>Number Line Model: Rounding <strong className="font-mono text-slate-900 dark:text-white">{formatDisplayNumber(target, language)}</strong> to the nearest {placeName}</>
          )}
        </span>
        <span className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 px-2 py-0.5 rounded font-mono text-[11px] font-bold">
          {isFa ? 'تقریب: ' : 'Rounded: '} {formatDisplayNumber(roundedTo, language)}
        </span>
      </div>

      {/* Axis */}
      <div className="relative mx-8 my-8">
        <div className="h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full w-full"></div>

        {/* Lower Bound */}
        <div className="absolute top-[-8px] left-0 -translate-x-1/2 flex flex-col items-center">
          <div className="w-0.5 h-5 bg-slate-700 dark:bg-slate-300"></div>
          <span className="font-mono text-xs font-bold text-slate-900 dark:text-white mt-1">
            {formatDisplayNumber(min, language)}
          </span>
          <span className="text-[10px] text-slate-400">{isFa ? 'حداقل' : 'Lower'}</span>
        </div>

        {/* Midpoint */}
        <div className="absolute top-[-6px] left-1/2 -translate-x-1/2 flex flex-col items-center">
          <div className="w-0.5 h-4 bg-amber-500"></div>
          <span className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400 mt-1">
            {formatDisplayNumber(midpoint, language)}
          </span>
          <span className="text-[10px] text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-1 rounded">
            {isFa ? 'نقطه وسط' : 'Halfway Mark'}
          </span>
        </div>

        {/* Upper Bound */}
        <div className="absolute top-[-8px] right-0 translate-x-1/2 flex flex-col items-center">
          <div className="w-0.5 h-5 bg-slate-700 dark:bg-slate-300"></div>
          <span className="font-mono text-xs font-bold text-slate-900 dark:text-white mt-1">
            {formatDisplayNumber(max, language)}
          </span>
          <span className="text-[10px] text-slate-400">{isFa ? 'حداکثر' : 'Upper'}</span>
        </div>

        {/* Target Pointer */}
        <div
          className="absolute top-[-30px] -translate-x-1/2 flex flex-col items-center z-10"
          style={{ left: `${percentage}%` }}
        >
          <div className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-mono text-xs font-bold px-2 py-0.5 rounded shadow">
            {formatDisplayNumber(target, language)}
          </div>
          <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-slate-900 dark:border-t-white"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-slate-900 dark:bg-white border-2 border-white dark:border-slate-900 shadow"></div>
        </div>
      </div>

      {/* Explanatory Rule */}
      <div className="mt-7 text-xs text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded border border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <span>
          {isFa ? (
            <>چون عدد <strong>{formatDisplayNumber(target, language)}</strong> {target >= midpoint ? 'بزرگ‌تر یا مساوی نقطه وسط است' : 'کوچک‌تر از نقطه وسط است'}، به سمت <strong>{formatDisplayNumber(roundedTo, language)}</strong> گرد می‌شود.</>
          ) : (
            <>Because <strong>{formatDisplayNumber(target, language)}</strong> is {target >= midpoint ? '≥ halfway benchmark' : '< halfway benchmark'}, it rounds {isRoundUp ? 'up' : 'down'} to <strong>{formatDisplayNumber(roundedTo, language)}</strong>.</>
          )}
        </span>
        <span className="font-mono text-[11px] font-bold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-800">
          {isRoundUp ? (isFa ? 'گرد به بالا ↑' : 'Round Up ↑') : (isFa ? 'گرد به پایین ↓' : 'Round Down ↓')}
        </span>
      </div>
    </div>
  );
};
