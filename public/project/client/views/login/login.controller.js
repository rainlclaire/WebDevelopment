

"use strict";

(function() {
    angular.module("FindGroupApp")
        .controller("LogInController", LogInController);

    function LogInController($scope, $location, $rootScope, UserService) {
        var model= this;
        model.login = login;
        //console.log($scope.user);
        ////login function for login html
        //$scope.login = login;

        function login(theUser) {
            console.log('cici');
            console.log(theUser);
            if (!theUser) {
                alert("Please provide your username and password");
            }
            if (!theUser.username) {
                alert("Please provide your username")
            }
            if (!theUser.password) {
                alert("Please provide your password")
            }
            else {
                UserService.findUserByCredentials(theUser.username, theUser.password)
                    .then(function (loggedInUser) {
                        if (loggedInUser) {
                            console.log(loggedInUser);

                            //to set up the loggedIn user info
                            $rootScope.user = loggedInUser;
                            alert("Log In Successfully");
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
    }
})();