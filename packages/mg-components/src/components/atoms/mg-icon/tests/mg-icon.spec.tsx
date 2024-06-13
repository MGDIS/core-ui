import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgIcon } from '../mg-icon';
import { sizes, variantStyles, variants } from '../mg-icon.conf';
import iconList from '@mgdis/img/dist/icons/index.json';

const getPage = args =>
  newSpecPage({
    components: [MgIcon],
    template: () => <mg-icon {...args}></mg-icon>,
  });

describe('mg-icon', () => {
  describe.each(iconList)('Should render %s icon', icon => {
    test.each(sizes)('in %s size', async size => {
      const { root } = await getPage({ icon, size });
      expect(root).toMatchSnapshot();
    });

    test.each(variants)('using %s variant', async variant => {
      const { root } = await getPage({ icon, variant });
      expect(root).toMatchSnapshot();
    });

    test.each(variants.flatMap(variant => variantStyles.map(variantStyle => ({ variant, variantStyle }))))('using %s variant', async ({ variant, variantStyle }) => {
      const { root } = await getPage({ icon, variant, variantStyle });
      expect(root).toMatchSnapshot();
    });
  });

  test('Should render a spin icon', async () => {
    const { root } = await getPage({ icon: 'check-circle', spin: true });
    expect(root).toMatchSnapshot();
  });

  test.each([
    { initialProps: { icon: 'chevron-up' }, initialClass: ['.mg-c-icon--chevron-up'], nextProps: { icon: 'chevron-down' }, nextClass: ['.mg-c-icon--chevron-down'] },
    { initialProps: { icon: 'chevron-up' }, initialClass: ['.mg-c-icon--size-medium'], nextProps: { size: 'large' }, nextClass: ['.mg-c-icon--size-large'] },
    {
      initialProps: { icon: 'chevron-up', variant: 'success', variantStyle: 'icon' },
      initialClass: ['.mg-c-icon--variant-success', '.mg-c-icon--variant-style-icon'],
      nextProps: { variant: 'danger', variantStyle: 'background' },
      nextClass: ['.mg-c-icon--variant-danger', '.mg-c-icon--variant-style-background'],
    },
  ])('Should replace classes on icon changes', async ({ initialProps, initialClass, nextProps, nextClass }) => {
    const page = await getPage(initialProps);
    const element = page.doc.querySelector('mg-icon');

    // validate inital state
    initialClass.forEach(className => {
      expect(element.shadowRoot.querySelector(className)).not.toBeNull();
    });

    nextClass.forEach(className => {
      expect(element.shadowRoot.querySelector(className)).toBeNull();
    });

    // update props
    Object.keys(nextProps).forEach(key => {
      element[key] = nextProps[key];
    });

    await page.waitForChanges();

    // validate next state
    initialClass.forEach(className => {
      expect(element.shadowRoot.querySelector(className)).toBeNull();
    });

    nextClass.forEach(className => {
      expect(element.shadowRoot.querySelector(className)).not.toBeNull();
    });
    expect(page.root).toMatchSnapshot();
  });

  describe('errors', () => {
    const iconError = ['', 'blu', undefined].map(icon => ({ props: { icon }, error: `<mg-icon> prop "icon" must be one of: ${iconList.join(', ')}` }));
    const sizeError = ['', 'blu'].map(size => ({ props: { icon: 'check-circle', size }, error: `<mg-icon> prop "size" must be one of: ${sizes.join(', ')}` }));
    const variantError = { props: { icon: 'check-circle', variant: 'blu' }, error: `<mg-icon> prop "variant" must be one of: ${variants.join(', ')}` };
    const variantStyleError = {
      props: { icon: 'check-circle', variantStyle: 'blu' },
      error: `<mg-icon> prop "variantStyle" must be one of: ${variantStyles.join(', ')}`,
    };

    test.each([...iconError, ...sizeError, variantError, variantStyleError])('Should throw error with invalid icon property: %s', async ({ props, error }) => {
      expect.assertions(1);
      try {
        await getPage(props);
      } catch (err) {
        expect(err.message).toMatch(error);
      }
    });
  });
});
