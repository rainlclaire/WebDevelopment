"use strict";

(function () {
    angular.module("FormBuilderApp")
        .factory("UserService", UserService);


    function UserService($http,$q,$rootScope) {
        //init the current users


        //function implement
        var service = {
            setCurrentUser:setCurrentUser,
            getCurrentUser:getCurrentUser,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            findAllUsersFromAdmin: findAllUsersFromAdmin,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            createUserAdmin:createUserAdmin,
            updateUserAdmin:updateUserAdmin,
            deleteUserAdmin: deleteUserAdmin,
            findUserByIdAdmin:findUserByIdAdmin,
            logout: logout

        };

        return service;

        function logout() {
            var deferred = $q.defer();
            $http.post("/api/assignment/logout")
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function findUserByIdAdmin(userid) {
            var deferred = $q.defer();
            $http.get("/api/assignment/admin/user/"+userid)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }


        function deleteUserAdmin(userid) {
            var deferred = $q.defer();
            $http.delete("/api/assignment/admin/user/"+userid)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }
        function updateUserAdmin(userid, user) {
            var deferred = $q.defer();
            $http.put("/api/assignment/admin/user/"+userid, user)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function createUserAdmin(user) {
            var deferred = $q.defer();
            $http.post("/api/assignment/admin/user", user)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function setCurrentUser(user) {
            $rootScope.user = user;
        }

        function getCurrentUser() {
            var deferred = $q.defer();
            $http.get("/api/assignment/loggedin")
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;

        }

        function findUserByUsername(username) {
            var deferred = $q.defer();
            $http.get("/api/assignment/user?username=" + username)
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

            $http.post("/api/assignment/login", cred)
                .success(function (response) {
                    console.log(response);
                    deferred.resolve(response);
                });
            return deferred.promise;

        }

        //find the current all users
        function findAllUsersFromAdmin() {
            var deferred = $q.defer();
            $http.get("/api/assignment/admin/user")
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
            //callback(currentUser);
        }

        //create the user with give user
            function createUser(user) {
                var deferred = $q.defer();
                $http.post("/api/assignment/user", user)
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
                $http.delete("/api/assignment/user/" + id)
                    .success(function (response) {
                        deferred.resolve(response);
                    });
                return deferred.promise;
            }




            //update the user info with given user id, user info, and callback
            function updateUser(id, updatedUser) {
                console.log("update in cline se");
                var deferred = $q.defer();
                console.log("update in cline se2");
                console.log(updatedUser);
                $http.put("/api/assignment/user/" + id, updatedUser)
                .success(function(response) {
                    console.log("update in cline se3");
                    console.log("respnse form user lcient");
                    console.log(response);
                    deferred.resolve(response);
                });
                return deferred.promise;


            }
        }


})();