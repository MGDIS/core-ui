import { test, expect } from '@playwright/test';
import { BadgeVariantType, variants } from '../mg-badge.conf';
import { darkBackground } from '../../../../utils/e2e.test.utils';

const addCustomTextColor = (variant: BadgeVariantType): string =>
  `${
    variant === 'text-color'
      ? `<style>
    mg-badge {
      --mg-badge-text-color: 40 80% 60%;
      color: hsl(260 80% 50%);
    }
  </style>`
      : ''
  }`;

test.describe('mg-badge', () => {
  test('Should render', async ({ page }) => {
    // Build HTML
    const html = variants
      .map(variant => {
        const template = [true, false]
          .map(outline =>
            [1, 99, '*', '!', '99+']
              .map(value =>
                darkBackground(
                  variant === 'secondary',
                  `<mg-badge value="${value}" label="${variant}" variant="${variant}" outline="${outline}"></mg-badge>${addCustomTextColor(variant)}`,
                ),
              )
              .join(''),
          )
          .join('');

        return `<h2>${variant}</h2>
        <div>${template}</div>`;
      })
      .join('');
  });
});
