/**
 * type CheckboxItem
 * use to match checkbox attributes
 */
export type CheckboxItem = {
  id: string;
  title: string;
  value: boolean | null;
  disabled?: boolean;
};

/**
 * type CheckboxValue
 * use to match returned value
 */
export type CheckboxValue = {
  title: string;
  value: boolean | null;
  disabled?: boolean;
};

/**
 * List of all availables checkbox type
 */
export const checkboxTypes = ['checkbox', 'multi'] as const;

/**
 * ChecboxType from checkbox types
 */
export type CheckboxType = (typeof checkboxTypes)[number];
