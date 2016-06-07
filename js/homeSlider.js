
/**
 * [full3DSlider 3D slider with full screem]
 * @param  {[bool]} anim      [true/animating]
 * @param  {[bool]} Auto      [true/Automatic operation]
 * @return {[object]}  this         
 */
(function($, window) {
    $.fn.full3DSlider = function(_anim, _auto) {
        var $this = this;
          $this.sliderImg = $this.children('.home');
          $this.imgLength = $this.sliderImg.length;
          $this.showPrev, $this.showNow;
          $this.sliderAn = $this.children('.slider-an');
          $this.timer;
          $this.animated = _anim;
          $this.auto = _auto;
        _init();

        //enter
        function _init() {
            $this.bind('3Drunstate', '', function() {
                $this.animated = true;
            });
            $this.bind('3Dstopstate', '', function() {
                $this.animated = false;
            });
            $this.bind('reload', '', function() {
                $this.sliderImg = $this.children('.home');
                $this.imgLength = $this.sliderImg.length;
            });

            $this.children('.slider-nu').children('.storePrev').on('click',_Arrow_r);
            $this.children('.slider-nu').children('.storeNext').on('click',_Arrow_l);
            if ($this.auto) {
                _autoPlay()
            };
            return $this; //以便于链式调用
        }

        //automatic carousel
        function _autoPlay() {
            $this.timer = setInterval(function() {
                if ($this.animated) { _Arrow_r(); };
            }, 5000)
        }

        //stop to automatic 
        function _stopAuto() {
            clearInterval($this.timer);
        }

        //PageDown
        function _Arrow_r() {
            if ($this.animated) {
                $this.animated = false;
                $this.showPrev = $this.sliderImg.filter('.block').attr('index');
                console.log($this.showPrev);
                $this.showNow = _showNowAdd($this.showPrev);
                _show3D($this.showNow, $this.showPrev);
            };
        };

        //PageUp
        function _Arrow_l() {
            if ($this.animated) {
                $this.animated = false;
                $this.showPrev = $this.sliderImg.filter('.block').attr('index');
                $this.showNow = _showNowSub($this.showPrev);
                _show3D($this.showNow, $this.showPrev);
            };
        };

        //3D animate
        function _show3D(showNow, showPrev) {
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
            var prevH = $this.sliderImg.eq($this.showPrev);
            var nowH = $this.sliderImg.eq($this.showNow);
            H = prevH.height();
            W = prevH.width();
            ht.find(".prev-c").html(prevH.html()).width(W).height(H);
            ht.find(".next-c").html(nowH.html()).width(W).height(H);
            var aBool = Math.random() * 10 > 5 ? true : false;
            var iBool = true;
            var num = Math.trunc(Math.random() * 7) + 1;
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
                $this.sliderAn.append(htClone)
            }
            $this.sliderImg.removeClass('block').addClass('none');
            $this.sliderAn.show();
            setTimeout(function() {
                $this.sliderImg.eq($this.showNow).removeClass('none').addClass('block');
                $this.sliderAn.html('').hide();
                $this.animated = true;
            }, 1000)
        };

        function _showNowAdd(showPrev) {
            $this.showNow = $this.showPrev;
            if ($this.showNow < ($this.imgLength - 1)) {
                $this.showNow++;
            } else {
                $this.showNow = 0;
            }
            return $this.showNow;
        }

        function _showNowSub(showPrev) {
            $this.showNow = $this.showPrev;

            if ($this.showNow > 0) {
                $this.showNow--;
            } else {
                $this.showNow = $this.imgLength - 1;
            }
            return $this.showNow;
        }
    }
})(jQuery, window)
