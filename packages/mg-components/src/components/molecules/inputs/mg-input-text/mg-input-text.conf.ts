import type { Option } from '../../../../types';

/**
 * TextType from text types
 */
// Define possible text types with help text
export const helpTextTypes = ['email', 'emails', 'url'] as const;
// Define possible text types
export const textTypes = ['text', 'search', 'tel', ...helpTextTypes] as const;
// Define TextType type
export type TextType = (typeof textTypes)[number];

/**
 * Option type
 */
export type OptionType = Option;
