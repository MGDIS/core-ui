/**
 * Possible input width
 */
export const widths = [2, 4, 16, 'full'] as const;

export type Width = (typeof widths)[number];

/**
 * Possible tootltip postions
 */
export const tooltipPositions = ['input', 'label'] as const;

export type TooltipPosition = (typeof tooltipPositions)[number];

/**
 * Possible label heading level
 */
export const labelHeadingLevels = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;

export type LabelHeadingLevel = (typeof labelHeadingLevels)[number];

/**
 * Base interface for common methods
 */
interface InputBaseMethods {
  required: boolean;
  invalid: boolean;
  labelOnTop: boolean;
  readonly: boolean;
  displayError: () => Promise<void>;
  reset: () => Promise<void>;
}

/**
 * Possible Input types
 */
export type HTMLMgInputsElement =
  | (HTMLMgInputElement & InputBaseMethods)
  | HTMLMgInputCheckboxElement
  | HTMLMgInputDateElement
  | HTMLMgInputNumericElement
  | HTMLMgInputPasswordElement
  | HTMLMgInputRadioElement
  | HTMLMgInputSelectElement
  | HTMLMgInputTextElement
  | HTMLMgInputTextareaElement
  | (HTMLMgInputToggleElement & InputBaseMethods);

/**
 * Available WindowEvent types
 */
export type EventType = keyof WindowEventMap & 'blur';

export const classFieldset = 'mg-c-input--fieldset';
export const classDisabled = 'mg-c-input--disabled';
export const classReadonly = 'mg-c-input--readonly';
export const classVerticalList = 'mg-c-input--vertical-list';
