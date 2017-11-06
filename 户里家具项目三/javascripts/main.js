/**
 * 功能:个人中心
 */
$(function () {
    //个人信息导航
    personal();
   //个人信息
    news();
  //立即购买跳转到我的订单
    fagg();
  // 删除订单
    deletebutton(".box_info","删除订单","您是否要删除该订单信息？删除后不再显示该订单。");
    deletebutton(".sell_info","删除订单","您是否要删除该出售信息？删除后不再显示该出售信息。");
  // 系统消息消除
    systemMessage();
});
/**
 * 个人信息中心导航栏
 */
//订单数据
$.getJSON("javascripts/orderData.json",function (response) {
    response.tbItem.forEach(function (item) {
        $(".order_baseCtrl .tb_tbody").append('<tr>' +
            '<td class="img_info">' +
            '<div class="img_thumbnail">' +
            '<img src="'+ item.img +'"> ' +
            '<p>'+ item.order +'</p>' +
            '</div>' +
            '</td>' +
            '<td>' + '￥' + item.price + '</td>' +
            '<td>' + item.time + '</td>' +
            '<td>' + item.Delivery + '</td>' +
            '<td>' + item.state + '</td>' +
            '<td class="data_ctrlGroup">' +
            '<div class="top">' +
            '<a class="link-gray">' + item.see + '</a>' +
            '<span class="gapLine_v"></span>' +
            '<a class="link-gray cancleOrder">' + item.cancel + '</a>' +
            '</div>' +
            '<div class="bottom">' +
            '<a class="link-gray">' + item.service + '</a>' +
            '<span class="gapLine_v"></span>' +
            '<a class="link-gray dele deles">' + item.del + '</a> ' +
            '</div>' +
            '</td>' +
            '</tr>')
    })
});
$.getJSON("javascripts/sell.json",function (response) {
    console.log(response)
    response.tabItem.forEach(function (item) {
        $(".sell_info .tb_tbody").append('<tr>' +
            '<td class="img_info">' +
            '<div class="img_thumbnail">' +
            '<img src="'+ item.img +'"> ' +
            '<p>' + item.order + '</p>' +
            '</div>' +
            '</td>' +
            '<td>' + '￥' + item.price + '</td>' +
            '<td>' + item.time + '</td>' +
            '<td>' + item.Delivery + '</td>' +
            '<td>' + item.commodity + '</td>' +
            '<td>' + item.state + '</td>' +
            '<td>' + item.Payment + '</td>' +
            '<td class="data_ctrlGroup">' +
            '<div class="top">' +
            '<a href="#" class="link-gray application">' + item.apply + '</a> ' +
            '</div>' +
            '<div class="bottom">' +
            '<a class="link-gray deleSell deles">' + item.del + '</a> ' +
            '<span class="gapLine_v"></span>' +
            '<a class="link-gray">' + item.cancel + '</a> ' +
            '</div>' +
            '</td>'+
            '</tr>')
    })
});
function personal() {
   // 点击个人信息导航切换事件
   $(".pesnInfo-choose li a").on("click",function () {
       //当前元素添加指定class，其它所有兄弟元素则移除这个class“checked”
       $(this).addClass("checked").parent().siblings().children().removeClass("checked");
       var idx = $(this).parent("li").index();
       //切换到当前导航对应页面
       $(".boxs_information").eq(idx).siblings().css("display","none");
       $(".boxs_information").eq(idx).css("display","block")
   });
    //点击我的出售降价申请跳转到我要出售
    $(".application").on("click",function () {
        $(".boxs_information").css("display","none");
        $(".reducPriceApply").css("display","block");
    });
   // 点击降价申请返回按钮跳转到我的出售
   $(".subSellSet_btn").on("click",function () {
       $(".reducPriceApply").css("display","none");
       $(".sell_info").css("display","block");
   });
  //点击我的出售按钮切换到降价申请
    $(".toSell_btn").on("click",function () {
        $(".sell_info").css("display","none");
        $(".reducPriceApply").css("display","block")
    });
  //点击降价申请提交按钮切换到我的出售
    $(".button_bt").on("click",function () {
     $(".reducPriceApply").css("display","none");
     $(".box_info").css("display","block");
    });
  //点击我的订单返回按钮到个人信息
    $(".large_btn").on("click",function () {
     $(".box_info").css("display","none");
     $(".pesnInfo-set").css("display","block");
    });
  //点击降价申请我要出售按钮跳转到我的出售
    $(".price_btn").on("click",function () {
     $(".reducPriceApply").css("display","none");
     $(".sell_info").css("display","block");
    })
}

/*个人信息*/
function news() {
 //性别切换
    $(".sexSelect i").on("click",function () {
        $(this).addClass("rdo-checked_custom").parent().siblings().children("i").removeClass("rdo-checked_custom");
        $(this).removeClass("rdo_custom").parent().siblings().children("i").addClass("rdo_custom");
    });
// 生日年月日切换
    $(".select_custom i").on("click",function () {
        $(this).siblings(".select_custom ul").slideDown();
        $(this).siblings("ul").children("li").off("click").on("click",function () {
         //存储当前选择的文本
         var txt = $(this).text();
         //替换当前选择的文本值
         $(this).parent().siblings("i").text(txt);
        });
        //鼠标离开时的事件
        $(this).siblings(".select_custom ul").off("click").on("mouseleave",function () {
            $(this).slideUp();
        });
    });
}

function fagg() {
    var str = localStorage.getItem("num");
    if(str){
        $(".pesnInfo-choose li").eq(1).children().trigger("click")
    }else {
        $(".pesnInfo-choose li").eq(0).children().trigger("click")
    }
}
/**
* 删除订单
* */
function deletebutton(parent,mesg_1,mesg_2) {
    $(parent).on("click",".deles",function () {
      $(this).parents("tr").addClass("checkeds");
      $(".maskLayer").fadeIn();
        popup(mesg_1,mesg_2);
        $(".sureCancleThisOrder").off("click").on("click",function () {
            $(".checkeds").remove();
            $(".maskLayer").fadeOut();
        });
        $(".cancleCancleOrder").off("click").on("click",function () {
          $("tr.checkeds").removeClass("checkeds");
            $(".maskLayer").fadeOut();
        })
    })
}
/**
 * 系统消息删除
 * */
function systemMessage() {
    $(".system_news").text( $(".selectors").length);
    //为标记绑定点击事件
    $(".selectors").on("click",function () {
     $(this).toggleClass("selectored");
     if($(this).is(".selectored")){
         $(this).parents(".mesgItem").addClass("selected_dele")
     }else {
         $(this).parents(".mesgItem").removeClass("selected_dele")
     }

    });

//删除标记选中的内容
 $(".btn-large").on("click",function () {
     $(".maskLayer").fadeIn();
     popup("删除消息","您是否要删除选中的消息？删除后不再显示该消息。");
     $(".sureCancleThisOrder").off("click").on("click",function () {
         $(".selected_dele").remove();
         $(".maskLayer").fadeOut();
         //动态设置系统消息个数
         $(".system_news").text( $(".selectors").length);
     });
     $(".cancleCancleOrder").off("click").on("click",function () {
         $(".maskLayer").fadeOut();
     })

 })
}





/**
 * 弹出框
 */
function popup(mesg_1,mesg_2) {
    var str = "";
    str = '<div class="popupBox">'+
        '<div class="popup-header">'+
        '<h1 class="popup-h1">'+ mesg_1 +
        '</h1>'+
        '</div>'+
        '<div class="popup-content">'+
        '<p class="cancel">'+ mesg_2 +
        '</p>'+
        '</div>'+
        '<div class="popup-footer">'+
        '<button type="button" class="sureCancleThisOrder">确定</button>'+
        '<button type="button" class="ml-60 cancleCancleOrder">取消</button>'+
        '</div>'+
        '</div>';
    $(".maskLayer").append(str)
}




























































