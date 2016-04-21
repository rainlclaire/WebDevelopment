(function() {
    "use strict";

    angular
        .module("FindGroupApp")
        .controller("editGroupModalController", editGroupModalController);


    function editGroupModalController($route, $rootScope, $routeParams, $scope,currentGroup,groups, $location, GroupService) {
        var model = this;
        console.log(currentGroup);
        model.editGroup= editGroup;
        model.cancel = cancel;

        function cancel() {
            $rootScope.modalInstance.close();
        }

        function editGroup(group) {

            GroupService.updateGroupById(group._id, group)
                .then(function(updateGroups) {
                    groups = updateGroups;
                    console.log("form editGroup");
                    console.log(groups);
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