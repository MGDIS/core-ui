import iconList from '@mgdis/img/dist/icons/index.json';
import { IconGallery, IconItem } from '@storybook/blocks';
import React from 'react';

/**
 * Template
 * @returns HTMLElement
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template = (): HTMLElement => (
   React.createElement(IconGallery, null,
      iconList.map((icon) => (
        React.createElement(IconItem, { name: icon, key: icon },
          React.createElement('mg-icon', { icon: icon })
        )
      ))
    )
);

export default Template;
