module.exports = function (app, model) {
      app.get("/api/project/group/:groupid/event/:title", findEventByTitle);
    app.get("/api/project/group/:groupid/event", findAllEvents);
    app.post("/api/project/group/:groupid/event", createEvent);
    app.delete("/api/project/group/:groupid/event/:eventid", deleteEvent);


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