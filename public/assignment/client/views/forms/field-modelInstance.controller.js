(function(){
    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("FieldModalInstanceController", FieldModalInstanceController);


    function FieldModalInstanceController($rootScope, $scope, clickField, FieldService) {



        $scope.submit = submit;
        $scope.cancel = cancel;

        $scope.clickField = clickField;
        $scope.Placeholder = $scope.clickField.type === 'TEXT' || $scope.clickField.type === 'TEXTAREA';
        $scope.Textarea = $scope.clickField.type === 'OPTIONS' || $scope.clickField.type === 'CHECKBOXES' || $scope.clickField.type === 'RADIOS';
        function submit() {
            $rootScope.modalInstance.close();
        }

        function cancel() {
            $rootScope.modalInstance.dismiss('cancel');
        }
    }
})();