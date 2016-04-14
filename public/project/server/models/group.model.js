var mongoose = require('mongoose');

var q = require("q");
module.exports = function(app) {

    var GroupSchema = require("./group.schema.server.js")();
    var projectGroup = mongoose.model("projectGroup", GroupSchema);
    var api = {
        create: create,
        findAll: findAll,
        findById: findById,
        update: update,
        remove: remove,
        findGroupByTitle: findGroupByTitle,
        findGroupById: findGroupById,
        findEventByTitle:findEventByTitle,
        findAllEvents: findAllEvents,
        createEventForGroup: createEventForGroup,
        deleteEventForGroup:deleteEventForGroup,
        updateEventForGroup:updateEventForGroup,
        userJoinGroup:userJoinGroup,
        userLikeGroup:userLikeGroup,
        findAllUser:findAllUser
    };
    return api;

    function findAllUser(groupid) {
        var deferred = q.defer();
        projectGroup.find(
            groupid,
            function(err, group) {
                if (!err) {
                    deferred.resolve(group.listofMembers);
                } else {
                    deferred.reject(err);
                }
            }
        );
        //for (var i = 0; i < groups.length; i++) {
        //    if (groups[i]._id == groupid) {
        //        return groups[i].listofMembers;
        //    }
        //}
        return deferred.promise;
    }

    function userLikeGroup(groupid, user) {
        var deferred = q.defer();
        projectGroup.findById(
            groupid,
            function(err, group) {
                if (!err) {
                    group.usersLikeGroup.push(user.username);
                    group.save(
                        function (err, group) {
                            if (!err) {
                                deferred.resolve(group);
                            } else {
                                deferred.reject();
                            }
                        }
                    );
                    //for (var i = 0; i < groups.length; i++) {
                    //    if (groups[i]._id == groupid) {
                    //        console.log(groups[i].usersLikeGroup);
                    //        groups[i].usersLikeGroup.push(user);
                    //        return groups[i].usersLikeGroup;
                    //    }
                    //}
                }
            });
        return deferred.promise;
    }
    function userJoinGroup(groupid, user) {
        var deferred = q.defer();
        projectGroup.findById(
            groupid,
            function(err, group) {
                if (!err) {
                    group.listofMembers.push(user.username);
                    group.save(
                        function (err, group) {
                            if (!err) {
                                deferred.resolve(group);
                            } else {
                                deferred.reject();
                            }
                        }
                    );
                }
                //console.log(groupid);
                //for (var i = 0; i < groups.length; i++) {
                //    if (groups[i]._id == groupid) {
                //        groups[i].listofMembers.push(user);
                //        return groups[i].listofMembers;
                //    }
                //}

            });
        return deferred.promise;
    }


    function updateEventForGroup(groupid,eventid, event) {
        var deferred = q.defer();
        projectGroup.findById(
            groupid,
            function (err, group) {
                if (!err) {

                    if (group) {

                        for (var i = 0; i < group.listofEvents.length; i++) {
                            if (group.listofEvents[i]._id == eventid) {

                                group.listofEvents[i] == event;
                            }
                        }

                        group.save(function (err) {
                            if (!err) {
                                deferred.resolve(project)
                            } else {
                                deferred.reject(err);
                            }
                        })
                    }
                }
            });
        return deferred.promise;
    }









        //for (var i =0; i<groups.length;i++) {
        //    if (groups[i]._id == groupid) {
        //        for (var j = 0; j < groups[i].listofEvents.length; j++) {
        //            if (groups[i].listofEvents[j]._id == eventid) {
        //                groups[i].listofEvents[j]._id = event._id;
        //                groups[i].listofEvents[j].title = event.title;
        //                groups[i].listofEvents[j].date = event.date;
        //                groups[i].listofEvents[j].description = event.description;
        //
        //                console.log("updateevent in model ");
        //                console.log(groups[i].listofEvents);
        //
        //                return groups[i].listofEvents;
        //            }
        //        }
        //    }
        //}


    function deleteEventForGroup(groupid, eventid) {
        var deferred = q.defer();
        projectGroup.findById(
            groupid,
            function (err, group) {
                if (!err) {

                    if (group) {

                        for (var i = 0; i < group.listofEvents.length; i++) {
                            if (group.listofEvents[i]._id == eventid) {

                                group.listofEvents.splice(i,1);
                            }
                        }

                        group.save(function (err) {
                            if (!err) {
                                deferred.resolve(project)
                            } else {
                                deferred.reject(err);
                            }
                        })
                    }
                }
            });
        return deferred.promise;

        //for (var i = 0; i < groups.length; i++) {
        //    if (groups[i]._id == groupid) {
        //        for (var j = 0; j < groups[i].listofEvents.length; j++) {
        //            if (groups[i].listofEvents[j]._id == eventid) {
        //                groups[i].listofEvents.splice(j, 1);
        //                return groups[i].listofEvents;
        //            }
        //        }
        //    }
        //}
    }

    function createEventForGroup(groupid, event) {
        var deferred = q.defer();
        projectGroup.findById(
            groupid,
            function (err, group) {

                event._id = mongoose.Types.ObjectId();
                group.field.push(event);
                group.save(function (err, event) {
                    if (!err) {
                        console.log("this is form");

                        deferred.resolve(group.listofEvents);
                    } else {
                        deferred.reject(err);
                    }
                });
            });

        //event._id = (new Date).getTime();
        //console.log("start hrer to see groups");
        //console.log(groups);
        //for (var i = 0; i < groups.length; i++) {
        //    console.log("groups in create");
        //    if (groups[i]._id == groupid) {
        //        console.log(groups[i]);
        //        groups[i].listofEvents.push(event);
        //
        //        return groups[i].listofEvents;
        //    }
        //}
    }

    function findEventByTitle(groupid,eventtitle) {
        var deferred = q.defer();
        projectGroup.findById(
            groupid,
            function (err, group) {
                if (!err) {
                    for (var i = 0; i < group.listofEvents.length; i++) {
                        if (group.listofEvents[i].title = eventtitle) {
                            deferred.resolve(group.listofEvents[i]);
                        }
                    }
                } else {
                    deferred.reject(err);
                }
        });
        return deferred.promise;

        //for (var i =0; i <groups.length; i++) {
        //
        //    if (groups[i]._id == groupid) {
        //
        //        for (var j =0 ; j <groups[i].listofEvents.length; j++) {
        //
        //            if (groups[i].listofEvents[j].title == eventtitle) {
        //
        //                return groups[i].listofEvents[j];
        //            }
        //        }
        //    }
        //}
        //return null;
    }


    function findAllEvents(groupid){
        var deferred = q.defer();
        projectGroup.findById(
            groupid,
            function(err, group) {
                if (!err) {
                    deferred.resolve(group.listofEvents);
                } else {
                    deferred.reject(err);
                }
        });
        return deferred.promise;

        //for (var i =0; i <groups.length; i++) {
        //    if (groups[i]._id == groupid) {
        //
        //        return groups[i].listofEvents;
        //    }
        //}
        //return null;
    }


    function findGroupById(groupid) {

        var deferred = q.defer();
        projectGroup.findById(
            groupid,
            function(err, group) {
                if (!err) {
                    deferred.resolve(group);
                } else {
                    deferred.reject(err);
                }

        });
        return deferred.promise;
        //for(var i = 0; i <groups.length;i++) {
        //    if (groups[i]._id == groupid) {
        //        return groups[i];
        //    }
        //}
        //return null;
    }


    function create(newGroup) {
        var deferred = q.defer();
        projectGroup.create(
            newGroup,
            function(err, group) {
                if (!err) {
                    deferred.resolve(group);

                } else {
                    deferred.reject(err);
                }

        });
        return deferred.promise;
        //newGroup._id = (new Date).getTime();
        //groups.push(newGroup);
        //
        //return newGroup;
    }


    function findAll() {
        //return groups;
        console.log("find all group");
        var deferred = q.defer();
        projectGroup.find(
            function (err, projectGroup) {
                if (!err) {
                    deferred.resolve(projectGroup);
                } else {
                    deferred.reject(err);
                }
            });
        return deferred.promise;
    }

    function findById(groupid) {

        var deferred = q.defer();
        projectGroup.findById(
            groupid,
            function(err, group) {
                if (!err) {

                    deferred.resolve(group);
                } else {
                    deferred.reject(err);
                }

        });
        return deferred.promise;
        //for (var i = 0; i< groups.length;i++) {
        //    if (groups[i]._id == groupid) {
        //        return groups[i];
        //    }
        //}
        //return null;
    }

    function update(groupid, updateGroup) {
        var deferred = q.defer();
        projectGroup.findByIdAndUpdate(
            groupid,
            {$set:updateGroup},
            {new:true},
            function(err, group) {
                if (!err) {
                    deferred.resolve(group);
                } else {
                    deferred.reject(err);
                }

        });
        return deferred.promise;


        //console.log("update model groupid");
        //
        //for (var i =0; i<groups.length;i++) {
        //    if (groups[i]._id == groupid) {
        //        //groups[i]._id = updateGroup._id;
        //        groups[i].title = updateGroup.title;
        //        groups[i].ownerName = updateGroup.ownerName;
        //        groups[i].description = updateGroup.description;
        //        groups[i].address = updateGroup.address;
        //        groups[i].listofMembers = updateGroup.listofMembers;
        //        groups[i].listofEvents = updateGroup.listofEvents;
        //        groups[i].usersLikeGroup = updateGroup.usersLikeGroup;
        //
        //        console.log("update");
        //        console.log(groups[i]);
        //        return groups[i];
        //    }
        //}
        //
        //return null;
    }

    function remove(groupid) {

        var deferred = q.defer();
        projectGroup.remove(
            groupid,
            function(err, projectGroup) {
                if (!err) {
                    findAll()
                    .then(function(group) {
                        deferred.resolve(group);
                    });
                } else {
                    deferred.reject(err);
                }
            }
        );
        //for (var i =0; i<groups.length;i++) {
        //    if (groups[i]._id == groupid) {
        //        groups.splice(i,1);
        //
        //        return groups;
        //    }
        //}
    }

    function findGroupByTitle(groupTitle) {
        console.log("findgroup by title");
        var deferred = q.defer();
        projectGroup.find(
            {title:groupTitle},
            function(err, projectGroup) {
                if (!err) {
                    deferred.resolve(projectGroup);
                } else {
                    deferred.reject(err);
                }
            }
        );

        //var searchResult = [];
        //for (var i =0; i<groups.length;i++) {
        //    if (groups[i].title == groupTitle) {
        //        searchResult.push(groups[i]);
        //    }
        //}
        //return searchResult;
    }

}();


