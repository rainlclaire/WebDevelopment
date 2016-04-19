//
//
//
//
//var express = require('express');
//var app = express();
//var bodyParser = require("body-parser");
//
//require("./assignment/server/app.js")(app);
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(express.static(__dirname + '/public'));
//var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
//var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
//
//
//if (typeof ipaddress === "undefined") {
//    //  Log errors on OpenShift but continue w/ 127.0.0.1 - this
//    //  allows us to run/test the app locally.
//    console.warn('No OPENSHIFT_NODEJS_IP var, using 127.0.0.1');
//    ipaddress = "127.0.0.1";
//};
//app.listen(port, ipaddress);


//  OpenShift sample Node application
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var multer = require('multer');
var passport = require('passport');
var fs = require('fs');
var Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(multer());
app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true

}));

app.use(passport.initialize());
app.use(passport.session());
app.get("/", function(req, res) {
    res.sendfile('index.html', {root: __dirname });
});



var ipaddress = process.env.OPENSHIFT_NODEJS_IP;
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
var myDataBase = "/cs4550assignment";
var connectionString = "mongodb://"+"localhost/cs4550assignment";

if (typeof ipaddress === "undefined") {
    //  Log errors on OpenShift but continue w/ 127.0.0.1 - this
    //  allows us to run/test the app locally.
    console.warn('No OPENSHIFT_NODEJS_IP var, using 127.0.0.1');
    ipaddress = "127.0.0.1";

}
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}




var db = mongoose.connect(connectionString);

//db.once('open', function() {
//    var gfs = Grid(db.db);
//    app.set('gridfs', gfs);
//});

require("./public/assignment/server/app.js")(app, db,mongoose);
require("./public/temp/server/app.js")(app,db,mongoose);
require("./public/project/server/app.js")(app,db,mongoose);


app.listen(port, ipaddress);