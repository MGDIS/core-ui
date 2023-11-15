import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgInputTitle } from '../mg-input-title';

const getPage = args =>
  newSpecPage({
    components: [MgInputTitle],
    template: () => <mg-input-title {...args}>mg-input-title</mg-input-title>,
  });

describe('mg-input-title', () => {
  test.each([true, false].flatMap(isLegend => [true, false].flatMap(required => [true, false].map(readonly => ({ isLegend, required, readonly, identifier: 'identifier' })))))(
    'Should render label with args %s',
    async args => {
      const { root } = await getPage(args);
      expect(root).toMatchSnapshot();
    },
  );

  test.each(['', ' ', undefined])('Should throw error, case invalid identifier prop', async identifier => {
    expect.assertions(1);
    try {
      await getPage({ identifier });
    } catch (err) {
      expect(err.message).toContain('<mg-input-title> prop "identifier" is required.');
    }
  });
});
