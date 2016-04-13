module.exports = function (app, model) {
      app.get("/api/temp/group/:groupid/event/:title", findEventByTitle);
    app.get("/api/temp/group/:groupid/event", findAllEvents);
    app.post("/api/temp/group/:groupid/event", createEvent);
    app.delete("/api/temp/group/:groupid/event/:eventid", deleteEvent);
    app.put("/api/temp/group/:groupid/event/:eventid", updateEvent);

    function updateEvent(req, res) {
        res.json(model.updateEventForGroup(req.params.groupid,req.params.eventid, req.body));
    }

    function deleteEvent(req, res) {
        res.json(model.deleteEventForGroup(req.params.groupid, req.params.eventid));
    }
    function createEvent(req, res) {
        res.json(model.createEventForGroup(req.params.groupid, req.body));
    }
    function findEventByTitle(req, res) {
        res.json(model.findEventByTitle(req.params.groupid, req.params.title));

    }

    function findAllEvents(req, res) {
        res.json(model.findAllEvents(req.params.groupid));
    }





};