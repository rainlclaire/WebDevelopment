"use strict";

(function() {
    angular.module('FormBuilderApp')
        .controller("LoginController", LoginController);

    function LoginController($scope, $location, $rootScope, UserService) {

        //login function for login html
        $scope.login = login;

        function login(theUser) {
            UserService.findUserByCredentials($scope.theUser.username, $scope.theUser.password, function (loggedInUser) {
                if (loggedInUser) {

                    //to set up the loggedIn user info
                    $rootScope.user = {
                        username: loggedInUser.username,
                        password: loggedInUser.password,
                        verifyPassword: loggedInUser.verifyPassword,
                        firstName: loggedInUser.firstName,
                        lastName: loggedInUser.lastName,
                        email: loggedInUser.email
                    };
                    //set up the path for navigating to profile
                    $location.path("/profile");
                }

                else {
                    //errors catch
                    alert("You have invalid Username or Password");
                }
            });
        }
    }
})();