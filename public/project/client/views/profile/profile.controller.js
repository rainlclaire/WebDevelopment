"use strict";

(function() {
    angular.module('FindGroupApp')
        .controller("ProfileController", ProfileController);

    function ProfileController($location,$rootScope, UserService) {
        //console.log("profile");
        //console.log($scope.user);
        //var user = $rootScope.user;

        var model = this;
        model.update = update;
        model.cancel = cancel;
        model.error = null;
        model.message = null;


        UserService.getCurrentUser()
            .then(function(user) {
                console.log(user);

                $rootScope.user = user;

                //set the user info to user
                if (user != null) {
                    console.log(user);
                    console.log(model.user);
                    model.user = {};
                    model.user._id = user._id;
                    model.user.username = user.username;
                    model.user.password = user.password;
                    model.user.email = user.email;
                    model.user.image = user.image;
                    model.user.roles = user.roles;
                    model.user.likeGroups = user.likeGroups;
                    model.user.groupJoined = user.groupJoined;

                    console.log(model.user.groupJoined);


                } else {
                    $location.url("/home");
            }


        });

        function cancel() {
            $location.url("/home");
        }

        function update(updateUser) {
            console.log("updatecontoler");
            console.log(updateUser);
            model.message = null;

            if (!model.user.email) {
                alert("you have to provide email");
            } else {
                UserService.updateUser($rootScope.user._id, updateUser)
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

                //UserService.updateUser(model.user._id, updateUser)
                //    .then(function (mergeUser) {
                //
                //
                //        model.user = mergeUser;
                //        console.log("mergerUser");
                //        console.log(mergeUser);
                //
                //
                //        $rootScope.user = mergeUser;
                //        if (mergeUser) {
                //            $location.path("/home");
                //            alert("user updated successfully");
                //        }
                //
                //
                //    });
            }
        }

    }
})();