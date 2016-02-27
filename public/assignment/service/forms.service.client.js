"use strict";

(function () {
    angular.module("FormBuilderApp")
        .factory("FormService", formService);

    function formService() {
        //init the current forms
        var forms = [
            {"_id": "000", "title": "Contacts", "userId": 123},
            {"_id": "010", "title": "ToDo",     "userId": 123},
            {"_id": "020", "title": "CDs",      "userId": 234}
        ];

        var service = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById:updateFormById
        };
        return service;

        //create form for user with given user id and form info
        function createFormForUser(userId, form, callback) {
            var _id = (new Date()).getTime();
            form._id = _id;
            forms.push(form);
            callback(form);
        }

        //find all forms for given user
        function findAllFormsForUser(userId, callback) {
            var form = [];

            for (var k = 0; k< forms.length;k++) {
                if (forms[k].id == userId) {
                    form.push(forms[k]);
                }
            }
            callback(form);
        }


        //delete form by given form id
        function deleteFormById(formId, callback) {
            for(var i =0; i<forms.length;i++) {
                if (forms[i].id === formId) {
                    forms.splice(i, 1);
                    callback(forms);
                    break;
                }
            }

        }

        //update the form by given form's id with new form info
        function updateFormById(formId, newForm, callback) {
            for(var j =0; j< forms.length;j++) {
                if (forms[j].id = formId) {
                    for(var attr in updateForm) {
                        if (updateForm.hasOwnProperty(attr))
                        forms[j][attr] = updateForm[attr];
                    }
                    callback(forms[j]);
                    break;
                }
            }

        }

    }
})();