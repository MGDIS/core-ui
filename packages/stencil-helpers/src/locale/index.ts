import type { ObjectType } from '../types';

/**
 * Gets the date pattern based on the specified locale.
 * @param locale - the locale to refer to
 * @returns date pattern
 * @example
 * ```ts
 * getLocaleDatePattern('fr') // 'dd/mm/yyyy'
 * ```
 */
export const getLocaleDatePattern = (locale: string) => {
  const year = { value: '2023', pattern: 'yyyy' };
  const month = { value: '12', pattern: 'mm' };
  const day = { value: '24', pattern: 'dd' };
  return localeDate([year.value, month.value, day.value].join('-'), locale, { timeZone: 'UTC' })
    .replace(year.value, year.pattern)
    .replace(month.value, month.pattern)
    .replace(day.value, day.pattern);
};

/**
 * Formats a date object to a string with the pattern 'YYYY-MM-DD'.
 * @param date - date to parse
 * @returns string date with pattern 'YYYY-MM-DD'
 * @example
 * ```ts
 * dateToString(new Date('2023-12-24')) // '2023-12-24'
 * ```
 */
export const dateToString = (date: Date): string | undefined => date.toISOString().split('T')[0];

/**
 * Get locale and messages
 * We load the defined locale but for now we only support the first subtag for messages
 * @param element - element we need to get the language
 * @param messages - messages to use
 * @param defaultLocale - default messages locale
 * @returns messages object
 */
const getLocaleMessages = (element: HTMLElement, messages: ObjectType, defaultLocale: string): { locale: string; messages: ObjectType } => {
  // Get local
  const closestLangAttribute: HTMLElement | null = element.closest('[lang]');
  const closestLang: string[] = Intl.NumberFormat.supportedLocalesOf(closestLangAttribute?.lang as string);
  const locale = closestLang.length > 0 && typeof closestLang[0] === 'string' ? closestLang[0] : navigator.language || defaultLocale;
  // Only keep first subtag
  const localeSubtag = locale.split('-').shift() as string;

  // If messages is empty, return a default object
  if (Object.keys(messages).length === 0) {
    return {
      locale,
      messages: { lang: defaultLocale },
    };
  }

  // Return
  return {
    locale,
    messages: (messages[localeSubtag] || messages[defaultLocale] || { lang: defaultLocale }) as ObjectType,
  };
};

/**
 * Format number to the locale currency
 * @param number - number to format
 * @param locale - locale to apply
 * @param currency - currency to apply
 * @returns formatted currency
 * @example
 * ```ts
 * localeCurrency(1234567890.12, 'fr', 'EUR') // '1 234 567 890,12\xa0€'
 * ```
 */
export const localeCurrency = (number: number, locale: string, currency: string): string => new Intl.NumberFormat(locale, { style: 'currency', currency }).format(number);

/**
 * Format number to locale
 * @param number - number to format
 * @param locale - locale to apply
 * @param decimalLength - decimal length to apply
 * @returns formatted number
 * @example
 * ```ts
 * localeNumber(1234567890.12, 'fr') // 1 234 567 890,12
 * ```
 */
export const localeNumber = (number: number, locale: string, decimalLength: number = 0): string =>
  new Intl.NumberFormat(locale, { minimumFractionDigits: decimalLength }).format(Number(number));

/**
 * Format number as percentage based on locale
 * @param number - number to format
 * @param locale - locale to apply
 * @param decimalLength - decimal length to apply
 * @returns formatted percentage
 * @example
 * ```ts
 * localePercent(0.42, 'fr', 2) // '42,00 %'
 * localePercent(0.42, 'en', 2) // '42.00%'
 * ```
 */
export const localePercent = (number: number, locale: string, decimalLength: number = 0): string => {
  return new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: decimalLength,
    maximumFractionDigits: decimalLength,
  }).format(number);
};

/**
 * Format number with standardized unit based on locale using Intl unit formatting
 * @param number - number to format
 * @param locale - locale to apply
 * @param unit - standardized unit (e.g., 'kilometer', 'kilogram', 'celsius')
 * @param unitDisplay - how to display the unit ('short', 'long', 'narrow')
 * @param decimalLength - decimal length to apply
 * @returns formatted number with localized unit
 * @example
 * ```ts
 * localeUnit(1234567890.12, 'fr', 'kilometer') // '1 234 567 890,12 km'
 * localeUnit(23, 'fr', 'celsius') // '23 °C'
 * localeUnit(10, 'fr', 'kilometer', 0, 'long') // '10 kilomètres'
 * ```
 */
export const localeUnit = (
  number: number,
  locale: string,
  unit: Intl.NumberFormatOptions['unit'],
  unitDisplay: Intl.NumberFormatOptions['unitDisplay'] = 'short',
  decimalLength: number = 0,
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'unit',
    unit,
    unitDisplay,
    minimumFractionDigits: decimalLength,
    maximumFractionDigits: decimalLength,
  }).format(number);
};

/**
 * Date RegExp, usefull to test if string is a follow the date pattern
 * @example
 * ```ts
 * dateRegExp.test('mystring') // false
 * dateRegExp.test('2020-12-31') // true
 * ```
 */
export const dateRegExp = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

/**
 * Locale date format
 * @param date - date to format
 * @param locale - locale to apply
 * @param config - DateTimeFormatOptions object to apply
 * @returns formatted date
 * @example
 * ```ts
 * localeDate('2022-06-02', 'fr') // '02/06/2022'
 * ```
 */
export const localeDate = (date: string | undefined, locale: string, config?: Intl.DateTimeFormatOptions): string =>
  typeof date !== 'string' || date === '' || !dateRegExp.test(date) ? '' : new Intl.DateTimeFormat(locale, config).format(new Date(date));

/**
 * Get Intl object
 * @param messages - locales to render in object format. `ex: { en: { porp: "test" }, fr: { porp: "test" }}`.
 * @param defaultLocale - fallback locale to render. `ex: 'en'`.
 * @returns from the element passed in return function you will get the matching messages object
 * @example
 * ```ts
 * import en from './en/messages.json';
 * import fr from './fr/messages.json';
 * import { defineLocales } from '@mgdis/stencil-helpers';
 *
 * const defaultLocale = 'en';
 * const messages = { en, fr };
 *
 * export const initLocales = defineLocales(messages, defaultLocale);
 * ```
 */
export const defineLocales =
  (messages: ObjectType, defaultLocale: 'fr' | 'en' | string) =>
  (element: HTMLElement): { locale: string; messages: ObjectType } =>
    getLocaleMessages(element, messages, defaultLocale);
