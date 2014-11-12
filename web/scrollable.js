/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
(function( $, undefined ) {

$.widget( "mobile.carousel", $.extend( {

	options: {
		enhanced: false,
		barrel: null,
		bullets: true,
		bulletsPos: "bottom",
		transition: "slide"
	},

	_create: function () {
		this.refresh( true );
	},

	refresh: function ( create ) {
		var el = this.element,
			o = this.options;

		if ( !o.enhanced ) {
			// clear barrel on refesh
			if ( !create ) {
				$( "#ui-carousel-barrel-" + this.uuid ).remove();
			}
			// generate UI and barrel and append to DOM
			this._enhance( el, o );
			el[ o.bulletsPos === "top" ? "before" : "after" ]( this._barrel );
		} else {
			this._barrel = $( "#" + o.barrel );
		}

		this._on( this._barrel.find( "input" ), { 
			"change": "_change"
		});

		this._on( el, {
			"keypress": "_onKeyPress",
			"swipeleft": function () { this.jump( -1 ); },
			"swiperight": function () { this.jump( 1 ); }
		});

		this._items = this._getItems( "li" );
		this._len = this._items.length;
	},

	_onKeyPress: function ( e ) {
		switch (e.keyCode) {
			case $.mobile.keyCode.LEFT: this.jump( -1 ); break;
			case $.mobile.keyCode.RIGHT: this.jump( 1 ); break;
		}
	},

	_change: function ( e ) {
		var el = this.element,
			o = this.options,
			events = this._transitionEndEvents,
			current = el.children().filter( ".ui-carousel-active" ),
			currentActive = current.add( current.find( ".ui-carousel-captions-content" ) ), 
			next = $( e.target ).data( "reference" ),
			nextActive = next.add( next.find( ".ui-carousel-captions-content" ) );

		// click on active
		if ( nextActive.hasClass( "ui-carousel-active" ) ) {
			el.focus();
			return;
		}

		this._transition( currentActive, nextActive )
		el.focus();
	},

	_getItems: function ( selector ) {
		return this.element.find( selector );
	},

	jump: function ( increment ) {
		var len = this._len,
			go = this._items.index( this._getItems( "li.ui-carousel-active" ) ) + increment;

		// allow rotation
		switch ( true ) {
			case go < 0: go = len - 1; break;
			case go > len - 1: go = 0; break;
		}

		this._barrel.find( "input" ).eq( go ).trigger( "click" ).checkboxradio( "refresh" );
	},

	_transition: function ( currentActive, nextActive ) {
		var transition = $.mobile._maybeDegradeTransition( this.options.transition );

		currentActive.addClass( transition + " out" );
		nextActive
			.addClass( transition + " in ui-carousel-active" )
			.animationComplete( function () {
				nextActive.removeClass( transition + " in " );
				currentActive.removeClass( transition + " ui-carousel-active in out" );
			});
	}
}, $.mobile.behaviors.addFirstLastClasses ) );

})( jQuery );

(function( $, undefined ) {

$.widget( "mobile.carousel", $.mobile.carousel, {
	options: {
		corners: false,
		captions: false,
		captionpos: "bottom",
		captiontheme: "a",
		heading: "h1,h2,h3,h4,h5,h6,legend",
		inset: false,
		shadow: false
	},

	_enhance: function ( el, o ) {
		var i, item, radio, label, barrel, containsLink, captionsHeading, prefix,
			captionsContent,
			id = this.uuid,
			items = el.children(),
			len = items.length,
			carouselClasses = "ui-carousel ",
			fragment = document.createDocumentFragment(),
			prefix = 'radio-' + id,
			emptyString = "";

		for ( i = 0; i < len; i += 1 ) {
			item = items[i];

			// captions
			if ( o.captions ) {
				containsLink = item.children[ 0 ].tagName === "A";
				captionsContent = $( item )
					.find( containsLink ? "a *" : "*" )
					.not( "img" )
					.wrap( "<div class='ui-carousel-captions-content ui-bar-" + 
							o.captiontheme + " ui-carousel-captions-" + 
									o.captionpos + "'></div>")
					.parent();
				captionsHeading = captionsContent
					.find( o.heading )
					.addClass( "ui-carousel-captions-heading" );
			}

			// radios bullets
			if ( o.bullets ) {
				label = $( "<label data-" + $.mobile.ns + "iconpos='notext'></label>" );
				radio = $( "<input type='radio' name='" + prefix + "' id='" +
						prefix + "-" + i + "' value='" + i + "'/>" )
						// set item as reference
						.data( "reference", $( item ) );

				if ( i === 0 ) {
					radio.attr( "checked", true );
					$( item ).addClass( "ui-carousel-active" );
				}
				label.append( radio );
				fragment.appendChild( label[0] );
			}
		}

		carouselClasses += o.captions ? " ui-carousel-captions" : emptyString;
		carouselClasses += o.inset ? " ui-carousel-inset" : emptyString;

		if ( !!o.inset ) {
			carouselClasses += o.corners ? " ui-corner-all" : emptyString;
			carouselClasses += o.shadow ? " ui-shadow" : emptyString;
		}

		if ( o.bullets ) {
			carouselClasses += " ui-carousel-bullets";
			barrel = $( "<div id='ui-carousel-barrel-" + id + "' class='" +
					"ui-carousel-controls ui-carousel-controls-" + o.bulletsPos + 
							"'></div>");
			this._barrel = barrel.append( fragment ).enhanceWithin();
		}

		// setting tabindex -1 allows to focus programmatically
		el.addClass( carouselClasses ).attr("tabindex", -1);
	}
});

})( jQuery );

