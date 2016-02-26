"use strict";

(function () {
    angular.module("FormBuilderApp")
        .factory("UserService", UserService);


    function UserService() {

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
        ]


        var service = {
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            findUserByUser: findUserByUser
        };



        return service;

        function findUserByUser(username, callback) {
            var result = null;
            for (var i = 0; i < currentUser.length; i++) {
                if (currentUser[i].username == username) {
                    result = currentUser[i];
                }
            }
            callback(result);
        }


        function findUserByCredentials(username, password, callback) {
            var result = null;
            for (var i = 0; i < currentUser.length; i++) {
                if ((currentUser[i].username == username) && (currentUser[i].password = password)) {
                    result = currentUser[i];
                }
            }
            callback(result);
        }

        function findAllUsers(callback) {
            callback(currentUser);
        }

        function createUser(user, callback) {
            var _id = (new Date).getTime();
            user.userId = _id;

            //var user = {
            //    _id: user._id,
            //    username: user.username,
            //    password: user.password,
            //    verifyPassword: user.verifyPassword,
            //    email: user.email
            //}
            currentUser.push(user);
            callback(user);

        }

        function deleteUserById(userId, callback) {
            for (var i = 0; i< currentUser.length; i++) {
                if (userId == currentUser[i].id) {
                    currentUser.splice(i, 1);
                    callback(currentUser);
                    break;
                }
            }

        }

        function updateUser(userId, user, callback) {
            for (var i =0; i< currentUser.length; i++) {
                if (userId == currentUser[i].id){

                    //currentUser[i].firstName = user.firstName;
                    //
                    //currentUser[i].lastName = user.lastName;
                    //currentUser[i].password = user.password;
                    console.log(user);
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