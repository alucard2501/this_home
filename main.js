var listen=require("./hardware/listen");


listen.register();

var timer = setInterval(function () {
    listen.timeTickSecond();
}, 1000);