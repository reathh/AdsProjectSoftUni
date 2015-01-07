var adsApp = angular
    .module('adsApp', ['ngResource', 'ngRoute'])
    .config(function($routeProvider) {
        $routeProvider
            .when('/view/ads', {
                templateUrl: 'templates/user/view-all-ads.html'
            })
            .when('/login', {
                templateUrl: 'templates/general/login.html'
            })
            .when('/register', {
                templateUrl: 'templates/general/register.html'
            })
            .otherwise({redirectTo: '/view/ads'});
    });

function notyInCustomContainer(container, position, type, text, timeInSeconds) {

    // Position:
    // ('top');
    // ('topCenter');
    // ('topLeft');
    // ('topRight');
    // ('center');
    // ('centerLeft');
    // ('centerRight');
    // ('bottom');
    // ('bottomCenter');
    // ('bottomLeft');
    // ('bottomRight');

    // Type:
    // ('alert');
    // ('information');
    // ('error');
    // ('warning');
    // ('notification');
    // ('success');

    var n = jQuery(container).noty({
        text: text,
        type: type,
        dismissQueue: true,
        layout: position,
        theme: 'defaultTheme',
        timeout: timeInSeconds * 1000
    });
}

function notyTopCenter(type, text, timeInSeconds) {
    var n = noty({
        text        : text,
        type        : type,
        dismissQueue: true,
        layout      : 'topCenter',
        theme       : 'defaultTheme',
        timeout: timeInSeconds * 1000
    });
}