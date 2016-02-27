"use strict";

(function() {
    angular.module('FormBuilderApp')
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $rootScope, UserService) {
        console.log("profile");
        var user = $rootScope.user;

        $scope.error = null;
        $scope.message = null;

        //set the user info to user
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

        //update function for profile update
        $scope.update = update;


        function update(updateUser) {
            UserService.updateUser(user.id, updateUser, function(mergedUser) {
                //error catch for user is null
                $scope.message= null;
                if (updateUser == null) {
                    $scope.message = "Please fill in the required fields";
                    return;
                }
                //error catch for username is null
                if (!updateUser.username) {
                    $scope.message = "Please provide a username";
                    return;
                }
                //error catch for password is null
                if (!updateUser.password || !updateUser.verifyPassword) {
                    $scope.message = "Please provide a password or verifyPassword";
                    return;
                }
                //error catch if password not match
                if (updateUser.password != updateUser.verifyPassword) {
                    $scope.message = "Passwords must match";
                    return;
                }
                if (!updateUser.firstName || !updateUser.lastName) {
                    $scope.message = "You have to provide your first and last name";
                }
                if (!updateUser.email) {
                    $scope.message = "Please provide invalid email";
                }
                //error message

                if (!$scope.message) {
                    $scope.$location.path("/home");
                    alert("user updated successfully");

                }

            });
        }


    }
})();
