var mongoose = require("mongoose");


module.exports = function() {
    var UserSchema = mongoose.Schema( {
        username: String,
        password: String,
        email: String,
        firstName: String,
        lastName: String,
        phone:String
    }, {collection: 'assignmentUser'});
    return UserSchema;
};