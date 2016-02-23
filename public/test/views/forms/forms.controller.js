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
                //$scope.forms.push(clickForm);
        });
        }

        function updateForm(form) {

           console.log("updateform");
            console.log($scope.selectFormIndex);

            $scope.forms[$scope.selectFormIndex]._id= form._id;
            $scope.forms[$scope.selectFormIndex].title= form.title;
            $scope.forms[$scope.selectFormIndex].userId= form.userId;


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