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
            console.log('33333');
            console.log(model.theUser);
            UserService.createUser(user)
                .then(function(newUser) {
                    console.log(newUser);
                    model.user = newUser;
                    console.log(newUser);
                    $rootScope.user = model.user;
                    $rootScope.currentUser=model.user;
                    $location.url("/profile");
                    console.log('3333324234323');
                });


        }
    }

})();