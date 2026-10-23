import React, { useState } from 'react';
import { Language } from '../types/math';
import { formatDisplayDigits } from '../utils/i18n';
import { Sparkles, Trophy, Flame, MessageCircle, X, Palette, Star, ThumbsUp } from 'lucide-react';
import { sound } from '../utils/sound';

interface MascotCompanionProps {
  score: number;
  streak: number;
  language?: Language;
  onOpenDoodler: () => void;
}

export const MascotCompanion: React.FC<MascotCompanionProps> = ({
  score,
  streak,
  language = 'en',
  onOpenDoodler
}) => {
  const isFa = language === 'fa';
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [currentMascot, setCurrentMascot] = useState<'fox' | 'bot' | 'owl'>('fox');

  // Compute 4th-grade level
  const level = Math.floor(score / 50) + 1;
  const xpInCurrentLevel = score % 50;
  const progressPercent = Math.min(100, (xpInCurrentLevel / 50) * 100);

  const getLevelTitle = () => {
    if (level === 1) return isFa ? 'شاگرد ریاضی' : 'Math Novice';
    if (level === 2) return isFa ? 'جستجوگر باهوش' : 'Clever Explorer';
    if (level === 3) return isFa ? 'قهرمان محاسبات' : 'Calculation Champion';
    if (level === 4) return isFa ? 'استاد ارزش مکانی' : 'Place Value Wizard';
    return isFa ? 'نابغه ریاضی پایه چهارم 🏆' : 'Grade 4 Grandmaster 🏆';
  };

  const getSpeechMessage = () => {
    if (streak >= 5) {
      return isFa ? 'فوق‌العاده‌ای! ۵ پاسخ درست پشت سر هم! 🔥' : 'Incredible! 5 correct in a row! You\'re unstoppable! 🔥';
    }
    if (streak >= 3) {
      return isFa ? 'پشتکار عالیه! داری به سرعت امتیاز می‌گیری! ⭐' : 'Awesome 3-streak! Keep that brainpower rolling! ⭐';
    }
    if (score >= 150) {
      return isFa ? 'بزن قدش قهرمان! آمادگی آزمون پایانی رو داری!' : 'High-five champion! You are mastering Grade 4 math!';
    }
    return isFa 
      ? 'سلام نابغه! آماده‌ای برای معماهای ریاضی و کشف راز صفرها؟ 🚀'
      : 'Hey Math Explorer! Ready for fun challenges and place-value quests? 🚀';
  };

  const mascotAvatars = {
    fox: { emoji: '🦊', name: isFa ? 'چستر روباه باهوش' : 'Chester the Fox' },
    bot: { emoji: '🤖', name: isFa ? 'ربات محاسب نووا' : 'Nova Math Bot' },
    owl: { emoji: '🦉', name: isFa ? 'پروفسور هوت دانا' : 'Professor Hoot' },
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => {
          sound.playClick();
          setIsOpen(true);
        }}
        className="fixed bottom-4 end-4 z-40 bg-gradient-to-tr from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-900 font-black p-3 rounded-2xl shadow-xl flex items-center gap-2 border-2 border-white dark:border-slate-800 animate-bounce print-hide transition-all"
        title="Open Mascot Companion"
      >
        <span className="text-2xl">{mascotAvatars[currentMascot].emoji}</span>
        <span className="text-xs font-bold hidden sm:inline">{isFa ? 'یار ریاضی' : 'Math Buddy'}</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 end-4 z-40 max-w-xs sm:max-w-sm w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl border-2 border-amber-300 dark:border-amber-500/40 p-3.5 shadow-2xl print-hide transition-all text-xs">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {/* Mascot switcher buttons */}
          <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-950/40 p-1 rounded-lg border border-amber-200 dark:border-amber-800/40">
            {(['fox', 'bot', 'owl'] as const).map(mKey => (
              <button
                key={mKey}
                onClick={() => {
                  sound.playClick();
                  setCurrentMascot(mKey);
                }}
                className={`text-base px-1 rounded transition-transform ${currentMascot === mKey ? 'scale-125' : 'opacity-60 hover:opacity-100'}`}
                title={mascotAvatars[mKey].name}
              >
                {mascotAvatars[mKey].emoji}
              </button>
            ))}
          </div>
          <span className="font-bold text-slate-800 dark:text-slate-100 text-[11px]">
            {mascotAvatars[currentMascot].name}
          </span>
        </div>

        <button
          onClick={() => {
            sound.playClick();
            setIsOpen(false);
          }}
          className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-md"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Mascot Speech Bubble */}
      <div className="bg-amber-50 dark:bg-slate-800/80 border border-amber-200 dark:border-slate-700 rounded-xl p-2.5 mb-2.5 flex items-start gap-2 shadow-inner">
        <span className="text-2xl filter drop-shadow shrink-0 mt-0.5">
          {mascotAvatars[currentMascot].emoji}
        </span>
        <div className="font-semibold text-slate-800 dark:text-slate-200 text-[11px] leading-relaxed">
          {getSpeechMessage()}
        </div>
      </div>

      {/* Gamified Level Progress Bar */}
      <div className="space-y-1.5 mb-2.5 bg-slate-50 dark:bg-slate-800/40 p-2 rounded-xl border border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-between text-[10px] font-bold">
          <span className="text-amber-800 dark:text-amber-300 flex items-center gap-1">
            <Trophy className="w-3 h-3 text-amber-500" />
            <span>{getLevelTitle()}</span>
          </span>
          <span className="font-mono text-slate-500 dark:text-slate-400">
            {formatDisplayDigits(score, language)} XP
          </span>
        </div>

        {/* Progress Track */}
        <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 pt-1 border-t border-slate-100 dark:border-slate-800">
        <button
          onClick={onOpenDoodler}
          className="flex-1 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-900 font-bold py-1.5 px-3 rounded-lg flex items-center justify-center gap-1.5 text-[11px] shadow-sm transition-all"
        >
          <Palette className="w-3.5 h-3.5" />
          <span>{isFa ? 'دفتر نقاشی و چرک‌نویس' : 'Scratchpad Doodler'}</span>
        </button>
      </div>
    </div>
  );
};
