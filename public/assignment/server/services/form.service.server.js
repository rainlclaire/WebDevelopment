

module.exports = function (app, model, db) {
    "#/user/{{form.userId}}/form/{{form._id}}/fields"
    //app.post("/api/assignment/user/:userId/form",findFormsByUserId);
    app.get("/api/assignment/user/:userId/form", findFormsByUserId);
    app.get("/api/assignment/form/:formId", findFormById);
    app.delete("/api/assignment/form/:formId", deleteFormById);
    app.post("/api/assignment/user/:userId/form", createFormForUserById);
    app.put("/api/assignment/form/:formId", updateFormById);


    function findFormsByUserId(req, res) {
        //console.log(req.params.userId);
        //console.log(model.findFormsByUserId(req.params.userId));
        //model.findFormsByUserId(req.params.userId)
        //.then(function(forms) {
        //    res.json(forms);
        //})
        res.json(model.findFormsByUserId(req.params.userId));
    }


    function findFormById(req, res) {
        model.findById(req.params.formId)
        .then(function(forms) {
            res.json(forms);
        })
    }

    function deleteFormById(req, res) {
        model.remove(req.params.userId)
        .then(function(forms) {
            res.json(forms);
        })
    }

    function createFormForUserById(req, res) {
        model.createFormForUser(req.body, req.params.userId)
        .then(function(forms) {
            res.json(forms);
        })
    }

    function updateFormById(req, res) {
        model.update(req.params.formId, req.body)
        .then(function(forms) {
            res.json(forms);
        })
    }



};