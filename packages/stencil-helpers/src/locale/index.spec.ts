import { describe, expect, test } from 'vitest';
import { localeCurrency, localeNumber, localeDate, defineLocales, dateToString, getLocaleDatePattern } from './';
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
    });
  });
});
