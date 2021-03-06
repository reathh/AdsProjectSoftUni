var adsApp = angular
    .module('adsApp', ['ngResource', 'ngRoute'])
    .config(function($routeProvider) {
        $routeProvider
            //User
            .when('/view/ads', {
                templateUrl: 'templates/user/view-all-ads.html'
            })
            .when('/login', {
                templateUrl: 'templates/general/login.html'
            })
            .when('/register', {
                templateUrl: 'templates/general/register.html'
            })
            .when('/add/ad', {
                templateUrl: 'templates/user/add-new-ad.html'
            })
            .when('/view/user/ads', {
                templateUrl: 'templates/user/view-user-ads.html'
            })
            .when('/edit/ad/:id', {
                templateUrl: 'templates/user/edit-ad.html'
            })
            .when('/edit/profile', {
                templateUrl: 'templates/user/edit-profile.html'
            })
            //Admin
            .when('/admin/view/ads', {
                templateUrl: 'templates/admin/view-ads.html'
            })
            .when('/admin/edit/ad/:id', {
                templateUrl: 'templates/admin/edit-ad.html'
            })
            .when('/admin/view/users', {
                templateUrl: 'templates/admin/view-users.html'
            })
            .when('/admin/edit/user', {
                templateUrl: 'templates/admin/edit-user.html'
            })
            .when('/admin/view/categories', {
                templateUrl: 'templates/admin/view-categories.html'
            })
            .when('/admin/view/towns', {
                templateUrl: 'templates/admin/view-towns.html'
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

function notyConfirm(text, successFunction, cancelFunction) {
    var n = noty({
        text: text,
        type: 'confirm',
        dismissQueue: false,
        layout: 'center',
        theme: 'defaultTheme',
        buttons: [
            {addClass: 'btn btn-primary', text: 'Ok', onClick: function($noty) {
                if (successFunction) {
                    successFunction();
                }
                $noty.close();
            }
            },
            {addClass: 'btn btn-danger', text: 'Cancel', onClick: function($noty) {
                if (cancelFunction) {
                    cancelFunction()
                }
                $noty.close();
            }
            }
        ]


    })

}