module.exports = function (app, model, db) {
    app.get("/api/assignment/form/:formId/field", findAllFieldByFormId);
    app.get("/api/assignment/form/:formId/field/:fieldId", findOneFiledByFormFieldId);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteOneFieldByFormFieldId);
    app.post("/api/assignment/form/:formId/field", createFieldByFormId);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateOneFieldByFormFieldId);


    function findAllFieldByFormId(req, res) {

        res.json(model.retrieveFormFields(req.params.formId));
    }

    function findOneFiledByFormFieldId(req, res) {

        console.log(req.params);
        res.json(model.retrieveFormField(req.params.formId, req.params.fieldId));
    }

    function deleteOneFieldByFormFieldId(req, res) {

        res.json(model.removeFormField(req.params.formId, req.params.fieldId));
    }


    function createFieldByFormId(req, res) {

        res.json(model.createFormField(req.params.formId, req.params.fieldId));
    }

    function updateOneFieldByFormFieldId(req, res) {

        res.json(model.updateFormField(req.params.formId,req.params.fieldId, req.body));
    }



};