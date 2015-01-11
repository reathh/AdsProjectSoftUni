adsApp.controller('EditUserController', function ($rootScope, $scope, $location, userDataService, adsDataService) {
    if (!userDataService.isUserAdmin()) {
        $location.url('/view/ads');
        notyTopCenter('alert', 'Access denied for this page', 2);
        return;
    }
    if (!$rootScope.userToEdit) {
        $location.url('/view/ads');
        notyTopCenter('alert', 'No user found to edit', 2);
    }

    $scope.nullData = null;
    $scope.user = $rootScope.userToEdit;
    $scope.towns = adsDataService.getAllTowns();
    $scope.editProfile = editProfile;
    $scope.changePassword = changePassword;


    function editProfile(user) {
        userDataService.editUserAsAdmin(user, userDataService.getCurrentUser()).$promise.then(function () {
            notyInCustomContainer('#edit-profile-noty-area', 'center', 'success', "You successfully edited the user's profile", 2);
        }, function () {
            notyInCustomContainer('#edit-profile-noty-area', 'center', 'error', "There was a problem editing the user's profile", 2);
        });
    }

    function changePassword(username, passwordData) {
        userDataService.changePasswordAsAdmin(username, passwordData, userDataService.getCurrentUser()).$promise.then(function () {
            notyInCustomContainer('#edit-profile-noty-area', 'center', 'success', "You successfully changed the user's password", 2);
        }, function () {
            notyInCustomContainer('#edit-profile-noty-area', 'center', 'error', "There was a problem changing the user's password", 2);
        })
    }
});