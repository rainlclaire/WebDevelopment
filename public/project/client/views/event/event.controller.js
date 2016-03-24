
(function(){


    angular
        .module("FindGroupApp")
        .controller("EventController", EventController);

    function EventController($sce, $rootScope,$location, $scope, $routeParams, EventService, GroupService, GoogleMapService) {

        var vm = this;

        var event_title = $routeParams.event_title;
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
            GroupService.findEventByTitle(currentGroupid, event_title)
            .then(function(event) {
                model.evetn = event;
            });
            //});
            //for(var i = 0; i< currentGroup.listofEvents.length; i++) {
            //    console.log("hr");
            //    if (currentGroup.listofEvents[i].title==event_title) {
            //        console.log("hh");
            //        $scope.event = currentGroup.listofEvents[i];
            //
            //    }
            //}

        }
        findEvent();
        //console.log($scope.event);


    }
})();