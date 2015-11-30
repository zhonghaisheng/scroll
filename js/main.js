$(function(){
	// 文本输入款的获取焦点和失去焦点事件
	$("input[type=text],input[type=tel]").on("focus", function() {
			if ($.trim($(this).val()) == $(this).attr('data-tip')) {
				$(this).val('');
			}else if($.trim($(this).val())==''){
				$(this).attr("data-value", $(this).attr('data-tip'));
			}
	}).on("blur", function() {
			if ($.trim($(this).val()) == "") {
				$(this).val($(this).attr("data-tip"));
			}
	});	

	/*单屏滚动*/
	var partNum=0;
	var partTop=[];//各区域距离顶部的距离
	var partLength = $('.part').length;
	for(i=0;i<partLength;i++){
		partTop[i]=$(".part").eq(i).offset().top;
	}
	
	//右浮窗控制滚动
	$(".right-nav ul li").click(function(){
		var clickNum=$(this).index();
		var scrollHeight=partTop[clickNum];
		$("html,body").animate({"scrollTop":scrollHeight});	
	});
	
	var canScroll=true;
	
	//向上滚动
	function scroll_up(){
		if(canScroll==true){
			if(partNum>0){
				canScroll=false;
				partNum--;
				var scrollHeight=$(".part").eq(partNum).offset().top;
				$("html,body").animate({"scrollTop":scrollHeight},function(){
					canScroll=true;
				});
			}
		}
	};
	
	//向下滚动
	function scroll_down(){
		if(canScroll==true){
			if(partNum<partLength-1){
				canScroll=false;
				partNum++;
				var scrollHeight=$(".part").eq(partNum).offset().top;
				$("html,body").animate({"scrollTop":scrollHeight},function(){
					canScroll=true;
				});
			}
		}
	};
	
	//控制滚动
	var loghandle = function(event, delta) {
		if(delta > 0){//向上
			scroll_up();
		}
		if(delta < 0){//向下
			scroll_down();
		}
	};

	$(".part").mousewheel(function(event, delta) {
		loghandle(event, delta);
		return false;
	});
	
	$(window).scroll(function(){
		windowTop = $(window).scrollTop();
		$('.right-nav').show();
		$(".right-nav ul li").removeClass("current");
		if( windowTop == 0){
			$(".nav0").addClass("current");
			$('.right-nav').hide();
		}else if( windowTop < partTop[1]){
			partNum=0;
			$('.right-nav').hide();
		}else if(windowTop >= partTop[1] && windowTop < partTop[2]){
			partNum=1;
			$(".nav01").addClass("current");
		}else if(windowTop >= partTop[2] && windowTop < partTop[3]){
			partNum=2;
			$(".nav02").addClass("current");
		}else if(windowTop >= partTop[3] && windowTop < partTop[4]){
			partNum=3;
			$(".nav03").addClass("current");
		}else if(windowTop >= partTop[4] && windowTop < partTop[5]){
			partNum=4;
			$(".nav04").addClass("current");
		}else if(windowTop >= partTop[5] && windowTop < partTop[6]){
			partNum=5;
			$(".nav05").addClass("current");
		}
		if($(document).scrollTop()>=($(document).height()-$(window).height())){
			//console.log('到了底部');
			partNum=5;
			$(".right-nav ul li").removeClass("current");
			$(".nav05").addClass("current");
		}else{
			//console.log('滑动中');	
		}
	});

	var _startX = 0,_startY = 0,_moveX = 0,_moveY = 0,index = 1,marX = 0,marY = 0,_flagY = 0;
		var $len = $('.pages').length;	
		$(window)[0].addEventListener('touchstart',function(event){
			_startX = event.touches[0].clientX;
			_startY = event.touches[0].clientY;
			_flagX = _startX;
			_flagY = _startY;
		})
		$(window)[0].addEventListener('touchmove',function(event){
			event.preventDefault();
			_moveY = event.touches[0].clientY;
			var cha = _moveY - _startY;
			var curY = marY + cha;
			_flagX = _moveX;
			_flagY = _moveY;
		})
		$(window)[0].addEventListener('touchend',function(event){
			var cha = _moveY - _startY;
			var dis = Math.abs(cha);
			if(Math.abs(_flagY- _startY)>=10){
				if(cha<0){
					//向下滑动
					console.log('down');
					scroll_down();
				}else{
					//向上滑动
					console.log('up');
					scroll_up();
				}
			}
			return false
		})	
})