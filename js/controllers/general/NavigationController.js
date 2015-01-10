adsApp.controller('NavigationController', function NavigationController($scope, $location, userDataService) {
    $scope.changeSelectedNavigationItem = changeSelectedNavigationItem;
    $scope.isNavigationItemSelected = isNavigationItemSelected;
    $scope.navItems = configureNavigationItems(userDataService.isUserLoggedIn(), userDataService.isUserAdmin());

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
            case '/admin/view/ads':
                changeSelectedNavigationItem($scope.navItems[0]);
                break;
        }
    });

    userDataService.currentUserWatch().then(null, null, function (user) {
         $scope.navItems = configureNavigationItems(userDataService.isUserLoggedIn(), userDataService.isUserAdmin());
    });

    function configureNavigationItems(isUserLoggedIn, isUserAdmin) {
        if (isUserLoggedIn && !isUserAdmin) {
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
        } else if (isUserLoggedIn && isUserAdmin) {
            return [
                {
                    text: "Ads",
                    url: "#/admin/view/ads"
                },
                {
                    text: "Users",
                    url: "#/admin/view/users"
                },
                {
                    text: "Categories",
                    url: "#/admin/view/categories"
                },
                {
                    text: "Towns",
                    url: "#/admin/view/towns"
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