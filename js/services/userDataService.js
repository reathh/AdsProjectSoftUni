adsApp.factory('userDataService', function userDataService($resource, $q) {
    var changeOfUserWatch = $q.defer();
    var user = {};

    function isUserLoggedIn() {
        return localStorage.getItem('user') != null;
    }

    function isUserAdmin() {
        return false;
    }

    function login(username,password) {
        var defer = $q.defer();

        var resource = $resource('http://softuni-ads.azurewebsites.net/api/user/login');
        resource.save({'username': username, 'password': password}, function (data) {

            user['access_token'] = data['token_type'] + ' ' + data['access_token'];
            user['username'] = data['username'];
            setCurrentUser(JSON.stringify(user));

            defer.resolve(data);
        }, function (err) {
            defer.reject(err);
        });
        return defer.promise;
    }

    function currentUserWatch() {
        return changeOfUserWatch.promise;
    }

    function setCurrentUser(user) {
        localStorage.setItem('user', user);
        changeOfUserWatch.notify(localStorage.getItem('user'));
    }

    function logout() {
        localStorage.removeItem('user');
        changeOfUserWatch.notify(localStorage.getItem('user'));
    }
    return {
        isUserLoggedIn: isUserLoggedIn,
        isUserAdmin: isUserAdmin,
        login: login,
        logout: logout,
        currentUserWatch: currentUserWatch
     }
});