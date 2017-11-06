/**
 * Created by admin on 2017/10/31.
 */
addHeader();
addFooter();
//头部进行封装
function addHeader() {
    $("header").append("<div class='contact-box'>" +
        "<a href='#' class='contact'></a>" +
        "</div>"+
        "<div class='logo'>" +
        "<a></a>" +
        "<div class='login'>" +
        "<a class='land' id='login-user'></a>" +
        "<span></span>" +
        "<a class='shopping'><span>"+ "3" +"</span></a> " +
        "</div>" +
        "</div>"+
        "<div class='region-box'>" +
        "<div class='region'><span>" + "成都地区" + "</span>" +
        "<ul class='selector'></ul>" +
        "</div>" +
        "</div>"+
        "<div class='nav_main'>" +
        "<nav>" +
        "<ul class='clearfix'></ul></nav>" +
        "</div>"
    );
    //添加区域
    $(".selector").append(
        "<li>" + "成都地区" + "</li>"+
        "<li>" + "北京地区" + "</li>"+
        "<li>" + "上海地区" + "</li>"+
        "<li>" + "深圳地区" + "</li>"+
        "<li>" + "其他地区" + "</li>"
    )
    //添加购物车内容
    $(".login").append("<div class='shopping-text'>" +
        "<div class='text'>" +
        "<p>" +
        "<span>"+"9成新转角沙发超级转角沙发"+"</span>" +
        "<span>"+"9999"+"</span>" +
        "<span>"+"x2"+"</span>" +
        "</p>" +
        "<p>" +
        "<span>"+"3成新超级大茶几"+"</span>" +
        "<span>"+"9999"+"</span>" +
        "<span>"+"x2"+"</span>" +
        "</p>" +
        "<p>" +
        "<span>"+"7成新超级电视贵"+"</span>" +
        "<span>"+"9999"+"</span>" +
        "<span>"+"x2"+"</span>" +
        "</p>" +
        "</div>" +
         "<div>" +
        "<a href='#'>" + "查看购物车" + "</a> " +
        "</div>"+
        "</div>");
    //添加二级导航
    $.getJSON("data/headerData.json",function (response) {
        console.log(response);
       var $clearfix =  $(".clearfix");
        for(var i = 0; i < response.length; i++){
            $clearfix.append("<li>" +
                     "<a>" + response[i].title + "</a>" +
                     "<div></div>"+
                 "</li>"
            );
            for(var x = 0; x < response[i].navItem.length; x++){
                $(".clearfix li:last > div").append(
                    "<a href='#'>" + response[i].navItem[x] + "</a>")
            }
        }
        select()
        //选择区域
        function select() {
            $(".region").on("click",function () {
                var $selector =  $(".selector")
                $selector.slideDown(300);
                $selector.children().on("click",function (e) {
                    e.stopPropagation();
                    $(".region span").text($(this).text());
                    $selector.slideUp(300);
                })
            })
        }
        //添加购物车的点击事件
        $(".shopping").on("click",function () {
            $(this).toggleClass("border");
            $(".shopping-text").slideToggle(100);
        });




        $(".clearfix li:nth-child(odd)>div>a").addClass("alone");
        $(".clearfix li:nth-child(even)>div>a").addClass("double");
        $(".clearfix li:nth-child(even)>div>a:nth-last-child(1)").addClass("clear_left")
        $(".clearfix li:nth-child(1)").addClass("li_left");
        $(".clearfix li:nth-child(1) div").addClass("div_block");
        $(".clearfix li:nth-child(2) div").addClass("div_double");
        $(".clearfix li:nth-child(4)").addClass("li_double");
        $clearfix.append("<div class='nav_search'>" +
            "<input type='text' value='' placeholder='搜索'> " +
            "<i></i>" +
            "</div>")
    })

}
//页脚进行封装
function addFooter() {
    $("footer").append(
        "<div>"+ "生活要过得朴素而有味道，但不用过得奢华。" +"</div>"+
         "<div><ul class='advantage'></ul></div>" +
        "<div class='service'><ul></ul></div>"+
            "<div>" + "蜀ICP备15028224号&nbsp;&nbsp;成都户里科技有限公司" + "</div>"
    )
    $.getJSON("data/footerData.json",function (response) {
        response.effect.forEach(function (item) {
            $(".advantage").append("<li>" +
                "<i>"+ item.function +"</i>" +
                "<p>" + item.facilitate + "</p>" +
                "</li>")
        });
        response.serive.forEach(function (item) {
            $(".service ul").append("<li>" +
                "<h2>" + item.title + "</h2>" +
                "<p>" +
                "<a>" + item.about + "</a>" +
                "<a>" + item.sell + "</a>" +
                "</p>" +
                "<p>" +
                "<a>" + item.cooperation + "</a>" +
                "<a>" + item.statement + "</a>" +
                "</p>" +
                "<p>" +
                "<a>" + item.guarantee + "</a>" +
                "<a>" + item.protect + "</a>" +
                "</p>" +
                "</li>")
        });
        response.member.forEach(function (item) {
            $(".service ul").append("<li>" +
                "<h2>" + item.title + "</h2>" +
                "<p><a>" + item.plan + "</a></p>" +
                "<p><a>" + item.Integral + "</a></p>" +
                "<p><a>" + item.Complaint + "</a></p>" +
                "</li>")
        });
        response.contact.forEach(function (item) {
            $(".service ul").append("<li>" +
                "<h2>" + item.title + "</h2>" +
                "<p class='tel-box'>" +
                "<span>" + item.tel + "</span><br>" +
                "<span>" + item.number + "</span>"+
                "</p>" +
                "<p class='tel-box'>" +
                "<span>" + item.email + "</span><br>" +
                "<span>" + item.address + "</span>"+
                "</p>" +
                "</li>")
        })
        response.follow.forEach(function (item) {
            $(".service ul").append("<li class='sina-box'>" +
                "<p class='sina'>" +
                "<i></i>" +
                "<span>" + item.WeChat + "</span>" +
                "</p>" +
                "<div></div>" +
                "</li>")
        });
        var $sina =  $(".service ul>li:nth-last-child(1)");
        $sina.removeClass("sina-box");
        $sina.addClass("weChat-box");
        $sina.children("p").removeClass("sina");
        $sina.children("p").addClass("weChat")
    })
}