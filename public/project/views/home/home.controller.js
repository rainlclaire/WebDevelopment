(function(){
    angular
        .module("FindGroupApp")
        .controller("HomeController", HomeController);

    function HomeController($scope, $routeParams, $location, GroupService) {
        //
        //$scope.groupTitle = "Dancer Club";
        $scope.errorMessage = "";

        //function init() {
        //    var group_title = $routeParams.title;
        //    if(group_title) {
        //        fetchGroup(group_title);
        //    }
        //}
        //init();

        $scope.fetchGroup = fetchGroup;

        function fetchGroup(group_title) {

            GroupService.findGroupsByTitle(group_title, renderGroups);

        }

        function renderGroups(response) {
            console.log(response);
            if(response.length!=0) {
                $location.url("search/{{groupTitle}}");

                $scope.errorMessage = "";

                $scope.groups = response;
            }else{
                alert("no groups found");

                //$scope.errorMessage = "No results found"
            }

            console.log($scope.errorMessage);
        }
    }
})();