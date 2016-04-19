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

            })
            .when("/group", {
                templateUrl: "views/group/group.view.html",
                controller: "GroupController",
                controllerAs:"model"
            })
            .when("/profile", {
                templateUrl: "views/profile/profile.view.html",
                controller:"ProfileController",
                controllerAs:"model",
                resolve: {
                    checkLoggedin: checkLoggedin
                }
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
            .when("/group/:groupid/event", {
                templateUrl: "views/event/events.view.html",
                controller: "EventController",
                controllerAs:"model"
            })
            .when("/group/:groupid/event/:event_title", {
                templateUrl: "views/event/event.view.html",
                controller: "EventController",
                controllerAs:"model"


            })
            .when("/group/:groupid/userjoinEvent", {
                templateUrl: "views/event/event.view.html",
                controller: "EventController",
                controllerAs:"model"


            })
            .when("/details/:group_id", {
                templateUrl:"views/details/detail.view.html",
                controller:"DetailsController",
                controllerAs: "model"

            })
            .when("/admin/:group_id", {
                templateUrl:"views/admin/admin.view.html",
                controller: "AdminController",
                controllerAs:"model"
            })
            .when("/search", {
                templateUrl:"views/search/search.view.html",
                controller:"HomeController"

            })
            .when("/search/:groupTitle", {
                templateUrl:"views/search/search.view.html",
                controller:"HomeController"

            })
            .otherwise( {
                redirectTo: "/home"
            });
    }
    function checkLoggedin(UserService, $q, $location) {
        var deferred = $q.defer();

        UserService
            .getCurrentUser()
            .then(function(response) {
                console.log(response+"-response form config");
                var user = response;
                if(user !=='0') {
                    UserService.setCurrentUser(user);
                    deferred.resolve();
                } else {
                    deferred.reject();
                    $location.url("/home");
                }
            });

        return deferred.promise;
    }





})();


