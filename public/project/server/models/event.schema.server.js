var mongoose = require('mongoose');

module.exports = function() {
    var EventSchema = mongoose.Schema({
        title:String,
        date:Date,
        address:String,
        description:String,
        htmlVariable:String,
        peopleJoin:[{type:mongoose.Schema.Types.Object, ref:'projectUser'}]
    }, {collection: "projectEvent"});
    return EventSchema;
};
