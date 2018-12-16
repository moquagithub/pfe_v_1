angular.module('searchService', [])


.factory('Search',function ($http) {
    let searchFactory = {};

    searchFactory.searchExperts = function (search,byName,byTag,byAffiliation) {
        return $http.get('/solr/searchExperts/'+search+'/'+byName+'/'+byTag+'/'+byAffiliation+'');
    }

    searchFactory.data = function (search) {
        return $http.get('');
    }

    return searchFactory;
})