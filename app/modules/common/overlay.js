/**
 * Created by jakeforaker on 7/6/14.
 */
//
//var ShowOverlay = function() {
//    var that = this;
//    var triggerBttn = document.getElementById( 'trigger-overlay' ),
//        overlay = document.querySelector( 'div.overlay' ),
//        closeBttn = overlay.querySelector( 'button.overlay-close' );
//    transEndEventNames = {
//        'WebkitTransition': 'webkitTransitionEnd',
//        'MozTransition': 'transitionend',
//        'OTransition': 'oTransitionEnd',
//        'msTransition': 'MSTransitionEnd',
//        'transition': 'transitionend'
//    },
//        transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
//        support = { transitions : Modernizr.csstransitions };
//    function toggleOverlay() {
//        if( classie.has( overlay, 'open' ) ) {
//            classie.remove( overlay, 'open' );
//            classie.add( overlay, 'close' );
//            var onEndTransitionFn = function( ev ) {
//                if( support.transitions ) {
//                    if( ev.propertyName !== 'visibility' ) return;
//                    this.removeEventListener( transEndEventName, onEndTransitionFn );
//                }
//                classie.remove( overlay, 'close' );
//            };
//            if( support.transitions ) {
//                overlay.addEventListener( transEndEventName, onEndTransitionFn );
//            }
//            else {
//                onEndTransitionFn();
//            }
//        }
//        else if( !classie.has( overlay, 'close' ) ) {
//            classie.add( overlay, 'open' );
//        }
//    }
//
//    function backHome(){
//        $(that.el).hide();
//        Backbone.history.navigate('');
//    }
//
//    toggleOverlay();
//
//
//
//    closeBttn.addEventListener( 'click', backHome );
//    return this
//};
//
//module.exports = ShowOverlay;


var showIt = ( function( window ) {

    function Overlay() {
        this.el = document.querySelector('div.overlay');
        this._init();
    }

    Overlay.prototype = {

        _init : function() {
            var that = this;
            that._open();
        },

        _open: function(){
            console.log("OOPEENNNN");
            var that = this;
            $(that.el).removeClass('close');
            $('.overlay').addClass('open');
            console.log($(that.el));
            return  $(that.el).addClass('open');
        },

        _close: function(){
            console.log("CLODININSINIS");
            var that = this;
            var o =  that.el;
            classie.remove( o, 'open' );
            classie.add( o, 'close' );
        }
    };

    return Overlay

} )( window );


module.exports = showIt;