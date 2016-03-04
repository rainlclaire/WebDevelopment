(function(){


    angular
        .module("FindGroupApp")
        .controller("DetailsController", DetailsController);

    function DetailsController($rootScope,$scope, $routeParams, GroupService) {

        var group_id = $routeParams.group_id;
        console.log(group_id);
        GroupService.findAllGroups(function(allGroups) {
            $scope.groups= allGroups;
        });

        GroupService.findGroupByID(group_id, function(theGroup) {
            $scope.group = theGroup;
            console.log($scope.group);
        });

        var groups = $scope.groups;

        $scope.findGroup  = findGroup;


        function findGroup() {
            for(var i =0; i< groups.size; i++) {
                console.log("aaa");
                if (groups[i]._id == group_id) {
                    var group = groups[i];
                    $scope.group = group;
                    return group;
                    break;
                }

            }
            return null;
        }


        console.log($scope.group);
        //var vm = this;
        //
        //var group_id = $routeParams.group_id;
        //console.log(group_id);
        //
        //function init() {
        //    fetchGroup(group_id);
        //}
        //init();
        //
        //function fetchGroup(group_id) {
        //    MovieService.findMovieByImdbId(group_id, renderDetails);
        //}
        //
        //function renderDetails(response) {
        //    console.log(response);
        //    vm.details = response;
        //}
    }
})();