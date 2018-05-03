var WX_API = '/wxapi';

$(document).ready(function(){
    frame.resize();
    //$( "#Select_type" ).selectmenu();
    frame.wxLogin();
});
var frame={}
frame.WINDOWS_WIDTH_SOURCE=640;
frame.WINDOWS_HEIGHT_SOURCE=960;
frame.SIZE_SCALE=1;
frame.ICON_WIDTH=0;
frame.ICON_WIDTH_SOURCE=120;
frame.MAIN1_HEIGHT=0;
frame.MAIN_HEIGHT=0;
frame.FOOTER_HEIGHT=0;
frame.SESSION_ID="";
frame.resize=function(){
	//计算main的高度
    var width1 = frame.WINDOWS_WIDTH_SOURCE, height1 = 391;
    var width2 = $(window).width();
    frame.SIZE_SCALE=width2 / width1;
    var height2 = height1 * frame.SIZE_SCALE;
    frame.ICON_WIDTH=frame.ICON_WIDTH_SOURCE * frame.SIZE_SCALE;
    $("#status").height($(window).height()-height2-168);
    frame.MAIN_HEIGHT=height2;
    frame.MAIN1_HEIGHT=$(window).height();
    frame.FOOTER_HEIGHT=$(window).height()*0.088;
    $("#main").css("height", height2);
    $("#main1").height($(window).height());
    $("body").height($(window).height());
    
    $("#footer").height(frame.FOOTER_HEIGHT);
    $(".btnFooter").css("line-height",frame.FOOTER_HEIGHT+"px");
}
frame.wxLogin=function(){
    var code=request("code");
	var sessionId = frame.SESSION_ID;
	var data={
        state:"weixin_login"
        ,code:code
        ,sessionId:sessionId
        ,temp:Math.random()
    };
    $.ajax({
        type: "GET",
        url: WX_API,
        data: data,
        dataType: 'json',
        async: false,
        success: function (response, status, xhr) {
            if (response.status == "SUCCESS") {
                frame.SESSION_ID = response.sessionId;
                setCookie("sessionid", response.sessionId);

            } else {
                frame.SESSION_ID = "";
                var strUrl = window.location.href;
                var arrUrl = strUrl.split("/");
                var strPage = arrUrl[arrUrl.length - 1];
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest);
        }
    });
}