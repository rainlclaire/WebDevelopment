//(function () {
//    angular.module("FindGroupApp")
//        .factory("EventService", EventService);
//
//    function Service() {
//    //init the current forms
//
//
//    var service = {
//        createGroup: createGroup,
//        findAllGroups: findAllGroups,
//        deleteGroupById: deleteGroupById,
//        updateGroupById:updateGroupById,
//        findGroupByID:findGroupByID,
//        findGroupsByTitle:findGroupsByTitle
//    };
//    return service;
//
//    //create form for user with given user id and form info
//    function createGroup(group, callback) {
//        var _id = (new Date()).getTime();
//        group._id = _id;
//        groups.push(group);
//        callback(group);
//    }
//
//    //find all forms for given user
//    function findAllGroups(callback) {
//        //var group = [];  //set the form array to empty
//        ////iterate the forms
//        //for (var k = 0; k < groups.length; k++) {
//        //    if (groups[k].id == userId) {
//        //        group.push(groups[k]);
//        //    }
//        //}
//        callback(groups);
//    }
//
//    function findGroupByID(groupID, callback) {
//        for(var i = 0; i < groups.length; i++) {
//            if (groups[i]._id === groupID) {
//                var group = groups[i];
//                callback(group);
//                break;
//            }
//        }
//    }
//
//    function findGroupsByTitle(groupTitle, callback) {
//        var findGroups =[];
//        for(var i = 0; i < groups.length; i++) {
//            if (groups[i].title === groupTitle) {
//                var group = groups[i];
//                findGroups.push(group);
//
//
//            }
//        }
//        callback(findGroups);
//
//    }
//
//
//
//
//    //delete form by given form id
//    function deleteGroupById(groupId, callback) {
//        for(var i = 0; i < groups.length; i++) {
//            if (groups[i].id === groupId) {
//                groups.splice(i, 1);
//                callback(groups);
//                break;
//            }
//        }
//
//    }
//
//    //update the form by given form's id with new form info
//    function updateGroupById(groupId, newGroup, callback) {
//        for(var j = 0; j < groups.length; j++) {
//            if (groups[j].id = groupId) {
//                for(var attr in updateForm) {
//                    if (updateForm.hasOwnProperty(attr))
//                        groups[j][attr] = updateForm[attr];
//                }
//                callback(groups[j]);
//                break;
//            }
//        }
//
//    }