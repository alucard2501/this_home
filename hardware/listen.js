


const config=require("../config");
// const OBus=require("./gateway/OBus");
// const LBus=require("./gateway/LBus");
// var e=new OBus();
// var l=new LBus();
// exports.test=function(){
//     console.log(e.name);
//     console.log(l.name);
// }
const Handler = {};
var list_bus_server=[]
Handler.register = function () {
    for(var i=0;i<config.BUSES.length;i++){
        var bus=config.BUSES[i];
        var bus_server=require('./' + bus +'/listener');
        bus_server.bind(config.LOCAL_IP);
        list_bus_server.push(bus_server);
    }
}
function getClient(){

}
Handler.timeTickSecond = function () {
    //console.log(config.QR_CODE_KEY);
    for(var i=0;i<list_bus_server.length;i++){
        var bus_server=list_bus_server[i];
        bus_server.timeTickSecond();
    }
}
exports.register = Handler.register;
exports.timeTickSecond = Handler.timeTickSecond;