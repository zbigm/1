(function(){
    var recalc = function () {
        var clientWidth = $(window).width();
        if(clientWidth>=750){
            $('html').css('fontSize', '100px');
        }else{
            $('html').css('fontSize', 100 * (clientWidth / 750) + 'px');
        }
    };
    recalc();
    var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
    window.addEventListener(resizeEvt, recalc, false);
})();