(function(){
    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("FieldModalInstanceController", FieldModalInstanceController);


    function FieldModalInstanceController($route,$rootScope,$routeParams, $scope,clickField, FieldService, formid) {


        $scope.submit = submit;
        $scope.cancel = cancel;

        function init()
        {
            $scope.Textarea = [];
            if (clickField.options) {
                var options = clickField.options;
                for (var i = 0; i < options.length; i++) {
                    $scope.Textarea.push(options[i].label + ":" + options[i].value);
                }

                console.log($scope.textOptions);
            }
        }

        init();
        $scope.clickField = clickField;
        $scope.Placeholder = $scope.clickField.type === 'TEXT' || $scope.clickField.type === 'TEXTAREA';
        $scope.Textarea = $scope.clickField.type === 'OPTIONS' || $scope.clickField.type === 'CHECKBOXES' || $scope.clickField.type === 'RADIOS';
        function submit() {
            console.log("clickfield");
            var clickField = {
                label:$scope.clickField.label,
                placeholder:$scope.clickField.placeholder,
                type:$scope.clickField.type,
                options:$scope.clickField.options
            };

            console.log(clickField);

            FieldService.updateField(formid,$scope.clickField._id,clickField)
                .then(function(updateForm) {

                    $scope.clickField = updateForm;
                    //console.log(updateForm);
                    //for (var i= 0; i< updateForm.length; i++) {
                    //    if ($scope.clickField._id = updateForm[i]._id) {
                    //        $scope.clickField.placeholder = updateForm[i].placeholder;
                    //        $scope.clickField.label = updateForm[i].label;
                    //        $scope.clickField.options = updateForm[i].options;
                    //    }
                    //}
                    //console.log("clickFiled=========");
                    //console.log(clickField);


                    //$route.reload();





                    //$scope.clickField.placeholder = updateForm.placeholder;
                    //$scope.clickField.label = updateForm.label;
                    //$scope.clickField.options = updateForm.options;
            });
            $rootScope.modalInstance.close();


        }

        function cancel() {
            $rootScope.modalInstance.dismiss('cancel');
        }
    }
})();