(function() {
    angular.module('FormBuilderApp')
        .controller("LoginController", LoginController);

    function LoginController($scope, $location, $rootScope, UserService) {
        console.log("login");


        $scope.login = function(user) {
            console.log("login2");
            UserService.findUserByCredentials(user.username, user.password, function (loggedInUser) {
                console.log("login3");
                if (loggedInUser != null) {
                    $rootScope.user = loggedInUser;
                    $location.path("/profile");
                }

                else {
                    alert("You have invalid Username or Password");
                }
            });



        }






    }
})();