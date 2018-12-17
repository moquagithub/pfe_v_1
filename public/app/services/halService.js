angular.module('halService', [])

    .factory('hal',function ($http) {
        let halFactory = {};

        halFactory.search = function (cle,filters) {

            return $http.get('/hal/dynamicSearch/'+cle+'/'+filters+'/0/100');
        }

        return halFactory;
    })