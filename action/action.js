const MDAO=require("../action/DAO");


var action={};

action.submit=submit;

function submit(params){
    var result={
        
    }
    switch(params.action){
        case "lbus_heart":
            lbusHeart(params,result);
            break;
    }
    return result;
}
function lbusHeart(params,result){
    var vo={
        TableName:"t_l_bus"
        ,remark:""
        ,addrNet:params.addrNet
        ,addrDevice:params.addrDevice
        ,isOnline:params.isOnline
    }
    var sql="SELECT * FROM t_l_bus WHERE addrNet=" + params.addrNet +" AND addrDevice=" + params.addrDevice +";";
    var rs=MDAO.fillRS(sql);
    if(rs.length>0){
        vo.id=rs[0].id;
    }
    result.id=MDAO.save(vo);
    //connection
}
exports.submit=action.submit;