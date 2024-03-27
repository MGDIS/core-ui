import { h } from '@stencil/core';
import { filterArgs } from '@mgdis/stencil-helpers';
import { requiredMessageStatus, roles } from '../mg-form.conf';
import type { MgForm as MgFormType } from '../mg-form';

export default {
  component: 'mg-form',
  title: 'Molecules/mg-form',
  parameters: { actions: { handles: ['form-valid', 'form-submit'] } },
  argTypes: {
    ariaRole: {
      options: [undefined, ...roles],
      control: { type: 'select' },
    },
    requiredMessage: {
      options: [undefined, ...requiredMessageStatus],
      control: { type: 'select' },
    },
  },
};

const args = {
  identifier: 'identifier',
  name: 'input-name',
  readonly: false,
  disabled: false,
  ariaRole: undefined,
  labelOnTop: false,
  requiredMessage: undefined,
};

/**
 * Template
 * @param args - component arguments
 * @returns HTMLElement
 */
const Template = (args: MgFormType): HTMLElement => {
  let form;
  let submit;
  let canSubmit = false;
  return (
    <mg-form
      {...filterArgs(args)}
      ref={(el: HTMLMgFormElement) => {
        form = el;
        form.addEventListener('form-valid', e => {
          submit.disabled = !e.detail;
          canSubmit = submit.disabled;
        });
        form.addEventListener('form-submit', () => {
          window.alert('Your form has been submitted');
        });
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
      <mg-input-date {...filterArgs({ required: true })} identifier="mg-input-date" label="mg-input-date label"></mg-input-date>
      <mg-input-numeric identifier="mg-input-numeric" label="mg-input-numeric label"></mg-input-numeric>
      <mg-input-password identifier="mg-input-password" label="mg-input-password label"></mg-input-password>
      <mg-input-radio identifier="mg-input-radio" label="mg-input-radio label" items={['blu', 'bli', 'bla', 'blo']}></mg-input-radio>
      <mg-input-select identifier="mg-input-select" label="mg-input-select label" items={['blu', 'bli', 'bla', 'blo']}></mg-input-select>
      <mg-input-text identifier="mg-input-text" label="mg-input-text label"></mg-input-text>
      <mg-input-textarea identifier="mg-input-textarea" label="mg-input-textarea label"></mg-input-textarea>
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
      <div slot="actions" class="mg-l-group-elements mg-l-group-elements--align-right">
        <mg-button
          id="can-submit"
          disabled={canSubmit}
          ref={e => {
            submit = e;
          }}
        >
          Submit
        </mg-button>
        <mg-button
          variant="secondary"
          type="button"
          // eslint-disable-next-line react/jsx-no-bind
          onClick={() => {
            form.displayError();
          }}
        >
          Display errors
        </mg-button>
      </div>
    </mg-form>
  );
};

export const MgForm = {
  render: Template,
  args: { ...args },
};
