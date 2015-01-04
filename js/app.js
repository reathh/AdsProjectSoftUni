'use strict';

var adsApp = angular
    .module('adsApp', ['ngResource', 'ngRoute'])
    .config(function($routeProvider) {
        $routeProvider
            .when('/view/ads', {
                templateUrl: 'templates/view-ads.html'
            })
            .otherwise({redirectTo: '/view/ads'});
    });