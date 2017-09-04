var apiServer = 'http://localhost:9000'
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