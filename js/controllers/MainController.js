adsApp.controller('MainController', function MainController($scope) {
    $scope.currentPageString = "Home";
    $scope.showPleaseLoginPanel = true;
    $scope.pleaseLoginPanel = 'templates/general/please-login-panel.html';
});