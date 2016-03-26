(function(){


    angular
        .module("FindGroupApp")
        .controller("DetailsController", DetailsController);

    function DetailsController($sce, $rootScope,$location, $scope, $routeParams, GroupService,UserService, GoogleMapService) {

        var model = this;

        var group_id = $routeParams.group_id;
        console.log(group_id);

        $rootScope.currentGroupid = group_id;
        console.log("print current Groupid");
        console.log(group_id);


        var currentUser = $rootScope.currentUser;
        //vm.favorite = favorite;

        model.findGroup  = findGroup;
        model.joinGroup = joinGroup;


        model.findGroupMap = findGroupMap;
        model.initGroup = initGroup;
        model.init = init;
        model.favorite = favorite;
        model.manageGroup = manageGroup;
        model.changeBackGround = changeBackGround;


        function changeBackGround(color) {
            console.log("o go t");
            console.log(color);
            document.body.style.background = color;
        }

        GroupService.findAllGroups()
        .then(function(allGroups) {
            model.groups= allGroups;
        });

        console.log(model.groups);




        GroupService.findGroupByID(group_id)
        .then(function(theGroup){
            console.log("here");
            model.group = theGroup;


            $rootScope.currentGroup = model.group;

            console.log($rootScope.group);
        });

        var groups = model.groups;


        //console.log(group.address);
        function findGroup() {
            for(var i =0; i< groups.size; i++) {
                //console.log("aaa");
                if (groups[i]._id == group_id) {
                    var group = groups[i];
                    model.group = group;
                    return group;

                    break;
                }

            }
            return null;
        }

        function initGroup() {

            GroupService.findGroupByID(group_id)
            .then(function (theGroup){
                console.log("here");
                console.log(theGroup);
                model.group = theGroup;
                $rootScope.currentGroup = model.group;
                console.log(model.group);
                init(model.group.address);
            } );

        }

        initGroup();

        function init(groupAddress) {


            var theurl = 'https://www.google.com/maps/embed/v1/place?key=AIzaSyBFek2cKN2fA6seFcgfsEDyhE3CONb0ynM&q='+groupAddress;
            $scope.url = $sce.trustAsResourceUrl(theurl);
            return $sce.trustAsResourceUrl("https://www.google.com/maps/embed/v1/place?key=AIzaSyBFek2cKN2fA6seFcgfsEDyhE3CONb0ynM&q="+groupAddress);

        }
        //init($scope.group.address);


        function manageGroup() {
            if(currentUser.username == $scope.currentGroup.ownerName) {
                console.log("go to admin");
                $location.url("/admin/"+$scope.currentGroup._id);
            }
        }

        function joinGroup() {
            if (currentUser == null) {
                $location.url("/login");
            } else {

                GroupService.userJoinGroup($rootScope.user, group_id)
                    .then(function (usersInGroup) {

                        model.group.listofMembers = usersInGroup;
                        console.log(model.group.listofMembers);
                        UserService.joinGroup(currentUser._id, model.group)
                            .then(function (joinedGroups) {
                                $scope.currentUser.groupJoined = joinedGroups;
                            })
                    });
            }
        }



        //function joinGroup() {
        //    if ($scope.currentUser !=null) {
        //        console.log("joingroup");
        //        console.log($scope.currentUser._id);
        //        var group_id = (new Date()).getTime();
        //        var currentUser = {
        //            "username":$scope.currentUser.username,
        //            "_id":$scope.currentUser._id,
        //            "group_id":group_id
        //
        //        };
        //        $scope.currentGroup.listofMembers.push(currentUser);
        //        $scope.currentUser.groupJoined.push($scope.currentGroup);
        //        console.log($scope.currentUser.groupJoined);
        //        console.log($scope.currentGroup);
        //        alert("success joined")
        //    } else {
        //        alert("You have to login");
        //        $location.url("/login");
        //    }
        //}

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
                alert("success added!")
                }

            else {
                alert("You have to login!");
                $location.url("/login");
            }
        }





    }
})();