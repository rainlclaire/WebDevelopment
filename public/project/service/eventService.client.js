//(function () {
//    angular.module("FindGroupApp")
//        .factory("EventService", EventService);
//
//    function Service() {
//        //init the current forms
//        var events = $scope.groups.listofEvents;
//        var service = {
//            createEvent: createEvent,
//            findAllGroups: findAllGroups,
//            deleteGroupById: deleteGroupById,
//            updateGroupById: updateGroupById,
//            findEventByID: findEventByID,
//            findGroupsByTitle: findGroupsByTitle
//        };
//        return service;
//
//        //create form for user with given user id and form info
//        function createEvent(event, callback) {
//            var _id = (new Date()).getTime();
//            event._id = _id;
//            events.push(event);
//            callback(evet);
//        }
//
//        //find all forms for given user
//        function findAllGroups(callback) {
//            //var group = [];  //set the form array to empty
//            ////iterate the forms
//            //for (var k = 0; k < groups.length; k++) {
//            //    if (groups[k].id == userId) {
//            //        group.push(groups[k]);
//            //    }
//            //}
//            callback(events);
//        }
//
//        function findEventByID(eventID, callback) {
//            for (var i = 0; i < events.length; i++) {
//                if (events[i]._id === events) {
//                    var event = events[i];
//                    callback(vent);
//                    break;
//                }
//            }
//        }
//
//        function findGroupsByTitle(groupTitle, callback) {
//            var findEvents = [];
//            for (var i = 0; i < events.length; i++) {
//                if (events[i].title === eventTitle) {
//                    var event = events[i];
//                    findEvents.push(event);
//
//
//                }
//            }
//            callback(findEvents);
//
//        }
//
//
//        //delete form by given form id
//        function deleteGroupById(groupId, callback) {
//            for (var i = 0; i < events.length; i++) {
//                if (events[i].id === eventId) {
//                    events.splice(i, 1);
//                    callback(events);
//                    break;
//                }
//            }
//
//        }
//
//        //update the form by given form's id with new form info
//        function updateGroupById(eventId, newGroup, callback) {
//            for (var j = 0; j < events.length; j++) {
//                if (events[j].id = eventId) {
//                    for (var attr in updateForm) {
//                        if (updateForm.hasOwnProperty(attr))
//                            events[j][attr] = updateForm[attr];
//                    }
//                    callback(events[j]);
//                    break;
//                }
//            }
//
//        }
//    }
//});