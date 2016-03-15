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
        function createFormForUser(userid, form) {
            var deferred = $q.defer();
            $http.post("/api/assignment/user/" + userid + "/form", form)
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
        function findAllFormsForUser(userid) {
            var deferred = $q.defer();

            $http.get("/api/assignment/user/" + userid + "/form")
                .success(function(response) {
                    deferred.resolve(response);
                });

            return deferred.promise;

        }


        //delete form by given form id
        function deleteFormById(id) {
            var deferred = $q.defer();
            $http.delete("/api/assignment/form/" + id)
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

        function deleteFormByIdForUser(id, userid) {
            var deferred = $q.defer();
            $http.delete("/api/assignment/user/" + userid + "/form/" + id)
                .then(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        //update the form by given form's id with new form info
        function updateFormById(id, updatedForm) {
            var deferred = $q.defer();
            $http.put("/api/assignment/form/" + id, updatedForm)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;


        }

    }
})();