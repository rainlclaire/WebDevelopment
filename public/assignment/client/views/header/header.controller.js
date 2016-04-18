"use strict";

(function () {
    angular.module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $location, $rootScope, UserService) {
        $scope.isActive = isActive;
        //logout function to clear the user info
        $scope.logout = logout;


        function isActive(path) {
            return $location.url()===path;
        }
        function logout() {
            UserService.logout()
            .then(function() {
                $rootScope.user = null;
                $location.path("/home");
            });
            //$rootScope.user = null;
            //$location.path("/home");
            //UserService.findUserByCredentials(user.username, user.password)
            //.then(function(loggedInUser) {
            //    if (loggedInUser != null) {
            //        //set the current user to null
            //        $rootScope.user = null;
            //        //go to home page
            //        $location.path("/");
            //        alert("Logged out");
            //    }
            //
            //});
        }
    }

})();
