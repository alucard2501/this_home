var WINDOWS_WIDTH_SOURCE=640;
var WINDOWS_HEIGHT_SOURCE=960;
var SIZE_SCALE=1;
var ICON_WIDTH=0;
var ICON_WIDTH_SOURCE=120;
var MAIN1_HEIGHT;
var MAIN_HEIGHT;
var FOOTER_HEIGHT;

$(document).ready(function(){
    resize();
    //$( "#Select_type" ).selectmenu();
});
function resize(){
	//计算main的高度
    var width1 = WINDOWS_WIDTH_SOURCE, height1 = 391;
    var width2 = $(window).width();
    SIZE_SCALE=width2 / width1;
    var height2 = height1 * SIZE_SCALE;
    ICON_WIDTH=ICON_WIDTH_SOURCE * SIZE_SCALE;
    $("#status").height($(window).height()-height2-168);
    MAIN_HEIGHT=height2;
    MAIN1_HEIGHT=$(window).height();
    FOOTER_HEIGHT=$(window).height()*0.088;
    $("#main").css("height", height2);
    $("#main1").height($(window).height());
    $("body").height($(window).height());
    
    $("#footer").height(FOOTER_HEIGHT);
    $(".btnFooter").css("line-height",FOOTER_HEIGHT+"px");
}