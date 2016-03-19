"use strict";

(function() {
    angular.module("FormBuilderApp")
        .config(Configuration);

    function Configuration($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.html"
            })
            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController",
                controllerAs:"model"
            })
            .when("/admin", {
                templateUrl: "views/admin/admin.view.html"
            })
            .when("/register", {
                templateUrl: "views/users/register.view.html",
                controller: "RegisterController",
                controllerAs:"model"
            })
            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller: "LoginController",
                controllerAs:"model"
            })
            .when("/user", {
                templateUrl: "/views/forms/field.view.html",
                controller: "FieldController",
                controllerAs: "model"
            })
            .when("/user/:userid/form/:formid/fields", {
                templateUrl:"views/forms/form-fields.view.html",
                controller:"FieldController",
                controllerAs:"model"
            })
            .when("/forms", {
                templateUrl: "views/forms/forms.view.html",
                controller: "FormController",
                controllerAs:"model"
            })
<<<<<<< HEAD
            .when("/fields", {
=======
            .when("/field", {
>>>>>>> 46f4527bd2bb7a1cab96d541c3369baedea87607
                templateUrl:"views/forms/form-fields.view.html"
            })
            .when("/form/:formid/fields", {
                templateUrl:"views/forms/form-fields.view.html",
                controller:"FieldController",
                controllerAs:"model"
            })
            .otherwise( {
                redirectTo: "/home"
            });
    }
})();


