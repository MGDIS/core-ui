import { describe, it, expect } from 'vitest';
import { Sanitizer } from '../sanitizer';

describe('Sanitizer', () => {
  it.each([
    ['allow aria-* everywhere', /* HTML */ `<div aria-label="test"><span aria-hidden="true"></span></div>`],
    [
      'allow image but remove unsafe properties',
      /* HTML */ `<img src="./img.png" alt="test" width="100" height="100" onload="console.log('this is not safe')" onerror="console.log('this is not safe')" />`,
    ],
    [
      'remove script tags',
      /* HTML */ `<script>
        console.log('test');
      </script>`,
    ],
    ['allow class attribute', /* HTML */ `<div class="test"></div>`],
    ['allow style attribute', /* HTML */ `<span style="color:#ff0099;background-color:#000066;text-align:right;">test</span>`],
    ['allow formatting tags', /* HTML */ `<strong>test</strong><em>test</em><sub>test</sub><sup>test</sup>`],
    [
      'allow unordered lists',
      /* HTML */ `<ul style="text-align:left;">
        <li>test</li>
        <li>test</li>
      </ul> `,
    ],
    [
      'allow ordered lists',
      /* HTML */ `<ol>
        <li>test</li>
        <li>test</li>
      </ol>`,
    ],
    ['allow links', /* HTML */ `<a href="http://localhost" title="test" target="_blank">test</a>`],
    [
      'allow tables',
      /* HTML */ `
        <table>
          <tbody>
            <tr style="height:50%;">
              <td style="width:50%;">1</td>
              <td style="width:50%;">2</td>
            </tr>
            <tr style="height:50%;">
              <td style="width:50%;">3</td>
              <td style="width:50%;">4</td>
            </tr>
          </tbody>
        </table>
      `,
    ],
    [
      'allow titles',
      /* HTML */ `<h1>Test</h1>
        <h2>test</h2>
        <h3>test</h3>`,
    ],
    [
      'allow blockquotes',
      /* HTML */ `
        <blockquote>
          <p>test<br /></p>
        </blockquote>
      `,
    ],
    ['allow mg-icon', /* HTML */ `<mg-icon icon="address-card"></mg-icon>`],
  ])('Should sanitize HTML with the default config: %s', (_description, unsafeHtml) => {
    const sanitizer = new Sanitizer();

    const sanitizedHtml = sanitizer.sanitize(unsafeHtml);

    expect(sanitizedHtml).toMatchSnapshot();
  });

  it('Should sanitize HTML and remove configured disallowed tags', () => {
    const sanitizer = new Sanitizer({ disallowTags: ['img'] });

    const sanitizedHtml = sanitizer.sanitize(/* HTML */ `
      <h1 style="color: red">Sanitize Test</h1>
      <img src="./img.png" />
      <a href="#anchor" target="_blank">a link</a>
      <script>
        console.log('this is not safe');
      </script>
    `);

    expect(sanitizedHtml).toMatchSnapshot('sanitized HTML without images');
  });

  it('Should sanitize HTML and remove configured disallowed attributes', () => {
    const sanitizer = new Sanitizer({
      disallowAttributes: {
        '*': ['style'],
        'a': ['target'],
      },
    });

    const sanitizedHtml = sanitizer.sanitize(/* HTML */ `
      <h1 style="color: red">Sanitize Test</h1>
      <img src="./img.png" />
      <a href="#anchor" target="_blank">a link</a>
      <script>
        console.log('this is not safe');
      </script>
    `);

    expect(sanitizedHtml).toMatchSnapshot('sanitized HTML without style and anchor target attributes');
  });

  it('Should ignore disallow of attributes on tags not allowed in the default config (and remove the tag)', () => {
    const sanitizer = new Sanitizer({ disallowAttributes: { 'not-an-allowed-tag': ['*'] } });

    const sanitizedHtml = sanitizer.sanitize(/* HTML */ `<not-an-allowed-tag class="test"></not-an-allowed-tag>`);

    expect(sanitizedHtml).toBe('');
  });
});
