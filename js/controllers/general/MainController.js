adsApp.controller('MainController', function MainController($scope, $location, userDataService) {
    $scope.currentPageString = "Home";
    $scope.showPleaseLoginPanel = !userDataService.isUserLoggedIn();
    $scope.showUserInfo = userDataService.isUserLoggedIn();
    $scope.showUserAdStatusOptions = false;
    $scope.currentUserUsername = userDataService.getCurrentUser() != null ? userDataService.getCurrentUser().username : '';
    $scope.pleaseLoginPanel = 'templates/general/please-login-panel.html';
    $scope.logout = logout;
    $scope.isUserAdmin = userDataService.isUserAdmin();

    userDataService.currentUserWatch().then(null, null, function (user) {
        $scope.showPleaseLoginPanel = !userDataService.isUserLoggedIn();
        $scope.isUserAdmin = userDataService.isUserAdmin();
        if (user != null) {
            $scope.currentUserUsername = user.username;
            $scope.showUserInfo = true;
        }
    });

    $scope.$on('$locationChangeStart', function() {
        var location = $location.path();
        switch (location) {
            case '/view/ads':
                $scope.currentPageString = "Home";
                break;
            case '/login':
                $scope.currentPageString = "Login";
                break;
            case '/register':
                $scope.currentPageString = "Register";
                break;
            case '/add/ad':
                $scope.currentPageString = "Add New Ad";
                break;
            case '/view/user/ads':
                $scope.currentPageString = "User Ads";
                break;
            case '/edit/profile':
                $scope.currentPageString = "Edit Profile";
                break;
            case '/admin/view/ads':
                $scope.currentPageString = "Ads";
                break;
            case '/admin/view/users':
                $scope.currentPageString = "Users";
                break;
        }

        $scope.showUserAdStatusOptions = $location.path() == '/view/user/ads' || $location.path() == '/admin/view/ads';
    });

    function logout() {
        $scope.currentUserUsername = '';
        $scope.showUserInfo = false;
        userDataService.logout();
        notyTopCenter('alert', 'You logged out', 2);
    }
});