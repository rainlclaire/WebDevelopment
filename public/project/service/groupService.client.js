"use strict";

(function () {
    angular.module("FindGroupApp")
        .factory("GroupService", GroupService);

    function GroupService($http) {
        //init the current forms
        var groups = [
            {
                "_id": "01", "title": "Dancer Club", "ownerName": "alice",
                "description": "Lorem ipsum dolor sit amet, " +
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
                "address": "Los Angeles, CA",
                "listofEvents": [
                    {title:"dancer1", _id: "01"},
                    {title:"dancer2", _id: "02"}
                ], "listofMembers":[]


            },
            {
                "_id": "02", "title": "Hiking Club", "ownerName": "bob", "description": "Lorem ipsum dolor sit amet, " +
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
                "listofEvents": [], "listofMembers":[]
            },
            {
                "_id": "03", "title": "Boston Game Group", "ownerName": "bob",
                "description": "Lorem ipsum dolor sit amet, " +
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
                "listofEvents": [], "listofMembers":[]
            }
        ];

        var service = {
            createGroup: createGroup,
            findAllGroups: findAllGroups,
            deleteGroupById: deleteGroupById,
            updateGroupById: updateGroupById,
            findGroupByID: findGroupByID,
            findGroupsByTitle: findGroupsByTitle,
            findEventByID: findEventByID,
            createEvent:createEvent,
            findAllEvents: findAllEvents,
            deleteEventById: deleteEventById,
            createUserForGroup: createUserForGroup,
            findAllUserForGroup:findAllUserForGroup,
            deleteUserById:deleteUserById

        };

        return service;

        //create form for user with given user id and form info
        function createGroup(group, callback) {
            var _id = (new Date()).getTime();
            group._id = _id;
            groups.push(group);
            callback(group);
        }
        function createEvent(group, event, callback) {
            var _id = (new Date()).getTime();
            event._id = _id;
            for(var i =0; i<groups.length; i++) {
                if (groups[i]._id === group._id) {
                   groups[i].listofEvents.push(event);
                    //console.log(groups[i].listofEvents);
                    break;
                }

            }
            callback(groups[i].listofEvents);
        }

        //find all forms for given user
        function findAllGroups(callback) {

            callback(groups);
        }

        function findGroupByID(groupID, callback) {
            //console.log("login here");
            for (var i = 0; i < groups.length; i++) {
                //console.log(groups[i]._id===groupID);
                if (groups[i]._id === groupID) {
                    var group = groups[i];

                    callback(group);
                    break;
                }
            }
        }

        function findGroupsByTitle(groupTitle, callback) {
            var findGroups = [];
            for (var i = 0; i < groups.length; i++) {
                if (groups[i].title === groupTitle) {
                    var group = groups[i];
                    findGroups.push(group);
                }
            }
            callback(findGroups);

        }

        function findEventByID(eventID, callback) {

            for (var i = 0; i < groups.length; i++) {
                for (var j = 0; j < groups[i].listofEvents.length; j++) {
                    if (groups[i].listofEvents[j] === eventID) {
                        var event = groups[i].listofEvents[j];

                        callback(event);
                        break;
                    }
                }
            }
        }

        function findAllEvents(group, callback) {
            for (var i = 0; i < groups.length; i++) {
                //console.log(group._id);
                if (groups[i]._id === group._id) {
                    var events = groups[i].listofEvents;
                    callback(events);
                    break;
                }

            }
        }


        //delete form by given form id
        function deleteGroupById(groupId, callback) {
            for (var i = 0; i < groups.length; i++) {
                if (groups[i]._id === groupId) {
                    groups.splice(i, 1);
                    callback(groups);
                    break;
                }
            }

        }


        function deleteEventById(groupId, eventId, callback) {
            for (var i = 0; i < groups.length; i++) {
                if (groups[i]._id === groupId) {
                    for (var j = 0; j < groups[i].listofEvents.length; j++) {
                        if (groups[i].listofEvents[j]._id === eventId) {
                            groups[i].listofEvents.splice(j, 1);
                            callback(groups[i].listofEvents);
                            break;
                        }
                    }
                }
            }

        }

        function deleteUserById(groupId, UserId, callback) {
            for (var i = 0; i < groups.length; i++) {
                if (groups[i]._id === groupId) {
                    for (var j = 0; j < groups[i].listofMembers.length; j++) {

                        if (groups[i].listofMembers[j].group_id === UserId) {
                            groups[i].listofMembers.splice(j, 1);
                            callback(groups[i].listofMembers);
                            break;
                        }
                    }
                }
            }

        }

        //update the form by given form's id with new form info
        function updateGroupById(groupId, newGroup, callback) {
            for (var j = 0; j < groups.length; j++) {
                if (groups[j]._id === groupId) {
                    for (var attr in newGroup) {
                        if (newGroup.hasOwnProperty(attr))
                            groups[j][attr] = newGroup[attr];
                    }
                    callback(groups[j]);
                    break;
                }
            }

        }


        function createUserForGroup(group, user, callback) {
            var group_id = (new Date()).getTime();
            var user = {
                username: user.username,
                group_id: group_id
            };
            //console.log("tst for user");
            //console.log(user);

            for (var i = 0; i<groups.length;i++) {
                if (groups[i]._id ===group._id) {
                    groups[i].listofMembers.push(user);
                }
                callback(groups[i].listofMembers);

            }

        }
        function findAllUserForGroup(group, callback) {
            for (var i = 0; i < groups.length; i++) {
                if (groups[i]._id === group._id) {
                    var members = groups[i].listofMembers;
                    callback(members);
                    //console.log(members);
                    break;
                }
                //for (var j = 0; j < groups.listofEvents.length; j++) {
                //    if (groups[i]._id === group._id) {
                //        var events = groups[i].listofEvents;
            }
        }

    }
})();