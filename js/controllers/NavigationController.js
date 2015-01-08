adsApp.controller('NavigationController', function NavigationController($scope, $location, userDataService) {
    $scope.changeSelectedNavigationItem = changeSelectedNavigationItem;
    $scope.isNavigationItemSelected = isNavigationItemSelected;
    $scope.navItems = configureNavigationItems(userDataService.isUserLoggedIn());

    $scope.$on('$locationChangeStart', function() {
        if ($location.url() == '/view/ads') {
            changeSelectedNavigationItem($scope.navItems[0]);
        } else if ($location.url() == '/login') {
            $scope.selectedNavigationItem = $scope.navItems[1];
        } else if ($location.url() == '/register') {
            $scope.selectedNavigationItem = $scope.navItems[2];
        } else if ($location.url() == '/add/ad') {
            $scope.selectedNavigationItem = $scope.navItems[2];
        } else if ($location.url() == '/view/user/ads') {
            $scope.selectedNavigationItem = $scope.navItems[1];
        }
    });

    userDataService.currentUserWatch().then(null, null, function (user) {
         $scope.navItems = configureNavigationItems(userDataService.isUserLoggedIn());
    });

    function configureNavigationItems(isUserLoggedIn) {
        if (isUserLoggedIn) {
           return [
                {
                    text: "Home",
                    url: "#/view/ads"
                },
                {
                    text: "My Ads",
                    url: "#/view/user/ads"
                },
                {
                    text: "Publish New Ad",
                    url: "#/add/ad"
                },
                {
                    text: "Edit Profile",
                    url: "#/edit/profile"
                }
            ];
        } else {
            return [
                {
                    text: "Home",
                    url: "#/view/ads"
                },
                {
                    text: "Login",
                    url: "#/login"
                },

                {
                    text: "Register",
                    url: "#/register"
                }
            ];
        }
    }

    function changeSelectedNavigationItem (navItem) {
        $scope.selectedNavigationItem = navItem;
    }
    function isNavigationItemSelected (navItem) {
        return $scope.selectedNavigationItem === navItem;
    }
});