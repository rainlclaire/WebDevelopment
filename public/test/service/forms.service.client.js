(function () {
    angular.module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService() {
        console.log("formsser");
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
            for (var i = 0; i< forms.length();i++) {
                if (forms[i].id = userId) {
                    form.push(forms[i]);
                    callback(form);
                    break;
                }
            }

        }

        function deleteFormById(formId, callback) {
            for(var i =0; i<forms.length();i++) {
                if (forms[i].id= formId) {
                    forms.splice(i, 1);
                }
            }
            callback(forms);
        }
        function updateFormById(formId, newForm, callback) {
            for (var i =0; i< forms.length();i++) {
                if (forms[i].id = formId) {
                    forms[i].username = newForm.username;
                    forms[i].firstName = newForm.firstName;
                    forms[i].lastName = newForm.lastName;
                    forms[i].password = newForm.password;
                    forms[i].email = newForm.email;
                    callback(forms[i]);
                    break;
                }
            }

        }

    }
});