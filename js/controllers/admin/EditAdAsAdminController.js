adsApp.controller('EditAdAsAdminController', function ($scope, $location, $routeParams, $filter, userDataService, adsDataService) {
    if (!userDataService.isUserAdmin()) {
        $location.url('/view/ads');
        notyTopCenter('alert', 'Access denied for this page', 2);
        return;
    }

    $scope.nullData = null;
    adsDataService.getAdAsAdmin($routeParams.id, userDataService.getCurrentUser()).$promise.then(function (data) {
        $scope.ad = data;
        $scope.ad.dateAsString = new Date(data.date);
        $scope.ad.status = $filter('statusNameToId')(data.status);
        $scope.imageFromServer = data.imageDataUrl;
    }, function (err) {
        $location.url('/admin/view/ads');
        notyTopCenter('error', 'There was an error fetching this ad', 2);
    });
    $scope.categories = adsDataService.getAllCategories();
    $scope.towns = adsDataService.getAllTowns();
    $scope.editAdAsAdmin = editAdAsAdmin;

    function editAdAsAdmin(ad) {
        $scope.ad.changeImage = ad.imageDataUrl != $scope.imageFromServer;
        $scope.ad.date = $scope.ad.dateAsString.toISOString();
        adsDataService.editAdAsAdmin(userDataService.getCurrentUser(), ad)
            .$promise.then(function () {
                $location.url('/admin/view/ads');
                notyTopCenter('success', "Advertisement edited.", 3);
            }, function (err) {
                notyInCustomContainer('#edit-ad-noty-area', 'center', 'error', 'There was an error trying to edit this ad. Please try again.', 3);
            });
    }
});