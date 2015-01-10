adsApp.controller('loginController', function ($scope, userDataService, $location) {
    if (userDataService.isUserLoggedIn()) {
        $location.url('/view/ads');
        notyTopCenter('alert', 'You are already logged in, please logout first', 2);
        return;
    }

    $scope.login = login;
    function login(username,password) {
        userDataService.login(username, password).then(function (data) {
            notyTopCenter('success', 'You successfully logged in!', 3);

            $location.url('/view/ads');
        }, function (err) {
            notyInCustomContainer('#login-form-noty-area', 'topCenter', 'error', err.data.error_description, 2)
        });
    }
});