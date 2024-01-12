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
 * Add missing window.frames property to test context
 * usefull for component with iframe listeners, ex: mg-popover
 */
export const mockWindowFrames = (): void => {
  Object.defineProperty(window, 'frames', {
    value: { length: 0 },
  });
};
