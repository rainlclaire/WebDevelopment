
(function(){


    angular
        .module("FindGroupApp")
        .controller("EventController", EventController);

    function EventController($sce, $rootScope,$location, $scope, $routeParams, EventService, GroupService, GoogleMapService) {

        var model = this;
        var groupid = $routeParams.groupid;
        var event_title = $routeParams.event_title;
        console.log(groupid);
        console.log(event_title);


        model.joinEvent= joinEvent;
        var user = $rootScope.user;
        var currentGroupid = $scope.currentGroupid;
        var currentGroup = $scope.currentGroup;


        console.log($scope.currentGroupid);
        console.log($scope.currentGroup);
        //
        EventService.findAllEvents(currentGroupid)
        .then(function(allEvents){
            model.events= allEvents;
        });




        function joinEvent() {
            if ($rootScope.user == null) {
                $location.url("/login");
            } else {
                EventService.findEventByTitle(currentGroupid, event_title)
                    .then(function (theEvent) {

                        EventService.userJoinEvent($rootScope.user, theEvent._id, currentGroupid)
                            .then(function (event) {
                                console.log(event);
                                //for (var i =0; i<event.length; i++) {
                                //    if (event[i].title = event_title) {
                                        model.event.peopleJoin = event.peopleJoin;
                                //    }
                                //}

                                //EventService.findEventByTitle(groupid, event_title)
                                //    .then(function(theEvent) {
                                //        model.event.peopleJoin = event.listofEvents.peopleJoin;
                                //    });
                                //console.log(model.event);



                            });

                    });
            }
        }


        function findEvent() {
            EventService.findEventByTitle(groupid, event_title)
            .then(function(theEvent) {
                model.event = theEvent;
            });


        }
        findEvent();
        //console.log($scope.event);


    }
})();