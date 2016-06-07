(function( $, undefined ) {
	/*
	 * Gallery object.
	 */
	$.Gallery 				= function( options, element ) {
		this.$el	= $( element );
		this._init( options );
	};
	
	$.Gallery.defaults 		= {
		current		: 0,	// index of current item
		autoplay	: false,// slideshow on / off
		interval	: 5000  // time between transitions
    };
	
	$.Gallery.prototype 	= {
		_init 				: function( options ) {
			
			this.options 		= $.extend( true, {}, $.Gallery.defaults, options );
			
			this.$wrapper		= this.$el.find('.dg-wrapper');
			
			this.$items			= this.$wrapper.children();
			this.itemsCount		= this.$items.length;
			
			this.$nav			= $('.brandTitlie');
			this.$brandList		= $('.brandList').children();
			this.$navPrev		= $('.dg-prev');
			this.$navNext		= $('.dg-next');
			this.$textBox		= $('.textBox');
			
			// minimum of 3 items
			if( this.itemsCount < 3 ) {
					
				this.$nav.remove();
				return false;
			
			}	
			
			this.current		= this.options.current;
			
			this.isAnim			= false;
			
			this.$items.css({
				'opacity'	: 0,
				'visibility': 'hidden'
			});
			
			this._validate();
			
			this._layout();
			
			// load the events
			this._loadEvents();
			
			// slideshow
			if( this.options.autoplay ) {
			
				this._startSlideshow();
			
			}
			
		},
		_validate			: function() {
		
			if( this.options.current < 0 || this.options.current > this.itemsCount - 1 ) {
				
				this.current = 0;
			
			}	
		
		},
		_layout				: function() {
			
			// current, left and right items
			this._setItems();
			
			// current item is not changed
			// left and right one are rotated and leftd
			var leftCSS, rightCSS, currentCSS;
				
				leftCSS 	= {
					'left':'0%',
					'-webkit-transition'	: 'left .3s',
					'-moz-transition'	: 'left .3s',
					'-o-transition'		: 'left .3s',
					'-ms-transition'		: 'left .3s',
					'transition'			: 'left .3s'
				};
				
				rightCSS	= {
					'left':'66.6%',
					'-webkit-transition'	: 'left .3s',
					'-moz-transition'	: 'left .3s',
					'-o-transition'		: 'left .3s',
					'-ms-transition'		: 'left .3s',
					'transition'			: 'left .3s'
				};
				
				currentCSS	= {
					'z-index'			: '2',
					'left':'33.3%',
				};
				
				leftCSS.opacity		= 1;
				leftCSS.visibility	= 'visible';
				rightCSS.opacity	= 1;
				rightCSS.visibility	= 'visible';
			
			
			this.$leftItm.css( leftCSS || {} );
			this.$rightItm.css( rightCSS || {} );
			this.$currentItm.css( currentCSS || {} ).css({
				'opacity'	: 1,
				'visibility': 'visible'
			}).addClass('dg-center');
			var index=this.$currentItm.attr('index');
			this.$brandList[index].style.color='#d7000f';	
			
		},
		_setItems			: function() {
			
			this.$items.removeClass('dg-center');
			
			this.$currentItm	= this.$items.eq( this.current );
			this.$leftItm		= ( this.current === 0 ) ? this.$items.eq( this.itemsCount - 1 ) : this.$items.eq( this.current - 1 );
			this.$rightItm		= ( this.current === this.itemsCount - 1 ) ? this.$items.eq( 0 ) : this.$items.eq( this.current + 1 );
			
			
				this.$items.css( 'z-index', 1 );
				this.$currentItm.css( 'z-index', 2 );
			
			
			// next & previous items
			if( this.itemsCount > 3 ) {
			
				// next item
				this.$nextItm		= ( this.$rightItm.index() === this.itemsCount - 1 ) ? this.$items.eq( 0 ) : this.$rightItm.next();
				this.$nextItm.css( this._getCoordinates('outright') );
				
				// previous item
				this.$prevItm		= ( this.$leftItm.index() === 0 ) ? this.$items.eq( this.itemsCount - 1 ) : this.$leftItm.prev();
				this.$prevItm.css( this._getCoordinates('outleft') );
			
			}
			
		},
		_loadEvents			: function() {
			
			var _self	= this;
			$.each(this.$navPrev,function(){
				$(this).on( 'click.gallery', function( event ) {
					
					if( _self.options.autoplay ) {
					
						clearTimeout( _self.slideshow );
						_self.options.autoplay	= false;
					
					}
					
					_self._navigate('prev');
					return false;
					
				});
			})
			$.each(this.$navNext,function(){
				$(this).on( 'click.gallery', function( event ) {
				
					if( _self.options.autoplay ) {
					
						clearTimeout( _self.slideshow );
						_self.options.autoplay	= false;
					
					}
					
					_self._navigate('next');
					return false;
					
				});
			})
			$.each(this.$brandList,function(  event  ){
				$(this).on( 'click.gallery', function( event ) {
					var nex=$(this).attr('index');
					var cur=_self.$items.filter('.dg-center').attr('index');
					console.log(cur+'->'+nex);
					if (cur<nex) {
						if (cur==0&&nex==2) {
							_self._navigate('prev');
						}else{
						_self._navigate('next');
						}
					}else if(cur>nex){
						if (cur==2&&nex==0) {
							_self._navigate('next');
						}else{
						_self._navigate('prev');
						}
					}
				})
			})
			
			this.$wrapper.on( 'webkitTransitionEnd.gallery transitionend.gallery OTransitionEnd.gallery', function( event ) {
				
				_self.$currentItm.addClass('dg-center');
				var index=_self.$currentItm.attr('index');
				for (var i = 0; i < _self.$brandList.length; i++) {
					_self.$brandList[i].style.color='#000000';
				};
				_self.$brandList[index].style.color='#d7000f';	
				_self.$items.removeClass('dg-transition');
				_self.isAnim	= false;
				
			});
			
		},
		_getCoordinates		: function( position ) {
			
			
				switch( position ) {
					case 'left':
						return {
							'left':'0%',
							'-webkit-transition'	: 'left .3s',
							'-moz-transition'	: 'left .3s',
							'-o-transition'		: 'left .3s',
							'-ms-transition'		: 'left .3s',
							'transition'			: 'left .3s',
							'opacity'			: 1,
							'visibility'		: 'visible'
						};
						break;
					case 'right':
						return {
							'left':'66.6%',
							'-webkit-transition'	: 'left .3s',
							'-moz-transition'	: 'left .3s',
							'-o-transition'		: 'left .3s',
							'-ms-transition'		: 'left .3s',
							'transition'			: 'left .3s',
							'opacity'			: 1,
							'visibility'		: 'visible'
						};
						break;
					case 'center':
						return {
							'left':'33.3%',
							'-webkit-transition'	: 'left .3s',
							'-moz-transition'	: 'left .3s',
							'-o-transition'		: 'left .3s',
							'-ms-transition'		: 'left .3s',
							'transition'			: 'left .3s',
							'opacity'			: 1,
							'visibility'		: 'visible'
						};
						break;
				};
		
		},
		_navigate			: function( dir ) {
			
			if( this.supportTrans && this.isAnim )
				return false;
				
			this.isAnim	= true;
			
			switch( dir ) {
			
				case 'next' :
					
					this.current	= this.$rightItm.index();
					// current item moves left
					this.$currentItm.addClass('dg-transition').css( this._getCoordinates('left') );
					
					// right item moves to the center
					this.$rightItm.addClass('dg-transition').css( this._getCoordinates('center') );	
					
					// next item moves to the right
					if( this.$nextItm ) {
						
						// left item moves out
						this.$leftItm.addClass('dg-transition').css( this._getCoordinates('outleft') );
						
						this.$nextItm.addClass('dg-transition').css( this._getCoordinates('right') );
						
					}
					else {
					
						// left item moves right
						this.$leftItm.addClass('dg-transition').css( this._getCoordinates('right') );
					
					}
					break;
					
				case 'prev' :
				
					this.current	= this.$leftItm.index();

					
					// current item moves right
					this.$currentItm.addClass('dg-transition').css( this._getCoordinates('right') );
					
					// left item moves to the center
					this.$leftItm.addClass('dg-transition').css( this._getCoordinates('center') );
					
					// prev item moves to the left
					if( this.$prevItm ) {
						
						// right item moves out
						this.$rightItm.addClass('dg-transition').css( this._getCoordinates('outright') );
					
						this.$prevItm.addClass('dg-transition').css( this._getCoordinates('left') );
						
					}
					else {
					
						// right item moves left
						this.$rightItm.addClass('dg-transition').css( this._getCoordinates('left') );
					
					}
					break;	
					
			};
			
			this._setItems();
			var index=this.$currentItm.attr('index');
			var textB=$('.textBox');
                 for (var i = 0; i < textB.length; i++) {
                     $(textB[i]).removeClass('B0');
                 };
                 $(textB[index]).addClass('B0');
			 
			if( !this.supportTrans )
				this.$currentItm.addClass('dg-center');
			
		},
		_startSlideshow		: function() {
		
			var _self	= this;
			
			this.slideshow	= setTimeout( function() {
				
				_self._navigate( 'next' );
				
				if( _self.options.autoplay ) {
				
					_self._startSlideshow();
				
				}
			
			}, this.options.interval );
		
		},
		destroy				: function() {
			$.each(this.$navPrev,function(){
				$(this).off('.gallery');
			})
			$.each(this.$navNext,function(){
				$(this).off('.gallery');
			})
			this.$wrapper.off('.gallery');
			
		}
	};
	
	var logError 			= function( message ) {
		if ( this.console ) {
			console.error( message );
		}
	};
	
	$.fn.gallery			= function( options ) {
	
		if ( typeof options === 'string' ) {
			
			var args = Array.prototype.slice.call( arguments, 1 );
			
			this.each(function() {
			
				var instance = $.data( this, 'gallery' );
				
				if ( !instance ) {
					logError( "cannot call methods on gallery prior to initialization; " +
					"attempted to call method '" + options + "'" );
					return;
				}
				
				if ( !$.isFunction( instance[options] ) || options.charAt(0) === "_" ) {
					logError( "no such method '" + options + "' for gallery instance" );
					return;
				}
				
				instance[ options ].apply( instance, args );
			
			});
		
		} 
		else {
		
			this.each(function() {
			
				var instance = $.data( this, 'gallery' );
				if ( !instance ) {
					$.data( this, 'gallery', new $.Gallery( options, this ) );
				}
			});
		
		}
		
		return this;
		
	};
	
})( jQuery );