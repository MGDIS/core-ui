/**
 * List of all possibles types
 */
export const types = ['decimal', 'integer'] as const;

export type NumericType = (typeof types)[number];

export const formats = ['none', 'number', 'currency'] as const;

export type Format = (typeof formats)[number];

export enum InputError {
  MIN = 'min',
  MAX = 'max',
  MINMAX = 'minMax',
  REQUIRED = 'required',
}
