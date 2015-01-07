adsApp.controller('registerController', function ($scope, $location, userDataService, adsDataService) {
    if (userDataService.isUserLoggedIn()) {
        $location.url('/view/ads');
        notyTopCenter('alert', 'You are already logged in, please logout first', 2);
    }

    $scope.towns = adsDataService.getAllTowns();
    $scope.register = register;

    function register(username, password, confirmPassword, name, email, phone, townId) {
        userDataService.register(username, password, confirmPassword, name, email, phone, townId).then(function (data) {
            notyTopCenter('success', 'You successfully registered and are now logged in', 2);
            $location.url('/view/ads');
        }, function (err) {
            //for (prop in err.data.modelState) {
            //    var registrationProblems = prop;
            //    return;
            //}
            //console.log(registrationProblems);
            //console.log(err.data.modelState);
            notyInCustomContainer('#register-form-noty-area', 'topCenter', 'error', "There was a problem registering you", 2) //TODO: Give a more detailed error
        })
    }
});