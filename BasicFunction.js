function bytes2hex(bytes){
    var result="";
    for(var i=0;i<bytes.length;i++){
        result=result + Buffer.from([bytes[i]]).toString('hex')+ " ";
    }
    return result;
}

exports.bytes2hex=bytes2hex;