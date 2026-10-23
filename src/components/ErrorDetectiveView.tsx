import React, { useState } from 'react';
import { getDetectiveCases } from '../data/curriculum';
import { Language } from '../types/math';
import { toPersianDigits } from '../utils/persian';
import { 
  Search, 
  Check, 
  X, 
  CheckCircle, 
  AlertCircle, 
  UserCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/sound';

interface ErrorDetectiveViewProps {
  language?: Language;
}

export const ErrorDetectiveView: React.FC<ErrorDetectiveViewProps> = ({
  language = 'en'
}) => {
  const isFa = language === 'fa';
  const cases = getDetectiveCases(language);
  const [selectedCaseId, setSelectedCaseId] = useState<string>(cases[0]?.id ?? '');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);

  const activeCase = cases.find(c => c.id === selectedCaseId) ?? cases[0];
  const handleSelectCase = (id: string) => {
    sound.playClick();
    setSelectedCaseId(id);
    setSelectedOption(null);
    setFeedback(null);
  };

  const handleDiagnose = () => {
    if (!activeCase || selectedOption === null) return;

    if (selectedOption === activeCase.correctOptionIndex) {
      sound.playFanfare();
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 }
      });
      setFeedback({
        isCorrect: true,
        message: isFa ? 'آفرین! تشخیص شما دقیقاً ریشه سوءتفاهم مفهومی را مشخص کرد.' : 'Accurate diagnosis! You identified the root conceptual misconception.'
      });
    } else {
      sound.playTryAgain();
      setFeedback({
        isCorrect: false,
        message: isFa ? 'این دلیل اصلی اشتباه نبود. دوباره به راه حل دانش‌آموز دقت کنید.' : 'Not quite. Re-read the student\'s scratchwork and place-value rules.'
      });
    }
  };

  if (!activeCase) return null;

  const caseTitle = isFa && activeCase.titleFa ? activeCase.titleFa : activeCase.title;
  const promptText = isFa && activeCase.problemPromptFa ? activeCase.problemPromptFa : activeCase.problemPrompt;
  const diagQuestion = isFa && activeCase.diagnosisQuestionFa ? activeCase.diagnosisQuestionFa : activeCase.diagnosisQuestion;
  const optionsList = isFa && activeCase.optionsFa ? activeCase.optionsFa : activeCase.options;
  const explanationText = isFa && activeCase.explanationFa ? activeCase.explanationFa : activeCase.explanation;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-5 transition-colors">
      {/* Banner */}
      <div className="bg-slate-900 dark:bg-slate-950 text-white rounded-xl p-5 shadow-card flex flex-col sm:flex-row items-center justify-between gap-4 border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
            <Search className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-base font-bold">
              {isFa ? 'اتاق کارآگاه ریاضی (تحلیل خطاهای واقعی دانش‌آموزان)' : 'Spot the Mistake (Error Analysis Lab)'}
            </h2>
            <p className="text-xs text-slate-300 mt-0.5 font-medium">
              {isFa 
                ? 'اشتباهات محاسباتی دانش‌آموزان در کاربرگ‌ها را ردیابی کنید و ریشه سوءتفاهم را کشف نمایید.'
                : 'Investigate actual student errors from the workbook worksheets to build deep conceptual immunity against arithmetic bugs.'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Case Tabs */}
      <div className="flex flex-wrap gap-2">
        {cases.map((c) => {
          const isSelected = c.id === activeCase.id;
          return (
            <button
              key={c.id}
              onClick={() => handleSelectCase(c.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                isSelected
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm font-bold'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>{c.title}</span>
            </button>
          );
        })}
      </div>

      {/* Case Analysis Card */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-card space-y-4 text-xs transition-colors">
        <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
          <span className={`text-[11px] font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded ${isFa ? 'font-vazir' : 'font-mono'}`}>
            {isFa ? 'دانش‌آموز مورد بررسی: ' : 'Student: '}{activeCase.studentName}
          </span>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-1.5">
            {promptText}
          </h3>
        </div>

        {/* Comparison: Scratchwork vs Reality */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Wrong Work */}
          <div className="bg-rose-50/60 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 rounded-lg p-4 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-rose-800 dark:text-rose-300">
              <span className="flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{isFa ? 'چرک‌نویس دانش‌آموز در کاربرگ:' : 'Student Scratchwork on Worksheet:'}</span>
              </span>
              <span className="bg-rose-200 dark:bg-rose-900 text-rose-900 dark:text-rose-100 px-1.5 py-0.2 rounded text-[10px]">
                {isFa ? 'نادرست ✗' : 'Incorrect ✗'}
              </span>
            </div>
            <div className="bg-white dark:bg-slate-800 border border-rose-200 dark:border-rose-900 rounded-lg p-3 text-center" dir="ltr">
              <span className={`text-base font-bold text-slate-800 dark:text-slate-100 tracking-normal ${isFa ? 'font-vazir' : 'font-mono'}`}>
                {activeCase.studentWork}
              </span>
            </div>
            <div className="text-xs text-rose-900 dark:text-rose-200 font-medium">
              {isFa ? 'پاسخ دانش‌آموز: ' : 'Reported Answer: '}
              <strong className={`px-1 ${isFa ? 'font-vazir font-bold' : 'font-mono'}`}>{activeCase.studentAnswer}</strong>
            </div>
          </div>

          {/* Correct Target */}
          <div className="bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 rounded-lg p-4 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-emerald-800 dark:text-emerald-300">
              <span className="flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>{isFa ? 'پاسخ صحیح ریاضی:' : 'Correct Mathematical Result:'}</span>
              </span>
              <span className="bg-emerald-200 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-100 px-1.5 py-0.2 rounded text-[10px]">
                {isFa ? 'صحیح ✓' : 'True Result ✓'}
              </span>
            </div>
            <div className="bg-white dark:bg-slate-800 border border-emerald-200 dark:border-emerald-900 rounded-lg p-3 flex items-center justify-center gap-2">
              <span className={`text-xs font-semibold text-emerald-800 dark:text-emerald-300 ${isFa ? 'font-vazir' : 'font-sans'}`}>
                {isFa ? 'حاصل درست:' : 'Correct Result:'}
              </span>
              <span className={`text-base font-extrabold text-emerald-900 dark:text-emerald-200 ${isFa ? 'font-vazir' : 'font-mono'}`}>
                {activeCase.correctAnswer}
              </span>
            </div>
            <div className="text-xs text-emerald-900 dark:text-emerald-200 font-medium">
              {isFa ? 'این اختلاف نشان‌دهنده یک سوءتفاهم مفهومی مهم است.' : 'The discrepancy highlights a specific conceptual bug.'}
            </div>
          </div>
        </div>

        {/* Diagnosis Question */}
        <div className="space-y-3 pt-2">
          <div className="font-bold text-slate-900 dark:text-white text-sm">
            {diagQuestion}
          </div>

          <div className="space-y-2">
            {optionsList.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    sound.playClick();
                    setSelectedOption(idx);
                    setFeedback(null);
                  }}
                  className={`w-full text-start p-3 rounded-lg border transition-all text-xs flex items-start gap-2.5 ${
                    isSelected
                      ? 'border-slate-900 dark:border-white bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium'
                  }`}
                >
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center font-mono text-[10px] font-bold shrink-0 mt-0.5 ${
                    isSelected ? 'bg-white/20 dark:bg-slate-900/20 text-white dark:text-slate-900' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}>
                    {isFa ? toPersianDigits(idx + 1) : String.fromCharCode(65 + idx)}
                  </span>
                  <span className="leading-relaxed">{opt}</span>
                </button>
              );
            })}
          </div>

          <div className="flex justify-end pt-1">
            <button
              onClick={handleDiagnose}
              disabled={selectedOption === null}
              className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90 disabled:opacity-40 font-bold px-6 py-2 rounded-lg transition-colors text-xs"
            >
              {isFa ? 'تأیید تشخیص' : 'Confirm Diagnosis'}
            </button>
          </div>
        </div>

        {/* Feedback Alert */}
        {feedback && (
          <div className={`p-3 rounded-lg border text-xs font-semibold flex items-center gap-2 ${
            feedback.isCorrect 
              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200' 
              : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-200'
          }`}>
            {feedback.isCorrect ? <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" /> : <X className="w-4 h-4 text-rose-600 shrink-0" />}
            <span>{feedback.message}</span>
          </div>
        )}

        {/* Pedagogical Explanation */}
        {feedback?.isCorrect && (
          <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 p-4 rounded-lg text-xs space-y-1.5 animate-fade-in">
            <div className="font-bold text-slate-900 dark:text-white">
              {isFa ? 'تحلیل آموزشی آموزگار:' : 'Instructor Lesson Analysis:'}
            </div>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              {explanationText}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
