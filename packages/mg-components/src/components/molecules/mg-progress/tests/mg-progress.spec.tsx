import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgProgress } from '../mg-progress';
import { roles } from '../mg-progress.conf';
import { toString } from '@mgdis/stencil-helpers';

const getPage = (args: Pick<MgProgress, 'label'> & Partial<Pick<MgProgress, 'value' | 'min' | 'max' | 'valueText' | 'ariaRole'> & { lang: string }>) =>
  newSpecPage({
    components: [MgProgress],
    template: () => <mg-progress {...args}></mg-progress>,
  });

describe('mg-progress', () => {
  test.each([
    { label: 'progress' },
    { label: 'progress', value: 10 },
    { label: 'progress', value: 10, max: 10 },
    { label: 'progress', value: 10, max: 15 },
    { label: 'progress', value: 10, min: 5 },
    { label: 'progress', value: 10, min: 5, max: 15 },
    { label: 'progress', value: 30, max: 50, valueText: '30€ of 50€' },
    { label: 'progress', ariaRole: 'meter' as MgProgress['ariaRole'] },
    { label: 'new progress label' },
  ])('with args %s', async args => {
    const { root } = await getPage(args);
    expect(root).toMatchSnapshot();
  });

  test.each([' ', undefined, null])('Should throw error if "label" is not valid, %s', async label => {
    expect.assertions(1);
    try {
      await getPage({ label: label as MgProgress['label'] });
    } catch (err) {
      expect(err.message).toEqual(`<mg-progress> prop "label" must be a valid string. Passed value: ${label}.`);
    }
  });

  test.each(['batman', ' '])('Should throw error if "ariaRole" is not valid, %s', async ariaRole => {
    expect.assertions(1);
    try {
      await getPage({ label: 'progress', ariaRole: ariaRole as MgProgress['ariaRole'] });
    } catch (err) {
      expect(err.message).toEqual(`<mg-progress> prop "ariaRole" must be one of: ${roles.join(', ')}. Passed value: ${ariaRole}.`);
    }
  });

  test.each(['batman', 200, {}])('Should throw error if "value" is not valid, %s', async value => {
    expect.assertions(1);
    try {
      await getPage({ label: 'progress', value: value as MgProgress['value'] });
    } catch (err) {
      expect(err.message).toEqual(`<mg-progress> prop “value” must be a number within the range 0 to 100. Passed value: ${typeof value === 'string' ? 'NaN' : toString(value)}.`);
    }
  });

  test.each(['batman', 200, {}])('Should throw error if "min" is not valid, %s', async min => {
    expect.assertions(1);
    try {
      await getPage({ label: 'progress', min: min as MgProgress['min'] });
    } catch (err) {
      expect(err.message).toEqual(`<mg-progress> prop “min” must be a number lower than: 100. Passed value: ${typeof min === 'string' ? 'NaN' : toString(min)}.`);
    }
  });

  test.each(['batman', -10, {}])('Should throw error if "max" is not valid, %s', async max => {
    expect.assertions(1);
    try {
      await getPage({ label: 'progress', max: max as MgProgress['max'] });
    } catch (err) {
      expect(err.message).toEqual(`<mg-progress> prop “max” must be a number greater than: 0. Passed value: ${typeof max === 'string' ? 'NaN' : toString(max)}.`);
    }
  });

  test('Should throw error if valueText is not valid', async () => {
    expect.assertions(1);
    try {
      await getPage({ label: 'label', valueText: ' ' });
    } catch (err) {
      expect(err.message).toEqual(`<mg-progress> prop "valueText" must be a valid string. Passed value:  .`);
    }
  });
});
