(function() {
    "use strict";

    angular
        .module("FindGroupApp")
        .controller("editEventController", editEventController);


    function editEventController($route, $rootScope, $routeParams,clickEvent, $scope,currentGroup,groups, $location, EventService) {
        var model = this;
        console.log(currentGroup);
        model.editEvent= editEvent;
        model.cancel = cancel;
        console.log(clickEvent);

        $scope.editEvent = clickEvent;

        function editEvent(event) {

            EventService.updateEventForGroup($scope.currentGroup._id, event._id, event)
                .then(function (events) {
                    $rootScope.listofEvents = events;
                });
            $rootScope.modalInstance.close();
        }

        function cancel() {
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