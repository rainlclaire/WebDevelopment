var users = require("./user.mock.json");


module.exports = function(app, db) {
    var api = {
        create:create,
        findAll: findAll,
        findById:findById,
        update: update,
        remove:remove,
        findUserByUsername:findUserByUsername,
        findUserByCredentials: findUserByCredentials
    };

    return api;

    function create(newUser) {
        newUser.id = (new Date).getTime();
        users.push(newUser);
        return newUser;
    }


    function findAll() {
        return users;
    }


    function findById(id) {
        for(var i = 0; i< users.length; i++) {
            if (users[i].id  == id) {
                return users[i];
            }
        }
        return null;
    }

    function update(id, updatedUser) {

        for(var i = 0; i < users.length; i++) {
            if(users[i].id == id) {
                for(var attr in updatedUser) {
                    if(updatedUser.hasOwnProperty(attr))
                        users[i][attr] = updatedUser[attr];
                }
                console.log(users);
                return users[i];

            }
        }
    }

    function remove(id) {

        for(var i = 0; i < users.length; i++) {
            if(users[i].id == id) {
                users.splice(i, 1);
            }
        }
    }


    function findUserByUsername(username) {

        for(var i = 0; i < users.length; i++) {
            if(users[i].username === username) {
                // user found!
                return users[i];
            }
        }
        return null;
    }


    function findUserByCredentials(creds) {
        var matchedUser = null;
        console.log("usermodel");

        for(var i = 0; i < users.length; i++) {
            if(users[i].username === creds.username
                && users[i].password === creds.password) {
                return users[i];
            }
        }
        return null;
    }




};