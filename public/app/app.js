angular.module('MyApp', ['appRoutes', 'mainCtrl', 'authService', 'searchCtrl','searchPapersCtrl', 'searchService','searchPapersService','dataminingService','dataminigCtrl','halService','halCtrl', 'ui.bootstrap','blockUI'])

    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('AuthInterceptor');
    })

    .config(function (blockUIConfig) {
        // Change the default overlay message
        blockUIConfig.message = 'Chargement en cours';


        // Change the default delay to 100ms before the blocking is visible
        // blockUIConfig.delay = 100;
    })



