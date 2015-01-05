var adsApp = angular
    .module('adsApp', ['ngResource', 'ngRoute'])
    .config(function($routeProvider) {
        $routeProvider
            .when('/view/ads', {
                templateUrl: 'templates/user/view-all-ads.html'
            })
            .otherwise({redirectTo: '/view/ads'});
    });