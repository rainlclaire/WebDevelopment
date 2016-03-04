(function(){
    angular
        .module("FindGroupApp")
        .controller("HomeController", HomeController);

    function HomeController($scope, $routeParams,$rootScope, $location, GroupService) {
        //
        //$scope.groupTitle = "Dancer Club";
        $scope.errorMessage = "";

        $scope.fetchGroup = fetchGroup;
       //console.log($scope.groups);

        function fetchGroup(group_title) {

            GroupService.findGroupsByTitle(group_title, renderGroups);

        }

        function renderGroups(response) {
            console.log(response);
            if(response.length!=0) {
                $location.url("search/{{groupTitle}}");

                $scope.errorMessage = "";

                $scope.groups = response;
                $rootScope.groups = response;
            }else{
                alert("no groups found");

                //$scope.errorMessage = "No results found"
            }

            console.log($scope.errorMessage);
        }
    }
})();