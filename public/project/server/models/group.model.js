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
        findAllEvents: findAllEvents
    };
    return api;

    function findEventByTitle(groupid,eventtitle) {
        for (var i =0; i <groups.length; i++) {
            if (groups[i]._id = groupid) {
                for (var j =0 ; j <groups[i].listofEvents.length; j++) {
                    if (groups[i].listofEvents[j].title = eventtitle) {
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
        console.log("print create newgroup");
        console.log(newGroup);
        newGroup._id = (new Date).getTime();
        groups.push(newGroup);

        return newGroup;
    }


    function findAll() {
        console.log("findall");
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
        for (var i =0; i<groups.length;i++) {
            if (groups[i].title == groupTitle) {
                return groups[i];
            }
        }
        return null;
    }

}();


