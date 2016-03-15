"use strict";

(function () {
	angular
		.module("FormBuilderApp")
		.factory("FormService", FormService);

	function FormService($http, $q) {
		var service = {
			createFormForUser: createFormForUser,
			findAllFormsForUser: findAllFormsForUser,
			deleteFormById: deleteFormById,
			updateFormById: updateFormById,
			deleteFormByIdForUser: deleteFormByIdForUser
		};
		return service;

		// Accepts id of user and new form object.  Calls form service on
		// server to create the form.  Returns a promise.
		function createFormForUser(userid, form) {
			var deferred = $q.defer();
			$http.post("/api/assignment/user/" + userid + "/form", form)
				.success(function(response) {
					deferred.resolve(response);
				});
			return deferred.promise;
		}

		// Accepts id of user.  Calls form service on server for matching
		// forms.  Returns a promise.
		function findAllFormsForUser(userid) {
			var deferred = $q.defer();
			$http.get("/api/assignment/user/" + userid + "/form")
				.success(function(response) {
					deferred.resolve(response);
				});
			return deferred.promise;
		}

		// Accepts form id.  Calls form service on server to delete form
		// with matching id.  Returns a promise.
		function deleteFormById(id) {
			var deferred = $q.defer();
			$http.delete("/api/assignment/form/" + id)
				.success(function(response) {
					deferred.resolve(response);
				});
			return deferred.promise;
		}

		// Accepts a form id and a userid.  Calls form service on server to
		// delete the form with the matching id and requests a list of all
		// forms owned by the userid.  Returns a promise.
		function deleteFormByIdForUser(id, userid) {
			var deferred = $q.defer();
			$http.delete("/api/assignment/user/" + userid + "/form/" + id)
				.then(function(response) {
					deferred.resolve(response);
				});
			return deferred.promise;
		}

		// Accepts id of form and updated form object.  Calls form service
		// on server to locate matching form and update accordingly.  Returns
		// a promise.
		function updateFormById(id, updatedForm) {
			var deferred = $q.defer();
			$http.put("/api/assignment/form/" + id, updatedForm)
				.success(function(response) {
					deferred.resolve(response);
				});
			return deferred.promise;
		}
	}
})();