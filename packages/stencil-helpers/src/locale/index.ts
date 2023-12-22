import type { ObjectType } from './index.conf';

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
  // Return
  return {
    locale,
    messages: (messages[localeSubtag] || messages[defaultLocale]) as ObjectType,
  };
};

/**
 * Format number to the locale currency
 * @param number - number to format
 * @param locale - locale to apply
 * @param currency - currency to apply
 * @returns formatted currency
 */
export const localeCurrency = (number: number, locale: string, currency: string): string => new Intl.NumberFormat(locale, { style: 'currency', currency }).format(number);

/**
 * Format number to locale
 * @param number - number to format
 * @param locale - locale to apply
 * @returns formatted number
 */
export const localeNumber = (number: number, locale: string): string => new Intl.NumberFormat(locale).format(number);

/**
 * Date RegExp
 */
export const dateRegExp = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

/**
 * Locale date format
 * @param date - date to format
 * @param locale - locale to apply
 * @returns formatted date
 */
export const localeDate = (date: string | undefined, locale: string): string => {
  if (typeof date !== 'string' || date === '' || !dateRegExp.test(date)) {
    return '';
  }
  return new Intl.DateTimeFormat(locale).format(new Date(date));
};

/**
 * Get Intl object
 * @param messages - locales to render in object format. `ex: { en: { porp: "test" }, fr: { porp: "test" }}`.
 * @param defaultLocale - fallback locale to render. `ex: 'en'`.
 * @returns from the element passed in return function you will get the matching messages object
 */
export const defineLocales =
  (messages: ObjectType, defaultLocale: 'fr' | 'en' | string) =>
  (element: HTMLElement): { locale: string; messages: ObjectType } =>
    getLocaleMessages(element, messages, defaultLocale);
