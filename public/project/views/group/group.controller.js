"use strict";

(function() {
    angular.module('FindGroupApp')
        .controller("GroupController", GroupController);

    function GroupController($scope, $rootScope, GroupService, GoogleMapService) {

        var user = $rootScope.currentUser;

            GroupService.findAllGroups(function(allGroups) {
                $scope.groups= allGroups;

            });



        var clickGroup  = $rootScope.clickGroup;
        //function for form
        $scope.addGroup = addGroup;
        $scope.updateGroup = updateGroup;
        $scope.deleteGroup = deleteGroup;
        $scope.selectGroup = selectGroup;
        $scope.search = search;


        function search(group) {
            console.log("serach");
            GoogleMapService.searchMapByAddress(group.address)
                .then(function(response) {
                    $rootScope.data = response.data;
                });

            console.log($rootScope.data);
        }

        //add the form to currentForms
        function addGroup(group) {
            var newGroup= {
                title: group.title,
                _id: group._id,
                ownerName: group.ownerName,
                description:group.description,
                listofEvents:group.listofEvents,
                address:group.address
            };

            //inti the title with empty
            $scope.clickGroup.title="";
            $scope.clickGroup.ownerName="";
            $scope.clickGroup.description="";
            $scope.clickGroup.listofEvents="";

            GroupService.createGroup(newGroup, function(createdGroups) {
                GroupService.findAllGroups(function(allGroups) {
                    $scope.groups = allGroups;

                });
            });
        }

        //update the select form with the given form info
        function updateGroup(group) {
            if ($scope.selectGroupIndex != null) {
                $scope.groups[$scope.selectGroupIndex]._id = group._id;
                $scope.groups[$scope.selectGroupIndex].title = group.title;
                $scope.groups[$scope.selectGroupIndex].adress = group.adress;
                $scope.groups[$scope.selectGroupIndex].description = group.description;
                $scope.groups[$scope.selectGroupIndex].ownerName = group.ownerName;
                $scope.groups[$scope.selectGroupIndex].listofEvents = group.listofEvents;

            } else {
                alert("You have to select a Form");
            }
        }

        //delete the form with given form's index
        function deleteGroup(index) {
            var deletedId = $scope.groups[index]._id;
            console.log(deletedId);
            GroupService.deleteGroupById(deletedId, function(allOtherGroups) {
                $scope.groups = allOtherGroups;
            });
        }

        //select the form with given form's index
        function selectGroup(index) {
            //$scope.clickForm.title = $scope.forms[index].title;
            $scope.selectGroupIndex = index;
            console.log($scope.groups[index].ownerName);
            $scope.clickGroup = {
                "_id": $scope.groups[index]._id,
                "title": $scope.groups[index].title,
                "address": $scope.groups[index].address,
                "ownerName": $scope.groups[index].ownerName,
                "description": $scope.groups[index].description,
                "listofEvents:": $scope.groups[index].listofEvents
            };
            console.log($scope.clickGroup.ownerName);

        }

    }
})();