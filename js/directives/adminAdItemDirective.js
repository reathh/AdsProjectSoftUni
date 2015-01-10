adsApp.directive('adminAdItemDirective', function() { //TODO: Add custom filters when we have null data
    return {
        restrict: 'AE',
        templateUrl: 'templates/directives/admin-ad-item-directive.html',
        replace: true
    }
});