adsApp.controller('ViewUsersController', function ($scope, $location, userDataService) {
    if (!userDataService.isUserAdmin()) {
        $location.url('/view/ads');
        notyTopCenter('alert', 'Access denied for this page', 2);
        return;
    }

    $scope.users = userDataService.getAllUsers(userDataService.getCurrentUser());
});