"use strict";

(function () {
    angular.module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService() {
        var forms = [];
        var jsonForms = [
            {"_id": "000", "title": "Contacts", "userId": 123},
            {"_id": "010", "title": "ToDo",     "userId": 123},
            {"_id": "020", "title": "CDs",      "userId": 234}
        ];

        return jsonForms;

        function createFormForUser(userId, form, callback) {
            var _id = (new Date).getTime();
            form.userId = _id;
            forms.push(form);
            callback(form);
        }

        function findAllFormsForUser(userId, callback) {
            var form = [];
            for(var k = 0; k< forms.length;k++) {
                if (forms[k].id = userId) {
                    form.push(forms[k]);
                    callback(form);
                    break;
                }
            }

        }

        function deleteFormById(formId, callback) {
            for(var i =0; i<forms.length;i++) {
                if (forms[i].id= formId) {
                    forms.splice(i, 1);
                }
            }
            callback(forms);
        }
        function updateFormById(formId, newForm, callback) {
            for(var j =0; j< forms.length;j++) {
                if (forms[j].id = formId) {
                    forms[j].username = newForm.username;
                    forms[j].firstName = newForm.firstName;
                    forms[j].lastName = newForm.lastName;
                    forms[j].password = newForm.password;
                    forms[j].email = newForm.email;
                    callback(forms[j]);
                    break;
                }
            }

        }

    }
})();