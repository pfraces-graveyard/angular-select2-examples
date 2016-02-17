angular.module('app.header', [])

.directive('appHeader', function () {
  'use strict';

  var controller = function ($scope) {
    $scope.title = 'angular-select2 examples';
  };

  return {
    scope: true,
    controller: controller,
    templateUrl: 'header/header.html'
  };
});
