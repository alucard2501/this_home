const GatewayBase=require("../devices/GatewayBase");
const util=require("util");
module.exports=LBus;
function LBus(){
    GatewayBase.call(this);
    this.name="LBus";
    this.addrNet=0;
    this.addrDevice=0;
    this.devices=[];
    this.udpClient={};
    this.answerHeart=answerHeart;
    this.sendCommand=sendCommand;
}

function answerHeart(){
    var body=[];
    body.push(this.addrNet);
    body.push(this.addrDevice);
    body.push(0x00);
    body.push(0x0e);
    body.push(0xf8);
    this.sendCommand(body);
}
function sendCommand(body){
    var data=[];
    data.push(0xaa);
    data.push(0xaa);
    data.push(body.length+1);
    for(var i=0;i<body.length;i++){
        data.push(body[i]);
    }
    var vali_code=0;
    for(var i=0;i<data.length;i++){
        vali_code+=data[i];
    }
    data.push(vali_code & 0xff);
    var buf=new Buffer(data);
    if(this.server!=null){
        this.server.send(buf,0,buf.length,this.port,this.address);
    }
}
util.inherits(LBus,GatewayBase);