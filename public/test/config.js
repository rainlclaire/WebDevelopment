(function() {
    angular.module("FormBuilderApp")
        .config(function($routeProvider) {

        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.html"

            })
            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController"
            })
            .when("/admin", {
                templateUrl: "./views/users/admin.view.html",
            })
            .when("/forms", {
                templateUrl: "/views/forms/forms.view.html",
                controller: "FormController"
            })
            .when("/register", {
                templateUrl: "/views/users/register.view.html",
                controller: "RegisterController"
            })
            .when("/login", {
                templateUrl: "/views/users/login.view.html",
                controller: "LoginController"
            })
            .otherwise({
                redirectTo: "/home"
            });
    });
});

