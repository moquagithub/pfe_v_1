angular.module('searchCtrl', ['searchService'])

    .controller('SearchController', function (Search, $window, $scope, $route) {
        let vm = this;
        vm.searchTitle = '';
        vm.byName = false;
        vm.byTag = true;
        vm.byAffiliation = false;
        vm.clusters = {};
        vm.documentsAfterCluster = '';

        /*Initialize the foamtree*/
        let foamtree = new CarrotSearchFoamTree({
            id: 'visualization',
            onGroupSelectionChanged: function (info) {
                // $window.console.log(info.groups[0].label);
                // $window.console.log(vm.clusters);
                angular.forEach(vm.clusters,function (cluster) {
                    if(info.groups[0].label === cluster.labels[0]){
                        // $window.console.log(cluster);
                        let clusterDocsIDs = cluster.docs;
                        // $window.console.log(clusterDocsIDs);
                        let newDocs = [];
                        angular.forEach(vm.documents,function (doc) {
                            angular.forEach(clusterDocsIDs,function (id) {
                                if(id === doc.id){
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

            },
        });

        vm.setExpertsResult = function (data) {
            vm.documents = data.docs;
        }
        vm.setExpertsCluster = function (data) {
            vm.documentsAfterCluster = data;
        }

        /*listner after all content is loaded in AngularJS page*/
        $scope.$on('$viewContentLoaded', function () {

        })


        /* vm.doSearch = function () {
              Search.searchExperts(vm.searchTitle,vm.byName,vm.byTag,vm.byAffiliation).success(function (res) {
                  vm.expertsResult = res;
                  // console.log(res);

              });
         }*/


        vm.findClusters = function () {
            // $route.reload();
            Search.findClusters(vm.searchTitle).success(function (res) {
                vm.setExpertsResult(res.response);
                vm.clusters = res.clusters;
                vm.clustersTab = [];
                angular.forEach(res.clusters, function (element) {
                    // console.log(element.labels[0]);
                    vm.clustersTab.push({
                        label: element.labels[0],
                        weight: ((element.score / 10) + (element.score % 10))
                    });
                })

                foamtree.set('dataObject', {
                    groups: vm.clustersTab
                })
            })
        }
    });