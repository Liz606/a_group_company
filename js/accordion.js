accorInit('.newsWrap');
function accorInit(_super) {
	var _super=$(_super);
	var _children=_super.children().filter('.new');
	var dg_nextArr=_super.parent().children().filter('.dg-nextArr');
	var dg_prevArr=_super.parent().children().filter('.dg-prevArr');
	var dg_nextArrOn=_super.parent().children().filter('#blackMaskNew').children().filter('.dg-nextArr');
	var dg_prevArrOn=_super.parent().children().filter('#blackMaskNew').children().filter('.dg-prevArr');
	var tempDom;
	$.each(_children,function() {
		$(this).click(function() {
			if ($(this).hasClass('newOpen')) {
				$('#blackMaskNew').removeClass('none').addClass('block');
			}else{
				$('#blackMaskNew').removeClass('none').addClass('block');
				changeOpen($(this));
			}
		});
	});

	dg_prevArr.click(function() {
		_children=_super.children().filter('.new');
		changeOpen(_children[_children.length-1]);
	});
	dg_nextArr.click(function() {
		_children=_super.children().filter('.new');
		changeOpen(_children[1]);
	});

	dg_prevArrOn.click(function() {
		_children=_super.children().filter('.new');
		_children[_children.length-1].click();
	});
	dg_nextArrOn.click(function() {
		_children=_super.children().filter('.new');
		_children[1].click();
	});
	function changeOpen($this) {
		$this=$($this);
		_super=$(_super);
		_children=_super.children().filter('.new');
		var $that=_children.filter('.newOpen');
				$that.removeClass('newOpen');
				$that.children().first().removeClass('newImgOpen').addClass('newImg');
				$that.children().last().removeClass('newTextOpen').addClass('newText');
				$that.children().last().children().eq(0).removeClass('newTitleOpen').addClass('newTitle');
				$that.children().last().children().eq(1).removeClass('newDateOpen').addClass('newDate');
				$that.children().last().children().eq(2).removeClass('block').addClass('none');
			toLast($that);
			if ($this!=_children[1]) {
				toLast($this.prev());
			};
			$this.addClass('newOpen');
			$this.children().first().removeClass('newImg').addClass('newImgOpen');
			$this.children().last().removeClass('newText').addClass('newTextOpen');
			$this.children().last().children().eq(0).removeClass('newTitle').addClass('newTitleOpen');
			$this.children().last().children().eq(1).removeClass('newDate').addClass('newDateOpen');
			$this.children().last().children().eq(2).removeClass('none').addClass('block'); 
			var title,date,content,bgurl;
			bgurl=$this.children().first().css('background-image');
			console.log(navigator.userAgent);
			var userAgent=navigator.userAgent;
			if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1) {
				bgurl=bgurl.substring(4,bgurl.length-1);
			}else if ( userAgent.indexOf("Edge") > -1) {
				bgurl=bgurl.substring(4,bgurl.length-1);
			}else if (true){
				bgurl=bgurl.substring(5,bgurl.length-2);
			};
			title=$this.children().last().children().eq(0).text();
			date=$this.children().last().children().eq(1).text();
			content=$this.children().last().children().eq(2).text();
			$('.newTitleOpen').text('').text(title);
			$('.lookTitle').text('').text(title);
			$('.newDateOpen').text('').text(date);
			$('.newContentBig').text('').text(content);
			$('.newimgBig').attr('src',bgurl);
	};
	//移动dom至末尾
	function toLast($that) {
		var tempDom=$that.clone();
			tempDom.click(function() {
				if ($(this).hasClass('newOpen')) {
					$('#blackMaskNew').removeClass('none').addClass('block');
				}else{
					$('#blackMaskNew').removeClass('none').addClass('block');
					changeOpen($(this));
				}
			});
			tempDom.appendTo(_super);	
			$that.remove();
	};
	$('#maskXNew').click(function() {
		$('#blackMaskNew').addClass('none').removeClass('block');
	});

}