(function(){
    "use strict";

    angular
        .module("FindGroupApp")
        .controller("groupModalController", groupModalController);


    function groupModalController($route,$rootScope,$routeParams, $scope, $location, groups, clickGroup, GroupService) {
        var model = this;

        model.addGroupToGroups = addGroupToGroups;


        function addGroupToGroups(newgroup) {
            console.log(newgroup.ownerName);
            console.log($rootScope.currentUser.username);
            if (newgroup.ownerName != $rootScope.currentUser.username) {
                alert("You have to keep the default ownername!");

            } else {
                var newGroup = {
                    _id: newgroup._id,
                    title: newgroup.title,
                    ownerName: newgroup.ownerName,
                    description: newgroup.description,
                    address:newgroup.address,
                    listofEvents:[],
                    listofMembers:[]

                };
                GroupService.createGroup(newGroup)
                .then(function(theGroup) {
                    console.log(theGroup);
                    groups.push(theGroup);

                });

                //groups.push(newGroup);

                console.log(groups);
                $rootScope.modalInstance.close();
            }


        }

    }
    })();