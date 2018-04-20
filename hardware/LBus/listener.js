/**
 * LBus's listener
 */
const dgram=require("dgram");
const BasicFunction=require("../../BasicFunction");
const ACTION=require("../../action/action");
const UDPClient=require("./udp_client");
const LBus=require("./LBus");
const PORT=10856;
const TIME_OUT=30;
var listener={};
var arr_client=[];
var arr_bus=[];
var server;
listener.bind=function(ip){
    server=dgram.createSocket("udp4");

    server.on("message",function(msg,rinfo){
        var client=getClient(rinfo);
        if(client==null){
            client=new UDPClient(rinfo);
            arr_client.push(client);
        }
        client.add(msg,handlerMessage);
        var buf=new Buffer("收到了","utf8");
    });
    server.on("listening",function(){
        var address=server.address();
        console.log("正在侦听"+address.address+":"+address.port);
    });

    server.bind(PORT,ip);
}
listener.timeTickSecond=function(){
    for(var i=0;i<arr_bus.length;i++){
        arr_bus[i].timecount++;
        if(arr_bus[i].timecount>TIME_OUT){
            var action={
                action:"lbus_heart"
                ,addrNet:arr_bus[i].addrNet
                ,addrDevice:arr_bus[i].addrDevice
                ,isOnline:0
            }
            ACTION.submit(action);
            for(var j=0;j<arr_client.length;j++){
                if(arr_client[j].address==arr_bus[i].address && arr_client[j].port==arr_bus[i].port){
                    arr_client.splice(j,1);
                    break;
                }
            }
            arr_bus.splice(i,1);
            return;
        }
    }
}
function getClient(rinfo){
    for(var i=0;i<arr_client.length;i++){
        if(arr_client[i].port==rinfo.port && arr_client[i].address==rinfo.address){
            return arr_client[i];
        }
    }
    return null;
}
function getBus(addrNet,addrDevice){
    for(var i=0;i<arr_bus.length;i++){
        if(arr_bus[i].addrNet==addrNet && arr_bus[i].addrDevice==addrDevice){
            return arr_bus[i];
        }
    }
    return null;
}
function handlerMessage(data,address,port){
    console.log((new Date).toLocaleString() + ",IP:" +address + ",port:"+port + ",r:" +BasicFunction.bytes2hex(data));
    var addr_net=data[3];
    var addr_logic=data[4];
    var code=data[5];
    if(code==0x0d){
        //设备心跳
        handlerHeart(data,address,port);

    }
}
function handlerHeart(data,address,port){
    //标记设备在线
    var action={
        action:"lbus_heart"
        ,addrNet:data[3]
        ,addrDevice:data[4]
        ,isOnline:1
    }
    var result=ACTION.submit(action);
    var bus=getBus(data[3],data[4]);
    if(bus==null){
        bus=new LBus();
        bus.addrNet=data[3];
        bus.addrDevice=data[4];
        bus.address=address;
        bus.port=port;
        bus.id=result.id;
        bus.server=server;
        arr_bus.push(bus);
    }else{
        bus.timecount=0;
    }
    bus.answerHeart();
}

exports.bind=listener.bind;
exports.timeTickSecond=listener.timeTickSecond;