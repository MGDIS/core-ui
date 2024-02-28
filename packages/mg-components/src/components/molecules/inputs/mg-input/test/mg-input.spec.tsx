import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { mockWindowFrames } from '../../../../../utils/unit.test.utils';
import { MgInput } from '../../mg-input/mg-input';
import { MgInputTitle } from '../../../../atoms/mg-input-title/mg-input-title';
import { ClassList } from '@mgdis/stencil-helpers';
import { classDisabled, classFieldset, classReadonly } from '../mg-input.conf';

mockWindowFrames();

const getPage = (args, slot?) =>
  newSpecPage({
    components: [MgInputTitle, MgInput],
    template: () => <mg-input {...args}>{slot ? slot : <input type="file" id={args.identifier}></input>}</mg-input>,
  });

const baseArgs = {
  label: 'label',
  identifier: 'identifier',
};

const errorMessage = 'This is an error';

const helpText = 'Hello joker';

const tooltip = 'Batman is a DC Comics license';

describe('mg-input', () => {
  describe('render', () => {
    test.each([
      { ...baseArgs },
      { ...baseArgs, classCollection: new ClassList([]) },
      { ...baseArgs, classCollection: new ClassList([classFieldset]) },
      { ...baseArgs, errorMessage },
      { ...baseArgs, errorMessage, classCollection: new ClassList([classReadonly]) },
      { ...baseArgs, errorMessage, classCollection: new ClassList([classDisabled]) },
      { ...baseArgs, readonlyValue: ['batman', 'joker', 'bane'], classCollection: new ClassList([classReadonly]) },
      { ...baseArgs, classCollection: new ClassList([classReadonly]) },
      { ...baseArgs, classCollection: new ClassList([classReadonly]), inputVerticalList: true },
      { ...baseArgs, labelOnTop: true },
      { ...baseArgs, labelHide: true },
      { ...baseArgs, inputVerticalList: true },
      { ...baseArgs, required: true },
      { ...baseArgs, helpText },
      { ...baseArgs, required: true, classCollection: new ClassList([classReadonly]), helpText },
      { ...baseArgs, required: true, classCollection: new ClassList([classDisabled]), helpText },
      { ...baseArgs, classCollection: new ClassList([classReadonly]), labelOnTop: true, tooltip },
      { ...baseArgs, classCollection: new ClassList([classDisabled]) },
      { ...baseArgs, tooltip },
      { ...baseArgs, tooltip, tooltipPosition: 'label' },
      { ...baseArgs, tooltip, tooltipPosition: 'input', labelOnTop: true },
    ])('Should render with args %s:', async args => {
      const { root } = await getPage(args);
      expect(root).toMatchSnapshot();
    });

    test('Should update "error" slot', async () => {
      const page = await getPage(baseArgs);
      const element = page.doc.querySelector('mg-input');

      element.errorMessage = errorMessage;
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();

      element.errorMessage = undefined;
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();
    });

    test('Should update "help-text" slot', async () => {
      const page = await getPage(baseArgs);
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
        await getPage({ ...baseArgs, identifier });
      } catch (err) {
        expect(err.message).toMatch('<mg-input> prop "identifier" is required.');
      }
    });

    test.each(['', ' ', undefined])('Should not render with invalid "label" property: %s', async label => {
      expect.assertions(1);
      try {
        await getPage({ ...baseArgs, label });
      } catch (err) {
        expect(err.message).toMatch('<mg-input> prop "label" is required.');
      }
    });

    test.each([' ', 'batman'])('Should not render with invalid "tooltipPosition" property: %s', async tooltipPosition => {
      expect.assertions(1);
      try {
        await getPage({ ...baseArgs, tooltipPosition });
      } catch (err) {
        expect(err.message).toMatch('<mg-input> prop "tooltipPosition" must be one of: input, label');
      }
    });

    test('Should not render with label-on-top and label-hide setup', async () => {
      expect.assertions(1);
      try {
        await getPage({ ...baseArgs, labelOnTop: true, labelHide: true });
      } catch (err) {
        expect(err.message).toMatch('<mg-input> prop "labelOnTop" must not be paired with the prop "labelHide".');
      }
    });

    test('Should throw error when slotted input hasn\'t valid "id" attribute', async () => {
      expect.assertions(1);
      try {
        await getPage({ ...baseArgs }, <input type="file"></input>);
      } catch (err) {
        expect(err.message).toMatch('<mg-input> "identifier" prop has no target for id: identifier. Add an id to the targeted input.');
      }
    });
  });
});
