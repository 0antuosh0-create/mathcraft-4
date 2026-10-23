import React from 'react';
import { 
  BookOpen, 
  PenTool, 
  RefreshCw, 
  AlertCircle, 
  FileText, 
  Moon, 
  Sun, 
  Flame, 
  ChevronDown
} from 'lucide-react';
import { Language, Theme } from '../types/math';
import { toPersianDigits } from '../utils/persian';
import { sound } from '../utils/sound';

export type AppTab = 'learn' | 'practice' | 'generator' | 'detective' | 'worksheet';

interface NavbarProps {
  currentTab: AppTab;
  onTabChange: (tab: AppTab) => void;
  activeUnitId: string;
  onUnitChange: (unitId: string) => void;
  score: number;
  streak: number;
  language: Language;
  onToggleLanguage: () => void;
  theme: Theme;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onTabChange,
  activeUnitId,
  onUnitChange,
  score,
  streak,
  language,
  onToggleLanguage,
  theme,
  onToggleTheme
}) => {
  const isFa = language === 'fa';

  const tabs = [
    { 
      id: 'worksheet', 
      label: isFa ? 'استودیوی کاربرگ' : 'Worksheet Studio', 
      icon: FileText
    },
    { 
      id: 'learn', 
      label: isFa ? 'درس‌نامه' : 'Lessons', 
      icon: BookOpen
    },
    { 
      id: 'practice', 
      label: isFa ? 'تمرین اصلی' : 'Practice', 
      icon: PenTool
    },
    { 
      id: 'generator', 
      label: isFa ? 'تولید مشابه' : 'Generator', 
      icon: RefreshCw
    },
    { 
      id: 'detective', 
      label: isFa ? 'کارآگاه خطا' : 'Spot Mistake', 
      icon: AlertCircle
    },
  ] as const;

  const units = [
    { 
      id: 'unit_1', 
      label: isFa ? 'فصل ۱: ارزش مکانی و تقریب' : 'Topic 1: Place Value & Rounding' 
    },
    { 
      id: 'unit_2', 
      label: isFa ? 'فصل ۲: جمع، تفریق و نمودار نواری' : 'Topic 2: Add, Subtract & Models' 
    },
    { 
      id: 'unit_3', 
      label: isFa ? 'فصل ۳: ضرب و مضارب ۱۰' : 'Topic 3: Multiplication by 10s' 
    },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 h-14 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors print-hide">
      <div className="max-w-7xl mx-auto h-full px-3 sm:px-5 flex items-center justify-between gap-3">
        {/* Start: Brand & Topic Dropdown */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center font-mono font-black text-xs shadow-sm">
              M4
            </div>
            <span className="font-extrabold text-sm tracking-tight text-slate-900 dark:text-white hidden sm:inline">
              {isFa ? 'ریاضی‌یار ۴' : 'MathCraft 4'}
            </span>
          </div>

          {/* Compact Topic Switcher */}
          <div className="relative">
            <select
              value={activeUnitId}
              onChange={(e) => {
                sound.playClick();
                onUnitChange(e.target.value);
              }}
              className="bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 text-xs font-semibold rounded-lg px-2.5 py-1.5 pe-7 focus:outline-none cursor-pointer transition-colors appearance-none"
            >
              {units.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.label}
                </option>
              ))}
            </select>
            <ChevronDown className={`w-3.5 h-3.5 absolute top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none ${isFa ? 'start-2' : 'end-2'}`} />
          </div>
        </div>

        {/* Center: Desktop Segmented Navigation Pills (Hidden on mobile) */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/90 dark:bg-slate-900 p-1 rounded-xl border border-slate-200/80 dark:border-slate-800 overflow-x-auto scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  sound.playClick();
                  onTabChange(tab.id);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* End: High-End Bilingual Pill, Theme, and Stats */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Streak & Score */}
          <div className="hidden lg:flex items-center gap-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-2.5 py-1 rounded-lg text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
            <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>{isFa ? toPersianDigits(streak) : streak}</span>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <span className="text-emerald-600 dark:text-emerald-400">
              {isFa ? `${toPersianDigits(score)} نمره` : `${score} pts`}
            </span>
          </div>

          {/* Premium Segmented Language Switcher (EN | فارسی) */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-900 p-0.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-semibold">
            <button
              onClick={() => {
                if (language !== 'en') {
                  sound.playClick();
                  onToggleLanguage();
                }
              }}
              className={`px-2.5 py-1 rounded-md transition-all font-sans text-xs ${
                language === 'en'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm font-bold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => {
                if (language !== 'fa') {
                  sound.playClick();
                  onToggleLanguage();
                }
              }}
              className={`px-2.5 py-1 rounded-md transition-all font-vazir text-xs ${
                language === 'fa'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm font-bold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              فارسی
            </button>
          </div>

          {/* Dark Mode Switcher */}
          <button
            onClick={() => {
              sound.playClick();
              onToggleTheme();
            }}
            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
            title={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700" />
            )}
          </button>
        </div>
      </div>
      </header>

      {/* Mobile Bottom Navigation Bar outside header */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 h-14 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 flex items-center justify-around py-1 px-1.5 print-hide shadow-lg">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                sound.playClick();
                onTabChange(tab.id);
              }}
              className={`flex flex-col items-center justify-center py-1 px-1.5 rounded-xl transition-all flex-1 min-w-0 ${
                isActive
                  ? 'text-blue-600 dark:text-blue-400 font-bold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Icon className={`w-4 h-4 mb-0.5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
              <span className="text-[10px] leading-tight truncate max-w-full">{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
};
