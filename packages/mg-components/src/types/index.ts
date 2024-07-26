/**
 * Defines the possible values for size
 */
export type Size = 'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge';

/**
 * Defines the possible values for variant
 */
export type Variant = 'info' | 'success' | 'warning' | 'danger' | 'danger-alt' | 'primary' | 'secondary' | 'app' | 'light' | 'dark' | 'flat' | 'text-color' | 'link';

/**
 * Defines the possible values for variantStyle
 */
export type VariantStyle = 'icon' | 'background' | 'bar-left' | 'full';

/**
 * Defines the possible values for input error
 */
export type InputError = 'min' | 'max' | 'minMax' | 'required' | 'badInput';

/**
 * Defines the possible values for status
 */
export type Status = 'visible' | 'hidden' | 'disabled' | 'active';

/**
 * Define option type
 */
export type Option = {
  title: string;
  value: unknown;
};
