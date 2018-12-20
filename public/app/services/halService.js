angular.module('halService', [])

    .factory('Hal',function ($http) {
        let halFactory = {};

        halFactory.searchHal = function (cle) {
            return $http.get('/pilote/dynamicSearch/'+cle+'/0/100');
        }

        halFactory.collecteData = function (key,start,rows) {
            return $http.get('/pilote/dataCollecteByAffiliation/'+key+'/'+start+'/'+rows+'');
        }

        halFactory.getNumberOfRows = function(key){
            return $http.get('/pilote/getNumberOfRows/'+key+'');
        }

        halFactory.storeData = function (data) {
            console.log(data);
            return $http.post('/pilote/addHalDocuments',data);
        }

        return halFactory;
    })