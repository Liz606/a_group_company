$.fn.initLizSlider=function(W) {
    var _super=this
    var logoLeft=$('.logoLeft');
    var logoRight=$('.logoRight');
    var menu=$('.menu');
    var timer;
    var sliderWidth=parseInt(W/4);
    var p=1;//错位个数
    var start={},
        current={};
     _super.animated = false;
     _super.slidstate=true;
     _super.autoState=true;//滚动方向控制器
     _super._const=$(_super).children().length;
     _super._index = 0; //记录点击
     _super.dg_nextArr=$(_super).parent().children().filter('.dg-nextArr');
     _super.dg_prevArr=$(_super).parent().children().filter('.dg-prevArr');
     _super.dg_nextArr1=$(_super).parent().parent().children().filter('.blackMaskAll').children().filter('.dg-nextArr');
     _super.dg_prevArr1=$(_super).parent().parent().children().filter('.blackMaskAll').children().filter('.dg-prevArr');

     _super.Children = $(_super).children();

        init();
    function init(){
        //动态设置滚动元素的宽度，left和index编号
        $.each(_super.Children,function(i){
             $(this).attr({'width':(sliderWidth + 'px'),'index':(i)});
             $(this).css('left',($(this).attr('index'))*sliderWidth + 'px');
             $(this).attr({'index':i});
            
            $(this).click(function(){
                if ($(this).attr('index')==0) {
                    _super.dg_prevArr1.removeClass('disable');
                    _super.dg_nextArr1.addClass('disable');
                }else if ($(this).attr('index')==_super.Children.length-1) {
                    _super.dg_nextArr1.removeClass('disable');
                    _super.dg_prevArr1.addClass('disable');
                }else{
                    _super.dg_nextArr1.removeClass('disable');
                    _super.dg_prevArr1.removeClass('disable');
                }

                $('#blackMaskAll').LizToggleOne('none','block');
                $(this).addClass('currtBigLook');
                $('#lookOnly').LizToggleOne('block','none');
                $('#loadLook').LizToggleOne('none','block');
                var thisSrc=$(this).attr('data-bigurl');
                var lookOnly=new Image();
                 lookOnly.src=thisSrc;
                 lookOnly.onload = function (){
                     $('#loadLook').LizToggleOne('block','none');
                     $('#lookOnly').attr('src',thisSrc);
                     $('#lookOnly').LizToggleOne('none','block');
                 };
                _super.animated=false;
                _super.slidstate=false;
                logoLeft.LizToggleOne('block','none');
                logoRight.LizToggleOne('block','none');
                menu.LizToggleOne('block','none');
                maskBool = true;
            });
        })
    
        _super.on('touchstart','',pageStart);
        _super.on('touchmove','',pageMove);
        _super.on('touchend','',pageEnd);

        _super.bind('runstate','',runState);   
        _super.bind('stopstate','',stopState); 
        _super.bind('resetarr','',resetArr); 

        _super.dg_nextArr.on('click','',nextClick);
        _super.dg_prevArr.on('click','',prevClick);
        _super.dg_nextArr1.on('click','',nextClick);
        _super.dg_prevArr1.on('click','',prevClick);
        autoPlay(sliderWidth);
    }
      
    function resetArr() {
         if (_super.Children.eq(0).css('left')=='0px') {
            _super.dg_prevArr.removeClass('disable');
            _super.dg_nextArr.addClass('disable');
        }else if (_super.Children.eq(_super.Children.length-4).css('left')=='0px') {
            _super.dg_nextArr.removeClass('disable');
            _super.dg_prevArr.addClass('disable');
        }else{
            _super.dg_nextArr.removeClass('disable');
            _super.dg_prevArr.removeClass('disable');
        }
    };  
    function runState() {
        _super.animated=false;
        _super.slidstate=true;
    };
    function stopState() {
        _super.animated=true;
        _super.slidstate=false;
    };
    function nextClick(num){
        if ($('#blackMaskAll').hasClass('block')) {
            _super.slidstate=false;
        };
        if (!_super.animated&&_super.slidstate) {
           Arrow_l(sliderWidth);
        }else if (!_super.animated&&!_super.slidstate) {
            //console.log('helloprv');
            _super.slidstate=true;
            if (Arrow_l(sliderWidth)) {
                var prv=_super.Children.filter('.currtBigLook');
                if (prv.length==0) {return};
                    prv.removeClass('currtBigLook');
                var now=prv.prev();
                var thisSrc=now.attr('data-bigurl');
                now.addClass('currtBigLook');
                $('#lookOnly').LizToggleOne('block','none');
                 $('#loadLook').LizToggleOne('none','block');
                var lookOnly=new Image();
                 lookOnly.src=thisSrc;
                 lookOnly.onload = function (){
                     $('#loadLook').LizToggleOne('block','none');
                     $('#lookOnly').attr('src',thisSrc);
                     $('#lookOnly').LizToggleOne('none','block');
                 };
            }else if (_super.Children.eq(0).css('left')=='0px') {
                if (_super.Children.filter('.currtBigLook').attr('index')==0) {
                    _super.dg_nextArr1.addClass('disable');
                    _super.slidstate=false;return};
                var prv=_super.Children.filter('.currtBigLook');
                if (prv.length==0) {return};
                    prv.removeClass('currtBigLook');
                var now=prv.prev();
                now.addClass('currtBigLook');
                if (now.attr('index')==0) {
                   // prv.addClass('currtBigLook');
                    _super.dg_nextArr1.addClass('disable');
                };
                var thisSrc=now.attr('data-bigurl');
                $('#lookOnly').LizToggleOne('block','none');
                $('#loadLook').LizToggleOne('none','block');
                var lookOnly=new Image();
                 lookOnly.src=thisSrc;
                 lookOnly.onload = function (){
                     $('#loadLook').LizToggleOne('block','none');
                     $('#lookOnly').attr('src',thisSrc);
                     $('#lookOnly').LizToggleOne('none','block');
                 };
            }
            _super.slidstate=false;
        };

        _super.dg_prevArr.removeClass('disable');
        _super.dg_prevArr1.removeClass('disable');

    }
    function prevClick(num){
        if ($('#blackMaskAll').hasClass('block')) {
            _super.slidstate=false;
        };
        if (!_super.animated&&_super.slidstate) {
           Arrow_r(sliderWidth);
        }else if (!_super.animated&&!_super.slidstate) {
                _super.slidstate=true;
                if (Arrow_r(sliderWidth)) {
                    //console.log('hellonext');
                    var nex=_super.Children.filter('.currtBigLook');
                    if (nex.length==0) {return};
                        nex.removeClass('currtBigLook');
                    var now=nex.next();
                    now.addClass('currtBigLook');
                     var thisSrc=now.attr('data-bigurl');
                     $('#lookOnly').LizToggleOne('block','none');
                      $('#loadLook').LizToggleOne('none','block');
                    var lookOnly=new Image();
                     lookOnly.src=thisSrc;
                     lookOnly.onload = function (){
                         $('#loadLook').LizToggleOne('block','none');
                         $('#lookOnly').attr('src',thisSrc);
                         $('#lookOnly').LizToggleOne('none','block');
                     };
                }else if(_super.Children.eq(_super.Children.length-4).css('left')=='0px') {
                    //console.log('hellonext222');
                    if (_super.Children.filter('.currtBigLook').attr('index')==_super._const-1) {
                        _super.dg_prevArr1.addClass('disable');
                        _super.slidstate=false;return};
                    var nex=_super.Children.filter('.currtBigLook');
                        if (nex.length==0) {return};
                        nex.removeClass('currtBigLook');
                    var now=nex.next();
                    now.addClass('currtBigLook');
                     if (now.attr('index')==_super._const-1) {
                        //nex.addClass('currtBigLook');
                        _super.dg_prevArr1.addClass('disable');
                    };
                    var thisSrc=now.attr('data-bigurl');
                     $('#lookOnly').LizToggleOne('block','none');
                    $('#loadLook').LizToggleOne('none','block');
                    var lookOnly=new Image();
                     lookOnly.src=thisSrc;
                     lookOnly.onload = function (){
                         $('#loadLook').LizToggleOne('block','none');
                         $('#lookOnly').attr('src',thisSrc);
                         $('#lookOnly').LizToggleOne('none','block');
                     };
                }
                _super.slidstate=false;
            };
            _super.dg_nextArr.removeClass('disable');
            _super.dg_nextArr1.removeClass('disable');
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
      //  //console.log('向左滚动一页');
        if (_super.Children.eq(_super.Children.length-4).css('left')=='0px') {
            _super.autoState=false;
            return false;
        };
        if (_super.slidstate) {
            if (!_super.animated) {
                 _super._index++;
               if(_super._index==_super._const){
                    _super._index=0;
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
      //  //console.log('向右滚动一页');
        if (_super.Children.eq(0).css('left')=='0px') {
            _super.autoState=true;
            return false;
        };    
        if (_super.slidstate) {
            if (!_super.animated) {
                 _super._index--;
                if (_super._index==-1) {
                    _super._index=_super._const-1;
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
                 if (_super.autoState) {
                    Arrow_r(sw);
                }else{
                    Arrow_l(sw);
                }  
            }, 5000)
    }
    //停止自动滚动
    function stopAuto() {
        clearInterval(timer)
    }
    //滚动函数
    function animate(wid) {//wid是绝对偏移量，带符号
        _super.animated=true;
        stopAuto();
        if (wid == 0) {
            return
        };
        var time =sliderWidth/1000;//滚动时间
        var left; //目的偏移量
        var leftCorrt;//当前偏移量
        var stat=0;//记录动画次数

         
        $.each(_super.Children,function () {        
            leftCorrt=parseInt(this.style.left);
            left = leftCorrt + wid;
            if ($(this).attr('index')==_super.Children.eq(_super.Children.length-4).attr('index')&&left==0) {
                _super.dg_prevArr.addClass('disable');
            }else  if ($(this).attr('index')==_super.Children.eq(0).attr('index')&&left==0) {
                _super.dg_nextArr.addClass('disable');
            };  
            //移动
            $(this).animate({left:left},{quequ:false,complete:function(){
                stat++;
                if (stat==_super._const) {//监听移动次数以便允许用户其他操作
                     _super.animated=false;
                     autoPlay(sliderWidth);
                    $.each(_super.Children,function () {  $(this).css('z-index','0'); });
                    };
                }}

            );
        });
    }
}