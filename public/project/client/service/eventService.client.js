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
            findEventByTitle:findEventByTitle
            //deleteGroupById: deleteGroupById,
            //updateGroupById: updateGroupById,
            //findEventByID: findEventByID
            //findGroupsByTitle: findGroupsByTitle
        };
        return service;

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