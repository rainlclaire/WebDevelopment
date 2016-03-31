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

                model.user = {};
                model.user.username = user.username;
                model.user.password = user.password;
                model.user.email = user.email;
                model.user.roles = user.roles;
                model.user.firstName = user.firstName;
                model.user.lastName = user.lastName;
        } else {
            $location.url("/home");

        }

        function update(updateUser) {
            model.message= null;

                UserService.updateUser(user._id, updateUser)
                .then(function(mergeUser) {
                    console.log("here");

                        model.user = mergeUser;
                        console.log("mergerUser");
                        console.log(mergeUser);
                        $rootScope.user = mergeUser;
                    if (mergeUser) {
                        $location.path("/home");
                        alert("user updated successfully");
                    }


                });
            }

    }
})();
