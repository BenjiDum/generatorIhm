'use strict';

/* App Module */
/* Comment test casAuthInit */
/* Comment test master */
/* Comment test casAuthInit 2 */

var app = angular.module('generatorFrontApp', [
  /* MENU */
  'menuControllers',
  'menuServices',
  'generatorModule',

  /* DEPENDENCIES */
  'ui.bootstrap',
  'ui.router',
  'ngTable',
  'angularFileUpload',
  'highcharts-ng',
  'xeditable',
  'ui.tree',
  'ngTagsInput'
  ]);



app.config(['$stateProvider','$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    $stateProvider

    //HOME
    .state('home', {
      url : '/home',
      templateUrl: 'modules/generator/generator.main.html',
      controller: 'generatorCtrl'
    })

    $urlRouterProvider.otherwise('/home');
  }])

.run(function($rootScope, $state, editableOptions) {
      $rootScope.$state = $state;
      editableOptions.theme = 'bs3';
    });


app.directive('ngConfirmClick', [
    function(){
        return {
            priority: 1,
            terminal: true,
            link: function (scope, element, attr) {
                var msg = attr.ngConfirmClick || "Are you sure?";
                var clickAction = attr.ngClick;
                element.bind('click',function (event) {
                    if ( window.confirm(msg) ) {
                        scope.$eval(clickAction)
                    }
                });
            }
        };
}])
