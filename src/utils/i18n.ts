import { Language } from '../types/math';
import { toPersianDigits, formatPersianNumber, getTodayJalali } from './persian';
import { formatNumber, getTodayDateStr } from './numberFormat';

export function formatDisplayNumber(val: number | string | null | undefined, lang: Language): string {
  if (val === null || val === undefined) return '';
  if (lang === 'fa') {
    return formatPersianNumber(val);
  }
  return formatNumber(val);
}

export function formatDisplayDigits(val: number | string | null | undefined, lang: Language): string {
  if (val === null || val === undefined) return '';
  if (lang === 'fa') {
    return toPersianDigits(val);
  }
  return String(val);
}

export function getTodayDateFormatted(lang: Language): string {
  if (lang === 'fa') {
    return getTodayJalali();
  }
  return getTodayDateStr();
}

const DICTIONARY: Record<string, { en: string; fa: string }> = {
  // Navigation
  lessons: { en: 'Lessons', fa: 'درس‌نامه' },
  practice: { en: 'Practice', fa: 'تمرین اصلی' },
  generator: { en: 'Generator', fa: 'تولید مشابه' },
  detective: { en: 'Spot the Mistake', fa: 'کارآگاه خطا' },
  worksheet: { en: 'Worksheet Studio', fa: 'استودیوی کاربرگ' },

  // Worksheet Studio
  paperProperties: { en: 'Paper Studio Properties', fa: 'تنظیمات برگه و چاپ' },
  headerStyle: { en: 'Header Style', fa: 'مدل سربرگ' },
  workspaceTexture: { en: 'Workspace Grid Pattern', fa: 'الگوی چرک‌نویس و خطوط' },
  standardTest: { en: 'Standard Exam (Boxed)', fa: 'برگه آزمون رسمی (کادربندی شده)' },
  practiceSheet: { en: 'Practice Worksheet', fa: 'کاربرگ کلاسی و تمرین' },
  homeworkSheet: { en: 'Homework Assignment', fa: 'تکلیف منزل (با امضای اولیا)' },
  speedDrill: { en: 'Speed Drill (Timed)', fa: 'آزمون سرعتی و زمان‌دار' },
  mathGraphPaper: { en: 'Math Graph Paper (5mm Grid)', fa: 'کاغذ شطرنجی ریاضی (برای تراز ارقام)' },
  ruledLines: { en: 'Ruled Notebook Lines', fa: 'خط‌دار دفترچه‌ای' },
  dotMatrix: { en: 'Dot Matrix Grid', fa: 'شبکه نقطه‌ای مدرن' },
  cleanBlank: { en: 'Clean Blank Box', fa: 'کادر سفید ساده' },
  twoColumnLayout: { en: '2-Column Compact Layout', fa: 'چیدمان دو ستونه (فشرده)' },
  appendAnswerKey: { en: 'Append Teacher Answer Key (Separate Page)', fa: 'پیوست پاسخ‌نامه تشریحی (صفحه مجزا)' },
  insertFromBank: { en: 'Insert from Question Bank', fa: 'افزودن از بانک سوالات' },
  insertGenerated: { en: 'Insert 2 Generated Problems', fa: 'تولید و افزودن ۲ سوال جدید' },
  createCustom: { en: 'Create Custom Question', fa: 'طراحی سوال اختصاصی' },
  printSavePdf: { en: 'Print / Save PDF', fa: 'چاپ مستقیم / ذخیره PDF' },
  configureItems: { en: 'Configure Items', fa: 'مدیریت و چینش سوالات' },
  interactiveSheet: { en: 'Interactive Sheet', fa: 'پیش‌نمایش زنده برگه' },
  totalScore: { en: 'Total Score', fa: 'نمره کل' },
  points: { en: 'pts', fa: 'نمره' },
  workspaceLabel: { en: 'Workspace / Scratchwork:', fa: 'محل محاسبات و چرک‌نویس:' },
  answerLabel: { en: 'Answer:', fa: 'پاسخ نهایی:' },
  teacherNote: { en: 'Teacher Note:', fa: 'یادداشت آموزگار:' },
  directions: { en: 'Directions:', fa: 'راهنما:' },
  nameLabel: { en: 'Name:', fa: 'نام و نام خانوادگی:' },
  dateLabel: { en: 'Date:', fa: 'تاریخ:' },

  // Practice & Generator
  submitAnswer: { en: 'Submit Answer', fa: 'ثبت و بررسی پاسخ' },
  generateSimilar: { en: 'Generate Similar', fa: 'تولید سوال مشابه' },
  needAHint: { en: 'Need a Hint?', fa: 'نیاز به راهنمایی دارم' },
  hideHint: { en: 'Hide Hint', fa: 'مخفی کردن راهنما' },
  viewFullSolution: { en: 'View Full Solution', fa: 'مشاهده پاسخ تشریحی' },
  hideSolution: { en: 'Hide Solution', fa: 'مخفی کردن پاسخ تشریحی' },
  stepByStepSolution: { en: 'Step-by-Step Solution:', fa: 'روش حل گام‌به‌گام:' },
  correctFeedback: { en: 'Correct! Excellent mathematical reasoning.', fa: 'آفرین! پاسخ شما کاملاً درست و دقیق است.' },
  incorrectFeedback: { en: 'Not quite. Check your calculation or view the hint.', fa: 'پاسخ درست نیست. محاسبه را بازبینی کنید یا راهنما را ببینید.' },
  rollNewNumbers: { en: 'Roll New Numbers', fa: 'تولید اعداد جدید' },
  addToWorksheet: { en: 'Add to Worksheet', fa: 'افزودن به کاربرگ' },
  addedToast: { en: '✓ Added to Worksheet Studio', fa: '✓ به کاربرگ اضافه شد' },
};

export function t(key: string, lang: Language): string {
  const entry = DICTIONARY[key];
  if (!entry) return key;
  return lang === 'fa' ? entry.fa : entry.en;
}
