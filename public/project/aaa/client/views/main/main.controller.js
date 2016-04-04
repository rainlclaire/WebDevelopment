"use strict";

(function() {
    angular.module('FindGroupApp')
        .controller("MainController", MainController);

    function MainController($scope, $location) {
        $scope.$location = $location;
    }
})();