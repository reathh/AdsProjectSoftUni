adsApp.controller('loginController', function ($scope, userDataService) {
    $scope.login = login;
    function login(username,password) {
        userDataService.login(username, password).then(function (data) {
            notyTopCenter('success', 'You successfully logged in!', 3);
        }, function (err) {
            notyInCustomContainer('#login-form-noty-area', 'topCenter', 'error', err.data.error_description, 2)
        });
    }
});