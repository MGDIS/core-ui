import { renderVdom } from '@stencil/core/internal/client';

export const filterArgs = (args, defaultValues?) => {
  const filteredArgs: typeof args = {};
  for (const k in args) {
    if (!k.startsWith('slot')) {
      const arg = args[k];
      // Change camelCase k to kebab-case
      const key = k.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
      if (!defaultValues || !Object.keys(defaultValues).includes(k) || defaultValues[k] !== arg) {
        filteredArgs[key] = arg;
      }
    }
  }
  return filteredArgs;
};

export const stencilWrapper = (storyFn, context): Element => {
  const host = document.getElementById('storybook-root');
  renderVdom(
    {
      $ancestorComponent$: undefined,
      $flags$: 0,
      $modeName$: undefined,
      $cmpMeta$: {
        $flags$: 0,
        $tagName$: host.tagName,
      },
      $hostElement$: host,
    },
    storyFn(context),
  );
  return host.children[host.children.length - 1];
};

const renderAttribute = (element, name, value): void => {
  if ([null, undefined, '', false].includes(value) || ['innerHTML', 'style'].includes(name)) return;

  element.setAttribute(name, typeof value !== 'object' ? value : `/!\\ Object props are not rendered in the code example`);
};

const renderElement = (parentNode, tagName, attributes, children, text): void => {
  if (text) {
    parentNode.innerText = text;
    return;
  } else if (!tagName) return;
  const element = document.createElement(tagName);
  Object.keys(attributes || {}).forEach(attr => {
    renderAttribute(element, attr, attributes[attr]);
  });

  children?.forEach(child => {
    renderElement(element, child.$tag$, child.$attrs$, child.$children$, child.$text$);
  });

  if (attributes?.innerHTML) element.innerHTML = attributes.innerHTML;

  parentNode.appendChild(element);
};

export const getStoryHTML = ({ $tag$, $attrs$, $children$, $text$ }): string => {
  const host = document.createElement('div');

  renderElement(host, $tag$, $attrs$, $children$, $text$);

  return host.innerHTML;
};
