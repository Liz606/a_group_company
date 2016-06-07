accorInit('.newsWrap');
function accorInit(_sup) {
	var sup=$(_sup);
    var W=$(window).width();
	var children=sup.children().filter('.new');
	var dg_nextArr=sup.parent().children().filter('.dg-nextArr');
	var dg_prevArr=sup.parent().children().filter('.dg-prevArr');
	var dg_nextArrOn=sup.parent().children().filter('#blackMaskNew').children().filter('.dg-nextArr');
	var dg_prevArrOn=sup.parent().children().filter('#blackMaskNew').children().filter('.dg-prevArr');
	$.each(children,function() {
		$(this).click(function() {
		//如果已经大图，直接显示遮罩，否则要移动、显示大图、显示遮罩
			if ($(this).hasClass('newOpen')) {
				 $('#blackMaskNew').LizToggleOne('none','block');
				newsGetFile($(this));
			}else{
				changeOpen($(this));
				 $('#blackMaskNew').LizToggleOne('none','block');
				newsGetFile($(this));
			}
		});
	});

	dg_prevArr.click(function() {
		arr_l();
	});
	dg_nextArr.click(function() {
		arr_r();
	});
	dg_prevArrOn.click(function() {
		arr_l();
		newsGetFile(children.filter('.newOpen'));
	});
	dg_nextArrOn.click(function() {
		arr_r();
		newsGetFile(children.filter('.newOpen'));
	});
	function arr_l() {
		//dom移动
		
		var prev=children.filter('.newOpen').removeClass('n1').addClass('n2');
		if (prev.attr('index')==1) {
			now=children.eq(children.length-1);
			toggleStyle(prev,now);
			now.addClass('n1').LizToggleOne('hidden','visible');
			prev.next().removeClass('n2').addClass('n3');
			prev.next().next().removeClass('n3').LizToggleOne('visible','hidden');
		}else if (prev.attr('index')==children.length) {
			now=prev.prev();
			now.addClass('n1').LizToggleOne('hidden','visible');
			toggleStyle(prev,now);
			children.eq(0).removeClass('n2').addClass('n3');
			children.eq(1).removeClass('n3').LizToggleOne('visible','hidden');
		}else if (prev.attr('index')==children.length-1) {
			now=prev.prev();
			now.addClass('n1').LizToggleOne('hidden','visible');
			toggleStyle(prev,now);
			prev.next().removeClass('n2').addClass('n3');
			children.eq(0).removeClass('n3').LizToggleOne('visible','hidden');
		}else{
			prev.next().removeClass('n2').addClass('n3');
			prev.next().next().removeClass('n3').LizToggleOne('visible','hidden');
			var now=prev.prev();
			now.addClass('n1').LizToggleOne('hidden','visible');
			toggleStyle(prev,now);
		}
	
	};
	function arr_r() {
		//dom移动
			var prev=children.filter('.newOpen');
			prev.removeClass('n1').LizToggleOne('visible','hidden');
		if (prev.attr('index')==children.length-2) {
			now=prev.next();
			now.addClass('n1');
			toggleStyle(prev,now);
			now.next().removeClass('n3').addClass('n2');
			children.eq(0).addClass('n3').LizToggleOne('hidden','visible');
		}else if (prev.attr('index')==children.length) {
			now=children.eq(0);
			now.removeClass('n2').addClass('n1');
			now.next().removeClass('n3').addClass('n2');
			toggleStyle(prev,now);
			children.eq(2).addClass('n3').LizToggleOne('hidden','visible');
		}else if (prev.attr('index')==children.length-1) {
			now=prev.next();
			now.addClass('n1');
			toggleStyle(prev,now);
			children.eq(0).removeClass('n3').addClass('n2');
			children.eq(1).addClass('n3').LizToggleOne('hidden','visible');
		}else{
			var now=prev.next();
			now.removeClass('n2').addClass('n1');
			now.next().removeClass('n3').addClass('n2');
			now.next().next().addClass('n3').LizToggleOne('hidden','visible');
			toggleStyle(prev,now);
		}
	};
	//异步得到详情数据
	function newsGetFile($this) {
		//清除数据；
		//获取数据；
		//插入数据；
		 $('#lookOnlyNew>.newTitleOpen').text();
		 $('#lookOnlyNew>.newDataOpen').text();
		 $('#lookOnlyNew>.boxScorll').children().remove();
		 $('#lookOnlyNew').next().text();
		    $.ajax({
		       type: "GET",
		       url: $this.data("url"),
		       dataType: "json",
		       success: function(data){
		         console.log( "Data Saved: " + data);
		 			$('#lookOnlyNew>.newTitleOpen').text(data.title);
		 			$('#lookOnlyNew').next().text(data.title);
		            $('#lookOnlyNew>.newDataOpen').text(data.date);
		            $('#lookOnlyNew>.boxScorll').html(unescape(data.content));
		           },
		           err:function() {
		                console.log( "出错啦~~~~" );
		           }
		       })
	};
	//改变样式
	function toggleStyle(prev,now) {
		var prevC=prev.children();
		var prevLC=prevC.eq(1).children();
		var nowC=now.children();
		var nowLC=nowC.eq(1).children();
		prev.removeClass('newOpen');
		prevC.eq(0).LizToggleOne('newImgOpen','newImg');
		prevC.eq(1).LizToggleOne('newTextOpen','newText');
		prevLC.eq(0).LizToggleOne('newTitleOpen','newTitle');
		prevLC.eq(1).LizToggleOne('newDateOpen','newDate');
		prevLC.eq(2).LizToggleOne('block','none');

		now.addClass('newOpen');
		nowC.eq(0).LizToggleOne('newImg','newImgOpen');
		nowC.eq(1).LizToggleOne('newText','newTextOpen');
		nowLC.eq(0).LizToggleOne('newTitle','newTitleOpen');
		nowLC.eq(1).LizToggleOne('newDate','newDateOpen');
		nowLC.eq(2).LizToggleOne('none','block'); 
	};
	//直接点击小图产生的dom移动
	function changeOpen(obj) {
		 var _prev=children.filter('.newOpen');
		 var _now=obj;
		 var _prevIndex=parseInt(_prev.attr('index'));
		 var _nowIndex=parseInt(_now.attr('index'));
		 if (_nowIndex-_prevIndex==1) {
		 	arr_r();
		 }else if (_nowIndex-_prevIndex==2) {
		 	arr_r();
		 	arr_r();
		 }else if (_nowIndex-_prevIndex==0) {
		 	return;
		 }
	};
	//关闭详情页
	$('#maskXNew').click(function() {
		$('#blackMaskNew').LizToggleOne('block','none');
	});
	//拓展$.prototype
	$.fn.extend({
		LizToggleOne:function(str1,str2) {
			if ($(this).hasClass(str1)) {
				$(this).removeClass(str1).addClass(str2);
			}
		}
	});
}