import React from 'react';
import { Language } from '../../types/math';
import { 
  GlassWater, 
  Plane, 
  Globe, 
  Ship, 
  Anchor, 
  Leaf, 
  Boxes, 
  Orbit, 
  Rocket, 
  Waves, 
  Fish, 
  Headphones, 
  Music, 
  Utensils, 
  Recycle, 
  Milestone, 
  Footprints, 
  Activity, 
  Sparkles,
  Sun,
  Compass
} from 'lucide-react';

export type IllustrationType = 
  | 'lemonade'
  | 'flights'
  | 'lobsters'
  | 'apples'
  | 'planets'
  | 'oceans'
  | 'music'
  | 'spaghetti'
  | 'recycling'
  | 'highways'
  | 'pedometer';

interface KidFriendlyIllustrationProps {
  type: IllustrationType;
  language?: Language;
}

export const KidFriendlyIllustration: React.FC<KidFriendlyIllustrationProps> = ({
  type,
  language = 'en'
}) => {
  const isFa = language === 'fa';

  switch (type) {
    case 'lemonade':
      return (
        <div className="bg-amber-50/80 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800 rounded-xl p-3 flex items-center justify-between gap-4 my-2 text-xs shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-700 dark:text-amber-300 flex items-center justify-center shrink-0 border border-amber-300 dark:border-amber-700">
              <GlassWater className="w-6 h-6 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <div className="font-bold text-amber-950 dark:text-amber-200 text-xs flex items-center gap-1.5">
                <Sun className="w-3.5 h-3.5 text-amber-500" />
                <span>{isFa ? 'ایستگاه شربت لیموناد خنک تابستانی' : 'Summer Lemonade Stand & Cold Drinks'}</span>
              </div>
              <div className="text-[11px] text-amber-800 dark:text-amber-300 font-medium">
                {isFa ? 'کیم، نیل، لیا و تینو مشغول فروش لیوان‌های شربت هستند.' : 'Kim, Neil, Leah, and Tino are tracking cups of lemonade sold.'}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 font-mono text-[11px] bg-white dark:bg-slate-900 px-2 py-1 rounded-lg border border-amber-300 dark:border-amber-700 text-amber-900 dark:text-amber-300 font-bold shrink-0">
            <span>50</span>•<span>40</span>•<span>20</span>•<span>10</span>
          </div>
        </div>
      );

    case 'flights':
      return (
        <div className="bg-sky-50/80 dark:bg-sky-950/30 border border-sky-300 dark:border-sky-800 rounded-xl p-3 flex items-center justify-between gap-4 my-2 text-xs shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-400/20 text-sky-700 dark:text-sky-300 flex items-center justify-center shrink-0 border border-sky-300 dark:border-sky-700">
              <Plane className="w-6 h-6 text-sky-600 dark:text-sky-400" />
            </div>
            <div>
              <div className="font-bold text-sky-950 dark:text-sky-200 text-xs flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-sky-500" />
                <span>{isFa ? 'مسیرهای پرواز بین‌المللی شیکاگو' : 'International Air Route Navigator'}</span>
              </div>
              <div className="text-[11px] text-sky-800 dark:text-sky-300 font-medium">
                {isFa ? 'مسافت‌های هوایی از مبدأ فرودگاه اوهیر به استانبول، سائوپائولو و پکن' : 'Flight routes from Chicago O\'Hare to Istanbul, Sao Paulo & Beijing.'}
              </div>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono bg-white dark:bg-slate-900 px-2.5 py-1 rounded-lg border border-sky-300 dark:border-sky-700 text-sky-900 dark:text-sky-300 font-bold shrink-0">
            <span>5,784 mi</span>•<span>5,252 mi</span>
          </div>
        </div>
      );

    case 'lobsters':
      return (
        <div className="bg-rose-50/80 dark:bg-rose-950/30 border border-rose-300 dark:border-rose-800 rounded-xl p-3 flex items-center justify-between gap-4 my-2 text-xs shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-400/20 text-rose-700 dark:text-rose-300 flex items-center justify-center shrink-0 border border-rose-300 dark:border-rose-700">
              <Ship className="w-6 h-6 text-rose-600 dark:text-rose-400" />
            </div>
            <div>
              <div className="font-bold text-rose-950 dark:text-rose-200 text-xs flex items-center gap-1.5">
                <Anchor className="w-3.5 h-3.5 text-rose-500" />
                <span>{isFa ? 'قایق صید شاه‌میگوی آب‌های فلوریدا' : 'Florida Spiny Lobster Fishing Vessel'}</span>
              </div>
              <div className="text-[11px] text-rose-800 dark:text-rose-300 font-medium">
                {isFa ? 'ثبت روزانه صید با حد مجاز قانونی ایالتی' : 'Catch metrics across fishing days with state legal limits.'}
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 px-2.5 py-1 rounded-lg border border-rose-300 dark:border-rose-700 text-rose-900 dark:text-rose-300 font-bold text-[10px] font-mono shrink-0">
            Day 1: 176 | Day 2: 215
          </div>
        </div>
      );

    case 'apples':
      return (
        <div className="bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-800 rounded-xl p-3 flex items-center justify-between gap-4 my-2 text-xs shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-400/20 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0 border border-emerald-300 dark:border-emerald-700">
              <Boxes className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <div className="font-bold text-emerald-950 dark:text-emerald-200 text-xs flex items-center gap-1.5">
                <Leaf className="w-3.5 h-3.5 text-emerald-500" />
                <span>{isFa ? 'جعبه‌های برداشت سیب باغدار' : 'Farmer\'s Orchard Apple Crates'}</span>
              </div>
              <div className="text-[11px] text-emerald-800 dark:text-emerald-300 font-medium">
                {isFa ? 'محاسبه سیب‌های قرمز، سیب‌های سبز و بار بازار محلی' : 'Counting red and green apples harvested for the farmers market.'}
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 px-2.5 py-1 rounded-lg border border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-300 font-bold text-[10px] font-mono shrink-0">
            3,978 + 2,504
          </div>
        </div>
      );

    case 'planets':
      return (
        <div className="bg-indigo-50/80 dark:bg-indigo-950/30 border border-indigo-300 dark:border-indigo-800 rounded-xl p-3 flex items-center justify-between gap-4 my-2 text-xs shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-400/20 text-indigo-700 dark:text-indigo-300 flex items-center justify-center shrink-0 border border-indigo-300 dark:border-indigo-700">
              <Orbit className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <div className="font-bold text-indigo-950 dark:text-indigo-200 text-xs flex items-center gap-1.5">
                <Rocket className="w-3.5 h-3.5 text-indigo-500" />
                <span>{isFa ? 'رصدخانه سرعت مداری سیارات منظومه شمسی' : 'Planetary Orbital Speed Observatory'}</span>
              </div>
              <div className="text-[11px] text-indigo-800 dark:text-indigo-300 font-medium">
                {isFa ? 'سرعت گردش زهره، مریخ، زحل و نپتون به دور خورشید' : 'Orbital velocities of Venus, Mars, Saturn, and Neptune.'}
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 px-2.5 py-1 rounded-lg border border-indigo-300 dark:border-indigo-700 text-indigo-900 dark:text-indigo-300 font-bold text-[10px] font-mono shrink-0">
            Venus: 78,341 mph
          </div>
        </div>
      );

    case 'oceans':
      return (
        <div className="bg-teal-50/80 dark:bg-teal-950/30 border border-teal-300 dark:border-teal-800 rounded-xl p-3 flex items-center justify-between gap-4 my-2 text-xs shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-400/20 text-teal-700 dark:text-teal-300 flex items-center justify-center shrink-0 border border-teal-300 dark:border-teal-700">
              <Waves className="w-6 h-6 text-teal-600 dark:text-teal-400" />
            </div>
            <div>
              <div className="font-bold text-teal-950 dark:text-teal-200 text-xs flex items-center gap-1.5">
                <Fish className="w-3.5 h-3.5 text-teal-500" />
                <span>{isFa ? 'کاوشگر پهنه اقیانوس‌های جهان' : 'Global Ocean Floor Survey'}</span>
              </div>
              <div className="text-[11px] text-teal-800 dark:text-teal-300 font-medium">
                {isFa ? 'سنجش و تخمین مساحت اقیانوس‌های آرام، اطلس، هند و منجمد شمالی' : 'Comparative surface areas of Pacific, Atlantic, Indian & Arctic.'}
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 px-2.5 py-1 rounded-lg border border-teal-300 dark:border-teal-700 text-teal-900 dark:text-teal-300 font-bold text-[10px] font-mono shrink-0">
            Pacific: 165,760 sq km
          </div>
        </div>
      );

    case 'music':
      return (
        <div className="bg-purple-50/80 dark:bg-purple-950/30 border border-purple-300 dark:border-purple-800 rounded-xl p-3 flex items-center justify-between gap-4 my-2 text-xs shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-400/20 text-purple-700 dark:text-purple-300 flex items-center justify-center shrink-0 border border-purple-300 dark:border-purple-700">
              <Headphones className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <div className="font-bold text-purple-950 dark:text-purple-200 text-xs flex items-center gap-1.5">
                <Music className="w-3.5 h-3.5 text-purple-500" />
                <span>{isFa ? 'آمار دانلود ترانه‌های برتر' : 'Music Stream & Download Metrics'}</span>
              </div>
              <div className="text-[11px] text-purple-800 dark:text-purple-300 font-medium">
                {isFa ? 'مدل‌سازی تعداد دفعات پخش در چهار روز اول انتشار' : 'Comparing daily streams across launch days 1-4.'}
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 px-2.5 py-1 rounded-lg border border-purple-300 dark:border-purple-700 text-purple-900 dark:text-purple-300 font-bold text-[10px] font-mono shrink-0">
            411,553 vs 377,011
          </div>
        </div>
      );

    case 'spaghetti':
      return (
        <div className="bg-amber-50/80 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800 rounded-xl p-3 flex items-center justify-between gap-4 my-2 text-xs shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-700 dark:text-amber-300 flex items-center justify-center shrink-0 border border-amber-300 dark:border-amber-700">
              <Utensils className="w-6 h-6 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <div className="font-bold text-amber-950 dark:text-amber-200 text-xs flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>{isFa ? 'جشن خیریه ماکارونی مدرسه' : 'Spaghetti Dinner Fundraiser Cartons'}</span>
              </div>
              <div className="text-[11px] text-amber-800 dark:text-amber-300 font-medium">
                {isFa ? '۱۰ کارتن شامل ۸ بسته در هر کارتن' : '10 cases containing 8 boxes each for the charity event.'}
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 px-2.5 py-1 rounded-lg border border-amber-300 dark:border-amber-700 text-amber-900 dark:text-amber-300 font-bold text-[10px] font-mono shrink-0">
            10 × 8 = 80 boxes
          </div>
        </div>
      );

    case 'recycling':
      return (
        <div className="bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-800 rounded-xl p-3 flex items-center justify-between gap-4 my-2 text-xs shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-400/20 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0 border border-emerald-300 dark:border-emerald-700">
              <Recycle className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <div className="font-bold text-emerald-950 dark:text-emerald-200 text-xs flex items-center gap-1.5">
                <Leaf className="w-3.5 h-3.5 text-emerald-500" />
                <span>{isFa ? 'پویش بازیافت قوطی‌های انجمن محیط زیست' : 'Eco-Club Can Recycling Depot'}</span>
              </div>
              <div className="text-[11px] text-emerald-800 dark:text-emerald-300 font-medium">
                {isFa ? 'جمع‌آوری ۹٬۵۲۵ قوطی بازیافتی برای حفظ زمین' : 'Target goal to collect 9,525 cans across 4 months.'}
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 px-2.5 py-1 rounded-lg border border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-300 font-bold text-[10px] font-mono shrink-0">
            Target: 9,525 cans
          </div>
        </div>
      );

    case 'highways':
      return (
        <div className="bg-blue-50/80 dark:bg-blue-950/30 border border-blue-300 dark:border-blue-800 rounded-xl p-3 flex items-center justify-between gap-4 my-2 text-xs shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-400/20 text-blue-700 dark:text-blue-300 flex items-center justify-center shrink-0 border border-blue-300 dark:border-blue-700">
              <Milestone className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <div className="font-bold text-blue-950 dark:text-blue-200 text-xs flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-blue-500" />
                <span>{isFa ? 'نقشه بزرگراه‌های بین‌شهری سراسری' : 'Interstate Highway Coast-to-Coast Map'}</span>
              </div>
              <div className="text-[11px] text-blue-800 dark:text-blue-300 font-medium">
                {isFa ? 'مسافت‌های بزرگراه‌های I-90، I-10، I-70 و I-80' : 'Total distances of routes I-90, I-10, I-70, and I-80.'}
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 px-2.5 py-1 rounded-lg border border-blue-300 dark:border-blue-700 text-blue-900 dark:text-blue-300 font-bold text-[10px] font-mono shrink-0">
            Total: 10,614 miles
          </div>
        </div>
      );

    case 'pedometer':
      return (
        <div className="bg-orange-50/80 dark:bg-orange-950/30 border border-orange-300 dark:border-orange-800 rounded-xl p-3 flex items-center justify-between gap-4 my-2 text-xs shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-400/20 text-orange-700 dark:text-orange-300 flex items-center justify-center shrink-0 border border-orange-300 dark:border-orange-700">
              <Activity className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <div className="font-bold text-orange-950 dark:text-orange-200 text-xs flex items-center gap-1.5">
                <Footprints className="w-3.5 h-3.5 text-orange-500" />
                <span>{isFa ? 'قدم‌شمار هوشمند ورزشی نعیما' : 'Naima\'s Fitness Step Counter'}</span>
              </div>
              <div className="text-[11px] text-orange-800 dark:text-orange-300 font-medium">
                {isFa ? 'هدف هفتگی ۸۸٬۹۴۲ قدم و گام‌های باقی‌مانده' : 'Walking towards the goal of 88,942 steps.'}
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 px-2.5 py-1 rounded-lg border border-orange-300 dark:border-orange-700 text-orange-900 dark:text-orange-300 font-bold text-[10px] font-mono shrink-0">
            88,942 - 43,498
          </div>
        </div>
      );

    default:
      return null;
  }
};

export function getIllustrationForQuestion(questionId: string): IllustrationType | null {
  if (questionId.includes('lemonade')) return 'lemonade';
  if (questionId.includes('flights')) return 'flights';
  if (questionId.includes('lobster')) return 'lobsters';
  if (questionId.includes('apple')) return 'apples';
  if (questionId.includes('planet') || questionId.includes('saturn')) return 'planets';
  if (questionId.includes('ocean')) return 'oceans';
  if (questionId.includes('song')) return 'music';
  if (questionId.includes('spaghetti')) return 'spaghetti';
  if (questionId.includes('can')) return 'recycling';
  if (questionId.includes('highway')) return 'highways';
  if (questionId.includes('pedometer')) return 'pedometer';
  return null;
}
