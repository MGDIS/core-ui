import { extractArgTypes, extractComponentDescription, setStencilDocJson } from '@pxtrn/storybook-addon-docs-stencil';
import { StencilJsonDocs } from '@pxtrn/storybook-addon-docs-stencil/dist/types';
import { Preview } from '@storybook/html';
import { withActions } from '@storybook/addon-actions/decorator';
import docJson from './docs/components.json';
import { stencilWrapper, getStoryHTML } from './utils';

// import mg-components
import { defineCustomElements } from '../loader';
import '../dist/mg-components/mg-components.css';

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
    transformSource: (_, ctx) => getStoryHTML(ctx.originalStoryFn(ctx.args)),
  },

  options: {
    storySort: {
      order: ['Intro', 'Atoms', 'Molecules', 'Style'],
    },
  },
};

// Create a global variable called locale in storybook
// and add a menu in the toolbar to change your locale
export const globalTypes: Preview['globalTypes'] = {
  locale: {
    name: 'Locale',
    description: 'Internationalization locale',
    toolbar: {
      icon: 'globe',
      items: [
        { value: 'en', title: 'English' },
        { value: 'fr', title: 'Français' },
      ],
      showName: true,
    },
  },
};

export const decorators: Preview['decorators'] = [stencilWrapper, withActions];
