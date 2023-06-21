import { FunctionalComponent, h, VNode } from '@stencil/core';
import { MgInputCheckboxListProps } from './mg-input-checkbox.conf';

/**
 * Get checkboxes list template
 * @param props - MgInputCheckboxList Interface Props
 * @returns input template
 */
export const MgInputCheckboxList: FunctionalComponent<MgInputCheckboxListProps> = (props: MgInputCheckboxListProps): VNode[] => (
  // eslint-disable-next-line jsx-a11y/no-redundant-roles
  <ul
    class={{
      'mg-input__input-group-container': true,
      'mg-input__input-group-container--vertical': props.inputVerticalList || (props.type === 'multi' && !props.readonly),
      'mg-input__input-checkbox-multi-inputs': props.type === 'multi' && !props.readonly,
    }}
    role="list"
    aria-describedby={props.displaySearchInput ? 'search-results' : false}
    aria-label={props.displaySearchInput ? props.messages.searchResults : false}
    aria-live={props.displaySearchInput ? 'polite' : false}
    id={props.id}
  >
    {props.checkboxes
      .filter(item => !props.readonly || item.value)
      .map(input => (
        <li key={input.id} class={{ 'mg-input__input-group': true, 'mg-input__input-group--disabled': props.disabled || input.disabled }}>
          <input
            type="checkbox"
            id={input.id}
            name={props.identifier}
            value={input.value && input.value.toString()}
            checked={Boolean(input.value)}
            required={input.required}
            disabled={props.readonly || props.disabled || input.disabled}
            indeterminate={input.value === null}
            onInput={input.handleInput}
            onBlur={input.handleBlur}
            onKeyDown={input.handleKeydown}
          />
          <label htmlFor={input.id}>{input.title}</label>
        </li>
      ))}
  </ul>
);
