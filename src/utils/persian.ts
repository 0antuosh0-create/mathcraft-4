/**
 * Persian typography and number utilities
 */

const PERSIAN_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'] as const;

export function toPersianDigits(input: number | string | null | undefined): string {
  if (input === null || input === undefined) return '';
  return String(input).replace(/\d/g, (d) => PERSIAN_DIGITS[parseInt(d, 10)] ?? d);
}

export function toEnglishDigits(input: string): string {
  if (!input) return '';
  return input
    .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 1776))
    .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 1632));
}

export function formatPersianNumber(num: number | string): string {
  if (num === null || num === undefined) return '';
  const clean = typeof num === 'number' ? num : Number(toEnglishDigits(String(num)).replace(/,/g, ''));
  if (isNaN(clean)) return toPersianDigits(num);
  
  const parts = clean.toLocaleString('en-US').split('.');
  const intPart = toPersianDigits(parts[0]);
  if (parts.length > 1) {
    return `${intPart}٫${toPersianDigits(parts[1])}`;
  }
  return intPart;
}

const ONES = ['', 'یک', 'دو', 'سه', 'چهار', 'پنج', 'شش', 'هفت', 'هشت', 'نه'];
const TEENS = ['ده', 'یازده', 'دوازده', 'سیزده', 'چهارده', 'پانزده', 'شانزده', 'هفده', 'هجده', 'نوزده'];
const TENS = ['', 'ده', 'بیست', 'سی', 'چهل', 'پنجاه', 'شصت', 'هفتاد', 'هشتاد', 'نود'];
const HUNDREDS = ['', 'یکصد', 'دویست', 'سیصد', 'چهارصد', 'پانصد', 'ششصد', 'هفتصد', 'هشتصد', 'نهصد'];
const SCALES = ['', 'هزار', 'میلیون', 'میلیارد'];

export function numberToWordsPersian(num: number): string {
  if (num === 0) return 'صفر';
  if (num < 0) return `منفی ${numberToWordsPersian(-num)}`;
  
  let n = Math.floor(num);
  const chunks: number[] = [];
  while (n > 0) {
    chunks.push(n % 1000);
    n = Math.floor(n / 1000);
  }

  function threeDigitWords(chunk: number): string {
    const h = Math.floor(chunk / 100);
    const remainder = chunk % 100;
    const parts: string[] = [];
    
    if (h > 0) {
      parts.push(HUNDREDS[h] ?? '');
    }
    
    if (remainder > 0) {
      if (remainder < 10) {
        parts.push(ONES[remainder] ?? '');
      } else if (remainder < 20) {
        parts.push(TEENS[remainder - 10] ?? '');
      } else {
        const t = Math.floor(remainder / 10);
        const o = remainder % 10;
        parts.push(TENS[t] ?? '');
        if (o > 0) parts.push(ONES[o] ?? '');
      }
    }
    return parts.filter(Boolean).join(' و ');
  }

  const resultWords: string[] = [];
  for (let i = chunks.length - 1; i >= 0; i--) {
    const chunk = chunks[i];
    if (chunk && chunk > 0) {
      const words = threeDigitWords(chunk);
      const scale = SCALES[i];
      resultWords.push(scale ? `${words} ${scale}` : words);
    }
  }

  return resultWords.join(' و ');
}

/**
 * Returns today's date in Persian Jalali calendar format (e.g. "۲ آبان ۱۴۰۵")
 */
export function getTodayJalali(): string {
  try {
    return new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date());
  } catch {
    return '۱۴۰۵/۰۸/۰۲';
  }
}
