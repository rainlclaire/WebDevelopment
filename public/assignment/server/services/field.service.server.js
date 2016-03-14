module.exports = function (app, formModel, db) {
    app.get("/api/assignment/form/:formId/field", findAllFieldByFormId);
    app.get("/api/assignment/form/:formId/field/:fieldId", findOneFiledByFormFieldId);
    app.delete("/api/assignemnt/form/:formId/field/:fieldId", deleteOneFieldByFormFieldId);
    app.post("/api/assignment/form/:formId/field", createFieldByFormId);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateOneFieldByFormFieldId);


    function findAllFieldByFormId(req, res) {
        formModel.retrieveFormFields(req.params.formId)
        .then(function(fields) {
            res.json(fields);
        })
    }

    function findOneFiledByFormFieldId(req, res) {
        formModel.retrieveFormField(req.params.formId, req.params.fieldId)
        .then(function(fields) {
            res.json(fields);
        })
    }

    function deleteOneFieldByFormFieldId(req, res) {
        formModel.removeFormField(req.params.formId, req.params.fieldId)
        .then(function(fields) {
            res.json(fields);
        })
    }

    function createFieldByFormId(req, res) {
        formModel.createFormField(req.params.formId, req.params.fieldId)
        .then(function(fields) {
            res.json(fields);
        })
    }

    function updateOneFieldByFormFieldId(req, res) {
        formModel.updateFormField(req.params.formId,req.params.fieldsId, req.body)
        .then(function(fields) {
            res.json(fields);
        })
    }



};