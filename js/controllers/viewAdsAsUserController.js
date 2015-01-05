adsApp.controller('viewAdsAsUserController', function viewAdsAsUserController($scope, userDataService, adsDataService) {
    $scope.selectedCategoryId = 0;
    $scope.selectedTownId = 0;

    $scope.ads = adsDataService.getAllAds();
    $scope.categories = adsDataService.getAllCategories();
    $scope.towns = adsDataService.getAllTowns();
    $scope.changeSelectedCategory = changeSelectedCategory;
    $scope.isCategoryItemSelected = isCategoryItemSelected;
    $scope.changeSelectedTown = changeSelectedTown;
    $scope.isTownItemSelected = isTownItemSelected;

    $scope.$watchGroup(['selectedCategoryId', 'selectedTownId'], function(newValues, oldValues) {
        if (newValues[0] !== oldValues[0] || newValues[1] !== oldValues[1]) {
            $scope.ads = adsDataService.getAllAds(newValues[0], newValues[1]);
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

    function isTownItemSelected (newTownId) {
        return $scope.selectedTownId === newTownId;
    }
});