(function () {
    angular.module("FormBuilderApp")
        .factory("UserService", UserService);


    function UserService() {
        console.log("user");
        var currentUser = [];
        var jsonData = [
            {"_id": 123, "firstName": "Alice", "lastName": "Wonderland", "username": "alice", "password": "alice"},
            {"_id": 234, "firstName": "Bob", "lastName": "Hope", "username": "bob", "password": "bob"},
            {"_id": 345, "firstName": "Charlie", "lastName": "Brown", "username": "charlie", "password": "charlie"},
            {"_id": 456, "firstName": "Dan", "lastName": "Craig", "username": "dan", "password": "dan"},
            {"_id": 567, "firstName": "Edward", "lastName": "Norton", "username": "ed", "password": "ed"}
        ];

        return jsonData;


        function findUserByUsernameAndPassword(username, password, callback) {
            var result = null;
            for (var i = 0; i < currentUser.length; i++) {
                if ((currentUser[i].username == username) && (currentUser[i].password = password)) {
                    result= currentUser[i];
                    break;

                }
            }
            callback(result);
        }

        function findAllUsers(callback) {
            callback(currentUser);
        }

        function createUser(user, callback) {
             user.id = guid();
                currentUsers.push(user);

            callback(user);
        }

        function deleteUserById(userId, callback) {
            for (var i = 0; i< currentUser.length(); i++) {
                if (userId == currentUser[i].id) {
                    currentUser.splice(i, 1);
                }
            }
            callback(currentUser);
        }

        function updateUser(userId, user, callback) {
            for (var i =0; i< currentUser.length(); i++) {
                if (userId == currentUser[i].id){
                    currentUser[i] = user;
                }
            }
            callback(user);
        }
    }

})();