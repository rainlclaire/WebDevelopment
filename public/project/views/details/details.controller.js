(function(){


    angular
        .module("FindGroupApp")
        .controller("DetailsController", DetailsController);

    function DetailsController($sce, $rootScope,$location, $scope, $routeParams, GroupService, GoogleMapService) {

        var vm = this;

        var group_id = $routeParams.group_id;
        console.log(group_id);

        var currentUser = $rootScope.currentUser;
        //vm.favorite = favorite;




        GroupService.findAllGroups(function(allGroups) {
            $scope.groups= allGroups;
        });
        //console.log($scope.groups);
        GroupService.findGroupByID(group_id, function(theGroup) {
            $scope.group = theGroup;
            //console.log("here");
            //console.log($scope.group);
        });

        var groups = $scope.groups;
        //console.log(groups);




        $scope.findGroup  = findGroup;
        $scope.joinGroup = joinGroup;
        $scope.findGroupMap = findGroupMap;
        $scope.init = init;

        //console.log(group.address);
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
        function init(groupAddress) {

            var theurl = 'https://www.google.com/maps/embed/v1/place?key=AIzaSyBFek2cKN2fA6seFcgfsEDyhE3CONb0ynM&q='+groupAddress;
            $scope.url = $sce.trustAsResourceUrl(theurl);
            return $sce.trustAsResourceUrl("https://www.google.com/maps/embed/v1/place?key=AIzaSyBFek2cKN2fA6seFcgfsEDyhE3CONb0ynM&q="+groupAddress);

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

            //console.log($scope.data);
            GoogleMapService.searchMapByAddress(group.address)
                .then(function(response) {
                    $scope.data = response.data;
                });
            //
            //console.log($scope.data);
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