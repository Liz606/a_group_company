
//页面加载完之后执行
jQuery(function($) {
    
    var T,H,W;
    var Harr=[];
    var runningBox='#sliderBox1_1';
    /*load进入主页*/
    $('.loadEnter')
    .click(function(){
        $('#container').removeClass('none').addClass('block');
        $('#loading').removeClass('block').addClass('none');
        if ($('#container').css('display')=='block') {
                 T=parseInt($('.textBox').css('top'));//页面显示后获取宽高
                 H=parseInt($('.textBox').parent().css('height'));
                 for (var i = 0; i < 3; i++) {
                     Harr[i]=parseInt($($('.textBox')[i]).outerHeight());
                     if (Harr[i]>H-104) {
                        Harr[i]=H-104;
                     };
                 };
                var textB=$('.textBox');
                 for (var i = 0; i < textB.length; i++) {
                     $(textB[i]).css('bottom',-Harr[i]+"px");
                     $(textB[i]).css('height',Harr[i]+"px");
                 };
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
            $('#slider').children('ul').trigger('runstate');
            maskBool = false;
        }else{
            menuNav.removeClass('none').addClass('navshow block');
            menuBefore.removeClass('none').addClass('block');
            $('#home>.box-cont>.home').trigger('3Dstopstate');
            $('#storeHome>.home').trigger('3Dstopstate');
            $('#slider').children('ul').trigger('stopstate');
            maskBool = true;
        }
    });
    $('.Close').click(function(){
        console.log('close!!!');
        menuNav.removeClass('navshow block').addClass('none');
        menuBefore.removeClass('block').addClass('none');
        $('#home>.box-cont>.home').trigger('3Drunstate');
        $('#storeHome>.home').trigger('3Drunstate');
        $('#slider').children('ul').trigger('runstate');
        maskBool = false;
    })
    var navList=$('.navBox .nav li a');
    //导航到指定位置
    $.each(navList,function() {
        var navthis=$(this);
        navthis.click(function() {
            var toId=navthis.attr('href');
            menuNav.removeClass('navshow');
            menuBefore.removeClass('block').addClass('none');
            if (toId=='#product') {
                toId='#lookbook';
                $('#divselect4 ul li a').eq(1).click();
            };
             $("body,html").animate({ scrollTop:$(toId).offset().top}, 1000, function () {
                            $('#home>.box-cont>.home').trigger('3Drunstate');
                            $('#storeHome>.home').trigger('3Drunstate');
                            $('#slider').children('ul').trigger('runstate');
                            maskBool = false;
                        });
        })
    })
    var homea=$('.homeBtn>p>a');
    $.each(homea,function() {
         $(this).click(function() {
            $("body,html").animate({ scrollTop:$('#lookbook').offset().top}, 1000);
         })
    })
/*
 *brand slider
 */
        $('#dg-container').gallery();
            var textP=$('.textP');
/**
 * lookbook
 */

function lookInit() {
    //自定义事件监听，运行状态
    init($('#sliderBox1_1'),W);

    var brandSelect=$('#divselect4 cite');
    
    var lookList=$('.lookList>li');
    var lookListValue=null,sliderBox=null,constIndex=null;
    var lookbookImgsList=$('.lookbookImgs');
    $.each(lookList,function(){//当looklist被点击，显示对应slider
        var that=this;
        $(that).click(function(){
            console.log('ajax'+$(that));
           
            $.each(lookList,function(){
                $(this).removeClass('active');
            })
            $(that).addClass('active');

            lookListValue=$(that).attr('index');
            sliderBox=brandSelect.attr('selectid')+'_'+lookListValue; 
            runningBox='#sliderBox'+sliderBox;
            constIndex=$(runningBox).children().length;
            console.log(sliderBox,constIndex);
             lookGetFile(runningBox);

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
        
        lookGetFile(runningBox);
        $(runningBox).removeClass('none').addClass('block').trigger('runstate');
    });

    for (var i = 1; i < 5; i++) {
        $('#divselect'+i+' ul').mouseleave(function(){
            $(this).removeClass('block').addClass('none')
        });
    };

   
    //lookbook的遮罩关闭按钮
    $('#maskX').click(function(){
        nowslider=$('#slider').children().filter('.lookbookImgs').filter('.block');
        $('#slider').children().filter('.lookbookImgs').filter('.block').children().filter('.currtBigLook').removeClass('currtBigLook');
        nowslider.trigger('runstate');
        $('#blackMaskAll').removeClass('block').addClass('none');
        logoLeft.removeClass('none').addClass('block');
        logoRight.removeClass('none').addClass('block');
        menu.removeClass('none').addClass('block');
        maskBool = false;
    })
    //异步请求关键代码
    function lookGetFile(runningBox){
        if ($(runningBox).children().length<=0) {
                 $.ajax({
                   type: "GET",
                   url: $(runningBox).data('url'),
                   dataType: "json",
                   success: function(date){
                     console.log( "Data Saved: " + date);
                     var small=date.small;
                     var big=date.big;
                         for (var i = 0,len = small.length; i < len; i++) {
                             $('<li>').css('background-image','url('+small[i]+')')
                             .addClass('lookbookImg')
                             .attr('data-bigurl',big[i])
                             .appendTo($(runningBox));
                        };
                        init($(runningBox),W);
                       },
                       err:function() {
                            console.log( "出错啦~~~~" );
                       }
                   })
            }
    }
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


var navListText=['首页','品牌','产品','大片','新闻','视频','加盟','店铺','联系方式'];
var navA=$('.nav li a');
for (var i = 0 ,len=navListText.length; i < len; i++) {
    changeMenu(navA[i],navListText[i]);
};
function changeMenu(obj,str) {
    var text=$(obj).text();
    $(obj).mouseover(function(){
        $(obj).text(str);
    });
    $(obj).mouseout(function(){
        $(obj).text(text);
    });
};
var logoLeft=$('.logoLeft');
var logoRight=$('.logoRight');
var menu=$('.menu');

$('#divselect3>ul>li>a').click(function(){
    var realUrl=$(this).data('url');
    $('#divselect3').children('cite').attr('data-url',realUrl);//设置文件路径
     $('#storeHome>.slider-nu>.storeName').text($('#divselect3').children('cite').text());
    // 异步加载并初始化
    $('.store1').addClass('none').removeClass('block');//隐藏store图标
    $("#storeHome").removeClass('none').addClass('block').addClass('roll-f2');//展示页进入
    storeGetFile();

    $('.storeList').removeClass('block').addClass('none');
    $('.storeClose').removeClass('none').addClass('block');
    logoLeft.removeClass('block').addClass('none');
    logoRight.removeClass('block').addClass('none');
    menu.removeClass('block').addClass('none');
 });   
//清空并重现入口
$('.storeClose').click(function(){
    $(this).removeClass('block').addClass('none');
        $('.store1').addClass('block').removeClass('none');
       $("#storeHome").removeClass('block').removeClass('roll-f2').addClass('roll-f').addClass('none');
        $('.storeList').removeClass('none');
       $('#storeHome').children('.home').remove();
        logoLeft.removeClass('none').addClass('block');
        logoRight.removeClass('none').addClass('block');
        menu.removeClass('none').addClass('block');
        $('#divselect3').children('cite').attr('data-url','');
    });

 //异步请求关键代码
function storeGetFile(){
    $('#storeHome').children('.home').remove();
    $.ajax({
       type: "GET",
       url: $('#divselect3').children('cite').attr('data-url'),
       dataType: "json",
       success: function(date){
         console.log( "Data Saved: " + date);
             for (var len = date.length-1, i = len; i >=0 ; i--) {
                 var sup=$('<div>')
                 .addClass('home none')
                 .attr('index',i)
                 .prependTo('#storeHome');
                 var sub=$('<div>')
                 .addClass('homeImg')
                 .prependTo(sup);
                 var img=$('<img>')
                 .attr('src',date[i])
                 .appendTo(sub);
            };
            $('#storeHome').children('.home').eq(0).removeClass('none').addClass('block');
            $('#storeHome>.slider-nu>.storePrev').unbind('click');
            $('#storeHome>.slider-nu>.storeNext').unbind('click');
            full3DSlider(' ','#storeHome>.home','#storeHome>.slider-an',true,false,'#storeHome>.slider-nu>span');

           },
           err:function() {
                console.log( "出错啦~~~~" );
           }
       })
}
$('#videoOn').click(function () {
    $('video').get(0).play();
    console.log('videoOn');
    $('#videPlay>video').attr('width',(W-200)+'px');
    $('#videPlay').removeClass('none').addClass('block');
    logoLeft.removeClass('block').addClass('none');
    logoRight.removeClass('block').addClass('none');
    menu.removeClass('block').addClass('none');
    maskBool = true;
})
$('#videPlay>.videoClose').click(function () {
    $('video').get(0).pause();
    console.log('videoClose');
    $('#videPlay').removeClass('block').addClass('none');
    logoLeft.removeClass('none').addClass('block');
        logoRight.removeClass('none').addClass('block');
        menu.removeClass('none').addClass('block');
        maskBool = false;
})
});