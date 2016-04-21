
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
        model.findGroupMap = findGroupMap;
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


        function init(eventAddress) {


            console.log(eventAddress);
            var theurl = 'https://www.google.com/maps/embed/v1/place?key=AIzaSyBFek2cKN2fA6seFcgfsEDyhE3CONb0ynM&q='+eventAddress;
            $scope.url = $sce.trustAsResourceUrl(theurl);
            console.log($scope.url);
            return $sce.trustAsResourceUrl("https://www.google.com/maps/embed/v1/place?key=AIzaSyBFek2cKN2fA6seFcgfsEDyhE3CONb0ynM&q="+eventAddress);

        }

        function findGroupMap() {
            console.log("findgroup map");
            //console.log($scope.data);
            GoogleMapService.searchMapByAddress(model.event.address)
                .then(function(response) {
                    $scope.data = response.data;
                });
            //
            //console.log($scope.data);
        }

        function joinEvent() {
            if ($rootScope.user == null) {
                $location.url("/login");
            }
            EventService.findEventByTitle(currentGroupid, event_title)
                .then(function (theEvent) {
                    console.log(theEvent);
                    console.log(theEvent.peopleJoin);
                    if (theEvent.peopleJoin.length >0) {
                    for (var i = 0; i < theEvent.peopleJoin.length; i++) {
                        if (theEvent.peopleJoin[i]._id = $rootScope.user._id) {
                            console.log("user join again");
                            $rootScope.joinevent = true;
                            alert("You alreday join the event");

                        }
                        }
                    } else {
                        EventService.userJoinEvent($rootScope.user, theEvent._id, currentGroupid)
                            .then(function (event) {
                                console.log(event);
                                $rootScope.joinevent = true;
                                //for (var i =0; i<event.length; i++) {
                                //    if (event[i].title = event_title) {
                                model.event.peopleJoin = event.peopleJoin;
                            });
                    }
                });

            if (!joinEvent) {
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

            }



        }

        function findEvent() {
            EventService.findEventByTitle(groupid, event_title)
            .then(function(theEvent) {
                model.event = theEvent;
                init(model.event.address);
            });


        }
        findEvent();
        //console.log($scope.event);


    }
})();