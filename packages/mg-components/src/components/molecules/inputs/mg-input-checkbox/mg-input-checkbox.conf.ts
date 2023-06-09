/**
 * interface CheckboxValue
 * use to match returned value
 */
export interface CheckboxValue {
  title: string;
  value: boolean | null;
  disabled?: boolean;
  required?: boolean;
}

/**
 * interface CheckboxItem
 * use to match checkbox attributes
 */
export interface CheckboxItem extends CheckboxValue {
  id: string;
  handleInput: (event: InputEvent & { target: HTMLInputElement }) => void;
  handleBlur: () => void;
  handleKeydown: (event: KeyboardEvent & { target: HTMLElement }) => void;
}

/**
 * List of all availables checkbox type
 */
export const checkboxTypes = ['checkbox', 'multi'] as const;

/**
 * ChecboxType from checkbox types
 */
export type CheckboxType = (typeof checkboxTypes)[number];

/**
 * Search value type
 */
export type SearchValueType = string;

/**
 * mg-input-checkbox-paginated section kind
 */
export enum SectionKind {
  SELECTED = 'selected',
  NOT_SELECTED = 'not-selected',
}

/**
 * mg-input-checkbox-paginated section title kind
 */
export enum SectionTitleKind {
  BUTTON = 'button',
  TEXT = 'text',
}

/**
 * Base mg-input-checkbox interface
 */
export interface IMgInputCheckboxBase {
  readonly: boolean;
  disabled: boolean;
  name: string;
}

/**
 * mg-input-checkbox-list interface
 */
export interface MgInputCheckboxListProps extends IMgInputCheckboxBase {
  inputVerticalList: boolean;
  type: CheckboxType;
  displaySearchInput: boolean;
  messages: Record<string, unknown>;
  checkboxes: CheckboxItem[];
  id: string;
}
