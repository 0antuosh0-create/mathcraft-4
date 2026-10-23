import React from 'react';
import { Language } from '../../types/math';
import { formatDisplayNumber, formatDisplayDigits } from '../../utils/i18n';

interface PlaceValueChartProps {
  number: number;
  highlightedPlace?: string;
  language?: Language;
}

export const PlaceValueChart: React.FC<PlaceValueChartProps> = ({
  number,
  highlightedPlace,
  language = 'en'
}) => {
  const isFa = language === 'fa';
  const digits = String(Math.abs(number)).padStart(6, '0').slice(-6).split('').map(Number);

  const columns = [
    { 
      key: 'hundred_thousands', 
      title: isFa ? 'صدگان هزار' : 'Hundred Thousands', 
      period: isFa ? 'طبقه هزارها' : 'Thousands Period', 
      digit: digits[0] ?? 0, 
      multiplier: 100000 
    },
    { 
      key: 'ten_thousands', 
      title: isFa ? 'دهگان هزار' : 'Ten Thousands', 
      period: isFa ? 'طبقه هزارها' : 'Thousands Period', 
      digit: digits[1] ?? 0, 
      multiplier: 10000 
    },
    { 
      key: 'thousands', 
      title: isFa ? 'یکان هزار' : 'Thousands', 
      period: isFa ? 'طبقه هزارها' : 'Thousands Period', 
      digit: digits[2] ?? 0, 
      multiplier: 1000 
    },
    { 
      key: 'hundreds', 
      title: isFa ? 'صدگان' : 'Hundreds', 
      period: isFa ? 'طبقه یکی‌ها' : 'Units Period', 
      digit: digits[3] ?? 0, 
      multiplier: 100 
    },
    { 
      key: 'tens', 
      title: isFa ? 'دهگان' : 'Tens', 
      period: isFa ? 'طبقه یکی‌ها' : 'Units Period', 
      digit: digits[4] ?? 0, 
      multiplier: 10 
    },
    { 
      key: 'ones', 
      title: isFa ? 'یکان' : 'Ones', 
      period: isFa ? 'طبقه یکی‌ها' : 'Units Period', 
      digit: digits[5] ?? 0, 
      multiplier: 1 
    },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-card overflow-x-auto my-3 transition-colors">
      <div className="flex items-center justify-between mb-3 text-xs font-semibold text-slate-600 dark:text-slate-400">
        <span className="font-bold text-slate-900 dark:text-white">
          {isFa ? 'ساختار ارزش مکانی: ' : 'Place Value Structure: '}
          <span className="font-mono text-sm font-black text-blue-600 dark:text-blue-400">
            {formatDisplayNumber(number, language)}
          </span>
        </span>
        <span className={`text-[11px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2.5 py-0.5 rounded ${isFa ? 'font-vazir font-semibold' : 'font-mono'}`}>
          {isFa ? 'هر مرتبه ۱۰ برابر مرتبه سمت راست خود است' : 'Each place is 10× the value of the place to its right'}
        </span>
      </div>

      {/* Mobile-Friendly Stacked Periods (Fits 100% on phones without scrolling) */}
      <div className="sm:hidden space-y-2.5" dir="ltr">
        {/* Thousands Period */}
        <div className="border border-slate-200 dark:border-slate-800 rounded-lg p-2 bg-slate-50/50 dark:bg-slate-800/20">
          <div className="text-center font-bold text-[11px] text-slate-800 dark:text-slate-200 mb-1.5 pb-1 border-b border-slate-200 dark:border-slate-700">
            {isFa ? 'طبقه هزارها (هزارگان)' : 'Thousands Period'}
          </div>
          <div className="grid grid-cols-3 gap-1">
            {columns.slice(0, 3).map((col) => {
              const isHighlighted = highlightedPlace === col.key;
              const placeValue = col.digit * col.multiplier;
              return (
                <div
                  key={col.key}
                  className={`flex flex-col items-center justify-between p-1.5 rounded border text-center ${
                    isHighlighted 
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/40' 
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
                  }`}
                >
                  <div className="text-[9px] font-medium text-slate-500 truncate w-full">{col.title}</div>
                  <div className={`text-2xl font-black my-0.5 text-slate-900 dark:text-white ${isFa ? 'font-vazir' : 'font-mono'}`}>
                    {formatDisplayDigits(col.digit, language)}
                  </div>
                  <div className={`w-full pt-0.5 border-t border-slate-100 dark:border-slate-800 text-[10px] font-semibold text-slate-600 dark:text-slate-400 ${isFa ? 'font-vazir' : 'font-mono'}`}>
                    {col.digit > 0 ? formatDisplayNumber(placeValue, language) : (isFa ? '۰' : '0')}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Units Period */}
        <div className="border border-slate-200 dark:border-slate-800 rounded-lg p-2 bg-slate-50/50 dark:bg-slate-800/20">
          <div className="text-center font-bold text-[11px] text-slate-800 dark:text-slate-200 mb-1.5 pb-1 border-b border-slate-200 dark:border-slate-700">
            {isFa ? 'طبقه یکی‌ها' : 'Units (Ones) Period'}
          </div>
          <div className="grid grid-cols-3 gap-1">
            {columns.slice(3, 6).map((col) => {
              const isHighlighted = highlightedPlace === col.key;
              const placeValue = col.digit * col.multiplier;
              return (
                <div
                  key={col.key}
                  className={`flex flex-col items-center justify-between p-1.5 rounded border text-center ${
                    isHighlighted 
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/40' 
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
                  }`}
                >
                  <div className="text-[9px] font-medium text-slate-500 truncate w-full">{col.title}</div>
                  <div className={`text-2xl font-black my-0.5 text-slate-900 dark:text-white ${isFa ? 'font-vazir' : 'font-mono'}`}>
                    {formatDisplayDigits(col.digit, language)}
                  </div>
                  <div className={`w-full pt-0.5 border-t border-slate-100 dark:border-slate-800 text-[10px] font-semibold text-slate-600 dark:text-slate-400 ${isFa ? 'font-vazir' : 'font-mono'}`}>
                    {col.digit > 0 ? formatDisplayNumber(placeValue, language) : (isFa ? '۰' : '0')}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Desktop View: Full 6 Columns */}
      <div className="hidden sm:block min-w-[600px]" dir="ltr">
        <div className="grid grid-cols-6 gap-1 mb-1 text-center text-[11px] font-bold">
          <div className="col-span-3 bg-slate-100 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 py-1 rounded-t border-b-2 border-slate-300 dark:border-slate-700">
            {isFa ? 'طبقه هزارها (هزارگان)' : 'Thousands Period'}
          </div>
          <div className="col-span-3 bg-slate-100 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 py-1 rounded-t border-b-2 border-slate-300 dark:border-slate-700">
            {isFa ? 'طبقه یکی‌ها' : 'Units (Ones) Period'}
          </div>
        </div>

        <div className="grid grid-cols-6 gap-1">
          {columns.map((col) => {
            const isHighlighted = highlightedPlace === col.key;
            const placeValue = col.digit * col.multiplier;
            return (
              <div
                key={col.key}
                className={`flex flex-col items-center justify-between p-2.5 rounded-lg border text-center transition-all ${
                  isHighlighted 
                    ? 'border-blue-500 bg-blue-50/70 dark:bg-blue-950/40 ring-1 ring-blue-500 shadow-sm' 
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60'
                }`}
              >
                <div className="text-[10px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-tight">
                  {col.title}
                </div>
                <div className={`text-3xl font-black my-1 text-slate-900 dark:text-white ${isFa ? 'font-vazir' : 'font-mono'}`}>
                  {formatDisplayDigits(col.digit, language)}
                </div>
                <div className={`w-full pt-1 mt-1 border-t border-slate-200 dark:border-slate-800 text-[11px] font-semibold text-slate-600 dark:text-slate-400 ${isFa ? 'font-vazir' : 'font-mono'}`}>
                  {col.digit > 0 ? formatDisplayNumber(placeValue, language) : (isFa ? '۰' : '0')}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 10x relationship footer */}
      <div className="mt-2.5 flex flex-wrap items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 px-3 py-1.5 rounded border border-slate-100 dark:border-slate-800 gap-1" dir={isFa ? 'rtl' : 'ltr'}>
        <span className="font-semibold text-slate-700 dark:text-slate-300">
          {isFa ? 'حرکت به چپ (⟵): ارزش ۱۰ برابر می‌شود' : '← Multiply by 10 (moving left)'}
        </span>
        <span className="font-semibold text-slate-700 dark:text-slate-300">
          {isFa ? 'حرکت به راست (⟶): ارزش یک‌دهم می‌شود' : '(moving right) Divide by 10 →'}
        </span>
      </div>
    </div>
  );
};
