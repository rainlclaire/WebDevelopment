"use strict";

(function() {
    angular.module('FormBuilderApp')
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $rootScope, UserService) {
        console.log("profile");
        var user = $rootScope.user;


        $scope.error = null;
        $scope.message = null;

        if (user != null) {
                $scope.user.username = user.username;
                $scope.user.password = user.password;
                $scope.user.verifyPassword= user.verifyPassword;
                $scope.user.email = user.email;
                $scope.user.firstName = user.firstName;
                $scope.user.lastName = user.lastName;
        } else {
            $scope.$location.path("/home");

        }
        $scope.update = updateUser;


        function updateUser(updateUser) {

            console.log(updateUser.email);
            console.log($rootScope.user);
            //$scope.user = {
            //    username: $rootScope.user.username,
            //    password: $rootScope.user.password,
            //    verifyPassword: $rootScope.user.verifyPassword,
            //    firstName: $rootScope.user.firstName,
            //    lastName: $rootScope.user.lastName,
            //    email: $rootScope.user.email
            //};

            UserService.updateUser(user.id, updateUser, function(mergedUser) {
                if (updateUser == null) {
                    $scope.message = "Please fill in the required fields";
                    return;
                }

                if (!updateUser.username) {
                    $scope.message = "Please provide a username";
                    return;
                }

                if (!updateUser.password || !updateUser.verifyPassword) {
                    $scope.message = "Please provide a password or verifyPassword";
                    return;
                }
                if (updateUser.password != updateUser.verifyPassword) {
                    $scope.message = "Passwords must match";
                    return;
                }

                if (!$scope.message) {
                    $scope.$location.path("/home");
                    alert("user updated successfully");

                } else {
                    $scope.message = null;
                }

            });
        }


    }
})();