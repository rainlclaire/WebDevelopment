(function(){


    angular
        .module("FindGroupApp")
        .controller("DetailsController", DetailsController);

    function DetailsController($sce, $rootScope,$location, $scope, $routeParams, GroupService, GoogleMapService) {

        var vm = this;

        var group_id = $routeParams.group_id;
        console.log(group_id);

        $rootScope.currentGroupid = group_id;


        var currentUser = $rootScope.currentUser;
        //vm.favorite = favorite;




        $scope.findGroup  = findGroup;
        $scope.joinGroup = joinGroup;


        $scope.findGroupMap = findGroupMap;

        $scope.init = init;
        $scope.favorite = favorite;
        $scope.manageGroup = manageGroup;


        GroupService.findAllGroups(function(allGroups) {
            $scope.groups= allGroups;
        });
        console.log($scope.groups);


        GroupService.findGroupByID(group_id, function(theGroup) {
            console.log("here");
            $scope.group = theGroup;


            $rootScope.currentGroup = $scope.group;
            console.log($rootScope.group);
        });





        var groups = $scope.groups;

        console.log($rootScope.group);






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
        init($scope.group.address);


        function manageGroup() {
            if(currentUser.username = $scope.currentGroup.ownerName) {
                console.log("go to admin");
                $location.url("/admin");
            }
        }



        function joinGroup() {
            if ($scope.currentUser !=null) {
                $scope.currentGroup.listofMembers.push($scope.currentUser);
                $scope.currentUser.groupJoined.push($scope.currentGroup);
                console.log($scope.currentUser.groupJoined);
                console.log($scope.currentGroup);
                alert("success joined")
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

        function favorite(group) {
            if (currentUser) {
                $scope.currentUser.likeGroups.push(group);
                console.log($scope.currentUser);
                }

            else {
                $location.url("/login");
            }
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