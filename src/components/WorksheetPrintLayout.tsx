import React from 'react';
import { Worksheet, Language, WorksheetVisibility } from '../types/math';
import { formatDisplayNumber, formatDisplayDigits, t } from '../utils/i18n';
import { 
  Award, 
  Compass, 
  Star, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  X, 
  Sparkles,
  Calculator,
  Plane,
  Ship,
  Boxes,
  Orbit,
  Waves,
  Headphones,
  Utensils,
  Recycle,
  Milestone,
  Footprints,
  Target
} from 'lucide-react';

interface WorksheetPrintLayoutProps {
  worksheet: Worksheet;
  language?: Language;
  isEditable?: boolean;
  onUpdateTitle?: (title: string) => void;
  onUpdateSchoolName?: (name: string) => void;
  onUpdateGrade?: (grade: string) => void;
  onUpdateSubject?: (subject: string) => void;
  onUpdateScoreBoxLabel?: (label: string) => void;
  onUpdateTotalScore?: (score: number) => void;
  onUpdateGradingRubricText?: (text: string) => void;
  onUpdateInstructions?: (instructions: string) => void;
  onUpdateTeacherNote?: (note: string) => void;
  onUpdateStudentName?: (name: string) => void;
  onUpdateDateStr?: (date: string) => void;
  onUpdateDateLabel?: (label: string) => void;
  onUpdatePeriodLabel?: (label: string) => void;
  onUpdatePeriodValue?: (val: string) => void;
  onUpdateItemPrompt?: (id: string, prompt: string) => void;
  onUpdateItemScore?: (id: string, score: number) => void;
  onDeleteItem?: (id: string) => void;
  onMoveItem?: (index: number, direction: 'up' | 'down') => void;
  onToggleVisibility?: (key: keyof WorksheetVisibility) => void;
}

function renderQuestionIcon(id: string, prompt: string) {
  const p = (id + ' ' + prompt).toLowerCase();
  if (p.includes('lemonade') || p.includes('شربت')) return <Sparkles className="w-4 h-4 text-amber-500" />;
  if (p.includes('flight') || p.includes('پرواز')) return <Plane className="w-4 h-4 text-sky-600" />;
  if (p.includes('lobster') || p.includes('میگو')) return <Ship className="w-4 h-4 text-rose-600" />;
  if (p.includes('apple') || p.includes('سیب')) return <Boxes className="w-4 h-4 text-emerald-600" />;
  if (p.includes('planet') || p.includes('saturn') || p.includes('سیاره')) return <Orbit className="w-4 h-4 text-indigo-600" />;
  if (p.includes('ocean') || p.includes('اقیانوس')) return <Waves className="w-4 h-4 text-teal-600" />;
  if (p.includes('song') || p.includes('ترانه')) return <Headphones className="w-4 h-4 text-purple-600" />;
  if (p.includes('spaghetti') || p.includes('ماکارونی')) return <Utensils className="w-4 h-4 text-amber-600" />;
  if (p.includes('can') || p.includes('قوطی') || p.includes('recycling')) return <Recycle className="w-4 h-4 text-emerald-600" />;
  if (p.includes('highway') || p.includes('بزرگراه')) return <Milestone className="w-4 h-4 text-blue-600" />;
  if (p.includes('pedometer') || p.includes('قدم')) return <Footprints className="w-4 h-4 text-orange-600" />;
  if (p.includes('round') || p.includes('تقریب')) return <Target className="w-4 h-4 text-slate-800" />;
  return <Calculator className="w-4 h-4 text-slate-700" />;
}

export const WorksheetPrintLayout: React.FC<WorksheetPrintLayoutProps> = ({ 
  worksheet,
  language = 'en',
  isEditable = false,
  onUpdateTitle,
  onUpdateSchoolName,
  onUpdateGrade,
  onUpdateSubject,
  onUpdateScoreBoxLabel,
  onUpdateTotalScore,
  onUpdateGradingRubricText,
  onUpdateInstructions,
  onUpdateTeacherNote,
  onUpdateStudentName,
  onUpdateDateStr,
  onUpdateDateLabel,
  onUpdatePeriodLabel,
  onUpdatePeriodValue,
  onUpdateItemPrompt,
  onUpdateItemScore,
  onDeleteItem,
  onMoveItem,
  onToggleVisibility
}) => {
  const isFa = language === 'fa';
  const vis = worksheet.visibility || {
    showSchoolName: true,
    showTitle: true,
    showSubtitle: true,
    showStudentInfo: true,
    showNameField: true,
    showDateField: true,
    showPeriodField: true,
    showScoreBox: true,
    showScoreRubric: true,
    showDirections: true,
    showMascot: true,
    showAnswerBoxes: true,
    showTeacherNote: true,
    showQuestionIcons: true,
    showSmileyRating: true,
    showDoodleBorder: true,
  };

  const getGridClass = () => {
    switch (worksheet.paperGrid) {
      case 'grid': return 'paper-grid';
      case 'lined': return 'paper-lined';
      case 'dots': return 'paper-dots';
      default: return 'bg-white';
    }
  };

  const getFontFamilyClass = () => {
    if (isFa) return 'font-vazir';
    switch (worksheet.paperFont) {
      case 'serif': return 'font-serif';
      case 'mono': return 'font-mono';
      default: return 'font-sans';
    }
  };

  const renderCrest = () => {
    if (worksheet.crest === 'crest') {
      return (
        <div className="w-11 h-11 rounded-full border-2 border-slate-900 flex items-center justify-center p-1 bg-slate-50 shrink-0">
          <Award className="w-6 h-6 text-slate-800" />
        </div>
      );
    }
    if (worksheet.crest === 'math') {
      return (
        <div className="w-11 h-11 rounded-full border-2 border-slate-900 flex items-center justify-center p-1 bg-slate-50 shrink-0">
          <Compass className="w-6 h-6 text-slate-800" />
        </div>
      );
    }
    if (worksheet.crest === 'star') {
      return (
        <div className="w-11 h-11 rounded-full border-2 border-slate-900 flex items-center justify-center p-1 bg-slate-50 shrink-0">
          <Star className="w-6 h-6 text-slate-800" />
        </div>
      );
    }
    return null;
  };

  const renderMascotStamp = () => {
    if (!vis.showMascot || !worksheet.mascot || worksheet.mascot === 'none') return null;

    const mascots = {
      fox: {
        icon: <Award className="w-5 h-5 text-amber-600" />,
        name: isFa ? 'نشان زرین تلاش و موفقیت' : 'Excellence Honor Seal',
        motto: isFa ? 'با دقت و تمرکز کامل حل کن!' : 'Show your best mathematical thinking!'
      },
      owl: {
        icon: <Compass className="w-5 h-5 text-blue-600" />,
        name: isFa ? 'نشان هوش و مهندسی ریاضی' : 'STEM Geometry & Math Seal',
        motto: isFa ? 'گام به گام و تحلیلی فکر کن!' : 'Think carefully, step by step!'
      },
      rocket: {
        icon: <Sparkles className="w-5 h-5 text-indigo-600" />,
        name: isFa ? 'نشان کشف و پیشرفت ۱۰۰٪' : '100% Mastery Launch Seal',
        motto: isFa ? 'پیش به سوی تسلط کامل بر مبحث!' : 'Aiming for 100% excellence!'
      },
      pencil: {
        icon: <Star className="w-5 h-5 text-emerald-600 fill-emerald-100" />,
        name: isFa ? 'ستاره درخشان محاسبات' : 'Superstar Calculation Seal',
        motto: isFa ? 'محاسبات دقیق با نظم و حوصله!' : 'Neat scratchwork, sharp results!'
      }
    };

    const m = mascots[worksheet.mascot as keyof typeof mascots];
    if (!m) return null;

    return (
      <div className="relative group border-2 border-slate-900 rounded-xl p-2 bg-slate-50 flex items-center gap-2 max-w-[260px] shrink-0 my-0.5 shadow-sm">
        <div className="w-8 h-8 rounded-lg bg-white border border-slate-300 flex items-center justify-center shrink-0">
          {m.icon}
        </div>
        <div className="text-[10px] leading-tight text-start">
          <div className="font-black text-slate-900">{m.name}</div>
          <div className="text-slate-600 font-medium italic">"{m.motto}"</div>
        </div>
        {isEditable && onToggleVisibility && (
          <button
            onClick={() => onToggleVisibility('showMascot')}
            title="Remove Stamp"
            className="absolute -top-2 -end-2 opacity-0 group-hover:opacity-100 bg-rose-500 text-white rounded-full p-0.5 shadow transition-opacity print-hide"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </div>
    );
  };

  return (
    <div 
      className={`print-only text-slate-900 bg-white p-3.5 sm:p-7 md:p-10 w-full max-w-full sm:max-w-[820px] mx-auto text-start relative transition-all ${getFontFamilyClass()}`}
      dir={isFa ? 'rtl' : 'ltr'}
    >
      {/* Optional Diagonal Watermark */}
      {worksheet.watermarkText && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.06] rotate-[-30deg] text-6xl font-black uppercase text-slate-900 tracking-widest z-0">
          {worksheet.watermarkText}
        </div>
      )}

      {/* Decorative Vector Doodle Border */}
      {vis.showDoodleBorder && (
        <div className="flex items-center justify-between text-slate-400 py-1 mb-2 text-xs select-none border-b border-slate-200">
          <span className="font-mono text-xs font-bold">+</span>
          <Compass className="w-3.5 h-3.5 text-slate-500" />
          <span className="font-mono text-xs font-bold">−</span>
          <Calculator className="w-3.5 h-3.5 text-slate-500" />
          <span className="font-mono text-xs font-bold">×</span>
          <Award className="w-3.5 h-3.5 text-slate-500" />
          <span className="font-mono text-xs font-bold">÷</span>
          <Sparkles className="w-3.5 h-3.5 text-slate-500" />
          <span className="font-mono text-xs font-bold">=</span>
          <Star className="w-3.5 h-3.5 text-slate-500" />
          <span className="font-mono text-xs font-bold">%</span>
        </div>
      )}

      {/* HEADER SECTION (FULLY CUSTOMIZABLE INLINE - EACH PART CAN BE CHANGED OR REMOVED) */}
      <div className={`border-2 border-slate-900 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6 relative z-10 text-start ${worksheet.layout === 'playful_adventure' ? 'border-3 sm:border-4 rounded-2xl sm:rounded-3xl bg-amber-50/20' : ''}`}>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-start justify-between border-b-2 border-slate-900 pb-3 mb-3 gap-3">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {renderCrest()}
            <div className="flex-1 min-w-0 space-y-0.5">
              {/* 1. School Name */}
              {vis.showSchoolName && (
                <div className="group relative text-[11px] font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                  {isEditable ? (
                    <input
                      type="text"
                      value={worksheet.schoolName}
                      onChange={(e) => onUpdateSchoolName?.(e.target.value)}
                      className="bg-transparent hover:bg-slate-100 border border-transparent hover:border-slate-300 rounded px-1 -mx-1 font-bold text-slate-700 w-full"
                    />
                  ) : (
                    <span>{worksheet.schoolName}</span>
                  )}
                  {isEditable && onToggleVisibility && (
                    <button onClick={() => onToggleVisibility('showSchoolName')} title="Remove School Name" className="opacity-0 group-hover:opacity-100 text-rose-500 print-hide"><X className="w-3 h-3" /></button>
                  )}
                </div>
              )}

              {/* 2. Worksheet Title */}
              {vis.showTitle && (
                <div className="group relative flex items-center gap-1.5 flex-1 min-w-0">
                  {isEditable ? (
                    <textarea
                      rows={worksheet.title.length > 25 ? 2 : 1}
                      value={worksheet.title}
                      onChange={(e) => onUpdateTitle?.(e.target.value)}
                      className="text-base sm:text-xl font-black text-slate-900 tracking-tight bg-transparent hover:bg-slate-100 border border-transparent hover:border-slate-300 rounded px-1 -mx-1 w-full resize-none leading-tight"
                    />
                  ) : (
                    <h1 className="text-base sm:text-xl font-black text-slate-900 tracking-tight leading-tight">{worksheet.title}</h1>
                  )}
                  {isEditable && onToggleVisibility && (
                    <button onClick={() => onToggleVisibility('showTitle')} title="Remove Title" className="opacity-0 group-hover:opacity-100 text-rose-500 print-hide shrink-0"><X className="w-3 h-3" /></button>
                  )}
                </div>
              )}

              {/* 3. Subtitle: Grade & Subject */}
              {vis.showSubtitle && (
                <div className="group relative flex items-center gap-1 text-xs font-semibold text-slate-700">
                  {isEditable ? (
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 w-full text-xs font-semibold text-slate-700 min-w-0">
                      <input
                        type="text"
                        value={worksheet.grade}
                        onChange={(e) => onUpdateGrade?.(e.target.value)}
                        className="bg-transparent hover:bg-slate-100 border border-transparent hover:border-slate-300 rounded px-1 -mx-1 text-xs font-semibold text-slate-700 w-full sm:w-auto"
                      />
                      <span className="hidden sm:inline">•</span>
                      <input
                        type="text"
                        value={worksheet.subject}
                        onChange={(e) => onUpdateSubject?.(e.target.value)}
                        className="bg-transparent hover:bg-slate-100 border border-transparent hover:border-slate-300 rounded px-1 -mx-1 text-xs font-semibold text-slate-700 flex-1 min-w-0"
                      />
                    </div>
                  ) : (
                    <div className="text-[11px] sm:text-xs leading-snug">{worksheet.grade} • {worksheet.subject}</div>
                  )}
                  {isEditable && onToggleVisibility && (
                    <button onClick={() => onToggleVisibility('showSubtitle')} title="Remove Subtitle" className="opacity-0 group-hover:opacity-100 text-rose-500 print-hide shrink-0"><X className="w-3 h-3" /></button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* 4. Total Score Block (Fully Editable: Label, Max Points, Rubric) */}
          {vis.showScoreBox && (
            <div className="relative group border-2 border-slate-900 rounded p-2 text-center w-full sm:w-auto sm:min-w-[110px] bg-slate-50 shrink-0 self-start sm:self-auto">
              {isEditable ? (
                <input
                  type="text"
                  value={worksheet.scoreBoxLabel ?? (isFa ? 'نمره کل' : 'TOTAL SCORE')}
                  onChange={(e) => onUpdateScoreBoxLabel?.(e.target.value)}
                  className="text-[9px] uppercase font-bold tracking-wider text-slate-500 block text-center w-full bg-transparent hover:bg-white rounded"
                />
              ) : (
                <span className="text-[9px] uppercase font-bold tracking-wider text-slate-500 block">
                  {worksheet.scoreBoxLabel ?? (isFa ? 'نمره کل' : 'TOTAL SCORE')}
                </span>
              )}

              <div className="font-mono text-base font-black text-slate-900 flex items-center justify-center gap-1">
                <span>____ / </span>
                {isEditable ? (
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={worksheet.totalScore}
                    onChange={(e) => onUpdateTotalScore?.(Number(e.target.value))}
                    className="w-10 bg-transparent hover:bg-white text-center font-black rounded border border-transparent hover:border-slate-300"
                  />
                ) : (
                  <span>{formatDisplayDigits(worksheet.totalScore, language)}</span>
                )}
              </div>

              {vis.showScoreRubric && worksheet.gradingRubric && (
                <div className="relative group/rubric border-t border-slate-200 mt-1 pt-0.5">
                  {isEditable ? (
                    <input
                      type="text"
                      value={worksheet.gradingRubricText ?? (isFa ? 'A (90+) B (80+) C (70+)' : 'A (90+) B (80+) C (70+)')}
                      onChange={(e) => onUpdateGradingRubricText?.(e.target.value)}
                      className="text-[8px] font-bold text-slate-600 block text-center w-full bg-transparent hover:bg-white rounded font-mono"
                    />
                  ) : (
                    <div className="text-[8px] font-bold text-slate-600 flex justify-around font-mono">
                      <span>{worksheet.gradingRubricText ?? (isFa ? 'A (90+) B (80+) C (70+)' : 'A (90+) B (80+) C (70+)')}</span>
                    </div>
                  )}
                  {isEditable && onToggleVisibility && (
                    <button onClick={() => onToggleVisibility('showScoreRubric')} title="Remove Rubric" className="opacity-0 group-hover/rubric:opacity-100 text-rose-500 text-[8px] print-hide">✕</button>
                  )}
                </div>
              )}

              {isEditable && onToggleVisibility && (
                <button onClick={() => onToggleVisibility('showScoreBox')} title="Remove Score Block" className="absolute -top-2 -end-2 opacity-0 group-hover:opacity-100 bg-rose-500 text-white rounded-full p-0.5 shadow print-hide"><X className="w-3 h-3" /></button>
              )}
            </div>
          )}
        </div>

        {/* 5. Granular Student Info Line (Name, Date, Period) */}
        {(vis.showNameField || vis.showDateField || vis.showPeriodField) && (
          <div className="relative flex flex-col sm:flex-row sm:items-center justify-between text-xs font-semibold pt-1 gap-2 border-t border-slate-100 mt-1">
            {/* Student Name */}
            {vis.showNameField && (
              <div className="group relative flex items-center gap-1">
                {isEditable ? (
                  <input
                    type="text"
                    value={worksheet.studentNamePlaceholder}
                    onChange={(e) => onUpdateStudentName?.(e.target.value)}
                    placeholder={isFa ? 'نام و نام خانوادگی: ........................' : 'Name: _______________________'}
                    className="bg-transparent hover:bg-slate-100 border border-transparent hover:border-slate-300 rounded px-1 -mx-1 font-semibold text-slate-800"
                  />
                ) : (
                  <span>{worksheet.studentNamePlaceholder}</span>
                )}
                {isEditable && onToggleVisibility && (
                  <button onClick={() => onToggleVisibility('showNameField')} title="Remove Name" className="opacity-0 group-hover:opacity-100 text-rose-500 print-hide"><X className="w-3 h-3" /></button>
                )}
              </div>
            )}

            {/* Date */}
            {vis.showDateField && (
              <div className="group relative flex items-center gap-1">
                {isEditable ? (
                  <div className="flex items-center gap-1">
                    <input
                      type="text"
                      value={worksheet.dateLabel ?? (isFa ? 'تاریخ:' : 'Date:')}
                      onChange={(e) => onUpdateDateLabel?.(e.target.value)}
                      className="w-12 bg-transparent hover:bg-slate-100 border border-transparent hover:border-slate-300 rounded px-1 text-end font-semibold text-slate-800"
                    />
                    <input
                      type="text"
                      value={worksheet.dateStr}
                      onChange={(e) => onUpdateDateStr?.(e.target.value)}
                      className="w-28 bg-transparent hover:bg-slate-100 border border-transparent hover:border-slate-300 rounded px-1 font-semibold text-slate-800"
                    />
                  </div>
                ) : (
                  <span>{worksheet.dateLabel ?? (isFa ? 'تاریخ:' : 'Date:')} {formatDisplayDigits(worksheet.dateStr, language)}</span>
                )}
                {isEditable && onToggleVisibility && (
                  <button onClick={() => onToggleVisibility('showDateField')} title="Remove Date" className="opacity-0 group-hover:opacity-100 text-rose-500 print-hide"><X className="w-3 h-3" /></button>
                )}
              </div>
            )}

            {/* Class / Period */}
            {vis.showPeriodField && (
              <div className="group relative flex items-center gap-1">
                {isEditable ? (
                  <div className="flex items-center gap-1 min-w-0">
                    <input
                      type="text"
                      value={worksheet.periodLabel ?? (isFa ? 'کلاس / نوبت:' : 'Period / Seat:')}
                      onChange={(e) => onUpdatePeriodLabel?.(e.target.value)}
                      className="w-auto min-w-[70px] max-w-[110px] bg-transparent hover:bg-slate-100 border border-transparent hover:border-slate-300 rounded px-1 text-end font-semibold text-slate-800 text-[11px]"
                    />
                    <input
                      type="text"
                      value={worksheet.periodValue ?? '_____'}
                      onChange={(e) => onUpdatePeriodValue?.(e.target.value)}
                      className="w-12 bg-transparent hover:bg-slate-100 border border-transparent hover:border-slate-300 rounded px-1 font-semibold text-slate-800 text-[11px]"
                    />
                  </div>
                ) : (
                  <span>{worksheet.periodLabel ?? (isFa ? 'کلاس / نوبت:' : 'Period / Seat:')} {worksheet.periodValue ?? '_____'}</span>
                )}
                {isEditable && onToggleVisibility && (
                  <button onClick={() => onToggleVisibility('showPeriodField')} title="Remove Period" className="opacity-0 group-hover:opacity-100 text-rose-500 print-hide"><X className="w-3 h-3" /></button>
                )}
              </div>
            )}
          </div>
        )}

        {/* 6. Directions & Stamp */}
        {(vis.showDirections || vis.showMascot) && (
          <div className="mt-3 pt-2 border-t border-slate-200 text-xs text-slate-600 leading-relaxed font-medium flex items-center justify-between gap-3">
            {vis.showDirections && (
              <div className="flex-1 relative group">
                {isEditable ? (
                  <input
                    type="text"
                    value={worksheet.instructions}
                    onChange={(e) => onUpdateInstructions?.(e.target.value)}
                    className="w-full bg-transparent hover:bg-slate-100 border border-transparent hover:border-slate-300 rounded px-1 -mx-1 font-medium text-slate-700"
                  />
                ) : (
                  <div><strong>{t('directions', language)} </strong>{formatDisplayDigits(worksheet.instructions, language)}</div>
                )}
                {isEditable && onToggleVisibility && (
                  <button onClick={() => onToggleVisibility('showDirections')} title="Remove Directions" className="opacity-0 group-hover:opacity-100 text-rose-500 print-hide ms-1"><X className="w-3 h-3" /></button>
                )}
              </div>
            )}
            {renderMascotStamp()}
          </div>
        )}
      </div>

      {/* QUESTIONS LIST WITH INLINE EDIT & ITEM TOOLBARS */}
      <div className={`${worksheet.twoColumns ? 'grid grid-cols-2 gap-4' : 'space-y-6'} relative z-10`}>
        {worksheet.items.map((item, index) => {
          if (item.sourceType === 'section_heading') {
            return (
              <div key={item.id} className="relative group col-span-full border-b-2 border-slate-900 pb-1 pt-3 mb-2 flex items-center justify-between">
                <span className="font-black text-sm text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="text-amber-500">❖</span>
                  {isEditable ? (
                    <input
                      type="text"
                      value={item.sectionHeading ?? item.prompt}
                      onChange={(e) => onUpdateItemPrompt?.(item.id, e.target.value)}
                      className="bg-transparent hover:bg-slate-100 border border-transparent hover:border-slate-300 rounded px-1 font-black"
                    />
                  ) : (
                    item.sectionHeading ?? item.prompt
                  )}
                </span>
                {isEditable && (
                  <button onClick={() => onDeleteItem?.(item.id)} title="Remove Section" className="opacity-0 group-hover:opacity-100 text-rose-500 print-hide"><X className="w-3.5 h-3.5" /></button>
                )}
              </div>
            );
          }

          return (
            <div key={item.id} className="keep-together border-b border-slate-200 pb-5 text-start relative group">
              {/* Question Header & Inline In-Place Controls */}
              <div className="flex items-start justify-between gap-3 mb-2 text-sm font-bold">
                <div className="flex items-start gap-2.5 flex-1 min-w-0">
                  {/* Question Number Badge */}
                  <span className="w-6 h-6 rounded-lg bg-slate-900 text-white font-mono text-xs font-black flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    {formatDisplayDigits(index + 1, language)}
                  </span>

                  {/* Clean Vector SVG Question Icon Badge (Zero Emojis!) */}
                  {vis.showQuestionIcons && (
                    <div className="w-6 h-6 rounded bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 mt-0.5">
                      {renderQuestionIcon(item.questionId || item.id, item.prompt)}
                    </div>
                  )}

                  {isEditable ? (
                    <textarea
                      rows={2}
                      value={item.prompt}
                      onChange={(e) => onUpdateItemPrompt?.(item.id, e.target.value)}
                      className="w-full bg-transparent hover:bg-slate-100 border border-transparent hover:border-slate-300 rounded px-1 -mx-1 text-sm font-bold text-slate-900 leading-snug"
                    />
                  ) : (
                    <span className="leading-relaxed text-slate-900 font-bold">{formatDisplayDigits(item.prompt, language)}</span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {isEditable ? (
                    <div className="flex items-center gap-1 bg-slate-100 px-1.5 py-0.5 rounded font-mono text-xs">
                      <input
                        type="number"
                        min="1"
                        max="20"
                        value={item.score}
                        onChange={(e) => onUpdateItemScore?.(item.id, Number(e.target.value))}
                        className="w-8 bg-transparent text-center font-bold text-slate-900"
                      />
                      <span className="text-[10px] text-slate-500">{t('points', language)}</span>
                    </div>
                  ) : (
                    <span className="font-mono text-xs font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                      [{formatDisplayDigits(item.score, language)} {t('points', language)}]
                    </span>
                  )}

                  {/* Question Action Toolbar */}
                  {isEditable && (
                    <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1 bg-white border border-slate-300 rounded-md p-0.5 shadow-sm transition-opacity print-hide ms-1">
                      <button onClick={() => onMoveItem?.(index, 'up')} disabled={index === 0} title="Move Up" className="p-1 hover:bg-slate-100 rounded text-slate-600 disabled:opacity-20"><ArrowUp className="w-3 h-3" /></button>
                      <button onClick={() => onMoveItem?.(index, 'down')} disabled={index === worksheet.items.length - 1} title="Move Down" className="p-1 hover:bg-slate-100 rounded text-slate-600 disabled:opacity-20"><ArrowDown className="w-3 h-3" /></button>
                      <button onClick={() => onDeleteItem?.(item.id)} title="Delete Question" className="p-1 hover:bg-rose-50 text-rose-600 rounded"><Trash2 className="w-3 h-3" /></button>
                    </div>
                  )}
                </div>
              </div>

              {/* Context Data Table if provided */}
              {item.contextData && (
                <div className="my-2 border border-slate-300 rounded text-xs max-w-sm">
                  {item.contextData.tableTitle && (
                    <div className="bg-slate-100 px-2 py-1 font-bold text-slate-800 border-b border-slate-300 text-start">
                      {item.contextData.tableTitle}
                    </div>
                  )}
                  <table className="w-full text-start text-[11px]">
                    {item.contextData.headers && (
                      <thead className="bg-slate-50 border-b border-slate-200 font-semibold">
                        <tr>
                          {item.contextData.headers.map((h, i) => (
                            <th key={i} className="px-2 py-1">{h}</th>
                          ))}
                        </tr>
                      </thead>
                    )}
                    <tbody>
                      {item.contextData.rows?.map((row, rIdx) => (
                        <tr key={rIdx} className="border-b border-slate-100 last:border-0">
                          {row.map((cell, cIdx) => (
                            <td key={cIdx} className="px-2 py-1 font-mono">
                              {typeof cell === 'number' ? formatDisplayNumber(cell, language) : formatDisplayDigits(cell, language)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Workspace Area */}
              <div className="mt-2.5">
                <div
                  className={`w-full border border-slate-300 rounded ${getGridClass()}`}
                  style={{ height: `${Math.max(2, item.allocatedSpaceLines) * 26}px` }}
                >
                  <div className="text-[9px] font-mono text-slate-400 p-1 select-none text-start">
                    {t('workspaceLabel', language)}
                  </div>
                </div>
              </div>

              {/* Answer Box */}
              {vis.showAnswerBoxes && (
                <div className="mt-2 flex justify-end">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                    <span>{t('answerLabel', language)}</span>
                    <div className="w-32 sm:w-44 h-7 border-2 border-slate-800 rounded bg-white"></div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Standards-Based 4th-Grade Mastery Self-Check at End of Sheet (Zero Emojis, Pure SVG Stars!) */}
      {vis.showSmileyRating && (
        <div className="keep-together mt-6 p-3 rounded-2xl border-2 border-dashed border-slate-400 bg-slate-50/70 text-center select-none">
          <div className="text-xs font-black text-slate-800 mb-2 flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>{isFa ? 'سنجش و ارزیابی سطح تسلط در این آزمون:' : 'Standards-Based Mastery Self-Check:'}</span>
          </div>
          <div className="flex items-center justify-around text-xs font-bold text-slate-700 flex-wrap gap-2">
            <span className="flex items-center gap-1.5 border border-slate-300 bg-white px-3 py-1 rounded-full shadow-sm">
              <span className="flex text-amber-500"><Star className="w-3.5 h-3.5 fill-amber-500" /><Star className="w-3.5 h-3.5 fill-amber-500" /><Star className="w-3.5 h-3.5 fill-amber-500" /><Star className="w-3.5 h-3.5 fill-amber-500" /></span>
              <span>{isFa ? 'تسلط عالی (سطح ۴)' : 'Level 4 (Mastered)'}</span>
              <span className="w-3.5 h-3.5 rounded-full border border-slate-400 inline-block ms-1"></span>
            </span>
            <span className="flex items-center gap-1.5 border border-slate-300 bg-white px-3 py-1 rounded-full shadow-sm">
              <span className="flex text-amber-500"><Star className="w-3.5 h-3.5 fill-amber-500" /><Star className="w-3.5 h-3.5 fill-amber-500" /><Star className="w-3.5 h-3.5 fill-amber-500" /></span>
              <span>{isFa ? 'خوب و توانمند (سطح ۳)' : 'Level 3 (Proficient)'}</span>
              <span className="w-3.5 h-3.5 rounded-full border border-slate-400 inline-block ms-1"></span>
            </span>
            <span className="flex items-center gap-1.5 border border-slate-300 bg-white px-3 py-1 rounded-full shadow-sm">
              <span className="flex text-amber-500"><Star className="w-3.5 h-3.5 fill-amber-500" /><Star className="w-3.5 h-3.5 fill-amber-500" /></span>
              <span>{isFa ? 'نیاز به تمرین (سطح ۲)' : 'Level 2 (Developing)'}</span>
              <span className="w-3.5 h-3.5 rounded-full border border-slate-400 inline-block ms-1"></span>
            </span>
            <span className="flex items-center gap-1.5 border border-slate-300 bg-white px-3 py-1 rounded-full shadow-sm">
              <span className="flex text-amber-500"><Star className="w-3.5 h-3.5 fill-amber-500" /></span>
              <span>{isFa ? 'شروع یادگیری (سطح ۱)' : 'Level 1 (Novice)'}</span>
              <span className="w-3.5 h-3.5 rounded-full border border-slate-400 inline-block ms-1"></span>
            </span>
          </div>
        </div>
      )}

      {/* Teacher Note Footer */}
      {vis.showTeacherNote && worksheet.teacherNote && (
        <div className="group relative mt-5 pt-3 border-t border-slate-300 text-xs text-slate-600 relative z-10 text-start">
          {isEditable ? (
            <div className="flex items-center gap-2">
              <strong>{t('teacherNote', language)} </strong>
              <input
                type="text"
                value={worksheet.teacherNote}
                onChange={(e) => onUpdateTeacherNote?.(e.target.value)}
                className="flex-1 bg-transparent hover:bg-slate-100 border border-transparent hover:border-slate-300 rounded px-1 text-xs"
              />
              <button onClick={() => onToggleVisibility?.('showTeacherNote')} title="Remove Note" className="opacity-0 group-hover:opacity-100 text-rose-500 print-hide"><X className="w-3 h-3" /></button>
            </div>
          ) : (
            <div><strong>{t('teacherNote', language)} </strong>{formatDisplayDigits(worksheet.teacherNote, language)}</div>
          )}
        </div>
      )}

      {/* SEPARATE PAGE FOR ANSWER KEY */}
      {worksheet.showAnswerKey && (
        <div className="page-break mt-12 pt-8 border-t-4 border-slate-900 relative z-10 text-start">
          <div className="border-b-2 border-slate-900 pb-3 mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">
                {isFa ? 'پاسخ‌نامه تشریحی و راهنمای تصحیح آموزگار' : 'Answer Key & Solution Guide'}
              </h2>
              <div className="text-xs text-slate-600">{worksheet.title} • {worksheet.grade}</div>
            </div>
            <div className="font-mono text-xs font-bold bg-slate-900 text-white px-3 py-1 rounded">
              {isFa ? 'نسخه آموزگار' : 'TEACHER COPY'}
            </div>
          </div>

          <div className="space-y-4">
            {worksheet.items.map((item, index) => {
              if (item.sourceType === 'section_heading') return null;
              return (
                <div key={item.id} className="border border-slate-200 rounded p-3 bg-slate-50/60 keep-together text-xs text-start">
                  <div className="flex items-center justify-between font-bold mb-1">
                    <span className="text-slate-900">
                      {isFa ? `سوال شماره ${formatDisplayDigits(index + 1, language)}` : `Item #${index + 1}`} ({formatDisplayDigits(item.score, language)} {t('points', language)})
                    </span>
                    <span className="font-mono bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded font-black">
                      {t('answerLabel', language)} {formatDisplayDigits(item.answer, language)}
                    </span>
                  </div>
                  {item.solutionSteps.length > 0 && (
                    <ol className="list-decimal list-inside space-y-0.5 text-slate-700 pt-1 border-t border-slate-200 font-medium">
                      {item.solutionSteps.map((st, i) => (
                        <li key={i}>{formatDisplayDigits(st, language)}</li>
                      ))}
                    </ol>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
