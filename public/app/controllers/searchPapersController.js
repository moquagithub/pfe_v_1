angular.module('searchPapersCtrl', ['searchPapersService',])
    .controller('SearchPapersController', function ($routeParams, $rootScope, $scope, SearchPapers, $window, $location, $route) {
        let vm = this;
        vm.searchTitle = '';
        vm.byName = false;
        vm.byTag = true;
        vm.byAffiliation = false;
        vm.clusters = {};
        vm.documentsAfterCluster = '';
        // vm.primaryResults = [];
        vm.searchTitleByDomaine = $routeParams.domaine;
        vm.searchFromProfile = $routeParams.searchFromProfile;
        console.log(vm.searchTitleByDomaine);
        console.log(vm.searchFromProfile);


        if(vm.searchFromProfile === 'true'){
            SearchPapers.findPapersClusters(vm.searchTitleByDomaine, '*', '*').success(function (res) {

                // console.log(res);
                vm.documentsAfterCluster = res.response.docs;
                vm.documents = res.response.docs;
                vm.clusters = res.clusters;
                vm.clustersTab = [];
                angular.forEach(res.clusters, function (element) {
                    // console.log(element.labels[0]);
                    vm.clustersTab.push({
                        label: element.labels[0],
                        weight: ((element.score / 10) + (element.score % 10))
                    });
                })

                $scope.foamtree2.set('dataObject', {
                    groups: vm.clustersTab
                })
            })
            console.log('bla'+vm.documents);
        }



        /*Initialize the foamtree*/
        if (document.getElementById('visualization2') !== null) {
            // console.log(document.getElementById('visualization2'));

            $rootScope.foamtree2 = new CarrotSearchFoamTree({
                id: 'visualization2',
                onGroupSelectionChanged: function (info) {
                    // $window.console.log(info.groups[0].label);
                    // $window.console.log(vm.clusters);
                    angular.forEach(vm.clusters, function (cluster) {
                        if (info.groups[0].label === cluster.labels[0]) {
                            // $window.console.log(cluster);
                            let clusterDocsIDs = cluster.docs;
                            $window.console.log(clusterDocsIDs);
                            let newDocs = [];
                            angular.forEach(vm.documents, function (doc) {
                                angular.forEach(clusterDocsIDs, function (id) {
                                    if (id === doc.id) {
                                        // $window.console.log(doc);
                                        newDocs.push(doc);
                                    }
                                })
                            })
                            $scope.$apply(function () {
                                vm.setExpertsCluster(newDocs);
                            })
                        }
                    })

                }
            });
        }




        vm.setExpertsResult = function (data) {
            vm.documents = data.docs;
        }
        vm.setExpertsCluster = function (data) {
            vm.documentsAfterCluster = data;
        }


        /* vm.doSearch = function () {
              Search.searchExperts(vm.searchTitle,vm.byName,vm.byTag,vm.byAffiliation).success(function (res) {
                  vm.expertsResult = res;
                  // console.log(res);

              });
         }*/


        vm.findClusters = function () {
            // $route.reload();

                let key1;
            let key2;
            let key3;
            if (vm.searchTitleByDomaine + "" === "undefined" || vm.searchTitleByDomaine === "")
                key1 = "*";
            else
                key1 = vm.searchTitleByDomaine;

            if (vm.searchTitleByName + "" === "undefined" || vm.searchTitleByName === "")
                key2 = "*";
            else
                key2 = vm.searchTitleByName;

            if (vm.searchTitleByAffiliation + "" === "undefined" || vm.searchTitleByAffiliation === "")
                key3 = "*";
            else
                key3 = vm.searchTitleByAffiliation;

            SearchPapers.findPapersClusters(key1, key2, key3).success(function (res) {

                    // console.log(res);
                    vm.documentsAfterCluster = res.response.docs;
                    vm.documents = res.response.docs;
                    vm.clusters = res.clusters;
                    vm.clustersTab = [];
                    angular.forEach(res.clusters, function (element) {
                        // console.log(element.labels[0]);
                        vm.clustersTab.push({
                            label: element.labels[0],
                            weight: ((element.score / 10) + (element.score % 10))
                        });
                    })

                    $scope.foamtree2.set('dataObject', {
                        groups: vm.clustersTab
                    })
                })

        }

    });