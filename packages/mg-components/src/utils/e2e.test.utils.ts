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
  (typeof args === 'object' &&
    Object.keys(args)
      .filter(key => ![null, undefined, false].includes(args[key]) && typeof args[key] !== 'object' && !key.startsWith('slot'))
      .map(key => `${key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()}="${args[key]}"`)
      .reduce((acc, val, i, arr) => {
        if (!acc.length) acc.push('');
        acc.push(val);
        if (i + 1 === arr.length) acc.push('');
        return acc;
      }, [])
      .join('\n ')) ||
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

  return typeof args === 'object'
    ? `
  ${
    Object.keys(args)
      .filter(key => typeof args[key] === 'object' && key !== 'slot')
      .map(key => `document.${query}('${selector}').${key}=${JSON.stringify(args[key], (_key, val) => (typeof val === 'function' ? `<fn>${val}</fn>` : val))}`) // stringify json AND keep function values
      .join(';\n') // create string
      .split('"<fn>') // remove fn start decorator
      .join('')
      .split('</fn>"')
      .join('') // remove fn end decorator
  }`
    : '';
};
