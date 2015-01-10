adsApp.controller('viewAdsAsUserController', function viewAdsAsUserController($scope, $location, $anchorScroll, userDataService, adsDataService) {
    if (userDataService.isUserAdmin()) {
        $location.url('/admin/view/ads');
        return;
    }

    $scope.selectedCategoryId = 0;
    $scope.selectedTownId = 0;
    $scope.selectedPageNumber = 1;

    $scope.ads = adsDataService.getAllAds();
    $scope.categories = adsDataService.getAllCategories();
    $scope.towns = adsDataService.getAllTowns();

    $scope.changeSelectedCategory = changeSelectedCategory;
    $scope.isCategoryItemSelected = isCategoryItemSelected;
    $scope.changeSelectedTown = changeSelectedTown;
    $scope.isTownItemSelected = isTownItemSelected;

    $scope.$watchGroup(['selectedCategoryId', 'selectedTownId'], function(newValues, oldValues) {
        if (newValues[0] !== oldValues[0] || newValues[1] !== oldValues[1]) {
            $scope.selectedPageNumber = 1;
            $scope.ads = adsDataService.getAllAds(newValues[0], newValues[1], $scope.selectedPageNumber);
        }
    });

    $scope.$watch('selectedPageNumber', function (newValue, oldValue) {
        if (newValue !== oldValue) {
            $scope.ads = adsDataService.getAllAds($scope.selectedCategoryId, $scope.selectedTownId, newValue);
            $location.hash('top-of-ads');
            $anchorScroll();
        }
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
});