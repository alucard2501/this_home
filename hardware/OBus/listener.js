/**
 * OBus's listener
 */
const dgram=require("dgram");
const BasicFunction=require("../../BasicFunction");
const UDPClient=require("./udp_client");
const PORT=10876;
var listener={};
var arr_client=[];
listener.bind=function(ip){
    var server=dgram.createSocket("udp4");

    server.on("message",function(msg,rinfo){
        var client=getClient(rinfo);
        if(client==null){
            client=new UDPClient(rinfo);
            arr_client.push(client);
        }
        client.add(msg);
        //console.log("收到消息:"+BasicFunction.bytes2hex(msg));

        //console.log("client address:"+rinfo);
        var buf=new Buffer("收到了","utf8");
        //server.send(buf,0,buf.length,rinfo.port,rinfo.address);
    });
    server.on("listening",function(){
        var address=server.address();
        console.log("正在侦听"+address.address+":"+address.port);
    });

    server.bind(PORT,ip);
}
listener.timeTickSecond=function(){
    // for(var i=0;i<arr_client.length;i++){
    //     arr_client[i].timecount++;
    //     if(arr_client[i].timecount>TIME_OUT){
    //         arr_client.splice(i,1);
    //         return;
    //     }
    // }
}
function getClient(rinfo){
    for(var i=0;i<arr_client.length;i++){
        if(arr_client[i].port==rinfo.port && arr_client[i].address==rinfo.address){
            return arr_client[i];
        }
    }
    return null;
}


exports.bind=listener.bind;
exports.timeTickSecond=listener.timeTickSecond;