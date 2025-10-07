import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgForm } from '../mg-form';
import { MgButton } from '../../../atoms/mg-button/mg-button';
import { buttonTypes } from '../../../atoms/mg-button/mg-button.conf';
import { MgInputCheckbox } from '../../inputs/mg-input-checkbox/mg-input-checkbox';
import { MgInputDate } from '../../inputs/mg-input-date/mg-input-date';
import { MgInputNumeric } from '../../inputs/mg-input-numeric/mg-input-numeric';
import { MgInputPassword } from '../../inputs/mg-input-password/mg-input-password';
import { MgInputRadio } from '../../inputs/mg-input-radio/mg-input-radio';
import { MgInputSelect } from '../../inputs/mg-input-select/mg-input-select';
import { MgInputText } from '../../inputs/mg-input-text/mg-input-text';
import { MgInputTextarea } from '../../inputs/mg-input-textarea/mg-input-textarea';
import { MgInputToggle } from '../../inputs/mg-input-toggle/mg-input-toggle';
import { HTMLMgInputsElement } from '../../inputs/mg-input/mg-input.conf';
import { setUpHTMLInputElementValidity, setupMutationObserverMock, setUpRequestAnimationFrameMock, setupSubmitEventMock } from '@mgdis/core-ui-helpers/dist/tests';
import { MgInputTitle } from '../../../atoms/internals/mg-input-title/mg-input-title';
import { requiredMessageStatus, roles } from '../mg-form.conf';
import { MgInput } from '../../inputs/mg-input/mg-input';
import { MgInputRichTextEditor } from '../../inputs/mg-input-rich-text-editor/mg-input-rich-text-editor';
import { MgInputCombobox } from '../../inputs/mg-input-combobox/mg-input-combobox';
import { MgFieldset } from '../../mg-fieldset/mg-fieldset';

const getPage = async (args, content?) => {
  const page = await newSpecPage({
    components: [
      MgForm,
      MgInputCheckbox,
      MgInputCombobox,
      MgInputDate,
      MgInputNumeric,
      MgInputPassword,
      MgInputRadio,
      MgInputSelect,
      MgInputRichTextEditor,
      MgInputText,
      MgInputTextarea,
      MgInputToggle,
      MgButton,
      MgInputTitle,
      MgInput,
      MgFieldset,
    ],
    template: () => <mg-form {...args}>{content}</mg-form>,
  });

  jest.runOnlyPendingTimers();
  setUpRequestAnimationFrameMock(jest.runOnlyPendingTimers);

  // define combobx validity mocks
  const combobox = page.doc.querySelector('mg-input-combobox');
  const comboboxInput = combobox?.shadowRoot.querySelector('input');
  if (![null, undefined].includes(comboboxInput)) {
    setUpHTMLInputElementValidity(comboboxInput);
  }

  await page.waitForChanges();

  return page;
};

const getFieldsetContent = () => (
  <mg-fieldset
    {...{
      legend: 'legend',
      identifier: 'fieldset',
    }}
  >
    <mg-input-radio identifier="mg-input-radio" label="mg-input-radio label" items={['batman', 'robin', 'joker', 'bane']}></mg-input-radio>
    <mg-input-text identifier="mg-input-text" label="mg-input-text label"></mg-input-text>
  </mg-fieldset>
);

const getSlottedContent = () => [
  <mg-input-checkbox
    identifier="mg-input-checkbox"
    label="mg-input-checkbox label"
    value={[
      { title: 'oui', value: true },
      { title: 'non', value: false },
    ]}
  ></mg-input-checkbox>,
  <mg-input-combobox identifier="mg-input-select" label="mg-input-select label" itemsLabel="tests" items={['blu', 'bli', 'bla', 'blo']}></mg-input-combobox>,
  <mg-input-date identifier="mg-input-date" label="mg-input-date label"></mg-input-date>,
  <mg-input-numeric identifier="mg-input-numeric" label="mg-input-numeric label"></mg-input-numeric>,
  <mg-input-password identifier="mg-input-password" label="mg-input-password label"></mg-input-password>,
  <mg-input-radio identifier="mg-input-radio" label="mg-input-radio label" items={['blu', 'bli', 'bla', 'blo']}></mg-input-radio>,
  <mg-input-select identifier="mg-input-select" label="mg-input-select label" items={['blu', 'bli', 'bla', 'blo']}></mg-input-select>,
  <mg-input-rich-text-editor identifier="mg-input-rich-text-editor" label="mg-input-rich-text-editor label"></mg-input-rich-text-editor>,
  <mg-input-text identifier="mg-input-text" label="mg-input-text label"></mg-input-text>,
  <mg-input-textarea identifier="mg-input-textarea" label="mg-input-textarea label"></mg-input-textarea>,
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
  </mg-input-toggle>,
];

const setCheckValitidy = (input: HTMLMgInputsElement): void => {
  const shadowInputs: NodeListOf<HTMLInputElement> = input.shadowRoot.querySelectorAll('input, textarea, select');
  shadowInputs.forEach(input => {
    // select and textarea mock use prototype of MockElement instead of MockHTMLElement
    // so attributes aren't available on the object, but we can get attribute in stringified DOM.
    const required = input.required || input.outerHTML.includes('required=""');
    input.checkValidity = jest.fn(() => !required);

    Object.defineProperty(input, 'validity', {
      get: jest.fn(() => ({
        valueMissing: required,
      })),
    });
  });
};

const setMgInputChecboxeInvalid = (input: HTMLMgInputCheckboxElement): void => {
  input.required = true;
  input.value = [
    { title: 'oui', value: false },
    { title: 'non', value: false },
  ];
};

const requiredFields = [undefined, 'one', 'all', 'multiple', 'single'];

describe('mg-form', () => {
  let fireMo;

  beforeEach(() => {
    jest.useFakeTimers({ legacyFakeTimers: true });

    setupMutationObserverMock({
      observe: function () {
        fireMo = this.cb;
      },
      disconnect: function () {
        return null;
      },
      takeRecords: () => [],
    });
    setupSubmitEventMock();
  });

  afterEach(() => jest.runOnlyPendingTimers());

  test.each([
    { args: { identifier: 'identifier' } },
    { args: { identifier: 'identifier', readonly: true } },
    { args: { identifier: 'identifier', disabled: true } },
    { args: { identifier: 'identifier', labelOnTop: true } },
    { args: { identifier: 'identifier' }, readonly: true },
    ...requiredFields.flatMap(required => [undefined, ...requiredMessageStatus].map(requiredMessage => ({ args: { identifier: 'identifier', requiredMessage }, required }))),
  ])('Should render with args %o:', async ({ args, required, readonly }: Partial<{ args; required; readonly }>) => {
    const slot = required === 'single' ? getSlottedContent()[0] : getSlottedContent();
    if (required === 'one') slot[0].$attrs$.required = true;
    else if (required === 'all')
      slot.forEach(s => {
        s.$attrs$.required = true;
      });
    else if (required === 'multiple') {
      slot[0].$attrs$.required = true;
      slot[1].$attrs$.required = true;
    } else if (required === 'single') slot.$attrs$.required = true;

    if (readonly)
      slot.forEach(s => {
        s.$attrs$.readonly = true;
      });

    const { root } = await getPage(args, slot);
    expect(root).toMatchSnapshot();
  });

  test.each([false, true])('Should display components errors (readonly: %s)', async readonly => {
    const args = { identifier: 'identifier', readonly };

    const slot = [...getSlottedContent(), getFieldsetContent()];
    // Set all elements required
    slot.forEach(s => {
      s.$attrs$.required = true;
    });

    const page = await getPage(args, slot);
    const mgForm = page.doc.querySelector('mg-form');

    if (!readonly) {
      // Mock all input validity
      const mgInputs = Array.from(mgForm.querySelectorAll('*')).filter(
        (node: Node) => node.nodeName.startsWith('MG-INPUT-') && node.nodeName !== 'MG-INPUT-TOGGLE',
      ) as HTMLMgInputsElement[];
      mgInputs.forEach(input => {
        if (input.nodeName.includes('CHECKBOX')) setMgInputChecboxeInvalid(input as HTMLMgInputCheckboxElement);
        setCheckValitidy(input);
      });

      // set fieldset error
      const mgFieldset = page.doc.querySelector('mg-fieldset');
      await mgFieldset.setCustomValidity('this is a custom error');
      await page.waitForChanges();

      jest.runOnlyPendingTimers();
      await page.waitForChanges();

      await mgForm.displayError();
    }

    await page.waitForChanges();

    expect(page.root).toMatchSnapshot();
  });

  test('Should log an error with invalid "identifier" property', async () => {
    const identifier = '{{batman}}';
    const spy = jest.spyOn(console, 'error');
    await getPage({ identifier });
    expect(spy).toHaveBeenLastCalledWith(`<mg-form> prop "identifier" value is invalid. Passed value: ${identifier}.`);
  });

  test.each([undefined, null, ...roles])('Should set form element role from "ariaRole" prop', async ariaRole => {
    const page = await getPage({ identifier: 'identifier', ariaRole }, getSlottedContent());
    await page.waitForChanges();

    expect(page.root).toMatchSnapshot();
  });

  test.each([' ', 'batman'])('Should throw error, case "ariaRole" prop value %s', async ariaRole => {
    expect.assertions(1);
    try {
      await getPage({ identifier: 'identifier', ariaRole }, getSlottedContent());
    } catch (err) {
      expect(err.message).toEqual(`<mg-form> prop "ariaRole" must be one of: ${roles.join(', ')}. Passed value: ${ariaRole}.`);
    }
  });

  test.each([' ', 'batman'])('Should throw error, case "requiredMessage" prop value %s', async requiredMessage => {
    expect.assertions(1);
    try {
      await getPage({ identifier: 'identifier', requiredMessage }, getSlottedContent());
    } catch (err) {
      expect(err.message).toEqual(`<mg-form> prop "requiredMessage" must be one of: ${requiredMessageStatus.join(', ')}. Passed value: ${requiredMessage}.`);
    }
  });

  test.each(['fr', 'xx'])('display error message with locale: %s', async lang => {
    const args = { identifier: 'identifier', lang };

    const slot = getSlottedContent();
    // Set all elements required
    slot.forEach(s => {
      s.$attrs$.required = true;
    });

    const page = await getPage(args, slot);
    const mgForm = page.doc.querySelector('mg-form');

    // Mock all input validity
    const mgInputs = Array.from(mgForm.querySelectorAll('*')).filter(
      (node: Node) => node.nodeName.startsWith('MG-INPUT-') && node.nodeName !== 'MG-INPUT-TOGGLE',
    ) as HTMLMgInputsElement[];
    mgInputs.forEach(input => {
      if (input.nodeName.includes('CHECKBOX')) setMgInputChecboxeInvalid(input as HTMLMgInputCheckboxElement);
      setCheckValitidy(input);
    });
    await page.waitForChanges();

    await mgForm.displayError();

    await page.waitForChanges();

    expect(page.root).toMatchSnapshot();
  });

  test.each([{ type: 'childList' }, { type: 'subtree' }, { type: 'attributes' }])('Should update input list when element is added to DOM', async mutation => {
    const args = { identifier: 'identifier' };
    const slot = getSlottedContent();
    const page = await getPage(args, slot);

    jest.spyOn(page.rootInstance, 'setMgInputs');

    expect(page.rootInstance.setMgInputs).not.toHaveBeenCalled();

    fireMo([mutation]);
    await page.waitForChanges();

    if (mutation.type !== 'attributes') {
      expect(page.rootInstance.setMgInputs).toHaveBeenCalled();
    } else {
      expect(page.rootInstance.setMgInputs).not.toHaveBeenCalled();
    }
  });

  test.each([{ type: 'childList' }, { type: 'subtree' }, { type: 'attributes' }])('Should update mg-form valid when content is updated', async mutation => {
    const args = { identifier: 'identifier' };
    const slots = [
      <mg-input-text required identifier="mg-input-text" label="mg-input-text label"></mg-input-text>,
      <mg-input-text identifier="mg-input-text" label="mg-input-text label"></mg-input-text>,
    ];

    const page = await getPage(args, slots);

    const mgForm = page.doc.querySelector('mg-form');
    Array.from(mgForm.querySelectorAll('*')).forEach(setCheckValitidy);
    await mgForm.displayError();

    await page.waitForChanges();
    expect(mgForm.valid).toEqual(false);

    const mgInputText: HTMLMgInputTextElement = page.doc.querySelector('mg-input-text');
    jest.spyOn(page.rootInstance, 'checkValidity');

    // remove input-text wich trigger the valid=false
    mgInputText.remove();
    fireMo([mutation]);
    await page.waitForChanges();

    expect(mgForm.valid).toEqual(mutation.type !== 'attributes');
    expect(page.rootInstance.checkValidity).toHaveBeenCalledTimes(mutation.type !== 'attributes' ? 1 : 0);
  });

  test.each(['readonly', 'disabled'])('Should update input list when attribute % change', async attribute => {
    const args = { identifier: 'identifier' };
    const slot = getSlottedContent();
    const page = await getPage(args, slot);
    const mgForm = page.doc.querySelector('mg-form');

    jest.spyOn(page.rootInstance, 'setMgInputs');
    jest.spyOn(page.rootInstance, 'setRequiredMessage');

    expect(page.rootInstance.setMgInputs).not.toHaveBeenCalled();
    expect(page.rootInstance.setRequiredMessage).not.toHaveBeenCalled();

    mgForm[attribute] = true;
    await page.waitForChanges();

    expect(page.rootInstance.setMgInputs).toHaveBeenCalled();
    expect(page.rootInstance.setRequiredMessage).toHaveBeenCalled();
  });

  test.each([
    {
      slot: () => [<mg-input-text identifier="mg-input-text" label="mg-input-text label"></mg-input-text>],
      message: null,
    },
    {
      slot: () => [
        <mg-input identifier="mg-input" label="mg-input label">
          <input id="mg-input" type="text" />
        </mg-input>,
      ],
      message: null,
    },
    {
      slot: () => [
        <mg-input-text identifier="mg-input-text" label="mg-input-text label"></mg-input-text>,
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
        </mg-input-toggle>,
      ],
      message: null,
    },
    {
      slot: () => [<mg-input-text required identifier="mg-input-text" label="mg-input-text label"></mg-input-text>],
      message: 'The field is required',
    },
    {
      slot: () => [
        <mg-input required identifier="mg-input" label="mg-input label">
          <input id="mg-input" type="text" required />
        </mg-input>,
      ],
      message: 'The field is required',
    },
    {
      slot: () => [
        <mg-input-text required identifier="mg-input-text" label="mg-input-text label"></mg-input-text>,
        <mg-input-text required identifier="mg-input-text" label="mg-input-text label"></mg-input-text>,
      ],
      message: 'All fields are required',
    },
    {
      slot: () => [
        <mg-input required identifier="mg-input" label="mg-input label">
          <input id="mg-input" type="text" required />
        </mg-input>,
        <mg-input required identifier="mg-input" label="mg-input label">
          <input id="mg-input" type="text" required />
        </mg-input>,
      ],
      message: 'All fields are required',
    },
    {
      slot: () => [
        <mg-input-text required identifier="mg-input-text" label="mg-input-text label"></mg-input-text>,
        <mg-input-text identifier="mg-input-text" label="mg-input-text label"></mg-input-text>,
      ],
      message: 'Field with a <strong class="mg-u-is-asterisk">*</strong> is required',
    },
    {
      slot: () => [
        <mg-input-text required identifier="mg-input-text" label="mg-input-text label"></mg-input-text>,
        <mg-input-text identifier="mg-input-text" label="mg-input-text label"></mg-input-text>,
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
        </mg-input-toggle>,
      ],
      message: 'Field with a <strong class="mg-u-is-asterisk">*</strong> is required',
    },
    {
      slot: () => [
        <mg-input required identifier="mg-input" label="mg-input label">
          <input id="mg-input" type="text" required />
        </mg-input>,
        <mg-input identifier="mg-input" label="mg-input label">
          {' '}
          <input id="mg-input" type="text" />
        </mg-input>,
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
        </mg-input-toggle>,
      ],
      message: 'Field with a <strong class="mg-u-is-asterisk">*</strong> is required',
    },
    {
      slot: () => [
        <mg-input-text required identifier="mg-input-text" label="mg-input-text label"></mg-input-text>,
        <mg-input-text required identifier="mg-input-text" label="mg-input-text label"></mg-input-text>,
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
        </mg-input-toggle>,
      ],
      message: 'All fields are required',
    },
    {
      slot: () => [
        <mg-input-text required identifier="mg-input-text" label="mg-input-text label"></mg-input-text>,
        <mg-input required identifier="mg-input" label="mg-input label">
          <input id="mg-input" type="text" required />
        </mg-input>,
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
        </mg-input-toggle>,
      ],
      message: 'All fields are required',
    },
    {
      slot: () => [
        <mg-input-text required identifier="mg-input-text" label="mg-input-text label"></mg-input-text>,
        <mg-input-text required identifier="mg-input-text" label="mg-input-text label"></mg-input-text>,
        <mg-input-text identifier="mg-input-text" label="mg-input-text label"></mg-input-text>,
      ],
      message: 'Fields with a <strong class="mg-u-is-asterisk">*</strong> are required',
    },
    {
      slot: () => [
        <mg-input required identifier="mg-input" label="mg-input label">
          <input id="mg-input" type="text" required />
        </mg-input>,
        <mg-input required identifier="mg-input" label="mg-input label">
          <input id="mg-input" type="text" required />
        </mg-input>,
        <mg-input identifier="mg-input" label="mg-input label">
          <input id="mg-input" type="text" />
        </mg-input>,
      ],
      message: 'Fields with a <strong class="mg-u-is-asterisk">*</strong> are required',
    },
    {
      slot: () => [
        <mg-input-text required identifier="mg-input-text" label="mg-input-text label"></mg-input-text>,
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
        </mg-input-toggle>,
      ],
      message: 'Field with a <strong class="mg-u-is-asterisk">*</strong> is required',
    },
    {
      slot: () => [
        <mg-input required identifier="mg-input" label="mg-input label">
          <input id="mg-input" type="text" required />
        </mg-input>,
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
        </mg-input-toggle>,
      ],
      message: 'Field with a <strong class="mg-u-is-asterisk">*</strong> is required',
    },
  ])('Should display needeed required message', async ({ slot, message }) => {
    const page = await getPage({ identifier: 'identifier' }, slot());

    expect(page.rootInstance.requiredMessageText).toBe(message);
  });

  test.each([undefined, ...buttonTypes])('Should only emit "submit" event for <mg-button type="submit">, case type is %s', async type => {
    const args = { identifier: 'identifier' };
    const slot = [
      ...getSlottedContent(),
      <div slot="actions">
        <mg-button type={type}>Submit</mg-button>
      </div>,
    ];
    const page = await getPage(args, slot);

    const mgForm = page.doc.querySelector('mg-form');
    const form = mgForm.shadowRoot.querySelector('form');
    const mgButton = page.doc.querySelector('mg-button');

    const formSpy = jest.spyOn(form, 'dispatchEvent');
    const mgFormSpy = jest.spyOn(page.rootInstance.formSubmit, 'emit');

    mgButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    await page.waitForChanges();

    if ([undefined, 'submit'].includes(type)) {
      expect(formSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'submit',
          cancelable: true,
        }),
      );
      expect(mgFormSpy).toHaveBeenCalled();
    } else {
      expect(formSpy).not.toHaveBeenCalled();
      expect(mgFormSpy).not.toHaveBeenCalled();
    }
  });

  test.each([undefined, ...buttonTypes])('Should only emit "reset" event for <mg-button type="reset">, case type is %s', async type => {
    const args = { identifier: 'identifier' };
    const slot = [
      ...getSlottedContent(),
      <div slot="actions">
        <mg-button type={type}>Reset</mg-button>
      </div>,
    ];
    const page = await getPage(args, slot);

    const mgForm = page.doc.querySelector('mg-form');
    const mgButton = page.doc.querySelector('mg-button');

    const mgFormResetSpy = jest.spyOn(page.rootInstance.formReset, 'emit');
    const mgFormValidSpy = jest.spyOn(page.rootInstance.formValid, 'emit');

    // Mock reset method for all inputs
    const mgInputs = Array.from(mgForm.querySelectorAll('*')).filter((node: Node) => node.nodeName.startsWith('MG-INPUT')) as HTMLMgInputsElement[];

    mgInputs.forEach(input => {
      Object.defineProperty(input, 'reset', {
        value: jest.fn(),
        configurable: true,
      });
    });

    mgButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    await page.waitForChanges();

    if (type === 'reset') {
      expect(mgFormResetSpy).toHaveBeenCalledWith(true);
      expect(mgFormValidSpy).toHaveBeenCalledWith(true);
      // Verify that reset was called for each input
      mgInputs.forEach(input => {
        expect(input.reset).toHaveBeenCalled();
      });
    } else {
      expect(mgFormResetSpy).not.toHaveBeenCalled();
      expect(mgFormValidSpy).not.toHaveBeenCalled();
      // Verify that reset was NOT called for each input
      mgInputs.forEach(input => {
        expect(input.reset).not.toHaveBeenCalled();
      });
    }
  });

  test('Should reset all inputs when reset is called', async () => {
    const args = { identifier: 'identifier' };
    const slot = getSlottedContent();
    const page = await getPage(args, slot);
    const mgForm = page.doc.querySelector('mg-form');
    const mgFormSpy = jest.spyOn(page.rootInstance.formReset, 'emit');

    // Mock reset method for all inputs
    const mgInputs = Array.from(mgForm.querySelectorAll('*')).filter((node: Node) => node.nodeName.startsWith('MG-INPUT')) as HTMLMgInputsElement[];

    mgInputs.forEach(input => {
      Object.defineProperty(input, 'reset', {
        value: jest.fn(),
        configurable: true,
      });
    });

    // Call reset method
    await mgForm.reset();

    // Verify that reset was called for each input
    mgInputs.forEach(input => {
      expect(input.reset).toHaveBeenCalled();
    });
    expect(mgFormSpy).toHaveBeenCalledWith(true);
  });

  test('Should not reset inputs when form is readonly', async () => {
    const args = { identifier: 'identifier', readonly: true };
    const slot = getSlottedContent();
    const page = await getPage(args, slot);
    const mgForm = page.doc.querySelector('mg-form');

    // Mock reset method for all inputs
    const mgInputs = Array.from(mgForm.querySelectorAll('*')).filter((node: Node) => node.nodeName.startsWith('MG-INPUT')) as HTMLMgInputsElement[];

    mgInputs.forEach(input => {
      Object.defineProperty(input, 'reset', {
        value: jest.fn(),
        configurable: true,
      });
    });

    // Call reset method
    await mgForm.reset();

    // Verify that reset was not called for each input
    mgInputs.forEach(input => {
      expect(input.reset).not.toHaveBeenCalled();
    });
  });
});
