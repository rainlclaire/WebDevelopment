"use strict";

(function () {
    angular.module("FindGroupApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $location, $rootScope) {
        //console.log("hello");
        ////logout function to clear the user info
        //$scope.logout = logout;
        //
        //function logout() {
        //    $rootScope.user = null;
        //    $location.url("/home");
       // }


            $('#ei-slider').eislideshow({
                animation			: 'center',
                autoplay			: true,
                slideshow_interval	: 3000,
                titlesFactor		: 0
            });

    }

})();

