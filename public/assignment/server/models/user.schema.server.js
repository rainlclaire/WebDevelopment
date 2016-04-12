


module.exports = function(mongoose) {
    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        email: [String],
        firstName: String,
        lastName: String,
        phone:[String],
        roles:[String]
    }, {collection: "assignmentUser"});
    return UserSchema;
};