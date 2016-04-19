"use strict";

(function () {
    angular.module("FindGroupApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $location, $rootScope, UserService) {
        //console.log("hello");
        ////logout function to clear the user info
        //$scope.logout = logout;
        //
        $scope.isActive = isActive;
        //logout function to clear the user info
        $scope.logout = logout;


        function isActive(path) {
            return $location.url()===path;
        }
        function logout() {
            UserService.logout()
                .then(function () {
                    $rootScope.user = null;
                    $location.path("/home");
                });


    }




            $('#ei-slider').eislideshow({
                animation			: 'center',
                autoplay			: true,
                slideshow_interval	: 3000,
                titlesFactor		: 0
            });

    }

})();

