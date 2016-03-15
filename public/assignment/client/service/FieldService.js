"use strict";

(function() {
    angular
        .module("FormBuilderApp")
        .factory("FieldService", FieldService);

    function FieldService($http, $q) {
        var service = {
            createFieldForForm: createFieldForForm,
            getFieldsForForm: getFieldsForForm,
            getFieldForForm: getFieldForForm,
            deleteFieldFromForm: deleteFieldFromForm,
            updateField: updateField
        };
        return service;

        // Accepts a form id and field object.  Calls field service on server
        // to add new field to corresponding form.  Returns a promise.
        function createFieldForForm(formid, field) {
            var deferred = $q.defer();
            $http.post(" /api/assignment/form/" + formid + "/field", field)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        // Accepts a form id.  Calls field service on server requesting all fields
        // for the corresponding form.  Returns a promise.
        function getFieldsForForm(formid) {
            var deferred = $q.defer();
            $http.get("/api/assignment/form/" + formid + "/field")
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        // Accepts a form id and a field id.  Calls the field service on server
        // requesting the specific field on the specific form.  Returns a promise.
        function getFieldForForm(formid, fieldid) {
            var deferred = $q.defer();
            $http.get("/api/assignment/form/" + formid + "/field/" + fieldid)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        // Accepts a form id and a field id.  Calls the field service on server
        // requesting to delete the specific field from the specific form.  Returns
        // a promise.
        function deleteFieldFromForm(formid, fieldid) {
            var deferred = $q.defer();
            $http.delete("/api/assignment/form/" + formid + "/field/" + fieldid)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        // Accepts a form id, a field id, and an updated field object.  Calls form
        // service on server to update the specific field on the specific form with
        // the attributes in the updated field object.  Returns a promise.
        function updateField(formid, fieldid, field) {
            var deferred = $q.defer();
            $http.put("/api/assignment/form/" + formid + "/field/" + fieldid, field)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }
    }
})();