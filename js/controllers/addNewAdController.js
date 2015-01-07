adsApp.controller('addNewAdController', function ($scope, $rootScope, $location, adsDataService, userDataService) {
        if (!userDataService.isUserLoggedIn()) {
            $location.url('/view/ads');
            notyTopCenter('alert', 'You must be logged in to see this page', 2);
        }

        $scope.nullData = null;
        $scope.adData = {townId: null, categoryId: null};
        $scope.categories = adsDataService.getAllCategories();
        $scope.towns = adsDataService.getAllTowns();

        $scope.fileSelected = function(fileInputField) { //TODO: Try to use ng-model for visualizing. There are directives in the internet
            delete $scope.adData.imageDataUrl;
            var file = fileInputField.files[0];
            if (file.type.match(/image\/.*/)) {
                var reader = new FileReader();
                reader.onload = function() {
                    $scope.adData.imageDataUrl = reader.result;
                    $(".image-box").html("<img class='white-box' id='preview-image' src='" + reader.result + "'>");
                };
                reader.readAsDataURL(file);
            } else {
                $(".image-box").html("<p>File type not supported!</p>");
            }
        };

        $scope.publishAd = function(adData) {
            adsDataService.createNewAd(adData, userDataService.getCurrentUser()).then(function () {
                    notyTopCenter('success', "Advertisement submitted for approval. Once approved, it will be published.", 2);
                    $location.url("/user/ads");
                },
                function (err) {
                    notyInCustomContainer('#add-new-ad-noty-area', 'topCenter', 'error', 'Publish ad failed', 2);
                });
        };
    }
);