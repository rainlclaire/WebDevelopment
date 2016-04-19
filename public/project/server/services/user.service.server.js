var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");

module.exports = function (app, model) {
    var auth = authorized;

    app.post("/api/project/user", createUser);
    app.get("/api/project/user", findUsers);
    app.get("/api/project/user/:id", findUserById);
    //to comment out here
    app.get("/api/project/user?username=username", findUserByUsername);
    //app.get("/api/project/user?username=username&password=password", findAlice);
    //end
    app.post("/api/project/login", passport.authenticate('project'), loginProject);
    app.post("/api/project/logout", logout);
    app.get("/api/project/loggedin", loggedin);
    app.get("/api/project/loggedin/:id", getUpdatedCurrentUser);
    app.put("/api/project/user/:id", auth, updateUser);
    app.delete("/api/project/user/:id", auth, deleteUser);
    app.post("/api/project/user/:userid/userJoinGroup", joinedGroups);
    app.post("/api/project/user/:userid/userLikeGroup", userLikeGroup);

    passport.use('project', new LocalStrategy(projectlocalStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);




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


    function loginProject(req, res) {
        var user = req.user;
        console.log(user+"------login");
        res.json(user);
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function loggedin(req, res) {
        console.log(req.user);
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function projectlocalStrategy(username, password, done) {
        model
            .findUserByCredentials({username: username, password: password})
            .then(

                function(user) {
                    console.log("local sta");
                    console.log(user);
                    if (user) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }

                },
                function(err) {
                    if (err) {
                        return done(err);
                    }
                }
            );
    }
    //
    function serializeUser(user, done) {
        done(null, user);
    }

    // retrieve the user object from the session
    function deserializeUser(user, done) {
            model
                .findById(user._id)
                .then(
                    function (user) {
                        console.log(user + "-in session");
                        done(null, user);
                    },
                    function (err) {
                        done(err, null);
                    }
                );
        }



    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }





    function userLikeGroup(req, res) {
        console.log("------1");
        console.log(req.params.userid);
        console.log("------2");
        console.log(req.body);
        var userid = req.params.userid;
        var group = req.body;
        model.userLikeGroup(userid, group)
        .then(
            function(doc) {
                res.json(doc);
            },
            function(err) {
                res.status(400).send(err);
            }
        );
        //console.log("userid");
        //console.log(req.params.userid);
        //res.json(model.userLikeGroup(req.params.userid, req.body));
    }


    function joinedGroups(req, res) {
        var userid = req.params.userid;
        var user = req.body;
        model.joinedGroups(userid, user)
        .then(
            function(doc) {
                res.json(doc);
            },
            function(err) {
                res.status(400).send(err);
            }
        );
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

    function findUsers(req, res) {
        var reqUsername = req.query.username;
        var reqPassword = req.query.password;
        //console.log(reqUsername);
        //console.log(reqPassword);

        if (reqUsername != null && reqPassword != null) {

            var credentials = {
                username: reqUsername,
                password: reqPassword
            };

            model.findUserByCredentials(
                {username:reqUsername, password:reqPassword})
            .then(
                function(user) {
                    res.json(user);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
            ////model.findUserByCredentials(credentials)
            ////    .then(function (user) {
            ////        res.json(user);
            //res.json(model.findUserByCredentials({
            //    username: reqUsername,
            //    password: reqPassword
            //}));
        } else if (reqUsername != null) {
            console.log(reqUsername);
            model.findUserByUsername(reqUsername)
            .then(
                function(user) {
                    res.json(user);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
            //model.findUserByUsername(reqUsername)
            //    .then(function (user) {
            //        res.json(user);
            //res.json(model.findUserByUsername(reqUsername));
        } else {
            model.findAll()
            .then(
                function(user) {
                    res.json(user);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
            //model.findAllUsers()
            //    .then(function (users) {
            //        res.json(users);
            //    });
            //res.json(model.findAll());
        }
    }


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

        //res.json(model.findById(req.params.id));

    }

    function findUserByUsername(req, res) {
        console.log(req.query.username);
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
        //model.findUserByUsername(req.params.username)
        //.then(function(user) {
        //    res.json(user);
        //})
        //res.json(model.findUserByUsername(req.query.username));
    }

    function updateUser(req, res) {
        var userid = req.params.id;
        var user = req.body;
        model.update(userid, user)
            .then(
                function(user){
                    res.json(user);
                },
                function(err) {

                    res.status(400).send(err);
                }
            );
        //model.update(req.params.id, req.body)
        //.then(function(users) {
        //    res.json(user);
        //});
        //console.log(req.body);
        //console.log("-1-");
        //var user = model.update(req.params.id, req.body);
        //console.log(user);
        //console.log("-2-");
        //res.json(user);

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
        //model.remove(req.params.id)
        //.then(function(users) {
        //    res.json(users);
        //});
        //model.remove(req.params.id);
        //res.json(model.findAll());
    }

    function findAlice(req, res) {
        console.log("findAlice");

        var reqUsername = req.query.username;
        var reqPassword = req.query.password;

        //model.findUserByUsername(reqUsername, reqPassword)
        //.then(function(users) {
        //    res.json(users);
        //})
        model.findUserByCredentials({username:reqUsername, password:reqPassword})
            .then(
                function(user) {
                    res.json(user);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
        //console.log(req);
        //var reqUsername = req.query.username;
        //var reqPassword = req.query.password;
        //
        //
        ////model.findUserByUsername(reqUsername, reqPassword)
        ////.then(function(users) {
        ////    res.json(users);
        ////})
        //res.json(model.findUserByCredentials(reqUsername, reqPassword));

    }


};