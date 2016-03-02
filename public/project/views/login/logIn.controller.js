"use strict";

(function() {
    angular.module('FindGroupApp')
        .controller("LogInController", LogInController);

    function LogInController($scope, $location, $rootScope) {

        $scope.$location = $location;

    }
})();