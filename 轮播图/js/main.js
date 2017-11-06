// 全局变量
var oImgBox   = document.querySelector('.img-box');
var aIdots    = document.querySelectorAll('.idot');
var oPrevBtn  = document.querySelector('.prev');
var oNextBtn  = document.querySelector('.next');
var oWrap     = document.querySelector('.wrap');
var curImgIdx = 1;
var isAnimating = false; // 记录帧动画执行状态
var _timer = null;

main();
autoPlay();



function main() {
    // 点击事件
    // -3120
    // -520
    oPrevBtn.onclick = function () {

        if(isAnimating) {
            return;
        }

        if(curImgIdx == 1) {
            curImgIdx = 6;
        }else {
            curImgIdx--;
        }
        tab(520);
        updateIdots();
    }

    oNextBtn.onclick = function () {
        if(isAnimating) {
            return;
        }

        if(curImgIdx == 6) {
            curImgIdx = 1;
        }else {
            curImgIdx++;
        }
        tab(-520);
        updateIdots();
    }

    // 循环小圆点/并为其添加点击事件
    for(var i = 0; i < aIdots.length; i++) {
        // 为小圆点添加一个自定义属性
        aIdots[i].idx = i + 1;
        aIdots[i].onclick = function () {
            // 异常处理
            if(this.idx == curImgIdx || isAnimating) {
                return;
            }
            // offset = -(targetIdx - curImgIdx) * 520
            var offset = -(this.idx - curImgIdx) * 520;
            tab(offset);
            curImgIdx = this.idx;
            updateIdots();
        }
    }

    oWrap.onmouseenter = stop;
    oWrap.onmouseleave = autoPlay;
}

function tab(offset) {
    isAnimating = true;

    var duration = 500, // 持续时间
        interval = 15, // 每一帧持续的时间（控制流畅度）
        frames   = duration / interval ,// 获取帧数
        speed    = Math.ceil(offset / frames), // 每一帧位移的距离
        curLeft  = parseInt(getStyle(oImgBox, "left")),//当前值
        desLeft = curLeft + offset;//目标值
    var t = setInterval(function () {
        // 更新当前值
        curLeft  = parseInt(getStyle(oImgBox, "left"));
        // 帧动画条件
        // offset > 0 && curLeft < desLeft
        // offset < 0 && curLeft > desLeft
        if((offset > 0 && curLeft < desLeft) || (offset < 0 && curLeft > desLeft)) {
            oImgBox.style.left = curLeft + speed + 'px';
        }else {
            // 停止动画
            clearInterval(t);
            isAnimating = false;
            // 更新位置
            oImgBox.style.left = desLeft + 'px';

            // 无限切换
            if(parseInt(getStyle(oImgBox, "left")) < -3120) {
                oImgBox.style.left = '-520px';
            }else if(parseInt(getStyle(oImgBox, "left")) > -520) {
                oImgBox.style.left = '-3120px';
            }
        }
    }, interval);
}

function getStyle(el, attr) {
    // 兼容ie
    if(el.currentStyle) {
        return el.currentStyle[attr];
    }else {
        // null -> undefined
        return getComputedStyle(el, null)[attr];
    }
}


// 更新小圆点
function updateIdots() {
    // 清除上一个小圆点的样式
    for(var i = 0; i < aIdots.length; i++) {
        if(aIdots[i].classList.contains('active')) {
            aIdots[i].classList.remove('active');
            break;
        }
    }
    aIdots[curImgIdx - 1].classList.add('active');
}


function autoPlay() {
    _timer = setInterval(function () {
        oNextBtn.onclick();
    }, 3000);
}


function stop() {
    clearInterval(_timer);
}



/**
 * 淡入淡出效果-封装
 * @param element   执行元素
 * @param target    目标值
 * @param duration  持续时间
 * @param completed 回调函数
 */
function fade(element, target, duration, completed) {
    // Exception handling
    if(!element || target == undefined) {
        throw 'Error：Parameter is not complete in function \'changeOpacity\'.';
    }
    // Set the default value
    duration  = duration  ? duration  : 1000;
    // Gets the current opacity
    var curOpa = getCurrentOpacity();
    // Calculating offset
    var offset   = target - curOpa;
    // Set the interval
    var interval = 30;
    // Calculating speed
    var speed    = offset > 0 ? Math.ceil(offset / (duration / interval)) : Math.floor(offset / (duration / interval));
    // Execute transition animations
    var t = setInterval(function () {
        // Update the current opacity
        curOpa = getCurrentOpacity();
        // Determine whether to reach the target
        if((offset > 0 && curOpa < target) || (offset < 0 && curOpa > target)) {
            // Frame by frame change
            element.style.opacity = (curOpa + speed) / 100
        }else { // Has completed the transition animation
            element.style.opacity = target / 100;
            clearInterval(t);
            // Invoke the callback function
            if(completed) {
                completed();
            }
        }
    }, interval);

    function getCurrentOpacity() {
        var curOpa = 0;
        // Compatible with IE browser
        if(element.currentStyle) {
            curOpa = element.currentStyle['opacity'] * 100;
        }else {
            curOpa = getComputedStyle(element, false)['opacity'] * 100;
        }
        return curOpa;
    }
}