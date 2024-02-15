import { FunctionalComponent, h, VNode } from '@stencil/core';
import { type MgInputProps } from './MgInput.conf';
import { isValidString } from '@mgdis/stencil-helpers';

/**
 * Get input template
 * @param props - MgInput Interface Props
 * @param children - Represent scoped elements
 * @returns input template
 */
export const MgInput: FunctionalComponent<MgInputProps> = (props: MgInputProps, children: VNode[]): VNode[] => {
  /**
   * Return template
   *
   * +-------------------------------------------+
   * |  mg-input
   * |-------------------------------------------+
   * |                  | Help Text              |
   * |                  +------------------------+
   * |                  | Error                  |
   * +------------------+------------------------+
   */

  return (
    <mg-input
      identifier={props.identifier}
      classCollection={props.classCollection}
      ariaDescribedbyIDs={props.ariaDescribedbyIDs}
      labelOnTop={props.labelOnTop}
      labelHide={props.labelHide}
      required={props.required}
      readonly={props.readonly}
      mgWidth={props.mgWidth}
      disabled={props.disabled}
      value={props.value}
      readonlyValue={props.readonlyValue}
      tooltip={props.tooltip}
      tooltipPosition={props.tooltipPosition}
      hasError={Boolean(props.errorMessage)}
      isFieldset={props.isFieldset}
    >
      <mg-input-title slot="title" identifier={props.identifier} readonly={props.readonly} required={false} is-legend={false}>
        {props.label}
      </mg-input-title>
      {children}
      {isValidString(props.errorMessage) && <div slot="error" innerHTML={props.errorMessage}></div>}
      {isValidString(props.helpText) && <div slot="help-text" innerHTML={props.helpText}></div>}
    </mg-input>
  );
};
