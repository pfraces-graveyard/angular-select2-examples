angular.module('app.request', [])

.factory('appRequest', function ($injector) {
  'use strict';

  var $http = $injector.get('$http');

  var request = {
    fields: function () {
      return $http.get('api/fields');
    }
  };

  return request;
});
