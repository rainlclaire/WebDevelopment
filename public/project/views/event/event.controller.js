"use strict";

(function() {
    angular.module('FindGroupApp')
        .controller("EventController", EventController);

    function EventController($scope, $location, $rootScope) {

        $scope.$location = $location;

    }
})();