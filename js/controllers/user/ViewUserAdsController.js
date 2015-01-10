adsApp.controller('ViewUserAdsController', function ($scope, $location, $timeout, userDataService, adsDataService) {
    if (!userDataService.isUserLoggedIn()) {
        $location.url('/login');
        notyTopCenter('alert', 'Please login first to view this page', 2);
        return;
    }

    $scope.selectedStatusOptionId = null;
    $scope.selectedPageNumber = 1;

    $scope.ads = adsDataService.getAllUserAds($scope.selectedStatusOptionId, $scope.selectedPageNumber, userDataService.getCurrentUser());
    $scope.changeSelectedPageNumber = changeSelectedPageNumber;
    $scope.isPageNumberSelected = isPageNumberSelected;
    $scope.getArrayFromNElements = getArrayFromNElements;
    $scope.publishAdAgain = publishAdAgain;
    $scope.deactivateAd = deactivateAd;
    $scope.deleteAd = deleteAd;

    $scope.$watch('selectedPageNumber', function (newValue, oldValue) {
        if (newValue !== oldValue) {
            $scope.ads = adsDataService.getAllUserAds($scope.selectedStatusOptionId, newValue, userDataService.getCurrentUser());
        }
    });

    $scope.$watch('selectedStatusOptionId', function (newValue, oldValue) {
        if (newValue !== oldValue) {
                //adsDataService.getAllUserAds(newValue, $scope.selectedPageNumber, userDataService.getCurrentUser()).$promise.then(function (data) {
                //    $scope.ads = data;
                //    console.log($scope.ads);
                //    $scope.dirty = true;
                //});

            $scope.ads = adsDataService.getAllUserAds(newValue, $scope.selectedPageNumber, userDataService.getCurrentUser());

        }
    }, true);

    $scope.$on('statusFilterOptionChange', function(event, data) {
        $scope.selectedStatusId = data;
        $scope.ads = adsDataService.getAllUserAds($scope.selectedStatusId, $scope.selectedPageNumber, userDataService.getCurrentUser());
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
        function publish() {
            adsDataService.publishAdAgain(adId, userDataService.getCurrentUser()).$promise.then(function () {
                $scope.ads = adsDataService.getAllUserAds($scope.selectedStatusOptionId, $scope.selectedPageNumber, userDataService.getCurrentUser());
                notyTopCenter('success', 'Ad submitted for publishing', 2);
            }, function () {
                notyTopCenter('error', 'There was a problem submitting your ad for publishing', 2);
            })
        }
        notyConfirm('Are you sure you want to publish this ad again?', publish);
    }

    function deactivateAd(adId) {
        function deactivate() {
            adsDataService.deactivateAd(adId, userDataService.getCurrentUser()).$promise.then(function () {
                $scope.ads = adsDataService.getAllUserAds($scope.selectedStatusOptionId, $scope.selectedPageNumber, userDataService.getCurrentUser());
                notyTopCenter('success', 'Ad successfully deactivated ', 2);
            }, function () {
                notyTopCenter('error', 'There was a problem deactivating your ad', 2);
            })
        }
        notyConfirm('Are you sure you want to deactivate this ad?', deactivate);
    }

    function deleteAd(adId) {
        function deleteAd() {
            adsDataService.deleteAd(adId, userDataService.getCurrentUser()).$promise.then(function () {
                $scope.ads = adsDataService.getAllUserAds($scope.selectedStatusOptionId, $scope.selectedPageNumber, userDataService.getCurrentUser());
                notyTopCenter('success', 'Ad successfully deleted ', 2);
            }, function () {
                notyTopCenter('error', 'There was a problem deleting your ad', 2);
            })
        }
        notyConfirm('Are you sure you want to delete this ad?', deleteAd);
    }
});