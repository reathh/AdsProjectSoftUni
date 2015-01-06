adsApp.controller('NavigationController', function NavigationController($scope, $location) {
    $scope.changeSelectedNavigationItem = changeSelectedNavigationItem;
    $scope.isNavigationItemSelected = isNavigationItemSelected;
    $scope.navItems = [
        {
            text: "Home",
            url: "#/view/ads",
            active: "active"
        },
        {
            text: "Login",
            url: "#/login",
            active: ""
        }
    ];

    if($location.url() == '/view/ads') {
        $scope.selectedNavigationItem = $scope.navItems[0];
    } else if ($location.url() == '/login') {
        $scope.selectedNavigationItem = $scope.navItems[1];
    }

    function changeSelectedNavigationItem (navItem) {
        $scope.selectedNavigationItem = navItem;
    }
    function isNavigationItemSelected (navItem) {
        return $scope.selectedNavigationItem === navItem;
    }
});