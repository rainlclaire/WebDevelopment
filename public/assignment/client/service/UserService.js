"use strict";

(function () {
	angular
		.module("FormBuilderApp")
		.factory("UserService", UserService);

	function UserService($http, $q) {

		var service = {
			findUserByCredentials: findUserByCredentials,
			findAllUsers: findAllUsers,
			createUser: createUser,
			deleteUserById: deleteUserById,
			updateUser: updateUser
		};
		return service;

		// Accepts username and password strings.  Calls user service on server
		// for matching user docs that have the correct creds.  Returns a promise.
		function findUserByCredentials(username, password) {
			var deferred = $q.defer();
			$http.get("/api/assignment/user?username=" + username + "&password=" + password)
				.success(function(response) {
					deferred.resolve(response);
				});
			return deferred.promise;
		}

		// Calls user service on server requesting all users.  Returns a promise.
		function findAllUsers() {
			var deferred = $q.defer();
			$http.get("/api/assignment/user")
				.success(function(response) {
					deferred.resolve(response);
				});
			return deferred.promise;
		}

		// Accepts new user object.  Calls user service on server requesting it
		// create the new user.  Returns a promise.
		function createUser(user) {
			var deferred = $q.defer();
			$http.post("/api/assignment/user", user)
				.success(function(response) {
					deferred.resolve(response);
				});
			return deferred.promise;
		}

		// Accepts id of user.  Calls user service on server requesting that it
		// delete the corresponding user doc.  Returns a promise.
		function deleteUserById(id) {
			var deferred = $q.defer();
			$http.delete("/api/assignment/user/" + id)
				.success(function(response) {
					deferred.resolve(response);
				});
			return deferred.promise;
		}

		// Accepts id of user and a user object with new properties.  If user is
		// is found, the user object is updated with the new properties.  Executes
		// updateUserCallback with the updated user.
		function updateUser(id, updatedUser) {
			var deferred = $q.defer();
			$http.put("/api/assignment/user/" + id, updatedUser)
				.success(function(response) {
					deferred.resolve(response);
				});
			return deferred.promise;
		}
	}
})();