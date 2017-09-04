var apiServer = 'http://api.m.aaeca.org'
function $get(url, data, doneFn, failFn, alwaysFn) {
    $.get(apiServer + url, data)
        .done(function (data) {
            doneFn && doneFn(data)
        })
        .fail(function (error) {
            if(!failFn){
                alert('服务异常，请稍后再试')
            }else{
                failFn(error)
            }
        })
        .always(function () {
            alwaysFn && alwaysFn()
        })
}

function $post(url, data, doneFn, failFn, alwaysFn, alwaysFn) {
    return $.ajax({
        type: 'POST',
        url: apiServer + url,
        data: JSON.stringify(data),
        contentType: 'application/json',
        dataType: 'json'
    })
    .done(function (data) {
        doneFn && doneFn(data)
    })
    .fail(function (error) {
        if(!failFn){
            alert('服务异常，请稍后再试')
        }else{
            failFn(error)
        }
    })
    .always(function () {
        alwaysFn && alwaysFn()
    })
}

function initFs(){
    var size=100;
    var maxWidth =750;
    var ratio = function(){
        var r = document.documentElement.clientWidth / maxWidth;
        return r>=1?1:r<=0.234?0.234:r;
    };
    document.documentElement.style.fontSize = ratio() * size +'px';
}
initFs();
window.onresize = initFs;

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")   ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

function fmtDate1(dateStr) {
    // dateStr: "/Date(1504489057000)/"
    var date = new Date(parseInt(dateStr.match(/\d+/)[0]))
    var fmted = date.Format('M/d/yyyy')
    return fmted
}