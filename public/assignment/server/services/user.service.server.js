

module.exports = function (app, model, db) {
    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user", findUsers);
    app.get("/api/assignment/user/:id",findUserById);
    //to comment out here
    app.get("/api/assignment/user?username=username", findUserByUsername);
    app.get("/api/assignment/user?username=alice&password=alice", findAlice);
    //end
    app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", deleteUser);


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
                username:reqUsername,
                password:reqPassword
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
        var reqUsername = req.query.username;
        var reqPassword = req.query.password;

        //model.findUserByUsername(reqUsername, reqPassword)
        //.then(function(users) {
        //    res.json(users);
        //})
        res.json(model.findUserByCredentials(reqUsername, reqPassword));

    }




};