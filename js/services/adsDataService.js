adsApp.factory('adsDataService', function adsDataService($resource) {
    return {
        getAllAds: function (categoryId, townId) {
            var pageSize = '?PageSize=5';
            var categoryId = categoryId ? "&CategoryId=" + categoryId : '';
            var townId = townId ? "&TownId=" + townId : '';

            var resource = $resource('http://softuni-ads.azurewebsites.net/api/Ads' + pageSize + categoryId + townId);
            return resource.get();
        },
        getAllCategories: function () {
            var resource = $resource('http://softuni-ads.azurewebsites.net/api/Categories');
            return resource.query();
        },
        getAllTowns: function () {
            var resource = $resource('http://softuni-ads.azurewebsites.net/api/Towns');
            return resource.query();
        }
    }
});