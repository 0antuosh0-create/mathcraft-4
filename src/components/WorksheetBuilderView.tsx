import React, { useState } from 'react';
import { Worksheet, WorksheetItem, Lesson, Question, PaperLayout, PaperGrid, PaperFont, PaperCrest, PaperMascot, Language } from '../types/math';
import { PRESET_WORKSHEETS, PRESET_WORKSHEETS_FA } from '../data/presetWorksheets';
import { WorksheetPrintLayout } from './WorksheetPrintLayout';
import { generateSimilarQuestion } from '../utils/mathGenerator';
import { t, formatDisplayDigits, getTodayDateFormatted } from '../utils/i18n';
import { 
  Printer, 
  Plus, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  Download, 
  Sparkles, 
  Settings, 
  Eye, 
  Edit3, 
  Bookmark, 
  Award, 
  Layers, 
  Layout, 
  Sliders, 
  Type, 
  ListChecks, 
  CheckSquare, 
  Square, 
  Check 
} from 'lucide-react';
import { sound } from '../utils/sound';

interface WorksheetBuilderViewProps {
  lessons: Lesson[];
  customWorksheet: Worksheet;
  onUpdateWorksheet: (ws: Worksheet) => void;
  language?: Language;
}

export const WorksheetBuilderView: React.FC<WorksheetBuilderViewProps> = ({
  lessons,
  customWorksheet,
  onUpdateWorksheet,
  language = 'en'
}) => {
  const isFa = language === 'fa';
  const [activeTab, setActiveTab] = useState<'preview' | 'editor'>('preview');
  const [showAddCustomModal, setShowAddCustomModal] = useState<boolean>(false);
  const [showAddFromBankModal, setShowAddFromBankModal] = useState<boolean>(false);
  const [bankTopicFilter, setBankTopicFilter] = useState<string>('all');
  const [showQuizBuilderModal, setShowQuizBuilderModal] = useState<boolean>(false);
  const [selectedQuizQuestionIds, setSelectedQuizQuestionIds] = useState<string[]>([]);
  const [customQuizTitle, setCustomQuizTitle] = useState<string>('');
  const [mobileStudioView, setMobileStudioView] = useState<'paper' | 'settings'>('paper');
  // Custom question modal form state
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [customAnswer, setCustomAnswer] = useState<string>('');
  const [customSolution, setCustomSolution] = useState<string>('');
  const [customScore, setCustomScore] = useState<number>(4);
  const [customLines, setCustomLines] = useState<number>(4);

  const presetsList = isFa ? PRESET_WORKSHEETS_FA : PRESET_WORKSHEETS;

  const handleLoadPreset = (presetId: string) => {
    sound.playClick();
    const found = presetsList.find(p => p.id === presetId) || PRESET_WORKSHEETS.find(p => p.id === presetId);
    if (found) {
      onUpdateWorksheet({
        ...found,
        id: `ws_${Date.now()}`,
        dateStr: getTodayDateFormatted(language),
        createdDate: new Date().toISOString()
      });
    }
  };

  const handlePrint = () => {
    sound.playFanfare();
    window.print();
  };

  const handleMoveItem = (index: number, direction: 'up' | 'down') => {
    sound.playClick();
    const newItems = [...customWorksheet.items];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newItems.length) return;

    const temp = newItems[index];
    const target = newItems[targetIndex];
    if (temp && target) {
      newItems[index] = target;
      newItems[targetIndex] = temp;
      onUpdateWorksheet({ ...customWorksheet, items: newItems });
    }
  };

  const handleDeleteItem = (id: string) => {
    sound.playClick();
    const newItems = customWorksheet.items.filter(it => it.id !== id);
    const newTotal = newItems.reduce((acc, c) => acc + c.score, 0);
    onUpdateWorksheet({ ...customWorksheet, items: newItems, totalScore: newTotal });
  };

  const handleAddCustomQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customPrompt.trim()) return;

    const newItem: WorksheetItem = {
      id: `custom_${Date.now()}`,
      sourceType: 'custom',
      prompt: customPrompt,
      answer: customAnswer,
      solutionSteps: customSolution ? customSolution.split('\n').filter(Boolean) : [],
      score: customScore,
      allocatedSpaceLines: customLines
    };

    const newItems = [...customWorksheet.items, newItem];
    const newTotal = newItems.reduce((acc, c) => acc + c.score, 0);
    onUpdateWorksheet({ ...customWorksheet, items: newItems, totalScore: newTotal });

    setCustomPrompt('');
    setCustomAnswer('');
    setCustomSolution('');
    setShowAddCustomModal(false);
    sound.playCorrect();
  };

  const handleAddFromQuestionBank = (questionId: string) => {
    sound.playClick();
    const allQuestions = lessons.flatMap(l => l.questions);
    const q = allQuestions.find(x => x.id === questionId);
    if (!q) return;

    const newItem: WorksheetItem = {
      id: `bank_${Date.now()}_${q.id}`,
      sourceType: 'original',
      questionId: q.id,
      prompt: isFa && q.promptFa ? q.promptFa : q.prompt,
      contextData: q.contextData,
      answer: isFa && q.correctAnswerFa ? q.correctAnswerFa : q.correctAnswer,
      solutionSteps: isFa && q.solutionStepsFa ? q.solutionStepsFa : q.solutionSteps,
      score: 4,
      allocatedSpaceLines: 4
    };

    const newItems = [...customWorksheet.items, newItem];
    const newTotal = newItems.reduce((acc, c) => acc + c.score, 0);
    onUpdateWorksheet({ ...customWorksheet, items: newItems, totalScore: newTotal });
    setShowAddFromBankModal(false);
  };

  const handleAddRandomGeneratedQuestions = (count: number = 2) => {
    sound.playClick();
    const allQuestions = lessons.flatMap(l => l.questions);
    const newItems = [...customWorksheet.items];

    for (let i = 0; i < count; i++) {
      const randomQ = allQuestions[Math.floor(Math.random() * allQuestions.length)];
      if (randomQ) {
        const gen = generateSimilarQuestion(randomQ);
        newItems.push({
          id: `gen_${Date.now()}_${i}`,
          sourceType: 'generated',
          prompt: gen.prompt,
          contextData: gen.contextData,
          answer: gen.correctAnswer,
          solutionSteps: gen.solutionSteps,
          score: 4,
          allocatedSpaceLines: 4
        });
      }
    }

    const newTotal = newItems.reduce((acc, c) => acc + c.score, 0);
    onUpdateWorksheet({ ...customWorksheet, items: newItems, totalScore: newTotal });
  };

  const handleToggleQuizQuestion = (qId: string) => {
    sound.playClick();
    setSelectedQuizQuestionIds(prev => 
      prev.includes(qId) ? prev.filter(id => id !== qId) : [...prev, qId]
    );
  };

  const handleSelectAllInUnit = (unitId: string) => {
    sound.playClick();
    const unitQIds = lessons.filter(l => l.unitId === unitId).flatMap(l => l.questions.map(q => q.id));
    setSelectedQuizQuestionIds(prev => Array.from(new Set([...prev, ...unitQIds])));
  };

  const handleDeselectAllInUnit = (unitId: string) => {
    sound.playClick();
    const unitQIds = new Set(lessons.filter(l => l.unitId === unitId).flatMap(l => l.questions.map(q => q.id)));
    setSelectedQuizQuestionIds(prev => prev.filter(id => !unitQIds.has(id)));
  };

  const handleQuickSelectOnePerUnit = () => {
    sound.playClick();
    const selected: string[] = [];
    const unitIds = ['unit_1', 'unit_2', 'unit_3'];
    unitIds.forEach(uId => {
      const q = lessons.filter(l => l.unitId === uId).flatMap(l => l.questions)[0];
      if (q) selected.push(q.id);
    });
    setSelectedQuizQuestionIds(selected);
  };

  const handleQuickSelectTwoPerUnit = () => {
    sound.playClick();
    const selected: string[] = [];
    const unitIds = ['unit_1', 'unit_2', 'unit_3'];
    unitIds.forEach(uId => {
      const qs = lessons.filter(l => l.unitId === uId).flatMap(l => l.questions);
      if (qs[0]) selected.push(qs[0].id);
      if (qs[1]) selected.push(qs[1].id);
    });
    setSelectedQuizQuestionIds(selected);
  };

  const handleGenerateQuizWorksheet = () => {
    if (selectedQuizQuestionIds.length === 0) return;
    sound.playFanfare();

    const allQuestionsMap = new Map<string, Question>();
    lessons.forEach(l => {
      l.questions.forEach(q => allQuestionsMap.set(q.id, q));
    });

    const items: WorksheetItem[] = selectedQuizQuestionIds.map((qId, idx) => {
      const q = allQuestionsMap.get(qId);
      return {
        id: `quiz_${Date.now()}_${idx}`,
        sourceType: 'original' as const,
        questionId: qId,
        prompt: q?.prompt ?? '',
        contextData: q?.contextData,
        answer: q?.correctAnswer ?? '',
        solutionSteps: q?.solutionSteps ?? [],
        score: 4,
        allocatedSpaceLines: 4
      };
    });

    const total = items.reduce((acc, c) => acc + c.score, 0);

    onUpdateWorksheet({
      ...customWorksheet,
      title: customQuizTitle.trim() || (isFa ? 'کوییز جامع و تلفیقی ریاضی چهارم' : 'Grade 4 Comprehensive Math Quiz'),
      totalScore: total,
      items,
      dateStr: getTodayDateFormatted(language)
    });

    setShowQuizBuilderModal(false);
    setActiveTab('preview');
  };

  const handleSaveToLocalStorage = () => {
    sound.playCorrect();
    try {
      localStorage.setItem('mathcraft_worksheet', JSON.stringify(customWorksheet));
      alert(isFa ? 'کاربرگ با موفقیت در مرورگر ذخیره شد.' : 'Worksheet saved to browser storage.');
    } catch {
      alert(isFa ? 'خطا در ذخیره‌سازی' : 'Failed to save worksheet.');
    }
  };

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(customWorksheet, null, 2));
    const dl = document.createElement('a');
    dl.setAttribute('href', dataStr);
    dl.setAttribute('download', `${customWorksheet.title.replace(/\s+/g, '_')}.json`);
    document.body.appendChild(dl);
    dl.click();
    dl.remove();
  };

  const filteredQuestions = lessons
    .filter(l => bankTopicFilter === 'all' || l.unitId === bankTopicFilter)
    .flatMap(l => l.questions.map(q => ({ ...q, lessonNumber: l.number })));

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 space-y-4">
      {/* Studio Top Control Strip */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-2.5 sm:p-3 shadow-card flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 text-xs print-hide transition-colors w-full max-w-full">
        {/* Row 1 on mobile: View Switcher & Presets */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 flex-1 min-w-0">
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg shrink-0">
            <button
              onClick={() => setActiveTab('preview')}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold transition-all ${
                activeTab === 'preview'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{t('interactiveSheet', language)}</span>
            </button>
            <button
              onClick={() => setActiveTab('editor')}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold transition-all ${
                activeTab === 'editor'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>{t('configureItems', language)}</span>
            </button>
          </div>

          <div className="flex items-center gap-1.5 flex-1 min-w-0">
            <span className="font-semibold text-slate-500 dark:text-slate-400 text-[11px] shrink-0">
              {isFa ? 'نمونه:' : 'Presets:'}
            </span>
            <select
              onChange={(e) => handleLoadPreset(e.target.value)}
              defaultValue=""
              className="bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-medium rounded-lg px-2 py-1.5 focus:outline-none cursor-pointer w-full min-w-0 truncate"
            >
              <option value="" disabled>{isFa ? 'انتخاب کاربرگ...' : 'Load preset...'}</option>
              {presetsList.map((pw) => (
                <option key={pw.id} value={pw.id}>{pw.title}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 2 on mobile: Actions */}
        <div className="flex items-center gap-1.5 justify-between sm:justify-end">
          <button
            onClick={() => {
              sound.playClick();
              setShowQuizBuilderModal(true);
            }}
            className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-all flex items-center justify-center gap-1.5 shadow-sm"
          >
            <ListChecks className="w-3.5 h-3.5" />
            <span>{isFa ? 'ساخت کوییز' : 'Build Quiz'}</span>
          </button>

          <button
            onClick={handleSaveToLocalStorage}
            title={isFa ? 'ذخیره در مرورگر' : 'Save'}
            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            <Bookmark className="w-4 h-4" />
          </button>
          <button
            onClick={handleExportJson}
            title="JSON"
            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            <Download className="w-4 h-4" />
          </button>

          <button
            onClick={handlePrint}
            className="flex-1 sm:flex-none bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold px-3.5 py-1.5 rounded-lg transition-all flex items-center justify-center gap-1.5 shadow-sm"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>{t('printSavePdf', language)}</span>
          </button>
        </div>
      </div>

      {/* Mobile Studio View Switcher (Only visible on mobile screens) */}
      <div className="lg:hidden flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-700 mb-3">
        <button
          onClick={() => setMobileStudioView('paper')}
          className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
            mobileStudioView === 'paper'
              ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm font-black'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>{isFa ? 'مشاهده برگه' : 'Paper Sheet'}</span>
        </button>
        <button
          onClick={() => setMobileStudioView('settings')}
          className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
            mobileStudioView === 'settings'
              ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm font-black'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <Settings className="w-3.5 h-3.5" />
          <span>{isFa ? 'تنظیمات و ابزارها' : 'Settings & Tools'}</span>
        </button>
      </div>

      {/* INTERACTIVE SHEET VIEW */}
      {activeTab === 'preview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 print-hide">
          {/* Studio Left Sidebar (Paper Properties) */}
          <div className={`lg:col-span-4 space-y-4 ${mobileStudioView === 'settings' ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-card space-y-3.5 text-xs transition-colors">
              <div className="font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Layout className="w-4 h-4 text-slate-700 dark:text-slate-300" />
                  <span>{t('paperProperties', language)}</span>
                </span>
                <span className={`text-[10px] text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full font-bold ${isFa ? 'font-vazir' : 'font-mono'}`}>
                  {isFa ? 'استودیو چاپ A4' : 'A4 Studio'}
                </span>
              </div>

              {/* Template Header Style */}
              <div>
                <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">
                  {t('headerStyle', language)}
                </label>
                <select
                  value={customWorksheet.layout}
                  onChange={(e) => onUpdateWorksheet({ ...customWorksheet, layout: e.target.value as PaperLayout })}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded p-1.5 text-xs font-semibold text-slate-800 dark:text-slate-200"
                >
                  <option value="playful_adventure">{isFa ? 'ماجراجویی شاداب کودکانه (Playful Adventure)' : 'Playful Adventure (Kids)'}</option>
                  <option value="standard_test">{t('standardTest', language)}</option>
                  <option value="practice_sheet">{t('practiceSheet', language)}</option>
                  <option value="homework">{t('homeworkSheet', language)}</option>
                  <option value="speed_drill">{t('speedDrill', language)}</option>
                </select>
              </div>

              {/* Workspace Grid Pattern */}
              <div>
                <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">
                  {t('workspaceTexture', language)}
                </label>
                <select
                  value={customWorksheet.paperGrid}
                  onChange={(e) => onUpdateWorksheet({ ...customWorksheet, paperGrid: e.target.value as PaperGrid })}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded p-1.5 text-xs font-semibold text-slate-800 dark:text-slate-200"
                >
                  <option value="grid">{t('mathGraphPaper', language)}</option>
                  <option value="lined">{t('ruledLines', language)}</option>
                  <option value="dots">{t('dotMatrix', language)}</option>
                  <option value="blank">{t('cleanBlank', language)}</option>
                </select>
              </div>

              {/* Typography / Font Choice */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">
                    {isFa ? 'قلم چاپ:' : 'Print Font:'}
                  </label>
                  <select
                    value={customWorksheet.paperFont}
                    onChange={(e) => onUpdateWorksheet({ ...customWorksheet, paperFont: e.target.value as PaperFont })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded p-1.5 text-xs font-semibold text-slate-800 dark:text-slate-200"
                  >
                    <option value="sans">{isFa ? 'استاندارد (بدون سریف)' : 'Modern Sans'}</option>
                    <option value="serif">{isFa ? 'رسمی (سریف)' : 'Classic Serif'}</option>
                    <option value="mono">{isFa ? 'فنی (مونو)' : 'Technical Mono'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">
                    {isFa ? 'نشان سربرگ:' : 'Header Crest:'}
                  </label>
                  <select
                    value={customWorksheet.crest}
                    onChange={(e) => onUpdateWorksheet({ ...customWorksheet, crest: e.target.value as PaperCrest })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded p-1.5 text-xs font-semibold text-slate-800 dark:text-slate-200"
                  >
                    <option value="crest">{isFa ? 'مهر رسمی آموزشگاه' : 'School Seal'}</option>
                    <option value="math">{isFa ? 'پرگار و ابزار ریاضی' : 'Compass & Math'}</option>
                    <option value="star">{isFa ? 'ستاره افتخار' : 'Excellence Star'}</option>
                    <option value="none">{isFa ? 'بدون نشان' : 'None'}</option>
                  </select>
                </div>
              </div>

              {/* Mascot Stamp Selector (4th-Grade Friendly) */}
              <div>
                <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">
                  {isFa ? 'نشان تشویقی کودکانه (شخصیت خندان):' : 'Fun 4th-Grade Mascot Stamp:'}
                </label>
                <select
                  value={customWorksheet.mascot ?? 'fox'}
                  onChange={(e) => onUpdateWorksheet({ ...customWorksheet, mascot: e.target.value as PaperMascot })}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded p-1.5 text-xs font-semibold text-slate-800 dark:text-slate-200"
                >
                  <option value="fox">{isFa ? 'نشان زرین تلاش و مهارت (Excellence Seal)' : 'Excellence Honor Seal'}</option>
                  <option value="rocket">{isFa ? 'نشان کشف و پیشرفت ۱۰۰٪ (100% Mastery)' : '100% Mastery Launch Seal'}</option>
                  <option value="owl">{isFa ? 'نشان هندسه و تفکر عمیق (STEM Math)' : 'STEM Geometry & Math Seal'}</option>
                  <option value="pencil">{isFa ? 'ستاره درخشان محاسبات (Superstar)' : 'Superstar Calculation Seal'}</option>
                  <option value="none">{isFa ? 'بدون نشان افتخار' : 'None'}</option>
                </select>
              </div>

              {/* Watermark Input */}
              <div>
                <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">
                  {isFa ? 'واترمارک پس‌زمینه (اختیاری):' : 'Background Watermark (Optional):'}
                </label>
                <input
                  type="text"
                  value={customWorksheet.watermarkText ?? ''}
                  onChange={(e) => onUpdateWorksheet({ ...customWorksheet, watermarkText: e.target.value })}
                  placeholder={isFa ? 'مثال: پیش‌نویس، نمونه تمرین' : 'e.g. OFFICIAL EXAM, SAMPLE'}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded px-2.5 py-1 text-xs font-medium text-slate-800 dark:text-slate-200"
                />
              </div>
              {/* Modular Visibility Controls (Show/Hide Any Part) */}
              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="font-bold text-slate-800 dark:text-slate-200 text-[11px] mb-1 flex items-center justify-between">
                  <span>{isFa ? 'نمایش یا حذف بخش‌های برگه:' : 'Show / Remove Sheet Elements:'}</span>
                </div>

                <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                  <label className="flex items-center gap-1.5 cursor-pointer text-slate-700 dark:text-slate-300">
                    <input
                      type="checkbox"
                      checked={customWorksheet.visibility?.showSchoolName ?? true}
                      onChange={() => {
                        onUpdateWorksheet({
                          ...customWorksheet,
                          visibility: {
                            ...customWorksheet.visibility,
                            showSchoolName: !(customWorksheet.visibility?.showSchoolName ?? true)
                          }
                        });
                      }}
                      className="rounded text-blue-600"
                    />
                    <span>{isFa ? 'نام مدرسه' : 'School Name'}</span>
                  </label>

                  <label className="flex items-center gap-1.5 cursor-pointer text-slate-700 dark:text-slate-300">
                    <input
                      type="checkbox"
                      checked={customWorksheet.visibility?.showTitle ?? true}
                      onChange={() => {
                        onUpdateWorksheet({
                          ...customWorksheet,
                          visibility: {
                            ...customWorksheet.visibility,
                            showTitle: !(customWorksheet.visibility?.showTitle ?? true)
                          }
                        });
                      }}
                      className="rounded text-blue-600"
                    />
                    <span>{isFa ? 'عنوان آزمون' : 'Title'}</span>
                  </label>

                  <label className="flex items-center gap-1.5 cursor-pointer text-slate-700 dark:text-slate-300">
                    <input
                      type="checkbox"
                      checked={customWorksheet.visibility?.showNameField ?? true}
                      onChange={() => {
                        onUpdateWorksheet({
                          ...customWorksheet,
                          visibility: {
                            ...customWorksheet.visibility,
                            showNameField: !(customWorksheet.visibility?.showNameField ?? true)
                          }
                        });
                      }}
                      className="rounded text-blue-600"
                    />
                    <span>{isFa ? 'نام دانش‌آموز' : 'Student Name'}</span>
                  </label>

                  <label className="flex items-center gap-1.5 cursor-pointer text-slate-700 dark:text-slate-300">
                    <input
                      type="checkbox"
                      checked={customWorksheet.visibility?.showDateField ?? true}
                      onChange={() => {
                        onUpdateWorksheet({
                          ...customWorksheet,
                          visibility: {
                            ...customWorksheet.visibility,
                            showDateField: !(customWorksheet.visibility?.showDateField ?? true)
                          }
                        });
                      }}
                      className="rounded text-blue-600"
                    />
                    <span>{isFa ? 'تاریخ آزمون' : 'Date'}</span>
                  </label>

                  <label className="flex items-center gap-1.5 cursor-pointer text-slate-700 dark:text-slate-300">
                    <input
                      type="checkbox"
                      checked={customWorksheet.visibility?.showPeriodField ?? true}
                      onChange={() => {
                        onUpdateWorksheet({
                          ...customWorksheet,
                          visibility: {
                            ...customWorksheet.visibility,
                            showPeriodField: !(customWorksheet.visibility?.showPeriodField ?? true)
                          }
                        });
                      }}
                      className="rounded text-blue-600"
                    />
                    <span>{isFa ? 'کلاس / نوبت' : 'Period / Seat'}</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer text-slate-700 dark:text-slate-300">
                    <input
                      type="checkbox"
                      checked={customWorksheet.visibility?.showScoreBox ?? true}
                      onChange={() => {
                        onUpdateWorksheet({
                          ...customWorksheet,
                          visibility: {
                            ...customWorksheet.visibility,
                            showScoreBox: !(customWorksheet.visibility?.showScoreBox ?? true)
                          }
                        });
                      }}
                      className="rounded text-blue-600"
                    />
                    <span>{isFa ? 'کادر نمره' : 'Score Box'}</span>
                  </label>

                  <label className="flex items-center gap-1.5 cursor-pointer text-slate-700 dark:text-slate-300">
                    <input
                      type="checkbox"
                      checked={customWorksheet.visibility?.showDirections ?? true}
                      onChange={() => {
                        onUpdateWorksheet({
                          ...customWorksheet,
                          visibility: {
                            ...customWorksheet.visibility,
                            showDirections: !(customWorksheet.visibility?.showDirections ?? true)
                          }
                        });
                      }}
                      className="rounded text-blue-600"
                    />
                    <span>{isFa ? 'راهنمای دانش‌آموز' : 'Directions'}</span>
                  </label>

                  <label className="flex items-center gap-1.5 cursor-pointer text-slate-700 dark:text-slate-300">
                    <input
                      type="checkbox"
                      checked={customWorksheet.visibility?.showMascot ?? true}
                      onChange={() => {
                        onUpdateWorksheet({
                          ...customWorksheet,
                          visibility: {
                            ...customWorksheet.visibility,
                            showMascot: !(customWorksheet.visibility?.showMascot ?? true)
                          }
                        });
                      }}
                      className="rounded text-blue-600"
                    />
                    <span>{isFa ? 'نشان خندان' : 'Mascot Stamp'}</span>
                  </label>

                  <label className="flex items-center gap-1.5 cursor-pointer text-slate-700 dark:text-slate-300">
                    <input
                      type="checkbox"
                      checked={customWorksheet.visibility?.showAnswerBoxes ?? true}
                      onChange={() => {
                        onUpdateWorksheet({
                          ...customWorksheet,
                          visibility: {
                            ...customWorksheet.visibility,
                            showAnswerBoxes: !(customWorksheet.visibility?.showAnswerBoxes ?? true)
                          }
                        });
                      }}
                      className="rounded text-blue-600"
                    />
                    <span>{isFa ? 'کادر پاسخ' : 'Answer Box'}</span>
                  </label>

                  <label className="flex items-center gap-1.5 cursor-pointer text-slate-700 dark:text-slate-300">
                    <input
                      type="checkbox"
                      checked={customWorksheet.visibility?.showTeacherNote ?? true}
                      onChange={() => {
                        onUpdateWorksheet({
                          ...customWorksheet,
                          visibility: {
                            ...customWorksheet.visibility,
                            showTeacherNote: !(customWorksheet.visibility?.showTeacherNote ?? true)
                          }
                        });
                      }}
                      className="rounded text-blue-600"
                    />
                    <span>{isFa ? 'یادداشت آموزگار' : 'Teacher Note'}</span>
                  </label>

                  <label className="flex items-center gap-1.5 cursor-pointer text-slate-700 dark:text-slate-300">
                    <input
                      type="checkbox"
                      checked={customWorksheet.visibility?.showQuestionIcons ?? true}
                      onChange={() => {
                        onUpdateWorksheet({
                          ...customWorksheet,
                          visibility: {
                            ...customWorksheet.visibility,
                            showQuestionIcons: !(customWorksheet.visibility?.showQuestionIcons ?? true)
                          }
                        });
                      }}
                      className="rounded text-blue-600"
                    />
                    <span>{isFa ? 'تصویر کارتونی سوالات' : 'Question Icons'}</span>
                  </label>

                  <label className="flex items-center gap-1.5 cursor-pointer text-slate-700 dark:text-slate-300">
                    <input
                      type="checkbox"
                      checked={customWorksheet.visibility?.showSmileyRating ?? true}
                      onChange={() => {
                        onUpdateWorksheet({
                          ...customWorksheet,
                          visibility: {
                            ...customWorksheet.visibility,
                            showSmileyRating: !(customWorksheet.visibility?.showSmileyRating ?? true)
                          }
                        });
                      }}
                      className="rounded text-blue-600"
                    />
                    <span>{isFa ? 'سنجش حس خندان' : 'Smiley Self-Rating'}</span>
                  </label>

                  <label className="flex items-center gap-1.5 cursor-pointer text-slate-700 dark:text-slate-300">
                    <input
                      type="checkbox"
                      checked={customWorksheet.visibility?.showDoodleBorder ?? true}
                      onChange={() => {
                        onUpdateWorksheet({
                          ...customWorksheet,
                          visibility: {
                            ...customWorksheet.visibility,
                            showDoodleBorder: !(customWorksheet.visibility?.showDoodleBorder ?? true)
                          }
                        });
                      }}
                      className="rounded text-blue-600"
                    />
                    <span>{isFa ? 'کادر فانتزی نقاشی' : 'Doodle Border'}</span>
                  </label>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1.5">
                  <label className="flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300 font-medium">
                    <input
                      type="checkbox"
                      checked={customWorksheet.twoColumns}
                      onChange={(e) => onUpdateWorksheet({ ...customWorksheet, twoColumns: e.target.checked })}
                      className="rounded text-slate-900 dark:text-white"
                    />
                    <span>{t('twoColumnLayout', language)}</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300 font-medium">
                    <input
                      type="checkbox"
                      checked={customWorksheet.gradingRubric}
                      onChange={(e) => onUpdateWorksheet({ ...customWorksheet, gradingRubric: e.target.checked })}
                      className="rounded text-slate-900 dark:text-white"
                    />
                    <span>{isFa ? 'نمایش جدول سطح‌بندی نمره (A/B/C)' : 'Show Letter Grade Scale in Score Box'}</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300 font-medium">
                    <input
                      type="checkbox"
                      checked={customWorksheet.showAnswerKey}
                      onChange={(e) => onUpdateWorksheet({ ...customWorksheet, showAnswerKey: e.target.checked })}
                      className="rounded text-slate-900 dark:text-white"
                    />
                    <span>{t('appendAnswerKey', language)}</span>
                  </label>
                </div>
              </div>

              {/* Question Addition Actions */}
              {/* Question Addition Actions */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1.5">
                <button
                  onClick={() => {
                    sound.playClick();
                    setShowQuizBuilderModal(true);
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-lg text-xs transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <ListChecks className="w-4 h-4" />
                  <span>{isFa ? 'ساخت آزمون و کوییز انتخابی' : 'Build Multi-Topic Quiz'}</span>
                </button>
                <button
                  onClick={() => setShowAddFromBankModal(true)}
                  className="w-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold py-2 rounded text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{t('insertFromBank', language)}</span>
                </button>

                <button
                  onClick={() => handleAddRandomGeneratedQuestions(2)}
                  className="w-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold py-2 rounded text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{t('insertGenerated', language)}</span>
                </button>

                <button
                  onClick={() => setShowAddCustomModal(true)}
                  className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90 font-bold py-2 rounded text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>{t('createCustom', language)}</span>
                </button>

                <button
                  onClick={() => {
                    sound.playClick();
                    const heading = isFa ? 'بخش دوم: حل مسأله و محاسبات' : 'Part B: Problem Solving & Applications';
                    const newItem: WorksheetItem = {
                      id: `section_${Date.now()}`,
                      sourceType: 'section_heading',
                      sectionHeading: heading,
                      prompt: heading,
                      answer: '',
                      solutionSteps: [],
                      score: 0,
                      allocatedSpaceLines: 0
                    };
                    const items = [...customWorksheet.items, newItem];
                    onUpdateWorksheet({ ...customWorksheet, items });
                  }}
                  className="w-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold py-2 rounded text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>{isFa ? '+ افزودن عنوان بخش جدید' : '+ Add Section Heading'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Studio Drafting Desk (Center/Right Canvas) */}
          {/* Studio Drafting Desk (Center/Right Canvas - fits 100% on phones without cut-off) */}
          <div className={`lg:col-span-8 bg-slate-900 dark:bg-slate-950 p-1 sm:p-6 rounded-2xl shadow-inner border border-slate-800 flex flex-col items-center w-full max-w-full overflow-hidden ${mobileStudioView === 'paper' ? 'flex' : 'hidden lg:flex'}`}>
            <div className="w-full max-w-full sm:max-w-[780px] bg-white shadow-paper border border-slate-300/80 rounded-xl transition-all overflow-hidden">
              <WorksheetPrintLayout
                worksheet={customWorksheet}
                language={language}
                isEditable={true}
                onUpdateTitle={(title) => onUpdateWorksheet({ ...customWorksheet, title })}
                onUpdateSchoolName={(schoolName) => onUpdateWorksheet({ ...customWorksheet, schoolName })}
                onUpdateGrade={(grade) => onUpdateWorksheet({ ...customWorksheet, grade })}
                onUpdateSubject={(subject) => onUpdateWorksheet({ ...customWorksheet, subject })}
                onUpdateScoreBoxLabel={(scoreBoxLabel) => onUpdateWorksheet({ ...customWorksheet, scoreBoxLabel })}
                onUpdateTotalScore={(totalScore) => onUpdateWorksheet({ ...customWorksheet, totalScore })}
                onUpdateGradingRubricText={(gradingRubricText) => onUpdateWorksheet({ ...customWorksheet, gradingRubricText })}
                onUpdateInstructions={(instructions) => onUpdateWorksheet({ ...customWorksheet, instructions })}
                onUpdateTeacherNote={(teacherNote) => onUpdateWorksheet({ ...customWorksheet, teacherNote })}
                onUpdateStudentName={(studentNamePlaceholder) => onUpdateWorksheet({ ...customWorksheet, studentNamePlaceholder })}
                onUpdateDateStr={(dateStr) => onUpdateWorksheet({ ...customWorksheet, dateStr })}
                onUpdateDateLabel={(dateLabel) => onUpdateWorksheet({ ...customWorksheet, dateLabel })}
                onUpdatePeriodLabel={(periodLabel) => onUpdateWorksheet({ ...customWorksheet, periodLabel })}
                onUpdatePeriodValue={(periodValue) => onUpdateWorksheet({ ...customWorksheet, periodValue })}
                onUpdateItemPrompt={(id, prompt) => {
                  const items = customWorksheet.items.map(it => it.id === id ? { ...it, prompt } : it);
                  onUpdateWorksheet({ ...customWorksheet, items });
                }}
                onUpdateItemScore={(id, score) => {
                  const items = customWorksheet.items.map(it => it.id === id ? { ...it, score } : it);
                  const totalScore = items.reduce((acc, c) => acc + c.score, 0);
                  onUpdateWorksheet({ ...customWorksheet, items, totalScore });
                }}
                onDeleteItem={(id) => handleDeleteItem(id)}
                onMoveItem={(idx, dir) => handleMoveItem(idx, dir)}
                onToggleVisibility={(field) => {
                  onUpdateWorksheet({
                    ...customWorksheet,
                    visibility: {
                      ...customWorksheet.visibility,
                      [field]: !(customWorksheet.visibility?.[field] ?? true)
                    }
                  });
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* CONFIGURE ITEMS EDITOR VIEW */}
      {activeTab === 'editor' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 print-hide">
          {/* Header Metadata Config */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-card space-y-3 text-xs transition-colors">
              <h3 className="font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
                {isFa ? 'اطلاعات و مشخصات سربرگ' : 'Sheet Details & Metadata'}
              </h3>

              <div>
                <label className="block text-slate-500 dark:text-slate-400 font-medium mb-1">
                  {isFa ? 'عنوان آزمون / کاربرگ:' : 'Worksheet Title:'}
                </label>
                <input
                  type="text"
                  value={customWorksheet.title}
                  onChange={(e) => onUpdateWorksheet({ ...customWorksheet, title: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded p-1.5 text-xs font-semibold text-slate-800 dark:text-slate-200"
                />
              </div>

              <div>
                <label className="block text-slate-500 dark:text-slate-400 font-medium mb-1">
                  {isFa ? 'نام آموزشگاه / مدرسه:' : 'School / Organization:'}
                </label>
                <input
                  type="text"
                  value={customWorksheet.schoolName}
                  onChange={(e) => onUpdateWorksheet({ ...customWorksheet, schoolName: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded p-1.5 text-xs font-semibold text-slate-800 dark:text-slate-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-500 dark:text-slate-400 font-medium mb-1">
                    {isFa ? 'پایه:' : 'Grade:'}
                  </label>
                  <input
                    type="text"
                    value={customWorksheet.grade}
                    onChange={(e) => onUpdateWorksheet({ ...customWorksheet, grade: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded p-1.5 text-xs font-semibold text-slate-800 dark:text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-slate-500 dark:text-slate-400 font-medium mb-1">
                    {isFa ? 'نام آموزگار:' : 'Teacher:'}
                  </label>
                  <input
                    type="text"
                    value={customWorksheet.teacherName}
                    onChange={(e) => onUpdateWorksheet({ ...customWorksheet, teacherName: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded p-1.5 text-xs font-semibold text-slate-800 dark:text-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-500 dark:text-slate-400 font-medium mb-1">
                  {isFa ? 'راهنمای دانش‌آموز:' : 'Instructions for Students:'}
                </label>
                <textarea
                  rows={2}
                  value={customWorksheet.instructions}
                  onChange={(e) => onUpdateWorksheet({ ...customWorksheet, instructions: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded p-1.5 text-xs text-slate-800 dark:text-slate-200"
                />
              </div>
            </div>
          </div>

          {/* Items Order & Score Editor */}
          <div className="lg:col-span-8 space-y-3">
            <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300">
              <span>{formatDisplayDigits(customWorksheet.items.length, language)} {isFa ? 'سوال در کاربرگ' : 'Questions on Sheet'}</span>
              <span className="font-mono bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-900 dark:text-white">
                {t('totalScore', language)}: {formatDisplayDigits(customWorksheet.totalScore, language)} {t('points', language)}
              </span>
            </div>

            <div className="space-y-2">
              {customWorksheet.items.map((item, index) => (
                <div
                  key={item.id}
                  className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-3 shadow-card space-y-2 hover:border-slate-300 dark:hover:border-slate-700 transition-all text-xs"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono font-bold flex items-center justify-center shrink-0 mt-0.5 text-[11px]">
                        {formatDisplayDigits(index + 1, language)}
                      </span>
                      <div>
                        <div className="font-semibold text-slate-900 dark:text-white">{item.prompt}</div>
                        <div className="font-mono text-[11px] text-emerald-700 dark:text-emerald-400 font-bold mt-1">
                          {t('answerLabel', language)} {item.answer}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => handleMoveItem(index, 'up')}
                        disabled={index === 0}
                        className="p-1 rounded border border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-20"
                        title={isFa ? 'انتقال به بالا' : 'Move Up'}
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleMoveItem(index, 'down')}
                        disabled={index === customWorksheet.items.length - 1}
                        className="p-1 rounded border border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-20"
                        title={isFa ? 'انتقال به پایین' : 'Move Down'}
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="p-1 rounded border border-rose-200 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                        title={isFa ? 'حذف سوال' : 'Delete Question'}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Inline Score & Space inputs */}
                  <div className="flex items-center gap-4 pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                    <div className="flex items-center gap-1">
                      <span>{t('points', language)}:</span>
                      <input
                        type="number"
                        min="1"
                        max="20"
                        value={item.score}
                        onChange={(e) => {
                          const val = Math.max(1, parseInt(e.target.value, 10) || 1);
                          const newItems = customWorksheet.items.map(it => it.id === item.id ? { ...it, score: val } : it);
                          const newTotal = newItems.reduce((acc, c) => acc + c.score, 0);
                          onUpdateWorksheet({ ...customWorksheet, items: newItems, totalScore: newTotal });
                        }}
                        className="w-12 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded px-1.5 py-0.5 text-center font-mono font-bold text-slate-900 dark:text-white"
                      />
                    </div>
                    <div className="flex items-center gap-1">
                      <span>{isFa ? 'ارتفاع فضای پاسخ:' : 'Workspace Height:'}</span>
                      <input
                        type="number"
                        min="2"
                        max="12"
                        value={item.allocatedSpaceLines}
                        onChange={(e) => {
                          const val = Math.max(2, parseInt(e.target.value, 10) || 2);
                          const newItems = customWorksheet.items.map(it => it.id === item.id ? { ...it, allocatedSpaceLines: val } : it);
                          onUpdateWorksheet({ ...customWorksheet, items: newItems });
                        }}
                        className="w-12 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded px-1.5 py-0.5 text-center font-mono font-bold text-slate-900 dark:text-white"
                      />
                      <span>{isFa ? 'سطر' : 'lines'}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Hidden Print Container */}
      <div className="hidden print:block">
        <WorksheetPrintLayout worksheet={customWorksheet} language={language} />
      </div>

      {/* Modal: Write Custom Question */}
      {showAddCustomModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-xl p-5 max-w-lg w-full space-y-3.5 shadow-2xl border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100">
            <h3 className="text-sm font-bold flex items-center gap-2">
              <Edit3 className="w-4 h-4 text-slate-700 dark:text-slate-300" />
              <span>{t('createCustom', language)}</span>
            </h3>

            <form onSubmit={handleAddCustomQuestionSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">
                  {isFa ? 'صورت سوال (متن مسأله):' : 'Question Prompt:'}
                </label>
                <textarea
                  required
                  rows={3}
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder={isFa ? 'مثال: طول قطاری ۱۲۰ متر است...' : 'e.g. A bookstore has 4,520 books...'}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded p-2 text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">
                  {isFa ? 'پاسخ نهایی:' : 'Correct Answer:'}
                </label>
                <input
                  required
                  type="text"
                  value={customAnswer}
                  onChange={(e) => setCustomAnswer(e.target.value)}
                  placeholder={isFa ? 'مثال: ۲٬۶۷۵ جلد' : 'e.g. 2,675 books'}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded p-1.5 text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">
                  {isFa ? 'روش حل تشریحی:' : 'Solution Steps:'}
                </label>
                <textarea
                  rows={2}
                  value={customSolution}
                  onChange={(e) => setCustomSolution(e.target.value)}
                  placeholder="Step 1: ...&#10;Step 2: ..."
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded p-2 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">{t('points', language)}:</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={customScore}
                    onChange={(e) => setCustomScore(Number(e.target.value))}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded p-1 text-xs font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">{isFa ? 'سطرهای چرک‌نویس:' : 'Space (Lines):'}</label>
                  <input
                    type="number"
                    min="2"
                    max="10"
                    value={customLines}
                    onChange={(e) => setCustomLines(Number(e.target.value))}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded p-1 text-xs font-mono font-bold"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddCustomModal(false)}
                  className="px-3 py-1.5 rounded text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold"
                >
                  {isFa ? 'انصراف' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-1.5 rounded text-xs font-bold"
                >
                  {isFa ? 'ثبت در برگه' : 'Add to Sheet'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Insert from Curriculum Bank with Topic Filter */}
      {showAddFromBankModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-xl p-5 max-w-2xl w-full max-h-[80vh] flex flex-col shadow-2xl border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2 mb-3">
              <h3 className="text-sm font-bold">
                {isFa ? 'انتخاب سوال از بانک پایه چهارم' : 'Insert from Grade 4 Question Bank'}
              </h3>
              <div className="flex items-center gap-2">
                <select
                  value={bankTopicFilter}
                  onChange={(e) => setBankTopicFilter(e.target.value)}
                  className="bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs rounded px-2 py-1"
                >
                  <option value="all">{isFa ? 'همه فصل‌ها' : 'All Topics'}</option>
                  <option value="unit_1">{isFa ? 'فصل ۱: ارزش مکانی' : 'Topic 1: Place Value'}</option>
                  <option value="unit_2">{isFa ? 'فصل ۲: جمع و تفریق' : 'Topic 2: Add & Subtract'}</option>
                  <option value="unit_3">{isFa ? 'فصل ۳: ضرب مضارب ۱۰' : 'Topic 3: Multiplication'}</option>
                </select>
                <button
                  onClick={() => setShowAddFromBankModal(false)}
                  className="text-slate-400 hover:text-slate-600 text-xs font-bold"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="overflow-y-auto space-y-2 flex-1 pr-1 text-xs">
              {filteredQuestions.map((q) => (
                <div
                  key={q.id}
                  className="border border-slate-200 dark:border-slate-800 rounded p-2.5 flex items-start justify-between gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <div>
                    <span className="font-mono text-[10px] text-slate-400 block mb-0.5">
                      Lesson {q.lessonNumber} • {q.difficulty}
                    </span>
                    <div className="font-semibold text-slate-800 dark:text-slate-200 leading-snug">
                      {isFa && q.promptFa ? q.promptFa : q.prompt}
                    </div>
                  </div>
                  <button
                    onClick={() => handleAddFromQuestionBank(q.id)}
                    className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-[11px] px-2.5 py-1 rounded shrink-0 flex items-center gap-1 shadow-sm"
                  >
                    <Plus className="w-3 h-3" />
                    <span>{isFa ? 'افزودن' : 'Add'}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal: Interactive Multi-Topic Quiz Builder */}
      {showQuizBuilderModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5">
          <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 overflow-hidden text-xs">
            {/* Header */}
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3 bg-slate-50/70 dark:bg-slate-800/40">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
                  <ListChecks className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold">
                    {isFa ? 'سازنده آزمون و کوییز چندمبحثی' : 'Multi-Topic Quiz Builder'}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {isFa ? 'از مباحث مختلف سوالات دلخواه را انتخاب کنید تا آزمون ترکیبی ساخته شود.' : 'Select specific questions from each topic to build a custom composite exam.'}
                  </p>
                </div>
              </div>

              {/* Quick Presets */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleQuickSelectOnePerUnit}
                  className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-[11px] font-semibold text-slate-700 dark:text-slate-300 transition-colors"
                >
                  {isFa ? '۱ سوال از هر مبحث' : '1 from Each Topic'}
                </button>
                <button
                  onClick={handleQuickSelectTwoPerUnit}
                  className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-[11px] font-semibold text-slate-700 dark:text-slate-300 transition-colors"
                >
                  {isFa ? '۲ سوال از هر مبحث' : '2 from Each Topic'}
                </button>
                <button
                  onClick={() => setSelectedQuizQuestionIds([])}
                  className="px-2 py-1 rounded text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-[11px] font-semibold transition-colors"
                >
                  {isFa ? 'لغو همه' : 'Clear'}
                </button>
                <button
                  onClick={() => setShowQuizBuilderModal(false)}
                  className="p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-sm font-bold ms-1"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Scrollable Questions Body Grouped by Topic */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {[
                { 
                  id: 'unit_1', 
                  title: isFa ? 'فصل ۱: ارزش مکانی و تقریب' : 'Topic 1: Place Value & Rounding',
                  desc: isFa ? 'روابط ارزش مکانی، گسترده‌نویسی، گرد کردن روی محور' : 'Place value relationships, expanded form, rounding on number line'
                },
                { 
                  id: 'unit_2', 
                  title: isFa ? 'فصل ۲: جمع و تفریق اعداد بزرگ و مدل‌ها' : 'Topic 2: Multi-Digit Addition & Subtraction',
                  desc: isFa ? 'محاسبات ذهنی، انتقال، تفریق از صفرهای متوالی، نمودار نواری' : 'Mental math, multi-digit regrouping, subtracting across zeros, tape diagrams'
                },
                { 
                  id: 'unit_3', 
                  title: isFa ? 'فصل ۳: ضرب در مضارب ۱۰' : 'Topic 3: Multiplication by Multiples of 10s',
                  desc: isFa ? 'الگوهای ضرب در ۱۰، ۱۰۰ و ۱۰۰۰ و خواص ضرب' : 'Multiplying by 10, 100, 1000 and associative property'
                }
              ].map(unit => {
                const unitLessons = lessons.filter(l => l.unitId === unit.id);
                const unitQuestions = unitLessons.flatMap(l => l.questions);
                const selectedInUnit = unitQuestions.filter(q => selectedQuizQuestionIds.includes(q.id)).length;

                return (
                  <div key={unit.id} className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
                    {/* Topic Header Strip */}
                    <div className="bg-slate-100/80 dark:bg-slate-800/60 p-3 flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                          <span>{unit.title}</span>
                          <span className="font-mono text-[10px] bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-1.5 py-0.2 rounded">
                            {formatDisplayDigits(selectedInUnit, language)} / {formatDisplayDigits(unitQuestions.length, language)}
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{unit.desc}</div>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleSelectAllInUnit(unit.id)}
                          className="px-2 py-0.5 rounded text-[10px] font-bold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40"
                        >
                          {isFa ? 'انتخاب همه' : 'Select All'}
                        </button>
                        <button
                          onClick={() => handleDeselectAllInUnit(unit.id)}
                          className="px-2 py-0.5 rounded text-[10px] font-medium text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700"
                        >
                          {isFa ? 'لغو این مبحث' : 'Deselect'}
                        </button>
                      </div>
                    </div>

                    {/* Questions in Topic */}
                    <div className="p-2 space-y-1.5 divide-y divide-slate-100 dark:divide-slate-800/60">
                      {unitQuestions.map(q => {
                        const isChecked = selectedQuizQuestionIds.includes(q.id);
                        return (
                          <div
                            key={q.id}
                            onClick={() => handleToggleQuizQuestion(q.id)}
                            className={`p-2.5 rounded-lg flex items-start gap-3 cursor-pointer transition-colors ${
                              isChecked 
                                ? 'bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/60' 
                                : 'hover:bg-slate-50 dark:hover:bg-slate-800/40 border border-transparent'
                            }`}
                          >
                            <div className="mt-0.5 text-blue-600 dark:text-blue-400 shrink-0">
                              {isChecked ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4 text-slate-400" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-2 mb-1">
                                <span className="font-bold text-slate-900 dark:text-white truncate">
                                  {q.title}
                                </span>
                                <span className="text-[10px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-1.5 rounded shrink-0">
                                  {q.difficulty} • 4 {t('points', language)}
                                </span>
                              </div>
                              <p className="text-slate-600 dark:text-slate-400 line-clamp-2 text-[11px] leading-relaxed">
                                {q.prompt}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Sticky Bottom Generate Bar */}
            <div className="p-3.5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 flex-1 min-w-[200px]">
                <span className="font-semibold text-slate-600 dark:text-slate-400 text-xs shrink-0">
                  {isFa ? 'عنوان آزمون:' : 'Quiz Title:'}
                </span>
                <input
                  type="text"
                  value={customQuizTitle}
                  onChange={(e) => setCustomQuizTitle(e.target.value)}
                  placeholder={isFa ? 'کوییز و آزمون جامع ریاضی' : 'e.g. Chapter 1-3 Review Exam'}
                  className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-2.5 py-1 text-xs font-semibold flex-1 text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex items-center gap-3">
                <span className={`text-xs font-bold text-slate-700 dark:text-slate-300 ${isFa ? 'font-vazir' : 'font-mono'}`}>
                  <span className="font-mono">{formatDisplayDigits(selectedQuizQuestionIds.length, language)}</span> {isFa ? 'سوال انتخاب شده' : 'Questions'} (<span className="font-mono">{formatDisplayDigits(selectedQuizQuestionIds.length * 4, language)}</span> {t('points', language)})
                </span>

                <button
                  onClick={handleGenerateQuizWorksheet}
                  disabled={selectedQuizQuestionIds.length === 0}
                  className="bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white font-bold px-4 py-2 rounded-lg text-xs transition-all flex items-center gap-1.5 shadow-md shadow-blue-600/20"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>{isFa ? 'تولید و بارگذاری آزمون در برگه' : 'Generate Quiz Worksheet'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
