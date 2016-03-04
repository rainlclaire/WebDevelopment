"use strict";

(function () {
    angular.module("FindGroupApp")
        .factory("GroupService", GroupService);

    function GroupService() {
        //init the current forms
        var groups = [
            {"_id": "01", "title": "Dancer Club", "ownerName": "alice",
                "description":"Lorem ipsum dolor sit amet, " +
                "consectetur adipiscing elit. Nulla quam velit, " +
                "vulputate eu pharetra nec, mattis ac neque. " +
                "Duis vulputate commodo lectus, ac blandit " +
                "elit tincidunt id. Sed rhoncus, tortor sed " +
                "eleifend tristique, tortor mauris molestie elit, " +
                "et lacinia ipsum quam nec dui. Quisque nec mauris " +
                "sit amet elit iaculis pretium sit amet quis magna. " +
                "Aenean velit odio, elementum in tempus ut, vehicula eu diam. " +
                "Pellentesque rhoncus aliquam mattis. " +
                "Ut vulputate eros sed felis sodales nec vulputate justo hendrerit. " +
                "Vivamus varius pretium ligula, a aliquam odio euismod sit amet. " +
                "Quisque laoreet sem sit amet orci ullamcorper at ultricies metus viverra. " +
                "Pellentesque arcu mauris, malesuada quis ornare accumsan, blandit sed diam.","listofEvnets": []
            },
            {"_id": "02", "title": "Hiking Club", "ownerName": "bob","description":"Lorem ipsum dolor sit amet, " +
            "consectetur adipiscing elit. Nulla quam velit, " +
            "vulputate eu pharetra nec, mattis ac neque. " +
            "Duis vulputate commodo lectus, ac blandit " +
            "elit tincidunt id. Sed rhoncus, tortor sed " +
            "eleifend tristique, tortor mauris molestie elit, " +
            "et lacinia ipsum quam nec dui. Quisque nec mauris " +
            "sit amet elit iaculis pretium sit amet quis magna. " +
            "Aenean velit odio, elementum in tempus ut, vehicula eu diam. " +
            "Pellentesque rhoncus aliquam mattis. " +
            "Ut vulputate eros sed felis sodales nec vulputate justo hendrerit. " +
            "Vivamus varius pretium ligula, a aliquam odio euismod sit amet. " +
            "Quisque laoreet sem sit amet orci ullamcorper at ultricies metus viverra. " +
            "Pellentesque arcu mauris, malesuada quis ornare accumsan, blandit sed diam.",
                "listofEvents": []},
            {"_id": "03", "title": "Boston Game Group", "ownerName": "bob",
                "description":"Lorem ipsum dolor sit amet, " +
                "consectetur adipiscing elit. Nulla quam velit, " +
                "vulputate eu pharetra nec, mattis ac neque. " +
                "Duis vulputate commodo lectus, ac blandit " +
                "elit tincidunt id. Sed rhoncus, tortor sed " +
                "eleifend tristique, tortor mauris molestie elit, " +
                "et lacinia ipsum quam nec dui. Quisque nec mauris " +
                "sit amet elit iaculis pretium sit amet quis magna. " +
                "Aenean velit odio, elementum in tempus ut, vehicula eu diam. " +
                "Pellentesque rhoncus aliquam mattis. " +
                "Ut vulputate eros sed felis sodales nec vulputate justo hendrerit. " +
                "Vivamus varius pretium ligula, a aliquam odio euismod sit amet. " +
                "Quisque laoreet sem sit amet orci ullamcorper at ultricies metus viverra. " +
                "Pellentesque arcu mauris, malesuada quis ornare accumsan, blandit sed diam.",
                "listofEvents": []}
        ];

        var service = {
            createGroup: createGroup,
            findAllGroups: findAllGroups,
            deleteGroupById: deleteGroupById,
            updateGroupById:updateGroupById,
            findGroupByID:findGroupByID,
            findGroupsByTitle:findGroupsByTitle
        };
        return service;

        //create form for user with given user id and form info
        function createGroup(group, callback) {
            var _id = (new Date()).getTime();
            group._id = _id;
            groups.push(group);
            callback(group);
        }

        //find all forms for given user
        function findAllGroups(callback) {
            //var group = [];  //set the form array to empty
            ////iterate the forms
            //for (var k = 0; k < groups.length; k++) {
            //    if (groups[k].id == userId) {
            //        group.push(groups[k]);
            //    }
            //}
            callback(groups);
        }

        function findGroupByID(groupID, callback) {
            for(var i = 0; i < groups.length; i++) {
                if (groups[i]._id === groupID) {
                    var group = groups[i];
                    callback(group);
                    break;
                }
            }
        }

        function findGroupsByTitle(groupTitle, callback) {
            var findGroups =[];
            for(var i = 0; i < groups.length; i++) {
                if (groups[i].title === groupTitle) {
                    var group = groups[i];
                    findGroups.push(group);


                }
            }
            callback(findGroups);

        }




        //delete form by given form id
        function deleteGroupById(groupId, callback) {
            for(var i = 0; i < groups.length; i++) {
                if (groups[i].id === groupId) {
                    groups.splice(i, 1);
                    callback(groups);
                    break;
                }
            }

        }

        //update the form by given form's id with new form info
        function updateGroupById(groupId, newGroup, callback) {
            for(var j = 0; j < groups.length; j++) {
                if (groups[j].id = groupId) {
                    for(var attr in updateForm) {
                        if (updateForm.hasOwnProperty(attr))
                            groups[j][attr] = updateForm[attr];
                    }
                    callback(groups[j]);
                    break;
                }
            }

        }

    }
})();