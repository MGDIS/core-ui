import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgInputFile } from '../mg-input-file';
import { MgButton } from '../../../../atoms/mg-button/mg-button';
import { MgIcon } from '../../../../atoms/mg-icon/mg-icon';
import messages from '../../../../../locales/en/messages.json';
import { MgInput } from '../../mg-input/mg-input';
import { MgInputTitle } from '../../../../atoms/internals/mg-input-title/mg-input-title';
import { tooltipPositions } from '../../mg-input/mg-input.conf';
import { toString } from '@mgdis/core-ui-helpers/dist/utils';
import { setUpRequestAnimationFrameMock } from '@mgdis/core-ui-helpers/dist/tests';

const getPage = (args, content?) => {
  const page = newSpecPage({
    components: [MgInputFile, MgButton, MgIcon, MgInput, MgInputTitle],
    template: () => <mg-input-file {...args}>{content}</mg-input-file>,
  });

  jest.runAllTimers();
  setUpRequestAnimationFrameMock(jest.runOnlyPendingTimers);

  return page;
};

const setFile = (fileName = 'batman') => new File(['file content'], fileName, { type: 'text/plain' });

describe('mg-input-file', () => {
  beforeEach(() => jest.useFakeTimers({ legacyFakeTimers: true }));
  afterEach(() => {
    jest.runOnlyPendingTimers();
  });
  test.each([
    {},
    { value: [setFile()] }, // one file
    { value: [setFile(), setFile('joker')], multiple: true }, // multiple files
    { labelHide: true },
    { labelOnTop: true },
    { required: true, value: ['batman'], helpText: 'My help text' },
    { maxSize: 5000 },
    { accept: '.pdf' },
    { accept: '.pdf', maxSize: 5000 },
    { required: true, disabled: true },
    { required: true, disabled: true, value: [setFile()] },
    { tooltip: 'My Tooltip Message' },
    { tooltip: 'My Tooltip Message', labelOnTop: true },
    { tooltip: 'My Tooltip Message', tooltipPosition: 'label' },
    { tooltip: 'My Tooltip Message', tooltipPosition: 'input', labelOnTop: true },
  ])('Should render with args %s:', async args => {
    const { root } = await getPage({ label: 'label', identifier: 'identifier', ...args });
    expect(root).toMatchSnapshot();
  });

  test('Should render with interactive helpText', async () => {
    const page = await getPage({ label: 'label', identifier: 'identifier', helpText: '<a href="#">My help text</a>' });
    expect(page.root).toMatchSnapshot();

    const element = page.doc.querySelector('mg-input-file');
    const mgButton = element.shadowRoot.querySelector('mg-button');

    // mock focus event on input
    mgButton.dispatchEvent(new CustomEvent('focus', { bubbles: true }));
    await page.waitForChanges();

    expect(page.root).toMatchSnapshot();

    // add event listeners to link and document
    const helpTextLink: HTMLAnchorElement = element.shadowRoot.querySelector('[slot="help-text"] a');
    const helpTextLinkClick = jest.fn();
    const documentClick = jest.fn();
    helpTextLink.addEventListener('click', helpTextLinkClick);
    page.doc.addEventListener('click', documentClick);

    // mock blur event on link click
    mgButton.dispatchEvent(new CustomEvent('blur', { bubbles: true }));
    await page.waitForChanges();
    // mock link click
    helpTextLink.click();
    await page.waitForChanges();

    expect(helpTextLinkClick).toHaveBeenCalled();
    expect(documentClick).toHaveBeenCalled();
    expect(page.root).toMatchSnapshot();
  });

  describe('errors with invalid properties', () => {
    test.each(['', ' ', undefined])('Should not render with invalid identifier property: %s', async identifier => {
      expect.assertions(1);
      try {
        await getPage({ identifier });
      } catch (err) {
        expect(err.message).toEqual(`<mg-input> prop "identifier" is required and must be a string. Passed value: ${identifier}.`);
      }
    });

    test('Should log an error with invalid "identifier" property', async () => {
      const identifier = '{{batman}}';
      const spy = jest.spyOn(console, 'error');
      expect.assertions(1);

      try {
        await getPage({ identifier, label: 'test' });
      } catch {
        expect(spy).toHaveBeenCalledWith(`<mg-input> prop "identifier" value is invalid. Passed value: ${identifier}.`);
      }
    });

    test.each(['', ' ', undefined])('Should throw error with invalid label property: %s', async label => {
      expect.assertions(1);
      try {
        await getPage({ identifier: 'identifier', label });
      } catch (err) {
        expect(err.message).toEqual(`<mg-input> prop "label" is required and must be a string. Passed value: ${label}.`);
      }
    });

    test('Should throw an error with labelOnTop & labelHide set to true', async () => {
      expect.assertions(1);
      try {
        await getPage({ identifier: 'identifier', label: 'batman', labelOnTop: true, labelHide: true });
      } catch (err) {
        expect(err.message).toEqual('<mg-input> prop "labelOnTop" must not be paired with the prop "labelHide".');
      }
    });

    test.each(['batman', {}, 5, false])('Should not render with invalid items property: %s', async value => {
      expect.assertions(1);
      try {
        await getPage({ identifier: 'identifier', label: 'label', value });
      } catch (err) {
        expect(err.message).toEqual(`<mg-input-file> prop "value" must be an array of strings or File objects. Passed value: ${toString(value)}.`);
      }
    });

    test.each(['batman', {}, 5, false])('Should not render with invalid tooltipPosition property: %s', async tooltipPosition => {
      expect.assertions(1);
      try {
        await getPage({ identifier: 'identifier', label: 'label', tooltipPosition });
      } catch (err) {
        expect(err.message).toEqual(`<mg-input> prop "tooltipPosition" must be one of: ${tooltipPositions.join(', ')}. Passed value: ${toString(tooltipPosition)}.`);
      }
    });

    test.each([{}, []])('Should not render with invalid accept property: %s', async accept => {
      expect.assertions(1);
      try {
        await getPage({ identifier: 'identifier', label: 'label', accept });
      } catch (err) {
        expect(err.message).toEqual(`<mg-input-file> prop "accept" must be a valid string.`);
      }
    });

    test('Should throw an error with invalid multiple & value configuration', async () => {
      expect.assertions(1);
      try {
        await getPage({ identifier: 'identifier', label: 'label', multiple: false, value: [setFile(), setFile('joker')] });
      } catch (err) {
        expect(err.message).toEqual('<mg-input-file> prop "value" must be a single file when prop "multiple" is set to false.');
      }
    });
  });

  test.each([
    { validity: true, valueMissing: false },
    { validity: false, valueMissing: true },
    { validity: false, valueMissing: false },
  ])('Should update in case next state is validity (%s), valueMissing (%s)', async ({ validity, valueMissing }) => {
    const args = { label: 'label', identifier: 'identifier', patternErrorMessage: 'Non' };
    const page = await getPage(args);

    const element = page.doc.querySelector('mg-input-file');
    const input = element.shadowRoot.querySelector('input');
    const mgButton = element.shadowRoot.querySelector('mg-button');

    //mock validity
    input.checkValidity = jest.fn(() => validity);
    Object.defineProperty(input, 'validity', {
      get: jest.fn(() => ({
        valueMissing,
      })),
    });

    mgButton.dispatchEvent(new CustomEvent('blur', { bubbles: true }));
    await page.waitForChanges();

    if (validity) {
      expect(page.rootInstance.errorMessage).toBeUndefined();
    } else if (valueMissing) {
      expect(page.rootInstance.errorMessage).toEqual(messages.errors.required);
    }
    expect(page.rootInstance.valid).toEqual(validity);
    expect(page.rootInstance.invalid).toEqual(!validity);
    if (valueMissing) {
      expect(page.root).toMatchSnapshot(); //Snapshot with disabled FALSE
      element['disabled'] = true;
      await page.waitForChanges();
      expect(page.root).toMatchSnapshot(); //Snapshot with disabled TRUE
    }
  });

  test('Should display error when maxSize is exceeded', async () => {
    const page = await getPage({ label: 'label', identifier: 'identifier', maxSize: 5 });
    const element = page.doc.querySelector('mg-input-file');
    const input = element.shadowRoot.querySelector('input');
    const button = element.shadowRoot.querySelector('mg-button');

    // Simulate button click to open file dialog
    button.dispatchEvent(new CustomEvent('click', { bubbles: true }));
    await page.waitForChanges();

    // Simulate input change event with a file exceeding maxSize
    const file = setFile();
    Object.defineProperty(file, 'size', {
      get: jest.fn().mockReturnValue(10),
    }); // file size 10 Bytes
    input.files = new Set([file]) as unknown as FileList;
    // fake files size
    input.dispatchEvent(new CustomEvent('change', { bubbles: true }));
    await page.waitForChanges();

    // Simulate blur event to trigger validation
    button.dispatchEvent(new CustomEvent('blur', { bubbles: true }));
    await page.waitForChanges();

    // Verify error message is displayed
    expect(page.rootInstance.errorMessage).toEqual(messages.input.file.errors.maxSize.replace('{{maxSize}}', '5octets'));
    expect(page.root).toMatchSnapshot();
  });

  describe('events', () => {
    test('Should handle input change event', async () => {
      const page = await getPage({ label: 'label', identifier: 'identifier' });
      const element = page.doc.querySelector('mg-input-file');
      const input = element.shadowRoot.querySelector('input');

      // Simulate input change event with two files
      input.files = new Set([setFile()]) as unknown as FileList;
      input.dispatchEvent(new CustomEvent('change', { bubbles: true }));
      await page.waitForChanges();

      // Verify value is updated
      expect(element.value).toEqual(Array.from(input.files));
      expect(page.root).toMatchSnapshot();
    });

    test('Should handle button click event', async () => {
      const page = await getPage({ label: 'label', identifier: 'identifier' });
      const element = page.doc.querySelector('mg-input-file');
      const input = element.shadowRoot.querySelector('input');
      const button = element.shadowRoot.querySelector('mg-button');

      // Mock input click method
      input.click = jest.fn();

      // Simulate button click event
      button.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      await page.waitForChanges();

      // Verify input click method is called
      expect(input.click).toHaveBeenCalled();
    });

    test.each([{ value: [setFile()] }, { value: [setFile(), setFile('joker')], multiple: true }])('Should handle delete file button click, (%s)', async args => {
      const page = await getPage({ label: 'label', identifier: 'identifier', ...args });
      const element = page.doc.querySelector('mg-input-file');
      const addButton = element.shadowRoot.querySelector('mg-button');
      const deleteButtons = element.shadowRoot.querySelector('.mg-c-input__file-delete-button');

      jest.spyOn(addButton, 'focus');

      // Simulate delete button click event for the first file
      deleteButtons.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      await page.waitForChanges();

      // Verify value is updated
      expect(element.value).toEqual(undefined);
      expect(addButton.focus).toHaveBeenCalled();
      expect(page.root).toMatchSnapshot();
    });
  });

  describe('methods', () => {
    describe('setFocus', () => {
      test("should trigger input focus method with setFocus() component's public method", async () => {
        const page = await getPage({ label: 'label', identifier: 'identifier' });
        const element = page.doc.querySelector('mg-input-file');
        const button = element.shadowRoot.querySelector('mg-button');

        if (button !== null) {
          button.focus = jest.fn();
        }

        await element.setFocus();

        await page.waitForChanges();

        expect(button.focus).toHaveBeenCalled();
      });
    });

    describe('setError', () => {
      test.each([true, false].flatMap(valid => [true, false].map(lock => ({ valid, lock }))))(
        "Should display override error with setError component's public method (%s)",
        async ({ valid, lock }) => {
          const getErrorMessage = (element: HTMLMgInputFileElement) => element.shadowRoot.querySelector('#identifier-error')?.textContent;

          const customErrorMessage = 'Override error';
          const page = await getPage({ label: 'label', identifier: 'identifier', required: true });
          let validity = false;

          expect(page.root).toMatchSnapshot();

          const element = page.doc.querySelector('mg-input-file');
          const mgButton = element.shadowRoot.querySelector('mg-button');
          const input = element.shadowRoot.querySelector('input');

          //mock validity
          input.checkValidity = jest.fn(() => validity);
          Object.defineProperty(input, 'validity', {
            get: jest.fn(() => ({
              valueMissing: !validity,
            })),
          });

          await element.setError(valid, customErrorMessage, lock);

          await page.waitForChanges();

          expect(getErrorMessage(element)).toEqual(valid ? undefined : customErrorMessage);
          expect(page.root).toMatchSnapshot();

          mgButton.dispatchEvent(new CustomEvent('blur', { bubbles: true }));
          await page.waitForChanges();

          if (lock && !valid) {
            expect(getErrorMessage(element)).toEqual(customErrorMessage);
          } else {
            expect(getErrorMessage(element)).toEqual('This field is required.');
          }
          expect(page.root).toMatchSnapshot();

          //mock validity
          validity = true;
          mgButton.dispatchEvent(new CustomEvent('blur', { bubbles: true }));
          await page.waitForChanges();

          if (lock && !valid) {
            expect(getErrorMessage(element)).toEqual(customErrorMessage);
          } else {
            expect(getErrorMessage(element)).toEqual(undefined);
          }
        },
      );

      test.each([
        {
          valid: '',
          errorMessage: 'Override error',
          error: '<mg-input-file> method "setError()" param "valid" must be a boolean.',
        },
        {
          valid: undefined,
          errorMessage: 'Override error',
          error: '<mg-input-file> method "setError()" param "valid" must be a boolean.',
        },
        {
          valid: true,
          errorMessage: ' ',
          error: '<mg-input-file> method "setError()" param "errorMessage" must be a string.',
        },
        {
          valid: true,
          errorMessage: true,
          error: '<mg-input-file> method "setError()" param "errorMessage" must be a string.',
        },
      ])("shloud throw error with setError component's public method invalid params", async params => {
        expect.assertions(1);
        try {
          const page = await getPage({ label: 'label', identifier: 'identifier', required: true });
          const element = page.doc.querySelector('mg-input-file');

          await element.setError(params.valid as unknown as boolean, params.errorMessage as unknown as string);
          await page.waitForChanges();
        } catch (err) {
          expect(err.message).toEqual(params.error);
        }
      });
    });

    describe('displayError', () => {
      test("display error with displayError component's public method", async () => {
        const page = await getPage({ label: 'label', identifier: 'identifier', required: true });

        expect(page.root).toMatchSnapshot();

        const element = page.doc.querySelector('mg-input-file');
        const input = element.shadowRoot.querySelector('input');

        //mock validity
        input.checkValidity = jest.fn(() => false);
        Object.defineProperty(input, 'validity', {
          get: jest.fn(() => ({
            valueMissing: true,
          })),
        });

        await element.displayError();

        await page.waitForChanges();

        expect(page.root).toMatchSnapshot();
      });

      test.each(['fr', 'xx'])('display error message with locale: %s', async lang => {
        const page = await getPage({ label: 'label', identifier: 'identifier', required: true, lang });
        const element = page.doc.querySelector('mg-input-file');
        const input = element.shadowRoot.querySelector('input');

        //mock validity
        input.checkValidity = jest.fn(() => false);
        Object.defineProperty(input, 'validity', {
          get: jest.fn(() => ({
            valueMissing: true,
          })),
        });

        await element.displayError();

        await page.waitForChanges();

        expect(page.root).toMatchSnapshot();
      });

      test('Should remove error on input', async () => {
        const page = await getPage({ label: 'label', identifier: 'identifier', required: true });
        const element = page.doc.querySelector('mg-input-file');
        const input = element.shadowRoot.querySelector('input');
        const mgButton = element.shadowRoot.querySelector('mg-button');

        //mock validity
        input.checkValidity = jest.fn().mockReturnValueOnce(false).mockReturnValueOnce(true).mockReturnValueOnce(true);
        Object.defineProperty(input, 'validity', {
          get: jest
            .fn()
            .mockReturnValueOnce({
              valueMissing: true,
            })
            .mockReturnValueOnce({
              valueMissing: true,
            })
            .mockReturnValueOnce({
              valueMissing: true,
            })
            .mockReturnValueOnce({
              valueMissing: false,
            })
            .mockReturnValueOnce({
              valueMissing: false,
            }),
        });

        await element.displayError();
        await page.waitForChanges();

        expect(page.rootInstance.hasDisplayedError).toEqual(true);
        expect(page.rootInstance.errorMessage).toEqual(messages.errors.required);

        input.files = new Map() as unknown as FileList;
        input.files[0] = setFile();
        input.dispatchEvent(new CustomEvent('change', { bubbles: true }));
        await page.waitForChanges();

        // Error message should disapear but we keep the hasDisplayedError status
        expect(page.rootInstance.hasDisplayedError).toEqual(true);
        expect(page.rootInstance.errorMessage).toBeUndefined();

        mgButton.dispatchEvent(new CustomEvent('blur', { bubbles: true }));
        await page.waitForChanges();

        // On blur the hasDisplayedError status change
        expect(page.rootInstance.hasDisplayedError).toEqual(false);
      });

      test('Should remove error on input when required change dynamically', async () => {
        const page = await getPage({ label: 'label', identifier: 'identifier', required: true });
        const element = page.doc.querySelector('mg-input-file');
        const input = element.shadowRoot.querySelector('input');

        //mock validity
        input.checkValidity = jest.fn().mockReturnValueOnce(false).mockReturnValueOnce(true).mockReturnValueOnce(true);
        Object.defineProperty(input, 'validity', {
          get: jest
            .fn()
            .mockReturnValueOnce({
              valueMissing: true,
            })
            .mockReturnValueOnce({
              valueMissing: true,
            })
            .mockReturnValueOnce({
              valueMissing: true,
            })
            .mockReturnValueOnce({
              valueMissing: false,
            })
            .mockReturnValueOnce({
              valueMissing: false,
            }),
        });

        await element.displayError();
        await page.waitForChanges();

        expect(page.rootInstance.hasDisplayedError).toEqual(true);
        expect(page.rootInstance.errorMessage).toEqual(messages.errors.required);

        element.required = false;
        await page.waitForChanges();

        // Error message should disapear and change the hasDisplayedError status
        expect(page.rootInstance.hasDisplayedError).toEqual(false);
        expect(page.rootInstance.errorMessage).toBeUndefined();

        element.required = true;
        await page.waitForChanges();

        // If back on required the message is still not displayed
        expect(page.rootInstance.hasDisplayedError).toEqual(false);
        expect(page.rootInstance.errorMessage).toBeUndefined();
      });
    });

    describe('reset', () => {
      test('Should reset value', async () => {
        const page = await getPage({
          label: 'label',
          identifier: 'identifier',
        });
        const element = page.doc.querySelector('mg-input-file');
        const input = element.shadowRoot.querySelector('input');

        // Simulate input with invalid value
        input.files = new Set([setFile()]) as unknown as FileList;
        input.dispatchEvent(new CustomEvent('change', { bubbles: true }));
        await page.waitForChanges();

        // Verify initial value is set
        expect(element.value).toEqual(Array.from(input.files));

        const requestAnimationFrameSpy = jest.spyOn(global, 'requestAnimationFrame');
        // Call reset method
        await element.reset();
        await page.waitForChanges();

        expect(requestAnimationFrameSpy).toHaveBeenCalled();
        // Verify value has been reset
        expect(element.value).toEqual(undefined);
      });

      test.each([true, false])('Should reset displayed error, lock %s', async lock => {
        const page = await getPage({
          label: 'label',
          identifier: 'identifier',
        });
        const element = page.doc.querySelector('mg-input-file');

        // Set error message
        await element.setError(false, "Message d'erreur de test", lock);
        await page.waitForChanges();

        // Verify error state
        expect(page.root).toMatchSnapshot();

        const requestAnimationFrameSpy = jest.spyOn(global, 'requestAnimationFrame');
        // Call reset method
        await element.reset();
        await page.waitForChanges();

        expect(requestAnimationFrameSpy).toHaveBeenCalled();
        // Verify reset state
        expect(element.shadowRoot.querySelector('#identifier-error')?.textContent).toEqual(undefined);
        expect(page.root).toMatchSnapshot();
      });
    });
  });
});
