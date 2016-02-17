angular.module('app.main', [
  'ngl.log',    // <ngl-log>
  'app.header', // <app-header>
  'app.view',   // <app-view>
  'app.footer'  // <app-footer>
 ])

.directive('appMain', function () {
  'use strict';

  var controller = function () {};

  return {
    controller: controller,
    templateUrl: 'main/main.html'
  };
});

