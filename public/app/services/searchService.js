angular.module('searchService', [])


.factory('Search',function ($http) {
    let searchFactory = {};

    searchFactory.searchExperts = function (search,byName,byTag,byAffiliation) {
        return $http.get('/solr/searchExperts/'+search+'/'+byName+'/'+byTag+'/'+byAffiliation+'');
    }

    searchFactory.migrateToSolr = function (dbname) {
        return $http.post('/solr/addExpertsDocuments',{nomBD : dbname});
    }

    searchFactory.findClusters = function () {
        return $http.get('/solr/findClusters');
    }

    return searchFactory;
})