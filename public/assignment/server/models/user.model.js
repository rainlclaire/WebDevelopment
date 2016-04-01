var users = require("./user.mock.json");

var q = require("q");

module.exports = function(db,mongoose) {

    var UserSchema = require("./user.schema.server.js")(mongoose);
    var assignmentUser = mongoose.model("assignmentUser", UserSchema);
    var api = {
        create:create,
        findAll: findAll,
        findById:findById,
        update: update,
        remove:remove,
        findUserByUsername:findUserByUsername,
        findUserByCredentials: findUserByCredentials
    };

    return api;

    function create(newUser) {

        var deferred = q.defer();
        assignmentUser.create(newUser, function(err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }


    function findAll() {
        var deferred = q.defer();
        assignmentUser.find(function(err, assignmentUser) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(assignmentUser);
            }
        });

        return deferred.promise;

        //return users;
    }


    function findById(id) {
        var deferred = q.defer();
        assignmentUser.findOne(
            {_id:id},
        function (err, assignmentUser) {
            if (!err) {
                deferred.resolve(assignmentUser);
            } else {
                deferred.reject(err);
            }
        });
        return deferred.promise;
        //for(var i = 0; i< users.length; i++) {
        //    if (users[i].id  == id) {
        //        return users[i];
        //    }
        //}
        //return null;
    }

    function update(id, updatedUser) {
        console.log("check for id");
        console.log(id);
        var deferred = q.defer();
        console.log(updatedUser);
        assignmentUser.findByIdAndUpdate(
            id,
            {$set:updatedUser},
            {new:true},
            function (err, stats) {
                if (!err) {
                    console.log(stats);
                    //stats.email = stats.email.split(",");
                    console.log(stats);
                    deferred.resolve(stats);
                } else {
                    deferred.reject(err);
                }
            }
        );
        return deferred.promise;

    }

    function remove(id) {
        var deferred = q.defer();

        assignmentUser.remove(
            {_id: id},
            function (err, stats) {
                if (!err) {
                    deferred.resolve(stats);
                } else {
                    deferred.rej(err);
                }
            }
        );
        return deferred.promise;

    }


    function findUserByUsername(username) {
        var deferred = q.defer();
        assignmentUser.findOne(
            {username:username},
            function (err, assignmentUser) {
                if (!err) {
                    deferred.resolve(assignmentUser);
                } else {
                    deferred.reject(err);
                }
            });
        return deferred.promise;
        //for(var i = 0; i < users.length; i++) {
        //    if(users[i].username === username) {
        //        // user found!
        //        return users[i];
        //    }
        //}
        //return null;
    }


    function findUserByCredentials(creds) {
        var deferred = q.defer();
        assignmentUser.findOne(
            {username:creds.username,
            password:creds.password},
            function (err, assignmentUser) {
                if (!err) {
                    deferred.resolve(assignmentUser);
                } else {
                    deferred.reject(err);
                }
            });
        return deferred.promise;
    }
};