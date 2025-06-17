import { Preview } from '@storybook/html';
import { withActions } from 'storybook/actions/decorator';
import { JsonDocs } from '@stencil/core/internal';
import { stencilWrapper, getStoryHTML, StorybookPreview } from '@mgdis/core-ui-helpers/dist/storybook';
import jsonDoc from './components.json';

// import mg-components
import '../dist/mg-components/mg-components.css';
import { defineCustomElements } from '../loader';
defineCustomElements();

// Create a StorybookPreview instance
const { extractArgTypes, extractComponentDescription } = new StorybookPreview(jsonDoc as unknown as JsonDocs);

const preview: Preview = {
  tags: ['autodocs'],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      extractArgTypes,
      extractComponentDescription,
      source: {
        transform: (_: string, ctx: any) => getStoryHTML(ctx.originalStoryFn(ctx.args)),
      },
    },
    options: {
      storySort: {
        order: [
          'Intro', // Does not affect order but set it as home page
          'Atoms',
          'Molecules',
          'Style',
        ],
      },
    },
  },
  decorators: [stencilWrapper, withActions],
  globalTypes: {
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
  },
};

export default preview;
