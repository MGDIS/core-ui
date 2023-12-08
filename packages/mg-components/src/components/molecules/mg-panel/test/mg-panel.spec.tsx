import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgPanel } from '../mg-panel';

import { MgButton } from '../../../atoms/mg-button/mg-button';
import { MgInputText } from '../../inputs/mg-input-text/mg-input-text';
import { expandToggleDisplays, titlePositions } from '../mg-panel.conf';

const getPage = (args, slot?) =>
  newSpecPage({
    components: [MgPanel, MgButton, MgInputText],
    template: () => <mg-panel {...args}>{slot}</mg-panel>,
  });

describe('mg-panel', () => {
  beforeAll(() => (global.HTMLInputElement.prototype.focus = jest.fn()));
  afterAll(() => delete global.HTMLInputElement.prototype.focus);

  // use faketimers for mg-input-text
  beforeEach(() => jest.useFakeTimers({ legacyFakeTimers: true }));
  afterEach(() => jest.runOnlyPendingTimers());

  test.each([
    { identifier: 'identifier', panelTitle: 'panel title' },
    { identifier: 'identifier', panelTitle: 'panel title', expanded: true },
    { identifier: 'identifier', panelTitle: 'panel title', titleEditable: true },
    { identifier: 'identifier', panelTitle: 'panel title', titleEditable: true, titlePattern: /joker/, titlePatternErrorMessage: "You can't enter a bad guy !" },
    { identifier: 'identifier', panelTitle: 'panel title', titleEditable: true, lang: 'fr' },
    { identifier: 'identifier', panelTitle: 'panel title', titleEditable: true, lang: 'xx' },
    ...titlePositions.map(titlePosition => ({ identifier: 'identifier', panelTitle: 'panel title', titlePosition })),
    ...expandToggleDisplays.map(expandToggleDisplay => ({ identifier: 'identifier', panelTitle: 'panel title', expandToggleDisplay })),
    ...expandToggleDisplays.map(expandToggleDisplay => ({ identifier: 'identifier', panelTitle: 'panel title', titleEditable: true, expandToggleDisplay })),
  ])('Should render with args %s:', async args => {
    const { root } = await getPage(args);
    expect(root).toMatchSnapshot();
  });

  describe('errors', () => {
    test('Should throw error when props association are unauthorized %s:', async () => {
      expect.assertions(1);
      try {
        await getPage({ identifier: 'identifier', panelTitle: 'panel title', titlePattern: /joker/ });
      } catch (err) {
        expect(err.message).toBe('<mg-panel> prop "titleEditable" must be set to "true".');
      }
    });

    test.each(['', ' ', undefined])('Should not render with invalid panelTitle property: %s', async panelTitle => {
      expect.assertions(1);
      try {
        await getPage({ panelTitle });
      } catch (err) {
        expect(err.message).toMatch('<mg-panel> prop "panelTitle" is required.');
      }
    });

    test.each(['', ' ', 'batman'].map(titlePosition => ({ panelTitle: 'panel title', titlePosition })))(
      'Should throw an error when prop "titlePosition" is invalid',
      async props => {
        try {
          await getPage(props);
        } catch (err) {
          expect(err.message).toMatch(`<mg-panel> prop "titlePosition" must be one of: ${titlePositions.join(', ')}.`);
        }
      },
    );

    test.each(['', ' ', 'batman'].map(expandToggleDisplay => ({ panelTitle: 'panel title', expandToggleDisplay })))(
      'Should throw an error when prop "expandToggleDisplay" is invalid',
      async props => {
        try {
          await getPage(props);
        } catch (err) {
          expect(err.message).toMatch(`<mg-panel> prop "expandToggleDisplay" must be one of: ${expandToggleDisplays.join(', ')}.`);
        }
      },
    );
  });

  describe('navigation', () => {
    test.each([true, false])('Should toggle collapse panel, expanded %s', async expanded => {
      const page = await getPage({ identifier: 'identifier', panelTitle: 'panel title', expanded });
      const mgPanel = page.doc.querySelector('mg-panel');
      const collapseButton = mgPanel.shadowRoot.querySelector('mg-button:first-of-type');

      const spy = jest.spyOn(page.rootInstance.expandedChange, 'emit');

      expect(page.root).toMatchSnapshot();

      collapseButton.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();

      collapseButton.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();

      expect(spy).toBeCalledTimes(2);
    });

    test.each([true, false])('Should NOT collapse panel, case expandToggleDisabled = true', async expanded => {
      const page = await getPage({ identifier: 'identifier', panelTitle: 'panel title', expanded, expandToggleDisabled: true });
      const mgPanel = page.doc.querySelector('mg-panel');
      const collapseButton = mgPanel.shadowRoot.querySelector('mg-button:first-of-type');

      expect(page.root).toMatchSnapshot();

      collapseButton.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();
    });

    test.each([true, false])('Should toggle edit panel title', async titleEditable => {
      const page = await getPage({ identifier: 'identifier', panelTitle: 'panel title', titleEditable });
      const mgPanel = page.doc.querySelector('mg-panel');
      const editButton = mgPanel.shadowRoot.querySelector('.mg-c-panel__header-title mg-button[is-icon]');

      expect(page.root).toMatchSnapshot();

      if (titleEditable) {
        editButton.dispatchEvent(new CustomEvent('click', { bubbles: true }));
        await page.waitForChanges();

        expect(page.root).toMatchSnapshot();

        editButton.dispatchEvent(new CustomEvent('click', { bubbles: true }));
        await page.waitForChanges();

        expect(page.root).toMatchSnapshot();
      }
    });

    test.each(['first-of-type', 'last-of-type'])('should update panel title, case %s', async lastAction => {
      const updatedPanelTitle = 'Updated panel title';
      const args = { identifier: 'identifier', panelTitle: 'panel title', titleEditable: true };
      const page = await getPage(args);
      const mgPanel = page.doc.querySelector('mg-panel');
      const editButton = mgPanel.shadowRoot.querySelector('.mg-c-panel__header-title mg-button[is-icon]');

      expect(page.root).toMatchSnapshot();

      jest.spyOn(page.rootInstance.titleChange, 'emit');

      editButton.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();

      const mgInputText = mgPanel.shadowRoot.querySelector('mg-input-text');
      const input = mgInputText.shadowRoot.querySelector('input');

      input.value = updatedPanelTitle;
      input.dispatchEvent(new CustomEvent('input', { bubbles: true }));
      await page.waitForChanges();

      input.dispatchEvent(new CustomEvent('blur', { bubbles: true }));
      await page.waitForChanges();

      const afterInputAction = mgPanel.shadowRoot.querySelector(`.mg-c-panel__header-title mg-input-text mg-button:${lastAction}`);

      afterInputAction.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();

      if (lastAction === 'last-of-type') {
        expect(mgPanel.panelTitle).toBe(updatedPanelTitle);
        expect(page.rootInstance.titleChange.emit).toHaveBeenCalledWith(updatedPanelTitle);
      } else {
        expect(mgPanel.panelTitle).toBe(args.panelTitle);
        expect(page.rootInstance.titleChange.emit).not.toHaveBeenCalled();
      }
    });

    test('should NOT update panel title, case no enter in input', async () => {
      const updatedPanelTitle = 'Updated panel title';
      const args = { identifier: 'identifier', panelTitle: 'panel title', titleEditable: true };
      const page = await getPage(args);
      const mgPanel = page.doc.querySelector('mg-panel');
      const editButton = mgPanel.shadowRoot.querySelector('.mg-c-panel__header-title mg-button[is-icon]');

      expect(page.root).toMatchSnapshot();

      jest.spyOn(page.rootInstance.titleChange, 'emit');

      editButton.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();

      const mgInputText = mgPanel.shadowRoot.querySelector('mg-input-text');
      const input = mgInputText.shadowRoot.querySelector('input');

      input.dispatchEvent(new CustomEvent('blur', { bubbles: true }));
      await page.waitForChanges();

      const afterInputAction = mgPanel.shadowRoot.querySelector('.mg-c-panel__header-title mg-input-text mg-button:last-of-type');

      afterInputAction.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();

      expect(mgPanel.panelTitle).toBe(args.panelTitle);
      expect(page.rootInstance.titleChange.emit).not.toHaveBeenCalledWith(updatedPanelTitle);
    });

    test('Should NOT update panel title, case input new value does NOT match pattern', async () => {
      const updatedPanelTitle = 'joker';
      const args = {
        identifier: 'identifier',
        panelTitle: 'panel title',
        titleEditable: true,
        titlePattern: '^(?!(joker)$)[a-z A-Z0-9s]+$',
        titlePatternErrorMessage: "You can't enter a bad guy !",
      };
      const page = await getPage(args);
      const mgPanel = page.doc.querySelector('mg-panel');
      const editButton = mgPanel.shadowRoot.querySelector('.mg-c-panel__header-title mg-button[is-icon]');

      expect(page.root).toMatchSnapshot();

      jest.spyOn(page.rootInstance.titleChange, 'emit');

      // first switch to title edition
      editButton.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();

      const mgInputText = mgPanel.shadowRoot.querySelector('mg-input-text');
      const input = mgInputText.shadowRoot.querySelector('input');
      input.checkValidity = jest.fn(() => false);
      Object.defineProperty(input, 'validity', {
        get: jest.fn(() => ({
          patternMismatch: false,
        })),
      });

      // second update title with a falsy update title
      input.value = updatedPanelTitle;
      input.dispatchEvent(new CustomEvent('input', { bubbles: true }));
      await page.waitForChanges();

      input.dispatchEvent(new CustomEvent('blur', { bubbles: true }));
      await page.waitForChanges();

      // and click on validate button
      const afterInputAction = mgPanel.shadowRoot.querySelector('.mg-c-panel__header-title mg-input-text mg-button:last-of-type');

      afterInputAction.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();

      expect(mgPanel.panelTitle).toBe(args.panelTitle);
      expect(page.rootInstance.titleChange.emit).not.toHaveBeenCalledWith(updatedPanelTitle);

      // finaly return to default view by clicking on cancel button
      const cancelAction = mgPanel.shadowRoot.querySelector('.mg-c-panel__header-title mg-input-text mg-button:last-of-type');

      cancelAction.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();
    });
  });
});
