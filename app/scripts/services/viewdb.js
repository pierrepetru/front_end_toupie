'use strict';

/**
 * @ngdoc service
 * @name testApp.viewDB
 * @description
 * # viewDB
 * Service in the testApp.
 */
angular.module('testApp')
  .service('viewDB', function ($resource) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    return $resource("http://127.0.0.1:8080/toupie/viewAllDataBase");
  });
