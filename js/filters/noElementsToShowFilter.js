adsApp.filter('noElementsToShow', function () {
    return function (input) {
        if (!input) {
            return 'No elements to show';
        }
    }
});