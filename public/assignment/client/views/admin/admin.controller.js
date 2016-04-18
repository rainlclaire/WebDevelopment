
(function() {
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController(UserService) {
        var vm = this;
        var selectedUserId = null;

        vm.users = null;
        vm.type = '';
        vm.downUsername = true;
        vm.downFirstName = true;
        vm.downLastName = true;
        vm.username = "username";
        vm.firstName = "firstName";
        vm.lastName = "lastName";

        vm.addUser = addUser;
        vm.updateUser = updateUser;
        vm.selectUser = selectUser;
        vm.deleteUser = deleteUser;
        vm.sortUp = sortUp;
        vm.sortDown = sortDown;

        function init() {
            UserService
                .findAllUsersFromAdmin()
                .then(function(response) {
                    var users = response;
                    if (users) {
                        vm.users = users;
                        convertToStrings(vm.users);
                    }
                });
        }
        init();

        function sortUp(type) {
            vm.type = type;
            if (type == "username") {
                vm.downUsername = true;
            } else if (type == "firstName") {
                vm.downFirstName = true;
            } else if (type == "lastName") {
                vm.downLastName = true;
            }
        }

        function sortDown(type) {
            vm.type = "-" + type;
            if (type == "username") {
                vm.downUsername = false;
            } else if (type == "firstName") {
                vm.showDscendFirstName = false;
            } else if (type == "lastName") {
                vm.downLastName = false;
            }
        }

        function convertToStrings(users) {
            for (var u in users) {
                var strRoles = "";
                for (var r in users[u].roles) {
                    strRoles += users[u].roles[r] + ",";
                }
                var len = strRoles.length;
                if (len != 0) {
                    users[u].roles = strRoles.substring(0, len - 1);
                } else {
                    users[u].roles = strRoles;
                }
            }
        }

        function convertToString(roles) {
            var strRoles = "";
            for (var r in roles) {
                strRoles += roles[r] + ",";
            }
            var len = strRoles.length;
            if (len != 0) {
                return strRoles.substring(0, len - 1);
            } else {
                return strRoles;
            }
        }

        function convertToArray(user) {
            var roles = [];
            if (typeof user.roles != "undefined" && user.roles.length != 0) {
                roles = user.roles.split(",");
            }
            user.roles = roles;
        }

        function addUser(user) {
            convertToArray(user);
            user.emails = [];
            user.phones = [];
            UserService
                .createUserAdmin(user)
                .then(function(response) {
                    var newUser = response;
                    if (newUser) {
                        return UserService.findAllUsersFromAdmin();
                    }
                })
                .then(function(response) {
                    var users = response;
                    vm.users = users;
                    convertToStrings(vm.users);
                });
        }

        function updateUser(user) {
            if (typeof user.roles == 'string') {
                convertToArray(user);
            }

            if (selectedUserId) {
                UserService
                    .updateUserAdmin(selectedUserId, user)
                    .then(function(response) {
                        var user = response;
                        if (user) {
                            return UserService.findAllUsersFromAdmin();
                        }
                    })
                    .then(function(response) {
                        var users = response;
                        vm.users = users;
                        convertToStrings(vm.users);
                    });
            }
        }

        function selectUser(user) {
            // find user id from vm.users
            var index = null;
            for (var u in vm.users) {
                if (vm.users[u].username == user.username) {
                    index = u;
                }
            }
            selectedUserId = vm.users[index]._id;

            UserService
                .findUserByIdAdmin(selectedUserId)
                .then(function(response) {
                    var user = response;
                    vm.user = {
                        username: user.username,
                        // clear the password
                        password: null,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        emails: user.emails,
                        phones: user.phones,
                        roles: convertToString(user.roles)
                    };
                });
        }

        function deleteUser(user) {
            // find user id from vm.users
            var index = null;
            for (var u in vm.users) {
                if (vm.users[u].username == user.username) {
                    index = u;
                }
            }
            selectedUserId = vm.users[index]._id;

            UserService
                .deleteUserAdmin(selectedUserId)
                .then(function() {
                    return UserService.findAllUsersFromAdmin();
                })
                .then(function(response) {
                    var users = response;
                    vm.users = users;
                    convertToStrings(vm.users);
                });
        }

    }
})();