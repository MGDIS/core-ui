import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgCard } from '../mg-card';
import { variantStyles, variants } from '../mg-card.conf';

const getPage = (props, slot) =>
  newSpecPage({
    components: [MgCard],
    template: () => <mg-card {...props}>{slot}</mg-card>,
  });

describe('mg-card', () => {
  test.each([undefined, ...variants.flatMap(variant => variantStyles.map(variantStyle => ({ variant, variantStyle })))])('render', async props => {
    const { root } = await getPage(
      props,
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    );
    expect(root).toMatchSnapshot();
  });

  test.each([
    { oldValue: { variant: variants[0], variantStyle: variantStyles[0] }, newValue: { variant: variants[1], variantStyle: variantStyles[0] } },
    { oldValue: { variant: variants[0], variantStyle: variantStyles[0] }, newValue: { variant: variants[0], variantStyle: variantStyles[1] } },
  ])('should update classList', async ({ oldValue, newValue }) => {
    const page = await getPage(
      oldValue,
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    );
    expect(page.root).toMatchSnapshot();

    const mgCard = page.doc.querySelector('mg-card');
    Object.keys(newValue).forEach(key => {
      mgCard[key] = newValue[key];
    });

    await page.waitForChanges();

    expect(page.root).toMatchSnapshot();
  });

  describe('errors', () => {
    test.each([
      { props: { variantStyle: 'batman' }, error: `<mg-card> prop "variantStyle" must match VariantStyleType type.` },
      ...variantStyles.map(variantStyle => ({ props: { variantStyle }, error: `<mg-card> prop "variantStyle" must be paired with ${JSON.stringify(variants)} "variant" prop.` })),
      { props: { variant: 'batman' }, error: `<mg-card> prop "variant" must match VariantType type.` },
      ...variants.map(variant => ({ props: { variant }, error: `<mg-card> prop "variant" must be paired with ${JSON.stringify(variantStyles)} "variantStyle" prop.` })),
    ])('should throw error %s', async ({ props, error }) => {
      expect.assertions(1);
      try {
        await getPage(
          props,
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        );
      } catch (err) {
        expect(err.message).toMatch(error);
      }
    });
  });
});
