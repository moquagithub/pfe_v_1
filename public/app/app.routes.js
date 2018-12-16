angular.module('appRoutes',['ngRoute'])

    .config(function($routeProvider,$locationProvider){
        $routeProvider
            .when('/',{
                templateUrl: 'app/views/pages/home.html'
            })

            .when('/search',{
                templateUrl: 'app/views/pages/search.html'
            })

            .when('/data',{
                templateUrl: 'app/views/pages/data.html'
            })


            .otherwise({redirectTo : '/'});

        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('');
    })