"use strict";

(function() {
    angular.module('FindGroupApp')
        .controller("AdminController", AdminController);

    function AdminController($scope,$routeParams, $location, $rootScope,GroupService,EventService) {
        var model = this;


        var user = $rootScope.currentUser;
        //console.log(user);

        if (!user) {
            //console.log(user);
            alert("Access deny! Please make sure you login with correct user");
            $location.url("/login");
        }
        //console.log($rootScope.currentGroup);

        GroupService.findAllGroups(function(allGroups) {
            model.groups = allGroups;
            console.log("from admin model.groups");
            console.log(model.groups);
        });

        EventService.findAllEvents($rootScope.currentGroup._id)
        .then(function(allEvents){
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

            EventService.createEvent($scope.currentGroup._id, newEvent)
            .then(function(newEvent){
                EventService.findAllEvents($scope.currentGroup._id)
                .then(function (allEvents){
                    model.events = allEvents;

                });
            });


        }

        //update the select form with the given form info
        function updateEventInGroup(event) {

            if ($scope.selectEventIndex != null) {
                $scope.events[$scope.selectEventIndex].title = event.title;
                $scope.events[$scope.selectEventIndex]._id = event._id;
                $scope.events[$scope.selectEventIndex].date = event.date;
                $scope.events[$scope.selectEventIndex].description = event.description;

                //console.log(event);
            } else {
                alert("You have to select a Form");
            }
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
            $scope.clickEvent = {
                "_id": $scope.events[index]._id,
                "title": $scope.events[index].title,
                "date": $scope.events[index].date,
                "description": $scope.events[index].description
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