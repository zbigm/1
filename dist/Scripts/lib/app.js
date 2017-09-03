$(function(){
    //modal
    $(".news-modal .modal-item").click(function(){
        $(this).addClass('active').siblings().removeClass('active');
    });
    $(".classify-icon").click(function(){
        $(this).hide().siblings('.cancel-icon').show();
        $(".wrap-news-modal").show().siblings('#loadmask').show();
    });
    $(".cancel-icon").click(function(){
        $(this).hide().siblings('.classify-icon').show();
        $(".wrap-news-modal").hide().siblings('#loadmask').hide();
    });
    $(".wrap-logsignbtn .persion-btn").click(function(){
        $(this).addClass('active').siblings().removeClass('active');
    });
    //memeber
    $(".wrap-member-title li,.wrap-searchtag a").click(function(){
    		$(this).addClass("active").siblings().removeClass("active");
    })
});