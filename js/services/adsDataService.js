adsApp.factory('adsDataService', function adsDataService($resource) {

    function getAllAds(categoryId, townId, selectedPageNumber) {
        var pageSize = '?PageSize=5';
        var categoryId = categoryId ? "&CategoryId=" + categoryId : '';
        var townId = townId ? "&TownId=" + townId : '';
        var startPage = selectedPageNumber ? '&StartPage=' + selectedPageNumber : '';

        var resource = $resource('http://softuni-ads.azurewebsites.net/api/Ads' + pageSize + categoryId + townId + startPage);
        return resource.get();
    }

    function getAllCategories() {
        var resource = $resource('http://softuni-ads.azurewebsites.net/api/Categories');
        return resource.query();
    }

    function getAllTowns() {
        var resource = $resource('http://softuni-ads.azurewebsites.net/api/Towns');
        return resource.query();
    }
    return {
        getAllAds: getAllAds,
        getAllCategories: getAllCategories,
        getAllTowns: getAllTowns
    }
});