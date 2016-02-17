angular.module('view.demo', [
  'ngl.log',
  'rt.select2'
])

.directive('viewDemo', function ($injector) {
  'use strict';

  var $timeout = $injector.get('$timeout');
  var nglLog = $injector.get('nglLog');

  var controller = function ($scope) {
    $scope.sync = {};

    $scope.sync.items = [
      {
        id: 'F',
        name: 'Foo'
      },
      {
        id: 'B',
        name: 'Bar'
      }
    ];

    $scope.async = {};

    $scope.async.queryOptions = {
      query: function (query) {
        $timeout(function () {
          query.callback({
            results: [
              { id: 'F', text: 'Foo' },
              { id: 'B', text: 'Bar' }
            ]
          });
        }, 2000);
      }
    };

    $scope.syncAsync = {};

    $timeout(function () {
      $scope.syncAsync.items = [
        {
          id: 'F',
          name: 'Foo'
        },
        {
          id: 'B',
          name: 'Bar'
        }
      ];
    }, 2000);

    $scope.syncDisabled = {};

    $timeout(function () {
      $scope.syncDisabled.items = [
        {
          id: 'F',
          name: 'Foo'
        },
        {
          id: 'B',
          name: 'Bar',
          disabled: true
        },
        {
          id: 'Q',
          name: 'Qux'
        }
      ];
    });

    $scope.asyncDisabled = {};

    $scope.asyncDisabled.queryOptions = {
      query: function (query) {
        $timeout(function () {
          query.callback({
            results: [
              { id: 'F', text: 'Foo' },
              { id: 'B', text: 'Bar', disabled: true },
              { id: 'Q', text: 'Qux' }
            ]
          });
        });
      }
    };

    $scope.dynamicDisable = {};

    $scope.dynamicDisable.queryOptions = {
      query: function (query) {
        $timeout(function () {
          $scope.dynamicDisable.data = {
            results: [
              { id: 'F', text: 'Foo' },
              { id: 'B', text: 'Bar', disabled: true },
              { id: 'Q', text: 'Qux' }
            ]
          };

          query.callback($scope.dynamicDisable.data);
        });
      }
    };

    $scope.$watch('dynamicDisable.selection', function (value) {
      if (!value) { return; }
      nglLog(value);
    });
  };

  return {
    scope: true,
    controller: controller,
    templateUrl: 'demo/demo.html'
  };
});
