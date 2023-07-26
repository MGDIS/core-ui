const jQuery = require('jquery');

Object.defineProperty(window, 'jQuery', { value: jQuery });
Object.defineProperty(window, '$', { value: jQuery });

const angular = require('angular');

Object.defineProperty(window, 'angular', { value: angular });

require('angular-mocks');

angular.module('mg-components-helpers.mg-text-content-angular', []);
require('./index');

describe('mg-text-content', () => {
  let compile;
  let scope;

  beforeEach(() => {
    angular.mock.module('mg-components-helpers.mg-text-content-angular');
  });

  beforeEach(() => {
    // eslint-disable-next-line no-undef
    inject(($compile, $rootScope) => {
      compile = $compile;
      scope = $rootScope.$new();
    });
  });

  /**
   * get angular element from template
   *
   * @param {string} template to mount
   * @returns {HTMLElement} mounted view
   */
  const mountElement = (template) => {
    const element = angular.element(template);
    const batmanKey = 'Batman begins';
    const movieKey = 'Great movie dude !';

    scope.batman = batmanKey;
    scope.getBatman = () => batmanKey;
    scope.movie = movieKey;
    scope.getMovie = () => movieKey;

    const compiledElement = compile(element)(scope);
    scope.$digest();
    return compiledElement;
  };

  it.each([
    `<mg-button>
    <span
      class="translate-test"
      id="the-text"
      mg-text-content="{{batman}}"
    ></span>
    <span
      class="translate-test"
      id="the-text-2"
      mg-text-content="{{movie}}"
    ></span>
    <mg-button>`,
    `<mg-button>
    <span
      class="translate-test"
      id="the-text"
      mg-text-content="{{getBatman()}}"
    ></span>
    <span
      class="translate-test"
      id="the-text-2"
      mg-text-content="{{getMovie()}}"
    ></span>
    <mg-button>`,
  ])('should have interpolated content added in mg-component element', (template) => {
    // compile once
    const element = mountElement(template);
    expect(element[0]).toMatchSnapshot();
  });
});
