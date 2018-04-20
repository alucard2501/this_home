const GatewayBase=require("./GatewayBase");
const util=require("util");
module.exports=OBus;
function OBus(){
    GatewayBase.call(this);
    this.name="OBus";
}

util.inherits(OBus,GatewayBase);