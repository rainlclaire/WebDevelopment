"use strict";


var q = require("q");
module.exports = function(app,mongoose, db) {

    var FormSchema = require("./form.schema.server.js")(mongoose);
    var assignmentForm = mongoose.model("assignmentForm", FormSchema);
    var api = {
        create: create,
        createFormForUser: createFormForUser,
        findAll: findAll,
        findById: findById,
        update: update,
        remove: remove,
        removeForUser: removeForUser,
        findFormByTitle: findFormByTitle,
        findFormsByUserId: findFormsByUserId,
        retrieveFormFields: retrieveFormFields,
        retrieveFormField: retrieveFormField,
        removeFormField: removeFormField,
        createFormField: createFormField,
        updateFormField: updateFormField,
        updateForUser:updateForUser


    };
    return api;

    function create(newForm) {
        var deferred = q.defer();
        assignmentForm.create(
            newForm,
            function (err, assignmentForm) {
                if (!err) {
                    findAll()
                    .then(function(forms) {
                        deferred.resolve(forms);
                    });
                } else {
                    deferred.reject(err);
                }
            });
        return deferred.promise;
        //return deferred.promise;
        //newForm.id = (new Date()).getTime();
        //forms.push(newForm);
        //return forms;
    }


    function createFormForUser(newForm, userid) {
        var deferred = q.defer();
        newForm.userid = userid;

        assignmentForm.create(
            newForm,
            function (err, assignmentForm) {
                if (!err) {
                    findFormsByUserId(userid)
                    .then(function(userForm) {
                        deferred.resolve(userForm);
                    });
                } else {
                    deferred.reject(err);
                }
            });
        return deferred.promise;

    }


    function findAll() {
        var deferred = q.defer();
        assignmentForm.find(
            function (err, assignmentForm) {
                if (!err) {
                    deferred.resolve(assignmentForm);
                } else {
                    deferred.reject(err);
                }
            });
        return deferred.promise;
        //return forms;
    }

    function findById(id) {
        var deferred = q.defer();
        assignmentForm.findById(
            id,
            function (err, assignmentForm) {
                if (!err) {
                    deferred.resolve(assignmentForm);
                } else {
                    deferred.reject(err);
                }
            });
        return deferred.promise;
        //for(var i = 0; i < forms.length; i++) {
        //    if(forms[i].id == id) {
        //        // form found!
        //        return forms[i];
        //    }
        //}
        //return null;
    }


    function update(id, updatedForm) {
        var deferred = q.defer();
        assignmentForm.findByIdAndUpdate(
            id,
            {$set:updatedForm},
            {new:true},
            function (err, assignmentForm) {
                if (!err) {
                    deferred.resolve(assignmentForm);
                } else {
                    deferred.reject(err);
                }
            });
        return deferred.promise;

        //for(var i = 0; i < forms.length; i++) {
        //    console.log("outside if");
        //    console.log(id);
        //    if(forms[i].id === id) {
        //        console.log("inside if");
        //        console.log(forms[i].id);
        //        console.log(id);
        //
        //        for(var attr in updatedForm) {
        //            if(updatedForm.hasOwnProperty(attr))
        //                forms[i].attr = updatedForm.attr;
        //        }
        //        break;
        //    }
        //}
        //
        //console.log(forms);
        //return forms;
    }

    function remove(id) {
        var deferred = q.defer();
        assignmentForm.remove(
            id,
            function (err, assignmentForm) {
                if (!err) {
                    findAll()
                    .then(function(forms){
                        //may be findall later if bug
                        deferred.resolve(forms);
                    });
                } else {
                    deferred.reject(err);
                }
            });
        return deferred.promise;

        //for(var i = 0; i < forms.length; i++) {
        //    if(forms[i].id == id) {
        //        // form found!
        //        forms.splice(i, 1);
        //        break;
        //    }
        //}
        //return forms;
    }

    function removeForUser(id, userid) {
        console.log("1");
        console.log(id);
        console.log("2");
        console.log(userid);
        var deferred = q.defer();
        assignmentForm.remove(
            {_id:id},
            function (err, assignmentForm) {
                if (!err) {
                    findFormsByUserId(userid)
                    .then(function(allforms) {
                        console.log("3");
                        console.log(allforms);
                        deferred.resolve(allforms);
                    });
                } else {
                    deferred.reject(err);
                }
            });
        return deferred.promise;
        //for(var i = 0; i < forms.length; i++) {
        //    if(forms[i].id == id) {
        //        // form found!
        //        forms.splice(i, 1);
        //        break;
        //    }
        //}
        //return findFormsByUserId(userid);
    }

    function updateForUser(id, userid, updatedForm) {
        var deferred = q.defer();
        assignmentForm.update(
            id,
            {$set:updatedForm},
            {new:true},
            function (err, assignmentForm) {
                if (!err) {
                    findFormsByUserId(userid)
                        .then(function(allforms) {
                            deferred.resolve(allforms);
                        });
                } else {
                    deferred.reject(err);
                }
            });
        return deferred.promise;

        //for(var i = 0; i < forms.length; i++) {
        //    if(forms[i].id == id) {
        //
        //        for(var attr in updatedForm) {
        //            if(updatedForm.hasOwnProperty(attr))
        //                forms[i].attr = updatedForm.attr;
        //        }
        //        break;
        //    }
        //}
        ////return forms;
        //return findFormsByUserId(userid);
    }


    function findFormByTitle(title) {
        var deferred = q.defer();
        assignmentForm.find(
            {title:title},
            function (err, assignmentForm) {
                if (!err) {
                    deferred.resolve(assignmentForm);
                } else {
                    deferred.reject(err);
                }
            });
        return deferred.promise;

        //for(var i = 0; i < forms.length; i++) {
        //    if(forms[i].title == title) {
        //        // form found!
        //        return forms[i];
        //    }
        //}
        //return null;
    }



    function findFormsByUserId(userid) {
        var deferred = q.defer();
        assignmentForm.find(
            {userid:userid},
            function (err, assignmentForm) {
                if (!err) {
                    console.log("!err");
                    console.log(assignmentForm);
                    deferred.resolve(assignmentForm);
                } else {
                    deferred.reject(err);
                }
            });
        return deferred.promise;
        //var userForms = [];
        //
        //for(var i = 0; i < forms.length; i++) {
        //    console.log(i);
        //    console.log(forms[i].userid);
        //    //console.log(userid);
        //    if(forms[i].userid == userid) {
        //        // form found!  add it to the array
        //        userForms.push(forms[i]);
        //        //console.log("userforms");
        //        //console.log(userForms[0].fields[0]);
        //
        //    }
        //}
        //return userForms;
    }

    function retrieveFormFields(id) {

        for(var i = 0; i < forms.length; i++) {
            if(forms[i].id == id) {

                return forms[i].fields;
            }
        }
        return null;
    }

    function retrieveFormField(id, fieldid) {

        for(var i = 0; i < forms.length; i++) {
            if(forms[i].id == id) {
                // form found!  now locate requested field
                for(var j = 0; j < forms[i].fields.length; j++) {
                    if(forms[i].fields.id == fieldid){
                        // field found!
                        return forms[i].fields[j];
                    }
                }
            }
        }
        return null;
    }

    function removeFormField(id, fieldid) {
        for(var i = 0; i < forms.length; i++) {
            if(forms[i].id == id) {
                for(var j = 0; j < forms[i].fields.length; j++) {
                    if(forms[i].fields[j].id == fieldid){
                        // field found!  remove it
                        forms[i].fields.splice(j, 1);
                        return forms[i];
                    }
                }
            }
        }
        return null;
    }

    function createFormField(id, newField) {
        //console.log(newField);
        newField.id = (new Date()).getTime();

        for(var i = 0; i < forms.length; i++) {
            if(forms[i].id == id) {
                // form found!
                if(!forms[i].fields){
                    forms[i].fields = [];
                }
                forms[i].fields.push(newField);
                return forms[i];
            }
        }
        return null;
    }


    function updateFormField(id, updatedField,fieldid) {
        console.log("mock");
        console.log(updatedField);
        for(var i = 0; i < forms.length; i++) {
            if(forms[i].id == id) {
                for(var j = 0; j < forms[i].fields.length; j++) {
                    if(forms[i].fields[j].id == fieldid){
                        forms[i].fields[j].id = updatedField.id;
                        forms[i].fields[j].label = updatedField.label;
                        forms[i].fields[j].placeholder = updatedField.placeholder;
                        if (updatedField.options && forms[i].fields[j].options) {
                            forms[i].fields[j].options = updatedField.options;
                        }

                    }
                }
            }
        }
        return null;
    }


};