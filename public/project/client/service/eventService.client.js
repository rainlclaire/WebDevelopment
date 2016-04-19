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
            updateEventForGroup:updateEventForGroup,
            userJoinEvent:userJoinEvent
            //deleteGroupById: deleteGroupById,
            //updateGroupById: updateGroupById,
            //findEventByID: findEventByID
            //findGroupsByTitle: findGroupsByTitle
        };
        return service;

        function userJoinEvent(user, id, groupid) {
            var deferred = $q.defer();
            $http.post("/project/group/"+groupid+"/userjoinEvent/"+id,user)
                .success(function (response) {
                    deferred.resolve(response);
                    //$rootScope.groups = response;
                });
            return deferred.promise;
        }

        function updateEventForGroup(groupid, eventid, event) {
            var deferred = $q.defer();
            console.log("udpateevent in client");
            $http.put("/api/project/group/"+groupid+"/event/"+eventid, event)
                .success(function (response) {
                    console.log(response+"---reponse update event");
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function deleteEventById(groupid, eventid) {
            var deferred = $q.defer();
            $http.delete("/api/project/group/"+groupid+"/event/"+eventid)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function createEvent(groupid, event) {
            var deferred = $q.defer();
            $http.post("/api/project/group/"+groupid+"/event", event)
                .success(function (response) {
                    console.log("createevent response");
                    console.log(response);
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function findEventByTitle(groupid, title){
            var deferred = $q.defer();

            $http.get("/api/project/group/"+groupid+"/event/"+title)
                .success(function (response) {
                    deferred.resolve(response);
                    console.log(response);
                });
            return deferred.promise;
        }



        function findAllEvents(groupid) {
            var deferred = $q.defer();

            $http.get("/api/project/group/"+groupid+"/event")
                .success(function (response) {
                    deferred.resolve(response);
                    console.log(response);
                });
            return deferred.promise;

        }

    }
})();