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
        console.log("userid");
        console.log(req.params.userid);
        res.json(model.userLikeGroup(req.params.userid, req.body));
    }


    function joinedGroups(req, res) {
        res.json(model.joinedGroups(req.params.userid, req.body));
    }

    function createUser(req, res) {
        //model.create(req.body)
        //.then(function(users) {
        //    res.json(users);
        //});
        res.json(model.create(req.body));
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
            //model.findUserByCredentials(credentials)
            //    .then(function (user) {
            //        res.json(user);
            res.json(model.findUserByCredentials({
                username: reqUsername,
                password: reqPassword
            }));
        } else if (reqUsername != null) {
            //model.findUserByUsername(reqUsername)
            //    .then(function (user) {
            //        res.json(user);
            res.json(model.findUserByUsername(reqUsername));
        } else {
            //model.findAllUsers()
            //    .then(function (users) {
            //        res.json(users);
            //    });
            res.json(model.findAll());
        }
    }


    function findUserById(req, res) {

        res.json(model.findById(req.params.id));

    }

    function findUserByUsername(req, res) {
        //model.findUserByUsername(req.params.username)
        //.then(function(user) {
        //    res.json(user);
        //})
        res.json(model.findUserByUsername(req.query.username));
    }

    function updateUser(req, res) {
        //model.update(req.params.id, req.body)
        //.then(function(users) {
        //    res.json(user);
        //});
        console.log(req.body);
        console.log("-1-");
        var user = model.update(req.params.id, req.body);
        console.log(user);
        console.log("-2-");
        res.json(user);

    }

    function deleteUser(req, res) {
        //model.remove(req.params.id)
        //.then(function(users) {
        //    res.json(users);
        //});
        model.remove(req.params.id);
        res.json(model.findAll());
    }

    function findAlice(req, res) {
        console.log(req);
        var reqUsername = req.query.username;
        var reqPassword = req.query.password;


        //model.findUserByUsername(reqUsername, reqPassword)
        //.then(function(users) {
        //    res.json(users);
        //})
        res.json(model.findUserByCredentials(reqUsername, reqPassword));

    }


};