"use strict";

(function() {
    angular.module('FindGroupApp')
        .controller("SignUpController", SignUpController);

    function SignUpController($scope, $location, UserService) {
        console.log('fwqf');

        $scope.message = null;
        $scope.register = register;

        function register(user) {
            console.log('abc');
            console.log(user);
            $scope.message = null;

            if (user == null) {
                $scope.message = "Please fill in the required fields";
                return;
            }
            if (!user.username) {
                $scope.message = "Please provide a username";
                return;
            }
            //if (!user.password || !user.password2) {
            //    $scope.message = "Please provide a password";
            //    return;
            //}
            //if (user.password != user.password2) {
            //    $scope.message = "Passwords must match";
            //    return;
            //}
            var user = UserService.findUserByUsername(user.username);
            if (user != null) {
                $scope.message = "User already exists";
                return;
            }
            console.log('33333');
            var newUser = UserService.createUser($scope.theUser);
            UserService.setCurrentUser(newUser);
            $location.url("/profile");
            console.log('3333324234323');
        }
    }

})();