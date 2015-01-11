adsApp.factory('adsDataService', function adsDataService($resource,$q) { //TODO: gather all resource methods in one place
    var pageSizeForAllAdsForUser = 4;
    var pageSizeForAllUserAds = 4;
    var pageSizeForAllAllAdsAsAdmin = 4;

    function getAllAds(categoryId, townId, selectedPageNumber) {
        var pageSize = '?PageSize=' + pageSizeForAllAdsForUser;
        var categoryIdAsString = categoryId ? "&CategoryId=" + categoryId : '';
        var townIdAsString = townId ? "&TownId=" + townId : '';
        var startPage = selectedPageNumber ? '&StartPage=' + selectedPageNumber : '';
        console.log(startPage);
        var resource = $resource('http://softuni-ads.azurewebsites.net/api/Ads' + pageSize + categoryIdAsString + townIdAsString + startPage);
        return resource.get();
    }

    function getAllAdsAsAdmin(userData, statusId, categoryId, townId, selectedPageNumber) {
        var pageSize = '?PageSize=' + pageSizeForAllAdsForUser;
        var statusIdAsString = statusId != null ? '&Status=' + statusId : '';
        var categoryIdAsString = categoryId ? "&CategoryId=" + categoryId : '';
        var townIdAsString = townId ? "&TownId=" + townId : '';
        var startPage = selectedPageNumber ? '&StartPage=' + selectedPageNumber : '';

        var url = 'http://softuni-ads.azurewebsites.net/api/admin/ads' + pageSize + statusIdAsString + categoryIdAsString + townIdAsString + startPage;
        var resource = $resource(url, {}, {
            get: {
                method:'GET',
                headers: { 'Authorization': userData.access_token }
            }
        });

        return resource.get();
    }

    function getAd(adId, userData) {
        var url = 'http://softuni-ads.azurewebsites.net/api/user/ads/' + adId;
        var resource = $resource(url, {}, {
            get: {
                method:'GET',
                headers: { 'Authorization': userData.access_token }
            }
        });

        return resource.get();
    }

    function getAdAsAdmin(adId, userData) {
        var url = 'http://softuni-ads.azurewebsites.net/api/admin/ads/' + adId;
        var resource = $resource(url, {}, {
            get: {
                method:'GET',
                headers: { 'Authorization': userData.access_token }
            }
        });

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
        var status = statusId != null ? "&Status=" + statusId : '';
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

    function deleteAd(adId, userData) {
        var resource = $resource('http://softuni-ads.azurewebsites.net/api/user/Ads/' + adId, {}, {
            deleteAd: {
                method:'DELETE',
                headers: { 'Authorization': userData.access_token }
            }
        });
        return resource.deleteAd();
    }

    function editAd(userData, adId, newTitle, newText, changeImage, imageDataUrl, categoryId, townId) {
        var ad = {
            'title': newTitle,
            'text': newText,
            'changeImage' : changeImage,
            'imageDataUrl': imageDataUrl,
            'categoryId': categoryId,
            'townId': townId
        };

        var resource = $resource('http://softuni-ads.azurewebsites.net/api/user/Ads/' + adId, {}, {
            editAd: {
                method:'PUT',
                headers: { 'Authorization': userData.access_token }
            }
        });
        return resource.editAd(ad);
    }

    function editAdAsAdmin(userData, ad) {
        var resource = $resource('http://softuni-ads.azurewebsites.net/api/admin/Ads/' + ad.id, {}, {
            editAdAsAdmin: {
                method:'PUT',
                headers: { 'Authorization': userData.access_token }
            }
        });
        return resource.editAdAsAdmin(ad);
    }

    function approveAd(adId, userData) {
        var resource = $resource('http://softuni-ads.azurewebsites.net/api/admin/Ads/Approve/' + adId, {}, {
            approveAd: {
                method:'PUT',
                headers: { 'Authorization': userData.access_token }
            }
        });
        return resource.approveAd();
    }

    function rejectAd(adId, userData) {
        var resource = $resource('http://softuni-ads.azurewebsites.net/api/admin/Ads/Reject/' + adId, {}, {
            rejectAd: {
                method:'PUT',
                headers: { 'Authorization': userData.access_token }
            }
        });
        return resource.rejectAd();
    }

    function adminDeleteAd(adId, userData) {
        var resource = $resource('http://softuni-ads.azurewebsites.net/api/admin/Ads/' + adId, {}, {
            deleteAd: {
                method:'DELETE',
                headers: { 'Authorization': userData.access_token }
            }
        });
        return resource.deleteAd();
    }

    return {
        getAllAds: getAllAds,
        getAllCategories: getAllCategories,
        getAllTowns: getAllTowns,
        createNewAd: createNewAd,
        getAllUserAds: getAllUserAds,
        publishAdAgain: publishAdAgain,
        deactivateAd: deactivateAd,
        deleteAd: deleteAd,
        getAd: getAd,
        getAdAsAdmin: getAdAsAdmin,
        editAd: editAd,
        editAdAsAdmin: editAdAsAdmin,
        getAllAdsAsAdmin: getAllAdsAsAdmin,
        approveAd: approveAd,
        rejectAd: rejectAd,
        adminDeleteAd: adminDeleteAd
    }
});