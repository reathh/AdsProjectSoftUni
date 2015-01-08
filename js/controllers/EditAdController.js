adsApp.controller('EditAdController', function ($scope, $routeParams, adsDataService, userDataService) {
    if (!userDataService.isUserLoggedIn()) {
        $location.url('/login');
        notyTopCenter('alert', 'Please login first to view this page', 2);
    }
    console.log($routeParams.id);
    //$scope.ad = adsDataService.getAd($routeParams.id)
});