"use strict";

(function() {
    angular.module('FindGroupApp')
        .controller("SignUpController", SignUpController);

    function SignUpController($location,$rootScope, UserService) {
        console.log('fwqf');
        var model = this;
        model.message = null;
        model.register = register;

        function register(user) {
            console.log("register1");
            console.log(user);
            if (user.email == null) {
                alert("Please provide your email");
                return;
            }
            else if (user.username !=null) {
                UserService.findUserByUsername(user.username)
                        .then(function (theuser) {
                            if (theuser) {
                                alert("Username already exist, Please try other one");
                            }
                            else {
                                console.log("register");
                                console.log(user);
                                UserService.createUser(user)
                                    .then(function (createdUser) {

                                        console.log(createdUser);

                                        $rootScope.user = createdUser;
                                        $location.url("/profile")
                                    });
                            }
                        });
            }


        }
        //    console.log(user);
        //    if (user.username != null) {
        //        UserService.findUserByUsername(user.username)
        //        .then(function (user) {
        //            if (user) {
        //                alert("Username already exist, Please try other one");
        //            } else {
        //                UserService.createUser(user)
        //                    .then(function (createdUser) {
        //
        //                        if (createdUser != null) {
        //                            $rootScope.user = {
        //                                _id: createdUser._id,
        //                                username: createdUser.username,
        //                                password: createdUser.password,
        //                                roles: createdUser.roles,
        //                                likesGroups: createdUser.likesGroups,
        //                                groupJoined: createdUser.groupJoined,
        //                                email: createdUser.email
        //                            };
        //                            $location.url("/profile");
        //
        //                        }
        //
        //                    });
        //            }
        //        });
        //
        //
        //    }
        //}
    }

})();