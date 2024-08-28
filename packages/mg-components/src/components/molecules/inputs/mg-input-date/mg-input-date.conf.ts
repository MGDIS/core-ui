import type { InputError } from '../../../../types';

export type InputDateError = InputError & ('min' | 'max' | 'minMax' | 'required' | 'badInput');
