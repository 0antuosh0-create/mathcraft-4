/**
 * English number formatting, word representation, and date utilities
 */

export function formatNumber(num: number | string | null | undefined): string {
  if (num === null || num === undefined) return '';
  const clean = typeof num === 'number' ? num : Number(String(num).replace(/,/g, ''));
  if (isNaN(clean)) return String(num);
  return clean.toLocaleString('en-US');
}

const ONES = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
const TEENS = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
const SCALES = ['', 'thousand', 'million', 'billion'];

export function numberToWords(num: number): string {
  if (num === 0) return 'zero';
  if (num < 0) return `negative ${numberToWords(-num)}`;

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
      parts.push(`${ONES[h]} hundred`);
    }

    if (remainder > 0) {
      if (remainder < 10) {
        parts.push(ONES[remainder] ?? '');
      } else if (remainder < 20) {
        parts.push(TEENS[remainder - 10] ?? '');
      } else {
        const t = Math.floor(remainder / 10);
        const o = remainder % 10;
        const tenStr = TENS[t] ?? '';
        parts.push(o > 0 ? `${tenStr}-${ONES[o]}` : tenStr);
      }
    }
    return parts.filter(Boolean).join(' ');
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

  return resultWords.join(', ');
}

export function getTodayDateStr(): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date());
}
