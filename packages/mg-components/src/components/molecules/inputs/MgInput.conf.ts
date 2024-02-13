import type { MgInputTitle } from '../../atoms/internals/mg-input-title/mg-input-title';
import type { ClassList } from '@mgdis/stencil-helpers';

/**
 * MgInput component props
 */
export interface MgInputProps {
  // Global
  identifier: string;
  classCollection: ClassList;
  // Label
  label: string;
  labelOnTop: boolean;
  labelHide: boolean;
  isFieldset: MgInputTitle['isLegend'];
  // Input
  value: string;
  readonlyValue: string | string[];
  required: boolean;
  readonly: boolean;
  mgWidth: Width;
  disabled: boolean;
  // Tooltip
  tooltip: string;
  tooltipPosition: TooltipPosition;
  // Help Text
  helpText: string;
  // Error Message
  errorMessage: string;
  // ariaDescribedbyIDs
  ariaDescribedbyIDs: string[];
}
/**
 * Possible input width
 */
export const widths = [2, 4, 16, 'full'] as const;

export type Width = (typeof widths)[number];

/**
 * Possible Input types
 */
export type HTMLMgInputsElement =
  | HTMLMgInputCheckboxElement
  | HTMLMgInputDateElement
  | HTMLMgInputNumericElement
  | HTMLMgInputPasswordElement
  | HTMLMgInputRadioElement
  | HTMLMgInputSelectElement
  | HTMLMgInputTextElement
  | HTMLMgInputTextareaElement
  | (HTMLMgInputToggleElement & { required: true; invalid: false; displayError: () => void });

/**
 * Available handlers
 */
export enum Handler {
  BLUR = 'blur',
  FOCUS = 'focus',
}

export const tooltipPositions = ['input', 'label'] as const;

export type TooltipPosition = (typeof tooltipPositions)[number];
