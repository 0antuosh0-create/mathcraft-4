import React from 'react';
import { Language } from '../../types/math';
import { formatDisplayDigits } from '../../utils/i18n';

interface VerticalRegroupingProps {
  op: '+' | '-';
  num1: number;
  num2: number;
  num3?: number;
  steps?: string[];
  title?: string;
  language?: Language;
}

export const VerticalRegrouping: React.FC<VerticalRegroupingProps> = ({
  op,
  num1,
  num2,
  num3,
  steps,
  title,
  language = 'en'
}) => {
  const isFa = language === 'fa';
  const result = op === '+' ? num1 + num2 + (num3 ?? 0) : num1 - num2;
  const s1 = String(num1);
  const s2 = String(num2);
  const s3 = num3 !== undefined ? String(num3) : undefined;
  const sRes = String(result);

  const maxLen = Math.max(s1.length, s2.length, s3 ? s3.length : 0, sRes.length);

  const p1 = s1.padStart(maxLen, ' ').split('');
  const p2 = s2.padStart(maxLen, ' ').split('');
  const p3 = s3 ? s3.padStart(maxLen, ' ').split('') : null;
  const pRes = sRes.padStart(maxLen, ' ').split('');

  const isZeroBorrowing = op === '-' && String(num1).includes('0');

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-card my-3 inline-block min-w-[320px] max-w-full transition-colors">
      {title && (
        <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-2 border-b border-slate-100 dark:border-slate-800 pb-1.5 flex items-center justify-between">
          <span>{title}</span>
          <span className="text-[10px] font-mono text-slate-400">
            {isFa ? 'الگوریتم ستونی استاندارد' : 'Standard Algorithm'}
          </span>
        </div>
      )}

      <div className="flex flex-col items-center">
        <div className="font-mono text-xl font-bold tracking-widest text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/60 p-3.5 rounded-lg">
          {/* Regrouping row banner */}
          <div className="flex justify-end text-[10px] text-amber-700 dark:text-amber-400 font-sans font-semibold mb-1 pb-1 border-b border-dashed border-slate-200 dark:border-slate-700">
            {isZeroBorrowing ? (
              <span>{isFa ? '(قرض گرفتن زنجیره‌ای از صفرها)' : '(Regrouping across zeros)'}</span>
            ) : op === '+' ? (
              <span>{isFa ? '(ارقام انتقالی به مرتبه بعدی)' : '(Carried digits to next place)'}</span>
            ) : (
              <span>{isFa ? '(ارقام بازگروه‌بندی شده)' : '(Regrouped places)'}</span>
            )}
          </div>

          {/* Num 1 */}
          <div className="flex justify-end gap-3.5 py-0.5">
            {p1.map((char, i) => (
              <span key={i} className="w-5 text-center">
                {char !== ' ' ? formatDisplayDigits(char, language) : ''}
              </span>
            ))}
          </div>

          {/* Num 2 with Operator */}
          <div className="flex justify-end gap-3.5 py-0.5 relative">
            <span className="absolute -left-6 text-slate-700 dark:text-slate-300 font-bold">{op === '+' ? '+' : '−'}</span>
            {p2.map((char, i) => (
              <span key={i} className="w-5 text-center">
                {char !== ' ' ? formatDisplayDigits(char, language) : ''}
              </span>
            ))}
          </div>

          {/* Num 3 if present */}
          {p3 && (
            <div className="flex justify-end gap-3.5 py-0.5 relative">
              <span className="absolute -left-6 text-slate-700 dark:text-slate-300 font-bold">+</span>
              {p3.map((char, i) => (
                <span key={i} className="w-5 text-center">
                  {char !== ' ' ? formatDisplayDigits(char, language) : ''}
                </span>
              ))}
            </div>
          )}

          {/* Divider */}
          <div className="w-full h-0.5 bg-slate-900 dark:bg-slate-300 my-1"></div>

          {/* Result */}
          <div className="flex justify-end gap-3.5 py-0.5 text-slate-900 dark:text-white font-black">
            {pRes.map((char, i) => (
              <span key={i} className="w-5 text-center">
                {char !== ' ' ? formatDisplayDigits(char, language) : ''}
              </span>
            ))}
          </div>
        </div>

        {/* Steps */}
        {steps && steps.length > 0 && (
          <div className="w-full mt-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 rounded-lg p-2.5 text-xs text-slate-700 dark:text-slate-300">
            <div className="font-bold text-slate-900 dark:text-white mb-1 text-[11px]">
              {isFa ? 'مراحل گام‌به‌گام:' : 'Step-by-step procedure:'}
            </div>
            <ol className="list-decimal list-inside space-y-0.5 text-[11px]">
              {steps.map((st, idx) => (
                <li key={idx}>{st}</li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  );
};
