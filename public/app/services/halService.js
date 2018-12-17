angular.module('halService', [])

    .factory('Hal',function ($http) {
        let halFactory = {};

        halFactory.searchHal = function (cle) {
            return $http.get('/pilote/dynamicSearch/'+cle+'/0/100');
        }

        return halFactory;
    })