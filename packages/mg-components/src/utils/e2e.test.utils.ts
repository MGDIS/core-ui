import { createID } from './components.utils';

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
      .filter(key => ![null, undefined, false].includes(args[key]) && typeof args[key] !== 'object')
      .map(key => `${key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()}="${args[key]}"`)
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
  if (typeof args !== 'object') return '';
  const name = `element${createID()}`;
  return `const ${name} = document.querySelector('${selector}');
    ${
      Object.keys(args)
        .filter(key => typeof args[key] === 'object')
        .map(key => `${name}.${key} = ${JSON.stringify(args[key], (_key, val) => (typeof val === 'function' ? `<fn>${val}</fn>` : val))}`) // stringify json AND keep function values
        .join(';\n') // create string
        .split('"<fn>') // remove fn start decorator
        .join('')
        .split('</fn>"')
        .join('') // remove fn end decorator
    };`;
};
