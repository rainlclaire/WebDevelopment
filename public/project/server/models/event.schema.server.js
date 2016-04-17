var mongoose = require('mongoose');

module.exports = function() {
    var EventSchema = mongoose.Schema({
        title:String,
        date:Date,
        address:String,
        description:String
    }, {collection: "projectEvent"});
    return EventSchema;
};
