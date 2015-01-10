adsApp.filter('statusNameToId', function () {
    return function (input) {
        switch (input) {
            case 'Inactive': return 0; break;
            case 'WaitingApproval': return 1; break;
            case 'Published': return 2; break;
            case 'Rejected': return 3; break;
        }
    }
});