import { FunctionalComponent, h, VNode } from '@stencil/core';
import { IMgInputCheckboxListProps } from './mg-input-checkbox.conf';

/**
 * Get checkboxes list template
 * @param props - MgInputCheckboxList Interface Props
 * @returns input template
 */
export const MgInputCheckboxList: FunctionalComponent<IMgInputCheckboxListProps> = (props: IMgInputCheckboxListProps): VNode[] => (
  <div class="mg-c-input__input-group-container" aria-labelledby={props.labelledby} id={props.id}>
    {props.checkboxes.map(input => (
      <div key={input._id} class={{ 'mg-c-input__input-group': true, 'mg-c-input__input-group--disabled': props.disabled || input.disabled }}>
        <input
          type="checkbox"
          id={input._id}
          name={props.name}
          value={input.value?.toString()}
          checked={Boolean(input.value)}
          required={input.required}
          aria-invalid={props.invalid?.toString() || 'false'}
          disabled={props.disabled || input.disabled}
          indeterminate={input.value === null}
          onInput={input._handleInput}
          onBlur={input._handleBlur}
          onKeyDown={input._handleKeydown}
        />
        <label htmlFor={input._id}>{input.title}</label>
      </div>
    ))}
  </div>
);
