(function() {
    angular.module('FormBuilderApp')
        .controller("RegisterController", RegisterController);

    function RegisterController($scope,$rootScope, $location, UserService) {


        $scope.message = null;
        $scope.register = register;


        function register(user) {
            console.log("register");
            $scope.message = null;
            if (user == null) {
                $scope.message = "Please fill in the required fields";
                return;
            }
            if (!user.username) {
                $scope.message = "Please provide a username";
                return;
            }
            if (!user.password || !user.verifyPassword) {
                $scope.message = "Please provide a password";
            }
            if (user.password != user.verifyPassword) {
                $scope.message = "Passwords must match";
            }


            UserService.createUser(user, function(createUser) {
                $rootScope.user = createUser;
                if (!$scope.message) {
                    $scope.$location.path("/profile");
                }
            });


        }

    }
})();