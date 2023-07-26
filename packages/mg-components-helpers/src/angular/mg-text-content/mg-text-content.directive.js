/**
 * @name mg-components-helpers.mg-text-content-angular.directive:mg-text-content
 * @requires $compile
 * @requires $translate
 * @description
 * Render given parent props binding through attribute.
 * @param {string=} mgTextContent binding props which could be either string or interpolated string.
 * @example
   <example module="ngView">
    <file name="index.html">
      <div ng-controller="Controller">
 
        <pre mg-text-content="Batman is coming"></pre>
        <pre mg-text-content="{{$ctrl.value}}"></pre>
 
      </div>
    </file>
    <file name="script.js">
      angular.module('ngView').controller('Controller', function ($scope) {
        $scope.value = 'Batman is coming';
      });
    </file>
   </example>
 */
// eslint-disable-next-line no-undef
angular.module('mg-components-helpers.mg-text-content-angular', []).directive(
  'mgTextContent',
  /* @ngInject */ () => {
    return {
      restrict: 'A',
      scope: {
        mgTextContent: '@',
      },
      link($scope, $element) {
        $scope.$watch('mgTextContent', (newValue) => {
          const targetElement = $element[0].nextSibling;
          targetElement.textContent = newValue;
        });
      },
    };
  }
);
