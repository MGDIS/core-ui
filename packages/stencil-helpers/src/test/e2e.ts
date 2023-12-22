/**
 * Add a darker background
 * usefull for light rendered element
 * @param condition - condition to add darker background
 * @param html - html to update
 * @returns html to render
 */
export const darkBackground = (condition: boolean, html: string): string =>
  `${condition ? '<span style="background:#999;display:inline-block;">' : ''}${html}${condition ? '</span>' : ''}`;

/**
 * Render attributes from props objects
 * @param args - argument to render as string. ex: `{status: 'visible'}`
 * @returns formated inline attributed. ex: 'status="visible"'
 */
export const renderAttributes = (args: unknown): string =>
  (args !== null &&
    typeof args === 'object' &&
    Object.keys(args)
      .filter(key => ![null, undefined, false].includes((args as Record<string, never>)[key]) && typeof (args as Record<string, never>)[key] !== 'object')
      .map(key => `${key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()}="${(args as Record<string, never>)[key]}"`)
      .join(' ')) ||
  '';

/**
 * Render properties from props objects.
 * Insert return value in <script></script> element
 * @param args - argument to render as script. ex: `{status: 'visible'}`
 * @param selector - querySelector get targetted element and bind properties on it
 * @returns stringified properties script
 */
export const renderProperties = (args: unknown, selector: string): string => {
  // has generated id selector starting with "#" create charcters (ex: '#0j3xzw4w7m') make test crashed sometime with "querySelector"
  // we use "getElementById" document query
  const query: 'querySelector' | 'getElementById' = selector.startsWith('#') ? 'getElementById' : 'querySelector';
  if (query === 'getElementById') selector = selector.replace('#', '');

  return args !== null && typeof args === 'object'
    ? `
  ${
    Object.keys(args)
      .filter(key => typeof (args as Record<string, never>)[key] === 'object')
      .map(
        key =>
          `document.${query}('${selector}').${key}=${JSON.stringify((args as Record<string, never>)[key], (_key, val) => (typeof val === 'function' ? `<fn>${val}</fn>` : val))}`,
      ) // stringify json AND keep function values
      .join(';\n') // create string
      .split('"<fn>') // remove fn start decorator
      .join('')
      .split('</fn>"')
      .join('') // remove fn end decorator
  }`
    : '';
};
