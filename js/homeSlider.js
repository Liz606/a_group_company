full3DSlider('#home>.box-cont>.slider-nu>li','#home>.box-cont>.home',"#home>.box-cont>.slider-an",true,true,'');

function full3DSlider(sliderBtn,sliderImg,sliderAn,anim,Auto,Arrs){
console.log(sliderImg);
	 var sliderBtn=$(sliderBtn);
	 var sliderImg=$(sliderImg);
	 var imgLength=sliderImg.length;
	 var showPrev,showNow;
	 var sliderAn=$(sliderAn);
	 var timer;
	 var animated=anim;
	 var auto=Auto;
	 if (Arrs.length>0) {
	 		Arrs=$(Arrs);
	 	 	var ArrsPrev=Arrs.filter('.storePrev');
		 	var ArrsNext=Arrs.filter('.storeNext');
		 	ArrsPrev.click(function() {
			Arrow_r();
			})
			ArrsNext.click(function() {
				Arrow_l();
			})
	 };
	sliderImg.bind('3Drunstate','',function() {
		animated=true;
	}); 
	sliderImg.bind('3Dstopstate','',function() {
		animated=false;
	});      
	 //焦点
	$.each(sliderBtn,function() {
		$(this).click(function() {
			if (animated) {
				animated=false;
				sliderBtn.removeClass('selected');
				$(this).addClass('selected');
				showPrev = sliderImg.filter('.block').attr('index');
				showNow=$(this).attr('index');
				if (showPrev==showNow) {return;};
				show3D(showNow,showPrev);
			}
		})
	})
	
if (auto) {
	autoPlay()
};
	//自动向左滚动
	function autoPlay() {
       		timer = setInterval(function() {
            if (animated) {Arrow_r();};
        }, 5000)
	}
	//停止自动滚动
	function stopAuto() {
	    clearInterval(timer)
	}
	function Arrow_r() {
		if (animated) {
			animated=false;
			showPrev = sliderImg.filter('.block').attr('index');
			showNow=showNowAdd(showPrev);
			show3D(showNow,showPrev);
			sliderBtn.removeClass('selected');
			sliderBtn.eq(showNow).addClass('selected');
		};
	};
	function Arrow_l() {
		if (animated) {
			animated=false;
			showPrev = sliderImg.filter('.block').attr('index');
			showNow=showNowSub(showPrev);
			show3D(showNow,showPrev);
			sliderBtn.removeClass('selected');
			sliderBtn.eq(showNow).addClass('selected');
		};
	};
	function show3D(showNow,showPrev) {
			var html3D = '<div class="li">' +
			                    '<div class="prev">' +
			                    '<div class="prev-c">' +
			                    '</div>' +
			                    '</div>' +
			                    '<div class="next">' +
			                    '<div class="next-c">' +
			                    '</div>' +
			                    '</div>' +
			                '</div>';
			var ht = $(html3D);
			var prevH = sliderImg.eq(showPrev);
			var nowH = sliderImg.eq(showNow);
			H=prevH.height();
			W=prevH.width();
			ht.find(".prev-c").html(prevH.html()).width(W).height(H);
		    ht.find(".next-c").html(nowH.html()).width(W).height(H);
		    var aBool = Math.random()*10>5?true:false;
		    var iBool = true;
		     var num=Math.trunc(Math.random()*7)+1;
		    for (var i = 0; i < num; i++) {
		    	var htClone = ht.clone();
		    	if (aBool) {
		                if (iBool) {
		                    htClone.find(".prev").addClass("an-prev-t");
		                    htClone.find(".next").addClass("an-next-t");
		                    iBool = false;
		                } else {
		                    htClone.find(".prev").addClass("an-prev-t2");
		                    htClone.find(".next").addClass("an-next-t2");
		                    iBool = true;
		                }
		            } else {
		                if (iBool) {
		                    htClone.find(".prev").addClass("an-prev-l");
		                    htClone.find(".next").addClass("an-next-l");
		                    iBool = false;
		                } else {
		                    htClone.find(".prev").addClass("an-prev-l2");
		                    htClone.find(".next").addClass("an-next-l2");
		                    iBool = true;
		                }
		            }
		        
		        if (aBool) {
		                htClone.height(100 / num + "%");
		        		htClone.find(".prev-c,.next-c").css("top", -100 * i + "%");
		            } else {
		                htClone.width(100 / num + "%");
		                htClone.find(".prev-c,.next-c").css("left", -100 * i + "%");
		            }
		        sliderAn.append(htClone)
		    }
		    sliderImg.removeClass('block').addClass('none');
			sliderAn.show();
			setTimeout(function () {
	            sliderImg.eq(showNow).removeClass('none').addClass('block');
	            stop3D();
	            animated=true;
	        }, 1000)
	};
	function stop3D() {
		sliderAn.html('').hide();
	};
	function showNowAdd(showPrev) {
	    showNow = showPrev;
	    if (showNow < (imgLength - 1)) {
	        showNow++;
	    } else {
	        showNow = 0;
	    }
	    return showNow;
	}
	function showNowSub() {
	   showNow = showPrev;

	    if (showNow > 0) {
	        showNow--;
	    } else {
	        showNow = imgLength - 1;
	    }
	     return showNow;
	}
}