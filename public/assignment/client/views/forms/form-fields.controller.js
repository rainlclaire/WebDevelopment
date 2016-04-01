"use strict";

(function() {
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController($routeParams,$uibModal,$rootScope, FieldService) {
        var model = this;
        model.removeField = removeField;
        model.addField = addField;
        model.cloneField = cloneField;
        model.editField = editField;
        model.sortOrder = sortOrder;

        var userid = $routeParams.userid;
        var formid = $routeParams.formid;

        var defaultValues = {
            TEXT: {_id: null, label: "New Text Field", type: "TEXT", placeholder: "New Field"},

            TEXTAREA: {_id: null, label: "New Text Field", type: "TEXTAREA", placeholder: "New Field"},
            DATE: {_id: null, label: "New Date Field", type: "DATE"},



            OPTIONS: {_id: null, label: "New Dropdown", type: "OPTIONS", options: [
                {label: "Option 1", value: "OPTION_1"},
                {label: "Option 2", value: "OPTION_2"},
                {label: "Option 3", value: "OPTION_3"}
            ]},


            CHECKBOXES: {_id: null, label: "New Checkboxes", type: "CHECKBOXES", options: [
                {label: "Option A", value: "OPTION_A"},
                {label: "Option B", value: "OPTION_B"},
                {label: "Option C", value: "OPTION_C"}
            ]},
            RADIOS: {_id: null, label: "New Radio Buttons", type: "RADIOS", options: [
                {label: "Option X", value: "OPTION_X"},
                {label: "Option Y", value: "OPTION_Y"},
                {label: "Option Z", value: "OPTION_Z"}
            ]},
            EMAIL: {_id: null, label: "New Email Field", type: "EMAIL", placeholder: "New Field"}
        };

        FieldService.getFieldsForForm(formid)
            .then(function(allFields) {
                model.fields = allFields;
            });



        function cloneField(field) {
            FieldService.createFieldForForm(formid, field)
            .then(function(fields) {
                model.fields = fields;
            })
        }

        function editField(index) {
            $rootScope.modalInstance = $uibModal.open({
                templateUrl:"views/forms/field-modal.view.html",
                controller:"FieldModalInstanceController",
                size:'sm',
                resolve: {
                    clickField: function () {
                        return model.fields[index];
                    },
                    formid: function() {
                        return formid;
                    }
                }
            })
        }

        function removeField(field) {

            FieldService.deleteFieldForForm(formid,field._id)
                .then(function(form) {
                    model.fields = form.field;
                });
        }

        function addField(newFieldType) {
            var newField = defaultValues[newFieldType];
            FieldService.createFieldForForm(formid, newField)
                .then(function(revisedFormField) {
                    model.fields = revisedFormField;
                });
        }


        function sortOrder(start,end) {
            console.log("applysort");
            FieldService.sortOrder(formid, start,end)
            .then(function(response) {
                if (response.data) {
                    model.fields = response.data;
                } else {
                    console.log("this is a err for sort");
                }
                });
        }

    }
})();