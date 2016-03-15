module.exports = function (app, model, db) {
    app.get("/api/assignment/form/:formId/field", findAllFieldByFormId);
    app.get("/api/assignment/form/:formId/field/:fieldId", findOneFiledByFormFieldId);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteOneFieldByFormFieldId);
    app.post("/api/assignment/form/:formId/field", createFieldByFormId);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateOneFieldByFormFieldId);


    function findAllFieldByFormId(req, res) {
        //model.retrieveFormFields(req.params.id)
        //.then(function(fields) {
        //    res.json(fields);
        //})
        res.json(model.retrieveFormFields(req.params.formId));
    }

    function findOneFiledByFormFieldId(req, res) {
        //mdoel.retrieveFormField(req.params.formId, req.params.fieldId)
        //.then(function(fields) {
        //    res.json(fields);
        //})
        console.log(req.params);
        res.json(model.retrieveFormField(req.params.formId, req.params.fieldId));
    }

    function deleteOneFieldByFormFieldId(req, res) {
        model.removeFormField(req.params.formId, req.params.fieldId)
        .then(function(fields) {
            res.json(fields);
        })
    }

    function createFieldByFormId(req, res) {
        //model.createFormField(req.params.formId, req.params.fieldId)
        //.then(function(fields) {
        //    res.json(fields);
        //})
        res.json(model.createFormField(req.params.formId, req.params.fieldId));
    }

    function updateOneFieldByFormFieldId(req, res) {
        model.updateFormField(req.params.formId,req.params.fieldId, req.body)
        .then(function(fields) {
            res.json(fields);
        })
    }



};