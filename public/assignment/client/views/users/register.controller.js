"use strict";

(function() {
    angular.module('FormBuilderApp')
        .controller("RegisterController", RegisterController);

    function RegisterController($scope,$rootScope, UserService) {
        var model=this;
        model.register = register;

        model.newUser = {};
        //console.log($scope.user);
        //$scope.message = null;

        ////register function for register html
        //$scope.register = register;

        function register(newUser) {

            //init message each time
            $scope.message = null;

            //error catch for newUser is null
            if (newUser == null) {
                $scope.message = "Please fill in the required fields";
                return;
            }
            //error catch for username is null
            if (!newUser.username) {
                $scope.message = "Please provide a username";
                return;
            }
            //error catch for password is null
            if (!newUser.password || !newUser.verifyPassword) {
                $scope.message = "Please provide a password";
                return;
            }
            //error catch for password not match
            if (newUser.password != newUser.verifyPassword) {
                $scope.message = "Passwords must match";
                return;
            }
            //error catch for invalid email or null
            if (!newUser.email) {
                $scope.message = "You have to provide invalid email";
                return;
            }
            UserService.createUser(newUser)
            .then(function (createdUser){
                $rootScope.user = createdUser;
                if (!$scope.message) {
                    $scope.$location.url("/profile");
                }
            });
        }

    }
})();