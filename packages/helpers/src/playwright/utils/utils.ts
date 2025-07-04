import { isObject, isValidString } from '../../utils';

/**
 * Render attributes from props objects
 * @param args - argument to render as string. ex: `{status: 'visible'}`
 * @returns formated inline attributed. ex: 'status="visible"'
 * @example
 * ```ts
 * import { renderAttributes } from '@mgdis/core-ui-helpers/dist/playwright';
 *
 * const attributes = renderAttributes({ status: 'visible', color: 'red' });
 * console.log(attributes); // Output: 'status="visible" color="red"'
 * ```
 */
export const renderAttributes = (args: Record<string, unknown>): string =>
  (isObject<Record<string, never>>(args) &&
    Object.keys(args)
      .filter(key => ![null, undefined, false].includes(args[key]) && !['object', 'function'].includes(typeof args[key]))
      .map(key => {
        const attribute: string = key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
        const value: string = ['number', 'boolean'].includes(typeof args[key]) || isValidString(args[key]) ? String(args[key]).replace(/"/g, "'") : '';
        return `${attribute}="${value}"`;
      })
      .join(' ')) ||
  '';

/**
 * Render properties from props objects.
 * Insert return value in <script></script> element
 * @param args - argument to render as script. ex: `{status: 'visible'}`
 * @param selector - querySelector get targetted element and bind properties on it
 * @returns stringified properties script
 * @example
 * ```ts
 * import { renderProperties } from '@mgdis/core-ui-helpers/dist/playwright';
 *
 * const propertiesScript = renderProperties({ status: 'visible', color: 'red' }, '.targetElement');
 * console.log(propertiesScript);
 * // Output: 'document.querySelector(".targetElement").status="visible"; document.querySelector(".targetElement").color="red";'
 * ```
 */
export const renderProperties = (args: Record<string, unknown>, selector: string): string => {
  // has generated id selector starting with "#" create charcters (ex: '#0j3xzw4w7m') make test crashed sometime with "querySelector"
  // we use "getElementById" document query
  const query: 'querySelector' | 'getElementById' = selector.startsWith('#') ? 'getElementById' : 'querySelector';
  if (query === 'getElementById') selector = selector.replace('#', '');

  return args !== null && typeof args === 'object' && Object.keys(args).length > 0
    ? `
  ${
    Object.keys(args)
      .filter(key => ['object', 'function'].includes(typeof (args as Record<string, never>)[key]))
      .map(key => {
        const value = JSON.stringify((args as Record<string, never>)[key], (_key, val) => (typeof val === 'function' ? `<fn>${val}</fn>` : val));
        return `document.${query}('${selector}').${key}=${value}`;
      }) // stringify json AND keep function values
      .join(';') // create string
      .split('"<fn>') // remove fn start decorator
      .join('')
      .split('</fn>"')
      .join('') // remove fn end decorator
  }`
    : '';
};
