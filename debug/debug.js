const express = require('express');
const bodyParser = require('body-parser');
const BasicFunction=require("../BasicFunction");
function register(app){
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.get('/debug', function (req, res) {
        var result={errorMessage:"",status:"SUCCESS"}
        switch(req.query.action){
            case "set_listen":
                console.log("set_listen");
                break;
            case "clean_log":
                cleanLog(result);
                console.log("clean_log");
                break;
            case "get_log":
                renderLog(result);
                //console.log("get_log");
                break;
            case "get_qrcode":
                getQRCode(req.query.userId,result);
                break;
            default:

        }
        
        res.send(JSON.stringify(result));
    });
}


exports.register = register;

function renderLog(result){
    result.log=BasicFunction.logs;
}
function cleanLog(result){
    BasicFunction.logs.splice(0,BasicFunction.logs.length);
}
function getQRCode(userId,result){
    var qrstring="userId=";
}
//exports.timeTickSecond = Handler.timeTickSecond;