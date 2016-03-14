"use strict";

(function() {
    angular.module('FormBuilderApp')
        .controller("ProfileController", ProfileController);

    function ProfileController($location,$rootScope, UserService) {
        //console.log("profile");
        //console.log($scope.user);
        //var user = $rootScope.user;

        var model = this;
        model.update = update;
        model.error = null;
        model.message = null;



        var user = $rootScope.user;
        console.log(user);

        //set the user info to user
        if (user != null) {
            console.log(model);
                model.user = {};
                model.user.username = user.username;
                model.user.password = user.password;
                model.user.verifyPassword= user.verifyPassword;
                model.user.email = user.email;
                model.user.firstName = user.firstName;
                model.user.lastName = user.lastName;
        } else {
            $location.url("/home");

        }

        function update(updateUser) {
            UserService.updateUser(user.id, updateUser)
            .then(function(mergeUser) {
                //console.log(mergeUser.data);
                //model.user = mergeUser.data;
                //$rootScope.user = mergeUser.data;
                //console.log($rootScope.user);
                //console.log(mergeUser);
                //error catch for user is null
                model.message= null;
                if (updateUser == null) {
                    model.message = "Please fill in the required fields";
                    return;
                }
                //error catch for username is null
                if (!updateUser.username) {
                    model.message = "Please provide a username";
                    return;
                }
                //error catch for password is null
                if (!updateUser.password || !updateUser.verifyPassword) {
                    model.message = "Please provide a password or verifyPassword";
                    return;
                }
                //error catch if password not match
                if (updateUser.password != updateUser.verifyPassword) {
                    model.message = "Passwords must match";
                    return;
                }
                if (!updateUser.firstName || !updateUser.lastName) {
                    model.message = "You have to provide your first and last name";
                }
                if (!updateUser.email) {
                    model.message = "Please provide invalid email";
                }
                //error message

                if (!model.message) {
                    model.user = mergeUser.data;
                    console.log(mergeUser);
                    $rootScope.user = mergeUser.data;
                    $location.path("/home");
                    alert("user updated successfully");

                }

            });
        }


    }
})();
