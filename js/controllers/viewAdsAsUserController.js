adsApp.controller('viewAdsAsUserController', function viewAdsAsUserController($scope, userDataService, adsDataService) {
    $scope.ads = adsDataService.getAllAds();
});