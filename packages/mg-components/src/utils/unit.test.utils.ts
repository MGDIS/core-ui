/**
 * Clone Deep function
 * @param obj - object to clone
 * @returns cloned json
 */
export const cloneDeep = (obj: unknown): unknown => JSON.parse(JSON.stringify(obj));

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
