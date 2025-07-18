import { h } from '@stencil/core';
import { filterArgs } from '@mgdis/core-ui-helpers/dist/storybook';
import type { MgForm as MgFormType } from '../mg-form';

export default {
  component: 'mg-form',
  title: 'Molecules/mg-form',
  parameters: { actions: { handles: ['form-valid', 'form-submit'] } },
};

const args = {
  identifier: 'identifier',
  name: 'input-name',
  readonly: false,
  requiredMessage: undefined,
  ariaRole: undefined,
  labelOnTop: false,
  disabled: false,
};

/**
 * Template
 * @param args - component arguments
 * @returns HTMLElement
 */
const Template = (args: MgFormType): HTMLElement => {
  let form: HTMLMgFormElement;
  let submit: HTMLMgButtonElement;
  const onFormValid = e => {
    if (form === undefined || submit === undefined) return;
    submit.disabled = !e.detail;
  };
  const onSubmit = () => {
    window.alert('Your form has been submitted');
  };
  return (
    <mg-form
      {...filterArgs(args)}
      // eslint-disable-next-line react/jsx-no-bind
      onForm-valid={onFormValid}
      // eslint-disable-next-line react/jsx-no-bind
      onForm-submit={onSubmit}
      ref={e => {
        form = e;
      }}
    >
      <mg-input-checkbox
        identifier="mg-input-checkbox"
        label="mg-input-checkbox label"
        value={[
          { title: 'oui', value: false },
          { title: 'non', value: false },
        ]}
      ></mg-input-checkbox>
      <mg-input-date required identifier="mg-input-date" label="mg-input-date label"></mg-input-date>
      <mg-input-numeric identifier="mg-input-numeric" label="mg-input-numeric label"></mg-input-numeric>
      <mg-input-password identifier="mg-input-password" label="mg-input-password label"></mg-input-password>
      <mg-input-radio identifier="mg-input-radio" label="mg-input-radio label" items={['blu', 'bli', 'bla', 'blo']}></mg-input-radio>
      <mg-input-select identifier="mg-input-select" label="mg-input-select label" items={['blu', 'bli', 'bla', 'blo']}></mg-input-select>
      <mg-input-combobox identifier="mg-input-combobox" label="mg-input-combobox label" items={['batman', 'robin', 'bane', 'joker']} itemsLabel="hero"></mg-input-combobox>
      <mg-input-text identifier="mg-input-text" label="mg-input-text label"></mg-input-text>
      <mg-input-textarea identifier="mg-input-textarea" label="mg-input-textarea label"></mg-input-textarea>
      <mg-input-rich-text-editor identifier="mg-input-rich-text-editor" label="mg-input-rich-text-editor label"></mg-input-rich-text-editor>
      <mg-input-toggle
        identifier="mg-input-toggle"
        label="mg-input-toggle label"
        items={[
          { title: 'non', value: false },
          { title: 'oui', value: true },
        ]}
      >
        <span slot="item-1">non</span>
        <span slot="item-2">oui</span>
      </mg-input-toggle>
      <mg-button
        slot="actions"
        id="can-submit"
        ref={e => {
          submit = e;
        }}
      >
        Submit
      </mg-button>
      <mg-button
        slot="actions"
        variant="secondary"
        type="button"
        // eslint-disable-next-line react/jsx-no-bind
        onClick={() => {
          form.displayError();
        }}
      >
        Display errors
      </mg-button>
      <mg-button slot="actions" variant="secondary" type="reset">
        Reset form
      </mg-button>
    </mg-form>
  );
};

export const MgForm = {
  render: Template,
  args,
};
