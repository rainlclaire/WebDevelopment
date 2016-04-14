var mongoose = require('mongoose');
module.exports = function() {
    var GroupSchema = mongoose.Schema({
        title: String,
        ownerName: String,
        createDate:Date,
        htmlVariable:{type: mongoose.Schema.Types.Mixed},
        description:String,
        address: String,
        usersLikeGroup:[{type:mongoose.Schema.Types.Object, ref:'projectUser'}],
        listofEvents:[{type:mongoose.Schema.Types.Object, ref:'projectEvent'}],
        listofMembers:[{type:mongoose.Schema.Types.Object, ref:'projectUser'}]
    }, {collection: "projectGroup"});
    return GroupSchema;
};

