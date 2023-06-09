import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgButton } from '../mg-button';
import { variants, buttonTypes } from '../mg-button.conf';

const getPage = (args, content = 'Text button') =>
  newSpecPage({
    components: [MgButton],
    template: () => <mg-button {...args}>{content}</mg-button>,
  });

describe('mg-button', () => {
  test('Should render a button with an id', async () => {
    const { root } = await getPage({ identifier: 'identifier', label: 'label' });
    expect(root).toMatchSnapshot();
  });

  describe.each(variants)('Should render an %s button', variant => {
    test.each([false, true])('isIcon %s', async isIcon => {
      const { root } = await getPage({ variant, isIcon, label: 'label' });
      expect(root).toMatchSnapshot();
    });
  });

  test.each(buttonTypes)('Should render a button, case type %s', async type => {
    const { root } = await getPage({ label: 'label', type });
    expect(root).toMatchSnapshot();
  });

  test.each([true, false, undefined])('Should render a button, case full-width %s', async fullWidth => {
    const { root } = await getPage({ label: 'label', fullWidth });
    expect(root).toMatchSnapshot();
  });

  test('Should replace classes on variant changes', async () => {
    const page = await getPage({ variant: 'primary', label: 'label' });
    const element = page.doc.querySelector('mg-button');
    let classPrimary = element.shadowRoot.querySelector('.mg-button--primary');

    expect(classPrimary).not.toBeNull();

    // Change variant
    element.variant = 'danger';
    await page.waitForChanges();

    classPrimary = element.shadowRoot.querySelector('.mg-button--primary');
    const classDanger = element.shadowRoot.querySelector('.mg-button--danger');

    expect(classPrimary).toBeNull();
    expect(classDanger).not.toBeNull();
  });

  test.each(['', 'blu'])('Should throw error', async variant => {
    expect.assertions(1);
    try {
      await getPage({ variant });
    } catch (err) {
      expect(err.message).toContain('<mg-button> prop "variant" must be one of: ');
    }
  });

  test.each(['', ' ', undefined])('should throw error when using prop "isIcon" without a good prop "label"', async label => {
    expect.assertions(1);
    try {
      await getPage({ isIcon: true, label });
    } catch (err) {
      expect(err.message).toContain('<mg-button> prop "label" is mandatory when prop "isIcon" is set to true.');
    }
  });

  test('should throw error when using prop "isIcon" without a good prop "fullWidth"', async () => {
    expect.assertions(1);
    try {
      await getPage({ isIcon: true, label: 'batman', fullWidth: true });
    } catch (err) {
      expect(err.message).toContain('<mg-button> prop "fullWidth" cannot be used with prop "isIcon"');
    }
  });

  describe('prevent double click', () => {
    test('should NOT disable button after click', async () => {
      const page = await getPage({ identifier: 'identifier' });
      const button = page.doc.querySelector('mg-button');
      const spy = jest.spyOn(page.rootInstance.disabledChange, 'emit');

      expect(page.root).toMatchSnapshot();

      button.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      await page.waitForChanges();

      expect(spy).not.toHaveBeenCalled();
      expect(page.root).toMatchSnapshot();

      button.disabled = true;
      await page.waitForChanges();
      expect(spy).toHaveBeenCalledWith(true);

      expect(page.root).toMatchSnapshot();
    });

    test('should disable button after click', async () => {
      const page = await getPage({ disableOnClick: true });
      const button = page.doc.querySelector('mg-button');
      const spy = jest.spyOn(page.rootInstance.disabledChange, 'emit');

      expect(page.root).toMatchSnapshot();

      button.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      await page.waitForChanges();

      expect(spy).toHaveBeenCalledWith(true);
      expect(page.root).toMatchSnapshot();

      button.disabled = false;
      await page.waitForChanges();

      expect(spy).toHaveBeenCalledWith(false);
      expect(page.root).toMatchSnapshot();
    });

    test('should not trigger disableOnClick when disabled', async () => {
      const page = await getPage({
        disabled: true,
        disableOnCLick: true,
      });
      const button = page.doc.querySelector('mg-button');
      const spy = jest.spyOn(page.rootInstance.disabledChange, 'emit');

      expect(page.root).toMatchSnapshot();

      button.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      await page.waitForChanges();

      expect(spy).not.toHaveBeenCalled();
      expect(page.root).toMatchSnapshot();
    });

    test('should not have fn when disabled', async () => {
      const page = await getPage({
        disabled: true,
        onClick: () => false,
      });

      expect(page.root).toMatchSnapshot();
    });
  });

  describe.each([{ identifier: 'identifier' }, { identifier: 'identifier', disabled: true }])('keyboard', props => {
    test.each([' ', 'Enter', 'NumpadEnter'])('Should trigger click event on keydown', async key => {
      const page = await getPage(props);
      const button = page.doc.querySelector('mg-button');

      const spy = jest.spyOn(button, 'dispatchEvent');

      button.dispatchEvent(new KeyboardEvent(key === ' ' ? 'keyup' : 'keydown', { bubbles: true, key }));
      await page.waitForChanges();

      if (props.disabled) {
        expect(spy).not.lastCalledWith(expect.objectContaining({ type: 'click' }));
      } else {
        expect(spy).lastCalledWith(expect.objectContaining({ type: 'click' }));
      }
    });
    test.each(['ArrowRight', 'Tab', ' '])('Should NOT trigger click event on keydown', async key => {
      const page = await getPage(props);
      const button = page.doc.querySelector('mg-button');

      const spy = jest.spyOn(button, 'dispatchEvent');

      button.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key }));
      await page.waitForChanges();

      expect(spy).not.lastCalledWith(expect.objectContaining({ type: 'click' }));
    });
  });
});
