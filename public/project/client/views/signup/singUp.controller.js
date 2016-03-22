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
            //console.log('abc');
            //console.log(user);
            //model.message = null;
            //
            //if (user == null) {
            //    model.message = "Please fill in the required fields";
            //    return;
            //}
            //if (!user.username) {
            //    model.message = "Please provide a username";
            //    return;
            //}
            //if (!user.password || !user.password2) {
            //    $scope.message = "Please provide a password";
            //    return;
            //}
            //if (user.password != user.password2) {
            //    $scope.message = "Passwords must match";
            //    return;
            //}
            console.log('33333');
            console.log(model.theUser);
            UserService.createUser(model.theUser)
                .then(function(newUser) {
                    console.log(newUser);
                    model.user = newUser;
                    console.log(newUser);
                    $rootScope.user = model.user;
                    $location.url("/profile");
                    console.log('3333324234323');
                });


        }
    }

})();