"use strict";

(function() {
    angular.module('FormBuilderApp')
        .controller("MainController", MainController);

    function MainController($scope, $location) {
        console.log("main");
        $scope.$location = $location;
    }
})();