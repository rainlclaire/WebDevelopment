

"use strict";

(function () {
    angular.module("FindGroupApp")
        .factory("UserService", UserService);


    function UserService($http,$q, $rootScope) {
        //init the current users


        //function implement
        var service = {
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            joinGroup:joinGroup,
            userfavoriteGroups:userfavoriteGroups,
            logout:logout,
            getCurrentUser:getCurrentUser,
            setCurrentUser:setCurrentUser

        };

        return service;

        function setCurrentUser(user) {
            $rootScope.user = user;
        }

        function getCurrentUser(){
            var deferred = $q.defer();
            $http.get("/api/project/loggedin")
                .success(function (response) {
                    console.log(response);
                    deferred.resolve(response);
                });
            return deferred.promise;
        }


        function logout() {
            var deferred = $q.defer();
            $http.post("/api/project/logout")
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function userfavoriteGroups(userid, group) {
            var deferred = $q.defer();
            $http.post("/api/project/user/"+userid+"/userLikeGroup", group)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function joinGroup(userid, group) {
            var deferred = $q.defer();
            $http.post("/api/project/user/"+userid+"/userJoinGroup", group)
                .success(function (response) {
                    console.log(response);
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function findUserByUsername(username) {
            var deferred = $q.defer();
            $http.get("/api/project/user?username=" + username)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        //find user by username and password
        function findUserByCredentials(username, password) {
            var deferred = $q.defer();
            var cred = {
                username:username,
                password:password
            };

            $http.post("/api/project/login", cred)
                .success(function (response) {
                    console.log(response);
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        //find the current all users
        function findAllUsers() {
            var deferred = $q.defer();
            $http.get("/api/project/user")
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
            //callback(currentUser);
        }

        //create the user with give user
        function createUser(user) {
            var deferred = $q.defer();
            $http.post("/api/project/user", user)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
            //var _id = (new Date).getTime();
            //user._id = _id;
            //currentUser.push(user);
            //callback(user);

        }


        //delete the user by finding the user id
        function deleteUserById(id) {

            var deferred = $q.defer();
            $http.delete("/api/project/user/" + id)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }




        //update the user info with given user id, user info, and callback
        function updateUser(id, updatedUser) {
            //console.log(userId);
            //console.log(user);
            //var deferred = $q.defer();
            console.log($http.put("/api/project/user/" + id, updatedUser));
            return $http.put("/api/project/user/" + id, updatedUser);


        }
    }


})();