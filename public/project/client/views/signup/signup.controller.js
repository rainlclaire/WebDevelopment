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
            UserService.createUser(user)
                .then(function (createdUser) {

                    console.log(createdUser);

                    $rootScope.user = createdUser;
                    $location.url("/profile");

                });


        }
    }

})();