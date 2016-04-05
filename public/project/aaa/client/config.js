"use strict";

(function() {
    angular.module("FindGroupApp")
        .config(Configuration);

    function Configuration($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.html",
                controller:"HomeController",
                controllerAs:"model"
                //resolve: {
                //    getLoggedIn:getLoggedIn
                //}
            })
            .when("/group", {
                templateUrl: "views/group/group.view.html",
                controller: "GroupController",
                controllerAs:"model"
            })
            .when("/profile", {
                templateUrl: "views/profile/profile.view.html",
                controller:"ProfileController",
                controllerAs:"model"
                //resolve: {
                //    checkLoggedIn:checkLoggedIn
                //}
            })
            .when("/signup", {
                templateUrl: "views/signup/signup.view.html",
                controller: "SignUpController",
                controllerAs:"model"
            })
            .when("/login", {
                templateUrl: "views/login/login.view.html",
                controller: "LogInController",
                controllerAs:"model"
            })
            .when("/group/:groupid/event/:event_title", {
                templateUrl: "views/event/event.view.html",
                controller: "EventController",
                controllerAs:"model"
                //resolve: {
                //    getLoggedIn:getLoggedIn
                //}

            })
            .when("/details/:group_id", {
                templateUrl:"views/details/detail.view.html",
                controller:"DetailsController",
                controllerAs: "model"
                //resolve: {
                //    getLoggedIn: getLoggedIn
                //}
            })
            //.when("/admin/:group_id", {
            //    templateUrl:"views/admin/admin.view.html",
            //    controller: "AdminController",
            //    controllerAs:"model"
            //})
            .when("/search", {
                templateUrl:"views/search/search.view.html",
                controller:"HomeController"
                //resolve: {
                //    getLoggedIn: getLoggedIn
                //}
                //controller:"HomeController"
            })
            .when("/search/:groupTitle", {
                templateUrl:"views/search/search.view.html",
                controller:"HomeController"
                //resolve: {
                //    getLoggedIn: getLoggedIn
                //}
                //controller:"HomeController"
            })
            .otherwise( {
                redirectTo: "/home"
            });
    }

    //function getLoggedIn(UserService, $q) {
    //    var deferred = $q.defer();
    //
    //    UserService.getCurrentUser()
    //    .then(function(response){
    //        var currentUser = response.date;
    //        UserService.setCurrentUser(currentUser);
    //        deferred.resolve();
    //    });
    //
    //    return deferred.promise;
    //}
    //
    //function checkLoggedIn(UserService, $q, $location) {
    //    var deferred = $q.defer();
    //
    //    UserService.getCurrentUser()
    //    .then(function(response) {
    //        var currentUser = response.data;
    //        if (currentUser) {
    //            UserService.setCurrentUser(currentUser);
    //            deferred.resolve();
    //        } else {
    //            deferred().reject();
    //            $location.url("/home");
    //        }
    //    });
    //
    //    return deferred.promise;
    //}
})();


