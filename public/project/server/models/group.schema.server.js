var mongoose = require('mongoose');
module.exports = function() {
    var GroupSchema = mongoose.Schema({
        title: String,
        ownerName: String,
        createDate:Date,
        htmlVariable:{type: mongoose.Schema.Types.Mixed},
        address: String,
        usersLikeGroup:[{type:mongoose.Schema.Types.Object, ref:'projectUser'}],
        listofEvents:[{type:mongoose.Schema.Types.Object, ref:'projectEvent'}],
        listofMembers:[{type:mongoose.Schema.Types.Object, ref:'projectUser'}]
    }, {collection: "projectGroup"});
    return GroupSchema;
};

