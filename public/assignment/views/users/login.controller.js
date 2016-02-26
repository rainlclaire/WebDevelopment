"use strict";

(function() {
    angular.module('FormBuilderApp')
        .controller("LoginController", LoginController);

    function LoginController($scope, $location, $rootScope, UserService) {


        $scope.login = function(theUser) {
            UserService.findUserByCredentials($scope.theUser.username, $scope.theUser.password, function (loggedInUser) {

                if (loggedInUser) {
                    $rootScope.user = loggedInUser;
                    $location.path("/profile");
                }

                else {
                    alert("You have invalid Username or Password");
                }
            });



        }






    }
})();