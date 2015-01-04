adsApp.controller('NavigationController', function NavigationController($scope) {
    $scope.navItems = [
        {
            text: "Home",
            url: "#/view/ads",
            active: "active"
        },

        {
            text: "Home",
            url: "#/view/ads",
            active: ""
        }
    ]
});