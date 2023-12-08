import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MyComponent } from '../my-component';

const getPage = (args?) =>
  newSpecPage({
    components: [MyComponent],
    template: () => <my-component {...args}></my-component>,
  });

describe('my-component', () => {
  it('renders', async () => {
    const { root } = await getPage();
    expect(root).toMatchSnapshot();
  });

  it('renders with values', async () => {
    const { root } = await getPage({ first: 'Stencil', last: "'Don't call me a framework' JS" });
    expect(root).toMatchSnapshot();
  });
});
