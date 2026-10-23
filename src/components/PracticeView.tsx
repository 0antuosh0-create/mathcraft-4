import React, { useState } from 'react';
import { Lesson, Question, Language } from '../types/math';
import { PlaceValueChart } from './visuals/PlaceValueChart';
import { NumberLine } from './visuals/NumberLine';
import { TapeDiagram } from './visuals/TapeDiagram';
import { VerticalRegrouping } from './visuals/VerticalRegrouping';
import { KidFriendlyIllustration, getIllustrationForQuestion } from './visuals/KidFriendlyIllustration';
import { 
  HelpCircle, 
  RefreshCw, 
  CheckCircle, 
  ChevronLeft, 
  ChevronRight, 
  BookOpen,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { formatDisplayNumber, formatDisplayDigits, t } from '../utils/i18n';
import { toEnglishDigits, toPersianDigits } from '../utils/persian';
import { sound } from '../utils/sound';

interface PracticeViewProps {
  lessons: Lesson[];
  initialLessonId?: string;
  onGoToGenerator: (question: Question) => void;
  onCorrectAnswer: () => void;
  onIncorrectAnswer: () => void;
  language?: Language;
}

export const PracticeView: React.FC<PracticeViewProps> = ({
  lessons,
  initialLessonId,
  onGoToGenerator,
  onCorrectAnswer,
  onIncorrectAnswer,
  language = 'en'
}) => {
  const isFa = language === 'fa';
  const [selectedLessonId, setSelectedLessonId] = useState<string>(
    initialLessonId || lessons[0]?.id || ''
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);
  const [showSolution, setShowSolution] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);

  const activeLesson = lessons.find(l => l.id === selectedLessonId) ?? lessons[0];
  const questions = activeLesson?.questions ?? [];
  const currentQuestion = questions[currentQuestionIndex] ?? questions[0];

  const handleLessonChange = (lessonId: string) => {
    setSelectedLessonId(lessonId);
    setCurrentQuestionIndex(0);
    resetQuestionState();
  };

  const resetQuestionState = () => {
    setUserAnswer('');
    setSelectedOption(null);
    setFeedback(null);
    setShowSolution(false);
    setShowHint(false);
  };

  const handleCheckAnswer = () => {
    if (!currentQuestion) return;

    let isCorrect = false;
    const answerToTest = currentQuestion.options ? selectedOption : userAnswer;

    if (!answerToTest) return;

    const cleanUser = toEnglishDigits(String(answerToTest)).trim().toLowerCase().replace(/,/g, '').replace(/٬/g, '');
    const cleanTarget = toEnglishDigits(String(currentQuestion.correctAnswer)).trim().toLowerCase().replace(/,/g, '').replace(/٬/g, '');

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
        message: t('correctFeedback', language)
      });
      setShowSolution(true);
      onCorrectAnswer();
    } else {
      sound.playTryAgain();
      setFeedback({
        isCorrect: false,
        message: t('incorrectFeedback', language)
      });
      onIncorrectAnswer();
    }
  };

  const renderVisualModel = () => {
    if (!currentQuestion?.visualModel) return null;
    const vm = currentQuestion.visualModel;
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

  if (!currentQuestion) return null;

  const promptText = isFa && currentQuestion.promptFa ? currentQuestion.promptFa : currentQuestion.prompt;
  const titleText = isFa && currentQuestion.titleFa ? currentQuestion.titleFa : currentQuestion.title;
  const tipText = isFa && currentQuestion.pedagogicalTipFa ? currentQuestion.pedagogicalTipFa : currentQuestion.pedagogicalTip;
  const explanationText = isFa && currentQuestion.explanationFa ? currentQuestion.explanationFa : currentQuestion.explanation;
  const answerDisplay = isFa && currentQuestion.correctAnswerFa ? currentQuestion.correctAnswerFa : currentQuestion.correctAnswer;
  const optionsList = isFa && currentQuestion.optionsFa ? currentQuestion.optionsFa : currentQuestion.options;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-5 transition-colors">
      {/* Lesson Selector */}
      <div className="flex flex-wrap items-center gap-2 bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800 shadow-card">
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 px-2 flex items-center gap-1">
          <BookOpen className="w-3.5 h-3.5" />
          {isFa ? 'درس:' : 'Lesson:'}
        </span>
        {lessons.map((lesson) => {
          const isSelected = lesson.id === activeLesson?.id;
          return (
            <button
              key={lesson.id}
              onClick={() => {
                sound.playClick();
                handleLessonChange(lesson.id);
              }}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                isSelected
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm font-bold'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {lesson.number}: {isFa && lesson.titleFa ? lesson.titleFa : lesson.title}
            </button>
          );
        })}
      </div>

      {/* Main Question Card */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-card space-y-4 transition-colors">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-mono text-xs font-bold flex items-center justify-center">
              {formatDisplayDigits(currentQuestionIndex + 1, language)}
            </span>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                {titleText}
              </h3>
              <div className={`text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5 ${isFa ? 'font-vazir' : 'font-mono'}`}>
                {isFa ? (
                  <>
                    <span>سوال {formatDisplayDigits(currentQuestionIndex + 1, language)} از {formatDisplayDigits(questions.length, language)}</span>
                    <span className="opacity-40">•</span>
                    <span>درس {formatDisplayDigits(activeLesson.number, language)}</span>
                  </>
                ) : (
                  <span>Item {currentQuestionIndex + 1} of {questions.length} • Lesson {activeLesson.number}</span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className={`text-[11px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded font-bold ${isFa ? 'font-vazir' : 'font-mono'}`}>
              {currentQuestion.difficulty}
            </span>
            <button
              onClick={() => onGoToGenerator(currentQuestion)}
              className="flex items-center gap-1 text-xs text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 px-2.5 py-1 rounded font-semibold hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
              title={isFa ? 'تولید سوال مشابه با اعداد جدید' : 'Generate a similar question with different numbers'}
            >
              <RefreshCw className="w-3 h-3" />
              <span>{t('generateSimilar', language)}</span>
            </button>
          </div>
        </div>

        {/* Kid-Friendly Visual Shape & Illustration Banner */}
        {(() => {
          const ill = getIllustrationForQuestion(currentQuestion.id);
          return ill ? <KidFriendlyIllustration type={ill} language={language} /> : null;
        })()}
        {/* Prompt */}
        <div className="text-base font-semibold text-slate-900 dark:text-white leading-relaxed bg-slate-50/80 dark:bg-slate-800/40 p-4 rounded-lg border border-slate-100 dark:border-slate-800">
          {promptText}
        </div>

        {/* Context Table if exists */}
        {currentQuestion.contextData && (
          <div className="border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden text-xs max-w-md">
            {currentQuestion.contextData.tableTitle && (
              <div className="bg-slate-100 dark:bg-slate-800 px-3 py-1.5 font-bold text-slate-800 dark:text-slate-200 border-b border-slate-200 dark:border-slate-700">
                {isFa && currentQuestion.contextData.tableTitleFa ? currentQuestion.contextData.tableTitleFa : currentQuestion.contextData.tableTitle}
              </div>
            )}
            <table className="w-full text-left">
              {currentQuestion.contextData.headers && (
                <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
                  <tr>
                    {(isFa && currentQuestion.contextData.headersFa ? currentQuestion.contextData.headersFa : currentQuestion.contextData.headers).map((h, i) => (
                      <th key={i} className="px-3 py-1.5 font-semibold">{h}</th>
                    ))}
                  </tr>
                </thead>
              )}
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono text-slate-800 dark:text-slate-200">
                {currentQuestion.contextData.rows?.map((row, rIdx) => (
                  <tr key={rIdx}>
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="px-3 py-1.5">
                        {typeof cell === 'number' ? formatDisplayNumber(cell, language) : cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Visual Model */}
        {renderVisualModel()}

        {/* Input / Choice Area */}
        <div className="space-y-3 pt-1">
          {optionsList ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {optionsList.map((opt, idx) => {
                const isSelected = selectedOption === opt;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      sound.playClick();
                      setSelectedOption(opt);
                      setFeedback(null);
                    }}
                    className={`flex items-center gap-2.5 p-3 rounded-lg border text-start font-semibold text-xs transition-all ${
                      isSelected
                        ? 'border-slate-900 dark:border-white bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span className={`w-5 h-5 rounded font-mono text-[10px] flex items-center justify-center font-bold shrink-0 ${
                      isSelected ? 'bg-white/20 dark:bg-slate-900/20 text-white dark:text-slate-900' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}>
                      {isFa ? toPersianDigits(idx + 1) : String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt}</span>
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
                placeholder={isFa ? 'پاسخ خود را اینجا بنویسید...' : 'Type your answer here...'}
                className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-slate-800 dark:focus:border-slate-300"
              />
              <button
                onClick={handleCheckAnswer}
                disabled={!userAnswer.trim()}
                className="bg-slate-900 dark:bg-white hover:opacity-90 disabled:opacity-40 text-white dark:text-slate-900 text-xs font-bold px-5 py-2.5 rounded-lg transition-all"
              >
                {t('submitAnswer', language)}
              </button>
            </div>
          )}

          {optionsList && (
            <div className="flex justify-end">
              <button
                onClick={handleCheckAnswer}
                disabled={!selectedOption}
                className="bg-slate-900 dark:bg-white hover:opacity-90 disabled:opacity-40 text-white dark:text-slate-900 text-xs font-bold px-5 py-2 rounded-lg transition-all"
              >
                {t('submitAnswer', language)}
              </button>
            </div>
          )}
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

        {/* Navigation & Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowHint(!showHint)}
              className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-semibold flex items-center gap-1"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{showHint ? t('hideHint', language) : t('needAHint', language)}</span>
            </button>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <button
              onClick={() => setShowSolution(!showSolution)}
              className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-semibold"
            >
              {showSolution ? t('hideSolution', language) : t('viewFullSolution', language)}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (currentQuestionIndex > 0) {
                  sound.playClick();
                  setCurrentQuestionIndex(currentQuestionIndex - 1);
                  resetQuestionState();
                }
              }}
              disabled={currentQuestionIndex === 0}
              className="p-1.5 rounded border border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-20"
              title="Previous"
            >
              <ChevronLeft className={`w-4 h-4 ${isFa ? 'rotate-180' : ''}`} />
            </button>
            <span className="font-mono text-slate-500 dark:text-slate-400 text-xs">
              {formatDisplayDigits(currentQuestionIndex + 1, language)} / {formatDisplayDigits(questions.length, language)}
            </span>
            <button
              onClick={() => {
                if (currentQuestionIndex < questions.length - 1) {
                  sound.playClick();
                  setCurrentQuestionIndex(currentQuestionIndex + 1);
                  resetQuestionState();
                }
              }}
              disabled={currentQuestionIndex === questions.length - 1}
              className="p-1.5 rounded border border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-20"
              title="Next"
            >
              <ChevronRight className={`w-4 h-4 ${isFa ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>

        {/* Hint Box */}
        {showHint && (
          <div className="bg-amber-50 dark:bg-amber-950/40 border-l-4 border-amber-500 p-3 rounded text-xs text-amber-950 dark:text-amber-200 font-medium">
            <strong>{isFa ? 'نکته و سرنخ: ' : 'Hint: '}</strong>{tipText}
          </div>
        )}

        {/* Full Solution Box */}
        {showSolution && (
          <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 p-4 rounded-lg space-y-2 text-xs">
            <div className="font-bold text-slate-900 dark:text-white flex items-center justify-between">
              <span>{t('stepByStepSolution', language)}</span>
              <span className="font-mono bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-200 px-2 py-0.5 rounded font-black">
                {t('answerLabel', language)} {answerDisplay}
              </span>
            </div>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              {explanationText}
            </p>
            {currentQuestion.solutionSteps.length > 0 && (
              <ol className="list-decimal list-inside space-y-0.5 text-slate-800 dark:text-slate-200 font-medium pt-1 border-t border-slate-200 dark:border-slate-700">
                {(isFa && currentQuestion.solutionStepsFa ? currentQuestion.solutionStepsFa : currentQuestion.solutionSteps).map((st, i) => (
                  <li key={i}>{st}</li>
                ))}
              </ol>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
