"use strict";

module.exports = function(app) {
    var userModel = require("./models/user.model.js");
    var groupModel = require("./models/group.model.js");

    //var eventModel = require("./models/event.model.js")(app);
    require("./services/user.service.server.js")(app, userModel);
    require("./services/group.service.server.js")(app, groupModel);
    require("./services/event.service.serve.js")(app, groupModel);
};