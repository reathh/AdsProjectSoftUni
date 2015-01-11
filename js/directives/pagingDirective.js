adsApp.directive('pagingDirective', function() {
    return {
        restrict: 'AE',
        templateUrl: 'templates/directives/paging-directive.html',
        scope: {
            numberOfPages: '=',
            selectedPage: '='
        },
        controller: function ($scope) {
            $scope.getPages = function getPages() {
                var pages = [];
                pages.push($scope.selectedPage);
                //Ad pages before the selectedPageNumber if possible
                for(var i = $scope.selectedPage-1; i >= $scope.selectedPage - 2; i--) {
                    if (i > 0) {
                        pages.unshift(i);
                    }
                }
                for(var y = $scope.selectedPage+1; y <= $scope.selectedPage + 2; y++) {
                    if (y < $scope.numberOfPages) {
                        pages.push(y);
                    }
                }
                return pages;
            };
            $scope.changeSelectedPageNumber = function changeSelectedPageNumber(newPageNumber) {
                if (newPageNumber > 0 && newPageNumber <= $scope.numberOfPages) {
                    $scope.selectedPage = newPageNumber;
                }
            };

            $scope.isPageNumberSelected  = function isPageNumberSelected(pageNumber) {
                return $scope.selectedPage === pageNumber;
            };
        },
        replace: true
    }
});