"use strict";

(function() {
    angular.module('FindGroupApp')
        .controller("GroupController", GroupController);

    function GroupController($scope, $sce,$uibModal,$location, $rootScope, GroupService) {
        var model = this;
        var user = $rootScope.currentUser;
        var htmlString = $scope.htmlString;


        function init() {
            GroupService.findAllGroups()
                .then(function(groups) {

                   // console.log("from group contrller");
                   // console.log(groups);
                   // function htmlString (str) {
                   //     return "<h1>" + str + "</h1>";
                   // }
                   //for (var i = 0; i< groups.length;i++){
                   //    console.log(groups[i].htmlVariable);
                   //    groups[i].htmlVariable = $sce.trustAsHtml(groups[i].htmlVariable);
                   //    console.log(groups[i]);
                   //    //var str = groups[i].htmlVariable;
                   //    //$scope.htmlString = htmlString(str);
                   //    //console.log($scope.htmlString);
                   //}
                    model.groups = groups;
                    console.log(model.groups);
                    groupfilter();
                });
        }
        init();



        var clickGroup = $rootScope.clickGroup;
        //function for form
        model.updateGroup = updateGroup;
        model.deleteGroup = deleteGroup;
        model.selectGroup = selectGroup;
        model.addGroup2 = addGroup2;
        model.groupfilter = groupfilter;


        function groupfilter() {
            var sportsGroup =[];
            var socialGroup =[];
            var techGroup = [];
            var otherGroup = [];
            for (var i = 0; i < model.groups.length;i++) {
                console.log(model.groups[i].groupType);
                if (model.groups[i].groupType == "Sports") {
                    sportsGroup.push(model.groups[i]);
                }
                if (model.groups[i].groupType == "Social") {
                    socialGroup.push(model.groups[i]);
                }
                if (!model.groups[i].groupType) {
                    otherGroup.push(model.groups[i]);
                }
                else if (model.groups[i].groupType == "Technical") {
                    techGroup.push(model.groups[i]);
                }
            }

            $rootScope.sportsGroup = sportsGroup;
            console.log($rootScope.sportsGroup);
            $rootScope.socialGroup = socialGroup;
            console.log($rootScope.socialGroup);
            $rootScope.techGroup = techGroup;
            console.log($rootScope.techGroup);
            $rootScope.otherGroup = otherGroup;
            console.log($rootScope.otherGroup);
        }



        function addGroup2() {
            if ($rootScope.user == null){
                alert("You have to login/register");
                $location.url("/login");

            } else {
                $rootScope.modalInstance = $uibModal.open({
                    templateUrl: "views/group/addGroupModal.html",
                    controller: "groupModalController",
                    controllerAs:"model",
                    size: 'lg',
                    resolve: {
                        clickGroup: function () {
                            return model.clickGroup;
                        },
                        groups: function() {
                            return model.groups;
                        }

                    }
                })
            }


        }



        //update the select form with the given form info
        function updateGroup(group) {
            if (model.selectGroupIndex != null) {
                model.groups[model.selectGroupIndex]._id = group._id;
                model.groups[model.selectGroupIndex].title = group.title;
                model.groups[model.selectGroupIndex].adress = group.adress;
                model.groups[model.selectGroupIndex].groupType = group.groupType;
                model.groups[model.selectGroupIndex].createDate = group.createDate;
                model.groups[model.selectGroupIndex].htmlVariable = group.htmlVariable;
                model.groups[model.selectGroupIndex].ownerName = group.ownerName;
                model.groups[model.selectGroupIndex].listofEvents = group.listofEvents;
                model.groups[model.selectGroupIndex].listofMembers = group.listofMembers;
                console.log(group);
            } else {
                alert("You have to select a Form");
            }
        }

        //delete the form with given form's index
        function deleteGroup(index) {
            var deletedId = model.groups[index]._id;
            if (user == null) {
                alert("you are not the administration");
                $location.url("/login");
            }
            if (model.groups[index].ownerName == user.username) {
                console.log(deletedId);
                GroupService.deleteGroupById(deletedId)
                    .then(function (allOtherGroups) {
                        model.groups = allOtherGroups;
                    });
            } else {
                alert("you have not the owner of the group, you cannot delete it");
            }
        }

        //select the form with given form's index
        function selectGroup(index) {
            //$scope.clickForm.title = $scope.forms[index].title;
            model.selectGroupIndex = index;
            console.log($scope.groups[index].ownerName);
            model.clickGroup = {
                "_id": model.groups[index]._id,
                "title": model.groups[index].title,
                "address": model.groups[index].address,
                "groupType":model.group[index].groupType,
                "createDate": model.groups[index].createDate,
                "htmlVariable": model.groups[index].htmlVariable,
                "ownerName": model.groups[index].ownerName,
                "listofEvents": model.groups[index].listofEvents,
                "listofMembers":model.groups[index].listofMembers
            };
            console.log(model.clickGroup.ownerName);

        }


    }


})();