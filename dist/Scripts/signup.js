$(function () {
	$("#iagree").change(function(){
		if ($(this).is(':checked')) {
			$(this).parent().addClass("agreebg")
			$(".input-wrap .submit").addClass("cansubmit")
		} else {
			$(this).parent().removeClass("agreebg")
			$(".input-wrap .submit").removeClass("cansubmit")
		}
	})
	$("body").on("click", ".cansubmit", function(){
		var email = $(".input-list .email").val();
		var code = $(".input-list .code").val();
		var password1 = $(".input-list .password1").val();
		var password2 = $(".input-list .password2").val();
		if (email === '') {
			alert('请输入邮箱');
			return;
		}
		if (code === '') {
			alert('请输入验证码');
			return;
		}
		if (password1 === '' || password2 === '') {
			alert('请输入密码');
			return;
		}
		if (password1 === password2) {
			alert('两次输入的密码不一样');
			return;
		}
	}) 
	var count = 60;
	var timer; 
	$("body").on("click", ".getcode", function() {
		var email = $(".input-list .email").val();
		if (email === '') {
			alert('请先输入邮箱');
			return;
		}
		$(this).removeClass("getcode");
		timer = setInterval(function(){
			count = count - 1;
			$(".auth-code").text('Count ('+count+')');
			if (count === 0) {
				clearInterval(timer);
				$(".auth-code").text('Auth-Code');
				$(".auth-code").addClass("getcode");
				count = 60;
			}
		}, 1000)
		
	})      
})