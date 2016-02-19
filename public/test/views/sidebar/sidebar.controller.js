(function () {
    angular.module('FormBuilderApp')
        .controller("SidebarController", SidebarController);

    function SidebarController($scope) {
        console.log("hrre");
        $scope.$location= $location;
    }
})();