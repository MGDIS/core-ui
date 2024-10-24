import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgInput } from '../../mg-input/mg-input';
import { MgInputTitle } from '../../../../atoms/internals/mg-input-title/mg-input-title';
import { classDisabled, classFieldset, classReadonly, tooltipPositions } from '../mg-input.conf';

const baseArgs = {
  label: 'label',
  identifier: 'identifier',
};

const errorMessage = 'This is an error';

const helpText = 'Hello joker';

const tooltip = 'Batman is a DC Comics license';

const getPage = (args = {}, slot?) => {
  const props = { ...baseArgs, ...args };

  return newSpecPage({
    components: [MgInputTitle, MgInput],
    template: () => <mg-input {...props}>{slot ? slot : <input type="file" id={props.identifier}></input>}</mg-input>,
  });
};

describe('mg-input', () => {
  describe('render', () => {
    test.each([
      {},
      { class: '' },
      { labelOnTop: true },
      { labelHide: true },
      { required: true },
      { helpText },
      { errorMessage },
      // fieldset
      { class: classFieldset },
      // disabled
      { class: classDisabled },
      { class: classDisabled, required: true, helpText },
      { class: classDisabled, errorMessage },
      // tooltip
      { tooltip },
      { tooltip, tooltipPosition: 'label' },
      { tooltip, tooltipPosition: 'input', labelOnTop: true },
    ])('Should render with args %s:', async args => {
      const { root } = await getPage(args);
      expect(root).toMatchSnapshot();
    });

    test('Should update "mg-input-title" slot, "label" slot', async () => {
      const page = await getPage({ label: 'batman' });
      expect(page.root).toMatchSnapshot();
      const element = page.doc.querySelector('mg-input');

      element.label = 'joker';
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();
    });

    test('Should update "mg-input-title" slot, "required" prop', async () => {
      const page = await getPage({ label: 'batman', required: true });
      expect(page.root).toMatchSnapshot();
      const element = page.doc.querySelector('mg-input');

      element.required = false;
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();
    });

    test('Should update "mg-input-title" slot, "readonly" prop', async () => {
      const page = await getPage({ label: 'batman' });
      expect(page.root).toMatchSnapshot();
      const element = page.doc.querySelector('mg-input');

      element.classList.add(classReadonly);
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();
    });

    test('Should update "mg-input-title" slot, "fieldset" prop', async () => {
      const page = await getPage({ label: 'batman' });
      expect(page.root).toMatchSnapshot();
      const element = page.doc.querySelector('mg-input');

      element.classList.add(classFieldset);
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();
    });

    test('Should update "error" slot', async () => {
      const page = await getPage();
      const element = page.doc.querySelector('mg-input');

      element.errorMessage = errorMessage;
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();

      element.errorMessage = undefined;
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();
    });

    test('Should update "help-text" slot', async () => {
      const page = await getPage();
      const element = page.doc.querySelector('mg-input');

      element.helpText = helpText;
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();

      element.helpText = undefined;
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();
    });
  });

  describe('errors', () => {
    test.each(['', ' ', undefined])('Should not render with invalid "identifier" property: %s', async identifier => {
      expect.assertions(1);
      try {
        await getPage({ identifier });
      } catch (err) {
        expect(err.message).toEqual(`<mg-input> prop "identifier" is required and must be a string. Passed value: ${identifier}.`);
      }
    });

    test('Should log an error with invalid "identifier" property', async () => {
      const identifier = '{{batman}}';
      const spy = jest.spyOn(console, 'error');

      try {
        await getPage({ identifier });
      } catch {
        expect(spy).toHaveBeenCalledWith(`<mg-input> prop "identifier" value is invalid. Passed value: ${identifier}.`);
      }
    });

    test.each(['', ' ', undefined])('Should not render with invalid "label" property: %s', async label => {
      expect.assertions(1);
      try {
        await getPage({ label });
      } catch (err) {
        expect(err.message).toEqual(`<mg-input> prop "label" is required and must be a string. Passed value: ${label}.`);
      }
    });

    test.each([' ', 'batman'])('Should not render with invalid "tooltipPosition" property: %s', async tooltipPosition => {
      expect.assertions(1);
      try {
        await getPage({ tooltipPosition });
      } catch (err) {
        expect(err.message).toEqual(`<mg-input> prop "tooltipPosition" must be one of: ${tooltipPositions.join(', ')}. Passed value: ${tooltipPosition}.`);
      }
    });

    test('Should not render with label-on-top and label-hide setup', async () => {
      expect.assertions(1);
      try {
        await getPage({ ...baseArgs, labelOnTop: true, labelHide: true });
      } catch (err) {
        expect(err.message).toEqual('<mg-input> prop "labelOnTop" must not be paired with the prop "labelHide".');
      }
    });

    test('Should throw error when slotted input hasn\'t valid "id" attribute', async () => {
      expect.assertions(1);
      try {
        await getPage({}, <input type="file"></input>);
      } catch (err) {
        expect(err.message).toEqual('<mg-input> "identifier" prop has no target for id: identifier. Add an id to the targeted input.');
      }
    });
  });
});
