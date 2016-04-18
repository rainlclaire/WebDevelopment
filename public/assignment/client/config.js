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
                controllerAs:"model",
                resolve: {
                    checkAdmin: checkLoggedin
                }
            })
            .when("/admin", {
                templateUrl: "views/admin/admin.view.html",
                controller:"AdminController",
                controllerAs:"model",
                resolve: {
                 checkAdmin: checkAdmin
            }
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
                controllerAs:"model",
                resolve: {
                    checkLoggedin: checkLoggedin
                }
            })
            .when("/field", {

                templateUrl:"views/forms/form-fields.view.html"
            })
            .when("/form/:formid/fields", {
                templateUrl:"views/forms/form-fields.view.html",
                controller:"FieldController",
                controllerAs:"model",
                resolve: {
                    checkLoggedin: checkLoggedin
                }
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
                var user = response;
                if(user != '0') {
                    UserService.setCurrentUser(user);
                    deferred.resolve();
                } else {
                    deferred.reject();
                    $location.url("/home");
                }
            });

        return deferred.promise;
    }

    function checkAdmin(UserService, $q, $location) {
        var deferred = $q.defer();

        UserService
            .getCurrentUser()
            .then(function(response) {
                var user = response;
                if (user !== '0' && user.roles.indexOf('admin') != -1) {
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


