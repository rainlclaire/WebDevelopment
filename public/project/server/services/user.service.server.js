

module.exports = function (app, model) {

    app.post("/api/project/user", createUser);
    app.get("/api/project/user", findUsers);
    app.get("/api/project/user/:id", findUserById);
    //to comment out here
    app.get("/api/project/user?username=username", findUserByUsername);
    app.get("/api/project/user?username=username&password=password", findAlice);
    //end
    app.put("/api/project/user/:id", updateUser);
    app.delete("/api/project/user/:id", deleteUser);
    app.post("/api/project/user/:userid/userJoinGroup", joinedGroups);
    app.post("/api/project/user/:userid/userLikeGroup", userLikeGroup);



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
        //res.json(model.joinedGroups(req.params.userid, req.body));
    }

    function createUser(req, res) {
        var newuser = req.body;
        model.create(newuser)
        .then(
            function(user) {
                res.json(user);
            },
            function(err) {
                res.status(400).send(err);
            }
        );
        //model.create(req.body)
        //.then(function(users) {
        //    res.json(users);
        //});
        //res.json(model.create(req.body));
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