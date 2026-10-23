import React, { useState } from 'react';
import { Lesson, Question, GeneratedQuestion, Language } from '../types/math';
import { generateSimilarQuestion } from '../utils/mathGenerator';
import { PlaceValueChart } from './visuals/PlaceValueChart';
import { NumberLine } from './visuals/NumberLine';
import { TapeDiagram } from './visuals/TapeDiagram';
import { VerticalRegrouping } from './visuals/VerticalRegrouping';
import { KidFriendlyIllustration, getIllustrationForQuestion } from './visuals/KidFriendlyIllustration';
import { 
  RefreshCw, 
  Plus, 
  Sparkles, 
  BookOpen, 
  CheckCircle, 
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { t } from '../utils/i18n';
import { toEnglishDigits } from '../utils/persian';
import { sound } from '../utils/sound';

interface GeneratorViewProps {
  lessons: Lesson[];
  initialQuestion?: Question;
  onAddToWorksheet: (prompt: string, answer: string | number, solutionSteps: string[]) => void;
  language?: Language;
}

export const GeneratorView: React.FC<GeneratorViewProps> = ({
  lessons,
  initialQuestion,
  onAddToWorksheet,
  language = 'en'
}) => {
  const isFa = language === 'fa';
  const allQuestions = lessons.flatMap(l => l.questions);
  const [selectedQuestionId, setSelectedQuestionId] = useState<string>(
    initialQuestion?.id ?? allQuestions[0]?.id ?? ''
  );

  const activeQuestion = allQuestions.find(q => q.id === selectedQuestionId) ?? allQuestions[0];

  const [generated, setGenerated] = useState<GeneratedQuestion>(() => {
    return activeQuestion ? generateSimilarQuestion(activeQuestion, language) : {} as GeneratedQuestion;
  });

  React.useEffect(() => {
    if (activeQuestion) {
      setGenerated(generateSimilarQuestion(activeQuestion, language));
      setUserAnswer('');
      setSelectedOption(null);
      setFeedback(null);
      setShowSolution(false);
    }
  }, [language, selectedQuestionId]);

  const [userAnswer, setUserAnswer] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);
  const [showSolution, setShowSolution] = useState<boolean>(false);
  const [addedToast, setAddedToast] = useState<boolean>(false);

  const handleSelectQuestion = (qId: string) => {
    setSelectedQuestionId(qId);
    const q = allQuestions.find(x => x.id === qId);
    if (q) {
      const newGen = generateSimilarQuestion(q, language);
      setGenerated(newGen);
      setUserAnswer('');
      setSelectedOption(null);
      setFeedback(null);
      setShowSolution(false);
    }
  };

  const handleRegenerate = () => {
    if (!activeQuestion) return;
    sound.playClick();
    const newGen = generateSimilarQuestion(activeQuestion, language);
    setGenerated(newGen);
    setUserAnswer('');
    setSelectedOption(null);
    setFeedback(null);
    setShowSolution(false);
  };

  const handleCheckAnswer = () => {
    let isCorrect = false;
    const answerToTest = generated.options ? selectedOption : userAnswer;

    if (!answerToTest) return;

    const cleanUser = toEnglishDigits(String(answerToTest)).trim().toLowerCase().replace(/,/g, '');
    const cleanTarget = toEnglishDigits(String(generated.correctAnswer)).trim().toLowerCase().replace(/,/g, '');

    if (cleanUser === cleanTarget) {
      isCorrect = true;
    } else if (cleanTarget.includes(cleanUser) && cleanUser.length >= 2) {
      isCorrect = true;
    }

    if (isCorrect) {
      sound.playCorrect();
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 }
      });
      setFeedback({
        isCorrect: true,
        message: isFa ? 'عالی بود! با اعداد جدید هم مسأله را با موفقیت حل کردی.' : 'Great job! You demonstrated genuine understanding with brand-new numbers!'
      });
      setShowSolution(true);
    } else {
      sound.playTryAgain();
      setFeedback({
        isCorrect: false,
        message: isFa ? 'پاسخ درست نیست. دوباره امتحان کن یا راه‌حل را ببین.' : 'Incorrect. Try again or inspect the solution below.'
      });
    }
  };

  const handleAddCurrentToWorksheet = () => {
    sound.playClick();
    onAddToWorksheet(
      generated.prompt,
      generated.correctAnswer,
      generated.solutionSteps
    );
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2000);
  };

  const renderVisualModel = () => {
    if (!generated?.visualModel) return null;
    const vm = generated.visualModel;
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

  if (!activeQuestion) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6 transition-colors">
      {/* Question Selector */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-card flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-slate-700 dark:text-slate-300" />
          <span className="font-bold text-slate-800 dark:text-slate-200">
            {isFa ? 'انتخاب قالب مسأله:' : 'Select problem template:'}
          </span>
        </div>
        <select
          value={selectedQuestionId}
          onChange={(e) => handleSelectQuestion(e.target.value)}
          className="bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-semibold rounded-lg px-3 py-1.5 focus:outline-none w-full sm:w-auto"
        >
          {allQuestions.map((q) => (
            <option key={q.id} value={q.id}>
              {isFa && q.titleFa ? q.titleFa : q.title} ({q.difficulty})
            </option>
          ))}
        </select>
      </div>

      {/* Side-by-side comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Original */}
        <div className="bg-slate-50/80 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800 p-5 space-y-3 text-xs">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2.5">
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded">
              {isFa ? 'سوال اصلی کتاب کار' : 'Original Workbook Problem'}
            </span>
            <span className="text-slate-400 font-mono text-[11px]">{activeQuestion.difficulty}</span>
          </div>

          <h3 className="font-bold text-slate-900 dark:text-white text-sm">
            {isFa && activeQuestion.titleFa ? activeQuestion.titleFa : activeQuestion.title}
          </h3>

          <div className="bg-white dark:bg-slate-800/80 p-3.5 rounded border border-slate-200 dark:border-slate-700 font-medium text-slate-800 dark:text-slate-200 leading-relaxed">
            {isFa && activeQuestion.promptFa ? activeQuestion.promptFa : activeQuestion.prompt}
          </div>

          <div className="text-[11px] text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800/80 p-2.5 rounded border border-slate-200 dark:border-slate-700">
            <strong>{isFa ? 'مهارت هدف: ' : 'Target Skill: '}</strong>
            {isFa && activeQuestion.pedagogicalTipFa ? activeQuestion.pedagogicalTipFa : activeQuestion.pedagogicalTip}
          </div>

          <div className="flex items-center justify-between pt-1 font-mono text-[11px]">
            <span className="text-slate-500 dark:text-slate-400 font-sans font-semibold">
              {isFa ? 'پاسخ کتاب:' : 'Workbook Answer:'}
            </span>
            <span className="font-bold text-slate-800 dark:text-slate-200 bg-slate-200/80 dark:bg-slate-800 px-2 py-0.5 rounded">
              {isFa && activeQuestion.correctAnswerFa ? activeQuestion.correctAnswerFa : activeQuestion.correctAnswer}
            </span>
          </div>
        </div>

        {/* Kid-Friendly Visual Shape & Illustration Banner */}
        {(() => {
          const ill = getIllustrationForQuestion(activeQuestion.id);
          return ill ? <div className="lg:col-span-2"><KidFriendlyIllustration type={ill} language={language} /></div> : null;
        })()}
        {/* Generated Version */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-900 dark:border-slate-600 p-5 shadow-card space-y-4 text-xs relative transition-colors">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 px-2 py-0.5 rounded flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>{isFa ? 'مسأله هم‌ریخت با اعداد تازه' : 'Isomorphic Problem (New Numbers)'}</span>
            </span>

            <button
              onClick={handleRegenerate}
              className="flex items-center gap-1 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold px-2.5 py-1 rounded text-[11px] transition-colors"
            >
              <RefreshCw className="w-3 h-3" />
              <span>{t('rollNewNumbers', language)}</span>
            </button>
          </div>

          {/* Generated Prompt */}
          <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded border border-slate-200 dark:border-slate-700 font-semibold text-slate-900 dark:text-white leading-relaxed text-sm">
            {generated.prompt}
          </div>

          {/* Visual Model */}
          {renderVisualModel()}

          {/* Input */}
          <div className="space-y-2 pt-1">
            {generated.options ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {generated.options.map((opt, idx) => {
                  const isSelected = selectedOption === opt;
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        sound.playClick();
                        setSelectedOption(opt);
                        setFeedback(null);
                      }}
                      className={`p-2.5 rounded border text-start font-semibold text-xs transition-all ${
                        isSelected
                          ? 'border-slate-900 dark:border-white bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                          : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => {
                    setUserAnswer(e.target.value);
                    setFeedback(null);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleCheckAnswer();
                  }}
                  placeholder={isFa ? 'پاسخ عددی...' : 'Enter numeric answer...'}
                  className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded px-3 py-1.5 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none"
                />
                <button
                  onClick={handleCheckAnswer}
                  className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold px-4 py-1.5 rounded transition-colors"
                >
                  {isFa ? 'بررسی' : 'Verify'}
                </button>
              </div>
            )}

            {generated.options && (
              <button
                onClick={handleCheckAnswer}
                className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold py-1.5 rounded transition-colors"
              >
                {t('submitAnswer', language)}
              </button>
            )}
          </div>

          {/* Feedback */}
          {feedback && (
            <div className={`p-2.5 rounded border text-xs font-semibold flex items-center gap-2 ${
              feedback.isCorrect ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 text-emerald-900 dark:text-emerald-200' : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 text-rose-900 dark:text-rose-200'
            }`}>
              {feedback.isCorrect ? <CheckCircle className="w-4 h-4 text-emerald-600" /> : <X className="w-4 h-4 text-rose-600" />}
              <span>{feedback.message}</span>
            </div>
          )}

          {/* Controls */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
            <button
              onClick={() => setShowSolution(!showSolution)}
              className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-semibold"
            >
              {showSolution ? t('hideSolution', language) : t('viewFullSolution', language)}
            </button>

            <button
              onClick={handleAddCurrentToWorksheet}
              className="flex items-center gap-1 text-xs text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 px-2.5 py-1 rounded font-semibold transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{t('addToWorksheet', language)}</span>
            </button>
          </div>

          {addedToast && (
            <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold px-3 py-1 rounded shadow">
              {t('addedToast', language)}
            </div>
          )}

          {/* Solution */}
          {showSolution && (
            <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 p-3.5 rounded text-xs space-y-2">
              <div className="font-bold text-slate-900 dark:text-white flex justify-between">
                <span>{t('stepByStepSolution', language)}</span>
                <span className="font-mono text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950 px-1.5 py-0.5 rounded font-black">
                  {generated.correctAnswer}
                </span>
              </div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                {generated.explanation}
              </p>
              <ol className="list-decimal list-inside space-y-0.5 text-slate-800 dark:text-slate-200 font-medium pt-1">
                {generated.solutionSteps.map((st, i) => (
                  <li key={i}>{st}</li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
