angular.module('searchCtrl', ['searchService'])

    .controller('SearchController', function (Search) {
        let vm = this;
        vm.expertsResult = '';
        vm.searchTitle = '';

        vm.doSearch = function () {
             Search.searchExperts(vm.searchTitle).success(function (res) {
                 vm.expertsResult = res;
             });
        }


    });