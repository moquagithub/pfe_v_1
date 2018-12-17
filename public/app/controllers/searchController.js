angular.module('searchCtrl', ['searchService'])

    .controller('SearchController', function (Search) {
        let vm = this;
        vm.expertsResult = '';
        vm.searchTitle = '';
        vm.byName = false;
        vm.byTag = true;
        vm.byAffiliation = false;
        vm.clusters = {};

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