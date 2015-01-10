adsApp.controller('ViewAdsAsAdminController', function ($scope, $location, $anchorScroll, userDataService, adsDataService) {
    if (!userDataService.isUserAdmin()) {
        $location.url('/view/ads');
        notyTopCenter('alert', 'Access denied for this page', 2);
        return;
    }

    $scope.selectedStatusId = null;
    $scope.selectedCategoryId = 0;
    $scope.selectedTownId = 0;
    $scope.selectedPageNumber = 1;

    $scope.ads = adsDataService.getAllAdsAsAdmin(userDataService.getCurrentUser(), $scope.selectedStatusId, $scope.selectedCategoryId, $scope.selectedTownId, $scope.selectedPageNumber);
    $scope.categories = adsDataService.getAllCategories();
    $scope.towns = adsDataService.getAllTowns();

    $scope.changeSelectedCategory = changeSelectedCategory;
    $scope.isCategoryItemSelected = isCategoryItemSelected;
    $scope.changeSelectedTown = changeSelectedTown;
    $scope.isTownItemSelected = isTownItemSelected;
    $scope.approveAd = approveAd;
    $scope.rejectAd = rejectAd;
    $scope.deleteAd = deleteAd;


    $scope.$watchGroup(['selectedCategoryId', 'selectedTownId'], function(newValues, oldValues) {
        if (newValues[0] !== oldValues[0] || newValues[1] !== oldValues[1]) {
            $scope.selectedPageNumber = 1;
            $scope.ads = adsDataService.getAllAdsAsAdmin(userDataService.getCurrentUser(), $scope.selectedStatusId, newValues[0], newValues[1], $scope.selectedPageNumber);
        }
    });

    $scope.$watch('selectedPageNumber', function (newValue, oldValue) {
        if (newValue !== oldValue) {
            $scope.ads = adsDataService.getAllAdsAsAdmin(userDataService.getCurrentUser(), $scope.selectedStatusId, $scope.selectedCategoryId, $scope.selectedTownId, newValue);
            $location.hash('top-of-ads');
            $anchorScroll();
        }
    });

    $scope.$on('statusFilterOptionChange', function(event, data) {
        $scope.selectedStatusId = data;
        $scope.ads = adsDataService.getAllAdsAsAdmin(userDataService.getCurrentUser(), $scope.selectedStatusId, $scope.selectedCategoryId, $scope.selectedTownId, $scope.selectedPageNumber);
    });

    function changeSelectedCategory(newCategoryId) {
        $scope.selectedCategoryId = newCategoryId;
    }

    function isCategoryItemSelected (categoryItemId) {
        return $scope.selectedCategoryId === categoryItemId;
    }

    function changeSelectedTown(newTownId) {
        $scope.selectedTownId = newTownId;
    }

    function isTownItemSelected (townId) {
        return $scope.selectedTownId === townId;
    }

    function approveAd(adId) {
        function approve() {
            adsDataService.approveAd(adId, userDataService.getCurrentUser()).$promise.then(function () {
                $scope.ads = adsDataService.getAllAdsAsAdmin(userDataService.getCurrentUser(), $scope.selectedStatusId, $scope.selectedCategoryId, $scope.selectedTownId, $scope.selectedPageNumber);
                notyTopCenter('success', 'Ad successfully approved ', 2);
            }, function () {
                notyTopCenter('error', 'There was a problem approving this ad', 2);
            })
        }

        notyConfirm('Are you sure you want to approve this ad?', approve);
    }

    function rejectAd(adId) {
        function reject() {
            adsDataService.rejectAd(adId, userDataService.getCurrentUser()).$promise.then(function () {
                $scope.ads = adsDataService.getAllAdsAsAdmin(userDataService.getCurrentUser(), $scope.selectedStatusId, $scope.selectedCategoryId, $scope.selectedTownId, $scope.selectedPageNumber);
                notyTopCenter('success', 'Ad successfully rejected ', 2);
            }, function () {
                notyTopCenter('error', 'There was a problem rejecting this ad', 2);
            })
        }

        notyConfirm('Are you sure you want to reject this ad?', reject);
    }

    function deleteAd(adId) {
        function adminDelete() {
            adsDataService.adminDeleteAd(adId, userDataService.getCurrentUser()).$promise.then(function () {
                $scope.ads = adsDataService.getAllAdsAsAdmin(userDataService.getCurrentUser(), $scope.selectedStatusId, $scope.selectedCategoryId, $scope.selectedTownId, $scope.selectedPageNumber);
                notyTopCenter('success', 'Ad successfully deleted ', 2);
            }, function () {
                notyTopCenter('error', 'There was a problem deleting this ad', 2);
            })
        }

        notyConfirm('Are you sure you want to delete this ad?', adminDelete);
    }
});