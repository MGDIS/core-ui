import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming';
import brandImage from '@mgdis/img/dist/logos/mgdis.svg';

addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'MG Components',
    brandImage,
  }),
  panelPosition: 'right',
});
