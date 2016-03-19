"use strict";

module.exports = function(app, model, db) {
    app.get("/api/assignment/form/:formid/field", retrieveFormFields);
    app.get("/api/assignment/form/:formid/field/:fieldid", retrieveFormField);
    app.delete("/api/assignment/form/:formid/field/:fieldid", removeFormField);
    app.post("/api/assignment/form/:formid/field", createFormField);
    app.put("/api/assignment/form/:formid/field/:fieldid", updateFormField);

    function retrieveFormFields(req, res) {
        // ask the model for the fields of the requested form
        res.json(model.retrieveFormFields(req.params.formid, req.params.fieldid, req.body));
    }

    function reorderField(req, res) {
        res.json(model.updateFormField(req.params.formid,req.params.fieldid, req.body))
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
        console.log(req.params.fieldid);
        console.log(req.body);
        res.json(model.updateFormField(req.params.formid, req.body, req.params.fieldid));

    }
};