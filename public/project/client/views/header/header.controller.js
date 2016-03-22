"use strict";

(function () {
    angular.module("FindGroupApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $location, $rootScope, UserService) {
        console.log("hello");
        //logout function to clear the user info
        $scope.logout = logout;

        function logout() {
            $rootScope.user = null;
            $location.url("/home");
        }
}

})();

