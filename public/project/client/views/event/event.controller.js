
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


        var currentUser = $rootScope.currentUser;
        var currentGroupid = $scope.currentGroupid;
        var currentGroup = $scope.currentGroup;


        console.log($scope.currentGroupid);
        console.log($scope.currentGroup);
        //
        EventService.findAllEvents(currentGroupid)
        .then(function(allEvents){
            model.events= allEvents;
        });



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