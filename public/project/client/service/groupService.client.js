"use strict";

(function () {
    angular.module("FindGroupApp")
        .factory("GroupService", GroupService);

    function GroupService($http, $q) {

        var service = {
            createGroup: createGroup,
            findAllGroups: findAllGroups,
            deleteGroupById: deleteGroupById,
            updateGroupById: updateGroupById,
            findGroupByID: findGroupByID,
            findGroupsByTitle: findGroupsByTitle,
            userJoinGroup:userJoinGroup,
            userLikeGroup:userLikeGroup,
            findAllUserForGroup:findAllUserForGroup
            //findEventByTitle: findEventByTitle
            //findEventByID: findEventByID,
            //createEvent:createEvent,
            //findAllEvents: findAllEvents,
            //deleteEventById: deleteEventById,
            //createUserForGroup: createUserForGroup,
            //findAllUserForGroup:findAllUserForGroup,
            //deleteUserById:deleteUserById

        };

        return service;

        function findAllUserForGroup(groupid) {
            var deferred = $q.defer();
            $http.get("/api/project/group/"+groupid+"/groupUsers")
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function userLikeGroup(user, groupid) {
            var deferred = $q.defer();
            $http.post("/api/project/group/"+groupid+"/userLikeGroup", user)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function userJoinGroup(user, groupid) {
            var deferred = $q.defer();
            $http.post("/api/project/group/"+groupid+"/userJoinGroup", user)
                .success(function (response) {
                    deferred.resolve(response);
                    //$rootScope.groups = response;
                });
            return deferred.promise;
        }


        //create form for user with given user id and form info
        function createGroup(group) {
            var deferred = $q.defer();
            $http.post("/api/project/group", group)
                .success(function (response) {
                    deferred.resolve(response);
                    //$rootScope.groups = response;
                });
            return deferred.promise;


        }



        //find all forms for given user
        function findAllGroups() {
            var deferred = $q.defer();
            $http.get("/api/project/group")
                .success(function (response) {
                    console.log("findallgroups form clinet groups");
                    console.log(response);
                    deferred.resolve(response);

                });

            return deferred.promise;

        }

        function findGroupByID(groupID) {
            console.log("go to group by id");

            var deferred = $q.defer();
            $http.get("/api/project/group/" + groupID)
                .success(function (response) {
                    console.log(response);
                    deferred.resolve(response);
                });
            return deferred.promise;

        }

        function findGroupsByTitle(groupTitle) {
            console.log("find by title in sercice.clinet");
            console.log(groupTitle);
            var deferred = $q.defer();
            console.log($http.get("/api/project/group?title=" + groupTitle));
            $http.get("/api/project/group?title=" + groupTitle)
                .success(function (response) {
                    deferred.resolve(response);
                    console.log(response);
                });
            return deferred.promise;

        }

        //delete form by given form id
        function deleteGroupById(groupId) {
            var deferred = $q.defer();
            $http.delete("/api/project/group/" + groupId)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;


        }


        //update the form by given form's id with new form info
        function updateGroupById(groupId, newGroup) {
            var deferred = $q.defer();
            console.log("update group by id in sevverice client");
            console.log(groupId);
            $http.put("/api/project/group/" + groupId, newGroup)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;


        }


    }

})();