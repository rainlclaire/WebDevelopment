var groups = require("./group.mock.json");

module.exports = function(app) {

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
        updateEventForGroup:updateEventForGroup
    };
    return api;

    function updateEventForGroup(groupid,eventid, event) {
        for (var i =0; i<groups.length;i++) {
            if (groups[i]._id = groupid) {
                for (var j = 0; j < groups[i].listofEvents.length; j++) {
                    if (groups[i].listofEvents[j]._id = eventid) {
                        groups[i].listofEvents[j]._id = event._id;
                        groups[i].listofEvents[j].title = event.title;



                        return groups[i].listofEvents;
                    }
                }
            }
        }
    }

    function deleteEventForGroup(groupid, eventid) {
        for (var i = 0; i < groups.length; i++) {
            if (groups[i]._id = groupid) {
                for (var j = 0; j < groups[i].listofEvents.length; j++) {
                    if (groups[i].listofEvents[j]._id == eventid) {
                        groups[i].listofEvents.splice(j, 1)
                        return groups[i].listofEvents;
                    }
                }
            }
        }
    }

    function createEventForGroup(groupid, event) {
        event._id = (new Date).getTime();
        for (var i = 0; i < groups.length; i++) {

            if (groups[i]._id = groupid) {
                groups[i].listofEvents.push(event);

                return event;
            }
        }
    }

    function findEventByTitle(groupid,eventtitle) {
        for (var i =0; i <groups.length; i++) {

            if (groups[i]._id = groupid) {

                for (var j =0 ; j <groups[i].listofEvents.length; j++) {

                    if (groups[i].listofEvents[j].title == eventtitle) {

                        return groups[i].listofEvents[j];
                    }
                }
            }
        }
        return null;
    }


    function findAllEvents(groupid){
        for (var i =0; i <groups.length; i++) {
            if (groups[i]._id = groupid) {
                return groups[i].listofEvents;
            }
        }
        return null;
    }


    function findGroupById(groupid) {
        for(var i = 0; i <groups.length;i++) {
            if (groups[i]._id = groupid) {
                return groups[i];
            }
        }
        return null;
    }


    function create(newGroup) {
        newGroup._id = (new Date).getTime();
        groups.push(newGroup);

        return newGroup;
    }


    function findAll() {
        return groups;
    }

    function findById(groupid) {
        for (var i = 0; i< groups.length;i++) {
            if (groups[i]._id == groupid) {
                return groups[i];
            }
        }
        return null;
    }

    function update(groupid, updateGroup) {
        for (var i =0; i<groups.length;i++) {
            if (groups[i]._id = groupid) {}
            groups[i]._id = updateGroup._id;
            groups[i].title = updateGroup.title;
            groups[i].ownerName = updateGroup.ownerName;
            groups[i].description = updateGroup.description;
            groups[i].address = updateGroup.address;
            groups[i].listofMemers = updateGroup.listofMemers;
            groups[i].listofEvents = updateGroup.listofEvents;

            return groups[i];
        }

        return null;
    }

    function remove(groupid) {
        for (var i =0; i<groups.length;i++) {
            if (groups[i]._id == groupid) {
                groups.splice(i,1);

                return groups;
            }
        }
    }

    function findGroupByTitle(groupTitle) {

        var searchResult = [];
        for (var i =0; i<groups.length;i++) {
            if (groups[i].title == groupTitle) {
                searchResult.push(groups[i]);
            }
        }
        return searchResult;
    }

}();


