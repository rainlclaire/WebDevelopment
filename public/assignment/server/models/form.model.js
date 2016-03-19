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
        updateFormField: updateFormField,
        updateForUser:updateForUser


    };
    return api;

    function create(newForm) {
        newForm.id = (new Date()).getTime();
        forms.push(newForm);
        return forms;
    }


    function createFormForUser(newForm, userid) {
        console.log("cici");
        console.log(newForm);
        console.log(userid);

        newForm.id = (new Date()).getTime();
        newForm.userid = userid;
        console.log(newForm);
        forms.push(newForm);
        return findFormsByUserId(userid);
    }


    function findAll() {
        return forms;
    }

    function findById(id) {

        for(var i = 0; i < forms.length; i++) {
            if(forms[i].id == id) {
                // form found!
                return forms[i];
            }
        }
        return null;
    }


    function update(id, updatedForm) {

        for(var i = 0; i < forms.length; i++) {
            console.log("outside if");
            console.log(id);
            if(forms[i].id === id) {
                console.log("inside if");
                console.log(forms[i].id);
                console.log(id);

                for(var attr in updatedForm) {
                    if(updatedForm.hasOwnProperty(attr))
                        forms[i].attr = updatedForm.attr;
                }
                break;
            }
        }
        console.log("form model");
        console.log(forms);
        return forms;
    }

    function remove(id) {

        for(var i = 0; i < forms.length; i++) {
            if(forms[i].id == id) {
                // form found!
                forms.splice(i, 1);
                break;
            }
        }
        return forms;
    }

    function removeForUser(id, userid) {

        for(var i = 0; i < forms.length; i++) {
            if(forms[i].id == id) {
                // form found!
                forms.splice(i, 1);
                break;
            }
        }
        return findFormsByUserId(userid);
    }

    function updateForUser(id, userid, updatedForm) {
        for(var i = 0; i < forms.length; i++) {
            if(forms[i].id == id) {

                for(var attr in updatedForm) {
                    if(updatedForm.hasOwnProperty(attr))
                        forms[i].attr = updatedForm.attr;
                }
                break;
            }
        }
        //return forms;
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
            console.log(i);
            console.log(forms[i].userId);
            //console.log(userid);
            if(forms[i].userid == userid) {
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
    //function reorderFieldForForm(id, fieldid, field){
    //
    //    for(var i = 0; i < forms.length; i++) {
    //        if(forms[i].id == id) {
    //
    //            for(var j = 0; j < forms[i].fields.length; j++) {
    //                if(forms[i].fields[j].id == fieldid){
    //                    // field found!  update it
    //                    for(var attr in updatedField) {
    //                        if(updatedField.hasOwnProperty(attr))
    //                            forms[i].fields[j].attr = updatedField.attr;
    //                    }
    //                }
    //            }
    //        }
    //    }
    //    return null;
    //}



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