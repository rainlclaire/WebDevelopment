module.exports = function (app, model) {
      app.get("/api/project/group/:groupid/event/:title", findEventByTitle);
    app.get("/api/project/group/:groupid/event", findAllEvents);


    function findEventByTitle(req, res) {
        res.json(model.findEventByTitle(req.params.groupid, req.params.title));

    }

    function findAllEvents(req, res) {
        res.json(model.findAllEvents(req.params.groupid));
    }





};