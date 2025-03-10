import type { InputError } from '../../../../types';

export const DEFAULT_MAX_DATE = '9999-12-31';

export type InputDateError = InputError & ('min' | 'max' | 'minMax' | 'required' | 'badInput');
