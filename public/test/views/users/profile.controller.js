(function() {
    angular.module('FormBuilderApp')
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $rootScope, UserService) {
        var user = $rootScope.user;



        if (user != null) {
                $scope.user.username = user.username;
                $scope.user.password = user.password;

                $scope.user.email = user.email;
                $scope.user.firstName = user.firstName;
                $scope.user.lastName = user.lastName;
        } else {
            alert("Your have to Login or Register");
        }

        $scope.update = function(updateUser) {
            UserService.updateUser(user,id, updateUser, function(mergedUser) {
                alert("Updated it");
            })
        }


    }
})();