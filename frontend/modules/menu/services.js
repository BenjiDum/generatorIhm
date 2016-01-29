'use strict';

/* Services */

var menuServices = angular.module('menuServices', ['ngResource']);

menuServices.factory('menuService', ['$resource',
  function($resource){
    return $resource('appModules.json', {}, {
      query: {
      	//method:'GET',
        isArray:false
      }
    });
  }]);
