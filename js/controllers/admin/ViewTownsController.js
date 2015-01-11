adsApp.controller('ViewTownsController', function ($scope, $location, userDataService, adsDataService) {
    if (!userDataService.isUserAdmin()) {
        $location.url('/view/ads');
        notyTopCenter('alert', 'Access denied for this page', 2);
        return;
    }

    $scope.selectedPageNumber = 1;
    $scope.sortByWhat = null;

    $scope.towns = adsDataService.getAllTownsAsAdmin(userDataService.getCurrentUser(), $scope.sortByWhat, $scope.selectedPageNumber);
    $scope.changeSort = changeSort;
    $scope.whichIconToShow = whichIconToShow;
    $scope.deleteTown = deleteTown;
    $scope.addNewTownPrompt = addNewTownPrompt;
    $scope.editTownPrompt = editTownPrompt;

    $scope.$watch('sortByWhat', function (newValue, oldValue) {
        if (newValue !== oldValue) {
            $scope.towns = adsDataService.getAllTownsAsAdmin(userDataService.getCurrentUser(), newValue, $scope.selectedPageNumber);
        }
    });

    $scope.$watch('selectedPageNumber', function (newValue, oldValue) {
        if (newValue !== oldValue) {
            $scope.towns = adsDataService.getAllTownsAsAdmin(userDataService.getCurrentUser(), $scope.sortByWhat, newValue);
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

    function deleteTown(username) {
        function delTown() {
            adsDataService.deleteTown(username, userDataService.getCurrentUser()).$promise.then(function () {
                $scope.towns = adsDataService.getAllTownsAsAdmin(userDataService.getCurrentUser(), $scope.sortByWhat, $scope.selectedPageNumber);
                notyTopCenter('success', 'Town successfully deleted ', 2);
            }, function () {
                notyTopCenter('error', 'There was a problem deleting this town', 2);
            })
        }

        notyConfirm('Are you sure you want to delete this town?', delTown);
    }

    function addNewTownPrompt() {
        bootbox.prompt({
            title: "What name do you want for your new town?",
            callback: function(name) {
                if (name !== null) {
                    if (name == "") {
                        notyTopCenter('error', 'Name cannot be null', 2);
                    } else {
                        addNewTown(name);
                    }
                }
            }
        });
    }

    function addNewTown(name) {
        adsDataService.addTown(name).$promise.then(function () {
            $scope.towns = adsDataService.getAllTownsAsAdmin(userDataService.getCurrentUser(), $scope.sortByWhat, $scope.selectedPageNumber);
            notyTopCenter('success', 'Town successfully created ', 2);
        }, function () {
            notyTopCenter('error', 'There was a problem adding the town', 2);
        })
    }

    function editTownPrompt(townId, townName) {
        bootbox.prompt({
            title: "What new name do you want for this town?",
            value: townName,
            callback: function(name) {
                if (name !== null) {
                    if (name == "") {
                        notyTopCenter('error', 'Name cannot be null', 2);
                    } else {
                        editTown(townId, name);
                    }
                }
            }
        });
    }

    function editTown(townId, townName) {
        adsDataService.editTown(townId, townName).$promise.then(function () {
            $scope.towns = adsDataService.getAllTownsAsAdmin(userDataService.getCurrentUser(), $scope.sortByWhat, $scope.selectedPageNumber);
            notyTopCenter('success', 'Town successfully edited ', 2);
        }, function () {
            notyTopCenter('error', 'There was a problem editing the town', 2);
        })
    }
});