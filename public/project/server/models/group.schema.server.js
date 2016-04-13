var mongoose = require('mongoose');
module.exports = function() {
    var GroupSchema = mongoose.Schema({
        title: String,
        ownerName: String,
        createDate:Date,
        description: String,
        address: String,
        listofEvents:[{type:mongoose.Schema.Types.Object, ref:'projectEvent'}],
        listofMembers:[{type:mongoose.Schema.Types.Object, ref:'projectUser'}],
        roles:[String]
    }, {collection: "projectGroup"});
    return GroupSchema;
};

