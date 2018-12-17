angular.module('dataminigCtrl', ['dataminingService'])

    .controller('DataminigController', function ($scope,data,modal,$window,Search) {
        let vm = this;
        vm.ok=false;
        vm.csv = "N";
        vm.mongo="N";

        $scope.title = "AngularJS - Bootstrap Combobox";

        data.getAllDb().success(function (res) {
            let tabDB = [];
            res.forEach(function (db) {
                tabDB.push({dbname : db.dbname});
            })
            vm.items =  tabDB;
        });
       // $scope.selected;


       $scope.selected;


       vm.getAllDb = function(){

         data.getAllDb().success(function (res) {
             let tabDB = [];
             res.forEach(function (db) {
                 tabDB.push({dbname : db.dbname});
             })
             vm.items =  tabDB;
         });

       }


       vm.collecte = function () {

        if(vm.data.csv == true )  vm.csv="Y";
        if(vm.data.mongo == true )  vm.mongo="Y";

       }

       vm.startMigration = function () {
           $window.alert(vm.dbname);
           Search.migrateToSolr(vm.dbname);
       }

    });