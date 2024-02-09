import { FunctionalComponent, h, VNode, FunctionalUtilities } from '@stencil/core';
import { widths, type Width, tooltipPositions, type TooltipPosition } from './MgInput.conf';
import { ClassList, isValidString } from '@mgdis/stencil-helpers';
import { MgInputTitle } from '../../atoms/mg-input-title/mg-input-title';

/**
 * Apply in all input child node the aria-describedby attribute
 * @param children - Represent scoped elements
 * @param ariaDescribedbyIDs - List of IDs
 * @param utils - Stencil.js utils
 * @returns Children with aria-describedby attribute
 */
const applyAriadescribedBy = (children: VNode[], ariaDescribedbyIDs: Set<string>, utils: FunctionalUtilities): VNode[] =>
  utils.map(children, child => {
    if (['input', 'select', 'textarea'].includes(child.vtag as string)) {
      return {
        ...child,
        vattrs: {
          ...child.vattrs,
          'aria-describedby': [...ariaDescribedbyIDs].join(' '),
        },
      };
    }

    // we recursively apply ariadescribedBy attributes to child input nodes if exists
    if (child.vchildren === null) return { ...child };
    return {
      ...child,
      vchildren: applyAriadescribedBy(child.vchildren, ariaDescribedbyIDs, utils),
    };
  });

/**
 * Add classes based on props
 * @param props - MgInput Interface Props
 */
const manageClasses = (props: MgInputProps): void => {
  props.classCollection.add('mg-c-input');

  if (props.labelOnTop) props.classCollection.add('mg-c-input--label-on-top');
  else props.classCollection.delete('mg-c-input--label-on-top');

  if (props.readonly) props.classCollection.add('mg-c-input--readonly');
  else props.classCollection.delete('mg-c-input--readonly');

  widths.forEach(width => {
    props.classCollection.delete(`mg-c-input--width-${width}`);
  });
  if (props.mgWidth !== undefined) props.classCollection.add(`mg-c-input--width-${props.mgWidth}`);
};

/**
 * Check props configuration
 * @param props - MgInput Interface Props
 */
const checkPropsConfig = (props: MgInputProps): void => {
  if (!isValidString(props.identifier)) {
    throw new Error('<mg-input> prop "identifier" is required.');
  }
  if (!isValidString(props.label)) {
    throw new Error('<mg-input> prop "label" is required.');
  }
  if (props.labelOnTop && props.labelHide) {
    throw new Error('<mg-input> prop "labelOnTop" must not be paired with the prop "labelHide".');
  }
  if (!tooltipPositions.includes(props.tooltipPosition)) {
    throw new Error(`<mg-input> prop "tooltipPosition" must be one of: ${tooltipPositions.join(', ')}`);
  }
};

/**
 * Get tagname
 * @param isFieldset - is fieldset
 * @returns tag name
 */
const getTagName = (isFieldset: MgInputProps['isFieldset'], readOnly: MgInputProps['readonly']): string => (!isFieldset || readOnly ? 'div' : 'fieldset');

/**
 * MgInput Interface
 */
interface MgInputProps {
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
  readonlyValue: string;
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
 * Get input template
 * @param props - MgInput Interface Props
 * @param children - Represent scoped elements
 * @param utils - Stencil.js utils
 * @returns input template
 */
export const MgInput: FunctionalComponent<MgInputProps> = (props: MgInputProps, children: VNode[], utils: FunctionalUtilities): VNode[] => {
  /**
   * Check props config
   */
  checkPropsConfig(props);

  /**
   * Set readonly value
   */
  if (props.readonlyValue === undefined) props.readonlyValue = props.value;

  /**
   * Component classes
   */
  manageClasses(props);

  /**
   * a11y IDs
   */
  const ariaDescribedbyIDs: Set<string> = new Set(props.ariaDescribedbyIDs);

  // Help text
  const helpTextId = `${props.identifier}-help-text`;
  if (typeof props.helpText === 'string' && props.helpText !== '') {
    ariaDescribedbyIDs.add(helpTextId);
  }

  // Error Message
  const helpTextErrorId = `${props.identifier}-error`;
  if (typeof props.errorMessage === 'string' && props.errorMessage !== '') {
    ariaDescribedbyIDs.add(helpTextErrorId);
  }

  /**
   * Return template
   *
   * +--------+---------+--------------+---------+
   * |  label | tooltip | input        | tooltip |
   * |--------+---------+--------------+---------+
   * |                  | nb Char Left           |
   * |                  +------------------------+
   * |                  | Help Text              |
   * |                  +------------------------+
   * |                  | Error                  |
   * +------------------+------------------------+
   *
   * Error message is based on this aria method: https://www.w3.org/WAI/tutorials/forms/notifications/#on-focus-change
   */

  const TagName = getTagName(props.isFieldset, props.readonly);

  /**
   * Get tooltip node
   * @returns mg-tooltip
   */
  const getTooltip = (): VNode[] => (
    <mg-tooltip identifier={`${props.identifier}-tooltip`} message={props.tooltip}>
      <mg-icon icon="info-circle"></mg-icon>
    </mg-tooltip>
  );

  return (
    <TagName class={props.classCollection.join()}>
      <div class={{ 'mg-c-input__title': true, 'mg-u-visually-hidden': props.labelHide }}>
        <mg-input-title identifier={props.identifier} readonly={props.readonly} required={props.required && !props.disabled && !props.readonly} is-legend={props.isFieldset}>
          {props.label}
        </mg-input-title>
        {props.tooltip && !props.readonly && (props.tooltipPosition === 'label' || props.labelOnTop) && !props.labelHide && getTooltip()}
      </div>
      {props.readonly ? (
        <div class="mg-c-input__input-container">
          <strong>{props.readonlyValue}</strong>
          {children.filter(child => Object.values(child).includes('append-input'))}
        </div>
      ) : (
        <div class="mg-c-input__input-container">
          <div class={{ 'mg-c-input__input': true, 'mg-c-input__input--has-error': props.errorMessage !== undefined }}>
            {applyAriadescribedBy(children, ariaDescribedbyIDs, utils)}
            {props.tooltip && !props.readonly && !props.labelOnTop && (props.tooltipPosition === 'input' || props.labelHide) && getTooltip()}
          </div>
          {props.helpText && <div id={helpTextId} class="mg-c-input__help-text" innerHTML={props.helpText}></div>}
          {props.errorMessage && !props.readonly && !props.disabled && (
            <div id={helpTextErrorId} class="mg-c-input__error" innerHTML={props.errorMessage} aria-live="assertive"></div>
          )}
        </div>
      )}
    </TagName>
  );
};
