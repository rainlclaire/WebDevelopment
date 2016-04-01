var mongoose = require("mongoose");


module.exports = function() {
    var FieldSchema = require("./field.schema.server.js");
    var FormSchema = mongoose.Schema( {
        userid:String,
        title:String,
        field:[{type:mongoose.Schema.Types.Object, ref:'assignmentField'}],
        created:Date,
        updated:Date
    }, {collection: 'assignmentForm'});
    return FormSchema;
};