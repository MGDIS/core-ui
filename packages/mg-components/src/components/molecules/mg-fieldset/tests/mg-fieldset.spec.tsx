import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgFieldset } from '../mg-fieldset';
import { MgInput } from '../../inputs/mg-input/mg-input';
import { MgInputText } from '../../inputs/mg-input-text/mg-input-text';
import { MgInputRadio } from '../../inputs/mg-input-radio/mg-input-radio';
import { MgInputTitle } from '../../../atoms/internals/mg-input-title/mg-input-title';
import { setupMutationObserverMock } from '@mgdis/core-ui-helpers/dist/tests';
import { HTMLMgInputsElement } from '../../inputs/mg-input/mg-input.conf';

const baseArgs = {
  legend: 'legend',
  identifier: 'identifier',
};

const errorMessage = 'This is an error';

const helpText = 'Hello joker';

const getSlottedContent = () => [
  <mg-input-radio identifier="mg-input-radio" label="mg-input-radio label" items={['batman', 'robin', 'joker', 'bane']}></mg-input-radio>,
  <mg-input-text identifier="mg-input-text" label="mg-input-text label"></mg-input-text>,
];

const setCheckValitidy = (input: HTMLMgInputsElement): void => {
  const shadowInputs: NodeListOf<HTMLInputElement> = input.shadowRoot.querySelectorAll('input, textarea, select');
  shadowInputs.forEach(input => {
    // select and textarea mock use prototype of MockElement instead of MockHTMLElement
    // so attributes aren't available on the object, but we can get attribute in stringified DOM.
    const required = input.required || input.outerHTML.includes('required=""');
    input.checkValidity = jest.fn(() => !required);

    Object.defineProperty(input, 'validity', {
      get: jest.fn(() => ({
        valueMissing: required,
      })),
    });
  });
};

const getPage = async (args, slot) => {
  const page = await newSpecPage({
    components: [MgFieldset, MgInputTitle, MgInput, MgInputText, MgInputRadio],
    template: () => <mg-fieldset {...args}>{slot}</mg-fieldset>,
  });

  jest.runOnlyPendingTimers();
  await page.waitForChanges();

  return page;
};

describe('mg-fieldset', () => {
  let fireMo;
  beforeEach(() => {
    jest.useFakeTimers({ legacyFakeTimers: true });

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
  describe('render', () => {
    test.each([
      {},
      { legendHide: true },
      { legendOnTop: true },
      { legendHeadingLevel: 'h1' },
      { legendHeadingLevel: 'h1', legendBorderDisplay: true },
      { readonly: true },
      { disabled: true },
      { tooltip: 'My Tooltip Message' },
      { helpText },
      { errorMessage },
    ])('Should render with args %s:', async args => {
      const slot = getSlottedContent();
      const { root } = await getPage({ ...baseArgs, ...args }, slot);
      expect(root).toMatchSnapshot();
    });

    test.each([{ type: 'childList' }, { type: 'subtree' }, { type: 'attributes' }])('Should update input list when element is added to DOM', async mutation => {
      const slot = getSlottedContent();
      const page = await getPage(baseArgs, slot);

      jest.spyOn(page.rootInstance, 'setMgInputs');

      expect(page.rootInstance.setMgInputs).not.toHaveBeenCalled();

      fireMo([mutation]);
      await page.waitForChanges();

      if (mutation.type !== 'attributes') {
        expect(page.rootInstance.setMgInputs).toHaveBeenCalled();
      } else {
        expect(page.rootInstance.setMgInputs).not.toHaveBeenCalled();
      }
    });

    test.each(['readonly', 'disabled'])('Should update input list when attribute % change', async attribute => {
      const slot = getSlottedContent();
      const page = await getPage(baseArgs, slot);
      const mgFieldset = page.doc.querySelector('mg-fieldset');

      jest.spyOn(page.rootInstance, 'setMgInputs');

      expect(page.rootInstance.setMgInputs).not.toHaveBeenCalled();

      mgFieldset[attribute] = true;
      await page.waitForChanges();

      expect(page.rootInstance.setMgInputs).toHaveBeenCalled();
    });
  });

  describe('errors', () => {
    test('Should not render with invalid prop combination: "legendBorderDisplay" and "legendHeadingLevel"', async () => {
      expect.assertions(1);
      const slot = getSlottedContent();
      try {
        await getPage({ ...baseArgs, legendBorderDisplay: true }, slot);
      } catch (err) {
        expect(err.message).toEqual('<mg-input> prop "legendBorderDisplay" must not be paired with the prop "legendHeadingLevel".');
      }
    });
  });

  describe('validity', () => {
    test.each([false, true])('Should display components errors (readonly: %s)', async readonly => {
      const slot = getSlottedContent();
      // Set all elements required
      slot.forEach(s => {
        s.$attrs$.required = true;
      });

      const page = await getPage({ ...baseArgs, readonly }, slot);
      const mgFieldset = page.doc.querySelector('mg-fieldset');

      if (!readonly) {
        // Mock all input validity
        const mgInputs = Array.from(mgFieldset.querySelectorAll('*')) as HTMLMgInputsElement[];
        mgInputs.forEach(input => {
          setCheckValitidy(input);
        });
        await page.waitForChanges();

        await mgFieldset.displayError();
      }

      jest.runOnlyPendingTimers();
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();
    });

    test.each([false, true])('Should set custom validity (readonly: %s)', async readonly => {
      const slot = getSlottedContent();
      const page = await getPage({ ...baseArgs, readonly }, slot);
      const mgFieldset = page.doc.querySelector('mg-fieldset');

      // set error
      await mgFieldset.setCustomValidity('this is a custom error');
      await page.waitForChanges();

      jest.runOnlyPendingTimers();
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();

      // remove error
      await mgFieldset.setCustomValidity('');
      await page.waitForChanges();

      jest.runOnlyPendingTimers();
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();
    });
  });
});
