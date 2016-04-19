var mongoose = require('mongoose');

module.exports = function() {
    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        verifyPassword:String,
        image:String,
        email: [String],
        groupJoined:[String],
        likeGroups:[String],
        roles:[String]
    }, {collection: "projectUser"});
    return UserSchema;
};

