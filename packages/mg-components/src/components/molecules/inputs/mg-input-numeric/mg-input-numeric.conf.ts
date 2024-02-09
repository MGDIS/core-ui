/**
 * List of all possibles types
 */
export const types = ['decimal', 'integer', 'currency'] as const;

export type NumericType = (typeof types)[number];

export enum InputError {
  MIN = 'min',
  MAX = 'max',
  MINMAX = 'minMax',
  REQUIRED = 'required',
}
