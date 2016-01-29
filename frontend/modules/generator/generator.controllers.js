
'use strict';

var generatorModule = angular.module('generatorModule', ['ngResource', 'ui-notification']);

generatorModule.controller('generatorCtrl', ['$rootScope','$scope','$http','$log','$filter', 'Notification', '$modal', 'generatorService', '$timeout', 'Notification',
	function($rootScope,$scope,$http,$log,$filter,Notification,$modal,generatorService,$timeout, notification) {

        $scope.objectToGenerate = {};

        $scope.urlGenerateFile = "";

        /*
        $scope.download = function(){
            //Indicates that download is in progress
            $scope.isDownloading = true;

            //define parameters
            var params = {
                Idies: [] //List of idies of entities of whatever
            };

            return MyResource.download(params).$promise.then((data: any) => {
                //using saveAs.js (part of upcoming HTML5 API, but so far a polyfill)
                var blob = data.response.blob;

                var fileName: string = data.response.fileName || 'document.zip';

                //SaveAs is available at saveAs.js from http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js
                (<any>$window).saveAs(blob, fileName);
            })
        .finally(() => {
                $scope.isDownloading = false;
        });
        }
*/
        $scope.objectToGenerate.isAudited = true;

        $scope.objectToGenerate.attributes = [];

        $scope.addAttribute = function(){
            var object = {};
            object.isList = false;
            $scope.objectToGenerate.attributes.push(object);
            notification.warning('Object Added');
        }

        $scope.rmAttribute= function(attribute){

            var index = $scope.objectToGenerate.attributes.indexOf(attribute);
            $scope.objectToGenerate.attributes.splice(index, 1);
            notification.warning('Object Removed');

        }

        $scope.generate = function(){
            //$scope.objectToGenerate
            generatorService.generateCode($scope.objectToGenerate);
        }

        $scope.openAnnotationModal = function (selectedAttribute) {
            var modalInstance = $modal.open({
                templateUrl: 'generatorEditAnnotation.html',
                controller: 'attributeEditInstanceCtrl',
                backdrop: 'static',
                resolve: {
                    selectedAttribute: function () {
                        return selectedAttribute;
                    }
                }
            });
            modalInstance.result.then(function (selectedAttribute) {
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }

        //Petite GRUGE
        $scope.objectToGenerate = {"isAudited":true,"attributes":[{"isList":false,"name":"id","type":"Integer","annotations":[{"parameters":[],"hasParam":false,"name":"@Id"},{"parameters":[{"name":"param1","value":"value1"},{"name":"param2","value":"value2"}],"hasParam":true,"name":"@Toto"},{"parameters":[{"name":"Param1","value":"value1"}],"hasParam":true,"name":"@Titi"}]}],"name":"ObjectName","packageName":"ObjectPackage","angularModuleName":"angularModule"};


}]);



angular.module('generatorModule').controller('attributeEditInstanceCtrl', function ($scope, $modalInstance, $log, selectedAttribute, Notification) {
    $scope.selectedAttribute = selectedAttribute;
    $scope.backup = angular.copy($scope.selectedAttribute);

    if ($scope.selectedAttribute.annotations === undefined){
        $scope.selectedAttribute.annotations = [];
    }



    /*$scope.selectedCustomer= selectedCustomer;
    $scope.customersList = customersList;
*/


    /*if (selectedDriver.trainingValidationDate != null)
    {
        $scope.selectedDriver.trainingValidationDateJs = new Date(selectedDriver.trainingValidationDate).format("jj/mm/aaaa");
    }
    else{
        $scope.selectedDriver.trainingValidationDateJs = '';
    }*/

    $scope.addAnnotation = function(){
        var object = {};
        object.parameters = [];
        object.hasParam = false;
        $scope.selectedAttribute.annotations.push(object);
        Notification.warning('Annotation Added');
    }

    $scope.rmAnnotation= function(annotation){

        var index = $scope.selectedAttribute.annotations.indexOf(annotation);
        $scope.selectedAttribute.annotations.splice(index, 1);
        Notification.warning('Annotation Removed');

    }

    $scope.addAnnotationParam = function(annotation){
        annotation.hasParam = true;
        var object = {};
        annotation.parameters.push(object);
        Notification.warning('Object Added');
    }

    $scope.rmAnnotationParam= function(annotation, annotationParam){

        var index = annotation.parameters.indexOf(annotationParam);
        annotation.parameters.splice(index, 1);
        Notification.warning('Object Removed');

    }



    $scope.save = function (selectedAttribute) {
        $scope.selectedAttribute = selectedAttribute;
        /*$scope.selectedDriver.trainingValidationDate = selectedDriver.trainingValidationDateJs.formatToDateJSon()
        driverService.updateDriver($scope.selectedDriver, Notification);*/
        $modalInstance.close($scope.selectedAttribute);
    };

    $scope.cancel = function () {
        angular.copy($scope.backup, $scope.selectedAttribute);
        $modalInstance.dismiss('cancel');
    };
});
