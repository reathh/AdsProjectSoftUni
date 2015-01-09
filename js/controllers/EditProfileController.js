adsApp.controller('EditProfileController', function ($scope, $location, userDataService, adsDataService) {
    if (!userDataService.isUserLoggedIn()) {
        $location.url('/login');
        notyTopCenter('alert', 'You must be logged in to see this page', 2);
    }

    $scope.nullData = null;
    $scope.user = userDataService.getCurrentUserFromServer(userDataService.getCurrentUser());
    $scope.towns = adsDataService.getAllTowns();
    $scope.editProfile = editProfile;
    $scope.changePassword = changePassword;

    function editProfile(user) {
        userDataService.editUser(user, userDataService.getCurrentUser()).$promise.then(function () {
            notyInCustomContainer('#edit-profile-noty-area', 'center', 'success', "You successfully edited your profile", 2);
        }, function () {
            notyInCustomContainer('#edit-profile-noty-area', 'center', 'error', "There was a problem editing your profile", 2);
        });
    }

    function changePassword(passwordData) {
        userDataService.changePassword(passwordData, userDataService.getCurrentUser()).$promise.then(function () {
            notyInCustomContainer('#edit-profile-noty-area', 'center', 'success', "You successfully changed your password", 2);
        }, function () {
            notyInCustomContainer('#edit-profile-noty-area', 'center', 'error', "There was a problem changing your password", 2);
        })
    }
});