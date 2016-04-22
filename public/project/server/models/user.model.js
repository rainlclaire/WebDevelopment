var q = require("q");
var mongoose = require('mongoose');
module.exports = function(app,db) {
    console.log("here");

    var ProjectUserSchema = require("./user.schema.server.js")();
    var projectUser = mongoose.model("projectUser", ProjectUserSchema);
    var api = {
        create: create,
        findAll: findAll,
        findById: findById,
        updateFromUser: updateFromUser,
        remove: remove,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        joinedGroups:joinedGroups,
        userLikeGroup:userLikeGroup
    };

    return api;

    function userLikeGroup(userid, group) {
        console.log("userlike group server");
        console.log(group);
        var deferred = q.defer();
        projectUser.findById(
            userid,
            function(err, user) {
                console.log(user);
                if (!err) {
                    if (user) {
                        user.likeGroups.push(group.title);
                        user.save(function (err) {
                            if (!err) {
                                deferred.resolve(user);
                            } else {
                                deferred.reject(err);
                            }
                        });
                    } else {
                        deferred.reject(err);
                    }
                } else {
                    deferred.reject(err);
                }
            });
        return deferred.promise;
        //for (var i = 0; i < users.length; i++) {
        //    if (users[i].id == userid) {
        //        users[i].likeGroups.push(group);
        //        return users[i].likeGroups;
        //    }
        //}
        //return null;
    }

    function joinedGroups(userid, group) {
        var deferred = q.defer();
        projectUser.findById(
            userid,
            function(err, user) {
                if (!err) {
                    if (user) {
                        user.groupJoined.push(group.title);
                        console.log('joinedGrouphere ----');
                        console.log(user);
                        user.save(function (err) {
                            if (!err) {
                                deferred.resolve(user);
                            } else {
                                deferred.reject(err);
                            }
                        });
                    } else {
                        deferred.reject(err);
                    }
                } else {
                    deferred.reject(err);
                }
            });
        return deferred.promise;



        //});
        //return deferred.promise;
        //console.log(userid);
        //for (var i = 0; i < users.length; i++) {
        //    if (users[i].id == userid) {
        //        users[i].groupJoined.push(group);
        //        return users[i].groupJoined;
        //    }
        //}
        //return null;
    }

    function create(newUser) {
        var deferred = q.defer();
        projectUser.create(newUser, function(err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;

        //newUser  = {
        //    "id":(new Date).getTime(),
        //    "role":[],
        //    "username":newUser.username,
        //    "password":newUser.password,
        //    "groupJoined":[],
        //    "likeGroups":[],
        //    "email":null
        //};
        //
        //users.push(newUser);
        //return newUser;
    }


    function findAll() {
        console.log("findall");
        var deferred = q.defer();
        projectUser.find(function(err, projectUser) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(projectUser);
            }
        });

        return deferred.promise;
        //return users;
    }


    function findById(id) {
        var deferred = q.defer();
        projectUser.findOne(
            {_id:id},
            function (err, projectUser) {
                if (!err) {
                    deferred.resolve(projectUser);
                } else {
                    deferred.reject(err);
                }
            });
        return deferred.promise;

        //for (var i = 0; i < users.length; i++) {
        //    if (users[i].id == id) {
        //        return users[i];
        //    }
        //}
        //return null;
    }

    function updateFromUser(id, updatedUser) {
        console.log(id);
        console.log("update");
        var deferred = q.defer();
        console.log(updatedUser);
        projectUser.findByIdAndUpdate(
            id,
            {$set:updatedUser},{multi:true},
            function (err, stats) {
                if (!err) {
                    deferred.resolve(stats);
                } else {
                    deferred.reject(err);
                }
            }
        );
        return deferred.promise;

        //for (var ii in users) {
        //    if (users[ii].id == id) {
        //        for (var attr in updatedUser) {
        //            if (updatedUser.hasOwnProperty(attr)) {
        //                users[ii][attr] = updatedUser[attr];
        //            }
        //        }
        //        return users[ii];
        //
        //    }
        //}
    }

    function remove(id) {
        var deferred = q.defer();

        projectUser.remove(
            {_id: id},
            function (err, stats) {
                if (!err) {
                    deferred.resolve(stats);
                } else {
                    deferred.reject(err);
                }
            }
        );
        return deferred.promise;
        //for (var i = 0; i < users.length; i++) {
        //    if (users[i].id == id) {
        //        users.splice(i, 1);
        //    }
        //}
    }


    function findUserByUsername(username) {
        console.log("findbyuser");
        var deferred = q.defer();
        projectUser.findOne(
            {username:username},
            function (err, projectUser) {
                console.log(projectUser);
                if (!err) {
                    deferred.resolve(projectUser);
                } else {
                    deferred.reject(err);
                }
            });
        return deferred.promise;
        //for (var i = 0; i < users.length; i++) {
        //    if (users[i].username === username) {
        //        // user found!
        //        return users[i];
        //    }
        //}
        //return null;
    }


    function findUserByCredentials(creds) {
        console.log("findbyuser");
        var deferred = q.defer();
        projectUser.findOne(
            {username:creds.username,
                password:creds.password},
            function (err, projectUser) {
                if (!err) {
                    deferred.resolve(projectUser);
                } else {
                    deferred.reject(err);
                }
            });
        return deferred.promise;
        //var matchedUser = null;
        //for (var i = 0; i < users.length; i++) {
        //    if (users[i].username === creds.username
        //        && users[i].password === creds.password) {
        //        return users[i];
        //    }
        //}
        //return null;
    }

}();
