import { Preview } from '@storybook/html';
import { withActions } from '@storybook/addon-actions/decorator';
import { JsonDocs } from '@stencil/core/internal';
import { stencilWrapper, getStoryHTML, StorybookPreview } from '@mgdis/stencil-helpers';
import jsonDoc from './components.json';

// import mg-components
import '../dist/mg-components/mg-components.css';
import { defineCustomElements } from '../loader';
defineCustomElements();

// Create a StorybookPreview instance
const { extractArgTypes, extractComponentDescription } = new StorybookPreview(jsonDoc as unknown as JsonDocs);

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
