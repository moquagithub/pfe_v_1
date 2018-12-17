angular.module('searchCtrl', ['searchService'])

    .controller('SearchController', function (Search,$window,$scope) {
        let vm = this;
        vm.expertsResult = '';
        vm.searchTitle = '';
        vm.byName = false;
        vm.byTag = true;
        vm.byAffiliation = false;
        vm.clusters = {};

        /*listner after all content is loaded in AngularJS page*/
        $scope.$on('$viewContentLoaded', function () {
            let foamtree = new CarrotSearchFoamTree({
                id: 'visualization',
                dataObject: {
                    groups: [
                        {label: "Your", weight: 1.0},
                        {label: "Hamid", weight: 7.0},
                        {label: "First", weight: 3.0},
                        {label: "FoamTree", weight: 2.0},
                        {label: "Visualization", weight: 4.0}
                    ]
                },
                onGroupSelectionChanged: function (info) {
                    $window.console.log("selected", info);
                }
            });
        })

        vm.doSearch = function () {
             Search.searchExperts(vm.searchTitle,vm.byName,vm.byTag,vm.byAffiliation).success(function (res) {
                 vm.expertsResult = res;
             });
        }

        vm.findClusters = function () {
            Search.findClusters().success(function (res) {
                vm.clusters = res.clusters;
            })
        }


    });