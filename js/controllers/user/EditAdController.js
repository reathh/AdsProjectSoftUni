adsApp.controller('EditAdController', function ($scope, $routeParams, $location, adsDataService, userDataService) {
    if (!userDataService.isUserLoggedIn()) {
        $location.url('/login');
        notyTopCenter('alert', 'Please login first to view this page', 2);
        return;
    }

    $scope.nullData = null;
    adsDataService.getAd($routeParams.id, userDataService.getCurrentUser()).$promise.then(function (data) {
        $scope.ad = data;
        $scope.imageFromServer = data.imageDataUrl;
    }, function (err) {
        $location.url('/view/user/ads');
        notyTopCenter('error', 'There was an error fetching this ad', 2);
    });
    $scope.categories = adsDataService.getAllCategories();
    $scope.towns = adsDataService.getAllTowns();
    $scope.editAd = editAd;

    function editAd(ad) {
        $scope.ad.changeImage = ad.imageDataUrl != $scope.imageFromServer;
        adsDataService.editAd(userDataService.getCurrentUser(), $scope.ad.id, $scope.ad.title, $scope.ad.text, $scope.ad.changeImage, $scope.ad.imageDataUrl, $scope.ad.categoryId, $scope.ad.townId)
            .$promise.then(function () {
                $location.url('/view/user/ads');
                notyTopCenter('success', "Advertisement edited. Don't forget to submit it for publishing.", 3);
            }, function (err) {
                notyInCustomContainer('#edit-ad-noty-area', 'center', 'error', 'There was an error trying to edit your ad. Please try again.', 3);
            });
    }
});