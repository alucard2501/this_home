const express = require('express');
const listen=require("./hardware/listen");
const debug=require("./debug/debug");

var app = express();
app.use(express.static('www'));
app.get('/', function (req, res) {
    res.send('Hello World!');
});
listen.register(app);
debug.register(app);

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('listening at http://%s:%s', host, port);
});
var timer = setInterval(function () {
    listen.timeTickSecond();
}, 1000);