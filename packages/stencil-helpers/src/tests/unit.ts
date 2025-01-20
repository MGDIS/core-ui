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
export const setUpRequestAnimationFrameMock = (faketimer:() => void): typeof requestAnimationFrame => {
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
}

