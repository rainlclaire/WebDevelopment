(function(){
    angular
        .module("FindGroupApp")
        .controller("HomeController", HomeController);

    function HomeController($scope, $routeParams,$rootScope, $location, GroupService) {
        var model = this;
        //$scope.groupTitle = "Dancer Club";
        model.errorMessage = "";

        model.fetchGroup = fetchGroup;
       //console.log($scope.groups);

        function fetchGroup(group_title) {
            console.log("goto fetch group");

            GroupService.findGroupsByTitle(group_title)
            .then(function(groups) {
                model.groups = groups;
            });
            $location.url("/search/{{group_title}}");

        }

        //function renderGroups(response) {
        //    console.log(response);
        //    if(response.length!=0) {
        //        $location.url("search/{{groupTitle}}");
        //
        //        $scope.errorMessage = "";
        //
        //        $scope.groups = response;
        //        console.log($scope.groups);
        //        $rootScope.groups = response;
        //    }else{
        //        alert("no groups found");
        //
        //        //$scope.errorMessage = "No results found"
        //    }
        //
        //    console.log($scope.errorMessage);
        //}
    }
})();