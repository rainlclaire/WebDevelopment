"use strict";

(function() {
    angular.module('FindGroupApp')
        .controller("EventController", EventController);

    function EventController($scope, $location, $rootScope) {
        function DetailsController($sce, $rootScope, $location, $scope, $routeParams, GroupService, GoogleMapService) {

            var vm = this;

            var event_id = $routeParams.event_id;
            console.log(event);

            var currentUser = $rootScope.currentUser;
            //vm.favorite = favorite;


            GroupService.findAllEvents(function (allEvents) {
                $scope.events = allEvents;
            });
            //console.log($scope.groups);
            GroupService.findEventByID(event_id, function (theEvent) {
                $scope.event = theEvent;
                console.log("here");
                console.log($scope.event);
            });

            var events = $scope.events;
            //console.log(groups);


            //$scope.findEvent = findEvent;
            $scope.joinGroup = joinGroup;
            $scope.findGroupMap = findGroupMap;
            $scope.init = init;

            //console.log(group.address);
            function findEvent() {
                for (var i = 0; i < events.size; i++) {
                    //console.log("aaa");
                    if (events[i]._id == event_id) {
                        var event = events[i];
                        $scope.event = event;
                        return event;

                        break;
                    }

                }
                return null;
                //}

                function init(groupAddress) {

                    var theurl = 'https://www.google.com/maps/embed/v1/place?key=AIzaSyBFek2cKN2fA6seFcgfsEDyhE3CONb0ynM&q=' + groupAddress;
                    $scope.url = $sce.trustAsResourceUrl(theurl);
                    return $sce.trustAsResourceUrl("https://www.google.com/maps/embed/v1/place?key=AIzaSyBFek2cKN2fA6seFcgfsEDyhE3CONb0ynM&q=" + groupAddress);

                }


                function joinGroup() {
                    if ($scope.currentUser != null) {
                        alert("to do this join later");
                    } else {
                        alert("You have to login");
                        $location.url("/login");
                    }
                }

                function findGroupMap() {

                    console.log($scope.data);
                    GoogleMapService.searchMapByAddress(group.address)
                        .then(function (response) {
                            $scope.data = response.data;
                        });

                    console.log($scope.data);
                }

            }
        }
    }
})();