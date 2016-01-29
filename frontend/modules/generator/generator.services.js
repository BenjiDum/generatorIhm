
'use strict';

/* Services dashboardLine*/

var generatorModule = angular.module('generatorModule');

generatorModule.factory('generatorService', ['$resource','CServerUrl', '$http', '$q', '$log', function($resource,CServerUrl,$http,$q, $log){
	var apiTypes = 'generatorApi';
	return {
        generateCode : function(objectToGenerate){
           /* var deferred = $q.defer();
            $http.post(CServerUrl + apiTypes + '/generateInZip', objectToGenerate, {responseType:'arraybuffer'})
                .success(function (response) {
                    var file = new Blob([response], {type: 'application/pdf'});
                    var fileURL = URL.createObjectURL(file);
                })
                .error(function (response) {
                    console.log('it sucks');
                });


                .then(function(response){
                    deferred.resolve(response.data);
                    return response.data;
                },function(response){
                    deferred.reject(response);
                });
            return deferred.promise;*/
            $http.post(CServerUrl + apiTypes + '/generateInZip', objectToGenerate, {responseType:'arraybuffer'})
                .success(function (response) {
                    var file = new Blob([response], {type: 'application/pdf'});
                    var fileURL = URL.createObjectURL(file);
                });

        }
	}
}]);
