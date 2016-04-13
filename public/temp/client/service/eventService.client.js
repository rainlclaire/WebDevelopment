(function () {
    angular.module("FindGroupApp")
        .factory("EventService", EventService);

    function EventService($http, $q) {
        //init the current forms
        //var events = groups.listofEvents;

        //var events = GroupService.findAllGroups(function(AllGroups) {
        //
        //});
        //console.log(events);
        var service = {
            //createEvent: createEvent,
            findAllEvents: findAllEvents,
            createEvent:createEvent,
            findEventByTitle:findEventByTitle,
            deleteEventById:deleteEventById,
            updateEventForGroup:updateEventForGroup
            //deleteGroupById: deleteGroupById,
            //updateGroupById: updateGroupById,
            //findEventByID: findEventByID
            //findGroupsByTitle: findGroupsByTitle
        };
        return service;

        function updateEventForGroup(groupid, eventid, event) {
            var deferred = $q.defer();
            $http.put("/api/temp/group/"+groupid+"/event/"+eventid, event)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function deleteEventById(groupid, eventid) {
            var deferred = $q.defer();
            $http.delete("/api/temp/group/"+groupid+"/event/"+eventid)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function createEvent(groupid, event) {
            var deferred = $q.defer();
            $http.post("/api/temp/group/"+groupid+"/event", event)
                .success(function (response) {
                    console.log("createevent response");
                    console.log(response);
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function findEventByTitle(groupid, title){
            var deferred = $q.defer();

            $http.get("/api/temp/group/"+groupid+"/event/"+title)
                .success(function (response) {
                    deferred.resolve(response);
                    console.log(response);
                });
            return deferred.promise;
        }



        function findAllEvents(groupid) {
            var deferred = $q.defer();

            $http.get("/api/temp/group/"+groupid+"/event")
                .success(function (response) {
                    deferred.resolve(response);
                    console.log(response);
                });
            return deferred.promise;

        }

    }
})();