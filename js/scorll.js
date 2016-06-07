var mousNow = 0;
var st;

function clearAnm() {
    $(".box-cont").eq(mousNow).removeClass("anim");
    $(".box-cont").eq(mousNow).removeClass("enterAnm");
};
   var mousBool = false;
   var scrollBool = false;
   var maskBool = false;

        $(window).mousewheel(function (event, delta, deltaX, deltaY) {
            if (!maskBool) {
                if (!mousBool) {
                    event.preventDefault();

                    var he = $(".box").height();
                    var len = $(".box").length;

                    if (delta > 0) {
                        if (mousNow - 1 < 0) {
                            return;
                        }
                        else
                            mousNow--;
                    } else {
                        if (mousNow + 1 > len - 1) {
                            return;
                        }
                        else
                            mousNow++;
                    }

                    mousAn(mousNow);
                 }
             }else{
                event.preventDefault();
             }
        })


        function mousAn(mousNow) {
            var he = $(".box").height();

            if (he * mousNow != $(window).scrollTop() && !mousBool) {
                mousBool = true;

                var browser = navigator.appName
                var b_version = navigator.appVersion
                var version = b_version.split(";");
                if (version[1]) {
                    var trim_Version = version[1].replace(/[ ]/g, "");
                    if (!(browser == "Microsoft Internet Explorer" && (trim_Version == "MSIE6.0" || trim_Version == "MSIE7.0" || trim_Version == "MSIE8.0" || trim_Version == "MSIE9.0"))) {
                        clearAnm();
                        setTimeout(function () {
                            $(".box-cont").eq(mousNow).addClass("enterAnm");
                            $(".box-cont").eq(mousNow).addClass("anim");
                        }, 10);
                    }
                } else {
                    clearAnm();
                    setTimeout(function () {
                        $(".box-cont").eq(mousNow).addClass("enterAnm");
                        $(".box-cont").eq(mousNow).addClass("anim");
                    }, 10);
                }


                $("body,html").stop(true, false).animate({ scrollTop: he * mousNow }, 1000, function () {
                    mousBool = false;
                });
            }
        };


        $(window).scroll(function () {
                if (!mousBool) {
                    clearInterval(st);
                    var winTop = $(window).scrollTop();

                    $(".box").each(function (i, va) {
                        if ($(this).offset().top - $(window).height() / 2 <= winTop) {
                            mousNow = i;
                        } else {
                            return false;
                        }
                    })

                    st = setTimeout(function () {
                        var he = $(".box").height();
                        if (he * mousNow != $(window).scrollTop() && !mousBool) {
                            var he = $(".box").height();
                            mousBool = true;
                            $("body,html").stop(true, false).animate({ scrollTop: he * mousNow }, 1000, function () {
                                mousBool = false;
                            });
                        }
                    }, 1500);
                }
        });
