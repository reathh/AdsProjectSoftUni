adsApp.factory('userDataService', function userDataService($resource, $q) {
    var user = {};

    function isUserLoggedIn() {
        return localStorage['user'] != undefined;
    }

    function isUserAdmin() {
        return false;
    }

    function login(username,password) {
        var deferred = $q.defer();

        var resource = $resource('http://softuni-ads.azurewebsites.net/api/user/login');
        resource.save({'username': username, 'password': password}, function (data) {

            user['access_token'] = data['token_type'] + ' ' + data['access_token'];
            user['username'] = data['username'];
            localStorage['user'] = JSON.stringify(user);

            deferred.resolve(data);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }

    function getCurrentUser() {
        return JSON.parse(localStorage['user']);
    }
    return {

        isUserLoggedIn: isUserLoggedIn,
        isUserAdmin: isUserAdmin,
        login: login,
        getCurrentUser: getCurrentUser
     }
});