adsApp.filter('valueOrNull', function () {
    return function (input) {
        if (input) {
            return input;
        } else {
            return "Not Filled";
        }
    }
});