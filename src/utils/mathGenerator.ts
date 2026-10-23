import { Question, GeneratedQuestion, VisualModelConfig, Language } from '../types/math';
import { formatNumber, numberToWords } from './numberFormat';
import { toPersianDigits, formatPersianNumber, numberToWordsPersian } from './persian';
import { formatDisplayNumber } from './i18n';

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function choice<T>(items: readonly T[]): T {
  const idx = Math.floor(Math.random() * items.length);
  return items[idx] as T;
}

export function generateSimilarQuestion(original: Question, lang: Language = 'en'): GeneratedQuestion {
  const isFa = lang === 'fa';
  const genId = original.generatorId;

  switch (genId) {
    case 'gen_place_value_relation': {
      const digit = randomInt(3, 9);
      const highPlace = choice(['hundred_thousands', 'ten_thousands']);
      const lowPlace = highPlace === 'hundred_thousands' ? 'hundreds' : 'tens';
      const highMultiplier = highPlace === 'hundred_thousands' ? 100000 : 10000;
      const lowMultiplier = lowPlace === 'hundreds' ? 100 : 10;
      const ratio = highMultiplier / lowMultiplier;

      const num1 = digit * highMultiplier + randomInt(1000, 9999);
      const num2 = randomInt(1, 9) * 100000 + digit * lowMultiplier + randomInt(1, 9);

      const highName = highPlace === 'hundred_thousands' ? 'hundred thousands' : 'ten thousands';
      const lowName = lowPlace === 'hundreds' ? 'hundreds' : 'tens';
      const highNameFa = highPlace === 'hundred_thousands' ? 'صدگان هزار' : 'دهگان هزار';
      const lowNameFa = lowPlace === 'hundreds' ? 'صدگان' : 'دهگان';

      const prompt = isFa
        ? `رابطه بین ارزش رقم‌های ${toPersianDigits(digit)} در دو عدد ${formatPersianNumber(num1)} و ${formatPersianNumber(num2)} چیست؟`
        : `What is the relationship between the ${digit}s in ${formatNumber(num1)} and ${formatNumber(num2)}?`;

      const correctAnswer = isFa
        ? `${formatPersianNumber(ratio)} برابر`
        : `${formatNumber(ratio)} times as great`;

      const options = isFa
        ? [
            `${formatPersianNumber(ratio / 10)} برابر`,
            `${formatPersianNumber(ratio)} برابر`,
            `${formatPersianNumber(ratio * 10)} برابر`,
            `${formatPersianNumber(ratio * 100)} برابر`
          ]
        : [
            `${formatNumber(ratio / 10)} times as great`,
            `${formatNumber(ratio)} times as great`,
            `${formatNumber(ratio * 10)} times as great`,
            `${formatNumber(ratio * 100)} times as great`
          ];

      return {
        originalId: original.id,
        prompt,
        correctAnswer,
        options,
        difficulty: original.difficulty,
        visualModel: {
          type: 'place_value_chart',
          title: isFa ? `جدول ارزش مکانی برای ${formatPersianNumber(num1)}` : `Place Value Chart for ${formatNumber(num1)}`,
          data: { kind: 'place_value', number: num1, highlightedPlace: highPlace }
        },
        explanation: isFa
          ? `در عدد اول رقم ${toPersianDigits(digit)} در مرتبه ${highNameFa} است (ارزش: ${formatPersianNumber(digit * highMultiplier)}) و در عدد دوم در مرتبه ${lowNameFa} است (ارزش: ${formatPersianNumber(digit * lowMultiplier)}). نسبت ارزش این دو رقم برابر با ${formatPersianNumber(ratio)} است.`
          : `In the first number, the digit ${digit} is in the ${highName} place (value: ${formatNumber(digit * highMultiplier)}). In the second number, it is in the ${lowName} place (value: ${formatNumber(digit * lowMultiplier)}). Dividing these values gives ${formatNumber(ratio)} times as great.`,
        solutionSteps: isFa
          ? [
              `گام ۱: ارزش ${toPersianDigits(digit)} در ${formatPersianNumber(num1)} برابر است با ${formatPersianNumber(digit * highMultiplier)} (${highNameFa}).`,
              `گام ۲: ارزش ${toPersianDigits(digit)} در ${formatPersianNumber(num2)} برابر است با ${formatPersianNumber(digit * lowMultiplier)} (${lowNameFa}).`,
              `گام ۳: ${formatPersianNumber(digit * highMultiplier)} ÷ ${formatPersianNumber(digit * lowMultiplier)} = ${formatPersianNumber(ratio)} برابر.`
            ]
          : [
              `Step 1: Value of ${digit} in ${formatNumber(num1)} = ${formatNumber(digit * highMultiplier)} (${highName} place).`,
              `Step 2: Value of ${digit} in ${formatNumber(num2)} = ${formatNumber(digit * lowMultiplier)} (${lowName} place).`,
              `Step 3: ${formatNumber(digit * highMultiplier)} ÷ ${formatNumber(digit * lowMultiplier)} = ${formatNumber(ratio)} times as great.`
            ]
      };
    }

    case 'gen_repeated_digits': {
      const d = randomInt(3, 8);
      const num = d * 111111;
      const prompt = isFa
        ? `ارزش هر یک از رقم‌های ${toPersianDigits(d)} را در عدد ${formatPersianNumber(num)} از چپ به راست بنویسید.`
        : `Name the value of each ${d} in ${formatNumber(num)} from left to right.`;

      const vals = [
        formatDisplayNumber(d * 100000, lang),
        formatDisplayNumber(d * 10000, lang),
        formatDisplayNumber(d * 1000, lang),
        formatDisplayNumber(d * 100, lang),
        formatDisplayNumber(d * 10, lang),
        formatDisplayNumber(d, lang)
      ];
      const correctAnswer = isFa ? vals.join(' و ') : vals.join('; ');
      const placeNames = isFa 
        ? ['صدگان هزار', 'دهگان هزار', 'یکان هزار', 'صدگان', 'دهگان', 'یکان']
        : ['Hundred Thousands', 'Ten Thousands', 'Thousands', 'Hundreds', 'Tens', 'Ones'];

      return {
        originalId: original.id,
        prompt,
        correctAnswer,
        difficulty: original.difficulty,
        visualModel: {
          type: 'place_value_chart',
          title: isFa ? `تحلیل مراتب عدد ${formatPersianNumber(num)}` : `Decomposing ${formatNumber(num)} by Place Value`,
          data: { kind: 'place_value', number: num }
        },
        explanation: isFa
          ? `ارزش ارقام از چپ به راست: صدگان هزار (${vals[0]})، دهگان هزار (${vals[1]})، یکان هزار (${vals[2]})، صدگان (${vals[3]})، دهگان (${vals[4]}) و یکان (${vals[5]}).`
          : `From left to right across the periods: hundred thousands (${vals[0]}), ten thousands (${vals[1]}), thousands (${vals[2]}), hundreds (${vals[3]}), tens (${vals[4]}), and ones (${vals[5]}).`,
        solutionSteps: vals.map((v, idx) => `${placeNames[idx]}: ${v}`)
      };
    }

    case 'gen_rounding_thousands': {
      const baseThousands = randomInt(12, 85) * 1000;
      const offset = randomInt(112, 988);
      const num = baseThousands + offset;
      const rounded = offset >= 500 ? baseThousands + 1000 : baseThousands;
      const prompt = isFa
        ? `عدد ${formatPersianNumber(num)} را به نزدیک‌ترین یکان هزار گرد کنید.`
        : `Round ${formatNumber(num)} to the nearest thousand.`;
      const correctAnswer = formatDisplayNumber(rounded, lang);

      const vm: VisualModelConfig = {
        type: 'number_line',
        title: isFa ? `محور اعداد برای گرد کردن ${formatPersianNumber(num)}` : `Number Line for ${formatNumber(num)}`,
        data: {
          kind: 'number_line',
          min: baseThousands,
          max: baseThousands + 1000,
          target: num,
          step: 100,
          roundedTo: rounded
        }
      };

      return {
        originalId: original.id,
        prompt,
        correctAnswer,
        difficulty: original.difficulty,
        visualModel: vm,
        explanation: isFa
          ? `برای گرد کردن به یکان هزار، به رقم صدگان نگاه می‌کنیم. رقم صدگان عدد ${formatPersianNumber(num)} برابر با ${toPersianDigits(Math.floor((num % 1000) / 100))} است. چون این رقم ${offset >= 500 ? 'بزرگ‌تر یا مساوی ۵ است، به سمت بالا' : 'کمتر از ۵ است، به سمت پایین'} گرد می‌شود ⟵ ${correctAnswer}.`
          : `To round to the nearest thousand, inspect the hundreds digit. The hundreds digit of ${formatNumber(num)} is ${Math.floor((num % 1000) / 100)}. Since it is ${offset >= 500 ? '5 or greater, round up' : 'less than 5, round down'} to ${correctAnswer}.`,
        solutionSteps: isFa
          ? [
              `مرتبه تقریب: یکان هزار (${formatPersianNumber(baseThousands)}).`,
              `بررسی رقم صدگان: ${toPersianDigits(Math.floor((num % 1000) / 100))}.`,
              `نتیجه نهایی: ${correctAnswer}.`
            ]
          : [
              `Locate thousands place: ${formatNumber(baseThousands)}.`,
              `Inspect hundreds place: digit is ${Math.floor((num % 1000) / 100)}.`,
              `Apply rule of 5 -> rounded answer is ${correctAnswer}.`
            ]
      };
    }

    case 'gen_rounding_ten_thousands': {
      const baseTenThou = randomInt(14, 75) * 10000;
      const offset = randomInt(1200, 9800);
      const num = baseTenThou + offset;
      const rounded = offset >= 5000 ? baseTenThou + 10000 : baseTenThou;
      const prompt = isFa
        ? `عدد ${formatPersianNumber(num)} را به نزدیک‌ترین دهگان هزار گرد کنید.`
        : `Round ${formatNumber(num)} to the nearest ten thousand.`;
      const correctAnswer = formatDisplayNumber(rounded, lang);

      return {
        originalId: original.id,
        prompt,
        correctAnswer,
        difficulty: original.difficulty,
        visualModel: {
          type: 'number_line',
          title: isFa ? `محور اعداد برای ${formatPersianNumber(num)}` : `Number Line for ${formatNumber(num)}`,
          data: {
            kind: 'number_line',
            min: baseTenThou,
            max: baseTenThou + 10000,
            target: num,
            step: 1000,
            roundedTo: rounded
          }
        },
        explanation: isFa
          ? `رقم یکان هزار در عدد ${formatPersianNumber(num)} برابر با ${toPersianDigits(Math.floor((num % 10000) / 1000))} است. پس عدد به ${correctAnswer} گرد می‌شود.`
          : `The digit to the right of the ten thousands place is the thousands digit (${Math.floor((num % 10000) / 1000)}). Rounding yields ${correctAnswer}.`,
        solutionSteps: isFa
          ? [
              `مرتبه تقریب: دهگان هزار`,
              `رقم سمت راست (یکان هزار): ${toPersianDigits(Math.floor((num % 10000) / 1000))}`,
              `حاصل تقریب: ${correctAnswer}`
            ]
          : [
              `Rounding place: ten thousands.`,
              `Next digit to right: ${Math.floor((num % 10000) / 1000)} (thousands place).`,
              `Result: ${correctAnswer}.`
            ]
      };
    }

    case 'gen_expanded_form': {
      const d4 = randomInt(2, 8);
      const d3 = randomInt(1, 9);
      const d0 = randomInt(1, 9);
      const num = d4 * 10000 + d3 * 1000 + d0;
      const prompt = isFa
        ? `عدد ${formatPersianNumber(num)} را به صورت گسترده (حاصل‌جمع ارزش مکانی ارقام) بنویسید.`
        : `Write ${formatNumber(num)} in expanded form (as the sum of the value of each digit).`;
      const correctAnswer = `${formatDisplayNumber(d4 * 10000, lang)} + ${formatDisplayNumber(d3 * 1000, lang)} + ${formatDisplayNumber(d0, lang)}`;
      return {
        originalId: original.id,
        prompt,
        correctAnswer,
        difficulty: original.difficulty,
        explanation: isFa
          ? `ارزش رقم ${toPersianDigits(d4)} در دهگان هزار: ${formatPersianNumber(d4 * 10000)}، ارزش رقم ${toPersianDigits(d3)} در یکان هزار: ${formatPersianNumber(d3 * 1000)}، و رقم یکان: ${formatPersianNumber(d0)}.`
          : `The 10,000s digit is worth ${formatNumber(d4 * 10000)}, the 1,000s digit is worth ${formatNumber(d3 * 1000)}, and the ones digit is worth ${formatNumber(d0)}.`,
        solutionSteps: isFa
          ? [
              `ارزش رقم در دهگان هزار: ${formatPersianNumber(d4 * 10000)}`,
              `ارزش رقم در یکان هزار: ${formatPersianNumber(d3 * 1000)}`,
              `ارزش رقم در یکان: ${formatPersianNumber(d0)}`,
              `حاصل گسترده: ${correctAnswer}`
            ]
          : [
              `Ten thousands place: ${formatNumber(d4 * 10000)}`,
              `Thousands place: ${formatNumber(d3 * 1000)}`,
              `Ones place: ${formatNumber(d0)}`,
              `Sum: ${correctAnswer}`
            ]
      };
    }

    case 'gen_mental_add_comp': {
      const base = randomInt(2, 6) * 1000;
      const delta = choice([18, 25, 32, 45, 64, 75, 82]);
      const n1 = base - delta;
      const n2 = randomInt(12, 35) * 100 + randomInt(10, 90);
      const sum = n1 + n2;

      const prompt = isFa
        ? `حاصل جمع ${formatPersianNumber(n1)} + ${formatPersianNumber(n2)} را با استفاده از راهبرد تعدیل (Compensation) به صورت ذهنی به دست آورید.`
        : `Use mental math compensation to find the sum: ${formatNumber(n1)} + ${formatNumber(n2)}.`;
      const correctAnswer = formatDisplayNumber(sum, lang);

      return {
        originalId: original.id,
        prompt,
        correctAnswer,
        difficulty: original.difficulty,
        explanation: isFa
          ? `به عدد ${formatPersianNumber(n1)} مقدار ${toPersianDigits(delta)} اضافه می‌کنیم تا به ${formatPersianNumber(base)} سرراست تبدیل شود و از عدد دوم ${toPersianDigits(delta)} کم می‌کنیم: (${formatPersianNumber(base)}) + (${formatPersianNumber(n2 - delta)}) = ${correctAnswer}.`
          : `Add ${delta} to ${formatNumber(n1)} to make a friendly ${formatNumber(base)}, and subtract ${delta} from ${formatNumber(n2)} to get ${formatNumber(n2 - delta)}. Then: ${formatNumber(base)} + ${formatNumber(n2 - delta)} = ${correctAnswer}.`,
        solutionSteps: isFa
          ? [
              `افزودن ${toPersianDigits(delta)} به عدد اول: ${formatPersianNumber(n1)} + ${toPersianDigits(delta)} = ${formatPersianNumber(base)}.`,
              `کاستن ${toPersianDigits(delta)} از عدد دوم: ${formatPersianNumber(n2)} - ${toPersianDigits(delta)} = ${formatPersianNumber(n2 - delta)}.`,
              `محاسبه جمع ساده: ${formatPersianNumber(base)} + ${formatPersianNumber(n2 - delta)} = ${correctAnswer}.`
            ]
          : [
              `Add ${delta} to first addend: ${formatNumber(n1)} + ${delta} = ${formatNumber(base)}.`,
              `Subtract ${delta} from second addend: ${formatNumber(n2)} - ${delta} = ${formatNumber(n2 - delta)}.`,
              `Add friendly numbers: ${formatNumber(base)} + ${formatNumber(n2 - delta)} = ${correctAnswer}.`
            ]
      };
    }

    case 'gen_mental_sub_comp': {
      const base = randomInt(4, 9) * 1000;
      const delta = choice([12, 15, 24, 35, 48, 65]);
      const n2 = base - delta;
      const n1 = base + randomInt(1100, 2400);
      const diff = n1 - n2;

      const prompt = isFa
        ? `حاصل تفریق ${formatPersianNumber(n1)} - ${formatPersianNumber(n2)} را با استفاده از روش تعدیل به صورت ذهنی محاسبه کنید.`
        : `Use mental math compensation to find the difference: ${formatNumber(n1)} - ${formatNumber(n2)}.`;
      const correctAnswer = formatDisplayNumber(diff, lang);

      return {
        originalId: original.id,
        prompt,
        correctAnswer,
        difficulty: original.difficulty,
        explanation: isFa
          ? `در تفریق به هر دو عدد مقدار مساوی (${toPersianDigits(delta)}) اضافه می‌کنیم تا فاصله حفظ شود: (${formatPersianNumber(n1 + delta)}) - (${formatPersianNumber(base)}) = ${correctAnswer}.`
          : `In subtraction, add the same amount (${delta}) to both numbers to preserve the difference: (${formatNumber(n1 + delta)}) - (${formatNumber(base)}) = ${correctAnswer}.`,
        solutionSteps: isFa
          ? [
              `افزودن ${toPersianDigits(delta)} به عدد دوم: ${formatPersianNumber(n2)} + ${toPersianDigits(delta)} = ${formatPersianNumber(base)}.`,
              `افزودن همان مقدار به عدد اول: ${formatPersianNumber(n1)} + ${toPersianDigits(delta)} = ${formatPersianNumber(n1 + delta)}.`,
              `تفریق سریع ذهنی: ${formatPersianNumber(n1 + delta)} - ${formatPersianNumber(base)} = ${correctAnswer}.`
            ]
          : [
              `Add ${delta} to subtrahend: ${formatNumber(n2)} + ${delta} = ${formatNumber(base)}.`,
              `Add ${delta} to minuend: ${formatNumber(n1)} + ${delta} = ${formatNumber(n1 + delta)}.`,
              `Subtract mentally: ${formatNumber(n1 + delta)} - ${formatNumber(base)} = ${correctAnswer}.`
            ]
      };
    }

    case 'gen_across_zeros': {
      const hundredsThousands = randomInt(4, 8);
      const middleZeros = choice([true, false]);
      const num1 = middleZeros 
        ? hundredsThousands * 100000 + randomInt(2, 6) * 100 + randomInt(2, 5)
        : hundredsThousands * 100000 + randomInt(1, 9);
      const num2 = randomInt(1, hundredsThousands - 1) * 100000 + randomInt(10000, 99999);
      const diff = num1 - num2;

      const prompt = isFa
        ? `حاصل تفریق ستونی ${formatPersianNumber(num1)} - ${formatPersianNumber(num2)} را با عبور از صفرهای متوالی به دست آورید.`
        : `Subtract across zeros using the standard algorithm: ${formatNumber(num1)} - ${formatNumber(num2)}.`;
      const correctAnswer = formatDisplayNumber(diff, lang);

      return {
        originalId: original.id,
        prompt,
        correctAnswer,
        difficulty: original.difficulty,
        visualModel: {
          type: 'vertical_subtraction',
          title: isFa ? `تفریق زنجیره‌ای از صفرها: ${formatPersianNumber(num1)} - ${formatPersianNumber(num2)}` : `Subtracting Across Zeros: ${formatNumber(num1)} - ${formatNumber(num2)}`,
          data: { kind: 'vertical_op', op: '-', num1, num2 }
        },
        explanation: isFa
          ? `با استفاده از بازگروه‌بندی زنجیره‌ای از بالاترین رقم سمت چپ، صفرهای میانی به ۹ تبدیل شده و تفریق ستون به ستون انجام می‌شود.`
          : `Regroup from the non-zero place value on the left (${hundredsThousands} hundred thousands). Intermediate zeros become 9s, and the final place receives the 10 units needed for column subtraction.`,
        solutionSteps: isFa
          ? [
              `قرض گرفتن زنجیره‌ای از اولین رقم غیرصفر در سمت چپ (${toPersianDigits(hundredsThousands)}).`,
              `تبدیل صفرهای میانی به ۹ و رقم آخر به ۱۰.`,
              `انجام تفریق در تمام ستون‌ها ⟵ حاصل نهایی: ${correctAnswer}.`
            ]
          : [
              `Borrow across consecutive zeros starting from ${hundredsThousands} hundred thousands.`,
              `Intermediate zeros become 9; the target place value receives 10.`,
              `Perform column-by-column subtraction -> Difference = ${correctAnswer}.`
            ]
      };
    }

    case 'gen_apples_two_step': {
      const red = randomInt(2400, 4800);
      const green = randomInt(1500, 3200);
      const total = red + green;
      const sold = randomInt(Math.floor(total * 0.5), Math.floor(total * 0.75));
      const remaining = total - sold;

      const prompt = isFa
        ? `یک باغدار ${formatPersianNumber(red)} کیلوگرم سیب سرخ و ${formatPersianNumber(green)} کیلوگرم سیب زرد برداشت کرد. او ${formatPersianNumber(sold)} کیلوگرم را فروخت و بقیه را در انبار گذاشت. چند کیلوگرم در انبار ذخیره شد؟`
        : `A farmer harvested ${formatNumber(red)} red apples and ${formatNumber(green)} green apples. He sold ${formatNumber(sold)} apples and took the rest to the farmers market. How many apples were left for the market?`;
      const correctAnswer = isFa ? `${formatPersianNumber(remaining)} کیلوگرم` : `${formatNumber(remaining)} apples`;

      return {
        originalId: original.id,
        prompt,
        correctAnswer,
        difficulty: original.difficulty,
        visualModel: {
          type: 'tape_diagram',
          title: isFa ? 'مدل نواری مسأله دو مرحله‌ای' : 'Two-Step Harvest Model',
          data: {
            kind: 'tape_diagram',
            totalLabel: isFa ? `کل برداشت (${formatPersianNumber(total)} کیلوگرم)` : `Total Harvest (${formatNumber(total)} apples)`,
            parts: [
              { label: isFa ? 'فروخته شده' : 'Sold', value: sold },
              { label: isFa ? 'باقی‌مانده در انبار (؟)' : 'Market Left (?)', value: remaining, isUnknown: true }
            ]
          }
        },
        explanation: isFa
          ? `گام اول: مجموع برداشت = ${formatPersianNumber(red)} + ${formatPersianNumber(green)} = ${formatPersianNumber(total)}. گام دوم: کسر مقدار فروخته شده = ${formatPersianNumber(total)} - ${formatPersianNumber(sold)} = ${correctAnswer}.`
          : `Step 1 (Sum): Total apples = ${formatNumber(red)} + ${formatNumber(green)} = ${formatNumber(total)}. Step 2 (Difference): Remaining apples = ${formatNumber(total)} - ${formatNumber(sold)} = ${correctAnswer}.`,
        solutionSteps: isFa
          ? [
              `محاسبه کل برداشت (مجهول اول): ${formatPersianNumber(red)} + ${formatPersianNumber(green)} = ${formatPersianNumber(total)} کیلوگرم.`,
              `کسر مقدار فروخته شده: ${formatPersianNumber(total)} - ${formatPersianNumber(sold)} = ${correctAnswer}.`
            ]
          : [
              `Find total harvested: ${formatNumber(red)} + ${formatNumber(green)} = ${formatNumber(total)} apples.`,
              `Subtract sold apples: ${formatNumber(total)} - ${formatNumber(sold)} = ${correctAnswer}.`
            ]
      };
    }

    case 'gen_mult_patterns': {
      const factor1 = randomInt(3, 9);
      const factor2 = randomInt(2, 6);
      const prodBase = factor1 * factor2;

      const p10 = prodBase * 10;
      const p100 = prodBase * 100;
      const p1000 = prodBase * 1000;

      const prompt = isFa
        ? `با توجه به الگوی ضرب، حاصل این عبارت‌ها را پیدا کنید: ${toPersianDigits(factor1)} × ${toPersianDigits(factor2 * 10)} و ${toPersianDigits(factor1)} × ${toPersianDigits(factor2 * 100)} و ${toPersianDigits(factor1)} × ${formatPersianNumber(factor2 * 1000)}.`
        : `Use place-value patterns to find each product: ${factor1} × ${factor2 * 10} = ___, ${factor1} × ${factor2 * 100} = ___, and ${factor1} × ${formatNumber(factor2 * 1000)} = ___.`;

      const correctAnswer = isFa
        ? `${formatPersianNumber(p10)}؛ ${formatPersianNumber(p100)}؛ ${formatPersianNumber(p1000)}`
        : `${formatNumber(p10)}; ${formatNumber(p100)}; ${formatNumber(p1000)}`;

      return {
        originalId: original.id,
        prompt,
        correctAnswer,
        difficulty: original.difficulty,
        explanation: isFa
          ? `حقیقت پایه ضرب: ${toPersianDigits(factor1)} × ${toPersianDigits(factor2)} = ${toPersianDigits(prodBase)}. سپس صفرها را اضافه می‌کنیم: ${formatPersianNumber(p10)}، ${formatPersianNumber(p100)}، و ${formatPersianNumber(p1000)}.`
          : `Basic fact: ${factor1} × ${factor2} = ${prodBase}. For each zero in the multiple of 10, append one zero to the basic fact product: ${formatNumber(p10)}, ${formatNumber(p100)}, and ${formatNumber(p1000)}.`,
        solutionSteps: isFa
          ? [
              `حقیقت پایه: ${toPersianDigits(factor1)} × ${toPersianDigits(factor2)} = ${toPersianDigits(prodBase)}.`,
              `ضرب در ۱۰: ${toPersianDigits(prodBase)} × ۱۰ = ${formatPersianNumber(p10)}.`,
              `ضرب در ۱۰۰: ${toPersianDigits(prodBase)} × ۱۰۰ = ${formatPersianNumber(p100)}.`,
              `ضرب در ۱٬۰۰۰: ${toPersianDigits(prodBase)} × ۱٬۰۰۰ = ${formatPersianNumber(p1000)}.`
            ]
          : [
              `Basic fact: ${factor1} × ${factor2} = ${prodBase}.`,
              `Multiply by 10: ${prodBase} × 10 = ${formatNumber(p10)}.`,
              `Multiply by 100: ${prodBase} × 100 = ${formatNumber(p100)}.`,
              `Multiply by 1,000: ${prodBase} × 1,000 = ${formatNumber(p1000)}.`
            ]
      };
    }

    case 'gen_number_words': {
      const n = randomInt(11, 99) * 1000 + randomInt(101, 999);
      const prompt = isFa
        ? `عدد ${formatPersianNumber(n)} را با حروف بنویسید.`
        : `Write the number ${formatNumber(n)} using number names (word form).`;
      const correctAnswer = isFa ? numberToWordsPersian(n) : numberToWords(n);
      return {
        originalId: original.id,
        prompt,
        correctAnswer,
        difficulty: original.difficulty,
        explanation: isFa
          ? `تفکیک طبقه هزارها و یکی‌ها: ${correctAnswer}.`
          : `In word form, separate periods by commas matching the numeral representation: ${correctAnswer}.`,
        solutionSteps: isFa
          ? [
              `طبقه هزارها: ${numberToWordsPersian(Math.floor(n / 1000))} هزار.`,
              `طبقه یکی‌ها: ${numberToWordsPersian(n % 1000)}.`,
              `ترکیب نهایی: ${correctAnswer}.`
            ]
          : [
              `Thousands period: ${numberToWords(Math.floor(n / 1000))} thousand.`,
              `Units period: ${numberToWords(n % 1000)}.`,
              `Word form: ${correctAnswer}.`
            ]
      };
    }

    default: {
      const n1 = randomInt(1200, 8900);
      const n2 = randomInt(800, 4500);
      const sum = n1 + n2;
      return {
        originalId: original.id,
        prompt: isFa
          ? `حاصل جمع ستونی را به دست آورید: ${formatPersianNumber(n1)} + ${formatPersianNumber(n2)}.`
          : `Compute the sum using the standard algorithm: ${formatNumber(n1)} + ${formatNumber(n2)}.`,
        correctAnswer: formatDisplayNumber(sum, lang),
        difficulty: original.difficulty,
        explanation: isFa
          ? `جمع ستونی دو عدد: ${formatPersianNumber(n1)} + ${formatPersianNumber(n2)} = ${formatPersianNumber(sum)}.`
          : `Align numbers vertically and add with regrouping: ${formatNumber(n1)} + ${formatNumber(n2)} = ${formatNumber(sum)}.`,
        solutionSteps: isFa
          ? [
              `جمع یکان‌ها، دهگان‌ها و صدگان‌ها.`,
              `ثبت ارقام انتقالی.`,
              `حاصل جمع: ${formatPersianNumber(sum)}.`
            ]
          : [
              `Add ones, tens, hundreds, and thousands columns.`,
              `Record any carried digits at the top of each place.`,
              `Sum = ${formatNumber(sum)}.`
            ]
      };
    }
  }
}
