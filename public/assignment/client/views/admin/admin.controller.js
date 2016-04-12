(function(){
    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController($rootScope, $location, FormService, UserService) {
        var vm = this;

        vm.remove = remove;
        vm.update = update;
        vm.add    = add;
        vm.select = select;
        vm.sortType = 'username';
        vm.sortReverse = false;

        function init() {
            UserService
                .findAllUsers()
                .then(handleSuccess, handleError);
        }
        init();

        function remove(user) {
            UserService
                .deleteUserById(user._id)
                .then(handleSuccess, handleError);
        }

        function update(user) {
            user.roles = user.roles.replace(/ /g,'').split(",");

            UserService
                .updateUserAdmin(user._id, user)
                .then(handleSuccess, handleError);
        }

        function add(user) {
            // Convert roles string to an array
            user.roles = user.roles.replace(/ /g,'').split(",");

            UserService
                .createUserAdmin(user)
                .then(function(response) {
                    console.log(response);
                    if (response.data) {
                        vm.users = response.data;
                    }
                }, handleError);
        }

        function select(user) {
            user.roles = user.roles.join(",");
            vm.user = angular.copy(user);
        }

        function handleSuccess(response) {
            vm.users = response.data;
        }

        function handleError(error) {
            vm.error = error;
        }
    }
})();