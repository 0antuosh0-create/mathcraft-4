import React, { useState } from 'react';
import { Lesson, Language } from '../types/math';
import { PlaceValueChart } from './visuals/PlaceValueChart';
import { NumberLine } from './visuals/NumberLine';
import { TapeDiagram } from './visuals/TapeDiagram';
import { VerticalRegrouping } from './visuals/VerticalRegrouping';
import { 
  Lightbulb, 
  AlertTriangle, 
  CheckCircle, 
  BookOpen, 
  ArrowRight
} from 'lucide-react';
import { sound } from '../utils/sound';

interface LessonViewProps {
  lessons: Lesson[];
  onStartPractice: (lessonId: string) => void;
  language?: Language;
}

export const LessonView: React.FC<LessonViewProps> = ({
  lessons,
  onStartPractice,
  language = 'en'
}) => {
  const isFa = language === 'fa';
  const [selectedLessonId, setSelectedLessonId] = useState<string>(lessons[0]?.id ?? '');

  const activeLesson = lessons.find(l => l.id === selectedLessonId) ?? lessons[0];

  if (!activeLesson) return null;

  const renderVisualModel = () => {
    const vm = activeLesson.visualDemonstration;
    if (!vm) return null;

    const data = vm.data;
    if (typeof data !== 'object' || data === null) return null;

    if ('kind' in data) {
      if (data.kind === 'place_value' && 'number' in data && typeof data.number === 'number') {
        const hp = 'highlightedPlace' in data && typeof data.highlightedPlace === 'string' ? data.highlightedPlace : undefined;
        return <PlaceValueChart number={data.number} highlightedPlace={hp} language={language} />;
      }
      if (data.kind === 'number_line' && 'min' in data && 'max' in data && 'target' in data && 'roundedTo' in data) {
        return (
          <NumberLine
            min={Number(data.min)}
            max={Number(data.max)}
            target={Number(data.target)}
            roundedTo={Number(data.roundedTo)}
            language={language}
          />
        );
      }
      if (data.kind === 'tape_diagram' && 'totalLabel' in data && 'parts' in data && Array.isArray(data.parts)) {
        const totalVal = 'totalValue' in data && (typeof data.totalValue === 'number' || typeof data.totalValue === 'string') ? data.totalValue : undefined;
        return (
          <TapeDiagram
            totalLabel={String(data.totalLabel)}
            totalValue={totalVal}
            parts={data.parts}
            title={vm.title}
            language={language}
          />
        );
      }
      if (data.kind === 'vertical_op' && 'op' in data && 'num1' in data && 'num2' in data) {
        const n3 = 'num3' in data && typeof data.num3 === 'number' ? data.num3 : undefined;
        const st = 'steps' in data && Array.isArray(data.steps) ? data.steps.map(String) : undefined;
        return (
          <VerticalRegrouping
            op={data.op === '-' ? '-' : '+'}
            num1={Number(data.num1)}
            num2={Number(data.num2)}
            num3={n3}
            steps={st}
            title={vm.title}
            language={language}
          />
        );
      }
    }

    return null;
  };

  const title = isFa && activeLesson.titleFa ? activeLesson.titleFa : activeLesson.title;
  const subtitle = isFa && activeLesson.subtitleFa ? activeLesson.subtitleFa : activeLesson.subtitle;
  const summary = isFa && activeLesson.conceptSummaryFa ? activeLesson.conceptSummaryFa : activeLesson.conceptSummary;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 transition-colors">
      {/* Lesson Selector */}
      <div className="flex flex-wrap items-center gap-2 mb-6 bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800 shadow-card">
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 px-2 flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5" />
          {isFa ? 'درس‌های این مبحث:' : 'Lessons in this Topic:'}
        </span>
        <div className="flex flex-wrap items-center gap-1.5">
          {lessons.map((lesson) => {
            const isSelected = lesson.id === activeLesson.id;
            return (
              <button
                key={lesson.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedLessonId(lesson.id);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
                  isSelected
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm font-bold'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <span className="font-mono text-[10px] opacity-75">{lesson.number}</span>
                <span>{isFa && lesson.titleFa ? lesson.titleFa : lesson.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Column */}
        <div className="lg:col-span-8 space-y-6">
          {/* Header Card */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-card transition-colors">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5">
              <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded font-mono">
                {isFa ? 'نگاهی دوباره' : 'Another Look!'}
              </span>
              <span>{isFa ? `درس ${activeLesson.number}` : `Lesson ${activeLesson.number}`}</span>
            </div>

            <h2 className="text-xl font-black text-slate-900 dark:text-white mb-1">
              {title}
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 font-medium">
              {subtitle}
            </p>

            {/* Concept Summary Callout */}
            <div className="bg-slate-50 dark:bg-slate-800/60 border-l-4 border-slate-800 dark:border-blue-400 p-3.5 rounded text-xs leading-relaxed text-slate-800 dark:text-slate-200 font-medium">
              <strong className="block font-bold text-slate-900 dark:text-white mb-1">
                {isFa ? 'مفهوم کلیدی:' : 'Key Concept:'}
              </strong>
              {summary}
            </div>
          </div>

          {/* Visual Model */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-card transition-colors">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                {isFa ? 'تصویرسازی و مدل مفهومی (روش CPA)' : 'Visual Representation (CPA Concrete-Pictorial Model)'}
              </h3>
              <span className="text-[10px] text-slate-400 font-mono">
                {isFa ? 'مدل بصری' : 'Conceptual Diagram'}
              </span>
            </div>
            {renderVisualModel()}
          </div>

          {/* Explanation Points */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-card space-y-3 transition-colors">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <span>{isFa ? 'توضیحات مفهومی برای درک عمیق' : 'Core Understanding'}</span>
            </h3>
            <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              {activeLesson.detailedExplanation.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded border border-slate-100 dark:border-slate-800">
                  <span className="font-mono text-xs font-bold text-slate-500 shrink-0 mt-0.5">{idx + 1}.</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          {/* Rules & Tips */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-card transition-colors">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300" />
              <span>{isFa ? 'نکات و ترفندهای حل' : 'Rules & Strategy Tips'}</span>
            </h4>
            <div className="space-y-2 text-xs">
              {activeLesson.rulesAndTips.map((tip, idx) => (
                <div key={idx} className="bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 p-2.5 rounded text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                  • {tip}
                </div>
              ))}
            </div>
          </div>

          {/* Common Pitfalls */}
          {activeLesson.commonPitfalls.length > 0 && (
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-amber-200 dark:border-amber-900/60 p-4 shadow-card transition-colors">
              <h4 className="text-xs font-bold text-amber-900 dark:text-amber-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>{isFa ? 'هشدار: خطای رایج' : 'Common Misconception'}</span>
              </h4>
              {activeLesson.commonPitfalls.map((pf, idx) => (
                <div key={idx} className="space-y-2 text-xs">
                  <div className="font-bold text-slate-900 dark:text-white">{pf.title}</div>
                  <div className="bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 p-2 rounded border border-rose-100 dark:border-rose-900/50 font-medium">
                    <span className="font-bold">{isFa ? '❌ اشتباه رایج: ' : '✗ Common Mistake: '}</span>
                    {pf.mistake}
                  </div>
                  <div className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 p-2 rounded border border-emerald-100 dark:border-emerald-900/50 font-medium">
                    <span className="font-bold">{isFa ? '✔️ راه حل درست: ' : '✓ Correction: '}</span>
                    {pf.correction}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 px-1 font-medium">
                    {pf.why}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Action CTA */}
          <div className="bg-slate-900 dark:bg-slate-800 rounded-xl p-5 text-white shadow-card text-center">
            <h4 className="text-sm font-bold mb-1">
              {isFa ? 'آماده حل تمرین هستی؟' : 'Ready to Test Your Skills?'}
            </h4>
            <p className="text-xs text-slate-300 mb-4 leading-relaxed font-medium">
              {isFa ? 'سوالات اصلی کتاب را حل کن یا نسخه مشابه با اعداد جدید بساز.' : 'Solve the original questions from this lesson or generate similar practice sets.'}
            </p>
            <button
              onClick={() => {
                sound.playClick();
                onStartPractice(activeLesson.id);
              }}
              className="w-full bg-white dark:bg-slate-100 hover:bg-slate-100 text-slate-900 font-bold py-2 rounded-lg text-xs transition-colors flex items-center justify-center gap-1.5 shadow"
            >
              <span>{isFa ? 'حل تمرین‌های این درس' : 'Practice Lesson Problems'}</span>
              <ArrowRight className={`w-3.5 h-3.5 ${isFa ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
