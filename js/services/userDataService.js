adsApp.factory('userDataService', function userDataService($resource, $q) {
    var changeOfUserWatch = $q.defer();

    function isUserLoggedIn() {
        return localStorage.getItem('user') != null;
    }

    function isUserAdmin() {
        return getCurrentUser() != null ? getCurrentUser().isAdmin : false;
    }

    function login(username,password) {
        var defer = $q.defer();

        var userFromInputData = {
            'username': username,
            'password': password
        };

        var resource = $resource('http://softuni-ads.azurewebsites.net/api/user/login');
        resource.save(userFromInputData, function (data) {
            var user = createUserObjectForLocalStorage(data);
            setCurrentUser(JSON.stringify(user));

            defer.resolve(data);
        }, function (err) {
            defer.reject(err);
        });
        return defer.promise;
    }

    function register(username,password, confirmPassword, name, email, phone, townId) {
        var defer = $q.defer();

        var userFromInputData = {
            'username': username,
            'password': password,
            'confirmPassword': confirmPassword,
            'name': name,
            'email': email,
            'phone': phone,
            townId: townId
        };


            var resource = $resource('http://softuni-ads.azurewebsites.net/api/user/register');
        resource.save(userFromInputData, function (data) {
           var user = createUserObjectForLocalStorage(data);
            setCurrentUser(JSON.stringify(user));

            defer.resolve(data);
        }, function (err) {
            defer.reject(err);
        });
        return defer.promise;
    }

    function createUserObjectForLocalStorage(data) {
        var user = {};
        user['access_token'] = data['token_type'] + ' ' + data['access_token'];
        user['username'] = data['username'];
        user['isAdmin'] = data['isAdmin'] == 'true';
        return user;
    }

    function currentUserWatch() {
        return changeOfUserWatch.promise;
    }

    function getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }

    function getCurrentUserFromServer(userData) {
        var resource = $resource('http://softuni-ads.azurewebsites.net/api/user/profile', {}, {
            get: {
                method: 'GET',
                headers: { 'Authorization': userData.access_token }
            }
        });
        return resource.get();
    }

    function setCurrentUser(user) {
        localStorage.setItem('user', user);
        changeOfUserWatch.notify(JSON.parse(localStorage.getItem('user')));
    }

    function logout() {
        localStorage.removeItem('user');
        changeOfUserWatch.notify(JSON.parse(localStorage.getItem('user')));
    }

    function editUser(user, userData) {
        var resource = $resource('http://softuni-ads.azurewebsites.net/api/user/profile', {}, {
            editProfile: {
                method: 'PUT',
                headers: {'Authorization': userData.access_token}
            }
        });
        return resource.editProfile(user);
    }

    function changePassword(passwordData, userData) {
        var resource = $resource('http://softuni-ads.azurewebsites.net/api/user/changepassword', {}, {
            changePassword: {
                method: 'PUT',
                headers: {'Authorization': userData.access_token}
            }
        });
        return resource.changePassword(passwordData);
    }

    return {
        isUserLoggedIn: isUserLoggedIn,
        isUserAdmin: isUserAdmin,
        login: login,
        register: register,
        logout: logout,
        currentUserWatch: currentUserWatch,
        getCurrentUser: getCurrentUser,
        getCurrentUserFromServer: getCurrentUserFromServer,
        editUser: editUser,
        changePassword: changePassword
     }
});