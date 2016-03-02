"use strict";

(function() {
    angular.module('FindGroupApp')
        .controller("SignUpController", SignUpController);

    function SignUpController($scope, $location, $rootScope) {
            $scope.$location = $location;


    }
})();