"use strict";

(function () {
    angular.module("FormBuilderApp")
        .factory("UserService", UserService);


    function UserService() {
        //init the current users
        var currentUser = [
            {        "_id":123, "firstName":"Alice",            "lastName":"Wonderland",
                "username":"alice",  "password":"alice",   "roles": ["student"]                },
            {        "_id":234, "firstName":"Bob",              "lastName":"Hope",
                "username":"bob",    "password":"bob",     "roles": ["admin"]                },
            {        "_id":345, "firstName":"Charlie",          "lastName":"Brown",
                "username":"charlie","password":"charlie", "roles": ["faculty"]                },
            {        "_id":456, "firstName":"Dan",              "lastName":"Craig",
                "username":"dan",    "password":"dan",     "roles": ["faculty", "admin"]},
            {        "_id":567, "firstName":"Edward",           "lastName":"Norton",
                "username":"ed",     "password":"ed",      "roles": ["student"]                }
        ];

        //function implement
        var service = {
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser

        };

        return service;

        //find user by username and password
        function findUserByCredentials(username, password, callback) {
            var result = null; //set the result to null
            //iterate the current users
            for (var i = 0; i < currentUser.length; i++) {
                if ((currentUser[i].username == username) && (currentUser[i].password = password)) {
                    result = currentUser[i];
                }
            }
            callback(result);
        }

        //find the current all users
        function findAllUsers(callback) {
            callback(currentUser);
        }

        //create the user with give user
        function createUser(user, callback) {
            var _id = (new Date).getTime();
            user._id = _id;
            currentUser.push(user);
            callback(user);

        }

        //delete the user by finding the user id
        function deleteUserById(userId, callback) {
            //iterate the currentUser
            for (var i = 0; i < currentUser.length; i++) {
                if (userId == currentUser[i]._id) {
                    currentUser.splice(i, 1);
                    callback(currentUser);
                    break;
                }
            }

        }

        //update the user info with given user id, user info, and callback
        function updateUser(userId, user, callback) {
            for (var i = 0; i < currentUser.length; i++) {
                if (userId == currentUser[i].id) {
                    //update the user with given data
                    for (var attr in user) {
                        if (user.hasOwnProperty(attr))
                            currentUser[i][attr] = user[attr];
                    }
                    callback(user);
                    break;
                }
            }

        }
    }

})();