/**
 * List of all availables text type
 */
export const textTypes = ['text', 'search'] as const;

/**
 * TextType from text types
 */
export type TextType = (typeof textTypes)[number];

/**
 * Type for datalist option
 */
export type DatalistOption = string;
