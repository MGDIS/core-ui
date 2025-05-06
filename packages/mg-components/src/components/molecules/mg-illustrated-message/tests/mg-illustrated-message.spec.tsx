import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgIllustratedMessage } from '../mg-illustrated-message';
import { directions, sizes } from '../mg-illustrated-message.conf';
import { toString } from '@mgdis/core-ui-helpers/dist/stencil';

const getPage = (
  args,
  title = <h2 slot="title">Lorem Ipsum</h2>,
  illustration = (
    <svg slot="illustration" viewBox="0 0 190 350" xmlns="http://www.w3.org/2000/svg">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M0 0H15C23.2843 0 30 6.71573 30 15V290H40V15C40 6.71573 46.7157 0 55 0C63.2843 0 70 6.71573 70 15V275C70 277.761 67.7615 280 65 280H60V40H50V340H60V290H65C67.7615 290 70 292.239 70 295V340H80V295C80 291.158 78.5558 287.654 76.1805 285C78.5558 282.346 80 278.842 80 275V0H95C103.284 0 110 6.71573 110 15V25C110 28.8418 108.556 32.3462 106.181 35C108.556 37.6538 110 41.1582 110 45V305C110 307.761 107.761 310 105 310H100V45C100 42.2386 97.7615 40 95 40H90V325C90 333.284 96.7157 340 105 340H120V330H105C102.239 330 100 327.761 100 325V320H105C113.284 320 120 313.284 120 305V15C120 6.71573 126.716 0 135 0C143.284 0 150 6.71573 150 15V330H140V15C140 12.2386 137.761 10 135 10C132.239 10 130 12.2386 130 15V340H165C173.284 340 180 333.284 180 325V15C180 12.2386 177.761 10 175 10H170V325C170 327.761 167.761 330 165 330H160V0H175C183.284 0 190 6.71573 190 15V350H0V0ZM10 325C10 333.284 16.7157 340 25 340C33.2843 340 40 333.284 40 325V300H30V325C30 327.761 27.7615 330 25 330C22.2385 330 20 327.761 20 325V15C20 12.2386 17.7615 10 15 10H10V325ZM60 15V30H50V15C50 12.2386 52.2385 10 55 10C57.7615 10 60 12.2386 60 15ZM95 30H90V10H95C97.7615 10 100 12.2386 100 15V25C100 27.7614 97.7615 30 95 30Z"
        fill="black"
      />
    </svg>
  ),
  details = [
    <h3 slot="details">The standard Lorem Ipsum passage, used since the 1500s</h3>,
    <div slot="details">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
      ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
      occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </div>,
  ],
) =>
  newSpecPage({
    components: [MgIllustratedMessage],
    template: () => (
      <mg-illustrated-message {...args}>
        {illustration}
        {title}
        {details}
      </mg-illustrated-message>
    ),
  });

describe('mg-illustrated-message', () => {
  test.each([{}, { size: 'small' }, { size: 'large' }, { direction: 'horizontal' }])('with args %s', async args => {
    const { root } = await getPage(args);
    expect(root).toMatchSnapshot();
  });

  test('Should throw error with invalid "size" property', async () => {
    const size = 'blu';
    expect.assertions(1);
    try {
      await getPage({ size });
    } catch (err) {
      expect(err.message).toEqual(`<mg-illustrated-message> prop "size" must be one of: ${sizes.join(', ')}. Passed value: ${toString(size)}.`);
    }
  });

  test('Should throw error with invalid "direction" property', async () => {
    const direction = 'blu';
    expect.assertions(1);
    try {
      await getPage({ direction });
    } catch (err) {
      expect(err.message).toEqual(`<mg-illustrated-message> prop "direction" must be one of: ${directions.join(', ')}. Passed value: ${toString(direction)}.`);
    }
  });

  test('Should update classes on size/direction changes', async () => {
    const page = await getPage({});
    const element = page.doc.querySelector('mg-illustrated-message');
    let classMedium = element.shadowRoot.querySelector('.mg-c-illustrated-message--size-medium');
    let classHorizontal = element.shadowRoot.querySelector('.mg-c-illustrated-message--direction-horizontal');

    expect(classMedium).not.toBeNull();
    expect(classHorizontal).toBeNull();

    // Change size
    element.size = 'large';
    await page.waitForChanges();

    classMedium = element.shadowRoot.querySelector('.mg-c-illustrated-message--size-medium');
    const classLarge = element.shadowRoot.querySelector('.mg-c-illustrated-message--size-large');

    expect(classMedium).toBeNull();
    expect(classLarge).not.toBeNull();

    // Change direction
    element.direction = 'horizontal';
    await page.waitForChanges();

    classHorizontal = element.shadowRoot.querySelector('.mg-c-illustrated-message--direction-horizontal');
    expect(classHorizontal).not.toBeNull;

    // Reset direction
    element.direction = undefined;
    await page.waitForChanges();

    classHorizontal = element.shadowRoot.querySelector('.mg-c-illustrated-message--direction-horizontal');
    expect(classHorizontal).toBeNull();
  });

  test('Should render even if slotted content is not an image file', async () => {
    const { root } = await getPage({}, undefined, <span slot="illustration"></span>);
    expect(root).toMatchSnapshot();
  });

  test('Should render with details even if title is missing', async () => {
    const { root } = await getPage({}, null);
    expect(root).toMatchSnapshot();
  });

  test('Should throw error if slot title element is not a heading', async () => {
    expect.assertions(1);
    try {
      await getPage({}, <span slot="title">Lorem Ipsum</span>);
    } catch (err) {
      expect(err.message).toContain('<mg-illustrated-message> Slotted title must be a heading: ');
    }
  });

  test('Should throw error if slot title and details are missing', async () => {
    expect.assertions(1);
    try {
      await getPage({}, null, undefined, null);
    } catch (err) {
      expect(err.message).toContain('<mg-illustrated-message> Slot "title" or "details" must be present.');
    }
  });

  test.each([<div>content without illustration slot</div>, [<svg slot="illustration"></svg>, <svg slot="illustration"></svg>]])(
    'Should throw error if slot illustration is not single or element is not an image',
    async slottedIllustration => {
      expect.assertions(1);
      try {
        await getPage({}, undefined, slottedIllustration);
      } catch (err) {
        expect(err.message).toEqual('<mg-illustrated-message> Slotted illustration must be present and unique.');
      }
    },
  );
});
