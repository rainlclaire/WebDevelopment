(function() {
    "use strict";

    angular
        .module("FindGroupApp")
        .controller("addEventController", addEventController);


    function addEventController($route, $sce,$rootScope, $routeParams, $scope,currentGroup,groups,events, $location,EventService, GroupService) {
        var model = this;
        console.log(currentGroup);

        model.addEventInGroup = addEventInGroup;




        function addEventInGroup(event) {
            //GroupService.findAllEvents($scope.currentGroup, function (allEvents) {
            //    $scope.events = allEvents;
            //
            //});
            var newEvent = {
                _id:event._id,
                title: event.title,
                date: event.date,
                htmlVariable: event.htmlVariable,
                description: event.description,
                address:event.address,
                peopleJoin:[]

            };


            console.log($scope.currentGroup._id);
            EventService.createEvent($scope.currentGroup._id, newEvent)
                .then(function (listofEvents) {
                    console.log(listofEvents);
                    $rootScope.listofEvents = listofEvents;
                    console.log(listofEvents);
                    EventService.findAllEvents($scope.currentGroup._id)
                    .then(function(allEvents) {
                        for (var i = 0; i< allEvents.length;i++) {

                            allEvents[i].htmlVariable = $sce.trustAsHtml(allEvents[i].htmlVariable);
                            $rootScope.listofEvents = allEvents;
                        }
                    });



                });
            $rootScope.modalInstance.close();



        }


        //model.editGroup = editGroup;
        //var groupid = clickGroup._id;
        //
        //function editGroup(groupid,group) {
        //    GroupService.updateGroup(groupid, group)
        //    .then(function(updateGroups) {
        //        groups = updateGroups;
        //        console.log("form editGroup");
        //        console.log(groups);
        //    });
        //    $rootScope.modalInstance.close();
        //}

    }
})();