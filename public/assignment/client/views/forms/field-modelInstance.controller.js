(function(){
    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("FieldModalInstanceController", FieldModalInstanceController);


    function FieldModalInstanceController($rootScope,$routeParams, $scope, clickField, FieldService) {

        var formid = $routeParams.formid;
        console.log(formid);

        $scope.submit = submit;
        $scope.cancel = cancel;

        $scope.clickField = clickField;
        $scope.Placeholder = $scope.clickField.type === 'TEXT' || $scope.clickField.type === 'TEXTAREA';
        $scope.Textarea = $scope.clickField.type === 'OPTIONS' || $scope.clickField.type === 'CHECKBOXES' || $scope.clickField.type === 'RADIOS';
        function submit() {
            FieldService.updateField(formid,clickField,clickField.id)
                .then(function(updateForm) {
                    console.log(updateForm);
                $scope.clickField = updateForm;
            });
            console.log("clickFiled=========");
            console.log(clickField.placeholder);
            console.log(clickField.label);
            console.log(clickField.options);
            $rootScope.modalInstance.close();
        }

        function cancel() {
            $rootScope.modalInstance.dismiss('cancel');
        }
    }
})();