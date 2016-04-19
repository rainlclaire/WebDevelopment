module.exports = function (app, model) {
    //app.get("/api/temp/group?title=groupTitle", findGroupByTitle);
    app.get("/api/project/group", findGroups);
    app.get("/api/project/group/:groupid", findGroupById);
    app.put("/api/project/group/:groupid", updateGroup);
    app.delete("/api/project/group/:groupid", removeGroup);
    app.post("/api/project/group", createGroup);
    app.post("/api/project/group/:groupid/userJoinGroup", userJoinGroup);
    app.post("/api/project/group/:groupid/userLikeGroup", userLikeGroup);
    app.get("/api/project/group/:groupid/groupUsers", findUserForGroup);

    function findUserForGroup(req, res) {
        var groupid = req.params.groupid;
        model.findAllUser(groupid)
        .then(
            function(users) {
                res.json(users);
            },
            function(err){
                res.status(400).send(err);
            }
        );
        //res.json(model.findAllUser(req.params.groupid));
    }

    function userLikeGroup(req, res) {
        var groupid = req.params.groupid;
        var user = req.body;
        model.userLikeGroup(groupid, user)
        .then(
            function(group) {
                res.json(group);
            },
            function(err) {
                res.status(400).send(err);
            }
        );
        //res.json(model.userLikeGroup(req.params.groupid, req.body));
    }

    function userJoinGroup(req, res) {

        var groupid = req.params.groupid;
        var user = req.body;
        model.userJoinGroup(groupid, user)
        .then(
            function(group) {
                res.json(group);
            },
            function(err) {
                res.status(400).send(err);
            }
        );
        //res.json(model.userJoinGroup(req.params.groupid, req.body));
    }

    function findGroups(req, res) {
        var title = req.query.title;
        if (title) {
            model.findGroupByTitle(title)
            .then(
                function(group) {
                    res.json(group);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
            //var titleGroup = model.findGroupByTitle(title);
            //res.status(200).send(titleGroup);
            //return;
        }

        model.findAll()
        .then(
            function(group) {
                res.json(group);
            },
            function(err) {
                res.status(400).send(err);
            }
        );
        //res.status(200).send(model.findAll());
        //return;
    }


    function findGroupById(req, res) {

        var groupid = req.params.groupid;
        model.findById(groupid)
        .then(
            function(group) {

                res.json(group);
            },
            function(err) {
                res.status(400).send(err);
            }
        );
        //res.json(model.findById(req.params.groupid));
    }

    function createGroup(req, res) {
        var newGroup = req.body;
        model.create(newGroup)
        .then(
            function(newGroup) {
                res.json(newGroup);
            },
            function(err) {
                res.status(400).send(err);
            }
        );

       //res.json(model.create(req.body));
    }

    //function findGroupByTitle(req, res) {
    //    console.log("in server findtitle");
    //    var reqTitle = req.query.groupTitle;
    //    res.json(model.findGroupByTitle(reqTitle));
    //}

    function updateGroup(req,res) {
        var groupid = req.params.groupid;
        var upatedGroup = req.body;
        model.update(groupid, upatedGroup)
        .then(
            function(group) {
                res.json(group);
            },
            function(err) {
                res.status(400).send(err);
            }
        );

        //console.log("updategroup sever");
        //console.log(req.params.groupid);
        //var group = model.update(req.params.groupid, req.body);
        //res.json(group);
    }

    function removeGroup(req, res) {
        var groupid = req.params.groupid;
        model.remove(groupid)
        .then(
            function(group) {
                res.json(group);
            },
            function(err) {
                res.status(400).send(err);
            }
        );
       //model.remove(req.params.groupid);
       //
       // res.json(model.findAll());
    }

};