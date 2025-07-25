import iconList from '@mgdis/img/dist/icons/index.json';
import { IconGallery, IconItem } from '@storybook/addon-docs/blocks';
import React from 'react';

/**
 * Template
 * @returns HTMLElement
 */
const Template = (): HTMLElement =>
  React.createElement(
    IconGallery,
    null,
    iconList.map(icon => React.createElement(IconItem, { name: icon, key: icon }, React.createElement('mg-icon', { icon: icon }))),
  );

export default Template;
