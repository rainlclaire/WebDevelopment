"use strict";

(function() {
    angular.module('FormBuilderApp')
        .controller("LoginController", LoginController);

    function LoginController($scope, $location, $rootScope, UserService) {
        var model=this;
        model.login = login;
        //console.log($scope.user);
        ////login function for login html
        //$scope.login = login;

        function login(theUser) {
            console.log('cici');
            UserService.findUserByCredentials(theUser.username, theUser.password)
            .then(function(loggedInUser) {
                if (loggedInUser) {
                    console.log(loggedInUser);

                    //to set up the loggedIn user info
                    $rootScope.user = loggedInUser;
                    console.log($rootScope.user);
                    if (loggedInUser.roles != null && loggedInUser.roles.indexOf("admin") >= 0) {
                        $location.url("/admin");
                    } else {
                        $location.url("/profile");
                    }
                    //set up the path for navigating to profile
                }

                else {
                    //errors catch
                    alert("You have invalid Username or Password");
                }
            });
        }
    }
})();