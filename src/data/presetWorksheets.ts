import { Worksheet, WorksheetVisibility } from '../types/math';
import { getTodayDateStr } from '../utils/numberFormat';
import { getTodayJalali } from '../utils/persian';

export const DEFAULT_VISIBILITY: WorksheetVisibility = {
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

export const PRESET_WORKSHEETS: Worksheet[] = [
  {
    id: 'preset_topic_1',
    title: 'Topic 1 Assessment: Place Value & Rounding',
    schoolName: 'Lincoln Elementary School',
    grade: 'Grade 4 Mathematics',
    subject: 'Topic 1: Generalize Place Value Understanding',
    teacherName: 'Mrs. Anderson',
    studentNamePlaceholder: 'Name: _______________________ Date: ____________ Class: _____',
    dateStr: getTodayDateStr(),
    durationMinutes: 45,
    totalScore: 20,
    instructions: 'Read each question carefully. Show your work in the space provided. Write your final answer clearly in the designated answer box.',
    teacherNote: 'Points awarded for clear scratchwork, correct place-value reasoning, and accurate rounding benchmarks.',
    layout: 'standard_test',
    paperGrid: 'grid',
    paperFont: 'sans',
    paperSize: 'a4',
    crest: 'crest',
    gradingRubric: true,
    showAnswerKey: true,
    twoColumns: false,
    mascot: 'fox',
    watermarkText: '',
    visibility: DEFAULT_VISIBILITY,
    createdDate: new Date().toISOString(),
    items: [
      {
        id: 'item_1_1',
        sourceType: 'original',
        prompt: 'What is the relationship between the 6s in 675,002 and 385,621? Explain using place-value positions and multiplication.',
        answer: '1,000 times as great (600,000 = 600 × 1,000)',
        solutionSteps: [
          'Value of 6 in 675,002 is 600,000 (hundred thousands place).',
          'Value of 6 in 385,621 is 600 (hundreds place).',
          '600,000 ÷ 600 = 1,000 times as great.'
        ],
        score: 4,
        allocatedSpaceLines: 4
      },
      {
        id: 'item_1_2',
        sourceType: 'original',
        prompt: 'A number in expanded form is written as the sum of each digit value. Write 39,005 in expanded form.',
        answer: '30,000 + 9,000 + 5',
        solutionSteps: ['3 in ten thousands = 30,000; 9 in thousands = 9,000; 5 in ones = 5.'],
        score: 3,
        allocatedSpaceLines: 3
      },
      {
        id: 'item_1_3',
        sourceType: 'original',
        prompt: 'Round 117,821 to the nearest thousand and 160,656 to the nearest ten thousand. Show the halfway benchmarks.',
        answer: '117,821 rounds to 118,000; 160,656 rounds to 160,000',
        solutionSteps: [
          '117,821: Hundreds digit is 8 (≥ 5) -> rounds up to 118,000.',
          '160,656: Thousands digit is 0 (< 5) -> rounds down to 160,000.'
        ],
        score: 4,
        allocatedSpaceLines: 4
      },
      {
        id: 'item_1_4',
        sourceType: 'original',
        prompt: 'Celia writes: 8,157 + 364 and 8,157 + 519. She says she can tell which sum will be greater without adding. Explain how Celia knows and write a comparison using > or <.',
        answer: '8,157 + 519 > 8,157 + 364 because 8,157 is common and 519 > 364',
        solutionSteps: [
          'Both expressions have 8,157 as a common addend.',
          'Compare the remaining addends: 519 > 364.',
          'Therefore: 8,157 + 519 > 8,157 + 364.'
        ],
        score: 4,
        allocatedSpaceLines: 4
      },
      {
        id: 'item_1_5',
        sourceType: 'original',
        prompt: 'Flight Distances: Chicago to Istanbul is 5,784 miles, and Chicago to Sao Paulo is 5,252 miles. Lee conjectured that both distances are the same when rounded to the nearest thousand. Is Lee\'s conjecture true? Justify your answer.',
        answer: 'False; Istanbul rounds to 6,000 miles while Sao Paulo rounds to 5,000 miles',
        solutionSteps: [
          '5,784 rounds to 6,000 miles (hundreds digit 7 ≥ 5).',
          '5,252 rounds to 5,000 miles (hundreds digit 2 < 5).',
          '6,000 ≠ 5,000, so the conjecture is false.'
        ],
        score: 5,
        allocatedSpaceLines: 4
      }
    ]
  },
  {
    id: 'preset_topic_2',
    title: 'Topic 2 Mastery Test: Subtraction Across Zeros & Multi-Step Problems',
    schoolName: 'Lincoln Elementary School',
    grade: 'Grade 4 Mathematics',
    subject: 'Topic 2: Multi-Digit Addition & Subtraction',
    teacherName: 'Mrs. Anderson',
    studentNamePlaceholder: 'Name: _______________________ Date: ____________ Class: _____',
    dateStr: getTodayDateStr(),
    durationMinutes: 50,
    totalScore: 20,
    instructions: 'Show full regrouping and borrowing chains clearly above numbers. Do not erase scratchwork.',
    teacherNote: 'Mastery of chain borrowing across consecutive zeros is assessed in question 1.',
    layout: 'standard_test',
    paperGrid: 'grid',
    paperFont: 'sans',
    paperSize: 'a4',
    crest: 'crest',
    gradingRubric: true,
    showAnswerKey: true,
    twoColumns: false,
    mascot: 'fox',
    watermarkText: '',
    visibility: DEFAULT_VISIBILITY,
    createdDate: new Date().toISOString(),
    items: [
      {
        id: 'item_2_1',
        sourceType: 'original',
        prompt: 'Use the standard vertical algorithm to compute: 700,402 - 297,354. Clearly show all chain regrouping above the top number.',
        answer: '403,048',
        solutionSteps: [
          'Regroup from 4 in hundreds: 4 -> 3; tens -> 9; ones -> 12. (12 - 4 = 8; 9 - 5 = 4; 3 - 3 = 0).',
          'Regroup from 7 in hundred thousands: 7 -> 6; ten thousands -> 9; thousands -> 10. (10 - 7 = 3; 9 - 9 = 0; 6 - 2 = 4).',
          'Final difference = 403,048.'
        ],
        score: 5,
        allocatedSpaceLines: 6
      },
      {
        id: 'item_2_2',
        sourceType: 'original',
        prompt: 'Use mental math compensation to find 9,125 - 7,985. Explain why 15 is added to BOTH numbers.',
        answer: '1,140 (by transforming into 9,140 - 8,000)',
        solutionSteps: [
          'In subtraction, adding the same quantity to both numbers preserves the constant difference.',
          '7,985 + 15 = 8,000; 9,125 + 15 = 9,140.',
          '9,140 - 8,000 = 1,140.'
        ],
        score: 4,
        allocatedSpaceLines: 4
      },
      {
        id: 'item_2_3',
        sourceType: 'original',
        prompt: 'Mitch calculated: 657,392 - 434,597 = 222,895. What mistake did Mitch make in the hundreds place? What is the correct answer?',
        answer: 'Correct answer is 222,795; Mitch forgot that 3 hundreds was reduced to 2 by borrowing',
        solutionSteps: [
          'Tens borrowed from hundreds, diminishing 3 to 2.',
          'Borrowing from thousands makes it 12 - 5 = 7 (Mitch wrote 8).',
          'Difference = 222,795.'
        ],
        score: 4,
        allocatedSpaceLines: 4
      },
      {
        id: 'item_2_4',
        sourceType: 'original',
        prompt: 'A shipping company delivered 38,728 letters and 41,584 packages. How many total items did the company deliver? Use the vertical addition algorithm.',
        answer: '80,312 items',
        solutionSteps: ['38,728 + 41,584 = 80,312 with 4 consecutive regrouping carries.'],
        score: 3,
        allocatedSpaceLines: 5
      },
      {
        id: 'item_2_5',
        sourceType: 'original',
        prompt: 'The Amazon River is 6,400 km long, Lower Tunguska is 2,989 km, and Ganges is 2,620 km. How much longer is the Amazon River than the Lower Tunguska and Ganges combined?',
        answer: '791 km longer',
        solutionSteps: [
          'Step 1: Combine two rivers: 2,989 + 2,620 = 5,609 km.',
          'Step 2: Subtract from Amazon: 6,400 - 5,609 = 791 km.'
        ],
        score: 4,
        allocatedSpaceLines: 5
      }
    ]
  }
];

export const PRESET_WORKSHEETS_FA: Worksheet[] = [
  {
    id: 'preset_topic_1_fa',
    title: 'آزمون جامع ارزش مکانی، مقایسه و تقریب اعداد',
    schoolName: 'دبستان هوشمند شکوفه‌های دانش',
    grade: 'پایه چهارم ابتدایی',
    subject: 'فصل اول: ارزش مکانی و الگوها',
    teacherName: 'آموزگار گرامی',
    studentNamePlaceholder: 'نام و نام خانوادگی: .......................................',
    dateStr: getTodayJalali(),
    durationMinutes: 45,
    totalScore: 20,
    instructions: 'دانش‌آموزان عزیز، سوالات را با دقت بخوانید، عملیات را با رسم شکل یا ستونی در کادر مشخص شده بنویسید و پاسخ نهایی را در مربع انتهای سوال یادداشت کنید.',
    teacherNote: 'توجه به نقطه وسط در تقریب و تعیین دقیق ارزش مکانی ارقام ارزیابی می‌شود.',
    layout: 'standard_test',
    paperGrid: 'grid',
    paperFont: 'sans',
    paperSize: 'a4',
    crest: 'crest',
    gradingRubric: true,
    showAnswerKey: true,
    twoColumns: false,
    mascot: 'fox',
    watermarkText: '',
    visibility: DEFAULT_VISIBILITY,
    createdDate: new Date().toISOString(),
    items: [
      {
        id: 'item_1_1_fa',
        sourceType: 'original',
        prompt: 'رابطه بین ارزش رقم‌های ۶ در دو عدد ۶۷۵٬۰۰۲ و ۳۸۵٬۶۲۱ چیست؟ با نوشتن ارزش مکانی هر یک توضیح دهید.',
        answer: '۱۰۰۰ برابر (۶۰۰٬۰۰۰ مساوی است با ۱۰۰۰ × ۶۰۰)',
        solutionSteps: [
          'ارزش ۶ در ۶۷۵٬۰۰۲ برابر ۶۰۰٬۰۰۰ است (صدگان هزار).',
          'ارزش ۶ در ۳۸۵٬۶۲۱ برابر ۶۰۰ است (صدگان).',
          '۶۰۰٬۰۰۰ بر ۶۰۰ تقسیم شود حاصل ۱٬۰۰۰ است.'
        ],
        score: 4,
        allocatedSpaceLines: 4
      },
      {
        id: 'item_1_2_fa',
        sourceType: 'original',
        prompt: 'عدد ۳۹٬۰۰۵ را به صورت گسترده (حاصل‌جمع ارزش مکانی ارقام) بنویسید.',
        answer: '۳۰٬۰۰۰ + ۹٬۰۰۰ + ۵',
        solutionSteps: ['۳۰٬۰۰۰ (دهگان هزار) + ۹٬۰۰۰ (یکان هزار) + ۵ (یکان)'],
        score: 3,
        allocatedSpaceLines: 3
      },
      {
        id: 'item_1_3_fa',
        sourceType: 'original',
        prompt: 'عدد ۱۱۷٬۸۲۱ را به نزدیک‌ترین یکان هزار و عدد ۱۶۰٬۶۵۶ را به نزدیک‌ترین دهگان هزار گرد کنید.',
        answer: '۱۱۷٬۸۲۱ ≈ ۱۱۸٬۰۰۰ و ۱۶۰٬۶۵۶ ≈ ۱۶۰٬۰۰۰',
        solutionSteps: [
          'برای ۱۱۷٬۸۲۱ به رقم صدگان (۸) نگاه می‌کنیم؛ چون ۸ ≥ ۵ است به ۱۱۸٬۰۰۰ گرد می‌شود.',
          'برای ۱۶۰٬۶۵۶ به رقم یکان هزار (۰) نگاه می‌کنیم؛ چون ۰ < ۵ است به ۱۶۰٬۰۰۰ گرد می‌شود.'
        ],
        score: 4,
        allocatedSpaceLines: 4
      },
      {
        id: 'item_1_4_fa',
        sourceType: 'original',
        prompt: 'سلیا می‌گوید می‌تواند بدون انجام دادن جمع بگوید حاصل کدام عبارت بزرگ‌تر است: (۸٬۱۵۷ + ۳۶۴) یا (۸٬۱۵۷ + ۵۱۹). استدلال سلیا را بنویسید و مقایسه را با علامت > یا < نشان دهید.',
        answer: '۸٬۱۵۷ + ۵۱۹ > ۸٬۱۵۷ + ۳۶۴ (چون ۸٬۱۵۷ مشترک است و ۵۱۹ > ۳۶۴)',
        solutionSteps: [
          'مقایسه بدون جمع: عدد اول یکسان است.',
          'مقایسه عدد دوم: ۵۱۹ بزرگ‌تر از ۳۶۴ است.',
          'نتیجه: ۸٬۱۵۷ + ۵۱۹ > ۸٬۱۵۷ + ۳۶۴.'
        ],
        score: 4,
        allocatedSpaceLines: 4
      },
      {
        id: 'item_1_5_fa',
        sourceType: 'original',
        prompt: 'فاصله پرواز شیکاگو تا استانبول ۵٬۷۸۴ مایل و تا سائوپائولو ۵٬۲۵۲ مایل است. «لی» ادعا می‌کند اگر این دو مسافت به نزدیک‌ترین هزار گرد شوند یکسان خواهند بود. درستی یا نادرستی ادعای او را با دلیل بررسی کنید.',
        answer: 'نادرست است؛ استانبول به ۶٬۰۰۰ و سائوپائولو به ۵٬۰۰۰ گرد می‌شود.',
        solutionSteps: [
          'گرد کردن ۵٬۷۸۴ به هزارگان: ۶٬۰۰۰',
          'گرد کردن ۵٬۲۵۲ به هزارگان: ۵٬۰۰۰',
          'چون ۶٬۰۰۰ با ۵٬۰۰۰ برابر نیست، ادعای لی نادرست است.'
        ],
        score: 5,
        allocatedSpaceLines: 4
      }
    ]
  },
  {
    id: 'preset_topic_2_fa',
    title: 'آزمون تخصصی جمع، تفریق اعداد بزرگ و عبور از صفرها',
    schoolName: 'دبستان هوشمند شکوفه‌های دانش',
    grade: 'پایه چهارم ابتدایی',
    subject: 'فصل دوم: جمع و تفریق اعداد چندرقمی',
    teacherName: 'آموزگار گرامی',
    studentNamePlaceholder: 'نام و نام خانوادگی: .......................................',
    dateStr: getTodayJalali(),
    durationMinutes: 50,
    totalScore: 20,
    instructions: 'عملیات ستونی را با نوشتن دقیق ارقام انتقالی و خط زدن صفرها در بازگروه‌بندی انجام دهید.',
    teacherNote: 'نظم در نوشتن ارقام ستونی زیر هم و نشان دادن مراحل قرض گرفتن امتیاز کامل دارد.',
    layout: 'standard_test',
    paperGrid: 'grid',
    paperFont: 'sans',
    paperSize: 'a4',
    crest: 'crest',
    gradingRubric: true,
    showAnswerKey: true,
    twoColumns: false,
    mascot: 'fox',
    watermarkText: '',
    visibility: DEFAULT_VISIBILITY,
    createdDate: new Date().toISOString(),
    items: [
      {
        id: 'item_2_1_fa',
        sourceType: 'original',
        prompt: 'حاصل تفریق ستونی ۷۰۰٬۴۰۲ - ۲۹۷٬۳۵۴ را با نمایش کامل مراحل بازگروه‌بندی از صفرها به دست آورید.',
        answer: '۴۰۳٬۰۴۸',
        solutionSteps: [
          'قرض از ۴ در صدگان: ۴ می‌شود ۳، دهگان ۹، یکان ۱۲ ⟵ ۱۲ - ۴ = ۸ و ۹ - ۵ = ۴ و ۳ - ۳ = ۰',
          'قرض از ۷ در صدگان هزار: ۷ می‌شود ۶، دهگان هزار ۹، یکان هزار ۱۰ ⟵ ۱۰ - ۷ = ۳ و ۹ - ۹ = ۰ و ۶ - ۲ = ۴',
          'حاصل نهایی: ۴۰۳٬۰۴۸'
        ],
        score: 5,
        allocatedSpaceLines: 6
      },
      {
        id: 'item_2_2_fa',
        sourceType: 'original',
        prompt: 'حاصل تفریق ذهنی ۹٬۱۲۵ - ۷٬۹۸۵ را با استفاده از راهبرد تعدیل (Compensation) محاسبه کنید و توضیح دهید چرا به هر دو عدد ۱۵ اضافه می‌کنیم.',
        answer: '۱٬۱۴۰ (با تبدیل به ۹٬۱۴۰ - ۸٬۰۰۰)',
        solutionSteps: [
          'در تفریق برای حفظ فاصله باید به هر دو عدد مقدار مساوی اضافه شود.',
          '۷٬۹۸۵ + ۱۵ = ۸٬۰۰۰',
          '۹٬۱۲۵ + ۱۵ = ۹٬۱۴۰',
          '۹٬۱۴۰ - ۸٬۰۰۰ = ۱٬۱۴۰'
        ],
        score: 4,
        allocatedSpaceLines: 4
      },
      {
        id: 'item_2_3_fa',
        sourceType: 'original',
        prompt: 'میچ برای تفریق ۶۵۷٬۳۹۲ - ۴۳۴٬۵۹۷ حاصل را ۲۲۲٬۸۹۵ اعلام کرد. اشتباه او را در ستون صدگان مشخص کرده و پاسخ درست را بنویسید.',
        answer: 'پاسخ درست ۲۲۲٬۷۹۵ است؛ میچ در قرض گرفتن صدگان اشتباه کرد.',
        solutionSteps: [
          'صدگان ۳ بعد از قرض دادن به دهگان ۲ می‌شود.',
          '۱۲ - ۵ = ۷ است، اما میچ ۸ نوشته بود.',
          'حاصل صحیح: ۲۲۲٬۷۹۵'
        ],
        score: 4,
        allocatedSpaceLines: 4
      },
      {
        id: 'item_2_4_fa',
        sourceType: 'original',
        prompt: 'یک شرکت پستی ۳۸٬۷۲۸ نامه و ۴۱٬۵۸۴ بسته تحویل داد. مجموع کل مرسولات را با جمع ستونی دقیق حساب کنید.',
        answer: '۸۰٬۳۱۲ مرسوله',
        solutionSteps: ['۳۸٬۷۲۸ + ۴۱٬۵۸۴ = ۸۰٬۳۱۲ همراه با ۴ بار انتقال'],
        score: 3,
        allocatedSpaceLines: 5
      },
      {
        id: 'item_2_5_fa',
        sourceType: 'original',
        prompt: 'طول رود آمازون ۶٬۴۰۰ کیلومتر، تونگوسکا ۲٬۹۸۹ کیلومتر و گنگ ۲٬۶۲۰ کیلومتر است. طول رود آمازون چقدر از مجموع دو رود دیگر بیشتر است؟ (حل دو مرحله‌ای)',
        answer: '۷۹۱ کیلومتر',
        solutionSteps: [
          'مجموع دو رود: ۲٬۹۸۹ + ۲٬۶۲۰ = ۵٬۶۰۹ کیلومتر',
          'تفریق از آمازون: ۶٬۴۰۰ - ۵٬۶۰۹ = ۷۹۱ کیلومتر'
        ],
        score: 4,
        allocatedSpaceLines: 5
      }
    ]
  }
];
