angular.module('appRoutes',['ngRoute'])

    .config(function($routeProvider,$locationProvider){
        $routeProvider
            .when('/',{
                templateUrl: 'app/views/pages/home.html',

            })

            .when('/search',{
                templateUrl: 'app/views/pages/search.html',
                reloadOnSearch : false
/*
                controller:"SearchController as search"
*/
            })

            .when('/papers/:domaine/:searchFromProfile',{
                templateUrl: 'app/views/pages/searchPapers.html',

                /*
                                controller:"SearchPapersController as papers"
                */
            })
            .when('/papers',{
                templateUrl: 'app/views/pages/searchPapers.html',

                /*
                                controller:"SearchPapersController as papers"
                */
            })

            .when('/data',{
                templateUrl: 'app/views/pages/data.html'
            })




            .otherwise({redirectTo : '/'});

        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('');
    })