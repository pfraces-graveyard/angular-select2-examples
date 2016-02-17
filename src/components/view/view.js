angular.module('app.view', [
  'view.demo' // <view-demo>
])

.directive('appView', function () {
  'use strict';

  var controller = function () {};

  return {
    scope: true,
    controller: controller,
    templateUrl: 'view/view.html'
  };
});
