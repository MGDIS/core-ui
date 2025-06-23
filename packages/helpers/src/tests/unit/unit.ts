import type { SetupMutationObserverMockParams, setupResizeObserverMockParams } from './unit.conf';

/**
 * Utility function that mocks the `MutationObserver` API. Recommended to execute inside `beforeEach`.
 * @param mutationObserverMock - Parameter that is sent to the `Object.defineProperty`
 * overwrite method. `jest.fn()` mock functions can be passed here if the goal is to not only
 * mock the mutation observer, but its methods.
 * You can manually fire an intersection entry:
 * @param mutationObserverMock - configuration object
 * @returns Mocked MutationObserver
 * @example
 * ```
 * let fireMo;
 * setupMutationObserverMock({
 *   observe: function () {
 *     fireMo = this.cb;
 *   },
 * });
 * ...
 * fireMo([{ type: 'childList', addedNodes: [AMockElemenet, AnotherMockElemenet], target: yourMockElemenet }]);;
 * ```
 */
export const setupMutationObserverMock = ({ disconnect, observe, takeRecords }: SetupMutationObserverMockParams): typeof MutationObserver => {
  class MockMutationObserver implements MutationObserver {
    /**
     *
     */
    disconnect: () => void = disconnect;
    /**
     *
     */
    observe: (target: Node, options?: MutationObserverInit) => void = observe;
    /**
     *
     */
    takeRecords: () => MutationRecord[] = takeRecords;
    /**
     *
     */
    cb: MutationCallback;
    constructor(fn: MutationCallback) {
      this.cb = fn;
    }
  }

  [window, global].forEach(element => {
    Object.defineProperty(element, 'MutationObserver', {
      writable: true,
      configurable: true,
      value: MockMutationObserver,
    });
  });

  return MockMutationObserver;
};

/**
 * Utility function that mocks the `ResizeObserver` API. Recommended to execute inside `beforeEach`.
 * @param resizeObserverMock - Parameter that is sent to the `Object.defineProperty`
 * overwrite method. `jest.fn()` mock functions can be passed here if the goal is to not only
 * mock the resize observer, but its methods.
 * You can manually fire an intersection entry:
 * @param resizeObserverMock - configuration object
 * @returns Mocked ResizeObserver
 * @example
 * ```
 * let fireRo;
 * setupResizeObserverMock({
 *   observe: function () {
 *     fireRo = this.cb;
 *   },
 * });
 * ...
 * fireRo([{
 *  borderBoxSize: ResizeObserverSize[],
 *  contentBoxSize: ResizeObserverSize[],
 *  contentRect: DOMRectReadOnly,
 *  devicePixelContentBoxSize: ResizeObserverSize[],
 *  target: yourMockElemenet
 * }]);;
 * ```
 */
export const setupResizeObserverMock = ({ disconnect, observe }: setupResizeObserverMockParams): typeof ResizeObserver => {
  class MockResizeObserver implements ResizeObserver {
    /**
     *
     */
    disconnect: () => void = disconnect;
    /**
     *
     */
    observe: (target: Element, options?: ResizeObserverOptions) => void = observe;
    /**
     *
     */
    unobserve!: () => void;
    /**
     *
     */
    cb: ResizeObserverCallback;
    constructor(fn: ResizeObserverCallback) {
      this.cb = fn;
    }
  }

  [window, global].forEach(element => {
    Object.defineProperty(element, 'ResizeObserver', {
      writable: true,
      configurable: true,
      value: MockResizeObserver,
    });
  });

  return MockResizeObserver;
};

class MockCustomEvent extends Event {
  /**
   *
   */
  detail: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

/**
 * Utility function that mocks the `SubmitEvent` API. Recommended to execute inside `beforeEach`.
 * @example
 * ```
 * setupSubmitEventMock();
 * ```
 * @returns custom event mock
 */
export const setupSubmitEventMock = (): typeof MockCustomEvent => {
  class SubmitEvent extends MockCustomEvent {}

  [window, global].forEach(element => {
    Object.defineProperty(element, 'SubmitEvent', {
      writable: true,
      configurable: true,
      value: SubmitEvent,
    });
  });

  return SubmitEvent;
};

/**
 * Utility function that mocks the `requestAnimationFrame` API. Recommended to execute inside `test`.
 * @example
 * ```
 * setUpRequestAnimationFrameMock(jest.runOnlyPendingTimers);
 * ```
 * @param faketimer - recommended to use jest.runOnlyPendingTimers()
 * @returns custom setUpRequestAnimationFrameMock mock
 */
export const setUpRequestAnimationFrameMock = (faketimer: () => void): typeof requestAnimationFrame => {
  const requestAnimationFrame = (callback: FrameRequestCallback) => {
    setTimeout(callback, 1);
    faketimer();
    return 0;
  };

  [window, global].forEach(element => {
    Object.defineProperty(element, 'requestAnimationFrame', {
      writable: true,
      configurable: true,
      value: requestAnimationFrame,
    });
  });

  return requestAnimationFrame;
};

/**
 * Convert string to given type
 * @param value - string value to format
 * @param type - new value output type
 * @returns string value converted to given type
 */
const convertString = (value: string, type: string): number | Date | string => {
  let newValue: number | string | Date = value;
  if (type === 'date') {
    newValue = new Date(value);
  } else if (type === 'number') {
    newValue = Number(value);
  } else {
    newValue = value;
  }
  return newValue;
};

/**
 * Get range underflow value from input['min]
 * @param input - HTMLInputElement
 * @returns truthy iv value is underflow
 */
const getRangeUnderflow = (input: HTMLInputElement): boolean => {
  const value = convertString(input.value, input.type);
  if (['date', 'number'].includes(input.type) && input.hasAttribute('min') && input.value.length > 0) {
    const min = convertString(input.min, input.type);
    return value < min;
  } else {
    return false;
  }
};

/**
 * Get range overflow value from input['max]
 * @param input - HTMLInputElement
 * @returns truthy iv value is overflow
 */
const getRangeOverflow = (input: HTMLInputElement): boolean => {
  const value = convertString(input.value, input.type);
  if (['date', 'number'].includes(input.type) && input.hasAttribute('max') && input.value.length > 0) {
    const max = convertString(input.max, input.type);
    return value > max;
  } else {
    return false;
  }
};

/**
 * HTMLSelectElement type guard
 * @param input - HTMLElement to test
 * @returns truthy if element is HTMLSelectElement
 */
const isHTMLSelectElement = (input: HTMLElement): input is HTMLSelectElement => (input as HTMLSelectElement).options !== undefined;
/**
 * Get value missing from input
 * @param input - input to test
 * @returns truthy if value is required
 */
const getValueMissing = (input: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | HTMLFieldSetElement): boolean => {
  if (input.hasAttribute('required') && (input as HTMLInputElement).required === true) {
    if (['checkbox', 'radio'].includes(input.type)) {
      return (input as HTMLInputElement).checked === false;
    } else if (isHTMLSelectElement(input)) {
      return input.options.item(input.options.selectedIndex)?.value === '';
    } else {
      return (input as HTMLInputElement).value.length === 0;
    }
  } else {
    return false;
  }
};

/**
 * Get input validity
 * @param input - input prototype
 * @returns input validity state
 */
const getValidity = (input: HTMLInputElement): ValidityState => {
  // required field without a value
  const valueMissing = getValueMissing(input);
  // value of a number field is not a number | value of a date field is not a date
  const badInput = ['number', 'date'].includes(input.type) && isNaN(input.type === 'date' ? Date.parse(input.value) : (input.value as unknown as number));
  // value does not conform to the pattern
  const patternMismatch = input.hasAttribute('pattern') && new RegExp(input.pattern).test(input.value) === false;
  // value of a number|date field is higher than the max attribute
  const rangeOverflow = getRangeOverflow(input);
  // value of a number|date field is lower than the min attribute
  const rangeUnderflow = getRangeUnderflow(input);
  // value of a number field does not conform to the stepattribute
  const stepMismatch = input.type === 'number' && input.hasAttribute('step') && input.step !== 'any' && Number(input.value) % parseFloat(input.step) !== 0;
  // the user has edited a too-long value in a field with maxlength
  const tooLong = input.hasAttribute('maxLength') && input.value?.length > Number(input.maxLength);
  // the user has edited a too-short value in a field with minlength
  const tooShort = input.hasAttribute('minLength') && input.value?.length < Number(input.minLength);
  // value of a email or URL field is not an email address or URL
  const typeMismatch = input.type === 'url' && !URL.canParse(input.value);
  // value of validationMessage is not an empty string
  const customError = false;

  const valid = ![valueMissing, badInput, patternMismatch, rangeOverflow, rangeUnderflow, stepMismatch, tooLong, tooShort, typeMismatch, customError].some(invalid => invalid);
  return {
    badInput,
    customError,
    patternMismatch,
    rangeOverflow,
    rangeUnderflow,
    stepMismatch,
    tooLong,
    tooShort,
    typeMismatch,
    valid,
    valueMissing,
  };
};

/**
 * Utility function that mocks the HTMLInputElement[`vality`] state API and the HTMLInputElement.checkvalidty() methode.
 * Recommended to execute inside `test`.
 * @example
 * ```
 * Array.from(document.querySelectorInputs('input')).forEach(setUpHTMLInputElementValidity);
 * ```
 */
export const setUpHTMLInputElementValidity = (input: HTMLInputElement) => {
  input.checkValidity = () => {
    const { valid } = getValidity(input);
    input.dispatchEvent(new CustomEvent('invalid', { detail: !valid }));
    return valid;
  };
  Object.defineProperty(input, 'validity', {
    get: () => getValidity(input),
    configurable: true,
  });
};
