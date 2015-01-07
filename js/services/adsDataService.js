adsApp.factory('adsDataService', function adsDataService($resource, $q) {

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

    function createNewAd(adData, userData) {
        var defer = $q.defer();
        var ad = {
            'title': adData.title,
            'text': adData.text,
            'categoryId': adData.categoryId,
            'townId': adData.townId,
            'imageDataUrl': adData.imageDataUrl
        };

        //var resource = $resource('http://softuni-ads.azurewebsites.net/api/user/ads');
        //resource.save(ad, function (data) {
        //    defer.resolve();
        //}, function (err) {
        //    defer.reject();
        //});
        var resource = $resource('http://softuni-ads.azurewebsites.net/api/user/ads', {}, {
            createAd: {
                method:'POST',
                url: 'http://softuni-ads.azurewebsites.net/api/user/ads',
                headers: { 'Authorization': userData.access_token }
            }
        });

        resource.createAd(ad, function (data) {
                defer.resolve();
            }, function (err) {
                defer.reject();
            });

        return defer.promise;
    }
    return {
        getAllAds: getAllAds,
        getAllCategories: getAllCategories,
        getAllTowns: getAllTowns,
        createNewAd: createNewAd
    }
});