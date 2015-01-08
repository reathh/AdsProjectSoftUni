adsApp.controller('MainController', function MainController($scope, $location, userDataService) {
    $scope.currentPageString = "Home";
    $scope.showPleaseLoginPanel = !userDataService.isUserLoggedIn();
    $scope.showUserInfo = userDataService.isUserLoggedIn();
    $scope.currentUserUsername = userDataService.getCurrentUser() != null ? userDataService.getCurrentUser().username : '';
    $scope.pleaseLoginPanel = 'templates/general/please-login-panel.html';
    $scope.logout = logout;

    userDataService.currentUserWatch().then(null, null, function (user) {
        $scope.showPleaseLoginPanel = !userDataService.isUserLoggedIn();
        if (user != null) {
            $scope.currentUserUsername = user.username;
            $scope.showUserInfo = true;
        }
    });

    $scope.$on('$locationChangeStart', function() {
        if($location.url() == '/view/ads') {
            $scope.currentPageString = "Home";
        } else if ($location.url() == '/login') {
            $scope.currentPageString = "Login";
        } else if ($location.url() == '/register') {
            $scope.currentPageString = "Register";
        } else if ($location.url() == '/add/ad') {
            $scope.currentPageString = "Add New Ad";
        } else if ($location.url() == '/view/user/ads') {
            $scope.currentPageString = "User Ads";
        }
    });

    function logout() {
        $scope.currentUserUsername = '';
        $scope.showUserInfo = false;
        userDataService.logout();
        notyTopCenter('alert', 'You logged out', 2);
    }
});