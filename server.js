var express = require('express');
var app = express();
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
app.get('/hello', sayhello);
function sayhello(req, res) {
    res.send('hello world1');
}
//app.get('/hello', function(req, res){
//    res.send('hello world22');
//
//});
app.listen(port, ipaddress);