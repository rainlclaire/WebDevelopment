"use strict";


(function() {
    angular.module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope, $rootScope, FormService) {

        var model = this;
        model.addForm = addForm;
        model.updateForm = updateForm;
        model.deleteForm = deleteForm;
        model.selectForm = selectForm;

        var user= $rootScope.user;
        //form page only show when user logged in
        if (user !=null) {
            FormService.findAllFormsForUser(user.id)
            .then(function(allForms){
                $scope.forms= allForms;
            });
        } else {
            alert("You need to login or register");
            $scope.$location.path("/home");
        }

        //function for form



        //add the form to currentForms
        function addForm(form) {
            var newForm= {
                title: form.title,
                _id: form._id,
                userId: form.userId
            };

            //inti the title with empty
            $scope.clickForm.title="";

            FormService.createFormForUser(user.id, newForm)
            .then(function(createdForms){
                FormService.findAllFormsForUser(user.id)
                .then(function(allForms){
                    $scope.forms = allForms;

                });
            });
        }

        //update the select form with the given form info
        function updateForm(form) {
            if ($scope.selectFormIndex != null) {
                $scope.forms[$scope.selectFormIndex].id = form.id;
                $scope.forms[$scope.selectFormIndex].title = form.title;
                $scope.forms[$scope.selectFormIndex].userId = form.userId;

            } else {
                alert("You have to select a Form");
            }
        }

        //delete the form with given form's index
        function deleteForm(index) {
            var deletedId = $scope.forms[index].id;
            FormService.deleteFormById(deletedId)
            .then(function(allOtherForms){
                $scope.forms = allOtherForms;
            });
        }

        //select the form with given form's index
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