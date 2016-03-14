

module.exports = function (app, model, db) {
    app.post("/api/assignment/user/:userId/form",findFormsByUserId);
    app.get("/api/assignment/form/:formId", findFormById);
    app.delete("/api/assignment/form/:formId", deleteFormById);
    app.post("/api/assignment/user/:userId/form", createFormForUserById);
    app.put("/api/assignment/form/:formId", updateFormById);


    function findFormsByUserId(req, res) {
        model.findFormsByUserId(req.params.userId)
        .then(function(forms) {
            res.json(forms);
        })
    }

    function findFormById(req, res) {
        model.findById(req.params.formid)
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
        model.update(req.params.formid, req.body)
        .then(function(forms) {
            res.json(forms);
        })
    }



};