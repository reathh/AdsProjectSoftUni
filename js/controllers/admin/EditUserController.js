adsApp.controller('EditUserController', function ($scope, $location, $routeParams, userDataService) {
    if (!userDataService.isUserAdmin()) {
        $location.url('/view/ads');
        notyTopCenter('alert', 'Access denied for this page', 2);
        return;
    }

    $scope.nullData = null;
    $scope.user = userDataService.getUserAsAdmin($routeParams.username, userDataService.getCurrentUser());
});