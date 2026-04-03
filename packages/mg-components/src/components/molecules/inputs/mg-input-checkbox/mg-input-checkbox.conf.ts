/**
 * interface ICheckboxValue
 * use to match returned value
 */
export interface ICheckboxValue {
  title: string;
  value: boolean | null;
  disabled?: boolean;
  required?: boolean;
}

/**
 * interface ICheckboxItem
 * use to match checkbox attributes
 */
export interface ICheckboxItem extends ICheckboxValue {
  _id: string;
  _handleInput: (event: InputEvent & { target: HTMLInputElement }) => void;
  _handleBlur: () => void;
  _handleKeydown: (event: KeyboardEvent & { target: HTMLElement }) => void;
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
 * mg-input-checkbox-paginated section kind type
 */
export type SectionKindType = Record<string, number>;

/**
 * mg-input-checkbox-paginated section kind value
 */
export const SectionKind: Record<string, number> = {
  NOT_SELECTED: 0,
  SELECTED: 1,
  SEARCH: 2,
};

/**
 * Base mg-input-checkbox interface
 */
export interface IMgInputCheckboxBase {
  disabled?: boolean;
  name?: string;
  invalid?: boolean;
  checkboxes: ICheckboxItem[];
}

export interface IMgInputCheckboxPaginatedProps extends IMgInputCheckboxBase {
  readonly: boolean;
  messages: Record<string, string>;
  key: number;
  limit: number;
  handleLoadMore: () => void;
  handleMassAction?: () => void;
}

/**
 * mg-input-checkbox-list interface
 */
export interface IMgInputCheckboxListProps extends IMgInputCheckboxBase {
  id: string;
  labelledby?: string;
}
