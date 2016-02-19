(function() {
    angular.module('FormBuilderApp')
        .controller("LoginController", LoginController);

    function LoginController($scope, $location, $rootScope, UserService) {


        $scope.login = function(user) {
            UserService.findUserByUsernameAndPassword(user.username, user.password, function(loggedInUser) {
                if (loggedInUser != null) {
                    $rootScope.user = user;
                    $location.path("/profile");
                }
                else {
                    alert("You have invalid Username or Password");
                }
            });
        }



    }
})();