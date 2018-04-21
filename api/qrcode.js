const express = require('express');
const qrcode=require("qr-image");
const md5=require("md5")  
 
const config=require("../config");

function register(app){
    app.get('/qr_img', function (req, res) {
        var qrstr=req.query.qrstr;
        var code = qrcode.image(qstr, { type: 'png' });
        res.setHeader('Content-type', 'image/png');  //sent qr image to client side
        code.pipe(res);
    });
    app.get('/qr_info',function(req,res){
        var signstr="token="+req.query.token +",key=" +config.QR_CODE_KEY;
        var sign=md5(signstr);
        var qrstr="token="+req.query.token+",sign="+sign;
        var _64buf=new Buffer(qrstr);
        var _64str=_64buf.toString('base64');
        var result={
            qrURL:"/qr_img?qrstr=" + _64str
            ,qrstr:_64str
        }
        res.send(JSON.stringify(result));
    });
}



exports.register = register;