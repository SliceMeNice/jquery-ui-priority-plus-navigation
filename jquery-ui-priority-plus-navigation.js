/*!
 * Priority+ Navigation based on jQuery UI Widget
 * Author: office@slicemenice.de
 * Licensed under the MIT license
 *
 *  Requires UI version 1.9+
 */

( function ( $, window, document, undefined ) {

	$.widget( 'smn.priorityPlusNavigation', {

		options: {
			item: '.priorityPlusNavigationItem',
			list: '.priorityPlusNavigationList'
		},

		_create: function () {
			var widget = this;

			widget._trigger( 'onWillBeInitialized', null, {
				widget: widget
			} );

			widget.$item = ( widget.options.item instanceof jQuery ) ? widget.options.item : widget.element.find( widget.options.item );
			widget.$list = ( widget.options.list instanceof jQuery ) ? widget.options.list : widget.element.find( widget.options.list );
			widget.$navigationItems = widget.$item.siblings();

			widget.$navigationItems.clone().appendTo( widget.$list );

			widget.element.css( {
				'white-space': 'nowrap'
			} );

			$( window).on( 'resize.' + widget.eventNamespace, $.debounce( 250, $.proxy( widget.update, widget ) ) );

			widget.update();

			widget._trigger( 'onHasBeenInitialized', null, {
				widget: widget
			} );
		},

		_destroy: function () {
			var widget = this;

			widget._trigger( 'onWillBeDestroyed', null, {
				widget: widget
			} );

			$( window ).off( 'resize.' + widget.eventNamespace );
		},

		_isOverflown( element ) {
			return element.scrollWidth > element.clientWidth && Math.abs( element.scrollWidth - element.clientWidth ) > 2;
		},

		update() {
			var widget = this;

			widget.element.css( {
				'overflow': 'hidden'
			} );

			var $navigationItems = widget.$item.siblings();

			widget.$navigationItems.show();
			widget.$item.hide();
			widget.$list.children().hide();

			widget.$hiddenItems = $( [] );

			var loop = 0;

			while ( widget._isOverflown( widget.element.get( 0 ) ) && widget.$hiddenItems.length <= widget.$navigationItems.length && loop < widget.$navigationItems.length ) {
				widget.$item.show();

				var indexToHide = widget.$navigationItems.length - widget.$hiddenItems.length - 1;

				if ( indexToHide >= 0 ) {
					var $item = widget.element.children().eq( indexToHide );
					$item.hide();

					var $clonedItem = widget.$list.children().eq( indexToHide );
					$clonedItem.show();

					widget.$hiddenItems = widget.$hiddenItems.add( $item );
				}

				loop++;
			}

			widget.element.css( {
				'overflow': ''
			} );
		}
	} );

} )( jQuery, window, document );
