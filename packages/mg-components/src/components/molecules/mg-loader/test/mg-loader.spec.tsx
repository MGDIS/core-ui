import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgLoader } from '../mg-loader';

const getPage = (args: Partial<Pick<MgLoader, 'message' | 'messageHide'> & { lang: string }>) =>
  newSpecPage({
    components: [MgLoader],
    template: () => <mg-loader {...args}></mg-loader>,
  });

describe('mg-loader', () => {
  test.each([{}, { message: 'new loader message' }, { messageHide: true }])('with args %s', async args => {
    const { root } = await getPage(args);
    expect(root).toMatchSnapshot();
  });

  test('Should throw error if message is not valid', async () => {
    expect.assertions(1);
    try {
      await getPage({ message: ' ' });
    } catch (err) {
      expect(err.message).toEqual('<mg-loader> prop "message" must be a valid string.');
    }
  });

  test.each(['fr', 'xx'])('Should render component with locale: %s', async lang => {
    const { root } = await getPage({ lang });
    expect(root).toMatchSnapshot();
  });
});
