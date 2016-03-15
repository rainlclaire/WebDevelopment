"use strict";

(function () {
    angular.module("FormBuilderApp")
        .factory("FormService", formService);

    function formService($http,$q) {

        var service = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById:updateFormById,
            deleteFormByIdForUser:deleteFormByIdForUser
        };
        return service;

        //create form for user with given user id and form info
        function createFormForUser(userId, form) {
            var deferred = $q.defer();
            $http.post("/api/assignment/user/" + userId + "/form", form)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;

            //var _id = (new Date()).getTime();
            //form._id = _id;
            //forms.push(form);
            //callback(form);
        }

        //find all forms for given user
        function findAllFormsForUser(userId) {
            var deferred = $q.defer();

            $http.get("/api/assignment/user/" + userId + "/form")
                .success(function(response) {
                    deferred.resolve(response);
                });

            return deferred.promise;
            //var form = [];  //set the form array to empty
            ////iterate the forms
            //for (var k = 0; k < forms.length; k++) {
            //    if (forms[k].id == userId) {
            //        form.push(forms[k]);
            //    }
            //}
            //callback(form);
        }


        //delete form by given form id
        function deleteFormById(formId) {
            var deferred = $q.defer();
            $http.delete("/api/assignment/form/" + formId)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
            //for(var i = 0; i < forms.length; i++) {
            //    if (forms[i].id === formId) {
            //        forms.splice(i, 1);
            //        callback(forms);
            //        break;
            //    }
            //}

        }

        function deleteFormByIdForUser(formId, userId) {
            var deferred = $q.defer();
            $http.delete("/api/assignment/user/" + userId + "/form/" + formId)
                .then(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        //update the form by given form's id with new form info
        function updateFormById(formId, newForm) {
            var deferred = $q.defer();
            $http.put("/api/assignment/form/" + id, updatedForm)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
            //for(var j = 0; j < forms.length; j++) {
            //    if (forms[j].id = formId) {
            //        for(var attr in updateForm) {
            //            if (updateForm.hasOwnProperty(attr))
            //            forms[j][attr] = updateForm[attr];
            //        }
            //        callback(forms[j]);
            //        break;
            //    }
            //}

        }

    }
})();