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
        GroupService.findAllGroups()
            .then(function(groups) {
                console.log(groups);

                model.top6 = groups.splice(0,6);
                console.log(model.top6);
            });

        function fetchGroup(group_title) {
            console.log("goto fetch group");

            if (!group_title) {
                alert("Please provider group title");
            } else {
                GroupService.findGroupsByTitle(group_title)
                    .then(function (groups) {
                        console.log(groups);
                        if (groups.length==0) {
                            alert("No result");
                            $location.url("/home");
                        }
                        else if (groups) {
                            $rootScope.groups = groups;
                            console.log($rootScope.groups);
                            $location.url("/search/{{group_title}}")
                        } else {
                            alert("error");
                        }
                    });

            }
        }

    }
})();