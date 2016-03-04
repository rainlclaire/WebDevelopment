"use strict";

(function() {
    angular.module('FindGroupApp')
        .controller("LogInController", LogInController);

    function LogInController($scope, $location, $rootScope, UserService) {

        $scope.login = login;

        function login (user) {
            var user = UserService.findUserByCredentials({username: user.username, password: user.password});
            if (user) {
                $rootScope.currentUser = user;
                UserService.setCurrentUser(user);
                $location.url("/profile");
            }
        }
    }
})();