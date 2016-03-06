(function(){


    angular
        .module("FindGroupApp")
        .controller("DetailsController", DetailsController);

    function DetailsController($rootScope,$location, $scope, $routeParams, GroupService, GoogleMapService) {




        var group_id = $routeParams.group_id;
        console.log(group_id);

        GroupService.findAllGroups(function(allGroups) {
            $scope.groups= allGroups;
        });
        //console.log($scope.groups);
        GroupService.findGroupByID(group_id, function(theGroup) {
            $scope.group = theGroup;
            //console.log($scope.group);
        });

        var groups = $scope.groups;
        //console.log(groups);




        $scope.findGroup  = findGroup;
        $scope.joinGroup = joinGroup;
        $scope.findGroupMap = findGroupMap;

        function findGroup() {
            for(var i =0; i< groups.size; i++) {
                //console.log("aaa");
                if (groups[i]._id == group_id) {
                    var group = groups[i];
                    $scope.group = group;
                    return group;
                    break;
                }

            }
            return null;
        }

        function joinGroup() {
            if ($scope.currentUser !=null) {
                alert("to do this join later");
            } else {
                alert("You have to login");
                $location.url("/login");
            }
        }

        function findGroupMap() {
            console.log($scope.data);
            GoogleMapService.searchMapByAddress(group.address)
                .then(function(response) {
                    $scope.data = response.data;
                });

            console.log($scope.data);
        }





        //console.log($scope.group);
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