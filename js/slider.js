 function init (_super,W) {
	var animated = false;
    var slidstate=true;
	var timer;
    var _const=$(_super).children().length;
    var point=4;
	var index = 0; //记录点击
    var dg_nextArr=$(_super).parent().children().filter('.dg-nextArr');
    var dg_prevArr=$(_super).parent().children().filter('.dg-prevArr');
    var dg_nextArr1=$(_super).parent().parent().children().filter('.blackMaskAll').children().filter('.dg-nextArr');
    var dg_prevArr1=$(_super).parent().parent().children().filter('.blackMaskAll').children().filter('.dg-prevArr');
	var sliderWidth=parseInt(W/4);
    //将轮播图最后一个移动到第一个
    var superlast=$(_super).children().last().clone().remove();
    $(_super).children().last().remove();
    $(_super).prepend(superlast);

	var Children = $(_super).children();
    var p=1;//错位个数
	var start={},
		current={};
    //动态设置滚动元素的宽度，left和index编号
    $.each(Children,function(i){
         $(this).attr({'width':(sliderWidth + 'px'),'index':(i)});
         $(this).css('left',($(this).attr('index')-1)*sliderWidth + 'px');
         $(this).attr({'index':i});
         if (i==0) {
           $(this).attr('index',_const); 
         };
        //$(this).html($(this).attr('index'));//输出当前页号
        $(this).click(function(){
            $('#blackMaskAll').removeClass('none').addClass('block');
            $(this).addClass('currtBigLook');
            var thisSrc=$(this).css('background-image');
            $('#lookOnly').css('background-image',thisSrc);
            animated=false;
            slidstate=false;
        });
    })
	
    $(_super).on('touchstart','',pageStart);
    $(_super).on('touchmove','',pageMove);
    $(_super).on('touchend','',pageEnd);
    $(_super).bind('runstate','',runState);   
    $(_super).bind('stopstate','',stopState); 

    //$(_super).on('click','',nextClick);  
    dg_nextArr.on('click','',nextClick);
    dg_prevArr.on('click','',prevClick);
    
    dg_nextArr1.on('click','',nextClick);
    dg_prevArr1.on('click','',prevClick);
    autoPlay(sliderWidth);
    function runState() {
        animated=false;
        slidstate=true;
    };
    function stopState() {
        animated=true;
        slidstate=false;
    };
    function nextClick(num){
        if ($('#blackMaskAll').hasClass('block')) {
            slidstate=false;
        };
        if (!animated&&slidstate) {
           Arrow_l(sliderWidth);
        }else if (!animated&&!slidstate) {
            console.log('helloprv');
            slidstate=true;
            if (Arrow_l(sliderWidth)) {
            var prv=Children.filter('.currtBigLook').removeClass('currtBigLook');
            var now=null;
            if (prv.attr('index')==_const) {
                now=Children.last();
            }else{
                now=prv.prev();
            }
            var thisSrc=now.css('background-image');
            now.addClass('currtBigLook');
            $('#lookOnly').css('background-image',thisSrc);
            }
            slidstate=false;
            
            
        };
    }
    function prevClick(num){
        if ($('#blackMaskAll').hasClass('block')) {
            slidstate=false;
        };
        if (!animated&&slidstate) {
           Arrow_r(sliderWidth);
        }else if (!animated&&!slidstate) {
            slidstate=true;
            if (Arrow_r(sliderWidth)) {
            console.log('hellonext');
            var nex=Children.filter('.currtBigLook').removeClass('currtBigLook');
            var now=null;
            if (nex.attr('index')==1) {
                now=Children.first();
            }else{
                now=nex.next();
            }
            var thisSrc=now.css('background-image');
            now.addClass('currtBigLook');
            $('#lookOnly').css('background-image',thisSrc);
            };
            slidstate=false;
            };
    }
    //pageMove
    function pageMove(e){
        //e.preventDefault();
    }
    //pageStart
    function pageStart(e){
        if(start.active) return;
        if( e.originalEvent.touches.length < 2 ) {
          start.x = e.originalEvent.touches[0].pageX;
          start.when = new Date().getTime();
          start.active = true;
        }
    }
    //pageEnd
    function pageEnd(e){
        current.x = e.originalEvent.changedTouches[0].pageX;       
        start.active = false;   
        if(isSwipe(e) ){
                 if(current.x-start.x<0){
                        Arrow_r(sliderWidth);
                      }else{
                        Arrow_l(sliderWidth);                
                    }
            }   
    }
    //是否到达滑动的条件
    function isSwipe(e) {
        var duration = new Date().getTime()-start.when;
        var xdist;
            xdist    = current.x - start.x;
        return duration < 500 && 100 < Math.abs( xdist );
    }   
    //向左滚动一页
    function Arrow_r(sw) {
    if (slidstate) {
        if (!animated) {
             index++;
           if(index==_const){
                index=0;
            }
            animate(-sw);
            return true;
         }else{
            return false;
         }
        }
    }
    //向右滚动一页
    function Arrow_l(sw) {
    if (slidstate) {
        if (!animated) {
             index--;
            if (index==-1) {
                index=_const-1;
            }
            animate(sw);
            return true;
         }else{
            return false;
         }
        }
    }
    //自动向左滚动
    function autoPlay(sw) {
            timer = setInterval(function() {
                Arrow_r(sw);
            }, 5000)
    }
    //停止自动滚动
    function stopAuto() {
        clearInterval(timer)
    }
    //滚动函数
    function animate(wid) {//wid是绝对偏移量，带符号
        animated=true;
        stopAuto();
        if (wid == 0) {
            return
        };
        var time =sliderWidth/1000;//滚动时间
        var left; //目的偏移量
        var leftCorrt;//当前偏移量
        var stat=0;//记录动画次数

         
        $.each(Children,function () {        
            leftCorrt=parseInt(this.style.left);
            left = leftCorrt + wid;
            if (wid>0) {
                if (left>(_const-(p+1))*sliderWidth) {
                    left=wid+leftCorrt-(_const)*sliderWidth;
                    $(this).css('z-index','-888');
                }
           }else{
                if (left<-(_const-(point+1))*sliderWidth) {
                    left=wid+leftCorrt+(_const)*sliderWidth;
                    $(this).css('z-index','-888');
                }
           }
            //移动
            $(this).animate({left:left},{quequ:false,complete:function(){
                stat++;
                if (stat==_const) {//监听移动次数以便允许用户其他操作
                     animated=false;
                     autoPlay(sliderWidth);
                    $.each(Children,function () {  $(this).css('z-index','0'); });
                    };
                }}

            );
        });
    }
}