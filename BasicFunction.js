var logs=[];
var session_list=[
    {
        userId:1
        ,token:"k32423-0d9cse32SK32KD0"
    }
];
function bytes2hex(bytes){
    var result="";
    for(var i=0;i<bytes.length;i++){
        result=result + Buffer.from([bytes[i]]).toString('hex')+ " ";
    }
    return result;
}

function myLog(text){
    console.log(text);
    logs.push(text);
    if(logs.length>100){
        logs.splice(0,1);
    }
}
exports.bytes2hex=bytes2hex;
exports.myLog=myLog;
exports.logs=logs;
exports.session_list=session_list;