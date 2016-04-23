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


        var user = $rootScope.user;
        console.log($rootScope.user);
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
                for (var i =0; i<allGroups.length;i++) {
                    allGroups[i].htmlVariable = $sce.trustAsHtml(allGroups[i].htmlVariable);

                }
                model.groups= allGroups;
            });

        console.log(model.groups);




        GroupService.findGroupByID(group_id)
            .then(function(theGroup){
                theGroup.htmlVariable = $sce.trustAsHtml(theGroup.htmlVariable);
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
                    group.htmlVariable = $sce.trustAsHtml(group.htmlVariable);
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
                    theGroup.htmlVariable = $sce.trustAsHtml(theGroup.htmlVariable);
                    model.group = theGroup;
                    $rootScope.currentGroup = model.group;
                    console.log(model.group);
                    init(model.group.address);
                } );

        }

        initGroup();

        function init(groupAddress) {


            console.log(groupAddress);
            var theurl = 'https://www.google.com/maps/embed/v1/place?key=AIzaSyBFek2cKN2fA6seFcgfsEDyhE3CONb0ynM&q='+groupAddress;
            $scope.url = $sce.trustAsResourceUrl(theurl);
            console.log($scope.url);
            return $sce.trustAsResourceUrl("https://www.google.com/maps/embed/v1/place?key=AIzaSyBFek2cKN2fA6seFcgfsEDyhE3CONb0ynM&q="+groupAddress);

        }
        //init($scope.group.address);


        function manageGroup() {
            if(user.username == $scope.currentGroup.ownerName) {
                console.log("go to admin");
                $location.url("/admin/"+$scope.currentGroup._id);
            }
        }

        function joinGroup() {
            if ($rootScope.user == null) {
                $location.url("/login");
            } else {
                console.log("here to go");

                GroupService.findGroupByID(group_id)
                    .then(function (userInGroup) {
                        if (userInGroup.listofMembers.length > 0) {
                            for (var i = 0; i < userInGroup.listofMembers.length; i++) {
                                if (userInGroup.listofMembers[i]._id = $rootScope.user._id) {
                                    console.log("go to if");
                                    $rootScope.join = true;
                                    alert("You already join the group");
                                    break;
                                }
                            }
                        } else {
                            GroupService.userJoinGroup($rootScope.user, group_id)
                                .then(function (usersInGroup) {
                                    console.log(usersInGroup);

                                    model.group.listofMembers = usersInGroup.listofMembers;
                                    console.log($rootScope.user._id);
                                    UserService.joinGroup($rootScope.user._id, model.group)
                                        .then(function (user) {
                                            console.log(user);
                                            $rootScope.join = true;
                                            $scope.user.groupJoined = user.groupJoined;
                                        })
                                });

                        }
                    });
                if (!$rootScope.join) {
                    GroupService.userJoinGroup($rootScope.user, group_id)
                        .then(function (usersInGroup) {
                            console.log(usersInGroup);

                            model.group.listofMembers = usersInGroup.listofMembers;
                            console.log($rootScope.user._id);
                            UserService.joinGroup($rootScope.user._id, model.group)
                                .then(function (user) {
                                    console.log(user);
                                    $scope.user.groupJoined = user.groupJoined;
                                })
                        });

                }
            }
        }

        function favorite() {
            if ($rootScope.user == null) {
                $location.url("/login");
            } else {
                GroupService.findGroupByID(group_id)
                    .then(function (userInGroup) {
                        console.log(userInGroup);
                        if (userInGroup.usersLikeGroup.length > 0) {
                            for (var i = 0; i < userInGroup.usersLikeGroup.length; i++) {
                                if (userInGroup.usersLikeGroup[i]._id = $rootScope.user._id) {
                                    console.log("go to if");
                                    $rootScope.fav = true;
                                    alert("You already like the group");
                                    break;
                                }

                            }
                        } else {
                            $("span.glyphicon-star-empty").removeClass('glyphicon-star-empty').addClass('glyphicon-star');
                            GroupService.userLikeGroup($rootScope.user, group_id)
                                .then(function (usersLikeGroup) {
                                    console.log(usersLikeGroup);
                                    model.group.usersLikeGroup = usersLikeGroup.usersLikeGroup;
                                    console.log($rootScope.user._id);
                                    UserService.userfavoriteGroups($rootScope.user._id, model.group)
                                        .then(function (user) {
                                            console.log(user);
                                            $rootScope.fav = true;
                                            $scope.user.likeGroups = user.likeGroups;
                                        })
                                });
                        }
                    });
                if (!$rootScope.fav) {
                    $("span.glyphicon-star-empty").removeClass('glyphicon-star-empty').addClass('glyphicon-star');
                    GroupService.userLikeGroup($rootScope.user, group_id)
                        .then(function (usersLikeGroup) {
                            console.log(usersLikeGroup);
                            model.group.usersLikeGroup = usersLikeGroup.usersLikeGroup;
                            console.log($rootScope.user._id);
                            UserService.userfavoriteGroups($rootScope.user._id, model.group)
                                .then(function (user) {
                                    console.log(user);
                                    $scope.user.likeGroups = user.likeGroups;
                                })
                        });


                }
            }
        }


        function findGroupMap() {
            console.log("findgroup map");
            //console.log($scope.data);
            GoogleMapService.searchMapByAddress(model.group.address)
                .then(function(response) {
                    $scope.data = response.data;
                });
            //
            //console.log($scope.data);
        }







    }
})();