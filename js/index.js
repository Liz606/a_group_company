//页面加载完之后执行
jQuery(function($) {
    
    var T,H,W;
    var runningBox='#sliderBox1_1';
    /*load进入主页*/
    $('.loadEnter')
    .click(function(){
        $('#container').removeClass('none').addClass('block');
        $('#loading').removeClass('block').addClass('none');
        if ($('#container').css('display')=='block') {
                T=parseInt($('.textBox').css('top'));//页面显示后获取宽高
                H=parseInt($('.textBox').css('height'));
                W=$(window).width();
                lookInit();
                mousNow = 0;
            };
    })
    /*菜单展开和遮罩*/
    var menuNav=$('.menuNav');
    var menuBefore=$('.menuBefore');
    var screenH=$(window).height();
    $('section').height(screenH);
    $('.menu').click(function(){
        if (menuNav.hasClass('navshow')) {
            menuNav.removeClass('navshow block').addClass('none');
            menuBefore.removeClass('block').addClass('none');
            $('#home>.box-cont>.home').trigger('3Drunstate');
            $('#storeHome>.home').trigger('3Drunstate');
            $(runningBox).trigger('runstate');
            maskBool = false;
        }else{
            menuNav.removeClass('none').addClass('navshow block');
            menuBefore.removeClass('none').addClass('block');
            $('#home>.box-cont>.home').trigger('3Dstopstate');
            $('#storeHome>.home').trigger('3Dstopstate');
            $(runningBox).trigger('stopstate');
            maskBool = true;
        }
    });
    $('.Close').click(function(){
        console.log('close!!!');
        menuNav.removeClass('navshow block').addClass('none');
        menuBefore.removeClass('block').addClass('none');
        $('#home>.box-cont>.home').trigger('3Drunstate');
        $('#storeHome>.home').trigger('3Drunstate');
        $(runningBox).trigger('runstate');
        maskBool = false;
    })
    var navList=$('.navBox .nav li a');
    //导航到指定位置
    $.each(navList,function() {
        var navthis=$(this);
        navthis.click(function() {
            var toId=navthis.attr('href');
            console.log();
            console.log($(window).scrollTop());
            menuNav.removeClass('navshow');
            menuBefore.removeClass('block').addClass('none');
             $("body,html").animate({ scrollTop:$(toId).offset().top}, 1000, function () {
                            $('#home>.box-cont>.home').trigger('3Drunstate');
                            $('#storeHome>.home').trigger('3Drunstate');
                            $(runningBox).trigger('runstate');
                            maskBool = false;
                        });
        })
    })
/*
 *brand slider
 */
        $('#dg-container').gallery();
            var textP=$('.textP');
            $.each(textP,function(){
                $(this).mouseover(function(){
                    mousBool=true;
                    var A=H+T;
                    var that=this;
                    $(this).scroll(function(e) {
                        var T2=parseInt($(this).parent().css('top'));
                        var H2=parseInt($(this).parent().css('height'));
                        $(this).parent().removeClass('textTop');
                        var s=$(this).scrollTop();
                        var topNew=null;
                        var heightNew=null;
                        if ((T-s)>=100) {
                            topNew=T-s+'px';
                            heightNew=A-parseInt(topNew)+'px';
                        }else{
                            topNew=T2+'px';
                            heightNew=H2+'px';
                        }
                        $(this).parent().css('top',topNew);
                        $(this).parent().css('height',heightNew);
                    });
                });
                $(this).mouseout(function(){
                    mousBool=false;
                    $(this).parent().addClass('textTop');
                })
            })
/**
 * lookbook
 */
function lookInit() {
    //初始化8个slider
    for (var i = 1; i <=2; i++) {
        for (var j = 1; j <=4; j++) {
            init('#sliderBox'+i+'_'+j,W);
            // console.log('#sliderBox'+i+'_'+j);
            $('#sliderBox'+i+'_'+j).trigger('stopstate');
        };
    };
    //自定义事件监听，运行状态
    $('#sliderBox1_1').trigger('runstate');

    var brandSelect=$('#divselect4 cite');
    
    var lookList=$('.lookList>li');
    var lookListValue=null,sliderBox=null,constIndex=null;
    var lookbookImgsList=$('.lookbookImgs');
    $.each(lookList,function(){//当looklist被点击，显示对应slider
        var that=this;
        $(that).click(function(){
            $.each(lookList,function(){
                $(this).removeClass('active');
            })
            $(that).addClass('active');

            lookListValue=$(that).attr('index');
            sliderBox=brandSelect.attr('selectid')+'_'+lookListValue; 
            runningBox='#sliderBox'+sliderBox;
            constIndex=$(runningBox).children().length;
            console.log(sliderBox,constIndex);
            $.each(lookbookImgsList,function(){
                $(this).removeClass('block').addClass('none').trigger('stopstate');
            })
            $(runningBox).removeClass('none').addClass('block').trigger('runstate');
            
        })
    })
	$("#divselect4 cite").click(function(){//当lookbook select被点击，显示 opations
		var ul = $("#divselect4 ul");
		if(ul.css("display")=="none"){
			ul.removeClass('none').addClass('block');
		}else{
			ul.removeClass('block').addClass('none');
		}

	});
	$("#divselect4 ul li a").click(function(){//当lookbook select opation被点击，显示对应slider
		var txt = $(this).text();
		$("#divselect4 cite").html(txt);
		var value = $(this).attr("selectid");
		$("#divselect4 cite").attr("selectid",value);
		$("#divselect4 ul").removeClass('block').addClass('none');
		lookListValue=lookList.filter('.active').attr('index');
        sliderBox=brandSelect.attr('selectid')+'_'+lookListValue;
        if (brandSelect.attr('selectid')==1) {
            $('.brandIcon').attr('src','images/lookbook.png');
        }else{
            $('.brandIcon').attr('src','images/product.png');
        }
        $.each(lookbookImgsList,function(){
            $(this).removeClass('block').addClass('none').trigger('stopstate');
        })
        runningBox='#sliderBox'+sliderBox;
        $(runningBox).removeClass('none').addClass('block').trigger('runstate');
	});
    //lookbook的遮罩关闭按钮
    $('#maskX').click(function(){
        nowslider=$('#slider').children().filter('.lookbookImgs').filter('.block');
        $('#slider').children().filter('.lookbookImgs').filter('.block').children().filter('.currtBigLook').removeClass('currtBigLook');
        nowslider.trigger('runstate');
        $('#blackMaskAll').removeClass('block').addClass('none');

    })
};
/**
 * Liz-scroll 
 * 
 */
$('.Liz-scroll').mouseover(function(){
     mousBool=true;
});

$('.Liz-scroll').mouseout(function(){
    mousBool=false;
});
//基于mousewheel 子元素滚动 父元素不跟随
$.fn.scrollUnique = function() {
    return $(this).each(function() {
        var eventType = 'mousewheel';
        if (document.mozHidden !== undefined) {
            eventType = 'DOMMouseScroll';
        }
        $(this).on(eventType, function(event) {
            // 一些数据
            var scrollTop = this.scrollTop,
                scrollHeight = this.scrollHeight,
                height = this.clientHeight;

            var delta = (event.originalEvent.wheelDelta) ? event.originalEvent.wheelDelta : -(event.originalEvent.detail || 0);        

            if ((delta > 0 && scrollTop <= delta) || (delta < 0 && scrollHeight - height - scrollTop <= -1 * delta)) {
                // IE浏览器下滚动会跨越边界直接影响父级滚动，因此，临界时候手动边界滚动定位
                this.scrollTop = delta > 0? 0: scrollHeight;
                // 向上滚 || 向下滚
                event.preventDefault();
            }        
        });
    }); 
};

$('.Liz-scroll').scrollUnique();
});

changeMenu('.nav li:nth-child(1)>a','首页');
changeMenu('.nav li:nth-child(2)>a','品牌');     
changeMenu('.nav li:nth-child(3)>a','产品');
changeMenu('.nav li:nth-child(4)>a','大片');
changeMenu('.nav li:nth-child(5)>a','新闻');
changeMenu('.nav li:nth-child(6)>a','视频');
changeMenu('.nav li:nth-child(7)>a','加盟');
changeMenu('.nav li:nth-child(8)>a','店铺');
changeMenu('.nav li:nth-child(9)>a','联系方式');
function changeMenu(obj,str) {
    var text=$(obj).text();
    $(obj).mouseover(function(){
        console.log('shubyiru');
        $(obj).text(str);
    });

    $(obj).mouseout(function(){
        console.log('shubyiru');
        $(obj).text(text);
    });
};