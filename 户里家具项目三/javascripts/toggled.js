/**
 * 商品详情页.
 */
$(function () {
    //递减和递加函数
    plusminus();
   //数据加载
    dataLoading();
    //图片切换
    pictureSwitching();
   //本地储存取数据
    fetchData();
    //储存加入购物车的值
    jointheShoppingcart();
    //点击客户咨询和立即购买
    immeDiately()
    // 实例化自定义弹出框
    var createDialog = new DialogRimi({
        header: "您有新的消息啦！",
        teachrInfo: "客服（QQ:123456789）",
        message: "您好，我是小李，有什么可以帮到你的吗"
    });
    // 初始化并执行
    createDialog.init();
});
//递减和递加
function plusminus() {
    //为加绑定点击事件
    $(".plus").on("click",function () {
        //当点击加的按钮时解除减按钮的禁用状态
        $(".minus").removeClass("disabled");
        //获取当前元素父级的同级值
        $(this).parent().siblings("input").val(function (idx,Item) {
         //把input的值转换成整数
         var  num =  parseInt(Item);
         return num + 1;
        });
       // 库存数量不能大于5
       if($(this).parent().siblings("input").val() >= "5"){
       $(this).prop("disabled",true);
       $(this).siblings(".minus").prop("disabled",false);
           //当等于5的时候添加禁用class
           $(this).addClass("disabled")
       }
       else {
           $(this).prop("disabled",false);
           $(this).siblings(".minus").prop("disabled",false);
       }
    });
    //为减绑定点击事件
    $(".minus").on("click",function () {
        //当点击加的按钮时解除减按钮的禁用状态
        $(".plus").removeClass("disabled");
        //获取当前元素父级的同级值
        $(this).parent().siblings("input").val(function (idx,Item) {
            //把input的值转换成整数
            var  num =  parseInt(Item);
            return num - 1;
        });
        // 库存数量不能小于0
        if($(this).parent().siblings("input").val() === "0"){
            $(this).prop("disabled",true);
            $(this).siblings(".plus").prop("disabled",false);
            //当等于0的时候添加禁用class
            $(this).addClass("disabled")

        }else {
            $(this).prop("disabled",false);
            $(this).siblings(".plus").prop("disabled",false);
        }
    })
}
/**
 * 数据加载
 */
function dataLoading() {
  $.getJSON("javascripts/toggledata.json",function (data) {
      //图片加载
      var str = "";
      var txt = "";
    for(var i = 0; i < data.min.length;i++){
          str += '<li><img src='+ data.min[i] +'></li>'
          txt += '<li><img src='+ data.max[i] +'></li>'
    }
      $(".minImg").append(str);
      $(".maxImg").append(txt);
      $(".minImg").children("li:first").trigger("click");
    //购买信息
        $(".goodsNome p span:first").text(data.shopdetails[0].type);
        $(".goodsNome p span:last").text(data.shopdetails[0].degree);
        $(".goodsDynamic p .rmbNum").text(data.shopdetails[0].costprice);
        $(".goodsDynamic .score span:nth-child(2)").text(data.shopdetails[0].integral);
  })
}

/**
 * 图片切换
 */
function pictureSwitching() {
    $(".minImg").on("click","li",function () {
        $(this).addClass("selected").siblings().removeClass("selected");
        //获取当前点击的索引值
        var idx = $(this).index();
        $(".maxImg li").eq(idx).fadeIn(500);
        $(".maxImg li").eq(idx).siblings().fadeOut(300)
    });

}
/**
 * 本地储存取数据
 */
function fetchData() {
    var objLocal = JSON.parse(localStorage.getItem("detailsPage"));
    $(".goodsNome h1").text(objLocal.title);
    if(objLocal.price === ""){
        $(".goodsPrice .origPrice span:nth-child(2)").text((objLocal.orPrice).slice((objLocal.orPrice).indexOf("￥")+1));
        $(".goodsPrice .origPrice span:nth-child(4)").remove();
        $(".goodsPrice .origPrice span.a").remove();
        $(".goodsPrice .origPrice span:nth-child(6)").remove();
        $(".goodsPrice .origPrice span.b").remove();
    }else {
        $(".goodsPrice .origPrice span:nth-child(2)").text((objLocal.orPrice).slice((objLocal.orPrice).indexOf("￥")+1));
        $(".goodsPrice .origPrice span:nth-child(6)").text((objLocal.price).slice((objLocal.price).indexOf("￥")+1));
    }

}
/**
 * 储存加入购物车的值
 */
function jointheShoppingcart() {
    var arr = [];
    //为加入购物车绑定点击事件
    $(".shoppingCar").on("click",function () {
     //获取需要加入购物车的文本值
     var inPut   = $(".countSet input").val();
     var  tit    = $(".goodsNome h1").text();
     var oPrice  = $(".goodsPrice .origPrice span:nth-child(2)").text();
     var size    = $(".goodsSize span:nth-child(2)").text();
     var texture = $(".goodsTexture span:nth-child(2)").text();
     var color   = $(".goodsColor span:nth-child(2)").text();
        if(inPut === "0"){
            return
        }
     var obj = {
         "tit":tit,
         "oPrice":oPrice,
         "size":size,
         "texture":texture,
         "color":color,
         "inPut":inPut
     };
        arr.push(obj);
        var detaShoppingcart = JSON.stringify(arr);
        localStorage.setItem("detaShoppingcart",detaShoppingcart);
    })
};
/**
 * 功能：点击客户咨询和立即购买
 */
//点击客户咨询弹出咨询框
function immeDiately() {
    $(".onlineServer").on("click",function () {
      $("#dialogCustom").css({
          "display":"block",
          "opacity":"1",
          "transform":"translate(-8%,-11%)"
      });
    });
    //点击立即购买跳转到我的订单
    $(".immedBuy").on("click",function () {
    localStorage.setItem("num",1);
        location.href = "information.index.html"
    })
    
}


//咨询
 function DialogRimi(param) {
// 设置弹出框头部文本对象参数
var header = param.header;
// 设置客服信息对象参数
var teachrInfo = param.teachrInfo;
// 设置消息内容对象参数
var message = param.message;
// 获取现在的时间
var nowDate = new Date();
var hours = nowDate.getHours(),
    minutes = nowDate.getMinutes(),
    second = nowDate.getSeconds();
// 时间补零操作
hours = (hours.toString().length === 2) ? hours : "0" + hours;
minutes = (minutes.toString().length === 2) ? minutes : "0" + minutes;
second = (second.toString().length === 2) ? second : "0" + second;
// 拼接出当前的时间
var nowTime = hours + ":" + minutes + ":" + second;
// 创建弹出框
var createDialog = function() {
    var dialog = document.createElement("div");
    dialog.innerHTML =
        '<div class ="dialog-header">' +
        '<div class = "dialog-icon"></div>' +
        '<span>' + header + '</span>' +
        '<div class="close">×</div>' +
        '</div>' +
        '<div class = "dialog-content">' +
        '<div class="consulter">' +
        '<span>' + teachrInfo + '</span>' +
        '<span>' + nowTime + '</span>' +
        '</div>' +
        '<div class="message">' + message + '</div>' +
        '<p class="text"></p>'+
        '</div>' +
        '<div class = "dialog-mesgbox">' +
        '<input type="text" name="mesgContent" placeholder="请在此输入..." class="val">' +
        '<button type="button" class="btn">发送</button>' +
        '</div>';
    // 设置一个弹出框的ID
    dialog.setAttribute("id", "dialogCustom");
    // 将弹出框添加进页面
    document.body.appendChild(dialog);
};

// 消息框获得焦点事件
var mesgBoxFocus = function() {
    $(".btn").on("click",function () {
        $(".text").text($(".val").val());
        $(".val").val("");
    });
};

// 关闭对话框
var coloseDialog = function() {
    var dialogCustom = document.getElementById("dialogCustom");
    var closeBtn = dialogCustom.getElementsByClassName("close")[0];
    closeBtn.addEventListener("click", function() {
        dialogCustom.style.opacity = 0;
        dialogCustom.style.transform = "translate(-50%, -50%) scale(0)";
        setTimeout(function() {
            // 对话框主体移除
            dialogCustom.fadeOut(300);
        },300);
    });
};

// 初始化并执行
this.init = function() {
    // 创建对话框
    createDialog();
    // 消息框获得焦点事件
    mesgBoxFocus();
    // 关闭对话框
    coloseDialog();
}

}

























