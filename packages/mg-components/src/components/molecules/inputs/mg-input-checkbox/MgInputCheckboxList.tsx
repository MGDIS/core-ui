import { FunctionalComponent, h, VNode } from '@stencil/core';
import { MgInputCheckboxListProps } from './mg-input-checkbox.conf';

/**
 * Get checkboxes list template
 * @param props - MgInputCheckboxList Interface Props
 * @returns input template
 */
export const MgInputCheckboxList: FunctionalComponent<MgInputCheckboxListProps> = (props: MgInputCheckboxListProps): VNode[] => (
  <ul
    class="mg-c-input__input-group-container"
    role="list"
    aria-describedby={props.displaySearchInput ? 'search-results' : undefined}
    aria-label={props.displaySearchInput ? props.messages.searchResults : undefined}
    aria-live={props.displaySearchInput ? 'polite' : undefined}
    id={props.id}
  >
    {props.checkboxes.map(input => (
      <li key={input._id} class={{ 'mg-c-input__input-group': true, 'mg-c-input__input-group--disabled': props.disabled || input.disabled }}>
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
      </li>
    ))}
  </ul>
);
