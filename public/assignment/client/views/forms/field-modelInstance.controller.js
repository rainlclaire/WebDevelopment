(function(){
    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("FieldModalInstanceController", FieldModalInstanceController);


    function FieldModalInstanceController($route,$rootScope,$routeParams, $scope,clickField, FieldService, formid) {


        $scope.submit = submit;
        $scope.cancel = cancel;

        $scope.clickField = clickField;
        $scope.Placeholder = $scope.clickField.type === 'TEXT' || $scope.clickField.type === 'TEXTAREA';
        $scope.Textarea = $scope.clickField.type === 'OPTIONS' || $scope.clickField.type === 'CHECKBOXES' || $scope.clickField.type === 'RADIOS';
        function submit() {
            console.log("clickfield");
            console.log(clickField);
            FieldService.updateField(formid,$scope.clickField.id,$scope.clickField)
                .then(function(updateForm) {
                    console.log(updateForm);
                     $scope.clickField = updateForm;
            });
            console.log("clickFiled=========");
            console.log(clickField.placeholder);
            console.log(clickField.label);
            console.log(clickField.options);
            //$route.reload();
            $rootScope.modalInstance.close();
        }

        function cancel() {
            $rootScope.modalInstance.dismiss('cancel');
        }
    }
})();