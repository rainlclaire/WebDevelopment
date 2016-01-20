var express = require('express');
var app = express();
//var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
//var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
//app.use(express.static(__dirname + '/public'));
//function sayhello(req,res) {
//    res.send('hello world1');
//}
//
//function getAllUsers(req, res) {
//    var user = [{"usersname": "claire", "firstname": "qin", "lastname":"yueling"},
//        {"usersname": "claire", "firstname": "qin", "lastname":"yueling"}
//
//    ]
//    res.json(user)
//    //res.send("object literal" );
//}
//app.get('/hello', function(req, res){
//    res.send('hello world22');
//
//});
app.use(express.static(__dirname + '/public'));
app.listen(3000);