const express = require('express');
const qrcode=require("qr-image");
const uuidV4 = require('uuid/v4');
const config=require("./config");
const listen=require("./hardware/listen");
const debug=require("./debug/debug");
const wxapi=require("./api/wx/wx_api");

var app = express();
app.use(express.static('www'));
app.get('/', function (req, res) {
    res.send('Hello World!');
});
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    config.QR_CODE_KEY=uuidV4();
    console.log(config.INFO);

});

listen.register(app);
debug.register(app);
wxapi.register(app);

var timer = setInterval(function () {
    listen.timeTickSecond();
}, 1000);