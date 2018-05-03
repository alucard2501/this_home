const { StringDecoder } = require('string_decoder');
const decoder = new StringDecoder('utf8');

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
/**
 * Convert an Uint8Array into a string.
 *
 * @returns {String}
 */
function DecodeUint8arr(uint8array){
    return decoder.write(uint8array);
}

exports.DecodeUint8arr=DecodeUint8arr;
exports.bytes2hex=bytes2hex;
exports.myLog=myLog;
exports.logs=logs;
exports.session_list=session_list;