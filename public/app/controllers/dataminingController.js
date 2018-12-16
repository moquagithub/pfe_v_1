angular.module('dataminigCtrl', ['dataminingService'])

    .controller('DataminigController', function (data,modal) {
        let vm = this;
        vm.ok=false;
        vm.csv = "N";
        vm.mongo="N";
    vm.collecte = function () {

        if(vm.data.csv == true )  vm.csv="Y";
        if(vm.data.mongo == true )  vm.mongo="Y";

        modal.openModal(vm.data.key,vm.csv,vm.mongo,"generalINFO");


    }

    });