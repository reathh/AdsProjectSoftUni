adsApp.controller('ViewUsersController', function ($scope, $location, userDataService) {
    if (!userDataService.isUserAdmin()) {
        $location.url('/view/ads');
        notyTopCenter('alert', 'Access denied for this page', 2);
        return;
    }

    $scope.selectedPageNumber = 1;
    $scope.sortByWhat = null;

    $scope.users = userDataService.getAllUsers(userDataService.getCurrentUser(), $scope.sortByWhat, $scope.selectedPageNumber);
    $scope.changeSort = changeSort;
    $scope.whichIconToShow = whichIconToShow;

    $scope.$watch('sortByWhat', function (newValue, oldValue) {
        if (newValue !== oldValue) {
            $scope.users = userDataService.getAllUsers(userDataService.getCurrentUser(), newValue, $scope.selectedPageNumber);
        }
    });

    $scope.$watch('selectedPageNumber', function (newValue, oldValue) {
        if (newValue !== oldValue) {
            $scope.users = userDataService.getAllUsers(userDataService.getCurrentUser(), $scope.sortByWhat, newValue);
        }
    });


    function changeSort(sortByWhat) {
        if (sortByWhat == $scope.sortByWhat) {
            $scope.sortByWhat = '-' + sortByWhat;
        } else {
            $scope.sortByWhat = sortByWhat;
        }
    }

    function whichIconToShow(element) {
        if (element == $scope.sortByWhat) {
            return 'glyphicon glyphicon-hand-up';
        } else if ('-' + element == $scope.sortByWhat) {
            return 'glyphicon glyphicon-hand-down';
        } else {
            return '';
        }
    }
});