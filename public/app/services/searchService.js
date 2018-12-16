angular.module('searchService', [])


.factory('Search',function ($http) {
    let searchFactory = {};

    searchFactory.searchExperts = function (search) {
        return $http.get('/solr/searchExperts/'+search+'');
    }

    searchFactory.data = function (search) {
        return $http.get('');
    }

    return searchFactory;
})