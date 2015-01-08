adsApp.directive('adItemDirective', function() { //TODO: Add custom filters when we have null data
    return {
        restrict: 'AE',
        templateUrl: 'templates/directives/ad-item-directive.html',
        replace: true
    }
});