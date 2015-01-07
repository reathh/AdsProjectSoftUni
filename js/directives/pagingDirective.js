adsApp.directive('pagingDirective', function() { //TODO: Show only a few pages, not all
    return {
        restrict: 'AE',
        templateUrl: 'templates/directives/paging-directive.html',
        replace: true
    }
});