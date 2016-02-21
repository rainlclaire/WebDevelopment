(function() {
    angular.module('FormBuilderApp')
        .controller("RegisterController", RegisterController);

    function RegisterController($scope,$rootScope, $location, UserService) {
        console.log("register");
        $scope.register = function(user) {
            UserService.createUser(user, function(createUser) {
                $rootScope.user = createUser;
                $location.path("/profile");
            });
        }
    }
})();