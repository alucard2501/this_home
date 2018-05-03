const express = require('express');
const httpRequest=require('urllib-sync');
const bodyParser = require('body-parser');
const BasicFunction=require("../../BasicFunction");
const wx_config=require("./wx_config")

var WebLoginGetAccessTokenUrl="https://api.weixin.qq.com/sns/oauth2/access_token?appid=WEIXIN_APP_ID&secret=WEIXIN_APP_SECRET&code=REQUEST_CODE&grant_type=authorization_code";
function register(app){
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.get('/wxapi', function (req, res) {
        var result={errorMessage:"",status:"SUCCESS"}
        var a="";
        if(req.query.state=="weixin_login"){
            handleWXLogin(req.host,req.query.code);
            //成功--返回SESSION_ID

            //失败--返回跳转url


        }
        
        res.send(JSON.stringify(result));
    });
}
function handleWXLogin(domain,code){
    var wx_client=getWXConfigByDomain(domain);
    if(wx_client!=null){
        var url=WebLoginGetAccessTokenUrl.replace("REQUEST_CODE", code).replace("WEIXIN_APP_ID",wx_client.app_id).replace("WEIXIN_APP_SECRET", wx_client.app_secert);
        var result=httpRequest.request(url)
        result=JSON.parse(BasicFunction.DecodeUint8arr(result.data));
        //result.access_token
        //result.openid
        console.log(JSON.stringify(result));
    }
}


function getWXConfigByDomain(domain){
    for(var i=0;i<wx_config.wx_client.length;i++){
        if(domain==wx_config.wx_client[i].domain){
            return wx_config.wx_client[i];
        }
    }
    return null;
}



exports.register = register;