adsApp.controller('ViewUserAdsController', function ($scope, $location, $sce, userDataService, adsDataService) {
    if (!userDataService.isUserLoggedIn()) {
        $location.url('/login');
        notyTopCenter('alert', 'Please login first to view this page', 2);
    }

    $scope.statusId = 0;
    $scope.selectedPageNumber = 1;

    $scope.ads = adsDataService.getAllUserAds($scope.statusId, $scope.selectedPageNumber, userDataService.getCurrentUser());
    $scope.changeSelectedPageNumber = changeSelectedPageNumber;
    $scope.isPageNumberSelected = isPageNumberSelected;
    $scope.getArrayFromNElements = getArrayFromNElements;
    $scope.publishAdAgain = publishAdAgain;
    $scope.deactivateAd = deactivateAd;

    $scope.$watch('selectedPageNumber', function (newValue, oldValue) {
        if (newValue !== oldValue) {
            $scope.ads = adsDataService.getAllUserAds($scope.statusId, newValue, userDataService.getCurrentUser());
            $location.hash('top-of-ads');
            $anchorScroll();
        }
    });

    function getArrayFromNElements(n) {
        return new Array(n);
    }

    function changeSelectedPageNumber(newPageNumber) {
        $scope.selectedPageNumber = newPageNumber;
    }

    function isPageNumberSelected (pageNumber) {
        return $scope.selectedPageNumber === pageNumber;
    }

    function publishAdAgain(adId) {
        adsDataService.publishAdAgain(adId, userDataService.getCurrentUser()).$promise.then(function () {
            $scope.ads = adsDataService.getAllUserAds($scope.statusId, $scope.selectedPageNumber, userDataService.getCurrentUser());
            notyTopCenter('success', 'Ad submitted for publishing', 2);
        }, function () {
            notyTopCenter('error', 'There was a problem submitting your ad for publishing', 2);
        })
    }

    function deactivateAd(adId) {
        adsDataService.deactivateAd(adId, userDataService.getCurrentUser()).$promise.then(function () {
            $scope.ads = adsDataService.getAllUserAds($scope.statusId, $scope.selectedPageNumber, userDataService.getCurrentUser());
            notyTopCenter('success', 'Ad successfully deactivated ', 2);
        }, function () {
            notyTopCenter('error', 'There was a problem deactivating your ad', 2);
        })
    }
});