angular.module('dataminingService', [])


    .factory('data',function ($http) {
        let dataFactory = {};

        dataFactory.collectData = function () {
            return $http.post('/datamining/data');
        }




        return dataFactory;
    })

    .factory('modal', function($window) {
        return {
            openModal: function(key,csv,mongo,webservice) {
               // window.location.href="http://127.0.0.1:5000/"+webservice+"/"+key+"/"+csv+"/"+mongo;
                $window.alert('ok');
               // window.open("http://127.0.0.1:5000/"+webservice+"/"+key+"/"+csv+"/"+mongo,"nom_de_la_fenetre","menubar=no, status=no, width=100px");
            }
        };
    });