module.exports = function (app, model) {
    //app.get("/api/temp/group?title=groupTitle", findGroupByTitle);
    app.get("/api/temp/group", findGroups);
    app.get("/api/temp/group/:groupid", findGroupById);
    app.put("/api/temp/group/:groupid", updateGroup);
    app.delete("/api/temp/group/:groupid", removeGroup);
    app.post("/api/temp/group", createGroup);
    app.post("/api/temp/group/:groupid/userJoinGroup", userJoinGroup);
    app.post("/api/temp/group/:groupid/userLikeGroup", userLikeGroup);
    app.get("/api/temp/group/:groupid/groupUsers", findUserForGroup);

    function findUserForGroup(req, res) {
        res.json(model.findAllUser(req.params.groupid));
    }

    function userLikeGroup(req, res) {
        res.json(model.userLikeGroup(req.params.groupid, req.body));
    }

    function userJoinGroup(req, res) {
        console.log("group sevrice sever");
        console.log(req.params.groupid);
        res.json(model.userJoinGroup(req.params.groupid, req.body));
    }
    function findGroups(req, res) {
        var title = req.query.title;
        if (title) {
            var titleGroup = model.findGroupByTitle(title);
            res.status(200).send(titleGroup);
            return;
        }

        res.status(200).send(model.findAll());
        return;
    }
    function findGroupById(req, res) {
        res.json(model.findById(req.params.groupid));
    }

    function createGroup(req, res) {

       res.json(model.create(req.body));
    }

    //function findGroupByTitle(req, res) {
    //    console.log("in server findtitle");
    //    var reqTitle = req.query.groupTitle;
    //    res.json(model.findGroupByTitle(reqTitle));
    //}

    function updateGroup(req,res) {
        console.log("updategroup sever");
        console.log(req.params.groupid);
        var group = model.update(req.params.groupid, req.body);
        res.json(group);
    }

    function removeGroup(req, res) {
       model.remove(req.params.groupid);

        res.json(model.findAll());
    }

};