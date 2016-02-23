(function () {
    angular.module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $location, $rootScope, UserService) {
        console.log("loginout");
        $scope.logout = function (user) {
            console.log("loginout");
            console.log(user);
            UserService.findUserByCredentials(user.username, user.password, function (loggedInUser) {
                if (loggedInUser != null) {
                    $rootScope.user = null;
                    $location.path("/");
                    alert("Logged out");
                }

            });
        }
    }

})();

