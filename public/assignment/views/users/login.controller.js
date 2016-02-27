"use strict";

(function() {
    angular.module('FormBuilderApp')
        .controller("LoginController", LoginController);

    function LoginController($scope, $location, $rootScope, UserService) {

        console.log($scope.user);
        //login function for login html
        $scope.login = login;

        function login(theUser) {
            UserService.findUserByCredentials(theUser.username, theUser.password, function (loggedInUser) {
                if (loggedInUser) {

                    //to set up the loggedIn user info
                    $rootScope.user = {
                        _id:loggedInUser._id,
                        username: loggedInUser.username,
                        password: loggedInUser.password,
                        verifyPassword: loggedInUser.verifyPassword,
                        firstName: loggedInUser.firstName,
                        lastName: loggedInUser.lastName,
                        email: loggedInUser.email,
                        roles: loggedInUser.roles
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