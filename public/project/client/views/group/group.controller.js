"use strict";

(function() {
    angular.module('FindGroupApp')
        .controller("GroupController", GroupController);

    function GroupController($scope, $uibModal,$location, $rootScope, GroupService, GoogleMapService) {
        var model = this;
        var user = $rootScope.currentUser;


        function init() {
            GroupService.findAllGroups()
            .then(function(groups) {
                console.log("from group contrller");
                console.log(groups);
                model.groups = groups;
            });
        }
        init();



        var clickGroup = $rootScope.clickGroup;
        //function for form
        model.addGroup = addGroup;
        model.updateGroup = updateGroup;
        model.deleteGroup = deleteGroup;
        model.selectGroup = selectGroup;
        model.addGroup2 = addGroup2;


        //add the form to currentForms
        function addGroup(group) {
            var newGroup = {
                title: group.title,
                _id: group._id,
                ownerName: group.ownerName,
                description: group.description,
                listofEvents: group.listofEvents,
                address: group.address
            };

            //inti the title with empty
            model.clickGroup.title = "";
            model.clickGroup.ownerName = "";
            model.clickGroup.address = "";
            model.clickGroup.description = "";
            model.clickGroup.listofEvents = "";

            GroupService.createGroup(newGroup)
            .then(function(newGroup){
                GroupService.findAllGroups()
                .then(function(allGroups) {
                    model.groups = allGroups;

                });
            });
        }

        function addGroup2() {
            if ($rootScope.currentUser == null){
                alert("You have to login/register");
                $location.url("/login");

            } else {
                $rootScope.modalInstance = $uibModal.open({
                    templateUrl: "views/group/addGroupModal.html",
                    controller: "groupModalController",
                    controllerAs:"model",
                    size: 'lg',
                    resolve: {
                        clickGroup: function () {
                            return model.clickGroup;
                        },
                        groups: function() {
                            return model.groups;
                        }

                    }
                })
            }
        }



        //update the select form with the given form info
        function updateGroup(group) {
            if (model.selectGroupIndex != null) {
                model.groups[model.selectGroupIndex]._id = group._id;
                model.groups[model.selectGroupIndex].title = group.title;
                model.groups[model.selectGroupIndex].adress = group.adress;
                model.groups[model.selectGroupIndex].description = group.description;
                model.groups[model.selectGroupIndex].ownerName = group.ownerName;
                model.groups[model.selectGroupIndex].listofEvents = group.listofEvents;
                model.groups[model.selectGroupIndex].listofMembers = group.listofMembers;
                console.log(group);
            } else {
                alert("You have to select a Form");
            }
        }

        //delete the form with given form's index
        function deleteGroup(index) {
            var deletedId = model.groups[index]._id;
            if (user == null) {
                alert("you are not the administration");
                $location.url("/login");
            }
            if (model.groups[index].ownerName == user.username) {
                console.log(deletedId);
                GroupService.deleteGroupById(deletedId)
                    .then(function (allOtherGroups) {
                        model.groups = allOtherGroups;
                    });
            } else {
                alert("you have not the owner of the group, you cannot delete it");
            }
        }

        //select the form with given form's index
        function selectGroup(index) {
            //$scope.clickForm.title = $scope.forms[index].title;
            model.selectGroupIndex = index;
            console.log($scope.groups[index].ownerName);
            model.clickGroup = {
                "_id": model.groups[index]._id,
                "title": model.groups[index].title,
                "address": model.groups[index].address,
                "ownerName": model.groups[index].ownerName,
                "description": model.groups[index].description,
                "listofEvents": model.groups[index].listofEvents,
                "listofMembers":model.groups[index].listofMembers
            };
            console.log(model.clickGroup.ownerName);

        }


    }


})();