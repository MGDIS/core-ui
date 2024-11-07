import { describe, expect, test } from 'vitest';
import { localeCurrency, localeNumber, localeDate, localePercent, localeUnit, defineLocales, dateToString, getLocaleDatePattern } from './';
import messagesEn from '../locales/en/messages.json';
import messagesFr from '../locales/fr/messages.json';

const messagesFr = { lang: 'fr' };
const messagesEn = { lang: 'en' };
const messages = { en: messagesEn, fr: messagesFr };

describe('locale', () => {
  describe.each(['en', 'fr'])('locale: %s', locale => {
    describe('localeCurrency', () => {
      test('Should Format number to the locale currency', () => {
        const formatedCurrency = localeCurrency(1234567890.12, locale, 'EUR');
        expect(formatedCurrency).toEqual(locale === 'en' ? '€1,234,567,890.12' : '1 234 567 890,12\xa0€');
      });
    });

    describe('localeNumber', () => {
      test('Should Format number to the locale', () => {
        const formatedCurrency = localeNumber(1234567890.12, locale);
        expect(formatedCurrency).toEqual(locale === 'en' ? '1,234,567,890.12' : '1 234 567 890,12');
      });
      test('Should Format number to the locale and manage 00 in decimal returned value', () => {
        const formatedCurrency = localeNumber(1234567890, locale, 2);
        expect(formatedCurrency).toEqual(locale === 'en' ? '1,234,567,890.00' : '1 234 567 890,00');
      });
      test.each([0, 5])('Should Format number to the locale and format the decimal length, case length %s', length => {
        const formatedCurrency = localeNumber(1234567890, locale, length);
        const decimal = length > 0 ? '00000' : null;
        const localePoint = locale === 'en' ? '.' : ',';
        const integer = locale === 'en' ? '1,234,567,890' : '1 234 567 890';
        expect(formatedCurrency).toEqual(integer + (decimal ? localePoint + decimal : ''));
      });
    });

    describe('getLocaleDatePattern', () => {
      test.each([
        { locale: 'fr', expected: 'dd/mm/yyyy' },
        { locale: 'en', expected: 'mm/dd/yyyy' },
      ])('Should get date pattern', ({ locale, expected }) => {
        const pattern = getLocaleDatePattern(locale);
        expect(pattern).toEqual(expected);
      });
    });

    describe('dateToString', () => {
      test('Should Format date to string pattern', () => {
        const stringDate = '2023-12-24';
        const formatedtext = dateToString(new Date(stringDate));
        expect(formatedtext).toEqual(stringDate);
      });
    });

    describe('localeDate', () => {
      test.each([undefined, '', 'blu'])('Should return empty string: %s', date => {
        const formatedDate = localeDate(date, locale);
        expect(formatedDate).toEqual('');
      });

      test('Should return formated date', () => {
        const formatedDate = localeDate('2022-06-02', locale);
        expect(formatedDate).toEqual(locale === 'en' ? '6/2/2022' : '02/06/2022');
      });

      test('Should return formated date with given timeZone config', () => {
        const formatedDate = localeDate('2022-06-02', locale, { timeZone: 'America/New_York' });
        expect(formatedDate).toEqual(locale === 'en' ? '6/1/2022' : '01/06/2022');
      });
    });

    describe('defineLocales', () => {
      test('Should return navigator locale', () => {
        const locales = defineLocales(messages, locale)(document.createElement('div'));
        expect(locales.locale).toEqual('en-US');
        expect(locales.messages).toMatchObject(messagesEn);
      });

      test('Should return default locale', () => {
        const navigatorBackup = window.navigator;
        globalThis.window.navigator = [];
        const locales = defineLocales(messages, locale)(document.createElement('div'));
        expect(locales.locale).toEqual(locale);
        expect(locales.messages).toMatchObject({ lang: locale });

        // reset default navigator default value
        globalThis.window.navigator = navigatorBackup;
      });

      test('Should return matching locale', () => {
        const div = document.createElement('div');
        div.lang = 'fr-FR';
        const locales = defineLocales(messages, locale)(div);
        expect(locales.locale).toEqual(div.lang);
        expect(locales.messages).toMatchObject(messagesFr);
      });

      test('Should return default locale messages when requested does not exist', () => {
        const div = document.createElement('div');
        div.lang = 'ca';
        const locales = defineLocales(messages, locale)(div);
        expect(locales.locale).toEqual(div.lang);
        expect(locales.messages).toMatchObject({ lang: locale });
      });

      test('Should handle empty messages object', () => {
        const div = document.createElement('div');
        div.lang = 'fr';
        const locales = defineLocales({}, 'en')(div);
        expect(locales.locale).toEqual('fr');
        expect(locales.messages).toMatchObject({ lang: 'en' });
      });

      test('Should return default object when messages and default locale are not found', () => {
        const div = document.createElement('div');
        div.lang = 'fr';
        const locales = defineLocales({ it: { lang: 'it' } }, 'es')(div);
        expect(locales.locale).toEqual('fr');
        expect(locales.messages).toMatchObject({ lang: 'es' });
      });
    });

    describe('localePercent', () => {
      test.each([
        [0.42, 'en', 2, '42.00%'],
        [0.42, 'fr', 2, '42,00 %'],
        [1.23, 'en', 1, '123.0%'],
        [1.23, 'fr', 1, '123,0 %'],
        [0, 'fr', 0, '0 %'],
        [0, 'en', 0, '0%'],
        [1, 'fr', 0, '100 %'],
        [1, 'en', 0, '100%'],
        [-0.5, 'fr', 2, '-50,00 %'],
        [-0.5, 'en', 2, '-50.00%'],
        [Number.POSITIVE_INFINITY, 'fr', 0, '∞ %'],
        [Number.POSITIVE_INFINITY, 'en', 0, '∞%'],
        [Number.NEGATIVE_INFINITY, 'fr', 0, '-∞ %'],
        [Number.NEGATIVE_INFINITY, 'en', 0, '-∞%'],
        [NaN, 'fr', 0, 'NaN %'],
        [NaN, 'en', 0, 'NaN%'],
      ])('Should format %s value correctly for locale %s with %s decimals', (value, locale, decimals, expected) => {
        const result = localePercent(value, locale, decimals);
        // Normalize spaces before comparison
        expect(result.replace(/\s/g, ' ')).toBe(expected.replace(/\s/g, ' '));
      });

      test('Should handle undefined decimal length', () => {
        expect(localePercent(0.42, 'fr').replace(/\s/g, ' ')).toBe('42 %'.replace(/\s/g, ' '));
        expect(localePercent(0.42, 'en').replace(/\s/g, ' ')).toBe('42%'.replace(/\s/g, ' '));
      });
    });

    describe('localeUnit', () => {
      test.each([
        [1234567890.12, 'fr', 'kilometer', 'short', 2, '1 234 567 890,12 km'],
        [23, 'fr', 'celsius', 'short', 0, '23 °C'],
        [10, 'fr', 'kilometer', 'long', 0, '10 kilomètres'],
        [1234567890.12, 'en', 'kilometer', 'short', 2, '1,234,567,890.12 km'],
        [23, 'en', 'celsius', 'short', 0, '23°C'],
        [10, 'en', 'kilometer', 'long', 0, '10 kilometers'],
      ])('Should format %s value correctly for locale %s with unit %s', (value, locale, unit, unitDisplay, decimals, expected) => {
        const result = localeUnit(value, locale, unit, unitDisplay as Intl.NumberFormatOptions['unitDisplay'], decimals);
        // Normalize spaces before comparison
        expect(result.replace(/\s/g, ' ')).toBe(expected.replace(/\s/g, ' '));
      });

      test('Should respect decimal length', () => {
        expect(localeUnit(1234.567, 'en', 'kilometer', 'short', 2).replace(/\s/g, ' ')).toBe('1,234.57 km'.replace(/\s/g, ' '));
        expect(localeUnit(1234.567, 'fr', 'kilometer', 'short', 2).replace(/\s/g, ' ')).toBe('1 234,57 km'.replace(/\s/g, ' '));
      });

      test('Should use default unitDisplay and decimalLength when not provided', () => {
        expect(localeUnit(1234, 'en', 'kilometer').replace(/\s/g, ' ')).toBe('1,234 km');
        expect(localeUnit(1234, 'fr', 'kilometer').replace(/\s/g, ' ')).toBe('1 234 km');
      });

      test('Should use default unitDisplay when only decimalLength is provided', () => {
        expect(localeUnit(1234.567, 'en', 'kilometer', undefined, 2).replace(/\s/g, ' ')).toBe('1,234.57 km');
        expect(localeUnit(1234.567, 'fr', 'kilometer', undefined, 2).replace(/\s/g, ' ')).toBe('1 234,57 km');
      });
    });
  });
});
