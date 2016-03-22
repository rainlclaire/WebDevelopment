//"use strict";
//
//(function() {
//    angular.module('FindGroupApp')
//        .controller("EventController", EventController);
//
//
//        function EventController($sce, $rootScope, $location, $scope, $routeParams, EventService, GoogleMapService) {
//
//            var vm = this;
//
//            var event_id = $routeParams.event_id;
//            console.log(event_id);
//
//            var currentUser = $rootScope.currentUser;
//            //vm.favorite = favorite;
//
//
//            EventService.findAllEvents(function (allEvents) {
//                $scope.events = allEvents;
//                console.log(allEvents);
//            });
//            //console.log($scope.groups);
//            EventService.findEventByID(event_id, function (theEvent) {
//                $scope.event = theEvent;
//                console.log("here");
//                console.log($scope.event);
//            });
//
//            var events = $scope.events;
//            console.log(events);
//            //console.log(groups);
//
//            function init() {
//                EventService.findEventByID(event_id, function (theEvent) {
//                    $scope.event = theEvent;
//                    console.log("here");
//                    console.log($scope.event);
//                });
//
//            }
//            init();
//
//
//            $scope.findEvent = findEvent;
//            $scope.joinGroup = joinGroup;
//            $scope.findGroupMap = findGroupMap;
//            $scope.init = init;
//
//            //console.log(group.address);
//            function findEvent() {
//                for (var i = 0; i < events.size; i++) {
//                    //console.log("aaa");
//                    if (events[i]._id == event_id) {
//                        var event = events[i];
//                        $scope.event = event;
//                        return event;
//
//                        break;
//                    }
//
//                }
//                return null;
//                //}
//
//                function init(groupAddress) {
//
//                    var theurl = 'https://www.google.com/maps/embed/v1/place?key=AIzaSyBFek2cKN2fA6seFcgfsEDyhE3CONb0ynM&q=' + groupAddress;
//                    $scope.url = $sce.trustAsResourceUrl(theurl);
//                    return $sce.trustAsResourceUrl("https://www.google.com/maps/embed/v1/place?key=AIzaSyBFek2cKN2fA6seFcgfsEDyhE3CONb0ynM&q=" + groupAddress);
//
//                }
//
//
//                function joinGroup() {
//                    if ($scope.currentUser != null) {
//                        alert("to do this join later");
//                    } else {
//                        alert("You have to login");
//                        $location.url("/login");
//                    }
//                }
//
//                function findGroupMap() {
//
//                    console.log($scope.data);
//                    GoogleMapService.searchMapByAddress(group.address)
//                        .then(function (response) {
//                            $scope.data = response.data;
//                        });
//
//                    console.log($scope.data);
//                }
//
//            }
//        }
//
//})();

(function(){


    angular
        .module("FindGroupApp")
        .controller("EventController", EventController);

    function EventController($sce, $rootScope,$location, $scope, $routeParams, EventService, GoogleMapService) {

        var vm = this;

        var event_title = $routeParams.event_title;
        console.log(event_title);


        var currentUser = $rootScope.currentUser;
        var currentGroupid = $scope.currentGroupid;
        var currentGroup = $scope.currentGroup;


        console.log($scope.currentGroupid);
        console.log($scope.currentGroup);
        //
        EventService.findAllEvents(currentGroupid, function(allEvents) {
            $scope.events= allEvents;
        });



        function findEvent() {
            for(var i = 0; i< currentGroup.listofEvents.length; i++) {
                console.log("hr");
                if (currentGroup.listofEvents[i].title==event_title) {
                    console.log("hh");
                    $scope.event = currentGroup.listofEvents[i];

                }
            }

        }
        findEvent();
        console.log($scope.event);


    }
})();