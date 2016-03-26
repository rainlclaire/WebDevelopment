"use strict";

(function() {
    angular.module('FindGroupApp')
        .controller("AdminController", AdminController);

    function AdminController($uibModal, $scope, $routeParams, $location, $rootScope, GroupService, EventService) {
        var model = this;
        var groupid = $routeParams.group_id;


        var user = $rootScope.currentUser;
        //console.log(user);

        if (!user) {
            //console.log(user);
            alert("Access deny! Please make sure you login with correct user");
            $location.url("/login");
        }
        //console.log($rootScope.currentGroup);

        GroupService.findGroupByID(groupid)
        .then(function(theGroup){
            model.currentGroup = theGroup;
        });

        GroupService.findAllGroups()
        .then(function(allGroups){
            model.groups = allGroups;
            console.log("from admin model.groups");
            console.log(model.groups);
        });

        EventService.findAllEvents($rootScope.currentGroup._id)
            .then(function (allEvents) {
                console.log("from admin model.events");

                console.log(allEvents);
                model.events = allEvents;
                console.log(model.events);

            });

        //GroupService.findAllUserForGroup($rootScope.currentGroup,function (allUsers) {
        //    model.users = allUsers;
        //
        //});


        var clickEvent = $rootScope.clickEvent;
        var clickUser = $rootScope.clickUser;


        //function for form
        model.addEventInGroup = addEventInGroup;
        model.updateEventInGroup = updateEventInGroup;
        model.deleteEventInGroup = deleteEventInGroup;
        model.selectEventInGroup = selectEventInGroup;
        model.editGroup = editGroup;

        function editGroup() {
            $rootScope.modalInstance = $uibModal.open({
                templateUrl: "views/admin/editGroup.view.html",
                controller: "editGroupModalController",
                controllerAs: "model",
                size: 'lg',
                resolve: {
                   currentGroup: function() {
                       console.log(model.currentGroup);
                       return model.currentGroup;
                   },
                    groups: function() {
                        return model.groups;
                    }
                }
            })
        }


        //add the form to currentForms
        function addEventInGroup(event) {
            //GroupService.findAllEvents($scope.currentGroup, function (allEvents) {
            //    $scope.events = allEvents;
            //
            //});
            var newEvent = {
                title: event.title,
                date: event.date,
                description: event.description

            };

            //inti the title with empty
            $scope.clickEvent.title = "";
            $scope.clickEvent.date = "";
            $scope.clickEvent.description = "";

            console.log($scope.currentGroup._id);
            EventService.createEvent($scope.currentGroup._id, newEvent)
            .then(function(newEvent){
                console.log(newEvent);
                model.events = newEvent;
                //EventService.findAllEvents($scope.currentGroup._id)
                //.then(function (allEvents){
                //    console.log(allEvents);
                //    model.events = allEvents;
                //
                //});
            });


        }

        //update the select form with the given form info
        function updateEventInGroup(event) {
            console.log(event);
            EventService.updateEventForGroup($scope.currentGroup._id,event._id, event)
            .then(function(updateEvents) {
                console.log(updateEvents);
                model.events = updateEvents;
            });

        }

        //delete the form with given form's index
        function deleteEventInGroup(index) {
            var deletedId = model.events[index]._id;
            console.log("deleteeventid");
            console.log(deletedId);
            EventService.deleteEventById($scope.currentGroup._id, deletedId)
            .then(function(allOtherEvents){
                model.events = allOtherEvents;
            });
        }

        //select the form with given form's index
        function selectEventInGroup(index) {
            //$scope.clickForm.title = $scope.forms[index].title;
            $scope.selectEventIndex = index;
            console.log($scope.selectEventIndex);
            console.log(model.currentGroup.listofEvents);
            $scope.clickEvent = {
                "_id": model.events[index]._id,
                "title":model.events[index].title,
                "date": model.events[index].date,
                "description": model.events[index].description
            };
            //console.log($scope.clickEvent.title);

        }



        model.addUserInGroup = addUserInGroup;
        model.updateUsertInGroup = updateUserInGroup;
        model.deleteUserInGroup = deleteUserInGroup;
        model.selectUserInGroup = selectUserInGroup;

        //add the form to currentForms
        function addUserInGroup(user) {

            var group_id = (new Date()).getTime();
            var newUser = {
                username: user.username,
                group_id:group_id

            };
            //console.log(newUser);

            //inti the title with empty
            $scope.clickUser.useraname = "";


            GroupService.createUserForGroup($rootScope.currentGroup, newUser, function (createdUserForGroup) {
                GroupService.findAllUserForGroup(function (allUsers) {
                    $scope.users = allUsers;
                    //console.log(users);

                });
            });


        }

        //update the select form with the given form info
        function updateUserInGroup(user) {
            if ($scope.selectUserIndex != null) {
                $scope.users[$scope.selectUserIndex].username = user.username;
                $scope.users[$scope.selectUserIndex].group_id = user.group_id;

                //console.log(user);
            } else {
                alert("You have to select an user");
            }
        }

        //delete the form with given form's index
        function deleteUserInGroup(index) {
            var deletedId = $scope.users[index].group_id;
            //console.log(deletedId);
            GroupService.deleteUserById($scope.currentGroup._id, deletedId, function (allOtherUserss) {
                $scope.users = allOtherUserss;
            });
        }

        //select the form with given form's index
        function selectUserInGroup(index) {
            //$scope.clickForm.title = $scope.forms[index].title;
            $scope.selectUserIndex = index;
            //console.log($scope.users[index].username);
            $scope.clickUser = {
                "group_id": $scope.users[index].group_id,
                "username": $scope.users[index].username
            };
            //console.log($scope.clickUser.username);

        }


    }

})();