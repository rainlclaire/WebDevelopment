//(function() {
//    angular
//        .module("FindGroupApp")
//        .factory("UserService", UserService);
//
//    function UserService($rootScope) {
//        var model = {
//            users: [
//                {username: "alice", password: "alice", roles: ["student"], groupJoined:[],likeGroups:[], email:"aaa@gmail.com"},
//                {username: "bob", password: "bob", roles: ["faculty", "admin"], groupJoined:[],likeGroups:[],email:"bbb@gmail.com"},
//                {username: "charlie", password: "charlie", roles: ["employee"], groupJoined:[],likeGroups:[], email:"ccc@gmail.com"}
//            ],
//            createUser: createUser,
//            findUserByUsername: findUserByUsername,
//            findUserByCredentials: findUserByCredentials,
//            updateUser: updateUser,
//            setCurrentUser: setCurrentUser,
//            getCurrentUser: getCurrentUser
//        };
//        return model;
//
//        function setCurrentUser (user) {
//            $rootScope.currentUser = user;
//        }
//
//        function getCurrentUser () {
//            return $rootScope.currentUser;
//        }
//
//        function createUser (user) {
//            var user = {
//                username: user.username,
//                password: user.password,
//            };
//            model.users.push(user);
//            return user;
//        }
//        function findAllUsers(callback) {
//            console.log(model.users);
//            callback(model.users);
//        }
//
//        function findUserByUsername (username) {
//            for (var u in model.users) {
//                if (model.users[u].username === username) {
//                    return model.users[u];
//                }
//            }
//            return null;
//        }
//
//        function findUserByCredentials(credentials) {
//            for (var u in model.users) {
//                if (model.users[u].username === credentials.username &&
//                    model.users[u].password === credentials.password) {
//                    return model.users[u];
//                }
//            }
//            return null;
//        }
//
//
//        function updateUser (currentUser) {
//            var user = model.findUserByUsername (currentUser.username);
//            if (user != null) {
//
//                user.firstName = currentUser.firstName;
//                user.lastName = currentUser.lastName;
//                user.email = currentUser.email;
//                user.password = currentUser.password;
//                return user;
//            } else {
//                return null;
//            }
//        }
//
//
//
//
////    }
//})();

"use strict";

(function () {
    angular.module("FindGroupApp")
        .factory("UserService", UserService);


    function UserService($http,$q) {
        //init the current users


        //function implement
        var service = {
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser

        };

        return service;

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
            console.log("userservice");
            console.log($http.get("/api/assignment/user?username=" + username + "&password=" + password));
            $http.get("/api/assignment/user?username=" + username + "&password=" + password)
                .success(function (response) {
                    console.log(response);
                    deferred.resolve(response);
                });
            return deferred.promise;
            //var result = null; //set the result to null
            ////iterate the current users
            //for (var i = 0; i < currentUser.length; i++) {
            //    if ((currentUser[i].username == username) && (currentUser[i].password = password)) {
            //        result = currentUser[i];
            //    }
            //}
            //callback(result);
        }

        //find the current all users
        function findAllUsers() {
            var deferred = $q.defer();
            $http.get("/api/assignment/user")
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
            //console.log(userId);
            //console.log(user);
            //var deferred = $q.defer();
            console.log($http.put("/api/project/user/" + id, updatedUser));
            return $http.put("/api/project/user/" + id, updatedUser);


        }
    }


})();