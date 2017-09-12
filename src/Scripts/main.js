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
    var year =  date.getFullYear()
    var month = date.getMonth();
    var day = date.getDate();
    var mthStr = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][month]

    return mthStr + ' ' + day + ', ' + year
}


// dom ready operation
function newsReady() {
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
    $(".dropdown-menu li").click(function(){
        $(".btn .search-text").text($(this).find("a").text())
    })
}

function getSearchParam(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return(false);
}

function getTags0(cb) {
    $get('/Tag/GetAll',{},function (data) {
        var tags0 = []
        if(data.Status == 2){
            var retTags = data.Body
            if(retTags && retTags.length){
                for(var i=0; i<retTags.length; i++){
                    var t = retTags[i]
                    if(t.ParentId === 0){
                        tags0.push(t)
                    }
                }
            }
        }else{
            alert(data.Message)
        }
        cb(tags0)
    },function (error) {
        console.log('get tags error: ', error)
    })
}


// make
function makeArticleItem(dt) {
    var $item = $('.articleItemTmpl').clone().removeClass('articleItemTmpl')
    $item.find('.articleTitle').text(dt.Title)
    $item.find('.articleLink').attr('href','news_detail.html?articleId='+dt.ArticleId)
    $item.find('.articleDate').text(fmtDate1(dt.Timestamp))
    $item.find('.articleTags').text(dt.Keywords)
    $item.find('.articleAuthor').text(dt.Member.Name)
    $item.find('.articleImgWrap>img').attr('src','http://aaeca.img-us-west-1.aliyuncs.com/'+dt.ImageKey)
    $item.find('.articleAuthorIcon>img').attr('src','http://aaeca.img-us-west-1.aliyuncs.com/'+dt.Member.AvatarKey)
    return $item
}

function makeMemberItem(dt) {
    var $item = $('.memberItemTmpl').clone().removeClass('memberItemTmpl')
    var tagsStr = ''
    if(dt.Tags && dt.Tags.length){
        for(var i=0; i<1; i++){
            tagsStr += dt.Tags[i]['EnglishName']
            tagsStr += ' '
        }
    }
    $item.find('.memberTags').text(tagsStr)
    $item.find('.memberName').text(dt.Name)
    $item.find('.memberImgWrap>img').attr('src','http://aaeca.img-us-west-1.aliyuncs.com/'+dt.AvatarKey+'@!w170h170');
    $item.find('.memberLink').attr('href','member_article.html?MemberId='+dt.MemberId)
    return $item
}

function makeVideoItem(dt) {
    var $item = $('.videoItemTmpl').clone().removeClass('videoItemTmpl').css('display', 'block');
    $item.find('.video-title').text(dt.Title);    //video title
    $item.find('.namemember').text(dt.Member.Name);  //namemember
    $item.find('.datamember').text(fmtDate1(dt.Timestamp));   //date
    $item.find('.icon-person').attr('src','http://aaeca.img-us-west-1.aliyuncs.com/'+dt.Member.AvatarKey);   //小头像
    $item.find('.newsvedio').attr('src','http://aaeca.img-us-west-1.aliyuncs.com/'+dt.ImageKey)   // 视频地址
    $item.find('.wrap-video-introduction').attr('href', "person_video_detail.html?VideoId="+dt.VideoId);
    return $item
}

