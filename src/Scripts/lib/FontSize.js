$(function(){
    //设置rem
    function mobile(){
        var size=100,    //规定rem与px之间值的转换
            maxWidth =750; //设置基准宽度。
        ratio = function(){
            var r = document.documentElement.clientWidth / maxWidth;
            return r>=1?1:r<=0.234?0.234:r;
        };
        set = function(){
            document.documentElement.style.fontSize = ratio() * size +'px';
        }();
        window.onresize = mobile;
    }
    mobile();
});