var mongoose = require('mongoose');

module.exports = function() {
    var EventSchema = mongoose.Schema({
        title:String,
        address:String,
        description:String
    }, {collection: "projectEvent"});
    return EventSchema;
};
