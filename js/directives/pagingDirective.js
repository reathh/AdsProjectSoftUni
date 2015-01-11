adsApp.directive('pagingDirective', function() { //TODO: Show only a few pages, not all
    return {
        restrict: 'AE',
        templateUrl: 'templates/directives/paging-directive.html',
        scope: {
            numberOfPages: '=',
            selectedPage: '='
        },
        controller: function ($scope) {
            $scope.getArrayFromNElements = function getArrayFromNElements(n) {
                return new Array(n);
            };
            $scope.changeSelectedPageNumber = function changeSelectedPageNumber(newPageNumber) {
                $scope.selectedPage = newPageNumber;
                console.log($scope.selectedPage);
            };

            $scope.isPageNumberSelected  = function isPageNumberSelected(pageNumber) {
                return $scope.selectedPage === pageNumber;
            };
        },
        replace: true
    }
});