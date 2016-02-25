(function() {
    angular.module('FormBuilderApp')
        .controller("RegisterController", RegisterController);

    function RegisterController($scope,$rootScope, $location, UserService) {


        $scope.message = null;

        $scope.register = register;


        function register(user) {

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
                return;
            }
            if (user.password != user.verifyPassword) {
                $scope.message = "Passwords must match";
                return;
            }
            if (!user.email) {
                $scope.message = "You have to provide invalid email";
                return;
            }

            UserService.findUserByUser(user.username,function(findUser) {
                $rootScope.registerUser = findUser;
                if (findUser != null) {
                    $scope.message = "username already exists";
                }
            });

            UserService.createUser(user, function(createUser) {
                $rootScope.user = createUser;
                if (!$scope.message) {
                    $scope.$location.url("/profile");
                }
            });



        }

    }
})();