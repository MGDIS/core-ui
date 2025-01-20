import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { MgPagination } from '../mg-pagination';
import { MgButton } from '../../../atoms/mg-button/mg-button';
import { MgIcon } from '../../../atoms/mg-icon/mg-icon';
import { MgInputSelect } from '../../inputs/mg-input-select/mg-input-select';
import { MgInput } from '../../inputs/mg-input/mg-input';
import { MgInputTitle } from '../../../atoms/internals/mg-input-title/mg-input-title';
import { setUpRequestAnimationFrameMock } from '@mgdis/stencil-helpers';

const getPage = async args => {
  const page = await newSpecPage({
    components: [MgPagination, MgButton, MgIcon, MgInputSelect, MgInput, MgInputTitle],
    template: () => <mg-pagination {...args}></mg-pagination>,
  });

  jest.runAllTimers();
  setUpRequestAnimationFrameMock(jest.runOnlyPendingTimers);

  return page;
};

describe('mg-pagination', () => {
  beforeEach(() => {
    jest.useFakeTimers({ legacyFakeTimers: true });
  });
  afterEach(() => {
    jest.runOnlyPendingTimers();
  });
  describe('Should render', () => {
    test.each([1, 2, 3, 10])('with totalPages %s', async totalPages => {
      const page = await getPage({ totalPages, identifier: 'id' });
      expect(page.root).toMatchSnapshot();

      const actions = [...Array(totalPages - 1).keys()];

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      for (const _ of actions) {
        const nextButton = page.root.shadowRoot.querySelector('mg-button:last-of-type');
        nextButton.dispatchEvent(new CustomEvent('click', { bubbles: true }));
        await page.waitForChanges();

        expect(page.root).toMatchSnapshot();
      }
    });

    test('Should set custom label', async () => {
      const page = await getPage({ totalPages: 2, identifier: 'id', label: 'custom label' });
      expect(page.root).toMatchSnapshot();
    });

    test.each([true, false])('Should hide navigation labels', async hideNavigationLabels => {
      const page = await getPage({ totalPages: 2, identifier: 'id', hideNavigationLabels });
      expect(page.root).toMatchSnapshot();
    });

    test.each([true, false])('Should hide page select', async hidePageCount => {
      const page = await getPage({ totalPages: 2, identifier: 'id', hidePageCount });
      expect(page.root).toMatchSnapshot();
    });

    test.each(['fr', 'xx'])('with locale: %s', async lang => {
      const totalPages = 2;
      const page = await getPage({ totalPages, identifier: 'id', lang });
      expect(page.root).toMatchSnapshot();
    });
  });

  describe('errors', () => {
    test('Should log an error with invalid "identifier" property', async () => {
      const identifier = '{{batman}}';
      const spy = jest.spyOn(console, 'error');
      expect.assertions(1);
      try {
        await getPage({ identifier });
      } catch {
        expect(spy).toHaveBeenCalledWith(`<mg-pagination> prop "identifier" value is invalid. Passed value: ${identifier}.`);
      }
    });
    test('Should throw an error, case totalPages props invalid', async () => {
      expect.assertions(1);
      try {
        await getPage({ totalPages: 0 });
      } catch (err) {
        expect(err.message).toBe(`<mg-pagination> prop "totalPages" must be greater than 0. Passed value: 0.`);
      }
    });
    test('Should throw an error, case currentPage props invalid: 0', async () => {
      expect.assertions(1);
      try {
        await getPage({ currentPage: 0 });
      } catch (err) {
        expect(err.message).toBe(`<mg-pagination> prop "currentPage" must be greater than 0. Passed value: 0.`);
      }
    });
    test('Should throw an error, case currentPage props invalid: currentPage > totalPages', async () => {
      expect.assertions(1);
      try {
        await getPage({ currentPage: 2, totalPages: 1 });
      } catch (err) {
        expect(err.message).toBe('<mg-pagination> prop "currentPage" can not be greater than total page.');
      }
    });
  });

  describe('navigation', () => {
    test('navigate with select from 1 to 5 to 1, case totalPages=5', async () => {
      const page = await getPage({ totalPages: 5, identifier: 'id' });
      expect(page.root).toMatchSnapshot();

      jest.spyOn(page.rootInstance.currentPageChange, 'emit');

      const mgInputSelect = page.root.shadowRoot.querySelector('mg-input-select');
      mgInputSelect.value = '5';
      mgInputSelect.dispatchEvent(new CustomEvent('value-change', { bubbles: true }));
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();
      expect(page.rootInstance.currentPageChange.emit).toHaveBeenCalledWith(5);

      mgInputSelect.value = '2';
      mgInputSelect.dispatchEvent(new CustomEvent('value-change', { bubbles: true }));
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();
      expect(page.rootInstance.currentPageChange.emit).toHaveBeenCalledWith(2);

      mgInputSelect.value = 'placeholder';
      mgInputSelect.dispatchEvent(new CustomEvent('value-change', { bubbles: true }));
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();
      expect(page.rootInstance.currentPageChange.emit).toHaveBeenCalledWith(1);
      expect(page.rootInstance.currentPageChange.emit).toHaveBeenCalledTimes(3);
    });
    test('navigate with next and previous, case totalPages=5', async () => {
      const page = await getPage({ totalPages: 5, identifier: 'id' });
      expect(page.root).toMatchSnapshot();

      jest.spyOn(page.rootInstance.currentPageChange, 'emit');

      // no action with a disabled button clic
      const pageOneFirstClick = page.root.shadowRoot.querySelector('mg-button:first-of-type');
      pageOneFirstClick.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();
      expect(page.rootInstance.currentPageChange.emit).not.toHaveBeenCalled();

      // action to go to page 2 with a next button clic
      const pageFive = page.root.shadowRoot.querySelector('mg-button:last-of-type');
      pageFive.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();
      expect(page.rootInstance.currentPageChange.emit).toHaveBeenCalledWith(2);

      // action to go to page 1 with a previous button clic
      const pageOne = page.root.shadowRoot.querySelector('mg-button:first-of-type');
      pageOne.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();
      expect(page.rootInstance.currentPageChange.emit).toHaveBeenCalledWith(1);
      expect(page.rootInstance.currentPageChange.emit).toHaveBeenCalledTimes(2);
    });
  });
});
