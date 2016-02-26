"use strict";


(function() {
    angular.module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope, $rootScope, FormService) {

        var user= $rootScope.user;


        if (user !=null) {
            FormService.findAllFormsForUser(user.id, function(allForms) {
                $scope.forms= allForms;
            });
        } else {
            alert("You need to login or register");
            $scope.$location.path("/home");
        }

        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;


        function addForm(form) {
            var newForm= {
                title: form.title
            };

            $scope.clickForm.title="";

            FormService.createFormForUser(user.id, newForm, function(createdForm){
                FormService.findAllFormsForUser(user.id, function(allForms) {
                    $scope.forms=allForms;

            });
        });
        }

        function updateForm(form) {

           console.log("updateform");


            if ($scope.selectFormIndex != null) {

                $scope.forms[$scope.selectFormIndex].id = form.id;
                $scope.forms[$scope.selectFormIndex].title = form.title;
                $scope.forms[$scope.selectFormIndex].userId = form.userId;

            } else {
                alert("You have to select a Form");


            }
        }



        function deleteForm(index) {
                var deletedId = $scope.forms[index].id;
                FormService.deleteFormById(deletedId, function(remainingForms){
                    $scope.forms = remainingForms;
                });
        }

        function selectForm(index) {
            //$scope.clickForm.title = $scope.forms[index].title;
            $scope.selectFormIndex = index;
            $scope.clickForm = {
                "_id": $scope.forms[index]._id,
                "title": $scope.forms[index].title,
                "userId:": $scope.forms[index].userId
            };
        }

        }
})();