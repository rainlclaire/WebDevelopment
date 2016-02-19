(function() {
    angular.module('FormBuilderApp')
        .controller("RegisterController", RegisterController);

    function RegisterController($scope,$rootScope, $location, UserService) {
        $scope.register = function(newUser) {
            UserService.createUser(newUser, function(createUser) {
                $rootScope.user = createUser;
                $location.path("/profile");
            });
        }
    }
})();