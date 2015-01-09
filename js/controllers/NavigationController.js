adsApp.controller('NavigationController', function NavigationController($scope, $location, userDataService) {
    $scope.changeSelectedNavigationItem = changeSelectedNavigationItem;
    $scope.isNavigationItemSelected = isNavigationItemSelected;
    $scope.navItems = configureNavigationItems(userDataService.isUserLoggedIn());

    $scope.$on('$locationChangeStart', function() {
        var location = $location.path();
        switch (location) {
            case '/view/ads':
                changeSelectedNavigationItem($scope.navItems[0]);
                break;
            case '/login':
                changeSelectedNavigationItem($scope.navItems[1]);
                break;
            case '/register':
                changeSelectedNavigationItem($scope.navItems[2]);
                break;
            case '/add/ad':
                changeSelectedNavigationItem($scope.navItems[2]);
                break;
            case '/view/user/ads':
                changeSelectedNavigationItem($scope.navItems[1]);
                break;
            case '/edit/profile':
                changeSelectedNavigationItem($scope.navItems[3]);
                break;
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