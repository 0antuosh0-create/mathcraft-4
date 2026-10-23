import { UNITS_EN, ERROR_DETECTIVE_CASES_EN } from './curriculum_en';
import { UNITS_FA, ERROR_DETECTIVE_CASES_FA } from './curriculum_fa';
import { Language, Unit, ErrorDetectiveCase } from '../types/math';

export { UNITS_EN, UNITS_FA, ERROR_DETECTIVE_CASES_EN, ERROR_DETECTIVE_CASES_FA };

export const UNITS = UNITS_EN;
export const ERROR_DETECTIVE_CASES = ERROR_DETECTIVE_CASES_EN;

export function getUnits(lang: Language): Unit[] {
  return lang === 'fa' ? UNITS_FA : UNITS_EN;
}

export function getDetectiveCases(lang: Language): ErrorDetectiveCase[] {
  return lang === 'fa' ? ERROR_DETECTIVE_CASES_FA : ERROR_DETECTIVE_CASES_EN;
}
