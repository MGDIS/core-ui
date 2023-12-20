/**
 * Format number to the locale currency
 * @param number - number to format
 * @param locale - locale to apply
 * @param currency - currency to apply
 * @returns formatted currency
 */
export const localeCurrency = (number: number, locale: string, currency: string): string => {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(number);
};

/**
 * Format number to locale
 * @param number - number to format
 * @param locale - locale to apply
 * @returns formatted number
 */
export const localeNumber = (number: number, locale: string): string => {
  return new Intl.NumberFormat(locale).format(number);
};

/**
 * Date RegExp
 */
export const dateRegExp = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

/**
 * Get date pattern base on locale
 * @param locale to refer
 * @returns date pattern
 */
export const getLocaleDatePattern = (locale: string) => {
  const year = { value: '2023', pattern: 'YYYY' };
  const month = { value: '12', pattern: 'MM' };
  const day = { value: '24', pattern: 'DD' };
  return localeDate([year.value, month.value, day.value].join('-'), locale).replace(year.value, year.pattern).replace(month.value, month.pattern).replace(day.value, day.pattern);
};

/**
 * Format a date object to string
 * @param date to parse
 * @returns string date with pattern 'YYYY-MM-DD'
 */
export const dateToString = (date: Date): string => date.toISOString().split('T')[0];

/**
 * Locale date format
 * @param date - date to format
 * @param locale - locale to apply
 * @returns formatted date
 */
export const localeDate = (date: string, locale: string): string => {
  if (typeof date !== 'string' || date === '' || !dateRegExp.test(date)) {
    return '';
  }
  return new Intl.DateTimeFormat(locale).format(new Date(date));
};

/**
 * Get locale and messages
 * We load the defined locale but for now we only support the first subtag for messages
 * @param element - element we need to get the language
 * @param messages - messages to use
 * @param defaultLocale - default messages locale
 * @returns messages object
 */
export const getLocaleMessages = (element: HTMLElement, messages: unknown, defaultLocale: string): { locale: string; messages: Record<string, unknown> } => {
  // Get local
  const closestLangAttribute: HTMLElement = element.closest('[lang]');
  const closestLang: string[] = Intl.NumberFormat.supportedLocalesOf(closestLangAttribute?.lang);
  const locale = closestLang.length > 0 ? closestLang[0] : navigator.language || defaultLocale;
  // Only keep first subtag
  const localeSubtag = locale.split('-').shift();
  // Return
  return {
    locale,
    messages: messages[localeSubtag] || messages[defaultLocale],
  };
};
