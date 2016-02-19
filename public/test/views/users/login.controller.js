(function() {
    angular.module('FormBuilderApp')
        .controller("LoginController", LoginController);

    function LoginController($scope, $location, $rootScope, UserService) {
        console.log("login");


        $scope.login = function(user) {
            UserService.findUserByUsernameAndPassword(user.username, user.password, function(loggedInUser) {
                if (loggedInUser != null) {
                    $rootScope.user = loggedInUser;
                    $location.path("/views/profile");
                }
                else {
                    alert("You have invalid Username or Password");
                }
            });
        }



    }
})();