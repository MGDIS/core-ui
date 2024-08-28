import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgMessage } from '../mg-message';
import { variants, variantStyles } from '../mg-message.conf';

const getDefaultContent = () => (
  <p>
    <strong>Strong</strong> content!
  </p>
);

const getPage = (args, content) =>
  newSpecPage({
    components: [MgMessage],
    template: () => <mg-message {...args}>{content}</mg-message>,
  });

describe('mg-message', () => {
  describe('Render', () => {
    test.each(variants)('Should render a message with variant %s', async variant => {
      const { root } = await getPage({ variant }, getDefaultContent());
      expect(root).toMatchSnapshot();
    });

    test('Should replace classes on variant changes', async () => {
      const page = await getPage({ variant: 'info' }, getDefaultContent());
      const element = page.doc.querySelector('mg-message');
      let classInfo = element.shadowRoot.querySelector('.mg-c-message--info');

      expect(classInfo).not.toBeNull();

      element.variant = 'danger';
      await page.waitForChanges();

      classInfo = element.shadowRoot.querySelector('.mg-c-message--info');
      const classDanger = element.shadowRoot.querySelector('.mg-c-message--danger');

      expect(classInfo).toBeNull();
      expect(classDanger).not.toBeNull();
    });

    test('Should render with action slot', async () => {
      const { root } = await getPage({}, [
        getDefaultContent(),
        <div slot="actions">
          <mg-button>Primary</mg-button>
          <mg-button variant="secondary">Secondary</mg-button>
        </div>,
      ]);
      expect(root).toMatchSnapshot();
    });

    test('Should replace classes on variantStyle changes', async () => {
      const page = await getPage({ variantStyle: 'bar-left' }, getDefaultContent());
      const element = page.doc.querySelector('mg-message');
      let classbarLeft = element.shadowRoot.querySelector('.mg-c-message--bar-left');

      expect(classbarLeft).not.toBeNull();

      element.variantStyle = 'background';
      await page.waitForChanges();

      classbarLeft = element.shadowRoot.querySelector('.mg-c-message--bar-left');
      const classFill = element.shadowRoot.querySelector('.mg-c-message--background');

      expect(classbarLeft).toBeNull();
      expect(classFill).not.toBeNull();
    });
  });

  describe('Errors', () => {
    test.each(['', 'blu'])('Should throw error with invalid variant property: %s', async variant => {
      expect.assertions(1);
      try {
        await getPage({ variant }, getDefaultContent());
      } catch (err) {
        expect(err.message).toEqual(`<mg-message> prop "variant" must be one of: ${variants.join(', ')}. Passed value: ${variant}.`);
      }
    });

    test.each(['', 'batman'])('should throw error %s', async variantStyle => {
      expect.assertions(1);
      try {
        await getPage(
          { variantStyle },
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        );
      } catch (err) {
        expect(err.message).toEqual(`<mg-message> prop "variantStyle" must be one of: ${variantStyles.join(', ')}. Passed value: ${variantStyle}.`);
      }
    });
  });
});
