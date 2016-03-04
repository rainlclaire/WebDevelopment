"use strict";

(function() {
    angular.module("FindGroupApp")
        .config(Configuration);

    function Configuration($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.html",
                controller:"HomeController"
            })
            .when("/group", {
                templateUrl: "views/group/group.view.html",
                controller: "GroupController"
            })
            .when("/profile", {
                templateUrl: "views/profile/profile.view.html",
                controller:"ProfileController"
            })
            .when("/signUp", {
                templateUrl: "views/signUp/signUp.view.html",
                controller: "SignUpController"
            })
            .when("/login", {
                templateUrl: "views/login/logIn.view.html",
                controller: "LogInController"
            })
            .when("/event", {
                templateUrl: "views/event/event.view.html",
                controller: "EventController"
            })
            .when("/details/:group_id", {
                templateUrl:"views/details/detail.view.html",
                controller:"DetailsController as model"
            })
            .when("/search", {
                templateUrl:"views/search/search.view.html"
                //controller:"HomeController"
            })
            .when("/search/:title", {
                templateUrl:"views/search/search.view.html"
                //controller:"HomeController"
            })
            .otherwise( {
                redirectTo: "/home"
            });
    }
})();


