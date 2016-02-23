(function() {
    angular.module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope, $rootScope, FormService) {

        var user= $rootScope.user;

        if (user !=null) {
            FormService.findAllFormsForUser(user.id, function(allForms) {
                $scope.forms=allForms;
            });
        } else {
            alert("You need to login or register");
        }

        $scope.addForm = function(form) {
            var newForm= {
                title: form.title
            };

            $scope.clickForm.title="";

            FormService.createFormForUser(user.id, newForm, function(createdForm){
                FormService.findAllFormsForUser(user.id, function(allForms) {
                    $scope.forms=allForms;

            });
        });
        };

        $scope.updateForm = function(form) {

           console.log("updateform");
            console.log(selectFormIndex);
                $scope.clickForm[selectFormIndex] = {
                    "id": form._id,
                    "title:":form.title,
                    "userId": form.userId
                }
        };



        $scope.deleteForm = function(index) {
                var deletedId = $scope.forms[index].id;
                FormService.deleteFormById(deletedId, function(remainingForms){
                    $scope.forms = remainingForms;
                });
        };

        $scope.selectForm = function(index) {
            //$scope.clickForm.title = $scope.forms[index].title;
            $scope.clickForm.selectFormIndex = index;
            $scope.clickForm = {
                "id": $scope.forms[index]._id,
                "title": $scope.forms[index].title,
                "userId:": $scope.forms[index].userId
            }
        };

        }


})();