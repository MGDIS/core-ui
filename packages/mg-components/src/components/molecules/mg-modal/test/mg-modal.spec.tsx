/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgButton } from '../../../atoms/mg-button/mg-button';
import { MgModal } from '../mg-modal';
import { focusableElements, setupMutationObserverMock } from '@mgdis/stencil-helpers';
import { dialogRoles } from '../mg-modal.conf';

const getPage = (args, slots?) =>
  newSpecPage({
    components: [MgModal, MgButton],
    template: () => (
      <mg-modal {...args}>
        {slots?.content && (
          <p slot="content">
            <strong>Strong</strong> content with <a href="./">a link</a>!
          </p>
        )}
        {slots?.actions && (
          <div slot="actions" class="mg-group-elements mg-group-elements--align-right">
            <mg-button>Primary</mg-button>
            <mg-button variant="secondary">Secondary</mg-button>
          </div>
        )}
      </mg-modal>
    ),
  });

describe('mg-modal', () => {
  let fireMo;

  beforeEach(() => {
    setupMutationObserverMock({
      observe: function () {
        fireMo = this.cb;
      },
      disconnect: function () {
        return null;
      },
      takeRecords: () => [],
    });
  });

  describe.each([undefined, { content: true }, { actions: true }, { content: true, actions: true }])('Should render a modal', slots => {
    test.each([
      { modalTitle: 'Modal Title', identifier: 'identifier' },
      { modalTitle: 'Modal Title', identifier: 'identifier', dialogRole: 'alertdialog' },
      { modalTitle: 'Modal Title', identifier: 'identifier', closeButton: true },
      { modalTitle: 'Modal Title', identifier: 'identifier', closeButton: true, hide: true },
      { modalTitle: 'Modal Title', identifier: 'identifier', closeButton: true, lang: 'fr' },
      { modalTitle: 'Modal Title', identifier: 'identifier', closeButton: true, lang: 'xx' },
    ])('with args %s', async args => {
      const { root } = await getPage({ ...args }, slots);
      expect(root).toMatchSnapshot();
    });
  });

  test.each(['', ' ', undefined])('Should not render with invalid modalTitle property: %s', async modalTitle => {
    expect.assertions(1);
    try {
      await getPage({ modalTitle });
    } catch (err) {
      expect(err.message).toMatch('<mg-modal> prop "modalTitle" is required.');
    }
  });

  test.each([' ', 'batman'])('Should throw error with invalid dialogRole property: %s', async dialogRole => {
    expect.assertions(1);
    try {
      await getPage({ modalTitle: 'Modal title', dialogRole });
    } catch (err) {
      expect(err.message).toMatch(`<mg-modal> prop "dialogRole" must be one of: ${dialogRoles.join(', ')}.`);
    }
  });

  describe('navigation', () => {
    test('Should hide panel with button', async () => {
      const page = await getPage({ modalTitle: 'Modal Title', identifier: 'identifier', closeButton: true });
      const closeButton = page.root.shadowRoot.querySelector('mg-button');

      expect(page.root).toMatchSnapshot();

      const spy = jest.spyOn(page.rootInstance.componentHide, 'emit');

      closeButton.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();
      expect(spy).toHaveBeenCalled();
    });

    test.each([true, false])('should hide panel with escape keyboard', async closeButton => {
      const page = await getPage({ modalTitle: 'Modal Title', identifier: 'identifier', closeButton });
      expect(page.root).toMatchSnapshot();

      const spy = jest.spyOn(page.rootInstance.componentHide, 'emit');

      page.win.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();
      if (closeButton) {
        expect(spy).toHaveBeenCalled();
      } else {
        expect(spy).not.toHaveBeenCalled();
      }
    });

    describe.each([
      { attributeName: 'aria-hidden', target: { ariaHidden: null } },
      { attributeName: 'aria-hidden', target: { ariaHidden: '' } },
      { attributeName: 'aria-hidden', target: { ariaHidden: undefined } },
    ])('mutationObserver', mutation => {
      test.each([true, false])('should keep focus inside modal, closeButton %s', async closeButton => {
        const page = await getPage({ modalTitle: 'Modal Title', identifier: 'identifier', closeButton, hide: true }, { content: true, actions: true });
        const element = page.doc.querySelector('mg-modal');
        // Get all focusable elements
        const modalFocusableElements = Array.from(element.querySelectorAll(focusableElements)).reduce((acc, focusableElement) => {
          acc.push(focusableElement.shadowRoot !== null ? focusableElement.shadowRoot.querySelector(focusableElements) || focusableElement : focusableElement);
          return acc;
        }, []);
        // When close button is enabled it's the first focusable element.
        if (closeButton) {
          modalFocusableElements.unshift(element.shadowRoot.querySelector(`.mg-c-modal__close-button mg-button`));
        }
        const lastFocusableElement = modalFocusableElements[modalFocusableElements.length - 1];
        const spyFirst = jest.spyOn(modalFocusableElements[0], 'focus');
        const spyLast = jest.spyOn(lastFocusableElement, 'focus');

        // Display modal
        element.hide = false;
        await page.waitForChanges();
        expect(spyFirst).toHaveBeenCalledTimes(0);
        fireMo([mutation]);
        await page.waitForChanges();
        expect(spyFirst).toHaveBeenCalledTimes(1);
        // Tab from last focusable element
        lastFocusableElement.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'Tab', shiftKey: false }));
        await page.waitForChanges();
        expect(spyFirst).toHaveBeenCalledTimes(2);
        // Tab first focusable element with shift key
        modalFocusableElements[0].dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'Tab', shiftKey: true }));
        await page.waitForChanges();
        expect(spyLast).toHaveBeenCalledTimes(1);
      });
    });
  });
});
