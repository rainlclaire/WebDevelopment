(function(){
    angular
        .module("FindGroupApp")
        .controller("ProfileController", profileController);

    function profileController($scope, UserService, $location) {
        console.log("profile");

        $scope.error = null;
        $scope.message = null;

        $scope.currentUser = UserService.getCurrentUser();

        console.log($scope.currentUser);
        if (!$scope.currentUser) {
            console.log("go to home");
            $location.url("/home");
        }

        $scope.updateUser = updateUser;
        $scope.goGroup = goGroup;
        function goGroup(group) {
            $location.url("/details/"+group._id)
        }

        function updateUser (user) {
            // same validation as register
            $scope.error = null;
            $scope.message = null;

            $scope.currentUser = UserService.updateUser(user);

            if (user) {
                alert("User updated successfully");
                UserService.setCurrentUser($scope.currentUser);
                $location.url("/home");
            } else {
                 alert("Unable to update the user");
            }
        }
    }
})();