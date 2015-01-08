adsApp.controller('EditAdController', function ($scope, $routeParams, adsDataService, userDataService) {
    if (!userDataService.isUserLoggedIn()) {
        $location.url('/login');
        notyTopCenter('alert', 'Please login first to view this page', 2);
    }

    $scope.ad = adsDataService.getAd($routeParams.id, userDataService.getCurrentUser());
    $scope.categories = adsDataService.getAllCategories();
    $scope.towns = adsDataService.getAllTowns();
});