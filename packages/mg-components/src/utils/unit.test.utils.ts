/* eslint-disable jsdoc/require-jsdoc */
import { MockCustomEvent } from '@stencil/core/mock-doc';

/**
 * Clone Deep function
 * @param obj - object to clone
 * @returns cloned json
 */
export const cloneDeep = (obj: unknown): unknown => JSON.parse(JSON.stringify(obj));

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
type SetupMutationObserverMockParams = { disconnect: MutationObserver['disconnect']; observe: MutationObserver['observe']; takeRecords: MutationObserver['takeRecords'] };
export const setupMutationObserverMock = ({ disconnect, observe, takeRecords }: SetupMutationObserverMockParams): typeof MutationObserver => {
  class MockMutationObserver implements MutationObserver {
    disconnect: () => void = disconnect;
    observe: (target: Node, options?: MutationObserverInit) => void = observe;
    takeRecords: () => MutationRecord[] = takeRecords;
    cb: () => unknown;
    constructor(fn) {
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

type setupResizeObserverMockParams = { disconnect: ResizeObserver['disconnect']; observe: ResizeObserver['observe'] };

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
    disconnect: () => void = disconnect;
    observe: (target: Element, options?: ResizeObserverOptions) => void = observe;
    unobserve: () => void;
    cb: () => unknown;
    constructor(fn) {
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

/**
 * Utility function that mocks the `SubmitEvent` API. Recommended to execute inside `beforeEach`.
 * @example
 * ```
 * setupSubmitEventMock();
 * ```
 * @returns custom event mock
 */
export const setupSubmitEventMock = (): typeof MockCustomEvent => {
  class SubmitEvent extends MockCustomEvent {
    constructor(type: string, eventInitDict?: SubmitEventInit) {
      super(type, eventInitDict);
    }
  }

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
 * force popover id when component use randomed identifier
 * @param component - element wich include mg-popover
 * @param id - new fixed id
 * @param interactiveElement - element where attribute 'aria-controls' is set
 */
export const forcePopoverId = (component: Element, id: string, interactiveElement = 'button'): void => {
  const popover = component.shadowRoot.querySelector('mg-popover');
  if (popover !== null) {
    popover.querySelector('mg-popover-content').setAttribute('id', id);
    component.shadowRoot.querySelector(interactiveElement).setAttribute('aria-controls', id);
  }
};

/**
 * fix popper console.error in test
 * it is generated in `@popperjs/core/dist/cjs/popper.js l.1859`
 * this is due to internal function isHTMLElement(), so we can not mock it directly.
 * this function check if test DOM element mockHTMLElement instance is 'instanceof HTMLElement'
 * so we only override the console.error side effect for this error
 */
export const mockConsoleError = (): void => {
  const errorFunction = console.error;
  const mock = jest.spyOn(console, 'error');
  mock.mockImplementation(error => {
    if (!error.includes('Popper')) errorFunction(error);
  });
};

/**
 * Add missing window.frames property to test context
 * usefull for component with iframe listeners, ex: mg-popover
 */
export const mockWindowFrames = (): void => {
  Object.defineProperty(window, 'frames', {
    value: { length: 0 },
  });
};
