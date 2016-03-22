"use strict";

module.exports = function(app) {
    console.log(require("../server/models/user.model.js"));
    var uModel = require("../server/models/user.model.js")(app);
    var gModel = require("../server/models/group.model.js")(app);
    require("../server/services/user.service.server.js")(app, uModel);
    require("../server/services/form.service.server.js")(app, gModel);
    //require("server/services/field.service.server.js")(eventModel);

};
