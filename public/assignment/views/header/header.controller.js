"use strict";


(function () {
    angular.module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $location, $rootScope, UserService) {
        $scope.isActive = isActive;
        $scope.logout = logout;

        function isActive(path) {
            return $location.url()===path;
        }
        function logout(user) {
            console.log("loginout");
            console.log(user);
            UserService.findUserByCredentials(user.username, user.password, function (loggedInUser) {
                if (loggedInUser != null) {
                    $rootScope.user = null;
                    $location.path("/");
                    alert("Logged out");
                }

            });
        }
    }

})();

