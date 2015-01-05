adsApp.controller('NavigationController', function NavigationController($scope) {
    $scope.changeSelectedNavigationItem = changeSelectedNavigationItem;
    $scope.isNavigationItemSelected = isNavigationItemSelected;
    $scope.navItems = [
        {
            id: 1,
            text: "Home",
            url: "#/view/ads",
            active: "active"
        },
        {
            id: 2,
            text: "Home",
            url: "#/view/ads",
            active: ""
        },
        {
            id: 3,
            text: "Home",
            url: "#/view/ads",
            active: ""
        }
    ];

    function changeSelectedNavigationItem (navItem) {
        $scope.selectedNavigationItem = navItem;
    }
    function isNavigationItemSelected (navItem) {
        return $scope.selectedNavigationItem === navItem;
    }
});