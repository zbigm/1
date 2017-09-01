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
		var position = $(".input-list .position").val();
		var unit = $(".input-list .unit").val();
		var number = $(".input-list .number").val();
		var intruction = $(".input-list .intruction").val();
		if (position === '' || unit === '' || number === '' || intruction === '') {
			alert('请将信息填写完整再提交');
			return;
		}
	})   
	var selected = [];
	$(".input-select").change(function() {
		var self = this;
		var hasitem = selected.every(function(item){
			return item !== $(self).val()
		})
		if (hasitem) {
			selected.push($(this).val())
			$(".selected").empty();
			for(var i = 0; i < selected.length; i++) {
				$(".selected").append('<div class="selected-item"><i>'
                    +selected[i]+'</i><span>x</span></div>')
			}
		}
	})   
	$("body").on("click", ".selected-item span", function(){
		var text = $(this).parents(".selected-item").find("i").text();
		for(var j = 0; j < selected.length; j++) {
			if(text === selected[j]) {
				selected.splice(j,1);
				break;
			}
		}
		$(".selected").empty();
		for(var i = 0; i < selected.length; i++) {
			$(".selected").append('<div class="selected-item"><i>'
                +selected[i]+'</i><span>x</span></div>')
		}
	}) 
})
