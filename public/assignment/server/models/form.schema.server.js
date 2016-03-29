var mongoose = require("mongoose");


module.exports = function() {
    var FieldSchema = require("./field.schema.js");
    var FormSchema = mongoose.Schema( {
        userId:String,
        title:String,
        field:[FieldSchema],
        created:Date,
        updated:Date
    }, {collection: 'assignmentField'});
    return FormSchema;
};