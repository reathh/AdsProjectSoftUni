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
    $scope.deleteCategory = deleteCategory;
    $scope.addNewCategoryPrompt = addNewCategoryPrompt;
    $scope.editCategoryPrompt = editCategoryPrompt;

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

    function deleteCategory(username) {
        function delCategory() {
            adsDataService.deleteCategory(username, userDataService.getCurrentUser()).$promise.then(function () {
                $scope.categories = adsDataService.getAllCategoriesAsAdmin(userDataService.getCurrentUser(), $scope.sortByWhat, $scope.selectedPageNumber);
                notyTopCenter('success', 'Category successfully deleted ', 2);
            }, function () {
                notyTopCenter('error', 'There was a problem deleting this category', 2);
            })
        }

        notyConfirm('Are you sure you want to delete this category?', delCategory);
    }

    function addNewCategoryPrompt() {
        bootbox.prompt({
            title: "What name do you want for your new category?",
            callback: function(name) {
                if (name !== null) {
                    if (name == "") {
                        notyTopCenter('error', 'Name cannot be null', 2);
                    } else {
                        addNewCategory(name);
                    }
                }
            }
        });
    }

    function addNewCategory(name) {
        adsDataService.addCategory(name).$promise.then(function () {
            $scope.categories = adsDataService.getAllCategoriesAsAdmin(userDataService.getCurrentUser(), $scope.sortByWhat, $scope.selectedPageNumber);
            notyTopCenter('success', 'Category successfully created ', 2);
        }, function () {
            notyTopCenter('error', 'There was a problem adding the category', 2);
        })
    }

    function editCategoryPrompt(categoryId, categoryName) {
        console.log(categoryName);
        bootbox.prompt({
            title: "What new name do you want for this category?",
            value: categoryName,
            callback: function(name) {
                if (name !== null) {
                    if (name == "") {
                        notyTopCenter('error', 'Name cannot be null', 2);
                    } else {
                        editCategory(categoryId, name);
                    }
                }
            }
        });
    }

    function editCategory(categoryId, categoryName) {
        adsDataService.editCategory(categoryId, categoryName).$promise.then(function () {
            $scope.categories = adsDataService.getAllCategoriesAsAdmin(userDataService.getCurrentUser(), $scope.sortByWhat, $scope.selectedPageNumber);
            notyTopCenter('success', 'Category successfully edited ', 2);
        }, function () {
            notyTopCenter('error', 'There was a problem editing the category', 2);
        })
    }
});