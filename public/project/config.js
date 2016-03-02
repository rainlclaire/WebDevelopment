"use strict";

(function() {
    angular.module("FindGroupApp")
        .config(Configuration);

    function Configuration($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.html"
            })
            .when("/group", {
                templateUrl: "views/group/group.view.html",
                controller: "GroupController"
            })
            //.when("/admin", {
            //    templateUrl: "views/admin/admin.view.html"
            //})
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
            .otherwise( {
                redirectTo: "/home"
            });
    }
})();


