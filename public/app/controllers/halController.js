angular.module('halCtrl', ['halService'])

    .controller('halController', function (Hal,$window) {
        let vm = this;

        vm.titre = false;

        vm.autheurs = false;
        vm.ins = false;


        vm.collecte = function(){
            Hal.getNumberOfRows(vm.keyCollecte).success(function (res) {
                let bigger = false;
                let step = 50;
                if(step >= res){
                    step = res;
                    bigger = true;
                }
                console.log("nombre :"+res);
                for(let i = step ; i<=res;i = i+step){

                    let j = i-step;
                    // console.log("start : "+j);
                    // console.log("rows : "+i);
                    Hal.collecteData(vm.keyCollecte,j,i).success(function (data) {
                        // console.log(data);
                        Hal.storeData(data).success(function (response) {
                            console.log(response.message);
                        })
                    });

                    if(i+step>res && !bigger){
                        let k = i;
                        i = res;
                        // console.log("start : "+k);
                        // console.log("rows : "+i);
                        Hal.collecteData(vm.keyCollecte,k,i).success(function (data) {
                            // console.log(data);
                            Hal.storeData(data).success(function (response) {
                                console.log(response.message);
                            })
                        });
                    }
                }
            })

        }



        vm.search = function () {
            let query = '';
           //definir les noms des attribus
            if(vm.titre){
                query = "title_t:"+vm.key;
            }
            else vm.titreS="";

            if(vm.autheurs) {
                query = "auth_t:"+vm.keyAuthor;
            }
            else vm.autheursS="";

            if(vm.ins) {
                query = "instStructName_t:"+vm.keyInstitution;
            }
            else vm.insS="";

            if(vm.titre && vm.autheurs){
                query = "title_t:"+vm.key+" auth_t:"+vm.keyAuthor;
            }
            if(vm.titre && vm.ins){
                query ="title_t:"+vm.key+" instStructName_t:"+vm.keyInstitution;
            }
            if(vm.autheurs && vm.ins){
                query ="auth_t:"+vm.keyAuthor+" instStructName_t:"+vm.keyInstitution;
            }
            if(vm.titre && vm.ins && vm.autheurs){
                query ="auth_t:"+vm.keyAuthor+" instStructName_t:"+vm.keyInstitution+" title_t:"+vm.key;
            }


            if(!vm.key&&!vm.keyAuthor&&!vm.keyInstitution){
                $window.alert('veuillez spécifier un champ pour la recherche');
                return;
            }


            // appeler le service wew
             Hal.searchHal(query).success(function (res) {
                 vm.halResults = res;
            });
            // console.log(vm.halResults);
        }





    });
