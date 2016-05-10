(function($) {
	divselect("#divselect1","#divselect2","#divselect3");
	function divselect(divselectid1,divselectid2,divselectid3) {
			var divSelects=[];
			var logoLeft=$('.logoLeft');
		    var logoRight=$('.logoRight');
		    var menu=$('.menu');
			for (var i = 0; i < arguments.length; i++) {
				divSelects.push($(arguments[i]+' cite'));
			};			
			$.each(divSelects,function() {
				var $this=$(this);
				$this.click(function() {
						var cite=$this.attr('selectid');
						var ul=$this.parent().children().filter(function() {
								return $(this).attr('selectUlId')==cite.substring(0,cite.length-2);
							});
					if(ul.css("display")=="none"){
							ul.removeClass('none').addClass('block');
						}else{
							ul.removeClass('block').addClass('none');
						}
					})
			var selectA=$this.parent().children().filter('ul').children().children();
			$.each(selectA,function() {
				var $that=$(this);
				$that.click(function(){

					var cite=$that.attr('selectid');//记录选中a的id ---1-2
					var value=$this.attr('selectid');//已经存在的id ---1-3
					if (cite==value) {
						$this.parent().children('ul').removeClass('block').addClass('none');
					}else{
						var text=$that.text();
						$this.html(text).attr('selectid',cite);//更新cite
						$this.parent().children('ul').removeClass('block').addClass('none');//收起下拉框
						var citeArr=cite.split('-');// 1 ， 2
						setA(citeArr);
						var thatNum=$this.parent().attr('id');
						//显示···
						if ($("."+citeArr.join('-')).length>0 && thatNum.substring(thatNum.length-1)==3) {
							$("."+citeArr.join('-')).removeClass('none').addClass('block').addClass('roll-f2');
							$('.store1').addClass('none').removeClass('block');
							$('#storeHome>.home').trigger('3Drunstate');
							$('.storeList').removeClass('block').addClass('none');
							$('.storeClose').unbind( "click" );
							logoLeft.removeClass('block').addClass('none');
							logoRight.removeClass('block').addClass('none');
							menu.removeClass('block').addClass('none');
							$('.storeClose').click(function(){
									$('.store1').addClass('block').removeClass('none');
							        $("."+citeArr.join('-')).removeClass('block').removeClass('roll-f2').addClass('roll-f').addClass('none');
							        $('.storeList').removeClass('none');
							        $('#storeHome>.home').trigger('3Dstopstate');
							        logoLeft.removeClass('none').addClass('block');
									logoRight.removeClass('none').addClass('block');
									menu.removeClass('none').addClass('block');
							    })
						};
						function setA(arrfouse) {
							console.log(divSelects.length);
							if (citeArr.length<=divSelects.length) {
								for (var i = citeArr.length - 1; i > citeArr.length - 2; i--) {
									var atext = divSelects[i].parent()
															.children('ul')
															.filter(function() {
																return $(this).attr('selectUlId')==citeArr.join('-');
															}).children()
															.eq(0)
															.children()
															.text();
									citeArr.push('1');
									divSelects[i].html(atext).attr('selectid',citeArr.join('-'));
									setA(citeArr);
								};
							};
						};
					}
					
				});
			})//each---A
	    })//each---cite
	}//function
})(jQuery)