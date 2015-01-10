adsApp.controller('addNewAdController', function ($scope, $rootScope, $location, adsDataService, userDataService) {
        if (!userDataService.isUserLoggedIn()) {
            $location.url('/login');
            notyTopCenter('alert', 'You must be logged in to see this page', 2);
            return;
        }

        $scope.nullData = null;
        $scope.adData = {townId: null, categoryId: null};
        $scope.categories = adsDataService.getAllCategories();
        $scope.towns = adsDataService.getAllTowns();


        $scope.publishAd = function(ad) {
            adsDataService.createNewAd(ad, userDataService.getCurrentUser()).then(function () {
                    notyTopCenter('success', "Advertisement submitted for approval. Once approved, it will be published.", 2);
                    $location.url("/view/user/ads");
                },
                function (err) {
                    notyInCustomContainer('#add-new-ad-noty-area', 'topCenter', 'error', 'Publish ad failed', 2);
                });
        };
    }
);