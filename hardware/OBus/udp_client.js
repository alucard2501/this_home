const BasicFunction=require("../../BasicFunction");
const DATA_HEAD="AA AA";
module.exports=UDPClient;
function UDPClient(rinfo){
    this.port=rinfo.port;
    this.address=rinfo.address;
    this.data=[];
    this.timecount=0;
    this.add=function(data){
        for(var i=0;i<data.length;i++){
            this.data.push(data[i]);
        }
        console.log("收到消息"+BasicFunction.bytes2hex(data));
        var end_index=0;
        var start_index=0;
        var temp=[];
        for(var i=0;i<this.data.length;i++){
            if(this.data[i]==0xaa && i<this.data.length-1){
                if(this.data[i+1]==0xaa && i<this.data.length-2){
                    var len=this.data[i+2];
                    if(this.data.length-i-3>=len){
                        var buffer=[];
                        for(var j=0;j<len+3;j++){
                            buffer.push[this.data[i+j]];
                        }
                        start_index=i;
                        end_index=i+len+3;
                        break;
                    }
                }
            }
        }
        if(end_index>0){
            for(var i=0;i<start_index;i++){
                this.data.shift();
            }
            var buffer=[];
            for(var i=0;i<len+3;i++){
                buffer.push(this.data.shift());
            }
            console.log("提取消息"+BasicFunction.bytes2hex(buffer));
        }
        
    }
}