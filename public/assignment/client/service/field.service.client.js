"use strict";

(function () {
    angular.module("FormBuilderApp")
        .factory("FieldService", FieldService);

    function FieldService($http,$q) {

        var service = {
            createFieldForForm:createFieldForForm,
            getFieldsForForm:getFieldsForForm,
            getFieldForForm: getFieldForForm,
            deleteFieldForForm: deleteFieldForForm,
            updateField:updateField
        };
        return service;

        function createFieldForForm(formid, field) {
            var deferred = $q.defer();
            $http.post("/api/assignment/form/" + formid + "/field", field)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function getFieldsForForm(formid) {
            var deferred = $q.defer();
            $http.get("/api/assignment/form/" + formid + "/field")
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function getFieldForForm(formid, fieldid) {
            var deferred = $q.defer();
            $http.get("/api/assignment/form/" + formid + "/field/"+fieldid)
                .success(function(response) {
                    alert("FORM FIELDCLINET");
                    alert(response);
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function deleteFieldForForm(formid, fieldid) {
            var deferred = $q.defer();
            $http.delete("/api/assignment/form/" + formid + "/field/"+fieldid)
                .success(function(response) {
                    alert(response);
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function updateField(formid,field, fieldid) {
            var deferred = $q.defer();
            $http.put("/api/assignment/form/" + formid + "/field/"+fieldid, field)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

    }
})();