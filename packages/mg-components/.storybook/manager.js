import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming';
import brandImage from './logo.png';

addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'MG Components',
    brandImage,
  }),
  panelPosition: 'right',
});
