adsApp.controller('MainController', function MainController($scope, userDataService) {
    $scope.currentPageString = "Home";
    $scope.showPleaseLoginPanel = !userDataService.isUserLoggedIn();
    userDataService.currentUserWatch().then(null, null, function (user) {
        $scope.showPleaseLoginPanel = !userDataService.isUserLoggedIn();
    });
    $scope.pleaseLoginPanel = 'templates/general/please-login-panel.html';
});