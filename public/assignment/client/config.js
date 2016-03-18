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
            //add routing requirement here ?????
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


