angular.module('halCtrl', ['halService'])

    .controller('halController', function (hal,$window) {
        let vm = this;

        vm.titre = false;

        vm.autheurs = false;
        vm.ins = false;


        vm.search = function () {
           //definir les noms des attribus
            if(vm.titre) vm.titreS = "titre";
            else vm.titreS="";

            if(vm.autheurs) vm.autheursS="au";
            else vm.autheursS="";

            if(vm.ins) vm.insS = "institution";
            else vm.insS="";

            // appeler le service wew



        }





    });
