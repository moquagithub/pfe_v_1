angular.module('authService', [])


    .factory('Auth', function ($http, $q, AuthToken) {

        let authFactory = {};


        return authFactory;
    })


    .factory('AuthToken', function ($window, $routeParams) {
        let authTokenFactory = {};


        return authTokenFactory;
    })

    .factory('AuthInterceptor', function ($q, $location, $window, AuthToken) {
        let interceptorFactory = {};



        return interceptorFactory;

    });