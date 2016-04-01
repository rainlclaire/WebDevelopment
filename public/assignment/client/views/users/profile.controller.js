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


        //set the user info to user
        if (user != null) {
            console.log(user);
            console.log(model.user);
            model.user = {};
            model.user.username = user.username;
            model.user.password = user.password;
            //user.email = user.email[0].split(",");

            model.user.email = user.email;
            model.user.phone = user.phone;

            model.user.roles = user.roles;
            model.user.firstName = user.firstName;
            model.user.lastName = user.lastName

            console.log(model.user);


        } else {
            $location.url("/home");


        }

        function update(updateUser) {
            console.log("updatecontoler");
            console.log(updateUser);
            model.message = null;
            if (!model.user.email) {
                alert("you have to provide email");
            } else {
                if (user.email != updateUser.email) {
                    updateUser.email = updateUser.email.split(",");

                }
                    UserService.updateUser(user._id, updateUser)
                        .then(function (mergeUser) {


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

    }
})();
