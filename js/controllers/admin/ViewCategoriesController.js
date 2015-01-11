adsApp.controller('ViewCategoriesController', function ($scope, $location, userDataService, adsDataService) {
    if (!userDataService.isUserAdmin()) {
        $location.url('/view/ads');
        notyTopCenter('alert', 'Access denied for this page', 2);
        return;
    }

    $scope.selectedPageNumber = 1;
    $scope.sortByWhat = null;

    $scope.categories = adsDataService.getAllCategoriesAsAdmin(userDataService.getCurrentUser(), $scope.sortByWhat, $scope.selectedPageNumber);
    $scope.changeSort = changeSort;
    $scope.whichIconToShow = whichIconToShow;
    $scope.deleteUser = deleteUser;

    $scope.$watch('sortByWhat', function (newValue, oldValue) {
        if (newValue !== oldValue) {
            $scope.categories = adsDataService.getAllCategoriesAsAdmin(userDataService.getCurrentUser(), newValue, $scope.selectedPageNumber);
        }
    });

    $scope.$watch('selectedPageNumber', function (newValue, oldValue) {
        if (newValue !== oldValue) {
            $scope.categories = adsDataService.getAllCategoriesAsAdmin(userDataService.getCurrentUser(), $scope.sortByWhat, newValue);
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

    function deleteUser(username) {
        function delUser() {
            userDataService.deleteUser(username, userDataService.getCurrentUser()).$promise.then(function () {
                $scope.users = userDataService.getAllUsers(userDataService.getCurrentUser(), $scope.sortByWhat, $scope.selectedPageNumber);
                notyTopCenter('success', 'User successfully deleted ', 2);
            }, function () {
                notyTopCenter('error', 'There was a problem deleting this user', 2);
            })
        }

        notyConfirm('Are you sure you want to delete this user?', delUser);
    }
});