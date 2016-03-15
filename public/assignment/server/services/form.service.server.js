

module.exports = function (app, model, db) {
    //app.post("/api/assignment/user/:userId/form",findFormsByUserId);
    app.get("/api/assignment/user/:userid/form", findFormsByUserId);
    app.get("/api/assignment/form/:formid", findFormById);
    app.delete("/api/assignment/form/:formid", deleteFormById);
    app.delete("/api/assignment/user/:userid/form/:formid", deleteFormByIdForUser);
    app.post("/api/assignment/user/:userid/form", createFormForUser);
    app.put("/api/assignment/form/:formid", updateFormById);
    app.get("/api/assignment/form", findAllForms);


    function findFormsByUserId(req, res) {
        //console.log(req.params.userId);
        //console.log(model.findFormsByUserId(req.params.userId));
        //model.findFormsByUserId(req.params.userId)
        //.then(function(forms) {
        //    res.json(forms);
        //})
        res.json(model.findFormsByUserId(req.params.userid));
    }


    function findFormById(req, res) {
        //model.findById(req.params.formid)
        //.then(function(forms) {
        //    res.json(forms);
        //})
        res.json(model.findById(req.params.formid));
    }

    function deleteFormById(req, res) {
        //model.remove(req.params.userId)
        //.then(function(forms) {
        //    res.json(forms);
        //})
        res.json(model.remove(req.params.formid));
    }
    function deleteFormByIdForUser(req, res) {

        res.json(model.removeForUser(req.params.formid, req.params.userid));
    }

    function createFormForUser(req, res) {
        //model.createFormForUser(req.body, req.params.userId)
        //.then(function(forms) {
        //    res.json(forms);
        //})
        console.log(req.query);
        res.json(model.createFormForUser(req.body, req.params.userid));
    }

    function updateFormById(req, res) {
        res.json(model.update(req.params.formid, req.body));
    }

    function findAllForms(req, res) {
        res.json(model.findAll());
    }



};