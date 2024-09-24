/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgButton } from '../../../atoms/mg-button/mg-button';
import { MgModal } from '../mg-modal';
import { dialogRoles } from '../mg-modal.conf';

const getPage = (args, slots?) =>
  newSpecPage({
    components: [MgModal, MgButton],
    template: () => (
      <mg-modal {...args}>
        {slots?.content && (
          <p>
            <strong>Strong</strong> content with <a href="./">a link</a>!
          </p>
        )}
        {slots?.actions && (
          <div slot="actions" class="mg-l-group-elements mg-l-group-elements--align-right">
            <mg-button>Primary</mg-button>
            <mg-button variant="secondary">Secondary</mg-button>
          </div>
        )}
      </mg-modal>
    ),
  });

describe('mg-modal', () => {
  describe.each([undefined, { content: true }, { actions: true }, { content: true, actions: true }])('Should render a modal with slots %s', slots => {
    test.each([
      { modalTitle: 'Modal Title', identifier: 'identifier', open: true },
      { modalTitle: 'Modal Title', identifier: 'identifier', open: true, dialogRole: 'alertdialog' },
      { modalTitle: 'Modal Title', identifier: 'identifier', open: true, closeButton: true },
      { modalTitle: 'Modal Title', identifier: 'identifier', closeButton: true },
      { modalTitle: 'Modal Title', identifier: 'identifier', open: true, closeButton: true, lang: 'fr' },
      { modalTitle: 'Modal Title', identifier: 'identifier', open: true, closeButton: true, lang: 'xx' },
    ])('with args %s', async args => {
      const { root } = await getPage(args, slots);
      expect(root).toMatchSnapshot();
    });
  });

  test('Should throw an error with invalid "identifier" property: %s', async () => {
    const identifier = '{{batman}}';
    expect.assertions(1);
    try {
      await getPage({ identifier });
    } catch (err) {
      expect(err.message).toEqual(`<mg-modal> prop "identifier" value is invalid. Passed value: ${identifier}.`);
    }
  });

  test.each(['', ' ', undefined])('Should not render with invalid modalTitle property: %s', async modalTitle => {
    expect.assertions(1);
    try {
      await getPage({ modalTitle });
    } catch (err) {
      expect(err.message).toEqual(`<mg-modal> prop "modalTitle" is required. Passed value: ${modalTitle}.`);
    }
  });

  test.each([' ', 'batman'])('Should throw error with invalid dialogRole property: %s', async dialogRole => {
    expect.assertions(1);
    try {
      await getPage({ modalTitle: 'Modal title', dialogRole });
    } catch (err) {
      expect(err.message).toEqual(`<mg-modal> prop "dialogRole" must be one of: ${dialogRoles.join(', ')}. Passed value: ${dialogRole}.`);
    }
  });

  describe('navigation', () => {
    test('Should hide modal with button', async () => {
      const page = await getPage({ modalTitle: 'Modal Title', identifier: 'identifier', closeButton: true, open: true });
      const closeButton = page.root.shadowRoot.querySelector('mg-button');

      expect(page.root).toMatchSnapshot();

      const spy = jest.spyOn(page.rootInstance.componentHide, 'emit');

      closeButton.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();
      expect(spy).toHaveBeenCalled();
    });

    test.each([true, false])('should hide modal with escape keyboard', async closeButton => {
      const page = await getPage({ modalTitle: 'Modal Title', identifier: 'identifier', closeButton, open: true });
      const mgModal = page.doc.querySelector('mg-modal');
      const dialog = mgModal.shadowRoot.querySelector('dialog');
      expect(page.root).toMatchSnapshot();

      const spy = jest.spyOn(page.rootInstance.componentHide, 'emit');

      // Dialog natively listen to ESC key event
      dialog.dispatchEvent(new CustomEvent('close', { bubbles: true }));
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();
      expect(spy).toHaveBeenCalled();
    });
  });
});
