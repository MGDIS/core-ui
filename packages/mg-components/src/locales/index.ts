import en from './en/messages.json';
import fr from './fr/messages.json';
import { getLocaleMessages } from '../utils/locale.utils';

const defaultLocale = 'en';
const messages = { en, fr };

/**
 * Get Intl object
 * @param element - element we need to get the language
 * @returns messages object
 */
export const initLocales = (element: HTMLElement): { locale: string; messages: Record<string, unknown> } => getLocaleMessages(element, messages, defaultLocale);
