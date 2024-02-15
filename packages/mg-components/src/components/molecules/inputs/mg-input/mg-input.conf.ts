import type { MgInputProps as MgInputBaseProps } from '../MgInput.conf';

/**
 * MgInput component props
 */
export type MgInputProps = Omit<MgInputBaseProps, 'label' | 'errorMessage' | 'helpText'>;
