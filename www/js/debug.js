$(document).ready(function(){
    $("#Btn_Search").click(function(){
        $(".trRow").remove();
        var data = {};
        data.action = "DEBUG_GET_GATEWAY_LIST";
        data.isOnline=2;
        if($("#Radio_Online_1")[0].checked)data.isOnline=1;
        if($("#Radio_Online_2")[0].checked)data.isOnline=2;
        if($("#Radio_Online_3")[0].checked)data.isOnline=3;
        data.mac=$("#Text_Mac").val();
        data.temp = Math.random();
        $.ajax({
            type: "GET",
            url: GET_DATA,
            data: data,
            dataType: 'json',
            async: true,
            success: function (response, status, xhr) {
                if (response.errorMessage.length == 0) {
                    for(var i=0;i<response.Record.length;i++){
                        var row=response.Record[i];
                        var tr=$("<tr class='trRow'><td>" + row.id +"</td><td>" + row.mac +"</td><td>" + row.name +"</td><td>" + row.QRcode2 +"</td><td><input type='checkbox' class='checkListen' " + ((row.isListen)?"checked=1":"") +"  value='" + row.id +"'></td></tr>");
                        tr.appendTo($("#TB_Gateway"));
                    }
                    $(".checkListen").click(checkListenClick);
                } else {
                    alert(response.errorMessage);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("loadGateWay");
            }
        });
    });
    $("#Btn_TagListen").click(function(){
        if($(this).val()=="开始监视"){
            $(this).val("停止监视");
            startListen();
        }else{
            $(this).val("开始监视");
            stopListen();
        }
    });
    $("#Btn_Clean").click(cleanLog);
    $("#Btn_ListenAll").click(function(){
        var data={};
        if(this.value=="监视全局"){
            data.action = "DEBUG_SET_LISTEN_ALL";
            data.ListenAll=1;
        }else if(this.value=="停止监视全局"){
            data.action = "DEBUG_SET_LISTEN_ALL";
            data.ListenAll=0
        }
        $.ajax({
            type: "GET",
            url: GET_DATA,
            data: data,
            dataType: 'json',
            async: true,
            success: function (response, status, xhr) {
                if (response.errorMessage.length == 0) {
                } else {
                    alert(response.errorMessage);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("loadGateWay");
            }
        });
    });
});
function checkListenClick(){
    var data = {
        id:$(this).val()
        ,isListen:(this.checked)?1:0
        ,temp:Math.random()
        ,action:"set_listen"
    };
    $.ajax({
        type: "GET",
        url: "/debug",
        data: data,
        dataType: 'json',
        async: true,
        success: function (response, status, xhr) {
            if (response.errorMessage.length == 0) {
                //$(".checkListen").click(checkListenClick)
            } else {
                alert(response.errorMessage);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("loadGateWay");
        }
    });
}
function cleanLog(){
    $("#Div_Log").empty();
    var data = {
        action:"clean_log"
        ,temp:Math.random()
    };
    $.ajax({
        type: "GET",
        url: "/debug",
        data: data,
        dataType: 'json',
        async: true,
        success: function (response, status, xhr) {
            if (response.errorMessage.length == 0) {
                //$(".checkListen").click(checkListenClick)
            } else {
                alert(response.errorMessage);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("loadGateWay");
        }
    });
}
var timer=null;
function startListen(){
    timer=setInterval(getLog,2000);
}
function stopListen(){
    if(timer!=null)clearInterval(timer);
}
function getLog(){
    var data = {
        action:"get_log"
        ,temp:Math.random()
    };
    $.ajax({
        type: "GET",
        url: "/debug",
        data: data,
        dataType: 'json',
        async: true,
        success: function (response, status, xhr) {
            if (response.errorMessage.length == 0) {
                var str="";
                for(var i=0;i<response.log.length;i++){
                    str=str+response.log[i]+"<br />";
                }
                $("#Div_Log").html(str);
            } else {
                alert(response.errorMessage);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("loadGateWay");
        }
    });
}