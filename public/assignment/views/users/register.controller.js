"use strict";

(function() {
    angular.module('FormBuilderApp')
        .controller("RegisterController", RegisterController);

    function RegisterController($scope,$rootScope, UserService) {


        $scope.message = null;

        $scope.register = register;


        function register(newUser) {

            $scope.message = null;
            if (newUser == null) {
                $scope.message = "Please fill in the required fields";
                return;
            }
            if (!newUser.username) {
                $scope.message = "Please provide a username";
                return;
            }
            if (!newUser.password || !newUser.verifyPassword) {
                $scope.message = "Please provide a password";
                return;
            }
            if (newUser.password != newUser.verifyPassword) {
                $scope.message = "Passwords must match";
                return;
            }
            if (!newUser.email) {
                $scope.message = "You have to provide invalid email";
                return;
            }


            UserService.createUser(newUser, function(createUser) {
                $rootScope.user = createUser;
                if (!$scope.message) {
                    $scope.$location.url("/profile");
                }
            });



        }

    }
})();