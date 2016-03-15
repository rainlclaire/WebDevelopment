//module.exports = function (app, model, db) {
//    app.get("/api/assignment/form/:formid/field", findAllFieldByFormId);
//    app.get("/api/assignment/form/:formId/field/:fieldId", findOneFiledByFormFieldId);
//    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteOneFieldByFormFieldId);
//    app.post("/api/assignment/form/:formId/field", createFieldByFormId);
//    app.put("/api/assignment/form/:formId/field/:fieldId", updateOneFieldByFormFieldId);
//
//
//    function findAllFieldByFormId(req, res) {
//
//        res.json(model.retrieveFormFields(req.params.formId));
//    }
//
//    function findOneFiledByFormFieldId(req, res) {
//
//        console.log(req.params);
//        res.json(model.retrieveFormField(req.params.formId, req.params.fieldId));
//    }
//
//    function deleteOneFieldByFormFieldId(req, res) {
//
//        res.json(model.removeFormField(req.params.formId, req.params.fieldId));
//    }
//
//
//    function createFieldByFormId(req, res) {
//
//        res.json(model.createFormField(req.params.formId, req.params.fieldId));
//    }
//
//    function updateOneFieldByFormFieldId(req, res) {
//
//        res.json(model.updateFormField(req.params.formId,req.params.fieldId, req.body));
//    }
//
//
//
//};

"use strict";

module.exports = function(app, model, db) {
    app.get("/api/assignment/form/:formid/field", retrieveFormFields);
    app.get("/api/assignment/form/:formid/field/:fieldid", retrieveFormField);
    app.delete("/api/assignment/form/:formid/field/:fieldid", removeFormField);
    app.post("/api/assignment/form/:formid/field", createFormField);
    app.put("/api/assignment/form/:formid/field/:fieldid", updateFormField);

    function retrieveFormFields(req, res) {
        // ask the model for the fields of the requested form
        res.json(model.retrieveFormFields(req.params.formid));
    }

    function retrieveFormField(req, res) {
        // ask the model for the specific field in the requested form
        res.json(model.retrieveFormField(req.params.formid, req.params.fieldid));
    }

    function removeFormField(req, res) {
        // ask the model to remove the specific field in the requested form
        res.json(model.removeFormField(req.params.formid, req.params.fieldid));
    }

    function createFormField(req, res) {
        // ask the model to add a new field to the requested form
        res.json(model.createFormField(req.params.formid, req.body));
    }

    function updateFormField(req, res) {
        // ask the model to update the requested field in the requested form
        res.json(model.updateFormField(req.params.formid, req.params.fieldid, req.body));
    }
};