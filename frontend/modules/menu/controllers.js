'use strict';

var menuControllers = angular.module('menuControllers', []);

menuControllers.controller('menuCtrl', ['$scope','$filter','$state', 'menuService',
	function($scope,$filter,$state,menuService) {

		$scope.query = {};
		$scope.alerts = [];
		$scope.menuList = [];

		menuService.query({},{}, 
			function (data) {
				$scope.menuList = data.menuList;
			},
			function (error) {
				$scope.alerts.push({msg:"Undefined error from server (Error " + response.status + ")"});
			});

		}]);