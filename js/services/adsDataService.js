adsApp.factory('adsDataService', function adsDataService($resource, $q) { //TODO: gather all resource methods in one place
    var pageSizeForAllAdsForUser = 5;
    var pageSizeForAllUserAds = 5;

    function getAllAds(categoryId, townId, selectedPageNumber) {
        var pageSize = '?PageSize=' + pageSizeForAllAdsForUser;
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

    function getAllUserAds(statusId, selectedPageNumber, userData) {
        var pageSize = '?PageSize=' + pageSizeForAllUserAds;
        var status = statusId ? "&Status=" + categoryId : '';
        var startPage = selectedPageNumber ? '&StartPage=' + selectedPageNumber : '';

        var url = 'http://softuni-ads.azurewebsites.net/api/user/ads' + pageSize + status + startPage;
        var resource = $resource(url, {}, {
            get: {
                method:'GET',
                headers: { 'Authorization': userData.access_token }
            }
        });

        return resource.get();
    }

    function publishAdAgain(adId, userData) {
        var resource = $resource('http://softuni-ads.azurewebsites.net/api/user/Ads/PublishAgain/' + adId, {}, {
            publishAdAgain: {
                method:'PUT',
                headers: { 'Authorization': userData.access_token }
            }
        });
        return resource.publishAdAgain();
    }

    function deactivateAd(adId, userData) {
        var resource = $resource('http://softuni-ads.azurewebsites.net/api/user/Ads/Deactivate/' + adId, {}, {
            deactivateAd: {
                method:'PUT',
                headers: { 'Authorization': userData.access_token }
            }
        });
        return resource.deactivateAd();
    }

    return {
        getAllAds: getAllAds,
        getAllCategories: getAllCategories,
        getAllTowns: getAllTowns,
        createNewAd: createNewAd,
        getAllUserAds: getAllUserAds,
        publishAdAgain: publishAdAgain,
        deactivateAd: deactivateAd
    }
});