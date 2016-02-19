(function () {
    angular.module("FormBuilderApp")
        .controller("HeaderController", function($scope) {
        $scope.$location = $location;
    });
});