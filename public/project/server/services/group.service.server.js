module.exports = function (app, model) {
    app.get("/api/project/group?title=groupTitle", findGroupByTitle);
    app.get("/api/project/group", findGroups);
    app.get("/api/project/group/:groupid", findGroupById);
    app.put("/api/project/group/:groupid", updateGroup);
    app.delete("/api/project/group/:groupid", removeGroup);
    app.post("/api/project/group", createGroup);



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
        console.log(req.body);
       res.json(model.create(req.body));
    }

    function findGroupByTitle(req, res) {
        console.log("in server findtitle");
        var reqTitle = req.query.groupTitle;
        res.json(model.findGroupByTitle(reqTitle));
    }

    function updateGroup(req,res) {
        var group = model.update(req.params.groupid, req.body);
        res.json(group);
    }

    function removeGroup(req, res) {
       model.remove(req.params.groupid);

        res.json(model.findAll());
    }

};