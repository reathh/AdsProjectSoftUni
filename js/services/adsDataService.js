adsApp.factory('adsDataService', function adsDataService($resource) {
    return {
        getAllAds: function () {
            var resource = $resource('http://softuni-ads.azurewebsites.net/api/Ads?PageSize=3');
            return resource.get();
        }
    }
});