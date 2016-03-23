(function(){
    "use strict";

    angular
        .module("FindGroupApp")
        .controller("groupModalController", groupModalController);


    function groupModalController($route,$rootScope,$routeParams, $scope, $location, groups, clickGroup) {


        $scope.addGroupToGroups = addGroupToGroups;


        function addGroupToGroups(newgroup) {
            console.log(newgroup.ownerName);
            console.log($rootScope.currentUser.username);
            if (newgroup.ownerName != $rootScope.currentUser.username) {
                alert("You have to keep the default ownername!");

            } else {
                var newGroup = {
                    _id: (new Date()).getTime(),
                    title: newgroup.title,
                    ownerName: newgroup.ownerName,
                    description: newgroup.description,
                    address:"undefine",
                    listofEvents:[],
                    listofMembers:[]

                };

                groups.push(newGroup);

                console.log(groups);
                $rootScope.modalInstance.close();
            }


        }

    }
    })();