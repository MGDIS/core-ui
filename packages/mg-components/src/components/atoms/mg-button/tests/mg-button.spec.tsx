import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgButton } from '../mg-button';
import { MgForm } from '../../../molecules/mg-form/mg-form';
import { variants, buttonTypes, sizes } from '../mg-button.conf';
import { setupMutationObserverMock, setupSubmitEventMock } from '@mgdis/stencil-helpers';

const getPage = async (args, content = 'Text button') =>
  newSpecPage({
    components: [MgButton, MgForm],
    template: () => {
      const TagName = args.formTag;
      delete args.formTag;
      const button = () => <mg-button {...args}>{content}</mg-button>;
      if (!TagName) return button();
      else return <TagName identifier="identifier">{button()}</TagName>;
    },
  });

describe('mg-button', () => {
  beforeEach(() => {
    setupMutationObserverMock({
      observe: function () {
        return null;
      },
      disconnect: function () {
        return null;
      },
      takeRecords: () => [],
    });
    setupSubmitEventMock();
  });

  describe.each(['', ...variants])('Should render an %s button', variant => {
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
    let classPrimary = element.shadowRoot.querySelector('.mg-c-button--primary');

    expect(classPrimary).not.toBeNull();

    // Change variant
    element.variant = 'danger';
    await page.waitForChanges();

    classPrimary = element.shadowRoot.querySelector('.mg-c-button--primary');
    const classDanger = element.shadowRoot.querySelector('.mg-c-button--danger');

    expect(classPrimary).toBeNull();
    expect(classDanger).not.toBeNull();
  });

  test.each([true, false])('Should update button on size to large with icon: %s', async isIcon => {
    const page = await getPage({ label: 'label', isIcon }, isIcon ? <mg-icon icon="user"></mg-icon> : undefined);
    const element = page.doc.querySelector('mg-button');

    expect(page.root).toMatchSnapshot();

    // Change size
    element.size = 'large';
    await page.waitForChanges();

    expect(page.root).toMatchSnapshot();
  });

  test.each([' ', 'blu'])('Should throw error with invalid variant: %s', async variant => {
    expect.assertions(1);
    try {
      await getPage({ variant, label: 'label' });
    } catch (err) {
      expect(err.message).toEqual(`<mg-button> prop "variant" must be one of: ${variants.join(', ')}. Passed value: ${variant}.`);
    }
  });

  test.each([' ', 'batman'])('Should throw error with invalid variant: %s', async size => {
    expect.assertions(1);
    try {
      await getPage({ size, label: 'label' });
    } catch (err) {
      expect(err.message).toEqual(`<mg-button> prop "size" must be one of: ${sizes.join(', ')}. Passed value: ${size}.`);
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

  test('Should throw error when using prop "isIcon" without a good prop "fullWidth"', async () => {
    expect.assertions(1);
    try {
      await getPage({ isIcon: true, label: 'batman', fullWidth: true });
    } catch (err) {
      expect(err.message).toContain('<mg-button> prop "fullWidth" cannot be used with prop "isIcon"');
    }
  });

  describe('prevent double click', () => {
    test('Should NOT disable button after click', async () => {
      const page = await getPage({});
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

    test('Should disable button after click', async () => {
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

    test('Should not trigger disableOnClick when disabled', async () => {
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

    test('Should not have fn when disabled', async () => {
      const page = await getPage({
        disabled: true,
        onClick: () => false,
      });

      expect(page.root).toMatchSnapshot();
    });
  });

  describe.each([{}, { disabled: true }])('keyboard', props => {
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

  describe.each(['form', 'mg-form'])('form <%s/>', form => {
    test.each([undefined, 'submit', 'button'])('Should emit "submit" event, case type is %s', async type => {
      const args = { type, formTag: form };
      const page = await getPage(args);

      const mgForm = page.doc.querySelector('mg-form')?.shadowRoot.querySelector('form') || page.doc.querySelector('form');
      const mgButton = page.doc.querySelector('mg-button');

      const formSpy = jest.spyOn(mgForm, 'dispatchEvent');

      mgButton.dispatchEvent(new Event('click', { bubbles: true }));

      await page.waitForChanges();

      if ([undefined, 'submit'].includes(type)) {
        expect(formSpy).toHaveBeenCalledWith(
          expect.objectContaining({
            type: 'submit',
            cancelable: true,
          }),
        );
      } else {
        expect(formSpy).not.toHaveBeenCalled();
      }
    });
  });
});
