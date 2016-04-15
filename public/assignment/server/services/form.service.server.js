

module.exports = function (app, model, db) {
    //app.post("/api/assignment/user/:userId/form",findFormsByUserId);
    app.get("/api/assignment/user/:userid/form", findFormsByUserId);
    app.get("/api/assignment/form/:formid", findFormById);
    app.delete("/api/assignment/form/:formid", deleteFormById);
    app.delete("/api/assignment/user/:userid/form/:formid", deleteFormByIdForUser);
    app.post("/api/assignment/user/:userid/form", createFormForUser);
    app.put("/api/assignment/form/:formid", updateFormById);
    app.put("/api/assigment/user/:userid/form/:formid", updateFormForUser);
    app.get("/api/assignment/form", findAllForms);




    function updateFormForUser(req,res) {
        model.updateForUser(req.params.formid, req.params.userid, req.body)
        .then(
            function(form) {
                res.json(form);
            },
            function(err) {
                res.status(400).send(err);
            }
        );
    }
    function findFormsByUserId(req, res) {
        //console.log(req.params.userId);
        //console.log(model.findFormsByUserId(req.params.userId));
        //model.findFormsByUserId(req.params.userId)
        //.then(function(forms) {
        //    res.json(forms);
        //})
        model.findFormsByUserId(req.params.userid)
        .then(
            function(form) {
                res.json(form);
            },
            function(err) {
                res.status(400).send(err);
            }
        );

    }


    function findFormById(req, res) {
        //model.findById(req.params.formid)
        //.then(function(forms) {
        //    res.json(forms);
        //})
        model.findById(req.params.formid)
        .then(
            function(form) {
                res.json(form);
            },
            function(err) {
                res.status(400).send(err);
            }
        );
    }

    function deleteFormById(req, res) {
        //model.remove(req.params.userId)
        //.then(function(forms) {
        //    res.json(forms);
        //})
        model.remove(req.params.formid)
        .then(
            function(form) {
                //console.log(form);
                res.json(form);
            },
            function(err) {
                res.status(400).send(err);
            }
        );

    }
    function deleteFormByIdForUser(req, res) {
        model.removeForUser(req.params.formid, req.params.userid)
        .then(
            function(form) {
                //console.log(form);
                res.json(form);
            },
            function(err){
                res.status(400).send(err);
            }
        );

    }

    function createFormForUser(req, res) {
        //model.createFormForUser(req.body, req.params.userId)
        //.then(function(forms) {
        //    res.json(forms);
        //})
        model.createFormForUser(req.body, req.params.userid)
        .then(
            function(form) {
                res.json(form)
            },
            function(err) {
                res.status(400).send(err);
            }
        );
    }

    function updateFormById(req, res) {
        model.update(req.params.formid, req.body)
        .then(
            function(form) {
                res.json(form);
            },
            function(err) {
                res.status(400).send(err);
            }
        );

    }

    function findAllForms(req, res) {
        model.findAll()
        .then(
            function(forms) {
                res.json(forms);
            },
            function(err) {
            res.status(400).send(err);
        }
        );
    }



};