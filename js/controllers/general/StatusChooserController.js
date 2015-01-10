adsApp.controller('StatusChooserController', function ($scope, $rootScope, $q) {

    $rootScope.selectedStatusOptionId = null;
    $scope.changeSelectedStatusOption = changeSelectedStatusOption;
    $scope.isStatusOptionSelected = isStatusOptionSelected;
    $scope.userAdStatusOptions = 'templates/user/user-ad-filter-options-directive.html';
    $scope.statusFilterOptions = [
        {
            id: 0,
            name: 'Inactive'
        },
        {
            id: 1,
            name: 'Waiting Approval'
        },
        {
            id: 2,
            name: 'Published'
        },
        {
            id: 3,
            name: 'Rejected'
        }
    ];

    function changeSelectedStatusOption(newStatusOptionId) {
        $rootScope.selectedStatusOptionId = newStatusOptionId;
        $rootScope.$broadcast('statusFilterOptionChange', newStatusOptionId);
    }

    function isStatusOptionSelected (statusOptionId) {
        return $rootScope.selectedStatusOptionId === statusOptionId;
    }
});