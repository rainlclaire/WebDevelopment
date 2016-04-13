//
//"use strict";
//
//(function() {
//    angular.module('FindGroupApp')
//        .controller("ProfileController", ProfileController);
//
//    function ProfileController($location,$rootScope, UserService) {
//        //console.log("profile");
//        //console.log($scope.user);
//        //var user = $rootScope.user;
//
//        var model = this;
//        model.update = update;
//        //model.error = null;
//        //model.message = null;
//
//
//
//        var user = $rootScope.user;
//        console.log(user);
//
//        //set the user info to user
//        if (user != null) {
//            console.log(model);
//            model.user = {};
//            model.user.username = user.username;
//            model.user.password = user.password;
//            model.user.verifyPassword= user.verifyPassword;
//            model.user.email = user.email;
//            model.user.roles = user.roles;
//            model.user.firstName = user.firstName;
//            model.user.lastName = user.lastName;
//        } else {
//            $location.url("/home");
//
//        }
//
//        function update(updateUser) {
//            //model.message= null;
//            //if (!model.message) {
//                UserService.updateUser(user.id, updateUser)
//                    .then(function(mergeUser) {
//                        model.user = mergeUser.data;
//                        console.log(mergeUser.data.email);
//                        $rootScope.user = mergeUser.data;
//                        $location.path("/home");
//                        alert("user updated successfully");
//
//
//                    });
//
//        }
//
//
//    }
//})();
(function() {
    angular
        .module("FindGroupApp")
        .controller("ProfileController", profileController);

    function profileController(UserService, $rootScope, $location) {
        console.log("profile");
        var model = this;
        model.error = null;
        model.message = null;

        var user = $rootScope.user;
        //$scope.error = null;
        //$scope.message = null;

        //$scope.currentUser = UserService.getCurrentUser();


        if (user != null) {
            model.currentUser = {};
            model.currentUser.username = user.username;
            model.currentUser.password = user.password;
            model.currentUser.groupJoined = user.groupJoined;
            model.currentUser.email = user.email;
            model.currentUser.roles = user.roles;
            model.currentUser.likeGroups = user.likeGroups;
            model.currentUser.firstName = user.firstName;
            model.currentUser.lastName = user.lastName;

        } else {
            console.log("go to home");
            $location.url("/home");
        }




        model.update = update;
        model.goGroup = goGroup;

        model.cancel = cancel;
        function goGroup(group) {
            $location.url("/details/" + group._id)
        }

        function cancel() {
            $location.url("/home");
        }

        function update(updateUser) {
            UserService.updateUser(user.id, updateUser)
                .then(function (mergeUser) {
                    model.user = mergeUser.data;
                    console.log(mergeUser.data.email);
                    $rootScope.user = mergeUser.data;
                    $location.path("/home");
                    alert("user updated successfully");


                });
        }
    }

})();