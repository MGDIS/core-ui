import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgInputToggle } from '../mg-input-toggle';
import { MgIcon } from '../../../../atoms/mg-icon/mg-icon';
import { MgInput } from '../../mg-input/mg-input';
import { MgInputTitle } from '../../../../atoms/internals/mg-input-title/mg-input-title';
import { tooltipPositions } from '../../mg-input/mg-input.conf';
import { toString } from '@mgdis/core-ui-helpers/dist/utils';

const getPage = (args, customSlots?) =>
  newSpecPage({
    components: [MgInputToggle, MgIcon, MgInput, MgInputTitle],
    template: () => (
      <mg-input-toggle {...args}>
        {customSlots
          ? customSlots
          : args.isIcon
            ? ['cross', 'check'].map((icon: MgIcon['icon'], index) => (
                <span slot={`item-${index + 1}`}>
                  <mg-icon icon={icon}></mg-icon>
                </span>
              ))
            : args.items.map((item, index) => renderSlot(item.title, index))}
      </mg-input-toggle>
    ),
  });

const renderSlot = (title: string, index: number) => <span slot={`item-${index + 1}`}>{title}</span>;

const defaultItems = [
  { title: 'Batman', value: false },
  { title: 'Joker', value: true },
];

const defaultProps = {
  label: 'label',
  identifier: 'identifier',
  items: defaultItems,
};

describe('mg-input-toggle', () => {
  describe.each([
    {
      ...defaultProps,
    },
    {
      ...defaultProps,
      value: '',
    },
    {
      ...defaultProps,
      value: true,
    },
    {
      ...defaultProps,
      value: 'true',
    },
    {
      ...defaultProps,
      isOnOff: false,
    },
    {
      ...defaultProps,
      items: ['Oui', 'Non'],
      isIcon: true,
      isOnOff: true,
    },
  ])('template', templateArgs => {
    test.each([
      {},
      {
        labelOnTop: true,
      },
      {
        labelHide: true,
      },
      {
        readonly: true,
      },
      {
        readonly: true,
        tooltip: 'tooltip',
      },
      {
        readonly: true,
        tooltip: 'My Tooltip Message',
        tooltipPosition: 'input',
      },
      {
        disabled: true,
      },
      {
        helpText: 'Hello Joker',
      },
      {
        tooltip: 'My Tooltip Message',
      },
      {
        tooltip: 'My Tooltip Message',
        labelOnTop: true,
      },
      {
        tooltip: 'My Tooltip Message',
        tooltipPosition: 'label',
      },
      {
        tooltip: 'My Tooltip Message',
        tooltipPosition: 'input',
        labelOnTop: true,
      },
    ])('Should render with args %s:', async args => {
      const { root } = await getPage({ ...templateArgs, ...args });
      expect(root).toMatchSnapshot();
    });
  });

  describe('errors', () => {
    test.each(['', ' ', undefined])('Should not render with invalid identifier property: %s', async identifier => {
      expect.assertions(1);
      try {
        await getPage({
          identifier,
          label: 'label',
          items: defaultItems,
        });
      } catch (err) {
        expect(err.message).toEqual(`<mg-input> prop "identifier" is required and must be a string. Passed value: ${identifier}.`);
      }
    });

    test('Should log an error with invalid "identifier" property', async () => {
      const identifier = '{{batman}}';
      const spy = jest.spyOn(console, 'error');
      expect.assertions(1);
      try {
        await getPage({ identifier, label: 'label', items: defaultItems });
      } catch {
        expect(spy).toHaveBeenCalledWith(`<mg-input> prop "identifier" value is invalid. Passed value: ${identifier}.`);
      }
    });

    test.each(['', ' ', undefined])('Should throw error with invalid label property: %s', async label => {
      expect.assertions(1);
      try {
        await getPage({
          identifier: 'identifier',
          label,
          items: defaultItems,
        });
      } catch (err) {
        expect(err.message).toEqual(`<mg-input> prop "label" is required and must be a string. Passed value: ${label}.`);
      }
    });

    test('Should throw an error with labelOnTop & labelHide set to true', async () => {
      expect.assertions(1);
      try {
        await getPage({ identifier: 'identifier', label: 'Batman', labelOnTop: true, labelHide: true, items: ['Batman', 'Joker'] });
      } catch (err) {
        expect(err.message).toEqual('<mg-input> prop "labelOnTop" must not be paired with the prop "labelHide".');
      }
    });

    test.each(['blu', {}, 5, false])('Should not render with invalid tooltipPosition property: %s', async tooltipPosition => {
      expect.assertions(1);
      try {
        await getPage({ identifier: 'identifier', label: 'label', items: ['batman', 'joker'], tooltipPosition });
      } catch (err) {
        expect(err.message).toEqual(`<mg-input> prop "tooltipPosition" must be one of: ${tooltipPositions.join(', ')}. Passed value: ${toString(tooltipPosition)}.`);
      }
    });

    test('Should throw an error with less than 2 items, case %s', async () => {
      expect.assertions(1);
      const items = [{ title: 'Batman' }];
      try {
        await getPage({ label: 'Batman', items });
      } catch (err) {
        expect(err.message).toEqual(`<mg-input-toggle> prop "items" require 2 items. Passed value: ${toString(items)}.`);
      }
    });

    test.each([[<span></span>], [renderSlot('oui', 1)], ['oui', 'non', 'possible'].map((title, index) => renderSlot(title, index))])(
      'Should throw an error with blank slots',
      async slots => {
        expect.assertions(1);
        try {
          await getPage(defaultProps, slots);
        } catch (err) {
          expect(err.message).toEqual('<mg-input-toggle> 2 slots are required.');
        }
      },
    );

    test.each([
      [['Batman', { title: 'Batman', value: 'Batman' }]],
      [['Batman', { Batman: 'Batman' }]],
      [[true, false]],
      [[1, 2]],
      [[true, 'Batman']],
      [[{ title: 'Batman', value: 'Batman' }, { Batman: 'Batman' }]],
      [
        [
          { title: 'Batman', value: undefined },
          { title: 'Batman', value: 'test' },
        ],
      ],
    ])('Should throw error with invalid items property: %s', async items => {
      expect.assertions(1);
      try {
        await getPage({ label: 'Label', items });
      } catch (err) {
        expect(err.message).toEqual(`<mg-input-toggle> prop "items" is required and all items must be the same type: ToggleValue. Passed value: ${toString(items)}.`);
      }
    });
  });

  test.each([
    {
      items: [
        { title: 'Batman', value: 'a' },
        { title: 'Joker', value: 'b' },
      ],
      expected: 'b',
      value: undefined,
    },
    {
      items: [
        { title: 'Batman', value: 'a' },
        { title: 'Joker', value: 'b' },
      ],
      expected: 'a',
      value: 'b',
    },
    {
      items: [
        { title: 'Batman', value: 1 },
        { title: 'Joker', value: 2 },
      ],
      expected: 2,
      value: 1,
    },
    {
      items: [
        { title: 'Batman', value: false },
        { title: 'robin', value: true },
      ],
      expected: false,
      value: true,
    },
    {
      items: [
        { title: 'Batman', value: true },
        { title: 'robin', value: false },
      ],
      expected: true,
      value: false,
    },
  ])('Should trigger events for items with inputValue: %s', async ({ items, expected, value }) => {
    const args = { label: 'label', items, identifier: 'identifier', helpText: 'My help text', value };
    const page = await getPage(args);

    const mgInputToggle = page.doc.querySelector('mg-input-toggle');
    const button = mgInputToggle.shadowRoot.querySelector('button');

    jest.spyOn(page.rootInstance.valueChange, 'emit');

    button.dispatchEvent(new CustomEvent('focus', { bubbles: true }));
    await page.waitForChanges();

    expect(page.root).toMatchSnapshot(); //Snapshot on focus

    button.dispatchEvent(new CustomEvent('click', { bubbles: true }));
    await page.waitForChanges();

    expect(page.rootInstance.valueChange.emit).toHaveBeenCalledWith(expected);
    expect(page.rootInstance.valueChange.emit).toHaveBeenCalledTimes(1);
  });

  describe('setError', () => {
    test.each([true, false])("should display override error with setError component's public method", async valid => {
      const page = await getPage({ ...defaultProps });

      const mgInputToggle = page.doc.querySelector('mg-input-toggle');

      const spyInputValid = jest.spyOn(page.rootInstance.inputValid, 'emit');

      await mgInputToggle.setError(valid, 'error Batman');

      await page.waitForChanges();

      expect(spyInputValid).toHaveBeenCalledTimes(1);

      expect(page.root).toMatchSnapshot();
    });

    test.each([
      {
        valid: '',
        errorMessage: 'Override error',
        error: '<mg-input-toggle> method "setError()" param "valid" must be a boolean.',
      },
      {
        valid: undefined,
        errorMessage: 'Override error',
        error: '<mg-input-toggle> method "setError()" param "valid" must be a boolean.',
      },
      {
        valid: true,
        errorMessage: ' ',
        error: '<mg-input-toggle> method "setError()" param "errorMessage" must be a string.',
      },
      {
        valid: true,
        errorMessage: true,
        error: '<mg-input-toggle> method "setError()" param "errorMessage" must be a string.',
      },
    ])("shloud throw error with setError component's public method invalid params", async params => {
      expect.assertions(1);
      try {
        const page = await getPage({ ...defaultProps });

        const mgInputToggle = page.doc.querySelector('mg-input-toggle');
        await mgInputToggle.setError(params.valid as unknown as boolean, params.errorMessage as unknown as string);

        await page.waitForChanges();
      } catch (err) {
        expect(err.message).toEqual(params.error);
      }
    });
  });

  describe('reset method', () => {
    test('Should reset value', async () => {
      const page = await getPage({
        ...defaultProps,
        items: [
          { title: 'Non', value: false },
          { title: 'Oui', value: true },
        ],
      });
      const mgInputToggle = page.doc.querySelector('mg-input-toggle');
      const button = mgInputToggle.shadowRoot.querySelector('button');

      // Simulate a click to change the value
      button.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      await page.waitForChanges();

      // Verify the value has changed
      expect(mgInputToggle.value).toEqual(true);

      // Call reset method
      await mgInputToggle.reset();
      await page.waitForChanges();

      // Verify the value has been reset
      expect(mgInputToggle.value).toEqual(false);
    });

    test('Should reset error message when error is displayed', async () => {
      const page = await getPage({
        ...defaultProps,
        items: [
          { title: 'Non', value: false },
          { title: 'Oui', value: true },
        ],
      });
      const mgInputToggle = page.doc.querySelector('mg-input-toggle');

      // Add an error message
      await mgInputToggle.setError(false, "Message d'erreur de test");
      await page.waitForChanges();

      // Verify initial state
      expect(page.root).toMatchSnapshot();

      // Call reset method
      await mgInputToggle.reset();
      await page.waitForChanges();

      // Verify reset state
      expect(page.root).toMatchSnapshot();
    });

    test('Should not reset value when component is readonly', async () => {
      // Initialise with readonly and a value
      const page = await getPage({
        ...defaultProps,
        items: [
          { title: 'Non', value: false },
          { title: 'Oui', value: true },
        ],
        readonly: true,
        value: true,
      });
      const mgInputToggle = page.doc.querySelector('mg-input-toggle');

      // Capture initial value
      const initialValue = mgInputToggle.value;

      // Try to reset
      await mgInputToggle.reset();
      await page.waitForChanges();

      // Verify value remains unchanged
      expect(mgInputToggle.value).toEqual(initialValue);
    });
  });
});
