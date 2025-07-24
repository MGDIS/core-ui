import { beforeEach, describe, expect, test, vi } from 'vitest';
import { setUpHTMLInputElementValidity, setupMutationObserverMock, setUpRequestAnimationFrameMock, setupResizeObserverMock, setupSubmitEventMock } from './unit.ts';
import type { SetupMutationObserverMockParams, setupResizeObserverMockParams } from './unit.conf.ts';

describe('unit', () => {
  describe('setupMutationObserverMock', () => {
    test.each([{}, { disconnect: vi.fn(), observe: ({}) => {}, takeRecords: () => [] }])('Should render html', args => {
      const Mock = setupMutationObserverMock(args as SetupMutationObserverMockParams);
      expect(new Mock(args as MutationCallback)).toMatchSnapshot();
    });
  });
  describe('setupResizeObserverMock', () => {
    test.each([{}, { disconnect: vi.fn(), observe: ({}) => {}, unobserve: () => [] }])('Should render html', args => {
      const Mock = setupResizeObserverMock(args as setupResizeObserverMockParams);
      expect(new Mock(args as ResizeObserverCallback)).toMatchSnapshot();
    });
  });
  describe('setupSubmitEventMock', () => {
    test('Should render html', () => {
      const Mock = setupSubmitEventMock();
      expect(new Mock('test')).toMatchSnapshot();
    });
  });
  describe('setUpRequestAnimationFrameMock', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    test.each([window, global])('Should render html', element => {
      const timer = vi.fn();
      const callback = vi.fn();

      setUpRequestAnimationFrameMock(timer);

      expect(element.requestAnimationFrame).toBeDefined();

      element.requestAnimationFrame(callback);
      vi.runOnlyPendingTimers();

      expect(timer).toHaveBeenCalled();
      expect(callback).toHaveBeenCalled();
    });
  });
  describe('setUpHTMLInputElementValidity', () => {
    test.each([
      { attributes: {}, validity: { valid: true } },
      // number rangeUnderflow
      { attributes: { type: 'number', min: '10', value: '9' }, validity: { rangeUnderflow: true, valid: false } },
      { attributes: { type: 'number', min: '10', value: '10' }, validity: { rangeUnderflow: false, valid: true } },
      // number rangeOverflow
      { attributes: { type: 'number', max: '10', value: '11' }, validity: { rangeOverflow: true, valid: false } },
      { attributes: { type: 'number', max: '10', value: '10' }, validity: { rangeOverflow: false, valid: true } },
      // text rangeOverflow
      { attributes: { type: 'text', max: '10', value: '10' }, validity: { rangeOverflow: false, valid: true } },
      { attributes: { type: 'text', max: '10', value: '11' }, validity: { rangeOverflow: false, valid: true } },
      // date rangeUnderflow
      { attributes: { type: 'date', min: '2025-06-20', value: '2025-06-19' }, validity: { rangeUnderflow: true, valid: false } },
      { attributes: { type: 'date', min: '2025-06-19', value: '2025-06-19' }, validity: { rangeUnderflow: false, valid: true } },
      // number rangeOverflow
      { attributes: { type: 'date', max: '2025-06-18', value: '2025-06-19' }, validity: { rangeOverflow: true, valid: false } },
      { attributes: { type: 'date', max: '2025-06-19', value: '2025-06-19' }, validity: { rangeOverflow: false, valid: true } },
      // number badInput
      { attributes: { type: 'number', value: '10' }, validity: { badInput: false, valid: true } },
      // date badInput
      { attributes: { type: 'date', value: '2025-06-19' }, validity: { badInput: false, valid: true } },
      { attributes: { type: 'date', value: NaN }, validity: { badInput: true, valid: false } },
      // text valueMissing
      { attributes: { type: 'text', value: '', required: true }, validity: { valueMissing: true, valid: false } },
      { attributes: { type: 'text', required: true }, validity: { valueMissing: true, valid: false } },
      { attributes: { type: 'text', value: 'batman', required: true }, validity: { valueMissing: false, valid: true } },
      // password valueMissing
      { attributes: { type: 'password', value: '', required: true }, validity: { valueMissing: true, valid: false } },
      { attributes: { type: 'password', required: true }, validity: { valueMissing: true, valid: false } },
      { attributes: { type: 'password', value: 'batman', required: true }, validity: { valueMissing: false, valid: true } },
      // textarea valueMissing
      { attributes: { type: 'textarea', required: true }, validity: { valueMissing: true, valid: false } },
      { attributes: { type: 'textarea', value: '', required: true }, validity: { valueMissing: true, valid: false } },
      { attributes: { type: 'textarea', value: 'batman', required: true }, validity: { valueMissing: false, valid: true } },
      // number valueMissing
      { attributes: { type: 'number', value: '', required: true }, validity: { valueMissing: true, valid: false } },
      { attributes: { type: 'number', value: '1', required: true }, validity: { valueMissing: false, valid: true } },
      // date valueMissing
      { attributes: { type: 'date', value: '', required: true }, validity: { valueMissing: true, valid: false } },
      { attributes: { type: 'date', value: '2025-06-19', required: true }, validity: { valueMissing: false, valid: true } },
      // checkbox valueMissing
      { attributes: { type: 'checkbox', required: true }, validity: { valueMissing: true, valid: false } },
      { attributes: { type: 'checkbox', checked: '', required: true }, validity: { valueMissing: false, valid: true } },
      // radio valueMissing
      { attributes: { type: 'radio', required: true }, validity: { valueMissing: true, valid: false } },
      { attributes: { type: 'radio', checked: '', required: true }, validity: { valueMissing: false, valid: true } },
      // select valueMissing
      { attributes: { type: 'select', options: ['batman'], required: true }, validity: { valueMissing: true, valid: false } },
      { attributes: { type: 'select', options: ['batman'], value: 'batman', required: true }, validity: { valueMissing: false, valid: true } },
      // input patternMismatch
      { attributes: { type: 'text', value: '1', pattern: '[a-z]' }, validity: { patternMismatch: true, valid: false } },
      { attributes: { type: 'text', value: 'batman', pattern: '[a-z]' }, validity: { patternMismatch: false, valid: true } },
      // text stepMismatch
      { attributes: { type: 'text', value: '2', step: '10' }, validity: { stepMismatch: false, valid: true } },
      // number stepMismatch
      { attributes: { type: 'number', value: '', step: 'any' }, validity: { stepMismatch: false, valid: true } },
      { attributes: { type: 'number', value: '20', step: '10' }, validity: { stepMismatch: false, valid: true } },
      { attributes: { type: 'number', value: '2', step: '10' }, validity: { stepMismatch: true, valid: false } },
      // text tooLong
      { attributes: { type: 'text', value: 'batman', maxLength: '1' }, validity: { tooLong: true, valid: false } },
      { attributes: { type: 'text', value: 'batman', maxLength: '10' }, validity: { tooLong: false, valid: true } },
      // text tooShort
      { attributes: { type: 'text', value: 'batman', minLength: '10' }, validity: { tooShort: true, valid: false } },
      { attributes: { type: 'text', value: 'batman', minLength: '1' }, validity: { tooShort: false, valid: true } },
      // url typeMismatch
      { attributes: { type: 'url', value: 'batman' }, validity: { typeMismatch: true, valid: false } },
      { attributes: { type: 'url', value: 'http://batman.com' }, validity: { typeMismatch: false, valid: true } },
    ])('Should get input validity state (%s)', ({ attributes, validity }: { attributes: Record<string, unknown>; validity: Partial<ValidityState> }) => {
      let input: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
      // HTMLSelectElement
      if (attributes.type === 'select') {
        input = document.createElement('select');
        const defaultOptionElement = document.createElement('option');
        defaultOptionElement.setAttribute('value', '');
        input.appendChild(defaultOptionElement);
        for (const option of attributes.options as string[]) {
          const optionElement = document.createElement('option');
          optionElement.setAttribute('value', option);
          if (option === attributes.value) {
            optionElement.setAttribute('selected', '');
          }
          optionElement.innerText = option;
          input.appendChild(optionElement);
        }
        delete attributes.options;
        delete attributes.valilue;
        delete attributes.type;
      } else if (attributes.type === 'textarea') {
        input = document.createElement('textarea');
        if (typeof attributes.value === 'string') {
          input.value = attributes.value;
        }
        delete attributes.type;
        delete attributes.value;
      }
      // HTMLInputElemenr
      else {
        input = document.createElement('input');
      }

      setUpHTMLInputElementValidity(input as HTMLInputElement);
      Object.keys(attributes).forEach(attr => {
        input.setAttribute(attr, attributes[attr] as string);
      });

      // set custom error
      if (attributes.errorMessage) {
        input.setCustomValidity(attributes.errorMessage as string);
        delete attributes.errorMessage;
      }
      expect(input.validity).toEqual(expect.objectContaining(validity));

      const spyInvalidEvent = vi.spyOn(input, 'dispatchEvent');
      input.checkValidity();

      const expectedEvent = new CustomEvent('invalid', { detail: validity.valid });
      expect(spyInvalidEvent).toBeCalledWith(expect.objectContaining({ ...expectedEvent }));
    });
  });
});
