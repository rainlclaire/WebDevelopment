(function() {
    angular.module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope, $rootScope, $location, FormService) {

        var user= $rootScope.user;


        if (user !=null) {
            FormService.findAllFormsForUser(user,id, function(allForms) {
                $scope.forms=allForms;
            })
        } else {
            alert("You need to login or register");
        }

        $scope.addForm = function(form) {
            var newForm= {
                name: form.name
            };

            $scope.clickForm.name="";

            FormService.createFormForUser(user,id, newForm, function(clickForm){
                FormService.findAllFormsForUser(user,id, function(allForms) {
                    $scope.forms=allForms;
            });
        });
        };

        $scope.updateForm = function(form) {
            FormService.updateFormById(form.id, form, function(clickForm) {

            })
        };

        $scope.deleteForm = function(form) {
            FormService.deleteFormById(form.id, function(clickForm) {

            })
        };

        $scope.selectForm = function(form) {
            $scope.clickForm.name = $scope.forms[index].name;
        }

    }
})();