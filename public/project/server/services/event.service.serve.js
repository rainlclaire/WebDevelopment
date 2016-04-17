module.exports = function (app, model) {
      app.get("/api/project/group/:groupid/event/:title", findEventByTitle);
    app.get("/api/project/group/:groupid/event", findAllEvents);
    app.post("/api/project/group/:groupid/event", createEvent);
    app.delete("/api/project/group/:groupid/event/:eventid", deleteEvent);
    app.put("/api/project/group/:groupid/event/:eventid", updateEvent);

    function updateEvent(req, res) {
        var groupid = req.params.groupid;
        var eventid = req.params.eventid;
        var event = req.body;
        console.log(event+"---event in server");
        model.updateEventForGroup(groupid, eventid, event)
        .then(
            function(events) {
                console.log(events+"this event hrere----");
                res.json(events);
            },
            function(err) {
                res.status(400).send(err);
            }
        );
        //res.json(model.updateEventForGroup(req.params.groupid,req.params.eventid, req.body));
    }

    function deleteEvent(req, res) {
        var groupid = req.params.groupid;
        var eventid = req.params.eventid;
        model.deleteEventForGroup(groupid, eventid)
        .then(
            function(group) {
                res.json(group);
            },
            function(err) {
                res.status(400).send(err);
            }
        );
        //res.json(model.deleteEventForGroup(req.params.groupid, req.params.eventid));
    }
    function createEvent(req, res) {
        var groupid = req.params.groupid;
        var event = req.body;
        model.createEventForGroup(groupid, event)
        .then(
            function(group) {
                res.json(group);
            },
            function(err) {
                res.status(400).send(err);
            }
        );
        //res.json(model.createEventForGroup(req.params.groupid, req.body));
    }
    function findEventByTitle(req, res) {
        var groupid = req.params.groupid;
        var eventtitle = req.params.title;
        model.findEventByTitle(groupid, eventtitle)
        .then(
            function(event) {
                res.json(event);
            },
            function(err) {
                res.status(400).send(err);
            }
        );
        //res.json(model.findEventByTitle(req.params.groupid, req.params.title));

    }

    function findAllEvents(req, res) {
        var groupid = req.params.groupid;
        model.findAllEvents(groupid)
        .then(
            function(group) {
                res.json(group);
            },
            function(err) {
                res.status(400).send(err);
            }
        );



        //res.json(model.findAllEvents(req.params.groupid));
    }





};