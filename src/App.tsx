import React, { useState, useEffect } from 'react';
import { getUnits } from './data/curriculum';
import { PRESET_WORKSHEETS, PRESET_WORKSHEETS_FA } from './data/presetWorksheets';
import { Question, Worksheet, Language, Theme } from './types/math';
import { Navbar, AppTab } from './components/Navbar';
import { LessonView } from './components/LessonView';
import { PracticeView } from './components/PracticeView';
import { GeneratorView } from './components/GeneratorView';
import { ErrorDetectiveView } from './components/ErrorDetectiveView';
import { WorksheetBuilderView } from './components/WorksheetBuilderView';
import { KidScratchpadModal } from './components/KidScratchpadModal';
import { getTodayDateFormatted } from './utils/i18n';
import { sound } from './utils/sound';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>('worksheet');
  const [activeUnitId, setActiveUnitId] = useState<string>('unit_1');
  const [targetLessonId, setTargetLessonId] = useState<string>('lesson_1_2');
  const [targetQuestionForGen, setTargetQuestionForGen] = useState<Question | undefined>(undefined);

  // Language state (English / Farsi)
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('mathcraft_lang');
    return (saved === 'fa' || saved === 'en') ? saved : 'en';
  });

  // Dark Mode state (SceneAI theme)
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('mathcraft_theme');
    return (saved === 'light' || saved === 'dark') ? saved : 'dark';
  });

  // Gamification state
  const [score, setScore] = useState<number>(() => {
    const saved = localStorage.getItem('mathcraft_score');
    return saved ? parseInt(saved, 10) : 120;
  });
  const [streak, setStreak] = useState<number>(() => {
    const saved = localStorage.getItem('mathcraft_streak');
    return saved ? parseInt(saved, 10) : 3;
  });
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isDoodlerOpen, setIsDoodlerOpen] = useState<boolean>(false);
  // Custom Worksheet state
  const [customWorksheet, setCustomWorksheet] = useState<Worksheet>(() => {
    const list = language === 'fa' ? PRESET_WORKSHEETS_FA : PRESET_WORKSHEETS;
    const defaultWs = list[0] ?? ({} as Worksheet);
    return {
      ...defaultWs,
      dateStr: getTodayDateFormatted(language)
    };
  });

  // Update HTML document attributes when language or theme changes
  useEffect(() => {
    const htmlEl = document.documentElement;
    htmlEl.lang = language;
    htmlEl.dir = language === 'fa' ? 'rtl' : 'ltr';

    if (theme === 'dark') {
      htmlEl.classList.add('dark');
    } else {
      htmlEl.classList.remove('dark');
    }

    localStorage.setItem('mathcraft_lang', language);
    localStorage.setItem('mathcraft_theme', theme);
  }, [language, theme]);

  useEffect(() => {
    localStorage.setItem('mathcraft_score', String(score));
    localStorage.setItem('mathcraft_streak', String(streak));
  }, [score, streak]);

  const handleToggleLanguage = () => {
    const nextLang: Language = language === 'en' ? 'fa' : 'en';
    setLanguage(nextLang);
    const list = nextLang === 'fa' ? PRESET_WORKSHEETS_FA : PRESET_WORKSHEETS;
    const defaultWs = list[0] ?? ({} as Worksheet);
    setCustomWorksheet({
      ...defaultWs,
      dateStr: getTodayDateFormatted(nextLang)
    });
  };

  const handleToggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sound.enabled = next;
  };

  const handleStartPracticeFromLesson = (lessonId: string) => {
    setTargetLessonId(lessonId);
    setActiveTab('practice');
  };

  const handleGoToGeneratorFromPractice = (question: Question) => {
    setTargetQuestionForGen(question);
    setActiveTab('generator');
  };

  const handleCorrectAnswer = () => {
    setScore(prev => prev + 15);
    setStreak(prev => prev + 1);
  };

  const handleIncorrectAnswer = () => {
    setStreak(0);
  };

  const handleAddToWorksheet = (prompt: string, answer: string | number, solutionSteps: string[]) => {
    const newItem = {
      id: `gen_added_${Date.now()}`,
      sourceType: 'generated' as const,
      prompt,
      answer,
      solutionSteps,
      score: 4,
      allocatedSpaceLines: 4
    };
    const newItems = [...customWorksheet.items, newItem];
    const newTotal = newItems.reduce((acc, c) => acc + c.score, 0);
    setCustomWorksheet({
      ...customWorksheet,
      items: newItems,
      totalScore: newTotal
    });
  };

  // Current Unit & Lessons dynamically localized based on active language
  const units = getUnits(language);
  const currentUnit = units.find(u => u.id === activeUnitId) ?? units[0];
  const currentLessons = currentUnit?.lessons ?? [];
  const isFa = language === 'fa';

  return (
    <div className={`min-h-screen flex flex-col bg-[#f8fafc] dark:bg-[#07090e] text-slate-800 dark:text-slate-100 transition-colors ${isFa ? 'font-vazir' : 'font-sans'}`}>
      {/* Sleek Single-Tier Compact Navbar */}
      <Navbar
        currentTab={activeTab}
        onTabChange={setActiveTab}
        activeUnitId={activeUnitId}
        onUnitChange={(unitId) => {
          setActiveUnitId(unitId);
          const unit = units.find(u => u.id === unitId);
          if (unit && unit.lessons[0]) {
            setTargetLessonId(unit.lessons[0].id);
          }
        }}
        score={score}
        streak={streak}
        language={language}
        onToggleLanguage={handleToggleLanguage}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      {/* Main Tab Views */}
      <main className="flex-1 pb-16 md:pb-0">
        {activeTab === 'worksheet' && (
          <WorksheetBuilderView
            lessons={units.flatMap(u => u.lessons)}
            customWorksheet={customWorksheet}
            onUpdateWorksheet={setCustomWorksheet}
            language={language}
          />
        )}

        {activeTab === 'learn' && (
          <LessonView
            lessons={currentLessons}
            onStartPractice={handleStartPracticeFromLesson}
            language={language}
          />
        )}

        {activeTab === 'practice' && (
          <PracticeView
            lessons={currentLessons}
            initialLessonId={targetLessonId}
            onGoToGenerator={handleGoToGeneratorFromPractice}
            onCorrectAnswer={handleCorrectAnswer}
            onIncorrectAnswer={handleIncorrectAnswer}
            language={language}
          />
        )}

        {activeTab === 'generator' && (
          <GeneratorView
            lessons={currentLessons}
            initialQuestion={targetQuestionForGen}
            onAddToWorksheet={handleAddToWorksheet}
            language={language}
          />
        )}

        {activeTab === 'detective' && (
          <ErrorDetectiveView language={language} />
        )}
      </main>

      {/* Interactive Kid Doodler & Scratchpad Modal */}
      <KidScratchpadModal
        isOpen={isDoodlerOpen}
        onClose={() => setIsDoodlerOpen(false)}
        language={language}
      />

      {/* Sleek Minimal Footer */}
      <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 py-3 print-hide text-[11px] text-slate-500 dark:text-slate-400 transition-colors">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-medium">
            <span className="font-bold text-slate-700 dark:text-slate-200">
              {isFa ? 'ریاضی‌یار ۴' : 'MathCraft 4'}
            </span>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <span>
              {isFa ? 'آموزش تعاملی و استودیوی ساخت کاربرگ ریاضی پایه چهارم دبستان' : 'Grade 4 Elementary Mathematics & Worksheet Studio'}
            </span>
          </div>
          <div>
            {isFa 
              ? 'پشتیبانی از زبان فارسی و انگلیسی • حالت تاریک و روشن • خروجی استاندارد چاپی'
              : 'SceneAI-inspired studio • Bilingual English/Farsi • Dark Mode • A4 Print Engine'
            }
          </div>
        </div>
      </footer>
    </div>
  );
};
