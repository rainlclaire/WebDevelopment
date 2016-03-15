"use strict";

var forms = require("./form.mock.json");


module.exports = function(app, db) {
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
        updateFormField: updateFormField
    };
    return api;

    function create(newForm) {
        newForm.id = (new Date()).getTime();
        forms.push(newForm);
        return forms;
    }


    function createFormForUser(newForm, userid) {
        newForm._id = (new Date()).getTime();
        newForm.userid = userid;
        forms.push(newForm);
        return findFormsByUserId(userid);
    }


    function findAll() {
        return forms;
    }

    function findById(id) {

        for(var i = 0; i < forms.length; i++) {
            if(forms[i]._id == id) {
                // form found!
                return forms[i];
            }
        }
        return null;
    }


    function update(id, updatedForm) {

        for(var i = 0; i < forms.length; i++) {
            if(forms[i]._id == id) {

                for(var attr in updatedForm) {
                    if(updatedForm.hasOwnProperty(attr))
                        forms[i].attr = updatedForm.attr;
                }
                break;
            }
        }
        return forms;
    }

    function remove(id) {

        for(var i = 0; i < forms.length; i++) {
            if(forms[i]._id == id) {
                // form found!
                forms.splice(i, 1);
                break;
            }
        }
        return forms;
    }

    function removeForUser(id, userid) {

        for(var i = 0; i < forms.length; i++) {
            if(forms[i]._id == id) {
                // form found!
                forms.splice(i, 1);
                break;
            }
        }
        return findFormsByUserId(userid);
    }


    function findFormByTitle(title) {

        for(var i = 0; i < forms.length; i++) {
            if(forms[i].title == title) {
                // form found!
                return forms[i];
            }
        }
        return null;
    }

    function findFormsByUserId(userid) {
        var userForms = [];

        for(var i = 0; i < forms.length; i++) {
            //console.log(userid);
            if(forms[i].userId == userid) {
                // form found!  add it to the array
                userForms.push(forms[i]);
                //console.log("userforms");
                console.log(userForms[0].fields[0]);

            }
        }
        return userForms;
    }

    function retrieveFormFields(id) {

        for(var i = 0; i < forms.length; i++) {
            if(forms[i]._id == id) {

                return forms[i].fields;
            }
        }
        return null;
    }

    function retrieveFormField(id, fieldid) {

        for(var i = 0; i < forms.length; i++) {
            if(forms[i]._id == id) {
                // form found!  now locate requested field
                for(var j = 0; j < forms[i].fields.length; j++) {
                    if(forms[i].fields._id == fieldid){
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
            if(forms[i]._id == id) {
                for(var j = 0; j < forms[i].fields.length; j++) {
                    if(forms[i].fields[j]._id == fieldid){
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
        //newField.id = (new Date()).getTime();

        for(var i = 0; i < forms.length; i++) {
            if(forms[i]._id == id) {
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

    function updateFormField(id, fieldid, updatedField) {

        for(var i = 0; i < forms.length; i++) {
            if(forms[i]._id == id) {

                for(var j = 0; j < forms[i].fields.length; j++) {
                    if(forms[i].fields[j]._id == fieldid){
                        // field found!  update it
                        for(var attr in updatedField) {
                            if(updatedField.hasOwnProperty(attr))
                                forms[i].fields[j].attr = updatedField.attr;
                        }
                    }
                }
            }
        }
        return null;
    }


};