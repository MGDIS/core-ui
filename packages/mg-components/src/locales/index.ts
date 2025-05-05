import en from './en/messages.json';
import fr from './fr/messages.json';
import { defineLocales } from '@mgdis/core-ui-helpers/stencil';

const defaultLocale = 'en';
const messages = { en, fr };

/**
 * Get Intl object
 * @param element - element we need to get the language
 * @returns messages object
 */
export const initLocales = defineLocales(messages, defaultLocale);
