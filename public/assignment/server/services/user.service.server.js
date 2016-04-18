var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function (app, model, db) {
    var auth = authorized;
    app.post("/api/assignment/user", createUser);
    //app.get("/api/assignment/user", findUsers);
    app.get("/api/assignment/user/:id", findUserById);
    //to comment out here
    app.get("/api/assignment/user?username=username", findUserByUsername);
    //app.get("/api/assignment/user?username=alice&password=alice", findAlice);
    //end
    app.put("/api/assignment/user/:id", auth,updateUser);
    //app.delete("/api/assignment/user/:id",auth, deleteUser);
    app.post("/api/assignment/login", passport.authenticate("local"), login);
    app.post("/api/assignment/logout", logout);
    app.get("/api/assignment/loggedin", loggedin);
    app.get("/api/assignment/loggedin/:id", getUpdatedCurrentUser);
    app.get("/api/assignment/admin/user/:id", findUserByIdFromAdmin);
    app.post("/api/assignment/admin/user", createUserFromAdmin);
    app.get("/api/assignment/admin/user", findAllUsersFromAdmin);
    app.put("/api/assignment/admin/user/:id", updateUserByIdFromAdmin);
    app.delete("/api/assignment/admin/user/:id", deleteUserByIdFromAdmin);

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }
    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function localStrategy(username, password, done) {
        model
            .findUserByCredentials({username: username, password: password})
            .then(
                function(user) {
                    if (!user) {
                        return done(null, false);
                    }
                    return done(null, user);
                },
                function(err) {
                    if (err) {
                        return done(err);
                    }
                }
            );
    }

    // serialize the user object into the session
    function serializeUser(user, done) {
        done(null, user);
    }

    // retrieve the user object from the session
    function deserializeUser(user, done) {
        model
            .findById(user._id)
            .then(
                function(user) {
                    done(null, user);
                },
                function(err) {
                    done(err, null);
                }
            );
    }

    // determine whether the user is admin or not
    function isAdmin(user) {
        if (user.roles.indexOf("admin") >-1) {
           return true;
        }
        return false;
    }

    // implement authorized function
    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }



    function createUser(req, res) {

        var user = req.body;
        user.roles = ["student"];
        model.
        create(user)
        .then(
            function(user) {

                return req.login(user,function(err) {
                    if (err) {
                        res.status(400).send(err);
                    } else {
                        res.json(user);
                    }
                });

            },
            function(err) {
                res.status(400).send(err);
            });

    }
    function findAllUsersFromAdmin(req, res) {
        model
            .findAll()
            .then(
                function(doc) {
                    res.json(doc);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function findUserByCredentials(req, res) {
        var credentials = {
            username: req.query.username,
            password: req.query.password
        };

        model
            .findUserByCredentials(credentials)
            .then(
                function(doc) {
                    res.json(doc);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }
    //
    //function findUsers(req, res) {
    //    if (req.query.username && req.query.password) {
    //        findUserByCredentials(req, res);
    //    }
    //    else if (req.query.username) {
    //        findUserByUsername(req, res);
    //    }
    //    }



        //console.log("findUsers");
        //var reqUsername = req.query.username;
        //var reqPassword = req.query.password;
        ////console.log(reqUsername);
        ////console.log(reqPassword);
        //
        //if (reqUsername != null && reqPassword != null) {
        //
        //    model.findUserByCredentials(
        //        {username:reqUsername, password:reqPassword})
        //    .then(
        //        function(user) {
        //
        //            res.json(user);
        //        },
        //        function(err) {
        //            res.status(400).send(err);
        //    }
        //    );
        //} else if (reqUsername != null) {
        //    //model.findUserByUsername(reqUsername)
        //    //    .then(function (user) {
        //    //        res.json(user);
        //    model.findUserByUsername(reqUsername)
        //    .then(
        //        function(user) {
        //            res.json(user);
        //        },
        //        function(err) {
        //            res.status(400).send(err);
        //        }
        //    );
        //
        //} else {
        //    model.findAll()
        //    .then(
        //        function(user) {
        //            res.json(user);
        //        },
        //        function(err) {
        //            res.status(400).send(err);
        //        }
        //    );
        //}



    function findUserById(req, res) {
        var userid = req.params.id;
        model.findById(userid)
        .then(
            function(user) {
                res.json(user);
            },
            function(err) {
                res.status(400).send(err);
            }
        );
    }

    function findUserByUsername(req, res) {

        //model.findUserByUsername(req.params.username)
        //.then(function(user) {
        //    res.json(user);
        //})
        var username = req.query.username;
        model.findUserByUsername(username)
        .then(
            function(user) {
                res.json(user);
            },
            function(err){
                res.status(400).send(err);
            }
        );
    }

    function updateUser(req, res) {
        //model.update(req.params.id, req.body)
        //.then(function(users) {
        //    res.json(user);
        //});
        var userid = req.params.id;


        var user = req.body;
        console.log(user);

        //console.log(user.phone);
        //user.phone = user.phone.split(",");
        //user.email = user.email[0].split(",");

        model.update(userid, user)
        .then(
            function(user){
                res.json(user);
            },
            function(err) {

                res.status(400).send(err);
            }
        );
    }
    function findUserByIdFromAdmin(req, res) {
        if (isAdmin(req.user)) {
            var id = req.params.id;
            model
                .findById(id)
                .then(
                    function (doc) {
                        res.json(doc);
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                );
        } else {
            res.status(403);
        }
    }

    function createUserFromAdmin(req, res) {
        if (isAdmin(req.user)) {
            var newUser = req.body;
            model
                .create(newUser)
                .then(
                    function (user) {
                        res.json(user);
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                );
        } else {
            res.status(403);
        }
    }
    function updateUserByIdFromAdmin(req, res) {
        if (isAdmin(req.user)) {
            var id = req.params.id;
            var user = req.body;
            model
                .update(id, user)
                .then(
                    function (doc) {
                        res.json(doc);
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                );
        } else {
            res.status(403);
        }
    }

    function deleteUserByIdFromAdmin(req, res) {
        if (isAdmin(req.user)) {
            var id = req.params.id;
            model
                .remove(id)
                .then(
                    function (doc) {
                        res.send(200);
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                );
        } else {
            res.status(403);
        }
    }
    function deleteUser(req, res) {
        var userid = req.params.id;
        model.remove(userid)
        .then(
            function(stats) {

                res.send(200);
            },
            function(err) {
                res.status(400).send(err);
            }
        );
        ////model.remove(req.params.id)
        ////.then(function(users) {
        ////    res.json(users);
        ////});
        //model.remove(req.params.id);
        //res.json(model.findAll());
    }

    function getUpdatedCurrentUser(req, res) {
        var id = req.params.id;
        model
            .findById(id)
            .then(
                function(doc) {
                    res.json(doc);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }
    function findAlice(req, res) {
        console.log("findAlice");

        var reqUsername = req.query.username;
        var reqPassword = req.query.password;

        //model.findUserByUsername(reqUsername, reqPassword)
        //.then(function(users) {
        //    res.json(users);
        //})
        model.findUserByCredentials({username: reqUsername, password: reqPassword})
            .then(
                function (user) {
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );


    }




};