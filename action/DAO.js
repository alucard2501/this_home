const mysql = require('sync-mysql');
const config = require("../config");

var connection =new mysql({
    host: config.DB_HOST,
    user: config.DB_USER,
    password: config.DB_PASS,
    database : config.DB_NAME
}); 

var dao={};
dao.add=add;
dao.save=save;
dao.update=update;
dao.fillRS=fillRS;
function save(vo){
    if(vo.id==null){
        return add(vo);
    }
    if(vo.id==0){
        return add(vo);
    }
    if(vo.id!=0){
        var sql="SELECT id FROM " + vo.TableName + " WHERE id=" + vo.id;
        var rs=connection.query(sql);
        if(rs.length>0){
            return update(vo);
        }else{
            return add(vo);
        }
    }
    
}

function add(vo){
    if(vo.TableName==null)throw new Error("vo的TableName为空");
    var sql="DESC " + vo.TableName;
    var columns=connection.query(sql);
    sql="SELECT id FROM " + vo.TableName + " ORDER BY id DESC LIMIT 1";
    var rs=connection.query(sql);
    var id=1;
    if(rs.length>0){
        id=rs[0].id+1
    }
    vo.id=id;
    var list_column="";
    var list_value="";
    for(var i=0;i<columns.length;i++){
        var column_name=columns[i].Field;
        if(vo[column_name]!=null){
            var val=vo[column_name];
            if(column_name=="id"){
                list_column=list_column+"`"+column_name+"`"+",";
                list_value=list_value+id+",";
            }else{
                list_column=list_column+"`"+column_name+"`"+",";
                if(columns[i].Type.startsWith("varchar")){
                    list_value=list_value+"'"+val+"',";
                }else{
                    list_value=list_value+val+",";
                }
            }
        }
    }
    sql="INSERT INTO " + vo.TableName +"(" +list_column.substring(0, list_column.length-1) + ") VALUES ("+list_value.substring(0, list_value.length-1)+")";
    connection.query(sql);
    return id;
    //for(var i=0;i<)
}
function update(vo){
    if(vo.TableName==null)throw new Error("vo的TableName为空");
    if(vo.id==null || vo.id==0)throw new Error("vo的id值异常");
    var sql="DESC " + vo.TableName;
    var columns=connection.query(sql);
    var list_column="";
    var list_value="";
    for(var i=0;i<columns.length;i++){
        var column_name=columns[i].Field;
        if(vo[column_name]!=null){
            var val=vo[column_name];
            if (columns[i].Type.startsWith("varchar")) {
                list_column=list_column+"`"+column_name+"`='"+val+"',";
            } else {
                list_column=list_column+"`"+column_name+"`="+val+",";
            }
        }
    }
    sql="UPDATE " + vo.TableName +" SET " +list_column.substring(0, list_column.length-1) + " WHERE id="+vo.id;
    connection.query(sql);
    return vo.id;
}
function fillRS(sql){
    return connection.query(sql);
}
exports.add=dao.add;
exports.save=dao.save;
exports.update=dao.update;
exports.fillRS=dao.fillRS;
