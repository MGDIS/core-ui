import { extractArgTypes, extractComponentDescription, setStencilDocJson } from '@pxtrn/storybook-addon-docs-stencil';
import { Preview } from '@storybook/html';
import { withActions } from '@storybook/addon-actions/decorator';
import docJson from './docs/components.json';
import { StencilJsonDocs } from '@pxtrn/storybook-addon-docs-stencil/dist/types';
import { renderAttributes, renderProperties } from '../src/utils/e2e.test.utils';

// import mg-components
import { defineCustomElements } from '../dist/esm/loader';
import '!style-loader!css-loader!../dist/mg-components/mg-components.css';

defineCustomElements();
setStencilDocJson(docJson as unknown as StencilJsonDocs);

export const parameters: Preview['parameters'] = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: {
    extractArgTypes,
    extractComponentDescription,
    transformSource: (_, parameters) => {
      const tagName = parameters.component;
      const args = parameters.allArgs;
      const html = parameters.originalStoryFn(args);
      const slot = (html?.querySelector(tagName) || html?.closest(tagName))?.innerHTML.replaceAll('="mg__storybook__boolean-true"', ''); // Used to remove `=''` in code example

      return [
        `<${tagName} ${renderAttributes(args)}>`,
        `  ${slot || ''}`,
        `</${tagName}>`,
        `${
          Object.entries(args)
            .filter(arg => arg[0] !== 'slot')
            .some(arg => typeof arg[1] === 'object')
            ? `\n<script>${renderProperties(args, tagName)}</script>`
            : ''
        }`,
      ].join('\n');
    },
  },
  options: {
    storySort: {
      order: ['Intro', 'Atoms', 'Molecules', 'Style'],
    },
  },
};

export const decorators = [withActions];
