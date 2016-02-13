(function() {
    angular.module("FormBuilderApp", ["ngRoute"])
        .config(function($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "/view/home/home.view.html"
            })
            .when("/profile", {
                templateUrl: "/view/users/profile.view.html"
            })
            .when("/amdin", {
                templateUrl: "view/users/admin.view.html"
            })
            .when("/forms", {
                templateUrl: "view/forms/forms.view.html"
            })
            .when("register", {
                templateUrl: "view/users/register.view.html"
            })
            .when("login", {
                templateUrl: "view/users/login.view.html"
            })
            .otherwise({
                redirectTo:"/"
            });
    });
})();